# `src/app/student/cleaning/`

> Room cleaning booking page.

| Layer | Owner |
|---|---|
| Page | Aryan (screen) + Akash (cleaning logic) |

## What this folder is for

Lets a student reserve a one-hour cleaning slot for their room.

## Files that go in this folder

### `page.tsx`

**What it does:** Date tabs (2 to 4 days ahead), floor tabs, and a slot grid with the six one-hour slots (9-10, 10-11, 11-12, 12-1, 2-3, 3-4) showing availability as x/3 or FULL, then a Confirm button.

**Called by:** Students at `/student/cleaning`.

**Calls:** `SlotPicker`; `GET /api/cleaning/slots`, `POST /api/cleaning/bookings`.

**Details:**

- The room number is taken from the profile, not typed again.
- After booking, show the confirmed date, floor, slot and seat.
