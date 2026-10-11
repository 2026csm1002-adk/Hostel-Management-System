# Team ownership

Who is responsible for what. This matches the Division of responsibilities slide.

| Member | Role | Owns |
|---|---|---|
| **Aditya Kumar** | Backend, Database and Testing Lead | Database schema, APIs, testing, server-side rules |
| **Aryan Shrivastva** | Frontend and UI Lead | Pages, forms, dashboards, UI components |
| **Akash Maurya** | Hostel Module, Workflow and Authentication Lead | Authentication, complaint, cleaning, and caretaker workflows |
| **Shahid Alam** | Integration and Deployment Lead | Frontend-backend integration, deployment, Git |

Supervisor and warden screens are shared work. Documentation is shared by all four.

## Aditya Kumar: Backend, Database and Testing Lead

**Owns:** Database schema, APIs, testing, server-side rules

Folders where Aditya is named as an owner (open each folder's README for the file-by-file details):

- `drizzle/`
- `scripts/`
- `src/app/api/swaps/`
- `src/app/api/swaps/[id]/`
- `src/app/api/swaps/[id]/decision/`
- `src/app/api/swaps/stats/`
- `src/app/student/swap/`
- `src/app/warden/`
- `src/app/warden/swaps/`
- `src/components/warden/`
- `src/lib/validators/`
- `src/server/`
- `src/server/db/`
- `src/server/repositories/`
- `src/server/services/`
- `tests/`
- `tests/e2e/`
- `tests/integration/`
- `tests/unit/`

## Aryan Shrivastva: Frontend and UI Lead

**Owns:** Pages, forms, dashboards, UI components

Folders where Aryan is named as an owner (open each folder's README for the file-by-file details):

- `docs/prototype/`
- `public/`
- `src/app/caretaker/`
- `src/app/caretaker/complaints/`
- `src/app/caretaker/swaps/`
- `src/app/login/`
- `src/app/student/`
- `src/app/student/cleaning/`
- `src/app/student/complaints/`
- `src/app/student/profile/`
- `src/app/student/swap/`
- `src/app/supervisor/`
- `src/app/supervisor/board/`
- `src/app/warden/`
- `src/app/warden/swaps/`
- `src/components/`
- `src/components/caretaker/`
- `src/components/layout/`
- `src/components/shared/`
- `src/components/student/`
- `src/components/supervisor/`
- `src/components/ui/`
- `src/components/warden/`

## Akash Maurya: Hostel Module, Workflow and Authentication Lead

**Owns:** Authentication, complaint, cleaning, and caretaker workflows

Folders where Akash is named as an owner (open each folder's README for the file-by-file details):

- `src/`
- `src/app/api/auth/[...nextauth]/`
- `src/app/api/cleaning/`
- `src/app/api/cleaning/bookings/`
- `src/app/api/cleaning/export/`
- `src/app/api/cleaning/schedule/`
- `src/app/api/cleaning/slots/`
- `src/app/api/complaints/`
- `src/app/api/complaints/[id]/`
- `src/app/api/complaints/[id]/reregister/`
- `src/app/api/complaints/[id]/status/`
- `src/app/api/complaints/export/`
- `src/app/api/profile/`
- `src/app/api/swaps/[id]/assign-room/`
- `src/app/api/swaps/[id]/forward/`
- `src/app/caretaker/`
- `src/app/caretaker/complaints/`
- `src/app/caretaker/swaps/`
- `src/app/login/`
- `src/app/student/cleaning/`
- `src/app/student/complaints/`
- `src/app/student/profile/`
- `src/app/supervisor/`
- `src/app/supervisor/board/`
- `src/components/caretaker/`
- `src/components/student/`
- `src/components/supervisor/`
- `src/server/services/`

## Shahid Alam: Integration and Deployment Lead

**Owns:** Frontend-backend integration, deployment, Git

Folders where Shahid is named as an owner (open each folder's README for the file-by-file details):

- `.github/workflows/`
- `src/server/storage/`

## Shahid's cross-cutting work

Shahid does not own a feature folder; he makes the pieces work together and get shipped:

- Git workflow: branch naming, pull-request rules, protecting `main`, reviewing merges.
- CI in `.github/workflows/ci.yml` and the Vercel project (preview and production deploys, environment variables, domain).
- Agreeing the frontend-backend contract with Aditya and Aryan: every API answers `{ data: ... }` or `{ error: "..." }`, and the exact request/response of each endpoint is written in that endpoint's folder README.
- Wiring each page to its API and checking the whole flow works end to end.
- Setting up the file storage (Google Drive folder or Vercel Blob token) used for swap attachments.
- Setting up Google OAuth credentials with Akash.

## How the four fit together

1. **Aditya** creates the database schema, repositories, validators and error classes first. Everyone depends on them.
2. **Akash** builds login, role guard and profile, then cleaning, complaints and the caretaker workflows on top of Aditya's repositories.
3. **Aryan** builds the screens and components using the prototype in `docs/prototype/`, calling the API routes.
4. **Shahid** connects the pieces, keeps CI green and deploys.
5. **Swap and warden flow** is built by Aditya (rules) and Aryan (screens); the caretaker side of swaps (forward, assign room) is Akash's.
6. Documentation is shared by all four.
