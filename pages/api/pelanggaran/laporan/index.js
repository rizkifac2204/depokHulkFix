import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";
import { subQueryFilterPelanggaran } from "middlewares/middlewarePelanggaran";

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
      const proses = await db("pelanggaran_pelapor").insert([
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

async function prosesHapusPelapor(id) {
  await db("pelanggaran_pelapor").where("id", id).del();
}

async function prosesSimpanTerlapor(req, res, laporan_id) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const { terlapor } = req.body;

      terlapor.map(async (item, ind) => {
        if (item.nama) {
          await db("pelanggaran_terlapor").insert({
            laporan_id,
            temuan_id: null,
            nama: item.nama || null,
            alamat: item.alamat || null,
            telp: item.telp || null,
          });
        }
      });

      resolve();
    } catch (error) {
      getLogger.error(error);
      reject({ message: "Gagal Menyimpan Terlapor." });
    }
  });
}

async function prosesSimpanSaksi(req, res, laporan_id) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const { saksi } = req.body;

      saksi.map(async (item, ind) => {
        if (item.nama) {
          await db("pelanggaran_saksi").insert({
            laporan_id,
            temuan_id: null,
            nama: item.nama || null,
            alamat: item.alamat || null,
            telp: item.telp || null,
          });
        }
      });

      resolve();
    } catch (error) {
      getLogger.error(error);
      reject({ message: "Gagal Menyimpan Saksi." });
    }
  });
}

export default handler()
  .get(subQueryFilterPelanggaran, async (req, res) => {
    try {
      const result = await db
        .select(
          "pelanggaran_laporan.*",
          "pelanggaran_pelapor.nama",
          "user.nama_admin",
          "bawaslu.nama_bawaslu"
        )
        .from("pelanggaran_laporan")
        .innerJoin(
          "pelanggaran_pelapor",
          "pelanggaran_pelapor.id",
          "pelanggaran_laporan.pelapor_id"
        )
        .innerJoin("user", "user.id", "pelanggaran_laporan.user_id")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .whereIn(`pelanggaran_laporan.user_id`, req.subqueryPelanggaran);

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
      const proses = await db("pelanggaran_laporan").insert([
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
