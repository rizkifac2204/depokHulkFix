import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

export default handler()
  .get(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const result = await db("user_riwayat_kursus")
        .where("id", id)
        .andWhere("user_id", user_id)
        .first();

      // not found
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
    try {
      const { id: user_id, verifikator } = req.session.user;
      const { id } = req.query;
      const { nama, lama, tahun_ijazah, tempat, keterangan } = req.body;

      // required
      if (!nama)
        return res.status(400).json({
          message: "Nama Kursus Wajib Diisi",
          type: "error",
        });

      const dataForEdit = {
        validasi: verifikator,
        nama,
        lama: lama || null,
        tahun_ijazah: tahun_ijazah || null,
        tempat: tempat || null,
        keterangan: keterangan || null,
      };

      const proses = await db("user_riwayat_kursus")
        .where("id", id)
        .andWhere("user_id", user_id)
        .update(dataForEdit);

      // failed
      if (!proses)
        return req.status(400).json({ message: "Gagal Proses", type: "error" });

      res.json({ message: "Berhasil Edit Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const proses = await db("user_riwayat_kursus")
        .where("id", id)
        .andWhere("user_id", user_id)
        .del();

      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Berhasil Hapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
