# `src/components/shared/`

> Components used by more than one role.

| Layer | Owner |
|---|---|
| UI components | Aryan |

## What this folder is for

Keeps the look identical for Student, Caretaker and Warden.

## Files that go in this folder

### `StatusChip.tsx`

**What it does:** The coloured status pill. Maps each status to a colour: Open/Pending = amber; In progress/Forwarded/Waiting = indigo; Resolved/Accepted/Confirmed/Room assigned = green; Rejected/Full = brick.

**Called by:** Every ticket list.


### `TicketCard.tsx`

**What it does:** The "ticket stub" card: id, type, title, meta line (student, room, date, X days ago), status chip, optional action buttons and notes (warden comment, assigned room, attachment).

**Called by:** Student, caretaker and warden lists.


### `EmptyState.tsx`

**What it does:** A friendly message when a list has nothing to show.

**Called by:** All list screens.


### `FilterChips.tsx`

**What it does:** A row of filter pills (All, Plumbing, Electrical, ...).

**Called by:** Student requests, caretaker complaints.
