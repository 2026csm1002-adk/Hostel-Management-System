# `drizzle/`

> Auto-generated database migration files.

| Layer | Owner |
|---|---|
| Database | Aditya |

## What this folder is for

When the table definitions in `src/server/db/schema.ts` change, Drizzle Kit writes the matching SQL here. Each migration is a small step that moves the database from one version of the tables to the next.

## Rules for this folder

- Never edit these files by hand.
- Always commit them to Git so everyone (and the production database) gets the same tables.
- Workflow: change `schema.ts` -> `npm run db:generate` -> read the generated SQL -> `npm run db:push` (or apply the migration).

## Files that go in this folder

### `0000_xxxx.sql, 0001_xxxx.sql, ...`

**What it does:** One SQL file per schema change, numbered in order. Created by `npm run db:generate`.

**Called by:** Drizzle Kit when updating a database.


### `meta/ (folder)`

**What it does:** Drizzle's own bookkeeping: `_journal.json` (list of migrations) and snapshots of the schema. Created automatically.

**Called by:** Drizzle Kit only.
