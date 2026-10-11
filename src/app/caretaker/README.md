# `src/app/caretaker/`

> All screens for the Caretaker role.

| Layer | Owner |
|---|---|
| Pages | Aryan (layout) + Akash (caretaker workflows) |

## What this folder is for

Everything a caretaker can open under `/caretaker/...`.

## Rules for this folder

- A caretaker only ever sees data of their own hostel.

## Files that go in this folder

### `layout.tsx`

**What it does:** Shell with tabs Complaints and Swaps plus logout.

**Called by:** Every page under `/caretaker`.

**Calls:** `Navbar` component.

## Sub-folders

- `complaints/` : Complaint queue.
- `swaps/` : Room-swap queue.
