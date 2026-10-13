import { memory, type SwapRequestRow } from "@/server/db/memory-store";

// TEMPORARY: in-memory. DB SWAP: Drizzle queries on `swap_request`.

export const swapRequestRepo = {
  async insert(row: SwapRequestRow): Promise<SwapRequestRow> {
    memory.swapRequests.push({ ...row });
    return { ...row };
  },
  async findById(swapId: string): Promise<SwapRequestRow | undefined> {
    const row = memory.swapRequests.find((s) => s.swapId === swapId);
    return row && { ...row };
  },
  /** Newest first. */
  async listByStudent(studentId: string): Promise<SwapRequestRow[]> {
    return memory.swapRequests
      .filter((s) => s.studentId === studentId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((s) => ({ ...s }));
  },
  // listByHostel, update and countsByBatchAndCourse are added with the caretaker/warden screens.
};
