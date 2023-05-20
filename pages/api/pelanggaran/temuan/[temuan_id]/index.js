import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";
import { DeleteUpload } from "services/uploadService";
import { subQueryFilterPelanggaran } from "middlewares/middlewarePelanggaran";

async function prosesSimpanTerlapor(req, temuan_id) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const { terlapor } = req.body;

      terlapor.map(async (item, ind) => {
        if (item.nama) {
          await db("pelanggaran_terlapor").insert({
            laporan_id: null,
            temuan_id,
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
            laporan_id: null,
            temuan_id,
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
      const { temuan_id } = req.query;
      const result = await db
        .select(
          "pelanggaran_temuan.*",
          "user.nama_admin",
          "bawaslu.nama_bawaslu"
        )
        .from("pelanggaran_temuan")
        .innerJoin("user", "user.id", "pelanggaran_temuan.user_id")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .where("pelanggaran_temuan.id", temuan_id)
        .whereIn(`pelanggaran_temuan.user_id`, req.subqueryPelanggaran)
        .first();

      if (!result)
        return res
          .status(404)
          .json({ message: "Tidak Ditemukan", type: "error" });

      const dataTerlapor = await db("pelanggaran_terlapor").where(
        "temuan_id",
        temuan_id
      );
      const dataSaksi = await db("pelanggaran_saksi").where(
        "temuan_id",
        temuan_id
      );
      const dataBukti = await db("pelanggaran_bukti").where(
        "temuan_id",
        temuan_id
      );

      result.terlapor = dataTerlapor;
      result.saksi = dataSaksi;
      result.bukti = dataBukti;

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(async (req, res) => {
    try {
      const { temuan_id } = req.query;
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
        changeTerlapor,
        changeSaksi,
      } = req.body;

      const dataUpdate = {
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
      };

      // proses update
      const proses = await db("pelanggaran_temuan")
        .where("id", temuan_id)
        .update({ ...dataUpdate, updated_at: db.fn.now() });

      // failed
      if (!proses) {
        return res.status(400).json({
          message: "Gagal Mengubah Data",
          type: "error",
        });
      }

      if (changeTerlapor) {
        // hapus dulu
        await db("pelanggaran_terlapor").where("temuan_id", temuan_id).del();
        await prosesSimpanTerlapor(req, temuan_id);
      }
      if (changeSaksi) {
        // hapus dulu
        await db("pelanggaran_saksi").where("temuan_id", temuan_id).del();
        await prosesSimpanSaksi(req, temuan_id);
      }

      res.json({ message: "Berhasil Mengubah Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { temuan_id } = req.query;

      const cek = await db
        .select("file")
        .from("pelanggaran_bukti")
        .where("temuan_id", temuan_id);

      const files = cek.map(function (value) {
        return value.file;
      });

      const proses = await db("pelanggaran_temuan")
        .where("id", temuan_id)
        .del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      DeleteUpload("./public/lapor", files);

      res.json({ message: "Berhasil Hapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
