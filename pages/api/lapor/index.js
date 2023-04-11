import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";

function filterData(builder, user_id, level) {
  if (level > 4) {
    builder.where("lapor_peristiwa.user_id", user_id);
  }
}

async function prosesSimpanPelapor(req, res) {
  return new Promise(async (resolve, reject) => {
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

      // proses insert
      const proses = await db("lapor_pelapor").insert([
        {
          nama,
          tempat_lahir,
          tanggal_lahir,
          jenis_kelamin,
          pekerjaan,
          alamat,
          telp,
          email,
        },
      ]);

      // failed
      if (!proses) reject({ message: "Gagal Menyimpan Pelapor." });

      resolve({ id: proses[0], isNew: true });
    } catch (error) {
      getLogger.error(error);
      reject({ message: "Gagal Menyimpan Pelapor." });
    }
  });
}

async function prosesHapusPelapor(id) {
  await db("lapor_pelapor").where("id", id).del();
}

export default handler()
  .get(async (req, res) => {
    try {
      const { id: user_id, level } = req.session.user;
      const result = await db
        .select("lapor_peristiwa.*", "user.nama_admin", "bawaslu.nama_bawaslu")
        .from("lapor_peristiwa")
        .innerJoin("user", "user.id", "lapor_peristiwa.user_id")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .modify((builder) => filterData(builder, user_id, level));

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({
        message: error.message || "Terjadi Kesalahan...",
        type: "error",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;

      // get post
      const {
        pelapor,
        nomor,
        peristiwa,
        hari_kejadian,
        tanggal_kejadian,
        hari_diketahui,
        tanggal_diketahui,
        uraian,
        tempat_lapor,
        hari_lapor,
        tanggal_lapor,
        jam_lapor,
      } = req.body;

      // pelapor id bisa diambil dari data object post jika ada, atau membuat baru
      const dataPelapor =
        Object.keys(pelapor) !== 0
          ? { id: pelapor.id, isNew: false }
          : await prosesSimpanPelapor(req, res);

      // proses insert
      const proses = await db("lapor_peristiwa").insert([
        {
          user_id,
          pelapor_id: dataPelapor.id,
          nomor,
          peristiwa,
          hari_kejadian,
          tanggal_kejadian,
          hari_diketahui,
          tanggal_diketahui,
          uraian,
          tempat_lapor,
          hari_lapor,
          tanggal_lapor,
          jam_lapor,
        },
      ]);

      // failed
      if (!proses) {
        if (dataPelapor.isNew) await prosesHapusPelapor(dataPelapor.id);
        return res.status(400).json({
          message: "Gagal Memasukan Data",
          type: "error",
        });
      }

      // success
      res.json({ message: "Berhasil Menginput Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
