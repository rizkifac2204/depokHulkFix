import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";
import { DeleteUpload } from "services/uploadService";

async function isEditable(level, bawaslu_id, verifikator, obj) {
  if (level === 1) return true;
  if (
    level === obj.level_id &&
    bawaslu_id === obj.bawaslu_id &&
    verifikator === 1
  )
    return true;
  if (level < obj.bawaslu_id) return true;
  return false;
}
async function isMyself(idAdmin, idUser) {
  if (idAdmin === idUser) return true;
  return false;
}

export default Handler()
  .get(async (req, res) => {
    try {
      const { id } = req.query;
      const { id: user_id, level, bawaslu_id, verifikator } = req.session.user;
      const data = await db
        .select("user.*", "bawaslu.nama_bawaslu", "level.nama_level")
        .from("user")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .innerJoin("level", "user.level_id", "level.id")
        .where("user.id", id)
        .whereNot("user.id", 1)
        .first();

      if (!data)
        return res
          .status(404)
          .json({ message: "Tidak Ditemukan", type: "error" });

      const result = {
        ...data,
        editable: await isEditable(level, bawaslu_id, verifikator, data),
        myselft: await isMyself(user_id, data.id),
      };

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.query;
      const { id: user_id, level, bawaslu_id, verifikator } = req.session.user;

      // cek data exist
      const cek = await db.select("*").from("user").where("id", id).first();
      if (!cek)
        return res
          .status(404)
          .json({ message: "Tidak Ditemukan", type: "error" });

      //validasi jika berhak hapus
      const izin = await isEditable(level, bawaslu_id, verifikator, cek);
      if (!izin)
        return res
          .status(400)
          .json({ message: "Tidak Ada Izin", type: "error" });

      // validasi tambahan, jika seandainya menghapus diri sendiri
      const myself = await isMyself(user_id, cek.id);
      if (myself)
        return res
          .status(400)
          .json({ message: "Akses Tidak Benar", type: "error" });

      const proses = await db("user").where("id", id).del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      DeleteUpload("./public/foto", cek.foto_admin);

      res.json({ message: "Berhasil Hapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
