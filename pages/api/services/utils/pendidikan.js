import db from "libs/db";
import handler from "middlewares/handler";

export default handler().get(async (req, res) => {
  const data = await db("utils_pendidikan").orderBy("id", "asc");
  res.json(data);
});
