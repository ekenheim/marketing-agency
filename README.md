# Digitomara — Marketing Agency Frontend

Next.js 16 marketing site for Digitomara, a data-driven digital agency targeting Moroccan brands. All content is fetched at request time from a headless Strapi v5 CMS.

## Architecture

```
Browser → Next.js (server components, force-dynamic) → Strapi v5 REST API (internal cluster URL)
   │            │
   │            └─ /api/contact → Google Sheets (contact form)
   └─ images only → public Strapi hostname (/uploads/...)
```

Strapi, its database, the secrets and the Kubernetes deployment live in a separate cluster repo. See [`docs/strapi.md`](docs/strapi.md) for how that side is set up, and [`AGENTS.md`](AGENTS.md) for how to contribute.

The home page (`src/app/page.tsx`) is a single **async server component** marked `force-dynamic`. On every request it fires six parallel `strapiGet` calls to populate:

| Section | Strapi endpoint |
|---|---|
| Hero | `/api/hero?populate=*` |
| Services | `/api/services?sort=order:asc&populate=*` |
| Case Studies | `/api/case-studies?filters[featured][$eq]=true&populate=*` |
| Client brands | `/api/client-brands?sort=order:asc&populate=*` |
| Testimonials | `/api/testimonials?filters[featured][$eq]=true&populate=*` |
| Global (site config) | `/api/global?populate=*` |

Each fetch is wrapped in `try/catch` with a fallback so the page still renders when Strapi is unavailable.

The `ContactSection` is a **client component** — on submit it POSTs the form payload to this site's own `/api/contact` route, which appends a row to a Google Sheet. It does not use Strapi. Form validation uses `react-hook-form` + `zod`.

## Environment Variables

| Variable | Where it's read | Purpose |
|---|---|---|
| `STRAPI_API_URL` | Server only (SSR) | Internal Strapi base URL used for server-side data fetches (e.g. `http://strapi-cms.development.svc.cluster.local:1337`) |
| `STRAPI_API_TOKEN` | Server only (SSR) | Read-only Strapi API token, injected as a `Bearer` header on every `strapiGet` call |
| `NEXT_PUBLIC_STRAPI_URL` | Build-time + browser | Public Strapi URL, baked into the JS bundle at build time. A value set at runtime has no effect; changing it needs a rebuild |
| `STRAPI_PUBLIC_URL` | Server only (runtime) | Runtime override for constructing absolute media URLs in server components. Unlike `NEXT_PUBLIC_STRAPI_URL`, this is read from `process.env` at request time so Kubernetes can override it without rebuilding. The default comes from the `ENV` line in the `Dockerfile` |
| `GOOGLE_SHEET_ID` | Server only | Spreadsheet that contact form submissions are appended to |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Server only | JSON key of the Google service account used for the Sheets API |

> **Why two Strapi URL variables?** `NEXT_PUBLIC_*` values are inlined at `npm run build` time and cannot be changed at runtime. `STRAPI_PUBLIC_URL` (no `NEXT_PUBLIC_` prefix) is a plain env var read by the server component on each request, so the Kubernetes pod can set it freely without a new Docker build.

Copy `.env.example` to `.env.local` to develop locally:

```bash
cp .env.example .env.local
```

## Local Development

```bash
npm install
npm run dev        # starts on http://localhost:3000 with Turbopack
```

Requires a running Strapi v5 instance. Point `STRAPI_API_URL` and `NEXT_PUBLIC_STRAPI_URL` at it in `.env.local`.

## Production Build & Docker

The app is packaged as a **standalone Next.js output** (`output: "standalone"` in `next.config.ts`) and served via a minimal two-stage Docker image:

```bash
docker build \
  --build-arg NEXT_PUBLIC_STRAPI_URL=https://strapi.ekenhome.se \
  -t digitomara-frontend .
docker run -p 3000:3000 \
  -e STRAPI_API_URL=http://strapi-cms.development.svc.cluster.local:1337 \
  -e STRAPI_API_TOKEN=<token> \
  -e STRAPI_PUBLIC_URL=https://strapi.ekenhome.se \
  digitomara-frontend
```

The `NEXT_PUBLIC_STRAPI_URL` build-arg is committed in `.env.production` so CI picks it up automatically without needing a secret.

## Releases

Every push to `main` is released automatically: `.github/workflows/deploy.yml` bumps the patch version, pushes `ghcr.io/ekenheim/marketing-agency-website:vX.Y.Z` and creates the git tag. Renovate in the cluster repo then picks up the new tag and Flux rolls it out, typically within a few hours. Pull requests are checked by `.github/workflows/ci.yml` (lint, typecheck, build).

## API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/health` | `GET` | Returns `{ status: "ok" }` — used as a Kubernetes liveness/readiness probe |
| `/api/contact` | `POST` | Appends a contact form submission to the Google Sheet |

## Key Dependencies

- **Next.js 16** — App Router, server components, standalone output
- **React 19** — concurrent rendering
- **Tailwind CSS v4** — utility styling via PostCSS
- **Framer Motion** — scroll-triggered and entrance animations across all sections
- **react-hook-form + zod** — contact form validation
- **lucide-react** — icon set

## Analytics

A self-hosted [Rybbit](https://rybbit.io) analytics snippet is loaded via `next/script` with `strategy="afterInteractive"` from `https://rybbit.ekenhome.se`.

## Content Types (Strapi v5)

Strapi v5 returns **flat responses** — there is no `attributes` wrapper. The TypeScript types in `src/types/strapi.ts` reflect this directly. The main content types are:

- `Hero` (single type) — headline, sub-headline, CTAs, background media, stats
- `Service` (collection) — title, slug, icon, description, features, sort order
- `CaseStudy` (collection) — client, challenge, results metrics, cover image, featured flag
- `TeamMember` (collection) — name, role, bio, photo, LinkedIn, sort order
- `Testimonial` (collection) — quote, author, avatar, featured flag
- `Global` (single type) — site name, logo, contact info, social links, trust badges
- `ClientBrand` (collection) — client logos shown on the home page

Content types are localised (Strapi i18n) and use draft & publish — the API only returns published entries. They are created in the Strapi admin's Content-Type Builder; see [`docs/strapi.md`](docs/strapi.md).
