# `src/app/api/swaps/`

> Room swap endpoint.

| Layer | Owner |
|---|---|
| API route | Aditya |

## What this folder is for

Submit and list swap requests.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `POST /api/swaps` submits a request. `GET /api/swaps` lists the requests I may see.

**Called by:** `SwapForm` and the student, caretaker and warden swap pages.

**Calls:** `swapService.submit`, `swapService.list`.

**Details:**

- POST: Student only. Sent as multipart form data (reason + optional file). The file goes to storage through `file-storage.client.ts` and an `Attachment` row is created.
- GET: student sees own; caretaker sees own hostel; warden sees requests forwarded to them.

## Sub-folders

- `stats/` : Anonymous counts.
- `[id]/` : Actions on one swap request.
