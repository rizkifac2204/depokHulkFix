import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler().get(async (req, res) => {
  try {
    const { peristiwa_id } = req.query;

    const result = await db
      .select("lapor_terlapor.*")
      .from("lapor_terlapor")
      .where("lapor_terlapor.peristiwa_id", peristiwa_id);

    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
// .post(async (req, res) => {
//   try {
//     const { peristiwa_id } = req.query;
//   } catch (error) {
//     getLogger.error(error);
//     res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
//   }
// });
