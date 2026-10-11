# Project structure

This file explains how the HostelHub repository is organised. **Every folder has its own `README.md`** that describes in detail each file that will live in it, so open the README of the folder you are working in before creating a file.

Who owns what is listed in [TEAM_OWNERSHIP.md](TEAM_OWNERSHIP.md).

## Golden rule: one direction only

```
Page  ->  API route  ->  Service  ->  Repository  ->  Database
(what     (checks &       (business    (SQL queries     (Turso)
you see)   forwards)       rules)       only)
```

A page never talks to a repository. A repository never contains business rules. UI code never imports from `src/server/`.

## Layout

```
hostelhub/
├── .github/workflows/        CI pipeline
├── docs/                     documentation (diagrams, prototype, SRS, slides)
├── drizzle/                  generated database migrations
├── public/                   static files
├── scripts/                  one-off scripts (seed)
├── src/
│   ├── app/                  pages and API routes (URL = folder path)
│   ├── components/           reusable UI
│   ├── server/               services, repositories, db, storage
│   ├── lib/                  constants, helpers, Zod validators
│   ├── types/                shared types
│   ├── auth.ts               login setup (Auth.js)
│   └── middleware.ts         gatekeeper for every request
├── tests/                    unit, integration, e2e
└── (root config files)       package.json, tsconfig.json, ...
```

## Folders at a glance

| Folder | Owner | What it is |
|---|---|---|
| `.github/workflows/` | Shahid | Automatic checks that run on GitHub for every pull request. |
| `docs/` | Shared | All project documentation, kept next to the code so it stays in sync. |
| `docs/diagrams/` | Shared | The three final design diagrams. |
| `docs/presentation/` | Shared | Course presentation slides. |
| `docs/prototype/` | Aryan | The clickable UI prototype. |
| `drizzle/` | Aditya | Auto-generated database migration files. |
| `public/` | Aryan | Static files served exactly as they are. |
| `scripts/` | Aditya | One-off helper scripts run by hand, not part of the website. |
| `src/` | Shared (auth.ts and middleware.ts: Akash) | All application source code. |
| `src/app/` | Shared | Pages and API routes. The folder path becomes the URL. |
| `src/app/api/` | Shared (each sub-folder is owned by its module lead) | Every backend endpoint of the website. |
| `src/app/api/auth/[...nextauth]/` | Akash | Auth.js endpoints. |
| `src/app/api/cleaning/` | Akash | Cleaning endpoints (grouped). |
| `src/app/api/cleaning/bookings/` | Akash | Create cleaning booking endpoint. |
| `src/app/api/cleaning/export/` | Akash (file building is done by export.service) | Cleaning schedule download endpoint. |
| `src/app/api/cleaning/schedule/` | Akash | Cleaning schedule endpoint. |
| `src/app/api/cleaning/slots/` | Akash | Slot availability endpoint. |
| `src/app/api/complaints/` | Akash | Complaints endpoint. |
| `src/app/api/complaints/[id]/` | Akash | Folder for actions on a single complaint. |
| `src/app/api/complaints/[id]/reregister/` | Akash | Re-register a complaint. |
| `src/app/api/complaints/[id]/status/` | Akash | Change complaint status. |
| `src/app/api/complaints/export/` | Akash (file building is done by export.service) | Complaint download endpoint. |
| `src/app/api/profile/` | Akash | Student profile endpoint. |
| `src/app/api/swaps/` | Aditya | Room swap endpoint. |
| `src/app/api/swaps/[id]/` | Aditya | Folder for actions on a single swap request. |
| `src/app/api/swaps/[id]/assign-room/` | Akash (caretaker side) | Assign a room after acceptance. |
| `src/app/api/swaps/[id]/decision/` | Aditya | Warden decision. |
| `src/app/api/swaps/[id]/forward/` | Akash (caretaker side) | Forward a swap to the warden. |
| `src/app/api/swaps/stats/` | Aditya | Swap statistics endpoint. |
| `src/app/caretaker/` | Aryan (layout) + Akash (caretaker workflows) | All screens for the Caretaker role. |
| `src/app/caretaker/complaints/` | Aryan (screen) + Akash (caretaker workflow) | Caretaker complaint queue. |
| `src/app/caretaker/swaps/` | Aryan (screen) + Akash (caretaker side of swaps) | Caretaker swap queue. |
| `src/app/login/` | Akash (login logic) + Aryan (screen) | The sign-in page. |
| `src/app/student/` | Aryan | All screens for the Student role. |
| `src/app/student/cleaning/` | Aryan (screen) + Akash (cleaning logic) | Room cleaning booking page. |
| `src/app/student/complaints/` | Aryan (screen) + Akash (complaint logic) | Student complaints page. |
| `src/app/student/profile/` | Aryan (screen) + Akash (profile logic) | Student profile page. |
| `src/app/student/swap/` | Aryan (screen) + Aditya (swap rules) | Room swap page. |
| `src/app/supervisor/` | Aryan (layout) + Akash (cleaning logic) | All screens for the Cleaning Supervisor role. |
| `src/app/supervisor/board/` | Aryan (screen) + Akash (cleaning logic) | Cleaning capacity board. |
| `src/app/warden/` | Aryan (layout) + Aditya (swap rules) | All screens for the Warden role. |
| `src/app/warden/swaps/` | Aryan (screen) + Aditya (swap rules) | Warden swap decisions. |
| `src/components/` | Aryan | Reusable UI pieces used by the pages. |
| `src/components/caretaker/` | Aryan (UI) + Akash (behaviour) | Caretaker-only components. |
| `src/components/layout/` | Aryan | Page frame components. |
| `src/components/shared/` | Aryan | Components used by more than one role. |
| `src/components/student/` | Aryan (UI) + Akash (behaviour of profile, cleaning, complaint forms) | Student-only components. |
| `src/components/supervisor/` | Aryan (UI) + Akash (behaviour) | Supervisor-only components. |
| `src/components/ui/` | Aryan | shadcn/ui building blocks. |
| `src/components/warden/` | Aryan (UI) + Aditya (swap rules) | Warden-only components. |
| `src/lib/` | Shared (constants.ts changes agreed by the team) | Helpers and constants shared by frontend and backend. |
| `src/lib/validators/` | Aditya (each module lead adjusts their own schema) | Zod schemas that define what valid input looks like. |
| `src/server/` | Aditya | Backend-only code. |
| `src/server/db/` | Aditya | Database connection and table definitions. |
| `src/server/repositories/` | Aditya | Database queries live here. |
| `src/server/services/` | Aditya (swap, export) + Akash (auth, profile, cleaning, complaint) | Business rules live here. |
| `src/server/storage/` | Shahid (Drive/Blob setup and deployment keys) | File storage for swap documents. |
| `src/types/` | Shared | Shared TypeScript types. |
| `tests/` | Aditya | All automated tests. |
| `tests/e2e/` | Aditya (run automatically in CI) | Optional browser tests. |
| `tests/integration/` | Aditya | Tests of a full API call. |
| `tests/unit/` | Aditya | Unit tests for rules and helpers. |

