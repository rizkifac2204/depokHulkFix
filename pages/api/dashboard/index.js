import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler().get(async (req, res) => {
  try {
    const { id: user_id, level } = req.session.user;

    // ambil jumlah user
    const user = await db
      .from("user")
      .count("id", { as: "jumlah" })
      .where("bawaslu_id", "!=", 0)
      .first();

    // ambil jumlah laporan
    const laporan = await db
      .from("lapor_peristiwa")
      .count("id", { as: "jumlah" })
      .whereNull("deleted_at")
      .modify((builder) => {
        if (level > 4) {
          builder.where(`lapor_peristiwa.user_id`, user_id);
        }
      })
      .first();

    const subqueryPelapor = await db("lapor_peristiwa")
      .whereNull("deleted_at")
      .modify((builder) => {
        builder.where(`lapor_peristiwa.user_id`, user_id);
      })
      .select("pelapor_id");
    // ambil jumlah pelapor
    const pelapor = await db
      .from("lapor_pelapor")
      .count("id", { as: "jumlah" })
      .whereNull("deleted_at")
      .modify((builder) => {
        if (level > 4)
          builder.where(
            "lapor_pelapor.id",
            "in",
            subqueryPelapor.map((item) => item.pelapor_id)
          );
      })
      .first();

    const subqueryTerlapor = await db("lapor_peristiwa")
      .whereNull("deleted_at")
      .modify((builder) => {
        builder.where(`lapor_peristiwa.user_id`, user_id);
      })
      .select("id");
    // ambil jumlah terlapor
    const terlapor = await db
      .from("lapor_terlapor")
      .count("id", { as: "jumlah" })
      .modify((builder) => {
        if (level > 4)
          builder.where(
            `lapor_terlapor.peristiwa_id`,
            "in",
            subqueryTerlapor.map((item) => item.id)
          );
      })
      .first();

    // return hasil
    res.json({
      message: "Succes",
      jumlahUser: user.jumlah,
      jumlahLaporan: laporan.jumlah,
      jumlahPelapor: pelapor.jumlah,
      jumlahTerlapor: terlapor.jumlah,
    });
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan..." });
  }
});
