# `src/components/`

> Reusable UI pieces used by the pages.

| Layer | Owner |
|---|---|
| UI components | Aryan |

## What this folder is for

Small building blocks (buttons, cards, forms) that pages put together. Splitting them out keeps pages short and the look consistent.

## Rules for this folder

- UI code never imports anything from `src/server/`. It talks to the backend only through the `/api/...` routes.
- Components display and collect input; they do not decide business rules (for example the 3-seat limit is enforced by the server, the UI only shows the numbers it is given).
- Name files in PascalCase, one component per file.

## Sub-folders

- `ui/` : shadcn/ui primitives.
- `layout/` : Top bar, side menu, page header.
- `shared/` : Pieces used by several roles.
- `student/` : Student-only pieces.
- `caretaker/` : Caretaker-only pieces.
- `supervisor/` : Supervisor-only pieces.
- `warden/` : Warden-only pieces.
