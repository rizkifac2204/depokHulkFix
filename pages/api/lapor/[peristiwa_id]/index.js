import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

function filterData(builder, user_id, level) {
  if (level > 4) {
    builder.where("lapor_peristiwa.user_id", user_id);
  }
}

export default handler().get(async (req, res) => {
  try {
    const { peristiwa_id } = req.query;
    const { id: user_id, level } = req.session.user;
    const result = await db
      .select("lapor_peristiwa.*", "user.nama_admin", "bawaslu.nama_bawaslu")
      .from("lapor_peristiwa")
      .innerJoin("user", "user.id", "lapor_peristiwa.user_id")
      .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
      .modify((builder) => filterData(builder, user_id, level))
      .where("lapor_peristiwa.id", peristiwa_id)
      .first();

    if (!result)
      return res
        .status(404)
        .json({ message: "Tidak Ditemukan", type: "error" });

    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
