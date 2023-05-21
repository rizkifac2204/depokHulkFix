import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler().get(async (req, res) => {
  try {
    const { level } = req.session.user;

    // USER PENGGUNA
    const user = await db
      .from("user")
      .count("id", { as: "jumlah" })
      .where("bawaslu_id", "!=", 0)
      .first();

    // LAPORAN AWAL
    const awal = await db
      .from("pelanggaran_awal")
      .count("id", { as: "jumlah" })
      .first();

    const data = {
      jumlahUser: user.jumlah,
    };
    const result = level < 5 ? { ...data, jumlahAwal: awal.jumlah } : data;
    // return hasil
    res.json({ ...result, message: "Succes" });
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan..." });
  }
});
