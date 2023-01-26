import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler().get(async (req, res) => {
  try {
    const result = await db
      .select("*")
      .from("user_main")
      .where("user_id", req.session.user.id)
      .first();

    if (!result) return res.json({});
    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan..." });
  }
});