## Root files

These live next to `src/` and are mostly created by tools (`create-next-app`, `shadcn init`, `drizzle-kit`).

### `package.json`

The project's identity card: name, npm scripts (`dev`, `build`, `lint`, `typecheck`, `test`, `db:generate`, `db:push`, `db:studio`, `db:seed`) and the list of libraries. Created by `create-next-app`, then extended with the libraries from the tech stack.

**Owner:** Shahid

### `tsconfig.json`

TypeScript settings. Strict mode on, and the `@/*` alias pointing to `src/*`.

**Owner:** Shahid

### `next.config.ts`

Next.js settings (image domains, redirects, security headers). Keep it nearly empty.

**Owner:** Shahid

### `postcss.config.mjs`

Turns Tailwind CSS classes into real CSS during the build.

**Owner:** Aryan

### `eslint.config.mjs`

Lint rules that catch bugs and keep the style consistent. Runs in CI.

**Owner:** Shahid

### `components.json`

shadcn/ui settings: where generated components go, which style, which aliases.

**Owner:** Aryan

### `drizzle.config.ts`

Tells Drizzle Kit where `schema.ts` is, where migrations go (`drizzle/`), and which database to use (reads `DATABASE_URL`, `TURSO_AUTH_TOKEN`).

**Owner:** Aditya

### `vitest.config.ts`

Test runner settings: finds `tests/**/*.test.ts` and makes the `@/` alias work inside tests.

**Owner:** Aditya

### `.env.example`

A template listing every environment variable, committed to Git with empty values. Copy it to `.env.local` and fill it in. Variables: `DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `ALLOWED_EMAIL_DOMAIN`, and for attachments either `GOOGLE_DRIVE_FOLDER_ID` or `BLOB_READ_WRITE_TOKEN`.

**Owner:** Shahid

### `.gitignore`

Files Git must never commit: `node_modules/`, `.next/`, `.env.local` (secrets), `local.db`.

**Owner:** Shahid

### `README.md`

The project front page on GitHub (what it is, stack, how to run, team).

**Owner:** Shared

## Naming conventions

- Files: `kebab-case` with a role suffix: `cleaning.service.ts`, `complaint.repo.ts`, `profile.schema.ts`.
- React components: `PascalCase`, one per file: `SlotPicker.tsx`.
- Next.js fixed names (cannot be changed): `page.tsx`, `layout.tsx`, `route.ts`, `middleware.ts`.
- Imports use the `@/` alias: `import { cn } from "@/lib/utils"`.
