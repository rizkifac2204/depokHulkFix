import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import middlewareArrayUserAllowed from "middlewares/middlewareArrayUserAllowed";

export default handler().get(middlewareArrayUserAllowed, async (req, res) => {
  try {
    const data = await db
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
      .where("notes.share", 1)
      .orderBy("notes.created_at", "desc");

    // sorting editable
    const result = data.map((item) => {
      return {
        ...item,
        editable: req.arrayUserAllowed.includes(item.user_id),
      };
    });

    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({
      message: error?.message || "Terjadi Kesalahan...",
      type: "error",
    });
  }
});
