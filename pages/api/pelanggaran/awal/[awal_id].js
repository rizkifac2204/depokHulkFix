import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler()
  .get(async (req, res) => {
    try {
      const { awal_id } = req.query;

      const result = await db
        .select("pelanggaran_awal.*")
        .from("pelanggaran_awal")
        .where("pelanggaran_awal.id", awal_id)
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
  .delete(async (req, res) => {
    try {
      const { awal_id } = req.query;

      const proses = await db("pelanggaran_awal").where("id", awal_id).del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Berhasil Hapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(async (req, res) => {
    try {
      const { awal_id } = req.query;

      const proses = await db("pelanggaran_awal")
        .where("id", awal_id)
        .update({ dibaca: true });
      if (!proses)
        return res.status(400).json({ message: "Gagal Proses", type: "error" });

      res.json({ message: "Berhasil Proses", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
