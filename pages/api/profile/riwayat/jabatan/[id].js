import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler()
  .get(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const result = await db("user_riwayat_jabatan")
        .where("id", id)
        .andWhere("user_id", user_id)
        .first();

      // not found
      if (!result)
        return res
          .status(404)
          .json({ message: "Tidak Ditemukan", type: "error" });

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(async (req, res) => {
    try {
      const { id: user_id, verifikator } = req.session.user;
      const { id } = req.query;
      const {
        golongan,
        jabatan,
        tahun_mulai,
        gaji_jabatan,
        sk_jabatan,
        no_sk_jabatan,
        tgl_sk_jabatan,
      } = req.body;

      // required
      if (!golongan)
        return res.status(400).json({
          message: "Golongan Wajib Diisi",
          type: "error",
        });

      const dataForEdit = {
        validasi: verifikator,
        golongan,
        jabatan: jabatan || null,
        tahun_mulai: tahun_mulai || null,
        gaji_jabatan: gaji_jabatan || null,
        sk_jabatan: sk_jabatan || null,
        no_sk_jabatan: no_sk_jabatan || null,
        tgl_sk_jabatan: tgl_sk_jabatan || null,
      };

      const proses = await db("user_riwayat_jabatan")
        .where("id", id)
        .andWhere("user_id", user_id)
        .update(dataForEdit);

      // failed
      if (!proses)
        return req.status(400).json({ message: "Gagal Proses", type: "error" });

      res.json({ message: "Berhasil Edit Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const proses = await db("user_riwayat_jabatan")
        .where("id", id)
        .andWhere("user_id", user_id)
        .del();

      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Berhasil Hapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
