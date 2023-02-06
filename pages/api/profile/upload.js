import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";
import { UploadImageOnly, DeleteUpload } from "services/uploadService";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default Handler()
  .post(UploadImageOnly().single("file"), async (req, res) => {
    try {
      // jika sukses upload, maka file akan terdeteksi
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "File Tidak Sesuai Ketentuan", type: "error" });
      }

      // dapatkan body untuk tabel
      const { id } = req.body;
      const { filename } = req.file;

      const proses = await db("user").where("id", id).update({
        foto_admin: filename,
        updated_at: db.fn.now(),
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
  .put(UploadImageOnly().single("file"), async (req, res) => {
    try {
      // jika sukses upload, maka file akan terdeteksi
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "File Tidak Sesuai Ketentuan", type: "error" });
      }
      const { foto_admin, id } = req.body;
      const { filename } = req.file;

      const proses = await db("user").where("id", id).update({
        foto_admin: filename,
        updated_at: db.fn.now(),
      });

      if (!proses) {
        DeleteUpload("./public/" + req.headers.destinationfile, req.file);
        return res.status(400).json({ message: "Gagal Proses", type: "error" });
      }

      if (proses) {
        if (req.file) DeleteUpload(req.file.destination, foto_admin);
      }

      res.json({ file: filename, message: "Berhasil Upload" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const update = await db("user").where("id", req.query.id).update({
        foto_admin: null,
        updated_at: db.fn.now(),
      });
      if (!update) {
        return res.status(400).json({ message: "Gagal Memproses Data" });
      }
      DeleteUpload("./public/" + req.query.path, req.query.file);
      res.json({ message: "Berhasil Hapus" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
