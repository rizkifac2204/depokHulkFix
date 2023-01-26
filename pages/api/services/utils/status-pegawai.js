import db from "libs/db";
import Handler from "middlewares/Handler";

export default Handler().get(async (req, res) => {
  const data = await db("utils_status_pegawai").orderBy("id", "asc");
  res.json(data);
});
