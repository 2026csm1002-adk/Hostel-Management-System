# `src/types/`

> Shared TypeScript types.

| Layer | Owner |
|---|---|
| Types | Shared |

## What this folder is for

Names for the shapes of data used everywhere.

## Files that go in this folder

### `index.ts`

**What it does:** `Role`, `Course`, `ComplaintCategory`, `ComplaintStatus`, `SwapStatus` (all derived from `constants.ts` so they cannot drift apart) and `SessionUser` (`email`, `role`, `userId`, `hostelId`). `userId` is null for a student who has not created a profile yet; `hostelId` is null for the Supervisor and for such a student.

**Called by:** Everything.


### `next-auth.d.ts`

**What it does:** Tells TypeScript that the Auth.js session and token carry `role`, `userId` and `hostelId`.

**Called by:** The TypeScript compiler only; nobody imports it.
