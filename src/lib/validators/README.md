# `src/lib/validators/`

> Zod schemas that define what valid input looks like.

| Layer | Owner |
|---|---|
| Validation | Aditya (each module lead adjusts their own schema) |

## What this folder is for

One file per module. The API routes run these on every request, and forms can reuse them so frontend and backend agree.

## Rules for this folder

- Schemas check shape and simple limits only (required, length, allowed values). Rules that need the database (seat free, 7 days passed) belong in the service.

## Files that go in this folder

### `profile.schema.ts`

**What it does:** `profileSchema`: fullName, wing, roomNo, course (one of COURSES), batch.

**Called by:** `PUT /api/profile`, `ProfileForm`.

**Details:**

- Roll no is not part of `profileSchema` because it is read-only after creation. The first save also needs `rollNo` (a `createProfileSchema` = `profileSchema` + `rollNo`).


### `cleaning.schema.ts`

**What it does:** `bookingSchema`: floor (integer), date (`YYYY-MM-DD`), slotStart (one of SLOT_STARTS).

**Called by:** `POST /api/cleaning/bookings`, `SlotPicker`.

**Details:**

- The 2-4 day window and seat cap are checked in the service.


### `complaint.schema.ts`

**What it does:** `createComplaintSchema` (category from the 8, description 1 to 2000 characters) and `updateComplaintStatusSchema` (InProgress or Resolved).

**Called by:** Complaint routes and form.

**Details:**

- Students can never set Resolved: that is enforced by role, not only by this schema.


### `swap.schema.ts`

**What it does:** `submitSwapSchema` (reason), `decisionSchema` (Accept/Reject/Waiting; comment required unless Accept) and `assignRoomSchema` (room).

**Called by:** Swap routes, `SwapForm`, `DecisionPanel`.
