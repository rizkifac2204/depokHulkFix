import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler()
  .get(async (req, res) => {
    try {
      const data = await db("user_riwayat_keluarnegeri")
        .where("user_id", req.session.user.id)
        .orderBy("id", "asc");
      res.json(data);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { id: user_id, verifikator } = req.session.user;
      const { negara, tujuan, lamanya, membiayai } = req.body;

      // required
      if (!negara)
        return res.status(400).json({
          message: "Negara Wajib Diisi",
          type: "error",
        });

      const dataForInsert = {
        user_id,
        validasi: verifikator,
        negara,
        tujuan: tujuan || null,
        lamanya: lamanya || null,
        membiayai: membiayai || null,
      };

      // proses simpan
      const proses = await db("user_riwayat_keluarnegeri").insert(
        dataForInsert
      );

      // failed
      if (!proses)
        return res.status(400).json({
          message: "Gagal Menyimpan Data",
          type: "error",
        });

      // success
      res.json({ message: "Berhasil Menginput Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const arrID = req.body;
      const proses = await db("user_riwayat_keluarnegeri")
        .whereIn("id", arrID)
        .del();

      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Sukses Menghapus Data Terpilih", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
