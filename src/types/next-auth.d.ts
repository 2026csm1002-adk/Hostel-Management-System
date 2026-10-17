import type { DefaultSession } from "next-auth";
import type { Role } from "@/types";

// The role, user id and hostel are looked up once at sign-in (see src/auth.ts) and kept in the token.
declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
      userId: string | null;   // staff_id or student_id; null = student with no profile yet
      hostelId: string | null; // null for the Supervisor and for a student with no profile yet
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    userId?: string | null;
    hostelId?: string | null;
  }
}
