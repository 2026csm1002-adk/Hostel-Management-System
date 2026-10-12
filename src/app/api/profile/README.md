# `src/app/api/profile/`

> Student profile endpoint.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

Read and update the logged-in student's profile.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `GET` returns my profile. `PUT` updates it.

**Called by:** Profile page and `ProfileForm`.

**Calls:** `profileService.getProfile`, `profileService.upsertProfile`.

**Details:**

- Who: Student only.
- PUT body is checked with `profileSchema` (full name, hostel, wing, room, course, batch).
- Once the profile exists, the roll no is taken from the session and can never be changed by the request body. On the very first save (session `userId` is null) the roll no comes from the request body and becomes the student's id.
