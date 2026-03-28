# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Digitomara** — a Next.js 16 marketing agency frontend backed by a Strapi v5 headless CMS. Single-page app with server components that fetch content on every request (`force-dynamic`).

## Commands

```bash
npm run dev       # Dev server with Turbopack
npm run build     # Production build
npm run start     # Run production server
npm run lint      # ESLint check
```

There are no automated tests.

## Architecture

### Data Flow

The home page (`src/app/page.tsx`) is a server component marked `force-dynamic` that fires 6 parallel `strapiGet()` calls on every request, then passes data down to presentational components. The contact form (`src/components/ContactSection.tsx`) is the only client component — it POSTs directly from the browser to Strapi.

### Environment Variables

Two distinct Strapi URL variables exist by design:

| Variable | Where used | Purpose |
|---|---|---|
| `STRAPI_API_URL` | Server-side only | Internal cluster URL (avoids public network hop) |
| `STRAPI_API_TOKEN` | Server-side only | Bearer token for Strapi REST API |
| `NEXT_PUBLIC_STRAPI_URL` | Build-time baked into JS | Public URL for contact form POST and client-side use |
| `STRAPI_PUBLIC_URL` | Server runtime | Media URL construction — overridable without rebuild |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Server-side only | JSON key for Google service account (Sheets API) |
| `GOOGLE_SHEET_ID` | Server-side only | Google Spreadsheet ID for contact form submissions |

`NEXT_PUBLIC_STRAPI_URL` is intentionally committed in `.env.production` because it's not a secret (it gets inlined into the browser bundle anyway).

### Strapi v5 Response Format

Strapi v5 uses a **flat response format** — no `attributes` wrapper. Types in `src/types/strapi.ts` reflect this. When adding new content types, fields come directly on the object, not under `.attributes`.

Media URLs from Strapi are relative paths — they must be resolved with `STRAPI_PUBLIC_URL` server-side. See `src/lib/strapi.ts` for the `resolveMediaUrl()` helper.

### Deployment

- Docker multi-stage build: `NEXT_PUBLIC_STRAPI_URL` is baked in at build time as a build ARG
- Output mode is `standalone` for minimal Docker image
- CI/CD: GitHub Actions builds and pushes to GHCR on `v*` git tags
- Kubernetes deployment (no docker-compose)
- `/api/health` route serves as the liveness/readiness probe

### Styling

Tailwind CSS v4 via PostCSS. Custom theme uses navy (`#0D1B2A` background) and amber accent colors defined as CSS variables in `src/app/globals.css`. Use the existing color palette (`navy-*`, `amber-*`) when adding UI.

### Animations

All sections use Framer Motion scroll-triggered animations. New sections should follow the same pattern as existing components (viewport-triggered `whileInView` with `initial`/`animate` variants).
