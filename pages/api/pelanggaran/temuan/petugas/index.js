import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler().get(async (req, res) => {
  try {
    const result = await db
      .select(
        "user.id as petugas_id",
        "user.nama_admin as nama",
        "user.id",
        "user_umum.jabatan",
        "user_alamat.alamat"
      )
      .from("user")
      .leftJoin("user_umum", "user.id", "user_umum.user_id")
      .leftJoin("user_alamat", "user.id", "user_alamat.user_id")
      .orderBy("user.nama_admin", "asc");

    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
