import db from "libs/db";
import HandlerPublic from "middlewares/HandlerPublic";

export default HandlerPublic().get(async (req, res) => {
  const { provinsi_id, kabkota_id, kecamatan_id, kelurahan_id } = req.query;
  const result = await db
    .select(`kelurahan.*`, `jenis.jenis`)
    .from(`kelurahan`)
    .innerJoin(`jenis`, `jenis.id`, `kelurahan.jenis_id`)
    .where(`kelurahan.id`, kelurahan_id)
    .first();

  if (!result)
    return res.status(404).json({ status: 404, message: "Tidak Ditemukan" });

  res.json(result);
});
