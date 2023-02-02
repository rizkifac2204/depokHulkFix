import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler().get(async (req, res) => {
  try {
    const { id } = req.query;
    const result = await db
      .select("user.*", "bawaslu.nama_bawaslu", "level.nama_level")
      .from("user")
      .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
      .innerJoin("level", "user.level_id", "level.id")
      .where("user.id", id)
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
});
