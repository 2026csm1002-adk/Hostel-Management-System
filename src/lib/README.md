# `src/lib/`

> Helpers and constants shared by frontend and backend.

| Layer | Owner |
|---|---|
| Shared | Shared (constants.ts changes agreed by the team) |

## What this folder is for

Small, general pieces with no database access, safe to import from both browser code and server code.

## Rules for this folder

- Nothing in here may import from `src/server/` or `src/components/`.

## Files that go in this folder

### `constants.ts`

**What it does:** THE one place for every business number and fixed list. Change a rule here once and the whole app follows.

**Called by:** Services, validators, UI dropdowns, seed script, tests.

**Details:**

- `MAX_ROOMS_PER_SLOT = 3`, `BOOKING_MIN_DAYS_AHEAD = 2`, `BOOKING_MAX_DAYS_AHEAD = 4`, `REREGISTER_AFTER_DAYS = 7`.
- `SLOT_STARTS`: 09:00, 10:00, 11:00, 12:00, 14:00, 15:00 (one-hour slots 9-1 and 2-4).
- `ROLES`, `COURSES` (BTech, MTech, PhD, Other).
- `COMPLAINT_CATEGORIES` (8), `COMPLAINT_STATUSES`, `SWAP_STATUSES`.
- `HOSTELS`: the 8 hostels with type Boys or Girls.
- This is how the SRS requirement "rules must be configurable" is met.


### `dates.ts`

**What it does:** Date helpers working on `YYYY-MM-DD` strings.

**Called by:** `cleaning.service`, `complaint.service`, `SlotPicker`, tests.

**Calls:** `constants.ts`.

**Details:**

- `toISODate(date)`, `daysBetween(from, to)`, `isWithinBookingWindow(date, today)` (true when 2 to 4 days ahead).
- Count whole calendar days, not hours, to avoid time-zone surprises.


### `csv.ts`

**What it does:** Turns rows into CSV text with correct quoting for commas, quotes and line breaks.

**Called by:** `export.service`, tests.

**Details:**

- `toCsv(headers, rows)`.


### `utils.ts`

**What it does:** Tiny general helpers. Currently `cn()` which merges Tailwind class names; shadcn/ui expects it here.

**Called by:** Almost every component.

**Calls:** `clsx`, `tailwind-merge`.

## Sub-folders

- `validators/` : Zod rules for incoming data.
