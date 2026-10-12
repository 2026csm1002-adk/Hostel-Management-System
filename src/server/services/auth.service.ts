import { staffUserRepo } from "@/server/repositories/staff-user.repo";
import { studentRepo } from "@/server/repositories/student.repo";
import { ForbiddenError } from "@/server/errors";
import type { Role, SessionUser } from "@/types";

export type ResolvedUser = {
  role: Role;
  userId: string | null; // staff_id or student_id; null = student with no profile yet
  hostelId: string | null;
};

/** Staff email -> that role. Any other institute email -> Student (userId null until the profile exists). */
export async function resolveRole(email: string): Promise<ResolvedUser> {
  const e = email.trim().toLowerCase();

  const staff = await staffUserRepo.findByEmail(e);
  if (staff) {
    return { role: staff.role, userId: staff.staffId, hostelId: staff.hostelId ?? null };
  }

  const student = await studentRepo.findByEmail(e);
  return {
    role: "Student",
    userId: student?.studentId ?? null,
    hostelId: student?.hostelId ?? null,
  };
}

/** Call at the top of every API route and service. Throws ForbiddenError (403). */
export function requireRole(
  user: Partial<SessionUser> | null | undefined,
  allowed: Role[],
): asserts user is SessionUser {
  if (!user?.role || !allowed.includes(user.role)) {
    throw new ForbiddenError("You do not have access to this");
  }
}
