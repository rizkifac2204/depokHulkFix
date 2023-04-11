import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

export default handler()
  .get(async (req, res) => {
    try {
      const data = await db("user_riwayat_kepangkatan")
        .where("user_id", req.session.user.id)
        .orderBy("id", "asc");
      res.json(data);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { id: user_id, verifikator } = req.session.user;
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

      const dataForInsert = {
        user_id,
        validasi: verifikator,
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

      // proses simpan
      const proses = await db("user_riwayat_kepangkatan").insert(dataForInsert);

      // failed
      if (!proses)
        return res.status(400).json({
          message: "Gagal Menyimpan Data",
          type: "error",
        });

      // success
      res.json({ message: "Berhasil Menginput Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const arrID = req.body;
      const proses = await db("user_riwayat_kepangkatan")
        .whereIn("id", arrID)
        .del();

      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Sukses Menghapus Data Terpilih", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
