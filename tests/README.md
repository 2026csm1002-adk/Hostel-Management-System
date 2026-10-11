# `tests/`

> All automated tests.

| Layer | Owner |
|---|---|
| Testing | Aditya |

## What this folder is for

Tests prove the rules keep working while the code changes. CI runs them on every pull request (`npm test`).

## Rules for this folder

- Mirror the source: a test for `cleaning.service.ts` is named `cleaning.service.test.ts`.
- Write the test for a business rule BEFORE or together with the code.

## Sub-folders

- `unit/` : Fast tests of single functions and rules.
- `integration/` : API route + database together.
- `e2e/` : Whole user flows in a browser.
