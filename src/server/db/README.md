# `src/server/db/`

> Database connection and table definitions.

| Layer | Owner |
|---|---|
| Database | Aditya |

## What this folder is for

Where the database is described and connected.

## Files that go in this folder

### `client.ts`

**What it does:** Creates the single database connection (Turso / libSQL through Drizzle) that all repositories share.

**Called by:** Repositories and `scripts/seed.ts`.

**Calls:** `@libsql/client`, `drizzle-orm`, `schema.ts`.

**Details:**

- Reads `DATABASE_URL` and `TURSO_AUTH_TOKEN`.
- Fallback `file:local.db` so you can develop offline without a Turso account.
- Exports one `db` object.


### `schema.ts`

**What it does:** The ER diagram written as code. `npm run db:generate` turns it into SQL migrations.

**Called by:** `drizzle.config.ts`, `client.ts`, repositories.

**Details:**

- `hostel`: hostel_id PK, name UNIQUE, type (Boys/Girls).
- `student`: student_id PK (roll no), full_name, google_email UNIQUE, hostel_id FK, wing, room_no, course, batch.
- `staff_user`: staff_id PK, full_name, google_email UNIQUE, role (Caretaker/Supervisor/Warden), hostel_id FK nullable (null only for Supervisor).
- `cleaning_booking`: booking_id PK, student_id FK, hostel_id FK, floor, room_no, booking_date, slot_start, seat (1 to 3), status; UNIQUE(hostel_id, floor, booking_date, slot_start, seat) which makes a 4th booking impossible.
- `complaint`: complaint_id PK, student_id FK, category, description, status, created_at, resolved_at, reregistered_from (self FK).
- `swap_request`: swap_id PK, student_id FK, reason, attachment_id FK, status, assigned_room, caretaker_id FK, warden_id FK, warden_comment, created_at.
- `attachment`: attachment_id PK, storage_file_id, file_name, uploaded_at.
- Allowed values (statuses, categories, courses) come from `src/lib/constants.ts` so the database and UI always agree.
- Import constants with a relative path here (`../../lib/constants`): drizzle-kit does not understand the `@/` alias.
- Property names are camelCase in code (`studentId`, `googleEmail`, `hostelId`, `staffId`, `roomNo`) and snake_case in the database. Emails are stored in lower case.
- `drizzle.config.ts` (project root) tells drizzle-kit where `schema.ts` is and reads `DATABASE_URL` / `TURSO_AUTH_TOKEN` from `.env.local`.
