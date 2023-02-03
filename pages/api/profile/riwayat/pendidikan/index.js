import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler()
  .get(async (req, res) => {
    try {
      const data = await db("user_riwayat_pendidikan")
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
      const { pendidikan, nama, jurusan, tahun_ijazah, tempat, pimpinan } =
        req.body;

      // required
      if (!pendidikan)
        return res.status(400).json({
          message: "Pendidikan Wajib Diisi",
          type: "error",
        });
      // required
      if (!nama)
        return res.status(400).json({
          message: "Nama Tempat Belajar Wajib Diisi",
          type: "error",
        });

      const dataForInsert = {
        user_id,
        validasi: 0,
        pendidikan,
        nama,
        jurusan: jurusan || null,
        tahun_ijazah: tahun_ijazah || null,
        tempat: tempat || null,
        pimpinan: pimpinan || null,
      };

      // proses simpan
      const proses = await db("user_riwayat_pendidikan").insert(dataForInsert);

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
      const proses = await db("user_riwayat_pendidikan")
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
