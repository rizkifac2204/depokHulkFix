import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import { subQueryFilterPelanggaran } from "middlewares/middlewarePelanggaran";

export default handler().get(subQueryFilterPelanggaran, async (req, res) => {
  try {
    const { id: user_id, level } = req.session.user;

    // jumlah
    const temuan = await db
      .from("pelanggaran_temuan")
      .count("id", { as: "jumlah" })
      .whereNull("deleted_at")
      .whereIn(`pelanggaran_temuan.user_id`, req.subqueryPelanggaran)
      .first();

    // terlapor
    const subqueryTerlapor = await db("pelanggaran_temuan")
      .whereNull("deleted_at")
      .whereIn(`pelanggaran_temuan.user_id`, req.subqueryPelanggaran)
      .select("id");
    const terlapor = await db
      .from("pelanggaran_terlapor")
      .select("id")
      .whereIn(
        `pelanggaran_terlapor.temuan_id`,
        subqueryTerlapor.map((item) => item.id)
      );

    const result = {
      jumlahTemuan: temuan.jumlah,
      jumlahTerlapor: terlapor.length,
    };
    // return hasil
    res.json({ ...result, message: "Succes" });
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan..." });
  }
});
