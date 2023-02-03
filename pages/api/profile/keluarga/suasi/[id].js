import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

export default Handler()
  .get(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const result = await db("user_keluarga_suasi")
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
      const { id: user_id } = req.session.user;
      const { id } = req.query;
      const {
        nama,
        tempat_lahir,
        tanggal_lahir,
        tanggal_nikah,
        pekerjaan,
        keterangan,
      } = req.body;

      // required
      if (!nama)
        return res.status(400).json({
          message: "Nama Wajib Diisi",
          type: "error",
        });

      const dataForEdit = {
        nama,
        tempat_lahir: tempat_lahir || null,
        tanggal_lahir: tanggal_lahir
          ? moment(tanggal_lahir).format("MM/DD/YYYY")
          : null,
        tanggal_nikah: tanggal_nikah
          ? moment(tanggal_nikah).format("MM/DD/YYYY")
          : null,
        pekerjaan: pekerjaan || null,
        keterangan: keterangan || null,
        validasi: 0,
      };

      const proses = await db("user_keluarga_suasi")
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
      const proses = await db("user_keluarga_suasi")
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
