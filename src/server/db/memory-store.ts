// TEMPORARY in-memory tables, used until the database is connected.
//
// Row types come straight from the Drizzle schema, so rows here have exactly
// the shape of the real tables. When the database is connected, every
// repository swaps its body for a Drizzle query and this file is deleted.
//
// Data lives on `globalThis` so it survives Next.js hot reloads, but it is
// lost when the server restarts. That is expected for the temporary store.

import type { attachment, cleaningBooking, complaint, student, swapRequest } from "./schema";

export type StudentRow = typeof student.$inferSelect;
export type CleaningBookingRow = typeof cleaningBooking.$inferSelect;
export type ComplaintRow = typeof complaint.$inferSelect;
export type AttachmentRow = typeof attachment.$inferSelect;
export type SwapRequestRow = typeof swapRequest.$inferSelect;

type MemoryStore = {
  students: StudentRow[];
  cleaningBookings: CleaningBookingRow[];
  complaints: ComplaintRow[];
  attachments: AttachmentRow[];
  swapRequests: SwapRequestRow[];
};

const g = globalThis as unknown as { __hmsMemoryStore?: MemoryStore };

export const memory: MemoryStore = (g.__hmsMemoryStore ??= {
  students: [],
  cleaningBookings: [],
  complaints: [],
  attachments: [],
  swapRequests: [],
});

/** For tests: empty every table. */
export function resetMemoryStore() {
  memory.students.length = 0;
  memory.cleaningBookings.length = 0;
  memory.complaints.length = 0;
  memory.attachments.length = 0;
  memory.swapRequests.length = 0;
}
