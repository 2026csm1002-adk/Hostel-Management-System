import { NextResponse } from "next/server";
import { auth } from "@/auth";

// TEMPORARY gatekeeper: only checks "is someone signed in?".
// Role rules (student area vs admin area) are added here once roles are decided.
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const signedIn = !!req.auth?.user;
  const isApi = pathname.startsWith("/api/");

  if (pathname.startsWith("/api/auth")) return; // Google's login routes

  if (!signedIn) {
    if (pathname === "/login") return;
    return isApi
      ? NextResponse.json({ error: "Not signed in" }, { status: 401 })
      : NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Already signed in: no need for the login screen
  if (pathname === "/login") return NextResponse.redirect(new URL("/", req.nextUrl));
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
