import db from "libs/db";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const LoginCredential = async (req, res) => {
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

  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 hari
      id: checkUser.id,
      level: checkUser.level_id,
      nama_level: checkUser.nama_level,
      bawaslu_id: checkUser.bawaslu_id,
      email_admin: checkUser.email_admin,
      name: checkUser.nama_admin,
      image: null,
    },
    process.env.JWT_SECRET_KEY
  );

  const serialized = serialize("depokApps", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  res.status(200).json({ message: "Success Login" });
};

export default LoginCredential;
