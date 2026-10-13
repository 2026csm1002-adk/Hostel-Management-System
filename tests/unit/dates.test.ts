import { describe, it, expect } from "vitest";
import {
  addDays, bookableDates, daysBetween, isValidISODate, isWithinBookingWindow, slotLabel,
} from "@/lib/dates";

describe("Unit: dates", () => {
  it("counts whole calendar days", () => {
    expect(daysBetween("2026-10-14", "2026-10-16")).toBe(2);
    expect(daysBetween("2026-10-30", "2026-11-02")).toBe(3);
    expect(daysBetween("2026-10-16", "2026-10-14")).toBe(-2);
  });
  it("booking window is 2 to 4 days ahead", () => {
    const today = "2026-10-14";
    expect(isWithinBookingWindow("2026-10-14", today)).toBe(false);
    expect(isWithinBookingWindow("2026-10-15", today)).toBe(false);
    expect(isWithinBookingWindow("2026-10-16", today)).toBe(true);
    expect(isWithinBookingWindow("2026-10-18", today)).toBe(true);
    expect(isWithinBookingWindow("2026-10-19", today)).toBe(false);
  });
  it("lists the three bookable dates", () => {
    expect(bookableDates("2026-10-30")).toEqual(["2026-11-01", "2026-11-02", "2026-11-03"]);
  });
  it("validates date strings", () => {
    expect(isValidISODate("2026-02-30")).toBe(false);
    expect(isValidISODate("2026-10-14")).toBe(true);
    expect(isValidISODate("14-10-2026")).toBe(false);
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });
  it("labels slots", () => {
    expect(slotLabel("09:00")).toBe("9:00–10:00 AM");
    expect(slotLabel("11:00")).toBe("11:00 AM–12:00 PM");
    expect(slotLabel("12:00")).toBe("12:00–1:00 PM");
    expect(slotLabel("14:00")).toBe("2:00–3:00 PM");
  });
});
