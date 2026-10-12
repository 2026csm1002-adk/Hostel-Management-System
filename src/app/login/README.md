# `src/app/login/`

> The sign-in page.

| Layer | Owner |
|---|---|
| Page | Akash (login logic) + Aryan (screen) |

## What this folder is for

The first screen a signed-out person sees.

## Rules for this folder

- After a successful Google sign-in, redirect to `/` which then sends them to the right home screen.

## Files that go in this folder

### `page.tsx`

**What it does:** Shows two options, Student and Admin, then a "Sign in with Google" button using the institute account.

**Called by:** Anyone who is not logged in.

**Calls:** `signIn("google")` from `src/auth.ts`.

**Details:**

- Admin covers Caretaker, Supervisor and Warden: the real role is decided from the email after login, not from which button was clicked.
- Show a clear message if the Google account is not an institute account or is not registered.
- Akash writes the login logic; Aryan styles the screen.

**Current behaviour (temporary):** the screen first shows the Student and Admin options from the prototype, then the Google button for the chosen one. The choice only picks the landing page (`/student` or `/admin`); it is not a role check yet.
