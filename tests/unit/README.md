# `tests/unit/`

> Unit tests for rules and helpers.

| Layer | Owner |
|---|---|
| Testing | Aditya |

## What this folder is for

No network, no real database: just input in, result out.

## Files that go in this folder

### `dates.test.ts`

**What it does:** Checks the 2-4 day window: today and tomorrow rejected; 2, 3, 4 days accepted; 5+ rejected.

**Called by:** `npm test`.


### `csv.test.ts`

**What it does:** Checks commas, quotes and line breaks are escaped correctly.

**Called by:** `npm test`.


### `cleaning.service.test.ts`

**What it does:** Date outside window refused; lowest free seat used; 4th booking refused; two simultaneous bookings never both get the last seat.

**Called by:** `npm test`.


### `complaint.service.test.ts`

**What it does:** Student cannot resolve; caretaker sees only own hostel; re-register refused before 7 days and when already re-registered.

**Called by:** `npm test`.


### `swap.service.test.ts`

**What it does:** Valid transitions only; comment required for Reject and Waiting; room only after Accept; stats never include names.

**Called by:** `npm test`.


### `validators.test.ts`

**What it does:** Each Zod schema accepts good input and rejects bad input.

**Called by:** `npm test`.
