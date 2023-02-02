import db from "libs/db";
import Handler from "middlewares/Handler";
import getLogger from "middlewares/getLogger";

export default Handler().get(async (req, res) => {
  try {
    const { id: user_id, level, bawaslu_id, verifikator } = req.session.user;
    const data = await db
      .select("user.*", "bawaslu.nama_bawaslu", "level.nama_level")
      .from("user")
      .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
      .innerJoin("level", "user.level_id", "level.id")
      .orderBy("user.id", "asc");

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
});
// .post(async (req, res) => {
//   try {
//     const { id: user_id } = req.session.user;
//     const {
//       nama,
//       jenis_kelamin,
//       tempat_lahir,
//       tanggal_lahir,
//       anak_ke,
//       pekerjaan,
//       keterangan,
//     } = req.body;

//     // required
//     if (!nama)
//       return res.status(400).json({
//         message: "Nama Wajib Diisi",
//         type: "error",
//       });

//     const dataForInsert = {
//       user_id,
//       nama,
//       jenis_kelamin,
//       tempat_lahir,
//       tanggal_lahir: tanggal_lahir
//         ? moment(tanggal_lahir).format("MM/DD/YYYY")
//         : null,
//       anak_ke,
//       pekerjaan,
//       keterangan,
//       validasi: 0,
//     };

//     // proses simpan
//     const proses = await db("user_keluarga_anak").insert(dataForInsert);

//     // failed
//     if (!proses)
//       return res.status(400).json({
//         message: "Gagal Menyimpan Data",
//         type: "error",
//       });

//     // success
//     res.json({ message: "Berhasil Menginput Data", type: "success" });
//   } catch (error) {
//     getLogger.error(error);
//     res.status(500).json({ message: "Terjadi Kesalahan...", type: "error" });
//   }
// })
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
