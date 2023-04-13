import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

export default handler()
  .get(async (req, res) => {
    try {
      const result = await db
        .select("*")
        .from("lapor_pelapor")
        .orderBy("nama", "asc");

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      // get post
      const {
        nama,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        pekerjaan,
        alamat,
        telp,
        email,
      } = req.body;
      const namaPelapor = nama && typeof nama !== "string" ? nama.nama : nama;

      // proses insert
      const proses = await db("lapor_pelapor").insert([
        {
          nama: namaPelapor || null,
          tempat_lahir: tempat_lahir || null,
          tanggal_lahir: tanggal_lahir
            ? moment(tanggal_lahir).format("MM/DD/YYYY")
            : null,
          jenis_kelamin: jenis_kelamin || null,
          pekerjaan: pekerjaan || null,
          alamat: alamat || null,
          telp: telp || null,
          email: email || null,
        },
      ]);

      // failed
      if (!proses)
        return res.status(400).json({
          message: "Gagal Memasukan Data",
          type: "error",
        });

      // success
      res.json({ message: "Pelapor Disimpan", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
