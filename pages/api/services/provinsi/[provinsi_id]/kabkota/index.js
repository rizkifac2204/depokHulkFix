import db from "libs/db";
import HandlerPublic from "middlewares/HandlerPublic";

export default HandlerPublic().get(async (req, res) => {
  const { provinsi_id } = req.query;
  const data = await db
    .select(`kabkota.*`, `jenis.jenis`)
    .from(`kabkota`)
    .innerJoin(`jenis`, `jenis.id`, `kabkota.jenis_id`)
    .where(`kabkota.provinsi_id`, provinsi_id)
    .orderBy(`kabkota`, `asc`);

  res.json(data);
});
