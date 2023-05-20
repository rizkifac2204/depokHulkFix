import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import { DeleteUpload } from "services/uploadService";
import { isEditable, isMyself } from "middlewares/simpegAttrs";
import middlewareSimpeg from "middlewares/middlewareSimpeg";

export default handler()
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
        editable: isEditable(level, bawaslu_id, verifikator, data),
        myself: isMyself(user_id, data.id),
      };

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(middlewareSimpeg, async (req, res) => {
    try {
      const { id } = req.query;

      const proses = await db("user").where("id", id).del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      DeleteUpload("./public/foto", req.currentData.foto_admin);

      res.json({ message: "Berhasil Hapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
