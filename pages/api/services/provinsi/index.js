import db from "libs/db";
import handlerPublic from "middlewares/handlerPublic";

export default handlerPublic().get(async (req, res) => {
  const data = await db("provinsi").orderBy("provinsi", "asc");
  res.json(data);
});
