# `src/server/`

> Backend-only code.

| Layer | Owner |
|---|---|
| Backend | Aditya |

## What this folder is for

Everything that touches the database, files or business rules. Next.js never sends this code to the browser as long as only API routes and server pages import it.

## Rules for this folder

- UI code never imports anything from `src/server/`. It talks to the backend only through the `/api/...` routes.
- Direction: services call repositories; repositories call `db`. Never the other way round.

## Files that go in this folder

### `errors.ts`

**What it does:** Small custom error classes: `AppError`, `NotFoundError` (404), `ForbiddenError` (403), `ValidationError` (400), `ConflictError` (409), `NotImplementedError`.

**Called by:** All services, repositories and API routes.

**Details:**

- Services throw them; the API route converts them into the right HTTP status.
- Messages are shown to users, so keep them short and friendly ("This slot is full").

## Sub-folders

- `services/` : Business rules.
- `repositories/` : Database queries.
- `db/` : Connection and tables.
- `storage/` : File uploads.
