# `src/app/api/complaints/`

> Complaints endpoint.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

File and list complaints.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `POST /api/complaints` creates a complaint. `GET /api/complaints?category=Plumbing` lists complaints.

**Called by:** `ComplaintForm`, student and caretaker complaint pages.

**Calls:** `complaintService.create`, `complaintService.listForRole`.

**Details:**

- POST: Student only; body `{ category, description }` checked with `createComplaintSchema`; hostel and room come from the profile.
- GET: a student gets only their own; a caretaker gets only their hostel's; optional `category` filter.

## Sub-folders

- `export/` : Download all complaints.
- `[id]/` : Actions on one complaint.
