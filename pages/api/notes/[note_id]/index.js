import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import middlewareNotes from "middlewares/middlewareNotes";
import middlewareArrayUserAllowed from "middlewares/middlewareArrayUserAllowed";

export default handler()
  .get(middlewareArrayUserAllowed, middlewareNotes, async (req, res) => {
    try {
      if (!req.noteDetail)
        return res
          .status(404)
          .json({ message: "Tidak Ditemukan", type: "error" });

      res.json(req.noteDetail);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(middlewareArrayUserAllowed, middlewareNotes, async (req, res) => {
    try {
      const { note_id } = req.query;

      // no akses
      if (!req.noteDetail)
        return res
          .status(404)
          .json({ message: "Tidak Ada Akses", type: "error" });

      // proses insert
      const proses = await db("notes")
        .where("id", note_id)
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
  .delete(middlewareArrayUserAllowed, middlewareNotes, async (req, res) => {
    try {
      const { note_id } = req.query;

      // no akses
      if (!req.noteDetail)
        return res
          .status(404)
          .json({ message: "Tidak Ada Akses", type: "error" });

      const proses = await db("notes").where("id", note_id).del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Terhapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
