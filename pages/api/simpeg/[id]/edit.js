import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import { UploadImageOnly, DeleteUpload } from "services/uploadService";
import { isEditable, isMyself } from "middlewares/simpegAttrs";
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

async function middlewareEdit(req, res, next) {
  try {
    const { id } = req.query;
    const { id: user_id, level, bawaslu_id, verifikator } = req.session.user;
    const { foto_admin, email_admin } = req.body;

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

    // cek exist data
    const cek = await db.select("*").from("user").where("id", id).first();
    if (!cek) {
      if (req.file) DeleteUpload(req.file.destination, filename);
      return res
        .status(404)
        .json({ message: "Tidak Ditemukan", type: "error" });
    }

    //cek jika ada email yang sama
    if (email_admin) {
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
    }

    //validasi jika berhak hapus
    const izin = isEditable(level, bawaslu_id, verifikator, cek);
    if (!izin) {
      if (req.file) DeleteUpload(req.file.destination, filename);
      return res.status(400).json({ message: "Tidak Ada Izin", type: "error" });
    }

    // validasi tambahan, jika seandainya menghapus diri sendiri
    const myself = isMyself(user_id, cek.id);
    if (myself) {
      if (req.file) DeleteUpload(req.file.destination, filename);
      return res
        .status(400)
        .json({ message: "Akses Tidak Benar", type: "error" });
    }

    next();
  } catch (err) {
    getLogger.error(err);
    return res.status(403).json({ message: "Not Allowed" });
  }
}

export default handler().put(
  UploadImageOnly().single("file"),
  middlewareEdit,
  async (req, res) => {
    try {
      const { id } = req.query;
      const { foto_admin, nama_admin, telp_admin, email_admin, username } =
        req.body;
      const filename = req.file ? req.file.filename : foto_admin;

      const forUser = {
        foto_admin: filename,
        nama_admin,
        telp_admin: telp_admin || null,
        email_admin: email_admin || null,
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
