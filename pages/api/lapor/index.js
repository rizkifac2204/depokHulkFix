import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

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
        kewarganegaraan,
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
          kewarganegaraan: kewarganegaraan || null,
          pekerjaan: pekerjaan || null,
          alamat: alamat || null,
          telp: telp || null,
          email: email || null,
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

async function prosesSimpanTerlapor(req, res, peristiwa_id) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const { terlapor } = req.body;

      terlapor.map(async (item, ind) => {
        if (item.nama) {
          await db("lapor_terlapor").insert({
            peristiwa_id,
            nama: item.nama,
            alamat: item.alamat || null,
            telp: item.telp || null,
          });
        }
      });

      resolve();
    } catch (error) {
      getLogger.error(error);
      reject({ message: "Gagal Menyimpan Pelapor." });
    }
  });
}

async function prosesSimpanSaksi(req, res, peristiwa_id) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const { saksi } = req.body;

      saksi.map(async (item, ind) => {
        if (item.nama) {
          await db("lapor_saksi").insert({
            peristiwa_id,
            nama: item.nama,
            alamat: item.alamat || null,
            telp: item.telp || null,
          });
        }
      });

      resolve();
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
        .select(
          "lapor_peristiwa.*",
          "lapor_pelapor.nama",
          "user.nama_admin",
          "bawaslu.nama_bawaslu"
        )
        .from("lapor_peristiwa")
        .innerJoin(
          "lapor_pelapor",
          "lapor_pelapor.id",
          "lapor_peristiwa.pelapor_id"
        )
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
        nama,
        nomor,
        peristiwa,
        tempat_kejadian,
        tanggal_kejadian,
        tanggal_diketahui,
        uraian,
        tempat_lapor,
        tanggal_lapor,
        jam_lapor,
      } = req.body;

      // pelapor id bisa diambil dari data object post jika ada, atau membuat baru
      const dataPelapor =
        nama && typeof nama !== "string"
          ? { id: nama.id, isNew: false }
          : await prosesSimpanPelapor(req, res);

      // proses insert
      const proses = await db("lapor_peristiwa").insert([
        {
          user_id,
          pelapor_id: dataPelapor.id,
          nomor: nomor || null,
          peristiwa: peristiwa || null,
          tempat_kejadian: tempat_kejadian || null,
          tanggal_kejadian: tanggal_kejadian
            ? moment(tanggal_kejadian).format("MM/DD/YYYY")
            : null,
          tanggal_diketahui: tanggal_diketahui
            ? moment(tanggal_diketahui).format("MM/DD/YYYY")
            : null,
          uraian: uraian || null,
          tempat_lapor: tempat_lapor || null,
          tanggal_lapor: tanggal_lapor
            ? moment(tanggal_lapor).format("MM/DD/YYYY")
            : null,
          jam_lapor: jam_lapor ? moment(jam_lapor).format("HH:MM") : null,
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

      await prosesSimpanTerlapor(req, res, proses[0]);
      await prosesSimpanSaksi(req, res, proses[0]);

      // success
      res.json({ message: "Berhasil Menginput Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
