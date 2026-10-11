# `src/app/api/swaps/[id]/forward/`

> Forward a swap to the warden.

| Layer | Owner |
|---|---|
| API route | Akash (caretaker side) |

## What this folder is for

Caretaker passes a reviewed request on.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `POST /api/swaps/:id/forward` changes `Pending` to `Forwarded` and records the caretaker.

**Called by:** Forward button in `SwapQueue`.

**Calls:** `swapService.forward`.

**Details:**

- Who: Caretaker of that student's hostel.
- Refuse (409) if the request is not `Pending`.
