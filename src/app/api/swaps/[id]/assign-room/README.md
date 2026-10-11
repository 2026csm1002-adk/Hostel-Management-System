# `src/app/api/swaps/[id]/assign-room/`

> Assign a room after acceptance.

| Layer | Owner |
|---|---|
| API route | Akash (caretaker side) |

## What this folder is for

The caretaker's last step.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `POST /api/swaps/:id/assign-room` with body `{ room: "B-412" }` to assign, or `{ awaitingRoom: true }` when no room is free.

**Called by:** `AssignRoomForm`.

**Calls:** `swapService.assignRoom`, `swapService.markAwaitingRoom`.

**Details:**

- Who: Caretaker of that hostel.
- Allowed only when the status is `Accepted` or `AwaitingRoom`.
- On success the status becomes `RoomAssigned` (or `AwaitingRoom`) and the student sees the new room.
- Agree the exact body shape as a team before coding it.
