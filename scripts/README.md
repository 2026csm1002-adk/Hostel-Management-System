# `scripts/`

> One-off helper scripts run by hand, not part of the website.

| Layer | Owner |
|---|---|
| Tooling | Aditya |

## What this folder is for

Small programs that you run from the terminal to prepare or maintain data. They are never run by the website itself.

## Files that go in this folder

### `seed.ts`

**What it does:** Fills an empty database with the data the app needs to be usable: the 8 hostels, one Caretaker and one Warden per hostel, one Cleaning Supervisor, and optionally a few test students.

**Called by:** You, by running `npm run db:seed`.

**Calls:** `src/server/db/client.ts` and `src/lib/constants.ts` (HOSTELS list).

**Details:**

- Hostels: Satluj, Beas, Chenab, Brahmaputra South, Brahmaputra North (Boys); Raavi, Chintpurni, T6 (Girls).
- Staff rows need real institute emails (stored in lower case) so staff can sign in. They are read from `scripts/seed-staff.json`, which is git-ignored so real emails never reach GitHub. Format: `[{ "name": "...", "email": "...", "role": "Caretaker", "hostel": "satluj" }, { "name": "...", "email": "...", "role": "Supervisor" }]`. Hostel ids: satluj, beas, chenab, brahmaputra-south, brahmaputra-north, raavi, chintpurni, t6. The Supervisor has no hostel.
- Must be safe to run twice (insert-or-ignore) so nobody duplicates or wipes data by accident.
- Only run it against a development database unless you are sure.
