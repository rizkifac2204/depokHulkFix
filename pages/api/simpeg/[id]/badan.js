import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler().get(async (req, res) => {
  try {
    const { id } = req.query;
    const result = await db
      .select("*")
      .from("user_badan")
      .where("user_id", id)
      .first();

    if (!result) return res.json({});
    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
