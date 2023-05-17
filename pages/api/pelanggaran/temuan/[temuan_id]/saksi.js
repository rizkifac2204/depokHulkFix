import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler().get(async (req, res) => {
  try {
    const { temuan_id } = req.query;

    const result = await db
      .select("pelanggaran_saksi.*")
      .from("pelanggaran_saksi")
      .where("pelanggaran_saksi.temuan_id", temuan_id);

    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
