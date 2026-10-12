# `src/components/layout/`

> Page frame components.

| Layer | Owner |
|---|---|
| UI components | Aryan |

## What this folder is for

The parts that surround page content.

## Files that go in this folder

### `Navbar.tsx`

**What it does:** Top bar with app name, role tabs and a logout button.

**Called by:** Role layouts (`student/layout.tsx`, `caretaker/layout.tsx`, ...).

**Calls:** `signOut` from `next-auth/react`.


### `PageHeader.tsx`

**What it does:** Title, subtitle and a row for action buttons at the top of a page.

**Called by:** Almost every page.
