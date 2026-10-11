# `src/server/repositories/`

> Database queries live here.

| Layer | Owner |
|---|---|
| Repository | Aditya |

## What this folder is for

A repository is the only place that reads or writes one table. It contains queries and nothing else, so if the database changes only these files change.

## Rules for this folder

- No business rules here. A repository does not decide whether something is allowed.
- Only repositories import `db` from `src/server/db/client.ts`.
- Return plain objects typed from the schema.

## Files that go in this folder

### `student.repo.ts`

**What it does:** Student table access.

**Called by:** `profile.service`, `auth.service`.

**Calls:** `db`.

**Details:**

- `findById`, `findByEmail`, `upsert`.


### `staff-user.repo.ts`

**What it does:** StaffUser table access (caretakers, supervisor, wardens).

**Called by:** `auth.service`, `swap.service`.

**Calls:** `db`.

**Details:**

- `findByEmail`, `findById`, `findWardenOfHostel(hostelId)`.


### `hostel.repo.ts`

**What it does:** Hostel table access (the 8 hostels).

**Called by:** `profile.service`, seed script.

**Calls:** `db`.

**Details:**

- `list`, `findById`.


### `cleaning-booking.repo.ts`

**What it does:** CleaningBooking table access.

**Called by:** `cleaning.service`.

**Calls:** `db`.

**Details:**

- `listForSlot`, `insertWithLowestFreeSeat` (inside a transaction), `listForRange`, `listByStudent`.
- Relies on UNIQUE(hostel_id, floor, booking_date, slot_start, seat).


### `complaint.repo.ts`

**What it does:** Complaint table access.

**Called by:** `complaint.service`.

**Calls:** `db`.

**Details:**

- `insert`, `findById`, `listByStudent`, `listByHostel(category?)`, `updateStatus`, `hasBeenReregistered`.


### `swap-request.repo.ts`

**What it does:** SwapRequest table access.

**Called by:** `swap.service`.

**Calls:** `db`.

**Details:**

- `insert`, `findById`, `listByStudent`, `listByHostel`, `update`, `countsByBatchAndCourse`.
- The counts query uses GROUP BY and must never SELECT names or ids. That guarantees anonymity at the data level.


### `attachment.repo.ts`

**What it does:** Attachment table access (metadata pointing to the stored file).

**Called by:** `swap.service`.

**Calls:** `db`.

**Details:**

- `insert`, `findById`.
