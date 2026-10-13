import { memory, type ComplaintRow } from "@/server/db/memory-store";

// TEMPORARY: in-memory. DB SWAP: Drizzle queries on `complaint`.

export const complaintRepo = {
  async insert(row: ComplaintRow): Promise<ComplaintRow> {
    memory.complaints.push({ ...row });
    return { ...row };
  },
  async findById(complaintId: string): Promise<ComplaintRow | undefined> {
    const row = memory.complaints.find((c) => c.complaintId === complaintId);
    return row && { ...row };
  },
  /** Newest first. */
  async listByStudent(studentId: string): Promise<ComplaintRow[]> {
    return memory.complaints
      .filter((c) => c.studentId === studentId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((c) => ({ ...c }));
  },
  async hasBeenReregistered(complaintId: string): Promise<boolean> {
    return memory.complaints.some((c) => c.reregisteredFrom === complaintId);
  },
  // listByHostel(category?) and updateStatus(...) are added with the caretaker screens.
};
