# `src/app/api/cleaning/slots/`

> Slot availability endpoint.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

Tells the UI how full each slot is.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `GET /api/cleaning/slots?floor=2&date=2026-10-14` returns the six slots with how many of the 3 seats are taken.

**Called by:** `SlotPicker`, `CapacityBoard`.

**Calls:** `cleaningService.getAvailability`.

**Details:**

- Who: Student (own hostel), Supervisor (any hostel via `hostelId` query), Caretaker (own hostel).
- Response example: `[{ slotStart: "09:00", filled: 2, status: "Available" }, { slotStart: "10:00", filled: 3, status: "Full" }]`.
