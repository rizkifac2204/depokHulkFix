import db from "libs/db";
import Handler from "middlewares/Handler";
import bcrypt from "bcryptjs";
import getLogger from "middlewares/getLogger";

export default Handler()
  .get(async (req, res) => {
    try {
      const result = await db
        .select("*")
        .from("user_umum")
        .where("user_id", req.session.user.id)
        .first();

      if (!result) return res.json({});
      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.session.user;
      const {
        agama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        gelar_depan,
        gelar_belakang,
        status_pegawai,
        jabatan,
        status_nikah,
        golongan_darah,
        hobi,
        keahlian,
        passwordConfirm,
      } = req.body;

      const cek = await db("user").where("id", id).first();
      if (!cek)
        return res
          .status(401)
          .json({ message: "User Tidak Terdeteksi", type: "error" });

      // jika password tidak sama
      const match = await bcrypt.compare(passwordConfirm, cek.password);

      if (!match)
        return res
          .status(401)
          .json({ message: "Password Anda Salah", type: "error" });

      const forUmum = {
        status_pegawai,
        jabatan,
        agama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        golongan_darah,
        status_nikah,
        gelar_depan,
        gelar_belakang,
        hobi,
        keahlian,
      };

      const cekExist = await db(`user_umum`).where("user_id", id).first();
      if (!cekExist) {
        // insert
        const prosesUmum = await db("user_umum").insert({
          ...forUmum,
          user_id: id,
        });
        if (!prosesUmum)
          return res.json({
            message: "Gagal Menyimpan Data Umum",
            type: "error",
          });
      } else {
        // update
        const prosesUmum = await db("user_umum")
          .where("user_id", id)
          .update(forUmum);
        if (!prosesUmum)
          return res.json({
            message: "Gagal Menyimpan Data Umum",
            type: "error",
          });
      }

      res.json({ message: "Berhasil Mengubah Data" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
