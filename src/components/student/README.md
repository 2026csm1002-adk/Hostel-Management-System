# `src/components/student/`

> Student-only components.

| Layer | Owner |
|---|---|
| UI components | Aryan (UI) + Akash (behaviour of profile, cleaning, complaint forms) |

## What this folder is for

Forms and pickers used on the student pages.

## Files that go in this folder

### `SlotPicker.tsx`

**What it does:** Date tabs (2 to 4 days ahead), floor tabs and the slot grid with x/3 and FULL; selecting a slot enables Confirm.

**Called by:** `student/cleaning/page.tsx`.

**Calls:** `/api/cleaning/slots`, `/api/cleaning/bookings`.


### `ComplaintForm.tsx`

**What it does:** Eight category chips, a description box and Submit.

**Called by:** `student/complaints/page.tsx`.

**Calls:** `POST /api/complaints`.


### `SwapForm.tsx`

**What it does:** Reason box, optional file input and Submit.

**Called by:** `student/swap/page.tsx`.

**Calls:** `POST /api/swaps`.


### `ProfileForm.tsx`

**What it does:** Roll no (read-only), name, hostel dropdown, wing, room, course, batch and Save.

**Called by:** `student/profile/page.tsx`.

**Calls:** `PUT /api/profile`.
