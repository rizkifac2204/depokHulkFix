import db from "libs/db";

export const isEditable = (level, bawaslu_id, verifikator, obj) => {
  if (level === 1) return true;
  if (
    level === obj.level_id &&
    bawaslu_id === obj.bawaslu_id &&
    verifikator === 1
  )
    return true;
  if (level < obj.level_id) return true;
  return false;
};

export const isMyself = (idAdmin, idUser) => {
  if (idAdmin === idUser) return true;
  return false;
};

export const capitalizeFirstLetter = (words) => {
  var separateWord = words.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  let fullWords = separateWord.join(" ");
  let modifiedWord = fullWords.replace("Kab.", "Kabupaten");
  return modifiedWord;
};

export const createBawaluId = async (req, res) => {
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
};

export const createBawasluNama = async (level_id, bawaslu_id, res) => {
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
};
