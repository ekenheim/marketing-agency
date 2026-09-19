# AGENTS.md

Guidance for anyone — human or AI coding agent — working in this repository. Read this before making changes.

## The situation

**Digitomara** is the live marketing website for a digital agency: a Next.js 16 frontend backed by a Strapi v5 headless CMS.

Until now this repo was built by a single developer (@ekenheim) who committed straight to `main` and released by pushing version tags by hand. It is now opening up to more contributors, so the process has changed:

- **`main` is production.** Every change that lands on `main` is automatically versioned, built, and deployed to the live site — the image is published within minutes and goes live within a few hours. There is no staging environment.
- **Nobody commits directly to `main` anymore.** All changes go through a pull request.
- **There are no automated tests.** The only safety nets are lint, typecheck, the production build, and human review. Check your change in a browser before opening a PR.
- The Strapi CMS, the Kubernetes cluster, and all secrets are managed by @ekenheim outside this repo. If something you need lives there (a new CMS field, an env var, a secret), ask — it can't be changed from here. `docs/strapi.md` explains how that side is set up.

## How to make a change

1. Update `main` and create a branch:
   ```bash
   git checkout main && git pull
   git checkout -b short-description-of-change
   ```
2. Make the change and look at it locally with `npm run dev` (http://localhost:3000).
3. Before pushing, run the same checks CI runs. All three must pass:
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```
4. Push the branch and open a pull request against `main`. Describe what changed and why; include a screenshot for visual changes.
5. Wait for the **CI** check to go green and for @ekenheim to review. Fix anything that fails — do not merge around a red check.
6. Once merged, the release is automatic (see below). Do not create tags or bump versions yourself.

Keep pull requests small and about one thing. A small PR gets reviewed and shipped the same day; a large one does not.

## What happens after merge

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Finds the latest `vX.Y.Z` tag and bumps the patch number (`v1.0.27` → `v1.0.28`).
2. Lints, then builds the Docker image and pushes it to GHCR as `ghcr.io/ekenheim/marketing-agency-website:<version>` and `:latest`.
3. Creates the matching git tag — only after the image built successfully.
4. Renovate in the cluster repo (`ekenheim/home-ops-upgrade`) picks up the new tag, opens a PR there and auto-merges it; Flux then rolls the website pods. Expect up to a few hours between merge and the change being live — that delay is normal, not a failure.

If the build fails, nothing is tagged and nothing is deployed; the live site keeps running the previous version. Check the Actions tab, fix the problem in a new PR.

Changes that only touch `*.md`, `docs/`, `.env.example`, `iterations/`, or `.claude/` do not trigger a release.

Minor/major version bumps (`v1.1.0`, `v2.0.0`) are done by @ekenheim by pushing that tag manually; patch numbering continues from there.

## Rules

- **Never commit secrets.** `.env` and `.env.local` are gitignored — keep it that way. The one exception is `.env.production`, which only holds the public `NEXT_PUBLIC_STRAPI_URL`. Never put tokens or keys in it, and never put a secret in any `NEXT_PUBLIC_*` variable (those are shipped to the browser).
- **Don't touch without asking first:** `.github/workflows/`, `Dockerfile`, `next.config.ts`, `.env.production`, `src/app/api/health/` (Kubernetes uses it as the liveness probe — if it breaks, the site goes down).
- **Don't add or upgrade dependencies** unless the PR is specifically about that. If you do, commit `package-lock.json` along with `package.json`.
- **Don't force-push to `main`, delete tags, or rewrite history.**
- **Content changes belong in Strapi, not in code.** Text, images, services, case studies, team members and testimonials are all edited in the CMS and appear on the site as soon as the entry is published, with no release. Only change code for layout, styling, behaviour, or new sections.
- AI agents: do not run `git push`, merge PRs, or create tags unless the person you're working with explicitly asks. Stay within the scope of the request; don't refactor unrelated code.

## Local setup

Requires Node 22.

```bash
npm ci
cp .env.example .env.local   # then fill in values — ask @ekenheim for a Strapi API token
npm run dev
```

The `STRAPI_API_URL` in `.env.example` is the in-cluster address and is not reachable from your machine. For local development set `STRAPI_API_URL`, `NEXT_PUBLIC_STRAPI_URL` and `STRAPI_PUBLIC_URL` all to the public Strapi URL (`https://strapi.ekenhome.se`). Be aware this is the **live CMS** — there is no separate dev instance, so anything you publish in its admin shows up on the production site. Without a valid token the site still runs, but every section falls back to empty/default content.

## Commands

```bash
npm run dev       # Dev server with Turbopack
npm run build     # Production build
npm run start     # Run production server
npm run lint      # ESLint check
npx tsc --noEmit  # Typecheck
```

## Architecture

### Data Flow

The home page (`src/app/page.tsx`) is a server component marked `force-dynamic` that fires 6 parallel `strapiGet()` calls on every request, then passes data down to presentational components. Each fetch is wrapped in `try/catch` with a fallback, because Strapi is a single pod and is sometimes unavailable for minutes — pages must render without CMS data. The other pages (`about`, `team`, `blog`, `industries/[slug]`) follow the same pattern.

All Strapi API calls happen server-side over the internal cluster URL. The browser never calls the Strapi API; it only loads images from the public Strapi hostname.

The contact form (`src/components/ContactSection.tsx`) is a client component that POSTs to this site's own `/api/contact` route, which appends a row to a Google Sheet. It does not use Strapi.

Strapi itself, its database, the secrets and the Kubernetes deployment live in a separate cluster repo (`ekenheim/home-ops-upgrade`). **Read `docs/strapi.md`** for how that side is set up: where env vars come from, how content types are created, token rotation, localisation, and rollout.

### Environment Variables

Two distinct Strapi URL variables exist by design:

| Variable | Where used | Purpose |
|---|---|---|
| `STRAPI_API_URL` | Server-side only | Internal cluster URL (avoids public network hop) |
| `STRAPI_API_TOKEN` | Server-side only | Bearer token for Strapi REST API |
| `NEXT_PUBLIC_STRAPI_URL` | Build-time baked into JS | Public Strapi URL for client-side use. Runtime value is ignored — changing it needs a rebuild |
| `STRAPI_PUBLIC_URL` | Server runtime | Media URL construction — default comes from the `ENV` line in `Dockerfile`, overridable in the k8s Deployment without rebuild |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Server-side only | JSON key for Google service account (Sheets API) |
| `GOOGLE_SHEET_ID` | Server-side only | Google Spreadsheet ID for contact form submissions |

`NEXT_PUBLIC_STRAPI_URL` is intentionally committed in `.env.production` because it's not a secret (it gets inlined into the browser bundle anyway).

### Strapi v5 Response Format

Strapi v5 uses a **flat response format** — no `attributes` wrapper. Types in `src/types/strapi.ts` reflect this. When adding new content types, fields come directly on the object, not under `.attributes`.

Media URLs from Strapi are relative paths — they must be resolved with `STRAPI_PUBLIC_URL` (the public hostname, never the internal `STRAPI_API_URL`) server-side. Each page has a small local `resolveUrl()` helper for this; see `src/app/page.tsx`.

Content types are localised (Strapi i18n), which is why `strapiGet()` takes a `locale`. Draft & publish is on: the API only returns published entries. Content types are created in the Strapi admin's Content-Type Builder, not in code — see `docs/strapi.md`.

The site must keep rendering when Strapi returns nothing for a section (empty list, missing media, null field). Treat every CMS field as possibly absent.

### Deployment

- Docker multi-stage build: `NEXT_PUBLIC_STRAPI_URL` is baked in at build time as a build ARG
- Output mode is `standalone` for minimal Docker image
- CI/CD: see "What happens after merge" above
- Kubernetes deployment (no docker-compose)
- `/api/health` route serves as the liveness/readiness probe

### Styling

Tailwind CSS v4 via PostCSS. Custom theme uses navy (`#0D1B2A` background) and amber accent colors defined as CSS variables in `src/app/globals.css`. Use the existing color palette (`navy-*`, `amber-*`) when adding UI.

### Animations

All sections use Framer Motion scroll-triggered animations. New sections should follow the same pattern as existing components (viewport-triggered `whileInView` with `initial`/`animate` variants).
