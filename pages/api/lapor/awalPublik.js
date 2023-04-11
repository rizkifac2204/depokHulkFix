import db from "libs/db";
import handlerPublic from "middlewares/handlerPublic";
import getLogger from "middlewares/getLogger";

export default handlerPublic().post(async (req, res) => {
  try {
    // get post
    const { nama, telp, penjelasan } = req.body;

    // proses insert
    const proses = await db("lapor_awal").insert([
      {
        nama,
        telp,
        penjelasan: penjelasan,
        created_at: db.fn.now(),
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
        "Terimakasih Sudah melakukan Laporan Awal, Mohon Menunggu Balasan Dari Bawaslu",
      type: "success",
    });
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
