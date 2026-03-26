import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const path = req.nextUrl.pathname;

  let isValidToken = false;

  // ✅ Verify token safely
  if (token) {
    try {
      await jwtVerify(token, secret);
      isValidToken = true;
    } catch {
      isValidToken = false;
    }
  }

  // ✅ Login page logic
  if (path === "/admin/login") {
    if (isValidToken) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // 🔐 Protect admin routes
  if (path.startsWith("/admin")) {
    if (!isValidToken) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};