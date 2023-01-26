import { NextResponse } from "next/server";
// import jwtDecode from "jwt-decode";

export const config = {
  matcher: ["/(admin.*)", "/login"],
};

export default function middleware(req, res) {
  const { pathname, origin } = req.nextUrl;
  const depokApps = req.cookies.get("depokApps")?.value;

  if (pathname.startsWith("/login")) {
    if (depokApps) return NextResponse.redirect(`${origin}/admin`);
  }
  if (pathname.startsWith("/admin")) {
    if (!depokApps) return NextResponse.redirect(`${origin}/login`);
    // const decoded = jwtDecode(depokApps);
    // console.log(decoded, "ini", req.nextUrl, "apa", pathname);
  }

  return NextResponse.next();
}
