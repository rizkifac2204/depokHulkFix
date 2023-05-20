import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import middlewareSimpeg from "middlewares/middlewareSimpeg";
import moment from "moment";

export default handler()
  .get(async (req, res) => {
    try {
      const { id } = req.query;
      const result = await db
        .select("*")
        .from("user_umum")
        .where("user_id", id)
        .first();

      if (!result) return res.json({});
      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(middlewareSimpeg, async (req, res) => {
    try {
      const { id } = req.query;
      const {
        agama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        gelar_depan,
        gelar_belakang,
        status_pegawai,
        jabatan,
        status_nikah,
        golongan_darah,
        hobi,
        keahlian,
      } = req.body;

      const forUmum = {
        status_pegawai: status_pegawai || null,
        jabatan: jabatan || null,
        agama: agama || null,
        jenis_kelamin: jenis_kelamin || null,
        tempat_lahir: tempat_lahir || null,
        tanggal_lahir: tanggal_lahir
          ? moment(tanggal_lahir).format("MM/DD/YYYY")
          : null,
        golongan_darah: golongan_darah || null,
        status_nikah: status_nikah || null,
        gelar_depan: gelar_depan || null,
        gelar_belakang: gelar_belakang || null,
        hobi: hobi || null,
        keahlian: keahlian || null,
      };

      const cekExist = await db(`user_umum`).where("user_id", id).first();
      if (!cekExist) {
        // insert
        const prosesUmum = await db("user_umum").insert({
          ...forUmum,
          user_id: id,
        });
        if (!prosesUmum)
          return res.json({
            message: "Gagal Menyimpan Data Umum",
            type: "error",
          });
      } else {
        // update
        const prosesUmum = await db("user_umum")
          .where("user_id", id)
          .update(forUmum);
        if (!prosesUmum)
          return res.json({
            message: "Gagal Menyimpan Data Umum",
            type: "error",
          });
      }

      res.json({ message: "Berhasil Mengubah Data" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
