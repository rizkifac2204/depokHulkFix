// import db from "libs/db";
// import Handler from "middlewares/Handler";
// import getLogger from "middlewares/getLogger";

// export default Handler().get(async (req, res) => {
//   try {
//     const result = await db
//       .select(
//         "notes.*",
//         "user.nama_admin",
//         "level.nama_level",
//         "bawaslu.nama_bawaslu"
//       )
//       .from("notes")
//       .innerJoin("user", "notes.user_id", "user.id")
//       .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
//       .innerJoin("level", "user.level_id", "level.id")
//       .where("notes.share", 1)
//       .orderBy("notes.created_at", "desc");

//     res.json(result);
//   } catch (error) {
//     getLogger.error(error);
//     res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
//   }
// });

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
    .andWhere("notes.share", 1)
    .orderBy("notes.created_at", "desc");

  return result;
};

export default Handler().get(async (req, res) => {
  try {
    const data = await db
      .select(
        db.raw("count(*) as jumlah"),
        db.raw("date(created_at) as tanggal")
      )
      .from("notes")
      .where("notes.share", 1)
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
});
