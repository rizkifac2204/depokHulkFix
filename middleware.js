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
  }

  return NextResponse.next();
}
