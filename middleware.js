import { NextResponse } from "next/server";
import { verifyAuth } from "libs/auth";

export const config = {
  matcher: ["/(admin.*)", "/login"],
};

export async function middleware(req, res) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get(process.env.JWT_NAME)?.value;
  const verifiedToken = await verifyAuth(token, res).catch((err) => {
    // if (pathname.startsWith("/admin"))
    //   return NextResponse.redirect(`${origin}/login`);
  });

  if (pathname.startsWith("/login")) {
    if (verifiedToken) return NextResponse.redirect(`${origin}/admin`);
  }

  if (pathname.startsWith("/admin")) {
    if (!verifiedToken) return NextResponse.redirect(`${origin}/login`);

    // PROFILE
    // ---

    // SIMPEG
    // blokir tambah user untuk pkd kebawah
    if (pathname === "/admin/simpeg/add" && verifiedToken.level > 5)
      return NextResponse.rewrite(`${origin}/404`);

    // PELANGGARAN
    // redirect tidak ada file
    if (pathname === "/admin/pelanggaran")
      return NextResponse.redirect(`${origin}/admin/pelanggaran/laporan`);
    // blokir laporan awal untuk kecamatan kebawah
    if (pathname === "/admin/pelanggaran/awal" && verifiedToken.level > 4)
      return NextResponse.rewrite(`${origin}/404`);
  }

  return NextResponse.next();
}
