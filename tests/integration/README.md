# `tests/integration/`

> Tests of a full API call.

| Layer | Owner |
|---|---|
| Testing | Aditya |

## What this folder is for

Call a route and check the real result in a throwaway database (`DATABASE_URL=file:test.db`).

## Files that go in this folder

### `cleaning.api.test.ts`

**What it does:** Book through the route until a slot is full; confirm the 4th request returns 409.

**Called by:** `npm test`.


### `complaints.api.test.ts`

**What it does:** Student files, caretaker resolves, student cannot resolve (403).

**Called by:** `npm test`.


### `swaps.api.test.ts`

**What it does:** Whole swap chain from submit to room assigned, and every forbidden shortcut.

**Called by:** `npm test`.

