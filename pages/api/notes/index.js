import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

const getData = async (date) => {
  const result = await db
    .select(
      "notes.*",
      "user.nama_admin",
      "level.nama_level",
      "bawaslu.nama_bawaslu"
    )
    .from("notes")
    .innerJoin("user", "notes.user_id", "user.id")
    .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
    .innerJoin("level", "user.level_id", "level.id")
    .where(db.raw("date(notes.created_at)"), date)
    .orderBy("notes.created_at", "desc");

  return result;
};

export default Handler()
  .get(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;

      const data = await db
        .select(
          db.raw("count(*) as jumlah"),
          db.raw("date(created_at) as tanggal")
        )
        .from("notes")
        .where("user_id", user_id)
        .groupBy(db.raw("date(created_at)"))
        .orderBy("tanggal", "desc");

      const result = await Promise.all(
        data.map(async (item) => {
          return {
            ...item,
            listdata: await getData(item.tanggal),
          };
        })
      );

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { id: creater_id } = req.session.user;

      // get post
      const { judul, catatan, share } = req.body;

      // proses insert
      const proses = await db("notes").insert([
        {
          user_id: creater_id,
          judul,
          catatan,
          share: share ? share : false,
          created_at: db.fn.now(),
        },
      ]);

      // failed
      if (!proses)
        return res.status(400).json({
          message: "Gagal Memasukan Data",
          type: "error",
        });

      // success
      res.json({ message: "Catatan Disimpan", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
