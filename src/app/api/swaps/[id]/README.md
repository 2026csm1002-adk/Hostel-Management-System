# `src/app/api/swaps/[id]/`

> Folder for actions on a single swap request.

| Layer | Owner |
|---|---|
| API route | Aditya |

## What this folder is for

`[id]` stands for any swap id. The sub-folders are the steps of the swap workflow. The allowed order of steps is:

| From status | To status | Who does it | Condition |
|---|---|---|---|
| (new) | `Pending` | Student | Submit reason (+ optional file) |
| `Pending` | `Forwarded` | Caretaker of that hostel | Forward to warden |
| `Forwarded` | `Accepted` | Warden | No comment needed |
| `Forwarded` | `Rejected` | Warden | **Comment required** |
| `Forwarded` | `Waiting` | Warden | **Comment required** (acceptable, but no vacant room yet) |
| `Waiting` | `Accepted` / `Rejected` | Warden | Decided again when a room frees up |
| `Accepted` | `RoomAssigned` | Caretaker | Enters a room number |
| `Accepted` | `AwaitingRoom` | Caretaker | No free room right now |
| `AwaitingRoom` | `RoomAssigned` | Caretaker | A room became free |


## Sub-folders

- `forward/` : Caretaker -> warden.
- `decision/` : Warden decides.
- `assign-room/` : Caretaker assigns the room.
