import { describe, it, expect } from "vitest";

// Example pure utility function
function isValidBookingSlot(seatNumber: number): boolean {
  return seatNumber >= 1 && seatNumber <= 3;
}

describe("Unit: Cleaning Booking Rules", () => {
  it("allows seats between 1 and 3", () => {
    expect(isValidBookingSlot(1)).toBe(true);
    expect(isValidBookingSlot(3)).toBe(true);
    expect(isValidBookingSlot(2)).toBe(true);
    expect(isValidBookingSlot(4)).toBe(false);
    expect(isValidBookingSlot(8)).toBe(false);
  });
});