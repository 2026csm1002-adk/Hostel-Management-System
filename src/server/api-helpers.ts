import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "@/auth";
import { AppError, UnauthorizedError } from "@/server/errors";

/**
 * Email of the signed-in student, or throws 401.
 * TEMPORARY: any signed-in institute account counts as a student. When roles are in the
 * session, add `requireRole(session.user, ["Student"])` here and every student route is covered.
 */
export async function requireStudentEmail(): Promise<string> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) throw new UnauthorizedError();
  return email.trim().toLowerCase();
}

/** Runs a route's work and turns thrown errors into { error } JSON with the right status. */
export async function respond<T>(work: () => Promise<T>, status = 200): Promise<NextResponse> {
  try {
    return NextResponse.json(await work(), { status });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ error: e.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }
    if (e instanceof AppError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
