# `src/components/warden/`

> Warden-only components.

| Layer | Owner |
|---|---|
| UI components | Aryan (UI) + Aditya (swap rules) |

## What this folder is for

Decision controls and statistics.

## Files that go in this folder

### `DecisionPanel.tsx`

**What it does:** Accept, Reject and Mark waiting buttons; Reject and Waiting open a comment box that must be filled before confirming.

**Called by:** `warden/swaps/page.tsx`.

**Calls:** `/api/swaps/[id]/decision`.


### `BatchCourseStats.tsx`

**What it does:** Two bar lists: requests by batch and by course. No names.

**Called by:** `warden/swaps/page.tsx`.

**Calls:** `/api/swaps/stats`.
