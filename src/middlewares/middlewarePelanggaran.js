import db from "libs/db";
import getLogger from "middlewares/getLogger";

export async function subQueryFilterPelanggaran(req, res, next) {
  try {
    const { id: user_id, level, bawaslu_id, verifikator } = req.session.user;
    const subquery = await db("user")
      .select("id")
      .where("id", user_id)
      .orWhere(function () {
        this.where("bawaslu_id", "LIKE", `${bawaslu_id}%`);
        if (verifikator) {
          this.andWhere("level_id", ">=", level);
        } else {
          this.andWhere("level_id", ">", level);
        }
      });
    req.subqueryPelanggaran = subquery.map((item) => item.id);
    next();
  } catch (err) {
    getLogger.error(err);
    return res.status(403).json({ message: "Not Allowed" });
  }
}
