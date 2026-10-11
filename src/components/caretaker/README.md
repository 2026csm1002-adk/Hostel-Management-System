# `src/components/caretaker/`

> Caretaker-only components.

| Layer | Owner |
|---|---|
| UI components | Aryan (UI) + Akash (behaviour) |

## What this folder is for

Queues and the room-assignment form.

## Files that go in this folder

### `ComplaintQueue.tsx`

**What it does:** List of complaints with the category filter, Mark in progress / Mark resolved, and CSV / PDF download buttons.

**Called by:** `caretaker/complaints/page.tsx`.

**Calls:** `/api/complaints*`.


### `SwapQueue.tsx`

**What it does:** List of swap requests with reason and attachment; Forward to warden on new ones.

**Called by:** `caretaker/swaps/page.tsx`.

**Calls:** `/api/swaps`, `/api/swaps/[id]/forward`.


### `AssignRoomForm.tsx`

**What it does:** Room number box with Assign room and No room available, shown only for accepted requests.

**Called by:** `SwapQueue`.

**Calls:** `/api/swaps/[id]/assign-room`.
