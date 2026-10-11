# `src/app/api/`

> Every backend endpoint of the website.

| Layer | Owner |
|---|---|
| API routes | Shared (each sub-folder is owned by its module lead) |

## What this folder is for

Each sub-folder is part of the URL and holds one `route.ts`. For example `src/app/api/cleaning/bookings/route.ts` answers `POST /api/cleaning/bookings`.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.
- Errors from services are turned into HTTP codes: `ValidationError` 400, not signed in 401, `ForbiddenError` 403, `NotFoundError` 404, `ConflictError` 409 (for example slot full), anything else 500.
- Always return JSON of the form `{ data: ... }` on success and `{ error: "message" }` on failure so the frontend handles every endpoint the same way.

## Sub-folders

- `auth/` : Auth.js endpoints.
- `profile/` : Student profile.
- `cleaning/` : Cleaning slots, bookings, schedule, export.
- `complaints/` : Complaints.
- `swaps/` : Room swaps.
