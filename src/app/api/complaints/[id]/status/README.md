# `src/app/api/complaints/[id]/status/`

> Change complaint status.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

Caretaker moves a complaint forward.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `PATCH /api/complaints/:id/status` with body `{ status: "InProgress" | "Resolved" }`.

**Called by:** `ComplaintQueue` buttons.

**Calls:** `complaintService.updateStatus`.

**Details:**

- Who: Caretaker of that complaint's hostel only. A Student receives 403 (students can never resolve).
- Sets `resolved_at` when the status becomes Resolved.
