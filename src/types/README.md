# `src/types/`

> Shared TypeScript types.

| Layer | Owner |
|---|---|
| Types | Shared |

## What this folder is for

Names for the shapes of data used everywhere.

## Files that go in this folder

### `index.ts`

**What it does:** `Role`, `Course`, `ComplaintCategory`, `ComplaintStatus`, `SwapStatus` (all derived from `constants.ts` so they cannot drift apart) and `SessionUser` (`email`, `role`, `userId`, `hostelId` which is null only for the Supervisor).

**Called by:** Everything.
