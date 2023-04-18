import db from "libs/db";
import handler from "middlewares/handler";
import getLogger from "middlewares/getLogger";
import moment from "moment";

function filterData(builder, user_id, level) {
  if (level > 4) {
    builder.where("lapor_peristiwa.user_id", user_id);
  }
}

async function prosesPelapor(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      // get post
      const {
        pelapor_id,
        nama,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        pekerjaan,
        alamat,
        telp,
        email,
      } = req.body;

      const isNew = nama && typeof nama !== "string" ? false : true;

      if (isNew) {
        // proses insert
        const proses = await db("lapor_pelapor").insert([
          {
            nama: nama || null,
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
        if (!proses) reject({ message: "Gagal Menyimpan Pelapor." });
        resolve({ id: proses[0], isNew: true });
      } else {
        const idpelapor = pelapor_id === nama.id ? pelapor_id : nama.id;
        // proses update
        const proses = await db("lapor_pelapor")
          .where("id", idpelapor)
          .update({
            nama: nama.nama || null,
            tempat_lahir: tempat_lahir || null,
            tanggal_lahir: tanggal_lahir
              ? moment(tanggal_lahir).format("MM/DD/YYYY")
              : null,
            jenis_kelamin: jenis_kelamin || null,
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
  await db("lapor_pelapor").where("id", id).del();
}

export default handler()
  .get(async (req, res) => {
    try {
      const { peristiwa_id } = req.query;
      const { id: user_id, level } = req.session.user;
      const result = await db
        .select(
          "lapor_peristiwa.*",
          "lapor_pelapor.nama",
          "lapor_pelapor.tempat_lahir",
          "lapor_pelapor.tanggal_lahir",
          "lapor_pelapor.jenis_kelamin",
          "lapor_pelapor.pekerjaan",
          "lapor_pelapor.alamat",
          "lapor_pelapor.telp",
          "lapor_pelapor.email"
        )
        .from("lapor_peristiwa")
        .innerJoin("user", "user.id", "lapor_peristiwa.user_id")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .innerJoin(
          "lapor_pelapor",
          "lapor_pelapor.id",
          "lapor_peristiwa.pelapor_id"
        )
        .modify((builder) => filterData(builder, user_id, level))
        .where("lapor_peristiwa.id", peristiwa_id)
        .first();

      if (!result)
        return res
          .status(404)
          .json({ message: "Tidak Ditemukan", type: "error" });

      const dataTerlapor = await db("lapor_terlapor").where(
        "peristiwa_id",
        peristiwa_id
      );

      const dataSaksi = await db("lapor_saksi").where(
        "peristiwa_id",
        peristiwa_id
      );

      result.terlapor = dataTerlapor;
      result.saksi = dataSaksi;

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .put(async (req, res) => {
    try {
      const { id: user_id } = req.session.user;
      const { peristiwa_id } = req.query;
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
      } = req.body;

      const dataPelapor = await prosesPelapor(req, res);

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
      const proses = await db("lapor_peristiwa")
        .where("id", peristiwa_id)
        .update(dataUpdate);

      // failed
      if (!proses) {
        if (dataPelapor.isNew) await prosesHapusPelapor(dataPelapor.id);
        return res.status(400).json({
          message: "Gagal Mengubah Data",
          type: "error",
        });
      }
      res.json({ message: "Berhasil Mengubah Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { peristiwa_id } = req.query;

      const proses = await db("lapor_peristiwa")
        .where("id", peristiwa_id)
        .del();
      if (!proses)
        return res.status(400).json({ message: "Gagal Hapus", type: "error" });

      res.json({ message: "Berhasil Hapus", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
