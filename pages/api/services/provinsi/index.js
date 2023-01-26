import db from "libs/db";
import HandlerPublic from "middlewares/HandlerPublic";

export default HandlerPublic().get(async (req, res) => {
  const data = await db("provinsi").orderBy("provinsi", "asc");
  res.json(data);
});
