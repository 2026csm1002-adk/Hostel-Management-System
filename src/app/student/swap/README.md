# `src/app/student/swap/`

> Room swap page.

| Layer | Owner |
|---|---|
| Page | Aryan (screen) + Aditya (swap rules) |

## What this folder is for

Request a room swap and follow it until a room is assigned.

## Files that go in this folder

### `page.tsx`

**What it does:** Reason box, optional supporting document (for example a medical certificate), Submit, then the request's status, the warden's comment (for Rejected/Waiting) and the assigned room.

**Called by:** Students at `/student/swap`.

**Calls:** `SwapForm`; `POST /api/swaps`, `GET /api/swaps`.

**Details:**

- Status steps shown to the student: Pending, Forwarded, then Accepted / Rejected / Waiting, then Room assigned or Awaiting room.
