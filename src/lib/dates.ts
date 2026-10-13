// Date helpers working on YYYY-MM-DD strings.
// We count whole calendar days (never hours) so time zones cannot shift a booking by a day.

import {
  BOOKING_MAX_DAYS_AHEAD,
  BOOKING_MIN_DAYS_AHEAD,
  DEFAULT_TIMEZONE,
} from "@/lib/constants";

const DAY_MS = 86_400_000;

function parse(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** The calendar date (YYYY-MM-DD) of a moment in the hostel's time zone. */
export function isoDateInZone(date: Date = new Date(), timeZone: string = DEFAULT_TIMEZONE): string {
  // The "en-CA" locale prints dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function todayISO(): string {
  return isoDateInZone();
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return toISODate(new Date(parse(value))) === value;
}

export function addDays(iso: string, days: number): string {
  return toISODate(new Date(parse(iso) + days * DAY_MS));
}

/** Whole calendar days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: string, to: string): number {
  return Math.round((parse(to) - parse(from)) / DAY_MS);
}

/** True when `date` is 2 to 4 days after `today`. */
export function isWithinBookingWindow(date: string, today: string = todayISO()): boolean {
  const diff = daysBetween(today, date);
  return diff >= BOOKING_MIN_DAYS_AHEAD && diff <= BOOKING_MAX_DAYS_AHEAD;
}

/** The dates a student may book right now (today + 2, +3, +4). */
export function bookableDates(today: string = todayISO()): string[] {
  const out: string[] = [];
  for (let i = BOOKING_MIN_DAYS_AHEAD; i <= BOOKING_MAX_DAYS_AHEAD; i++) out.push(addDays(today, i));
  return out;
}

/** "2026-10-16" -> "Fri, 16 Oct" */
export function formatDateLabel(iso: string): string {
  return new Date(parse(iso)).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

/** "09:00" -> "9:00–10:00 AM", "11:00" -> "11:00 AM–12:00 PM", "14:00" -> "2:00–3:00 PM" */
export function slotLabel(slotStart: string): string {
  const h = parseInt(slotStart.slice(0, 2), 10);
  const part = (hour: number) => ({ n: ((hour + 11) % 12) + 1, ap: hour % 24 < 12 ? "AM" : "PM" });
  const a = part(h);
  const b = part(h + 1);
  return a.ap === b.ap
    ? `${a.n}:00–${b.n}:00 ${a.ap}`
    : `${a.n}:00 ${a.ap}–${b.n}:00 ${b.ap}`;
}
