import db from "libs/db";
import getLogger from "middlewares/getLogger";

export default async function middlewareNotes(req, res, next) {
  try {
    const { note_id } = req.query;

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
      .where("notes.id", note_id)
      .whereIn("notes.user_id", req.arrayUserAllowed)
      .first();

    req.noteDetail = result;

    next();
  } catch (err) {
    getLogger.error(err);
    return res.status(403).json({ message: err?.message || "Not Allowed" });
  }
}
