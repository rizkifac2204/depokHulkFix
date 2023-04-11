import db from "libs/db";
import handler from "middlewares/handler";
import bcrypt from "bcryptjs";
import getLogger from "middlewares/getLogger";

import {
  isEditable,
  isMyself,
  createBawaluId,
  createBawasluNama,
} from "middlewares/simpegAttrs";

export default handler()
  .get(async (req, res) => {
    try {
      const { id: user_id, level, bawaslu_id, verifikator } = req.session.user;
      const data = await db
        .select("user.*", "bawaslu.nama_bawaslu", "level.nama_level")
        .from("user")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .innerJoin("level", "user.level_id", "level.id")
        .orderBy("user.level_id", "asc")
        .orderBy("user.nama_admin", "asc")
        .whereNot("user.id", 1);

      // sorting editable
      const result = data.map((item) => {
        return {
          ...item,
          editable: isEditable(level, bawaslu_id, verifikator, item),
          myself: isMyself(user_id, item.id),
        };
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
