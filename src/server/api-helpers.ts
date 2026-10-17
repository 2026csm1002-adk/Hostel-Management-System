import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "@/auth";
import { AppError, UnauthorizedError } from "@/server/errors";
import { requireRole } from "@/server/services/auth.service";
import type { Role, SessionUser } from "@/types";

/** The signed-in user if their role is allowed; throws 401 (not signed in) or 403 (wrong role). */
export async function requireUser(allowed: Role[]): Promise<SessionUser> {
  const session = await auth();
  const u = session?.user;
  if (!u?.email) throw new UnauthorizedError();
  const user: SessionUser = {
    email: u.email.trim().toLowerCase(),
    role: u.role,
    userId: u.userId ?? null,
    hostelId: u.hostelId ?? null,
  };
  requireRole(user, allowed);
  return user;
}

export async function requireStudentEmail(): Promise<string> {
  return (await requireUser(["Student"])).email;
}

function errorResponse(e: unknown): NextResponse {
  if (e instanceof ZodError) {
    return NextResponse.json({ error: e.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  if (e instanceof AppError) {
    return NextResponse.json({ error: e.message }, { status: e.status });
  }
  console.error(e);
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}

/** Runs a route's work and turns thrown errors into { error } JSON with the right status. */
export async function respond<T>(work: () => Promise<T>, status = 200): Promise<NextResponse> {
  try {
    return NextResponse.json(await work(), { status });
  } catch (e) {
    return errorResponse(e);
  }
}

export type DownloadFile = { filename: string; contentType: string; body: string | Uint8Array };

/** Same as respond(), but the answer is a file download (CSV / PDF). */
export async function respondFile(work: () => Promise<DownloadFile>): Promise<Response> {
  try {
    const f = await work();
    return new Response(f.body as BodyInit, {
      headers: {
        "Content-Type": f.contentType,
        "Content-Disposition": `attachment; filename="${f.filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
