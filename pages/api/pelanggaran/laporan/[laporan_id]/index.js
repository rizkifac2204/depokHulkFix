import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";
import { DeleteUpload } from "services/uploadService";

function filterData(builder, user_id, level) {
  if (level > 4) {
    builder.where("pelanggaran_laporan.user_id", user_id);
  }
}

async function prosesPelapor(req) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const {
        pelapor_id,
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

      const isNew = nama && typeof nama !== "string" ? false : true;

      if (isNew) {
        // proses insert
        const proses = await db("pelanggaran_pelapor").insert([
          {
            nama: nama || null,
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
      } else {
        const idpelapor = pelapor_id === nama.id ? pelapor_id : nama.id;
        // proses update
        const proses = await db("pelanggaran_pelapor")
          .where("id", idpelapor)
          .update({
            nama: nama.nama || null,
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
          });

        if (!proses) reject({ message: "Gagal Menyimpan Pelapor." });
        resolve({ id: idpelapor, isNew: false });
      }
    } catch (error) {
      getLogger.error(error);
      reject({ message: "Gagal Memperbarui Pelapor." });
    }
  });
}

async function prosesHapusPelapor(id) {
  await db("pelanggaran_pelapor").where("id", id).del();
}

async function prosesSimpanTerlapor(req, laporan_id) {
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

async function prosesSimpanSaksi(req, laporan_id) {
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
  .get(async (req, res) => {
    try {
      const { laporan_id } = req.query;
      const { id: user_id, level } = req.session.user;
      const result = await db
        .select(
          "pelanggaran_laporan.*",
          "pelanggaran_pelapor.nama",
          "pelanggaran_pelapor.tempat_lahir",
          "pelanggaran_pelapor.tanggal_lahir",
          "pelanggaran_pelapor.jenis_kelamin",
          "pelanggaran_pelapor.pekerjaan",
          "pelanggaran_pelapor.alamat",
          "pelanggaran_pelapor.telp",
          "pelanggaran_pelapor.email",
          "pelanggaran_pelapor.kewarganegaraan"
        )
        .from("pelanggaran_laporan")
        .innerJoin("user", "user.id", "pelanggaran_laporan.user_id")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .innerJoin(
          "pelanggaran_pelapor",
          "pelanggaran_pelapor.id",
          "pelanggaran_laporan.pelapor_id"
        )
        .modify((builder) => filterData(builder, user_id, level))
        .where("pelanggaran_laporan.id", laporan_id)
        .first();

      if (!result)
        return res
          .status(404)
          .json({ message: "Tidak Ditemukan", type: "error" });

      const dataTerlapor = await db("pelanggaran_terlapor").where(
        "laporan_id",
        laporan_id
      );
      const dataSaksi = await db("pelanggaran_saksi").where(
        "laporan_id",
        laporan_id
      );
      const dataBukti = await db("pelanggaran_bukti").where(
        "laporan_id",
        laporan_id
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
      const { id: user_id } = req.session.user;
      const { laporan_id } = req.query;
      // get post
      const {
        nomor,
        peristiwa,
        tempat_kejadian,
        tanggal_kejadian,
        tanggal_diketahui,
        uraian,
        tempat_lapor,
        tanggal_lapor,
        jam_lapor,
        changeTerlapor,
        changeSaksi,
      } = req.body;

      const dataPelapor = await prosesPelapor(req);

      const dataUpdate = {
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
      };

      // proses update
      const proses = await db("pelanggaran_laporan")
        .where("id", laporan_id)
        .update(dataUpdate);

      // failed
      if (!proses) {
        if (dataPelapor.isNew) await prosesHapusPelapor(dataPelapor.id);
        return res.status(400).json({
          message: "Gagal Mengubah Data",
          type: "error",
        });
      }

      if (changeTerlapor) {
        // hapus dulu
        await db("pelanggaran_terlapor").where("laporan_id", laporan_id).del();
        await prosesSimpanTerlapor(req, laporan_id);
      }
      if (changeSaksi) {
        // hapus dulu
        await db("pelanggaran_saksi").where("laporan_id", laporan_id).del();
        await prosesSimpanSaksi(req, laporan_id);
      }

      res.json({ message: "Berhasil Mengubah Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { laporan_id } = req.query;

      const cek = await db
        .select("file")
        .from("pelanggaran_bukti")
        .where("laporan_id", laporan_id);

      const files = cek.map(function (value) {
        return value.file;
      });

      const proses = await db("pelanggaran_laporan")
        .where("id", laporan_id)
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
