import { expireUserCookie } from "libs/auth";

export default async function Logout(req, res) {
  await expireUserCookie(res);
  res.status(200).json({ message: "Success Logout" });
}
