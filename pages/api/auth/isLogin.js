import jwtDecode from "jwt-decode";
import cookie from "cookie";
import getLogger from "middlewares/getLogger";

const isLogin = async (req, res) => {
  try {
    const { depokApps } = cookie.parse(req.headers.cookie);
    if (!depokApps)
      return res.status(401).json({ message: "Akses Tidak Dikenal" });
    const decoded = jwtDecode(depokApps);
    res.json(decoded);
  } catch (err) {
    getLogger.error(error);
    res.status(401).json({ message: "Akses Tidak Dikenal" });
  }
};

export default isLogin;
