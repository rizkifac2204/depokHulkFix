import db from "libs/db";
import { setUserCookie } from "libs/auth";

export default async function LoginByEmail(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { email, image } = req.body;

  if (!email) return res.status(401).json({ message: "Not Detected" });

  const checkUser = await db
    .select(`user.*`, `level.nama_level`)
    .from(`user`)
    .innerJoin(`level`, `user.level_id`, `level.id`)
    .where(`user.email_admin`, email)
    .first();

  if (!checkUser)
    return res.status(401).json({ message: "Data User Tidak Ditemukan" });

  const dataForJWT = {
    id: checkUser.id,
    level: checkUser.level_id,
    nama_level: checkUser.nama_level,
    bawaslu_id: checkUser.bawaslu_id,
    email_admin: checkUser.email_admin,
    name: checkUser.nama_admin,
    verifikator: checkUser.verifikator,
    image: image,
  };

  try {
    await setUserCookie(dataForJWT, res);
    return res.status(200).json({ message: "Success Login", type: "success" });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}
