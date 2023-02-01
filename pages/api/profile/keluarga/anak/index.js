import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

export default Handler()
  .get(async (req, res) => {
    try {
      const data = await db("user_keluarga_anak")
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
      const { id: user_id } = req.session.user;
      const {
        nama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        anak_ke,
        pekerjaan,
        keterangan,
      } = req.body;

      // required
      if (!nama)
        return res.status(400).json({
          message: "Nama Wajib Diisi",
          type: "error",
        });

      const dataForInsert = {
        user_id,
        nama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir: tanggal_lahir
          ? moment(tanggal_lahir).format("MM/DD/YYYY")
          : null,
        anak_ke,
        pekerjaan,
        keterangan,
        validasi: 0,
      };

      // proses simpan
      const proses = await db("user_keluarga_anak").insert(dataForInsert);

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
      const proses = await db("user_keluarga_anak").whereIn("id", arrID).del();

      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Sukses Menghapus Data Terpilih", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
