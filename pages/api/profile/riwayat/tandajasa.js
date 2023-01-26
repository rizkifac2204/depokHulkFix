import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler().get(async (req, res) => {
  try {
    const data = await db("user_riwayat_tandajasa")
      .where("user_id", req.session.user.id)
      .orderBy("id", "asc");
    res.json(data);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan..." });
  }
});
