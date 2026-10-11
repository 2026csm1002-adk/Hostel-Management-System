# `src/app/api/complaints/[id]/reregister/`

> Re-register a complaint.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

Student raises an ignored complaint again.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `POST /api/complaints/:id/reregister` creates a new complaint copying the old category and description and linking it through `reregistered_from`.

**Called by:** Re-register button on the student's complaint.

**Calls:** `complaintService.reregister`.

**Details:**

- Who: the Student who owns the complaint.
- Allowed only if the complaint is not Resolved, is at least 7 days old, and has not been re-registered before. Otherwise 409.
