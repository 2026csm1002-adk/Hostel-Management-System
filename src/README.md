# `src/`

> All application source code.

| Layer | Owner |
|---|---|
| Application | Shared (auth.ts and middleware.ts: Akash) |

## What this folder is for

Everything the website is made of. The two files here are the login setup and the request gatekeeper; the folders split the code by responsibility.

## Rules for this folder

- Dependency direction is one-way: **Page -> API route -> Service -> Repository -> Database**. Never go backwards (for example a repository must never call a service).
- Import with the `@/` alias, for example `import { cn } from "@/lib/utils"`, so paths stay short.

## Files that go in this folder

### `auth.ts`

**Owner:** Akash

**What it does:** Configures Auth.js (NextAuth). It is the only place that knows how login works.

**Called by:** `middleware.ts`, the `/api/auth` route, and any server page that needs to know who is logged in.

**Calls:** Google provider, `authService.resolveRole`.

**Details:**

- Uses Google sign-in only. Reads `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` from the environment.
- `signIn` callback: allow only emails ending with `@` + `ALLOWED_EMAIL_DOMAIN`; reject everyone else.
- `jwt` callback: look up the email in Student / StaffUser and store `role`, `userId` and `hostelId` in the token.
- `session` callback: copy those fields onto `session.user` so pages can read them.
- Exports `handlers`, `auth`, `signIn`, `signOut`.


### `middleware.ts`

**Owner:** Akash

**What it does:** The gatekeeper that runs before every page and API call.

**Called by:** Next.js, automatically, for each request that matches its `config.matcher`.

**Calls:** `auth()` from `auth.ts`.

**Details:**

- Not signed in -> redirect to `/login` (except `/login` and `/api/auth/*`).
- Role guard: `/student/*` = Student, `/caretaker/*` = Caretaker, `/supervisor/*` = Supervisor, `/warden/*` = Warden. Wrong role -> redirect to that person's own home.
- Hostel scoping: staff (except the Supervisor) are limited to their own `hostelId`; the real filtering happens again in the services.
- Keep database lookups out of this file. Read the role from the session token instead.
- In Next.js 16 and newer this file is named `proxy.ts`. If your Next version prints a warning about it, rename the file.
- Defence in depth: the API routes and services must check the role again. Never rely on the middleware alone.

## Sub-folders

- `app/` : Pages and API routes. The folder path becomes the URL.
- `components/` : Reusable UI pieces.
- `server/` : Backend-only code: services, repositories, database, file storage, errors.
- `lib/` : Helpers and constants shared by frontend and backend.
- `types/` : Shared TypeScript types.
