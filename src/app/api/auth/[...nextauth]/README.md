# `src/app/api/auth/[...nextauth]/`

> Auth.js endpoints.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

Handles sign-in, the callback from Google, sign-out and session lookup. You write no logic here.

## Rules for this folder

- The folder name `[...nextauth]` is required by Auth.js. Do not rename it.

## Files that go in this folder

### `route.ts`

**What it does:** Exports `GET` and `POST` taken from `handlers` in `src/auth.ts`.

**Called by:** Auth.js and Google's redirect.

**Calls:** `src/auth.ts`.
