# `src/`

> All application source code.

| Layer | Owner |
|---|---|
| Application | Shared (auth.ts and proxy.ts: Akash) |

## What this folder is for

Everything the website is made of. The two files here are the login setup and the request gatekeeper; the folders split the code by responsibility.

## Rules for this folder

- Dependency direction is one-way: **Page -> API route -> Service -> Repository -> Database**. Never go backwards (for example a repository must never call a service).
- Import with the `@/` alias, for example `import { cn } from "@/lib/utils"`, so paths stay short.

## Files that go in this folder

### `auth.ts`

**Owner:** Akash

**What it does:** Configures Auth.js (NextAuth). It is the only place that knows how login works.

**Called by:** `proxy.ts`, the `/api/auth` route, and any server page that needs to know who is logged in.

**Calls:** Google provider, `authService.resolveRole`.

**Details:**

- Uses Google sign-in only. Reads `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` from the environment.
- `signIn` callback: allow only emails ending with `@` + `ALLOWED_EMAIL_DOMAIN`; reject everyone else.
- `jwt` callback: look up the email with `authService.resolveRole` and store `role`, `userId` and `hostelId` in the token. It runs at sign-in, and again on later requests while a student still has no profile (`userId` is null), so the student is let through as soon as the profile exists.
- `session` callback: copy those fields onto `session.user` so pages can read them.
- Exports `handlers`, `auth`, `signIn`, `signOut`.


### `proxy.ts`

**Owner:** Akash

**What it does:** The gatekeeper that runs before every page and API call. This file replaces the earlier `middleware.ts`: Next.js 16 calls it `proxy.ts`, and it runs on Node.js, which the database lookup in `auth.ts` needs. Use Next.js 16 or newer.

**Called by:** Next.js, automatically, for each request that matches its `config.matcher`.

**Calls:** `auth()` from `auth.ts`, `ROLE_HOME` from `src/lib/constants.ts`.

**Details:**

- Not signed in -> pages redirect to `/login`, API calls get `401 { error }`. Public: `/login` and `/api/auth/*`.
- Signed in and opening `/login` -> redirect to `/`.
- Student whose `userId` is null (no profile yet): only `/student/profile` and `/api/profile` are allowed; everything else redirects to `/student/profile` (API calls get `403`).
- Role guard: `/student/*` = Student, `/caretaker/*` = Caretaker, `/supervisor/*` = Supervisor, `/warden/*` = Warden. Wrong role -> redirect to that person's own home (`ROLE_HOME`).
- Hostel scoping: staff (except the Supervisor) are limited to their own `hostelId`; the real filtering happens again in the services.
- Keep database lookups out of this file. Read the role from the session token instead.
- Defence in depth: the API routes and services must check the role again. Never rely on the proxy alone.

## Current temporary auth state

Roles are not decided yet, so login is deliberately simple:

- `auth.ts` only checks the Google account and the institute email domain. It does NOT read the database and does NOT set a role.
- `proxy.ts` only checks "is someone signed in?". There are no role rules yet.
- The login screen asks Student or Admin first (as in the prototype), then Google. That choice only decides which dummy page opens (`/student` or `/admin`); it is NOT a security rule, so anyone with an institute email can open either page.
- `src/app/student/` is now the real "My hostel" screen (Requests and Profile). Roll number, batch and name come from the email / Google account (`src/lib/student-identity.ts`); hostel, wing, room and course stay empty until profiles are saved.
- `src/app/admin/page.tsx` is still a dummy page that shows the name and email. `src/app/admin/` is temporary and is not in the final structure.
- When roles are decided: add the `jwt` and `session` callbacks to `auth.ts` (using `resolveRole`), add the role guard back to `proxy.ts`, redirect `page.tsx` by role, and replace the dummy pages. Run `npm run db:push` and `npm run db:seed` first.

## Sub-folders

- `app/` : Pages and API routes. The folder path becomes the URL.
- `components/` : Reusable UI pieces.
- `server/` : Backend-only code: services, repositories, database, file storage, errors.
- `lib/` : Helpers and constants shared by frontend and backend.
- `types/` : Shared TypeScript types.
