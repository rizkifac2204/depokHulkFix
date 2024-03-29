import db from "libs/db";
import handlerPublic from "middlewares/handlerPublic";

export default handlerPublic().get(async (req, res) => {
  const data = await db("level")
    .where((builder) => {
      if (process.env.LEVEL_START) {
        builder.where("id", ">=", process.env.LEVEL_START);
      }
    })
    .orderBy("nama_level", "asc");
  res.json(data);
});
