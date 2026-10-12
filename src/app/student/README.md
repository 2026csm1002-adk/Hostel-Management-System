# `src/app/student/`

> All screens for the Student role.

| Layer | Owner |
|---|---|
| Pages | Aryan |

## What this folder is for

Everything a student can open under `/student/...`. The proxy only lets the Student role in.

## Rules for this folder

- A student can never see another student's requests.

## Files that go in this folder

### `layout.tsx`

**What it does:** The shell around all student pages: top bar with the Requests and Profile tabs and a logout button.

**Called by:** Every page under `/student`.

**Calls:** `Navbar` component.


### `page.tsx`

**What it does:** The student home at `/student`: three action buttons (Book cleaning, Complaint, Room swap) and the "My requests" list with filters (All, Cleaning, Swap and each complaint category).

**Called by:** Students.

**Calls:** `/api/cleaning/*`, `/api/complaints`, `/api/swaps` through components.

**Details:**

- Uses `TicketCard`, `StatusChip` and `FilterChips`.
- Shows a Re-register button on a complaint only when it is unresolved and 7 or more days old.

## Sub-folders

- `profile/` : Edit profile.
- `cleaning/` : Book cleaning.
- `complaints/` : File and follow complaints.
- `swap/` : Request a room swap.
