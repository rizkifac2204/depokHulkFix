import db from "libs/db";
import HandlerPublic from "middlewares/HandlerPublic";

export default HandlerPublic().get(async (req, res) => {
  const { provinsi_id, kabkota_id } = req.query;
  const result = await db
    .select(`kabkota.*`, `jenis.jenis`)
    .from(`kabkota`)
    .innerJoin(`jenis`, `jenis.id`, `kabkota.jenis_id`)
    .where(`kabkota.id`, kabkota_id)
    .first();

  if (!result)
    return res.status(404).json({ status: 404, message: "Tidak Ditemukan" });

  res.json(result);
});
