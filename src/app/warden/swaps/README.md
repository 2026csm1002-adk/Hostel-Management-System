# `src/app/warden/swaps/`

> Warden swap decisions.

| Layer | Owner |
|---|---|
| Page | Aryan (screen) + Aditya (swap rules) |

## What this folder is for

Where the warden makes the final call.

## Files that go in this folder

### `page.tsx`

**What it does:** Left side: forwarded requests with the student's reason and attachment, and Accept / Reject / Mark waiting (Reject and Waiting require a comment). Right side: counts of requests by batch and by course with no student names.

**Called by:** Wardens at `/warden/swaps`.

**Calls:** `DecisionPanel`, `BatchCourseStats`; `/api/swaps`, `/api/swaps/[id]/decision`, `/api/swaps/stats`.

**Details:**

- After Accept, the request goes back to the caretaker to assign a room.
