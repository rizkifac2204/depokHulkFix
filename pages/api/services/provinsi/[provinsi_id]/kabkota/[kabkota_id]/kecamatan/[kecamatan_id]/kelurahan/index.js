import db from "libs/db";
import HandlerPublic from "middlewares/HandlerPublic";

export default HandlerPublic().get(async (req, res) => {
  const { provinsi_id, kabkota_id, kecamatan_id } = req.query;
  const data = await db
    .select(`kelurahan.*`, `jenis.jenis`)
    .from(`kelurahan`)
    .innerJoin(`jenis`, `jenis.id`, `kelurahan.jenis_id`)
    .where(`kelurahan.kecamatan_id`, kecamatan_id)
    .orderBy(`kelurahan`, `asc`);
  res.json(data);
});
