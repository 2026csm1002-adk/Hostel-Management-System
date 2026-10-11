# `src/app/api/swaps/stats/`

> Swap statistics endpoint.

| Layer | Owner |
|---|---|
| API route | Aditya |

## What this folder is for

Numbers for the warden's charts.

## Rules for this folder

- Keep every `route.ts` thin: (1) check the session and role, (2) validate the input with the Zod schema from `src/lib/validators/`, (3) call exactly ONE service function, (4) return JSON. If a handler grows past ~30 lines, the logic belongs in a service.

## Files that go in this folder

### `route.ts`

**What it does:** `GET /api/swaps/stats` returns `{ byBatch: [{ label: "2026", count: 3 }], byCourse: [...] }`.

**Called by:** `BatchCourseStats` on the warden page.

**Calls:** `swapService.stats`.

**Details:**

- Who: Warden.
- Counts only. The response must never contain student names, roll numbers or any value that identifies a person.
