import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler()
  .get(async (req, res) => {
    try {
      const data = await db("user_riwayat_kursus")
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
      const { nama, lama, tahun_ijazah, tempat, keterangan } = req.body;

      // required
      if (!nama)
        return res.status(400).json({
          message: "Nama Kursus Wajib Diisi",
          type: "error",
        });

      const dataForInsert = {
        user_id,
        validasi: verifikator,
        nama,
        lama: lama || null,
        tahun_ijazah: tahun_ijazah || null,
        tempat: tempat || null,
        keterangan: keterangan || null,
      };

      // proses simpan
      const proses = await db("user_riwayat_kursus").insert(dataForInsert);

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
      const proses = await db("user_riwayat_kursus").whereIn("id", arrID).del();

      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Sukses Menghapus Data Terpilih", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
