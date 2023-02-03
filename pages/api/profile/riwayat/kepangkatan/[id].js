import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

export default Handler()
  .get(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const result = await db("user_riwayat_kepangkatan")
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
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const {
        pangkat,
        jenis,
        golongan,
        terhitung_mulai,
        gaji_pokok,
        sk_pejabat,
        no_sk,
        tanggal_sk,
        dasar_peraturan,
      } = req.body;

      // required
      if (!pangkat)
        return res.status(400).json({
          message: "Pangkat Wajib Diisi",
          type: "error",
        });

      const dataForEdit = {
        validasi: 0,
        pangkat,
        jenis: jenis || null,
        golongan: golongan || null,
        terhitung_mulai: terhitung_mulai || null,
        gaji_pokok: gaji_pokok || null,
        sk_pejabat: sk_pejabat || null,
        no_sk: no_sk || null,
        tanggal_sk: tanggal_sk ? moment(tanggal_sk).format("MM/DD/YYYY") : null,
        dasar_peraturan: dasar_peraturan || null,
      };

      const proses = await db("user_riwayat_kepangkatan")
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
      const proses = await db("user_riwayat_kepangkatan")
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
