# `src/app/caretaker/swaps/`

> Caretaker swap queue.

| Layer | Owner |
|---|---|
| Page | Aryan (screen) + Akash (caretaker side of swaps) |

## What this folder is for

Where the caretaker moves swap requests forward.

## Files that go in this folder

### `page.tsx`

**What it does:** Shows swap requests with their reason and any attachment. New ones get Forward to warden. Requests the warden accepted show a room box with Assign room and No room available.

**Called by:** Caretakers at `/caretaker/swaps`.

**Calls:** `SwapQueue`, `AssignRoomForm`; `/api/swaps`, `/api/swaps/[id]/forward`, `/api/swaps/[id]/assign-room`.
