import db from "libs/db";
import HandlerPublic from "middlewares/HandlerPublic";

export default HandlerPublic().get(async (req, res) => {
  const { provinsi_id, kabkota_id } = req.query;
  const data = await db
    .select(`kecamatan.*`)
    .from(`kecamatan`)
    .where(`kecamatan.kabkota_id`, kabkota_id)
    .orderBy(`kecamatan`, `asc`);

  res.json(data);
});
