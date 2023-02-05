import nextConnect from "next-connect";
import cookie from "cookie";
const jwt = require("jsonwebtoken");
import getLogger from "middlewares/getLogger";

export default function Handler() {
  return nextConnect({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: err.toString(), type: "error" });
    },
    onNoMatch: (req, res) => {
      res.status(404).json({ message: "Not found", type: "error" });
    },
  }).use(async (req, res, next) => {
    const { depokApps } = cookie.parse(req.headers.cookie);
    if (!depokApps)
      return res.status(401).json({ message: "Akses Tidak Dikenal" });
    try {
      const decoded = jwt.verify(depokApps, process.env.JWT_SECRET_KEY);
      req.session = {
        user: decoded,
      };
      next();
    } catch (err) {
      getLogger.error(err);
      return res.status(401).json({ message: "Akses Tidak Dikenal" });
    }
  });
}
