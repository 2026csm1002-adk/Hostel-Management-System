import { eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import { student } from "@/server/db/schema";

export const studentRepo = {
  async findById(studentId: string) {
    const [row] = await db.select().from(student).where(eq(student.studentId, studentId)).limit(1);
    return row;
  },
  async findByEmail(email: string) {
    const [row] = await db.select().from(student).where(eq(student.googleEmail, email)).limit(1);
    return row;
  },
  // upsert(...) is added later for the profile page
};
