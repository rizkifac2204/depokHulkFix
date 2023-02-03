import db from "libs/db";
import Handler from "middlewares/Handler";
import bcrypt from "bcryptjs";
import getLogger from "middlewares/getLogger";

function capitalizeFirstLetter(words) {
  var separateWord = words.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  let fullWords = separateWord.join(" ");
  let modifiedWord = fullWords.replace("Kab.", "Kabupaten");
  return modifiedWord;
}

function createBawaluId(req, res) {
  return new Promise((resolve, reject) => {
    var level_id = req.body.level_id;
    var provinsi_id = req.body.provinsi_id;
    var kabkota_id = req.body.kabkota_id;
    var kecamatan_id = req.body.kecamatan_id;
    var kelurahan_id = req.body.kelurahan_id;
    var bawaslu_id;

    // MENETUKAN BAWASLU ID
    if (level_id === 1) {
      var bawaslu_id = 0;
    }
    if (level_id === 2) {
      var bawaslu_id = 1;
    }
    if (level_id === 3) {
      if (!provinsi_id)
        return res.status(400).json({
          message: "Provinsi Harus Diisi",
          type: "error",
        });
      var bawaslu_id = provinsi_id;
    }
    if (level_id === 4) {
      if (!kabkota_id)
        return res
          .status(400)
          .json({ message: "Kabupaten/Kota Harus Diisi", type: "error" });
      var bawaslu_id = kabkota_id;
    }
    if (level_id === 5) {
      if (!kecamatan_id)
        return res
          .status(400)
          .json({ message: "Kecamatan Harus Diisi", type: "error" });
      var bawaslu_id = kecamatan_id;
    }
    if (level_id === 6) {
      if (!kelurahan_id)
        return res
          .status(400)
          .json({ message: "Kelurahan Harus Diisi", type: "error" });
      var bawaslu_id = kelurahan_id;
    }

    return resolve(bawaslu_id);
  });
}

function createBawasluNama(level_id, bawaslu_id, res) {
  return new Promise(async (resolve, reject) => {
    var nama_bawaslu;

    // AMBIL NAMA KABUPATEN/PROVINSI UNTUK DATA BAWASLU
    if (level_id == 2) {
      var nama_bawaslu = "Bawaslu Republik Indonesia";
    }
    if (level_id == 3) {
      const getNamaBawaslu = await db
        .select("provinsi")
        .from("provinsi")
        .where("id", bawaslu_id)
        .first();
      var nama_bawaslu = capitalizeFirstLetter(
        "Bawaslu " + getNamaBawaslu.provinsi
      );
    }
    if (level_id == 4) {
      const getNamaBawaslu = await db
        .select("kabkota")
        .from("kabkota")
        .where("id", bawaslu_id)
        .first();
      var nama_bawaslu = capitalizeFirstLetter(
        "Bawaslu " + getNamaBawaslu.kabkota
      );
    }
    if (level_id == 5) {
      const getNamaBawaslu = await db
        .select("kecamatan")
        .from("kecamatan")
        .where("id", bawaslu_id)
        .first();
      var nama_bawaslu = capitalizeFirstLetter(
        "Panwaslu Kecamatan " + getNamaBawaslu.kecamatan
      );
    }
    if (level_id == 6) {
      const getNamaBawaslu = await db
        .select("kelurahan")
        .from("kelurahan")
        .where("id", bawaslu_id)
        .first();
      var nama_bawaslu = capitalizeFirstLetter(
        "Panwaslu Kelurahan/Desa " + getNamaBawaslu.kelurahan
      );
    }

    return resolve(nama_bawaslu);
  });
}

