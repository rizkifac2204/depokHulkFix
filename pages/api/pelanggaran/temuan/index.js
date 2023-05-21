import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";
import { subQueryFilterPelanggaran } from "middlewares/middlewarePelanggaran";

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
  .get(subQueryFilterPelanggaran, async (req, res) => {
    try {
      const result = await db
        .select(
          "pelanggaran_temuan.*",
          "admin.nama_admin",
          "bawaslu.nama_bawaslu",
          "petugas.nama_admin as petugas_nama",
          "user_alamat.alamat as petugas_alamat",
          "user_umum.jabatan as petugas_jabatan"
        )
        .from("pelanggaran_temuan")
        .join("user as admin", "admin.id", "=", "pelanggaran_temuan.user_id")
        .join("bawaslu", "bawaslu.id", "=", "admin.bawaslu_id")
        .join(
          "user as petugas",
          "petugas.id",
          "=",
          "pelanggaran_temuan.petugas_id"
        )
        .leftJoin("user_alamat", "petugas.id", "=", "user_alamat.user_id")
        .leftJoin("user_umum", "petugas.id", "=", "user_umum.user_id")
        .whereIn(`pelanggaran_temuan.user_id`, req.subqueryPelanggaran);

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
        petugas,
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
          petugas_id: petugas.petugas_id,
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
