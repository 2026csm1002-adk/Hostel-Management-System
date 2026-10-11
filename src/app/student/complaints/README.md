# `src/app/student/complaints/`

> Student complaints page.

| Layer | Owner |
|---|---|
| Page | Aryan (screen) + Akash (complaint logic) |

## What this folder is for

File a complaint and follow its progress.

## Rules for this folder

- There is deliberately NO "Resolved" button on this page. Only the caretaker can resolve.

## Files that go in this folder

### `page.tsx`

**What it does:** Category chips (Carpenter, Plumbing, Pest Control, Drinking Water related, Horticulture related, Network & Wifi, Electrical, Others), a description box and Submit, then the student's complaint list with status and "X days ago".

**Called by:** Students at `/student/complaints`.

**Calls:** `ComplaintForm`, `TicketCard`; `/api/complaints`, `/api/complaints/[id]/reregister`.

**Details:**

- Hostel, wing and room are attached automatically.
- Re-register button appears only if the complaint is not Resolved, is 7+ days old and was not re-registered before.
