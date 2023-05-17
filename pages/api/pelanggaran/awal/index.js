import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler().get(async (req, res) => {
  try {
    const result = await db
      .select("pelanggaran_awal.*")
      .from("pelanggaran_awal")
      .orderBy("pelanggaran_awal.created_at", "desc");

    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
