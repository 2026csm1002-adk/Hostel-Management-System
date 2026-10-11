# `src/components/supervisor/`

> Supervisor-only components.

| Layer | Owner |
|---|---|
| UI components | Aryan (UI) + Akash (behaviour) |

## What this folder is for

The capacity board and the export buttons.

## Files that go in this folder

### `CapacityBoard.tsx`

**What it does:** Floor x slot grid with x/3 and booked room numbers, with date tabs.

**Called by:** `supervisor/board/page.tsx`.

**Calls:** `/api/cleaning/schedule`.


### `ScheduleExport.tsx`

**What it does:** Two buttons, Download CSV and Download PDF, for the cleaning staff.

**Called by:** `supervisor/board/page.tsx`.

**Calls:** `/api/cleaning/export`.
