import { randomUUID } from "node:crypto";
import { MAX_ROOMS_PER_SLOT } from "@/lib/constants";
import { memory, type CleaningBookingRow } from "@/server/db/memory-store";

// TEMPORARY: in-memory. DB SWAP: Drizzle queries on `cleaning_booking`.

export type NewBooking = Omit<CleaningBookingRow, "bookingId" | "seat" | "status">;

export const cleaningBookingRepo = {
  /** All bookings of one floor on one date (every slot). */
  async listForDay(hostelId: string, floor: number, date: string): Promise<CleaningBookingRow[]> {
    return memory.cleaningBookings
      .filter((b) => b.hostelId === hostelId && b.floor === floor && b.bookingDate === date)
      .map((b) => ({ ...b }));
  },

  /** A booking for this exact room in this slot, if any. */
  async findByRoomAndSlot(
    hostelId: string,
    roomNo: string,
    date: string,
    slotStart: string,
  ): Promise<CleaningBookingRow | undefined> {
    const row = memory.cleaningBookings.find(
      (b) =>
        b.hostelId === hostelId &&
        b.roomNo === roomNo &&
        b.bookingDate === date &&
        b.slotStart === slotStart,
    );
    return row && { ...row };
  },

  /**
   * Takes the lowest free seat (1..3) and inserts. Returns null when all seats are taken.
   * The in-memory version has no `await` between the check and the push, so two
   * requests can never take the same seat.
   * DB SWAP: do this inside a transaction and rely on
   * UNIQUE(hostel_id, floor, booking_date, slot_start, seat); if the insert hits
   * the UNIQUE rule, try the next seat, and return null when none is left.
   */
  async insertWithLowestFreeSeat(input: NewBooking): Promise<CleaningBookingRow | null> {
    const taken = new Set(
      memory.cleaningBookings
        .filter(
          (b) =>
            b.hostelId === input.hostelId &&
            b.floor === input.floor &&
            b.bookingDate === input.bookingDate &&
            b.slotStart === input.slotStart,
        )
        .map((b) => b.seat),
    );
    let seat = 0;
    for (let s = 1; s <= MAX_ROOMS_PER_SLOT; s++) {
      if (!taken.has(s)) {
        seat = s;
        break;
      }
    }
    if (seat === 0) return null;

    const row: CleaningBookingRow = { ...input, bookingId: randomUUID(), seat, status: "Confirmed" };
    memory.cleaningBookings.push(row);
    return { ...row };
  },

  async listByStudent(studentId: string): Promise<CleaningBookingRow[]> {
    return memory.cleaningBookings.filter((b) => b.studentId === studentId).map((b) => ({ ...b }));
  },
};
