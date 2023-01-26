import db from "libs/db";
import HandlerPublic from "middlewares/HandlerPublic";

export default HandlerPublic().get(async (req, res) => {
  const data = await db("level").orderBy("level", "asc");
  res.json(data);
});
