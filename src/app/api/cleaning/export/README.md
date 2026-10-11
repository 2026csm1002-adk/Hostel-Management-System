# `src/app/api/cleaning/export/`

> Cleaning schedule download endpoint.

| Layer | Owner |
|---|---|
| API route | Akash (file building is done by export.service) |

## What this folder is for

Produces the file handed to cleaning staff.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `GET /api/cleaning/export?format=csv|pdf&from=...&to=...` returns a downloadable file.

**Called by:** `ScheduleExport` buttons.

**Calls:** `cleaningService.exportSchedule` which uses `exportService`.

**Details:**

- Who: Supervisor.
- Set `Content-Disposition: attachment; filename=cleaning-schedule.csv` (or `.pdf`) so the browser downloads it.
- CSV columns: Date, Floor, Slot, Room Number. PDF: one page per date, rows grouped by floor and slot.
