# `src/app/caretaker/complaints/`

> Caretaker complaint queue.

| Layer | Owner |
|---|---|
| Page | Aryan (screen) + Akash (caretaker workflow) |

## What this folder is for

Where the caretaker processes complaints.

## Files that go in this folder

### `page.tsx`

**What it does:** List of complaints for this hostel with a category filter, buttons Mark in progress and Mark resolved, and download buttons for CSV and PDF.

**Called by:** Caretakers at `/caretaker/complaints`.

**Calls:** `ComplaintQueue`; `/api/complaints`, `/api/complaints/[id]/status`, `/api/complaints/export`.

**Details:**

- CSV = one row per complaint. PDF = one complaint per page.
