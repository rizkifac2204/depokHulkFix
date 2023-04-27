import db from "libs/db";
import handlerPublic from "middlewares/handlerPublic";
import getLogger from "middlewares/getLogger";

export default handlerPublic().post(async (req, res) => {
  try {
    // get post
    const { nama, telp, email, uraian } = req.body;

    // proses insert
    const proses = await db("lapor_awal").insert([
      {
        nama,
        telp: telp || null,
        email: email || null,
        uraian: uraian || null,
      },
    ]);

    // failed
    if (!proses)
      return res.status(400).json({
        message: "Gagal Memasukan Data",
        type: "error",
      });

    // success
    res.json({
      message:
        "Berhasil Menginput Data, Mohon menunggu admin untuk menghubungi anda lewat telp atau email yang sudah anda masukan",
      type: "success",
    });
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
