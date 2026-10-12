# `src/server/services/`

> Business rules live here.

| Layer | Owner |
|---|---|
| Service | Aditya (swap, export) + Akash (auth, profile, cleaning, complaint) |

## What this folder is for

A service answers "is this allowed, and what should happen?". It enforces every rule from the SRS, calls repositories to read and write data, and returns plain results.

## Rules for this folder

- Services never touch `Request` or `Response`; that is the route's job.
- Read numbers (3 seats, 2-4 days, 7 days) from `src/lib/constants.ts`, never hard-code them.
- Re-check the caller's role and hostel here even though the proxy already did.

## Files that go in this folder

### `auth.service.ts`

**Owner:** Akash

**What it does:** Works out who a signed-in person is.

**Called by:** `src/auth.ts`, API routes.

**Calls:** `student.repo`, `staff-user.repo`.

**Details:**

- `resolveRole(email)`: finds the email in StaffUser (Caretaker / Supervisor / Warden) and returns `{ role, userId, hostelId }`. Any other institute email is a Student: `userId` and `hostelId` come from the Student row, or are both null while the student has not created a profile yet. It never returns null, because the institute-email check already happened in `auth.ts`. Emails are compared in lower case.
- `requireRole(session, allowedRoles)`: throws `ForbiddenError` if the role is not allowed.


### `profile.service.ts`

**Owner:** Akash

**What it does:** Reads and updates a student's profile.

**Called by:** `/api/profile`.

**Calls:** `student.repo`, `hostel.repo`.

**Details:**

- `getProfile(studentId)`, `upsertProfile(studentId, data)`.
- Roll no (student_id) is accepted only on the first save, when the profile is created; it must be unique (`ConflictError` if it already belongs to someone else). After that it is read-only and ignored if sent.


### `cleaning.service.ts`

**Owner:** Akash

**What it does:** All cleaning booking rules.

**Called by:** `/api/cleaning/*`.

**Calls:** `cleaning-booking.repo`, `export.service`.

**Details:**

- `getAvailability(hostelId, floor, date)`: counts taken seats for each of the six slots.
- `bookSlot(student, floor, date, slot)`: date must be 2 to 4 days ahead; inside one transaction take the lowest free seat from 1 to 3; if the UNIQUE rule fires, answer "slot full" (409).
- `getSchedule(range)` and `exportSchedule(range)` for the supervisor.
- Never count first then insert: two students clicking together would both pass. Let the database constraint decide.


### `complaint.service.ts`

**Owner:** Akash

**What it does:** All complaint rules.

**Called by:** `/api/complaints/*`.

**Calls:** `complaint.repo`, `student.repo`.

**Details:**

- `create(student, category, text)`.
- `listForRole(user, filter)`: student = own, caretaker = own hostel only.
- `updateStatus(id, status)`: caretaker only, Open -> InProgress -> Resolved; students refused.
- `reregister(id)`: only if not Resolved, at least 7 days old and not already re-registered; creates a new complaint pointing to the old one.


### `swap.service.ts`

**Owner:** Aditya (the caretaker functions forward, assignRoom and markAwaitingRoom: Akash)

**What it does:** The swap state machine (see the table below) and the anonymous statistics.

**Called by:** `/api/swaps/*`.

**Calls:** `swap-request.repo`, `attachment.repo`, `file-storage.client`.

**Details:**

- `submit`, `list`, `forward`, `decide`, `assignRoom`, `markAwaitingRoom`, `stats`.
- Reject and Waiting need a comment.
- Only allow the transitions in the table; anything else is a 409.
- `stats()` returns counts by batch and course only.
- Shared file: agree the function signatures first so Aditya, Aryan and Akash do not clash.


### `export.service.ts`

**Owner:** Aditya

**What it does:** Builds the downloadable files.

**Called by:** Export routes.

**Calls:** `src/lib/csv.ts`, jsPDF.

**Details:**

- `complaintsToCsv`, `complaintsToPdf` (one complaint per page).
- `scheduleToCsv`, `scheduleToPdf` (grouped by date, floor, slot with room numbers).

## Swap status transitions

| From status | To status | Who does it | Condition |
|---|---|---|---|
| (new) | `Pending` | Student | Submit reason (+ optional file) |
| `Pending` | `Forwarded` | Caretaker of that hostel | Forward to warden |
| `Forwarded` | `Accepted` | Warden | No comment needed |
| `Forwarded` | `Rejected` | Warden | **Comment required** |
| `Forwarded` | `Waiting` | Warden | **Comment required** (acceptable, but no vacant room yet) |
| `Waiting` | `Accepted` / `Rejected` | Warden | Decided again when a room frees up |
| `Accepted` | `RoomAssigned` | Caretaker | Enters a room number |
| `Accepted` | `AwaitingRoom` | Caretaker | No free room right now |
| `AwaitingRoom` | `RoomAssigned` | Caretaker | A room became free |
