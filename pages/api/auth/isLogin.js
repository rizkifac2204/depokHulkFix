import cookie, { serialize } from "cookie";
import getLogger from "middlewares/getLogger";
const jwt = require("jsonwebtoken");

const isLogin = async (req, res) => {
  const { depokApps } = cookie.parse(req.headers.cookie);
  if (!depokApps)
    return res.status(401).json({ message: "Akses Tidak Dikenal" });
  try {
    const decoded = jwt.verify(depokApps, process.env.JWT_SECRET_KEY);
    res.json(decoded);
  } catch (err) {
    getLogger.error(err);

    const serialized = serialize("depokApps", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(401).json({ message: "Akses Tidak Dikenal" });
  }
};

export default isLogin;
