# `src/app/api/complaints/[id]/`

> Folder for actions on a single complaint.

| Layer | Owner |
|---|---|
| API route | Akash |

## What this folder is for

`[id]` is a dynamic folder: it stands for any complaint id, for example `/api/complaints/abc123/status`. It has no `route.ts` itself.

## Sub-folders

- `status/` : Change status.
- `reregister/` : Re-register an old complaint.
