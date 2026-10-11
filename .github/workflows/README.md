# `.github/workflows/`

> Automatic checks that run on GitHub for every pull request.

| Layer | Owner |
|---|---|
| CI/CD | Shahid |

## What this folder is for

GitHub Actions reads every `.yml` file in this folder. This is where we make GitHub run our quality checks automatically so broken code cannot be merged by accident.

## Rules for this folder

- Vercel deploys the site by itself when code is merged. These workflows only decide whether the code is healthy enough to merge.
- Turn on branch protection for `main` (Settings > Branches) and require this workflow to pass.

## Files that go in this folder

### `ci.yml`

**What it does:** The main pipeline. On every pull request and every push to `main` it installs the project and runs lint, type-check, tests and a production build. If any step fails the pull request shows a red cross.

**Called by:** GitHub, automatically.

**Details:**

- Trigger: `pull_request` and `push` on branch `main`.
- Runs on `ubuntu-latest` with Node 22 and npm cache enabled.
- Steps in order: checkout, setup-node, `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- Needs dummy environment values so the build does not crash: `DATABASE_URL=file:ci.db`, `AUTH_SECRET=ci-only-secret`, `AUTH_GOOGLE_ID=ci`, `AUTH_GOOGLE_SECRET=ci`, `ALLOWED_EMAIL_DOMAIN=iitrpr.ac.in`. Real secrets must NEVER be written in this file.
- Later you can add an `e2e` job (Playwright) as a separate file or job.
