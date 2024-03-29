import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

export default handler()
  .get(async (req, res) => {
    try {
      const data = await db("user_riwayat_gaji")
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

      const dataForInsert = {
        user_id,
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

      // proses simpan
      const proses = await db("user_riwayat_gaji").insert(dataForInsert);

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
      const proses = await db("user_riwayat_gaji").whereIn("id", arrID).del();

      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Sukses Menghapus Data Terpilih", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
