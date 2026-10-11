# `tests/e2e/`

> Optional browser tests.

| Layer | Owner |
|---|---|
| Testing | Aditya (run automatically in CI) |

## What this folder is for

Robots that click through a whole role flow (for example with Playwright). Add them once the main screens work.

## Files that go in this folder

### `student-cleaning-to-supervisor.spec.ts`

**What it does:** Student books a slot; supervisor sees the room on the board.

**Called by:** CI or manual.


### `complaint-flow.spec.ts`

**What it does:** Student files a complaint; caretaker moves it to Resolved; student sees the new status.

**Called by:** CI or manual.


### `swap-flow.spec.ts`

**What it does:** Student requests a swap; caretaker forwards; warden accepts; caretaker assigns a room; student sees it.

**Called by:** CI or manual.
