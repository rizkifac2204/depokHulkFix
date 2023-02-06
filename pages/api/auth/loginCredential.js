import db from "libs/db";
import bcrypt from "bcryptjs";
import { setUserCookie } from "libs/auth";

export default async function LoginCredential(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ message: "Isi Semua Data" });

  const checkUser = await db
    .select(`user.*`, `level.nama_level`)
    .from(`user`)
    .innerJoin(`level`, `user.level_id`, `level.id`)
    .where(`user.username`, username)
    .first();

  if (!checkUser)
    return res.status(401).json({ message: "Data Tidak Ditemukan" });

  const match = await bcrypt.compare(password, checkUser.password);

  if (!match) return res.status(401).json({ message: "Data Tidak Ditemukan" });

  const dataForJWT = {
    id: checkUser.id,
    level: checkUser.level_id,
    nama_level: checkUser.nama_level,
    bawaslu_id: checkUser.bawaslu_id,
    email_admin: checkUser.email_admin,
    name: checkUser.nama_admin,
    verifikator: checkUser.verifikator,
    image: null,
  };

  try {
    await setUserCookie(dataForJWT, res);
    return res.status(200).json({ message: "Success Login" });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}
