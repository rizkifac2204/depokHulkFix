import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler()
  .get(async (req, res) => {
    try {
      const { id } = req.query;

      const result = await db
        .select(
          "notes.*",
          "user.nama_admin",
          "level.nama_level",
          "bawaslu.nama_bawaslu"
        )
        .from("notes")
        .innerJoin("user", "notes.user_id", "user.id")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .innerJoin("level", "user.level_id", "level.id")
        .where("notes.id", id)
        .first();

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.query;

      // proses insert
      const proses = await db("notes")
        .where("id", id)
        .update({
          share: db.raw("!share"),
        });

      // failed
      if (!proses)
        return res.status(400).json({
          message: "Gagal Proses",
          type: "error",
        });

      // success
      res.json({ message: "Catatan Terupdate", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.query;

      const proses = await db("notes").where("id", id).del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Terhapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
