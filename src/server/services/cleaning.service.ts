import { MAX_ROOMS_PER_SLOT, SLOT_STARTS } from "@/lib/constants";
import { isValidISODate, isWithinBookingWindow, slotLabel } from "@/lib/dates";
import { floorFromRoom, floorLabel } from "@/lib/room";
import type { BookingInput } from "@/lib/validators/cleaning.schema";
import type { CleaningBookingRow } from "@/server/db/memory-store";
import { ConflictError, ValidationError } from "@/server/errors";
import { cleaningBookingRepo } from "@/server/repositories/cleaning-booking.repo";
import { profileService } from "@/server/services/profile.service";
import type { CleaningBookingDTO, SlotAvailability } from "@/types";

function assertBookable(date: string) {
  if (!isValidISODate(date) || !isWithinBookingWindow(date)) {
    throw new ValidationError("Cleaning can be booked only 2 to 4 days ahead.");
  }
}

function toDTO(row: CleaningBookingRow): CleaningBookingDTO {
  return {
    id: row.bookingId,
    date: row.bookingDate,
    slotStart: row.slotStart,
    label: slotLabel(row.slotStart),
    floor: row.floor,
    floorLabel: floorLabel(row.floor),
    roomNo: row.roomNo,
    seat: row.seat,
    status: row.status as CleaningBookingDTO["status"],
  };
}

export const cleaningService = {
  /** The six slots of the student's own floor, with how many of the 3 seats are taken. */
  async getAvailability(email: string, date: string): Promise<SlotAvailability[]> {
    const student = await profileService.requireProfile(email);
    assertBookable(date);
    const floor = floorFromRoom(student.roomNo) as number;
    const rows = await cleaningBookingRepo.listForDay(student.hostelId, floor, date);

    return SLOT_STARTS.map((slotStart) => {
      const inSlot = rows.filter((r) => r.slotStart === slotStart);
      return {
        slotStart,
        label: slotLabel(slotStart),
        filled: inSlot.length,
        capacity: MAX_ROOMS_PER_SLOT,
        status: inSlot.length >= MAX_ROOMS_PER_SLOT ? "Full" : "Available",
        bookedByMe: inSlot.some((r) => r.roomNo === student.roomNo),
      };
    });
  },

  async bookSlot(email: string, input: BookingInput): Promise<CleaningBookingDTO> {
    const student = await profileService.requireProfile(email);
    assertBookable(input.date);
    const floor = floorFromRoom(student.roomNo) as number;

    const duplicate = await cleaningBookingRepo.findByRoomAndSlot(
      student.hostelId,
      student.roomNo,
      input.date,
      input.slotStart,
    );
    if (duplicate) throw new ConflictError("Your room already has a booking in this slot.");

    // Never "count, then insert": the repository takes the seat in one step.
    const row = await cleaningBookingRepo.insertWithLowestFreeSeat({
      studentId: student.studentId,
      hostelId: student.hostelId,
      floor,
      roomNo: student.roomNo,
      bookingDate: input.date,
      slotStart: input.slotStart,
    });
    if (!row) throw new ConflictError("This slot is full. Please pick another one.");
    return toDTO(row);
  },

  /** My bookings, soonest first. Empty (not an error) while there is no profile. */
  async listMine(email: string): Promise<CleaningBookingDTO[]> {
    const profile = await profileService.getProfile(email);
    if (!profile) return [];
    const rows = await cleaningBookingRepo.listByStudent(profile.studentId);
    return rows
      .sort((a, b) => (a.bookingDate + a.slotStart).localeCompare(b.bookingDate + b.slotStart))
      .map(toDTO);
  },
};
