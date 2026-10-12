# `src/app/student/profile/`

> Student profile page.

| Layer | Owner |
|---|---|
| Page | Aryan (screen) + Akash (profile logic) |

## What this folder is for

Where a student keeps the details that are auto-attached to every request.

## Files that go in this folder

### `page.tsx`

**What it does:** Form with Roll No (read-only), Full name, Hostel (grouped Boys' / Girls'), Wing, Room, Course (B.Tech / M.Tech / PhD / Other) and Batch.

**Called by:** Students at `/student/profile`.

**Calls:** `ProfileForm`; saves through `PUT /api/profile`.

**Details:**

- Roll No is the primary key: typed once when the profile is created, then read-only forever.
- First login: if no profile exists, send the student here to create it before anything else.
