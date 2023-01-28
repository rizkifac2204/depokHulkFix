import db from "libs/db";
import Handler from "middlewares/Handler";
import bcrypt from "bcryptjs";
import getLogger from "middlewares/getLogger";
import { UploadImageOnly, DeleteUpload } from "services/uploadService";
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default Handler().put(
  UploadImageOnly().single("file"),
  async (req, res) => {
    try {
      const { id } = req.session.user;
      const {
        foto_admin,
        nama_admin,
        telp_admin,
        email_admin,
        username,
        passwordConfirm,
      } = req.body;

      // jika tidak ada identitas atau jika ada nama tapi tidak ada file
      if (!req.file) {
        if (!foto_admin)
          return res.status(400).json({
            message: "Foto Identitas Tidak Ditemukan atau Tidak Sesuai",
            type: "error",
          });

        if (!fs.existsSync("./public/foto/" + foto_admin))
          return res.status(400).json({
            message: "Foto identitas Harus Upload Ulang",
            type: "error",
          });
      }
      const filename = req.file ? req.file.filename : foto_admin;

      // cek exist
      const cek = await db("user").where("id", id).first();
      if (!cek) {
        if (req.file) DeleteUpload(req.file.destination, filename);
        return res
          .status(401)
          .json({ message: "User Tidak Terdeteksi", type: "error" });
      }

      // jika password tidak sama
      const match = await bcrypt.compare(passwordConfirm, cek.password);
      if (!match) {
        if (req.file) DeleteUpload(req.file.destination, filename);
        return res
          .status(401)
          .json({ message: "Password Anda Salah", type: "error" });
      }

      //cek jika ada email yang sama
      const cekEmailSama = await db("user")
        .where("id", "!=", id)
        .andWhere("email_admin", email_admin)
        .first();
      if (cekEmailSama) {
        if (req.file) DeleteUpload(req.file.destination, filename);
        return res.status(401).json({
          type: "error",
          message:
            "Email yang anda masukan sudah di pakai user lain, silakan masukan email pengganti",
        });
      }

      const forUser = {
        foto_admin: filename,
        nama_admin,
        telp_admin,
        email_admin,
        username,
      };
      const proses = await db("user")
        .where("id", id)
        .update({
          ...forUser,
          updated_at: db.fn.now(),
        });

      if (!proses) {
        if (req.file) DeleteUpload(req.file.destination, filename);
        return res.status(400).json({ message: "Gagal Proses", type: "error" });
      }

      if (proses) {
        if (req.file) DeleteUpload(req.file.destination, foto_admin);
      }

      res.json({ message: "Berhasil Mengubah Data Profile" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  }
);
