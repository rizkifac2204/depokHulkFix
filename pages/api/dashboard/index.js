import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import { subQueryFilterPelanggaran } from "middlewares/middlewarePelanggaran";

export default handler().get(subQueryFilterPelanggaran, async (req, res) => {
  try {
    const { id: user_id, level } = req.session.user;

    // USER PENGGUNA
    const user = await db
      .from("user")
      .count("id", { as: "jumlah" })
      .where("bawaslu_id", "!=", 0)
      .first();

    // LAPORAN AWAL
    const awal = await db
      .from("pelanggaran_awal")
      .count("id", { as: "jumlah" })
      .first();

    // LAPORAN
    // jumlah
    const laporan = await db
      .from("pelanggaran_laporan")
      .count("id", { as: "jumlah" })
      .whereNull("deleted_at")
      .whereIn(`pelanggaran_laporan.user_id`, req.subqueryPelanggaran)
      .first();

    const subqueryPelapor = await db("pelanggaran_laporan")
      .whereNull("deleted_at")
      .modify((builder) => {
        builder.where(`pelanggaran_laporan.user_id`, user_id);
      })
      .select("pelapor_id");
    // ambil jumlah pelapor
    const pelapor = await db
      .from("pelanggaran_pelapor")
      .count("id", { as: "jumlah" })
      .whereNull("deleted_at")
      .modify((builder) => {
        if (level > 4)
          builder.where(
            "pelanggaran_pelapor.id",
            "in",
            subqueryPelapor.map((item) => item.pelapor_id)
          );
      })
      .first();

    const subqueryTerlapor = await db("pelanggaran_laporan")
      .whereNull("deleted_at")
      .modify((builder) => {
        builder.where(`pelanggaran_laporan.user_id`, user_id);
      })
      .select("id");
    // ambil jumlah terlapor
    const terlapor = await db
      .from("pelanggaran_terlapor")
      .count("id", { as: "jumlah" })
      .modify((builder) => {
        if (level > 4)
          builder.where(
            `pelanggaran_terlapor.laporan_id`,
            "in",
            subqueryTerlapor.map((item) => item.id)
          );
      })
      .first();

    // return hasil
    res.json({
      message: "Succes",
      jumlahUser: user.jumlah,
      jumlahAwal: awal.jumlah,
      jumlahLaporan: laporan.jumlah,
      jumlahPelapor: pelapor.jumlah,
      jumlahTerlapor: terlapor.jumlah,
    });
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan..." });
  }
});
