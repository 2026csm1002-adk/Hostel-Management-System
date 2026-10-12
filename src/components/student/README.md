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


### `StudentTabs.tsx`

**What it does:** The Requests and Profile pills under the page title; the pill of the open page is dark.

**Called by:** `student/layout.tsx`.


### `ActionStubs.tsx`

**What it does:** TEMPORARY. The three cards (Book room cleaning, Submit a complaint, Request room swap) with a "+" that opens a short note. Replace the note with `SlotPicker`, `ComplaintForm` and `SwapForm` when they exist.

**Called by:** `student/page.tsx`.


### `ProfileForm.tsx`

**What it does:** Roll no (read-only), name, hostel dropdown, wing, room, course, batch and Save.

**Called by:** `student/profile/page.tsx`.

**Calls:** `PUT /api/profile`.

**Current behaviour (temporary):** display only. Name, roll no, email and batch are filled from the login; hostel, wing, room and course show "Not set yet". The Save button is disabled until the profile is connected to the database.
