import { NextResponse } from "next/server";

export const config = {
  matcher: ["/(admin.*)", "/login"],
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico).*)",
  // ],
};

export default function middleware(req, res) {
  const { pathname, origin } = req.nextUrl;
  const depokApps = req.cookies.get("depokApps")?.value;

  if (pathname.startsWith("/login")) {
    if (depokApps) return NextResponse.redirect(`${origin}/admin`);
  }
  if (pathname.startsWith("/admin")) {
    if (!depokApps) return NextResponse.redirect(`${origin}/login`);
  }

  return NextResponse.next();
}
