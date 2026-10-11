# `docs/diagrams/`

> The three final design diagrams.

| Layer | Owner |
|---|---|
| Documentation | Shared |

## What this folder is for

Image files of the finalised design. The root `README.md` links to these three exact file names, so keep the names unchanged.

## Files that go in this folder

### `High_Level_Design.png`

**What it does:** Shows the big picture: the four user roles, the browser, the Next.js app on Vercel (presentation, auth middleware, API, business logic, data access), Auth.js with Google sign-in, the Turso database, file storage, and the GitHub Actions + Vercel delivery pipeline.

**Called by:** README, presentation, anyone onboarding.


### `Low_Level_Design.png`

**What it does:** Shows each of the four modules (Auth & Profile, Room Cleaning, Complaints, Room Swap) layer by layer: Pages -> API routes -> Service -> Repository -> Tables, plus the middleware that guards everything. This is the picture our folder structure is built from.

**Called by:** Developers while coding; check it before adding a new file.


### `ER_Diagram_Updated.png`

**What it does:** The database design: 7 tables (Hostel, Student, StaffUser, CleaningBooking, Complaint, SwapRequest, Attachment), their keys, and the UNIQUE rule that caps a cleaning slot at 3 rooms.

**Called by:** Aditya when writing `schema.ts`; anyone writing queries.
