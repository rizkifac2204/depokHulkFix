import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler()
  .get(async (req, res) => {
    try {
      const { pelapor_id } = req.query;

      const result = await db
        .select("*")
        .from("lapor_pelapor")
        .where("id", pelapor_id)
        .first();

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
      const { pelapor_id } = req.query;

      // get post
      const {
        nama,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        pekerjaan,
        alamat,
        telp,
        email,
      } = req.body;

      // proses insert
      const proses = await db("lapor_pelapor").where("id", pelapor_id).update({
        nama,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        pekerjaan,
        alamat,
        telp,
        email,
        updated_at: db.fn.now(),
      });

      // failed
      if (!proses)
        return res.status(400).json({
          message: "Gagal Proses",
          type: "error",
        });

      // success
      res.json({ message: "Pelapor Terupdate", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { pelapor_id } = req.query;

      const proses = await db("lapor_pelapor").where("id", pelapor_id).del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Terhapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
