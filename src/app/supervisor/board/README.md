# `src/app/supervisor/board/`

> Cleaning capacity board.

| Layer | Owner |
|---|---|
| Page | Aryan (screen) + Akash (cleaning logic) |

## What this folder is for

Shows who needs cleaning, where and when.

## Files that go in this folder

### `page.tsx`

**What it does:** Date tabs and a floor x slot grid showing x/3 and the booked room numbers, quick stats (rooms booked, full slots), and CSV / PDF download of the full schedule for the cleaning staff.

**Called by:** Cleaning supervisor at `/supervisor/board`.

**Calls:** `CapacityBoard`, `ScheduleExport`; `/api/cleaning/schedule`, `/api/cleaning/export`.

**Details:**

- The exported file lists Date, Floor, Slot and Room Number so staff know exactly which room to clean at which time.
