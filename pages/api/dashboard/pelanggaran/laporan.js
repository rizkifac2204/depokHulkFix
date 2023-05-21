import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import { subQueryFilterPelanggaran } from "middlewares/middlewarePelanggaran";

export default handler().get(subQueryFilterPelanggaran, async (req, res) => {
  try {
    const { id: user_id, level } = req.session.user;

    // jumlah
    const laporan = await db
      .from("pelanggaran_laporan")
      .count("id", { as: "jumlah" })
      .whereNull("deleted_at")
      .whereIn(`pelanggaran_laporan.user_id`, req.subqueryPelanggaran)
      .first();

    // pelapor
    const pelapor = await db("pelanggaran_laporan")
      .select("pelapor_id")
      .count("id", { as: "jumlah" })
      .whereIn(`pelanggaran_laporan.user_id`, req.subqueryPelanggaran)
      .groupBy("pelapor_id");

    // terlapor
    const subqueryTerlapor = await db("pelanggaran_laporan")
      .whereNull("deleted_at")
      .whereIn(`pelanggaran_laporan.user_id`, req.subqueryPelanggaran)
      .select("id");
    const terlapor = await db
      .from("pelanggaran_terlapor")
      .select("id")
      .whereIn(
        `pelanggaran_terlapor.laporan_id`,
        subqueryTerlapor.map((item) => item.id)
      );

    const result = {
      jumlahLaporan: laporan.jumlah,
      jumlahPelapor: pelapor.length,
      jumlahTerlapor: terlapor.length,
    };
    // return hasil
    res.json({ ...result, message: "Succes" });
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan..." });
  }
});
