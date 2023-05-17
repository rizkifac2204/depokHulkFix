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
      // Boleh Tidak Upload

      // dapatkan body untuk tabel
      const { temuan_id } = req.query;
      const { keterangan } = req.body;
      const { filename } = req.file || {};

      const proses = await db("pelanggaran_bukti").insert({
        laporan_id: null,
        temuan_id,
        keterangan,
        file: filename || null,
      });

      if (!proses) {
        if (req.file)
          DeleteUpload("./public/" + req.headers.destinationfile, req.file);
        return res.status(400).json({ message: "Gagal Proses", type: "error" });
      }

      res.json({ file: filename, message: "Berhasil Proses" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { temuan_id } = req.query;
      const { id, file, path } = req.query;

      const update = await db("pelanggaran_bukti")
        .where("id", id)
        .andWhere("temuan_id", temuan_id)
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
