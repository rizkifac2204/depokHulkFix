import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

export default handler()
  .get(async (req, res) => {
    try {
      const data = await db("user_keluarga_suasi")
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
        nama,
        tempat_lahir,
        tanggal_lahir,
        tanggal_nikah,
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
        tempat_lahir: tempat_lahir || null,
        tanggal_lahir: tanggal_lahir
          ? moment(tanggal_lahir).format("MM/DD/YYYY")
          : null,
        tanggal_nikah: tanggal_nikah
          ? moment(tanggal_nikah).format("MM/DD/YYYY")
          : null,
        pekerjaan: pekerjaan || null,
        keterangan: keterangan || null,
        validasi: verifikator,
      };

      // proses simpan
      const proses = await db("user_keluarga_suasi").insert(dataForInsert);

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
      const proses = await db("user_keluarga_suasi").whereIn("id", arrID).del();

      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Sukses Menghapus Data Terpilih", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
