import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const ProtectedRoutes = [
    "/card",
    "/about",
    "/brand",
    "/categories",
    "/shop",
  ];

  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("auth_token")?.value;

  const isProtected = ProtectedRoutes.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/notfound", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signup",
    "/signin",
    "/card/:path*",
    "/about/:path*",
    "/brand/:path*",
    "/categories/:path*",
    "/shop/:path*",
  ],
};
