import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ROLE_HOME } from "@/lib/constants";
import type { Role } from "@/types";

// Gatekeeper for every request.
//   1. Not signed in  -> /login (pages) or 401 JSON (API).
//   2. Signed in      -> each role may open only its own area; anyone else is sent to their home.
// API routes also check the role themselves (requireUser in src/server/api-helpers.ts).

const AREAS: [prefix: string, role: Role][] = [
  ["/student", "Student"],
  ["/caretaker", "Caretaker"],
  ["/supervisor", "Supervisor"],
  ["/warden", "Warden"],
];

function areaRole(pathname: string): Role | null {
  for (const [prefix, role] of AREAS) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) return role;
  }
  return null;
}

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

  if (!isApi) {
    const role = req.auth?.user?.role ?? "Student";
    const needed = areaRole(pathname);
    if (needed && needed !== role) {
      return NextResponse.redirect(new URL(ROLE_HOME[role], req.nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
