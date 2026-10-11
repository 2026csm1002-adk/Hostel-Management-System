# `src/app/api/cleaning/bookings/`

> Create cleaning booking endpoint.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

Reserves a slot.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `POST /api/cleaning/bookings` with body `{ floor, date, slotStart }`.

**Called by:** `SlotPicker` Confirm button.

**Calls:** `cleaningService.bookSlot`.

**Details:**

- Who: Student only.
- Body checked with `bookingSchema`.
- The service checks the date is 2 to 4 days ahead and takes the lowest free seat 1 to 3 in one transaction.
- Returns 409 with "slot full" if all three seats are taken, even when two students click at the same instant (the database UNIQUE rule decides).
