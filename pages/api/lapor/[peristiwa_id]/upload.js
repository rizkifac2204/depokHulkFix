import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import { Upload, DeleteUpload } from "services/uploadService";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler()
  .post(Upload().single("file"), async (req, res) => {
    try {
      // jika sukses upload, maka file akan terdeteksi
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "File Tidak Sesuai Ketentuan", type: "error" });
      }

      // dapatkan body untuk tabel
      const { peristiwa_id } = req.query;
      const { keterangan } = req.body;
      const { filename } = req.file;

      const proses = await db("lapor_bukti").insert({
        peristiwa_id,
        keterangan,
        file: filename,
      });

      if (!proses) {
        DeleteUpload("./public/" + req.headers.destinationfile, req.file);
        return res.status(400).json({ message: "Gagal Proses", type: "error" });
      }

      res.json({ file: filename, message: "Berhasil Upload" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { peristiwa_id } = req.query;
      const { id, file, path } = req.query;

      const update = await db("lapor_bukti")
        .where("id", id)
        .andWhere("peristiwa_id", peristiwa_id)
        .del();
      if (!update) {
        return res.status(400).json({ message: "Gagal Memproses Data" });
      }
      DeleteUpload("./public/" + path, file);
      res.json({ message: "Berhasil Hapus" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
