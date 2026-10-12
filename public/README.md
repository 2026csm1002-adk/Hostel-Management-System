# `public/`

> Static files served exactly as they are.

| Layer | Owner |
|---|---|
| Static assets | Aryan |

## What this folder is for

Anything in this folder is available directly from the website root. A file `public/logo.svg` is reachable at `/logo.svg`.

## Rules for this folder

- Do not put secrets or private documents here: everything is public.

## Files that go in this folder

### `favicon.ico`

**What it does:** The small icon shown in the browser tab.

**Called by:** Browsers.


### `logo.svg`

**What it does:** HMS logo used in the login page and the top bar.

**Called by:** `Navbar` component and the login page.


### `Other images`

**What it does:** Any other fixed images such as illustrations or empty-state pictures.

**Called by:** Components via `<Image src="/name.png">`.
