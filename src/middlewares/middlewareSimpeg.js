import db from "libs/db";
import getLogger from "middlewares/getLogger";
import { isEditable, isMyself } from "middlewares/simpegAttrs";

export default async function middlewareSimpeg(req, res, next) {
  try {
    const { id } = req.query;
    const { id: user_id, level, bawaslu_id, verifikator } = req.session.user;

    const cek = await db.select("*").from("user").where("id", id).first();
    if (!cek)
      return res
        .status(404)
        .json({ message: "Tidak Ditemukan", type: "error" });

    //validasi jika berhak hapus
    const izin = isEditable(level, bawaslu_id, verifikator, cek);
    if (!izin)
      return res.status(400).json({ message: "Tidak Ada Izin", type: "error" });

    // validasi tambahan, jika seandainya menghapus diri sendiri
    const myself = isMyself(user_id, cek.id);
    if (myself)
      return res
        .status(400)
        .json({ message: "Akses Tidak Benar", type: "error" });

    req.currentData = cek;
    next();
  } catch (err) {
    getLogger.error(err);
    return res.status(403).json({ message: "Not Allowed" });
  }
}
