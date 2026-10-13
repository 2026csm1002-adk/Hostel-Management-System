import { memory, type StudentRow } from "@/server/db/memory-store";

// TEMPORARY: reads/writes the in-memory store.
// DB SWAP: each method becomes one Drizzle query on the `student` table, e.g.
//   findById:    db.select().from(student).where(eq(student.studentId, id)).limit(1)
//   findByEmail: db.select().from(student).where(eq(student.googleEmail, email)).limit(1)
//   upsert:      db.insert(student).values(row).onConflictDoUpdate({ target: student.studentId, set: {...} })

export const studentRepo = {
  async findById(studentId: string): Promise<StudentRow | undefined> {
    const row = memory.students.find((s) => s.studentId === studentId);
    return row && { ...row };
  },
  async findByEmail(email: string): Promise<StudentRow | undefined> {
    const row = memory.students.find((s) => s.googleEmail === email);
    return row && { ...row };
  },
  async upsert(row: StudentRow): Promise<StudentRow> {
    const i = memory.students.findIndex((s) => s.studentId === row.studentId);
    if (i >= 0) memory.students[i] = { ...row };
    else memory.students.push({ ...row });
    return { ...row };
  },
};
