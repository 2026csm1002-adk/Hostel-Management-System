# `src/app/api/swaps/[id]/decision/`

> Warden decision.

| Layer | Owner |
|---|---|
| API route | Aditya |

## What this folder is for

The final Accept / Reject / Waiting.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `POST /api/swaps/:id/decision` with body `{ decision: "Accept"|"Reject"|"Waiting", comment?: string }`.

**Called by:** `DecisionPanel`.

**Calls:** `swapService.decide`.

**Details:**

- Who: Warden of that hostel.
- `decisionSchema` rejects Reject or Waiting without a comment (400).
- Saves the comment so the student and caretaker can read it.
- Accept moves the request back to the caretaker for room assignment.