export default Handler()
  .get(async (req, res) => {
    try {
      const { id: user_id, level, bawaslu_id, verifikator } = req.session.user;
      const data = await db
        .select("user.*", "bawaslu.nama_bawaslu", "level.nama_level")
        .from("user")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .innerJoin("level", "user.level_id", "level.id")
        .orderBy("user.id", "asc")
        .whereNot("user.id", 1);

      // sorting editable
      const result = data
        .map((item) => {
          // jika admin
          if (level === 1) return { ...item, editable: true };
          // jika (level sama) (unit sama) (verifikator)
          if (
            level === item.level_id &&
            bawaslu_id === item.bawaslu_id &&
            verifikator === 1
          )
            return { ...item, editable: true };
          // //jika (level lebih kecil) (DISNI HARUSNYA DISORTIR JIKA MEMILIKI WILAYAH YANG SAMA)
          if (level < item.bawaslu_id) return { ...item, editable: true };
          // goon
          return { ...item, editable: false };
        })
        // sorting myself
        .map((item) => {
          if (user_id === item.id) return { ...item, myself: true };
          return { ...item, myself: false };
        });

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        id: creater_id,
        level: creater_level,
        bawaslu_id: creater_bawaslu_id,
        verifikator: creater_verifikator,
      } = req.session.user;

      // get post
      const {
        level_id,
        verifikator,
        nama_admin,
        telp_admin,
        email_admin,
        username,
        password,
      } = req.body;

      // authorization
      if (creater_level > level_id)
        return res
          .status(401)
          .json({ message: "Tidak ada izin", type: "error" });
      if (creater_level == level_id && creater_verifikator === 0)
        return res
          .status(401)
          .json({ message: "Tidak ada izin", type: "error" });

      // dynamis post
      var provinsi_id = req.body.provinsi_id;
      var kabkota_id = req.body.kabkota_id;
      var kecamatan_id = req.body.kecamatan_id;
      var kelurahan_id = req.body.kelurahan_id;
      var bawaslu_id = await createBawaluId(req, res);
      var nama_bawaslu = await createBawasluNama(level_id, bawaslu_id, res);

      // cek jika ada username yang sama
      const cekUsernameSama = await db("user")
        .where("username", username)
        .first();
      if (cekUsernameSama)
        return res
          .status(401)
          .json({ message: "Mohon Ganti Username", type: "error" });

      // proses insert data bawaslu jika belum ada
      const cekDataBawaslu = await db("bawaslu")
        .where("id", bawaslu_id)
        .first();
      if (!cekDataBawaslu) {
        const insertDataBawaslu = await db("bawaslu").insert([
          {
            id: bawaslu_id,
            provinsi_id: provinsi_id || null,
            kabkota_id: kabkota_id || null,
            kecamatan_id: kecamatan_id || null,
            kelurahan_id: kelurahan_id || null,
            nama_bawaslu,
          },
        ]);
        // failed
        if (!insertDataBawaslu)
          return res.status(400).json({
            message: "Terjadi Kesalahan Sistem Memasukan Data Bawaslu",
            type: "error",
          });
      }

      // enkrip password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      // proses insert
      const proses = await db("user").insert([
        {
          level_id,
          verifikator,
          bawaslu_id,
          nama_admin,
          telp_admin: telp_admin || null,
          email_admin: email_admin || null,
          username,
          password: hash,
          valid: 1,
          login: 0,
        },
      ]);

      // failed
      if (!proses)
        return res.status(400).json({
          message: "Gagal Memasukan Data",
          type: "error",
        });

      // success
      res.json({ message: "Berhasil Menginput Data", type: "success" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
    }
  });
// .delete(async (req, res) => {
//   try {
//     const { id: user_id } = req.session.user;
//     const arrID = req.body;
//     const proses = await db("user_keluarga_anak").whereIn("id", arrID).del();

//     if (!proses)
//       return res.status(400).json({ message: "Gagal Hapus", type: "error" });

//     res.json({ message: "Sukses Menghapus Data Terpilih", type: "success" });
//   } catch (error) {
//     getLogger.error(error);
//     res.status(500).json({ message: "Terjadi Kesalahan..." });
//   }
// });
