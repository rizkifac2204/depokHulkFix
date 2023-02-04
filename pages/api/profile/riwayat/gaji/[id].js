import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

export default Handler()
  .get(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const result = await db("user_riwayat_gaji")
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
        no_sk_kgb,
        tanggal_sk,
        gaji_poko_baru,
        tanggal_mulai,
        tanggal_berikutnya,
      } = req.body;

      // required
      if (!no_sk_kgb)
        return res.status(400).json({
          message: "Nomor SK KGB Wajib Diisi",
          type: "error",
        });

      const dataForEdit = {
        validasi: verifikator,
        no_sk_kgb,
        tanggal_sk: tanggal_sk ? moment(tanggal_sk).format("MM/DD/YYYY") : null,
        gaji_poko_baru: gaji_poko_baru || null,
        tanggal_mulai: tanggal_mulai
          ? moment(tanggal_mulai).format("MM/DD/YYYY")
          : null,
        tanggal_berikutnya: tanggal_berikutnya
          ? moment(tanggal_berikutnya).format("MM/DD/YYYY")
          : null,
      };

      const proses = await db("user_riwayat_gaji")
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
      const proses = await db("user_riwayat_gaji")
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
