# `src/app/`

> Pages and API routes. The folder path becomes the URL.

| Layer | Owner |
|---|---|
| Pages + API | Shared |

## What this folder is for

This is the Next.js App Router. A folder containing `page.tsx` becomes a web page; a folder containing `route.ts` becomes an API endpoint. For example `src/app/student/cleaning/page.tsx` is the page at `/student/cleaning`.

## Rules for this folder

- The file names `page.tsx`, `layout.tsx` and `route.ts` are required by Next.js and cannot be renamed.
- A `README.md` inside these folders is ignored by Next.js, so it is safe.
- Pages show data and forms only. Business rules live in `src/server/services`.

## Files that go in this folder

### `layout.tsx`

**What it does:** The root wrapper around the entire website: the `<html>` and `<body>` tags, the page title and description, global fonts.

**Called by:** Next.js wraps every page with it.

**Calls:** `globals.css`.

**Details:**

- Sets metadata: title "HostelHub".
- Imports `globals.css` once.
- Contains no role-specific UI; each role has its own `layout.tsx`.


### `page.tsx`

**What it does:** The `/` address. It only redirects: signed out -> `/login`; Student -> `/student`; Caretaker -> `/caretaker/complaints`; Supervisor -> `/supervisor/board`; Warden -> `/warden/swaps`.

**Called by:** Anyone opening the site root.

**Calls:** `auth()` from `src/auth.ts`.

**Details:**

- No visible content; it exists purely to route people.


### `globals.css`

**What it does:** Global styles: loads Tailwind CSS and holds the colour and spacing design tokens.

**Called by:** `layout.tsx`.

**Details:**

- Colour palette from the prototype: ink `#1B2430`, teal `#1F6F63` (student), amber `#B8791F` (caretaker), indigo `#3B4C86` (supervisor/warden), green `#3F7D52` (available/approved), brick `#AE4328` (full/rejected).

## Sub-folders

- `login/` : Sign-in page.
- `student/` : Student screens.
- `caretaker/` : Caretaker screens.
- `supervisor/` : Cleaning supervisor screens.
- `warden/` : Warden screens.
- `api/` : All backend endpoints (`/api/...`).
