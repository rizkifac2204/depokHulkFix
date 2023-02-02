import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler().get(async (req, res) => {
  try {
    const { id } = req.query;
    const result = await db
      .select("*")
      .from("user_alamat")
      .where("user_id", id)
      .first();

    if (!result) return res.json({});
    res.json(result);
  } catch (error) {
    getLogger.error(error);
    res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
  }
});
// .put(async (req, res) => {
//   try {
//     const { id } = req.session.user;
//     const {
//       alamat,
//       rt,
//       rw,
//       kode_pos,
//       provinsi,
//       kabkota,
//       kecamatan,
//       kelurahan,
//       passwordConfirm,
//     } = req.body;

//     const cek = await db("user").where("id", id).first();
//     if (!cek)
//       return res
//         .status(401)
//         .json({ message: "User Tidak Terdeteksi", type: "error" });

//     // jika password tidak sama
//     const match = await bcrypt.compare(passwordConfirm, cek.password);

//     if (!match)
//       return res
//         .status(401)
//         .json({ message: "Password Anda Salah", type: "error" });

//     const forAlamat = {
//       alamat,
//       rt,
//       rw,
//       provinsi,
//       kabkota,
//       kecamatan,
//       kelurahan,
//       kode_pos,
//     };

//     const cekExist = await db(`user_alamat`).where("user_id", id).first();
//     if (!cekExist) {
//       // insert
//       const prosesAlamat = await db("user_alamat").insert({
//         ...forAlamat,
//         user_id: id,
//       });
//       if (!prosesAlamat)
//         return res.json({
//           message: "Gagal Menyimpan Data Alamat",
//           type: "error",
//         });
//     } else {
//       // update
//       const prosesAlamat = await db("user_alamat")
//         .where("user_id", id)
//         .update(forAlamat);
//       if (!prosesAlamat)
//         return res.json({
//           message: "Gagal Menyimpan Data Alamat",
//           type: "error",
//         });
//     }

//     res.json({ message: "Berhasil Mengubah Data Profile" });
//   } catch (error) {
//     getLogger.error(error);
//     res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
//   }
// });
