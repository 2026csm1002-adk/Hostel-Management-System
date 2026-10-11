# `src/app/api/complaints/export/`

> Complaint download endpoint.

| Layer | Owner |
|---|---|
| API route | Akash (file building is done by export.service) |

## What this folder is for

Exports complaints for the caretaker.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `GET /api/complaints/export?format=csv|pdf`.

**Called by:** Caretaker complaints page download buttons.

**Calls:** `exportService.complaintsToCsv`, `exportService.complaintsToPdf`.

**Details:**

- Who: Caretaker (own hostel).
- CSV: one row per complaint (id, student, room, category, description, status, date).
- PDF: one complaint per page.
