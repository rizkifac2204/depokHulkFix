import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

function filterData(builder, user_id, level) {
  if (level > 4) {
    builder.where("lapor_peristiwa.user_id", user_id);
  }
}

export default handler()
  .get(async (req, res) => {
    try {
      const { peristiwa_id } = req.query;
      const { id: user_id, level } = req.session.user;
      const result = await db
        .select(
          "lapor_peristiwa.*",
          "lapor_pelapor.nama",
          "lapor_pelapor.tempat_lahir",
          "lapor_pelapor.tanggal_lahir",
          "lapor_pelapor.jenis_kelamin",
          "lapor_pelapor.pekerjaan",
          "lapor_pelapor.alamat",
          "lapor_pelapor.telp",
          "lapor_pelapor.email"
        )
        .from("lapor_peristiwa")
        .innerJoin("user", "user.id", "lapor_peristiwa.user_id")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .innerJoin(
          "lapor_pelapor",
          "lapor_pelapor.id",
          "lapor_peristiwa.pelapor_id"
        )
        .modify((builder) => filterData(builder, user_id, level))
        .where("lapor_peristiwa.id", peristiwa_id)
        .first();

      if (!result)
        return res
          .status(404)
          .json({ message: "Tidak Ditemukan", type: "error" });

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(async (req, res) => {
    return res.status(200).json({ message: "SIAP", type: "error" });
  })
  .delete(async (req, res) => {
    try {
      const { peristiwa_id } = req.query;

      const proses = await db("lapor_peristiwa")
        .where("id", peristiwa_id)
        .del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Berhasil Hapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
