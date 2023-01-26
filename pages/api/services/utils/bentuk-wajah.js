import db from "libs/db";
import Handler from "middlewares/Handler";

export default Handler().get(async (req, res) => {
  const data = await db("utils_bentuk_wajah").orderBy("id", "asc");
  res.json(data);
});
