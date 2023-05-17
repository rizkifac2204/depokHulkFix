import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

function filterData(builder, user_id, level) {
  if (level > 4) {
    builder.where("pelanggaran_temuan.user_id", user_id);
  }
}

async function prosesSimpanTerlapor(req, temuan_id) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const { terlapor } = req.body;

      terlapor.map(async (item, ind) => {
        if (item.nama) {
          await db("pelanggaran_terlapor").insert({
            temuan_id,
            laporan_id: null,
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

async function prosesSimpanSaksi(req, temuan_id) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const { saksi } = req.body;

      saksi.map(async (item, ind) => {
        if (item.nama) {
          await db("pelanggaran_saksi").insert({
            temuan_id,
            laporan_id: null,
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
  .get(async (req, res) => {
    try {
      const { id: user_id, level } = req.session.user;
      const result = await db
        .select(
          "pelanggaran_temuan.*",
          "user.nama_admin",
          "bawaslu.nama_bawaslu"
        )
        .from("pelanggaran_temuan")
        .innerJoin("user", "user.id", "pelanggaran_temuan.user_id")
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
        nomor,
        nama,
        jabatan,
        alamat,
        peristiwa,
        tempat_kejadian,
        tanggal_kejadian,
        tanggal_diketahui,
        uraian,
      } = req.body;

      // proses insert
      const proses = await db("pelanggaran_temuan").insert([
        {
          user_id,
          nomor: nomor || null,
          nama: nama || null,
          jabatan: jabatan || null,
          alamat: alamat || null,
          peristiwa: peristiwa || null,
          tempat_kejadian: tempat_kejadian || null,
          tanggal_kejadian: tanggal_kejadian
            ? moment(tanggal_kejadian).format("MM/DD/YYYY")
            : null,
          tanggal_diketahui: tanggal_diketahui
            ? moment(tanggal_diketahui).format("MM/DD/YYYY")
            : null,
          uraian: uraian || null,
        },
      ]);

      // failed
      if (!proses) {
        return res.status(400).json({
          message: "Gagal Memasukan Data",
          type: "error",
        });
      }

      await prosesSimpanTerlapor(req, proses[0]);
      await prosesSimpanSaksi(req, proses[0]);

      // success
      res.json({ message: "Berhasil Menginput Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
