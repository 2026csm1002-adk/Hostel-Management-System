# `src/app/api/cleaning/schedule/`

> Cleaning schedule endpoint.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

Lists which rooms are booked.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `GET /api/cleaning/schedule?from=2026-10-12&to=2026-10-14&hostelId=...` returns bookings with date, floor, slot, seat and room number.

**Called by:** Supervisor board.

**Calls:** `cleaningService.getSchedule`.

**Details:**

- Who: Supervisor (all hostels) and Caretaker (own hostel, read-only).
