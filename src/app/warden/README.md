# `src/app/warden/`

> All screens for the Warden role.

| Layer | Owner |
|---|---|
| Pages | Aryan (layout) + Aditya (swap rules) |

## What this folder is for

A warden only decides swap requests of their hostel.

## Files that go in this folder

### `layout.tsx`

**What it does:** Shell with title and logout.

**Called by:** Every page under `/warden`.

**Calls:** `Navbar` component.

## Sub-folders

- `swaps/` : Swap decisions and statistics.
