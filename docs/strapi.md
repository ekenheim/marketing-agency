# How this site connects to Strapi

This repo is only the Next.js frontend. Strapi, its database, the secrets and the
deployment of this site all live in the cluster repo, `ekenheim/home-ops-upgrade`, under
`kubernetes/apps/development/strapi` and `kubernetes/apps/development/marketing-agency`.
This page describes that other half, as verified against the live cluster on 2026-09-19.

## The picture

```
browser ──https──> envoy-external gateway ──> marketing-agency-website (2 pods, :3000)
   │                                                   │
   │ images only                                       │ STRAPI_API_URL + Bearer token
   │                                                   ▼
   └──https──> strapi.ekenhome.se ──> envoy ──> strapi-cms (1 pod, :1337)
                                                       │
                                     Postgres (content rows)   PVC strapi-data (schemas, uploads)
```

Both apps run in the `development` namespace. Flux will not deploy the website until
Strapi is healthy, because the website Kustomization depends on the Strapi one.

## Two paths into Strapi

| Path | Who uses it | Address |
|---|---|---|
| Internal | Server components, through `strapiGet()` in `src/lib/strapi.ts` | `http://strapi-cms.development.svc.cluster.local:1337` |
| Public | The visitor's browser, for media files only | `https://strapi.ekenhome.se` |

Content fetches never leave the cluster. They use plain HTTP to the Kubernetes Service
and skip the gateway, DNS and TLS. The browser never calls the Strapi API. It only
loads images from `/uploads/...` on the public hostname, which is why media URLs have
to be rewritten with the public address and not the internal one.

In code, each page has a small local `resolveUrl()` helper that prefixes relative media
paths with `process.env.STRAPI_PUBLIC_URL`. (`strapiMedia()` in `src/lib/strapi.ts` does
the same with the build-time `NEXT_PUBLIC_STRAPI_URL`, but nothing uses it currently.)

## Environment variables the cluster provides

| Variable | Value in the cluster | Source |
|---|---|---|
| `STRAPI_API_URL` | the internal Service URL above | plain value in the Deployment |
| `STRAPI_API_TOKEN` | read-only Strapi API token | Bitwarden item `marketing-agency-strapi`, synced by External Secrets |
| `NEXT_PUBLIC_STRAPI_URL` | the public Strapi URL | plain value in the Deployment |
| `STRAPI_PUBLIC_URL` | the public Strapi URL | **not set by the cluster**, it comes from the `ENV` line in this repo's `Dockerfile` |
| `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY` | contact form target | Bitwarden item `marketing-agency-google` |

Things that follow from this:

- `NEXT_PUBLIC_STRAPI_URL` is inlined at build time. The value the cluster sets at
  runtime has no effect on client code. Changing the public hostname means a rebuild.
- `STRAPI_PUBLIC_URL` is what the pages actually use for media. To change it without a
  rebuild, add it to the website Deployment in the cluster repo.
- Both secrets are mounted as optional. If the token is missing the pod still starts,
  and `strapiGet()` sends `Bearer undefined`.
- Secrets are read at pod start. After rotating the token in Bitwarden, the pods need a
  restart to pick it up.

## Rotating the API token

1. In the Strapi admin, go to Settings, API Tokens, and create a read-only token.
2. Put it in the Bitwarden Secrets Manager item `marketing-agency-strapi`, field `STRAPI_API_TOKEN`.
3. External Secrets syncs within 15 minutes. Then restart the website Deployment.

## What Strapi is, on the cluster side

- **No custom image.** Strapi runs from a generic bootstrap image
  (`ghcr.io/ekenheim/strapi-bootstrap`). On first start an init container copies a vanilla
  Strapi v5 project onto the `strapi-data` volume at `/srv/app`. There is no Strapi source repo.
- **Development mode.** It runs `npm run develop` with `NODE_ENV=development`, so the
  Content-Type Builder is enabled in the admin at `/admin` on the public Strapi hostname.
- **Content types live only on the volume.** They were made in the Content-Type Builder
  and exist as files under `/srv/app/src/api`. They are not in git anywhere.
  Current types: `global`, `hero`, `service`, `case-study`, `client-brand`,
  `team-member`, `testimonial`, `contact`, and `arm`.
- **Content rows live in Postgres.** Strapi connects to the Crunchy Postgres primary
  directly, not through PgBouncer, because its migrations need session mode.
- **Uploads live on the volume**, under `/srv/app/public/uploads`.
- **Backups.** Postgres is backed up. The volume is not. Losing the volume loses every
  schema and every uploaded image, while the database rows survive.
- **Single replica, Recreate strategy.** Any Strapi restart is a short outage. A cold
  start rebuilds the admin and can take several minutes. During that window every
  `strapiGet()` call fails or hits its 5 second timeout, so pages must render without CMS data.

## Localisation

The content types are localised with the Strapi i18n plugin, which is why `strapiGet()`
takes a `locale`. Translations are produced inside Strapi by `strapi-plugin-translate`
with the DeepL free API. The init container reinstalls that plugin and overwrites
`config/plugins.ts` from the image on every start, so plugin config edits made on the
volume do not persist.

## The `arm` content type

`arm` is the one schema that is managed from git. It is a ConfigMap in the cluster repo
that the init container copies onto the volume if it is missing. It models variants for
Bayesian bandit experiments with fields `name`, `content_ref`, `experiment_id`,
`content_type` and `is_active`. This site does not read it yet, and `/api/arms`
returns 404 today, so the type is not being served.

## Adding or changing a content type

1. Build it in the Content-Type Builder in the Strapi admin. Strapi restarts itself
   (a short outage for the live site's content, see above).
2. In Settings, API Tokens, make sure the read-only token covers the new type.
3. Add the matching type in `src/types/strapi.ts`. Strapi v5 responses are flat, with no `attributes` wrapper.
4. Publish the entries. Draft and publish is on, and the API only returns published entries.

## Editable team-page heading

Add these optional, localised fields to the existing **Global** single type in
Content-Type Builder, then save the schema:

| API field | Strapi field type | Purpose |
|---|---|---|
| `teamSectionLabel` | Text (short) | Small label above the heading |
| `teamSectionTitle` | Text (short) | Main heading text |
| `teamSectionTitleAccent` | Text (short) | Optional highlighted words after the heading |
| `teamSectionSubtitle` | Text (long) | Text below the heading |

Edit these in **Content Manager → Global**, choose the language, then Save and
Publish. A custom title with no accent text replaces the entire old heading.
Missing or null label/subtitle fields use the existing translated defaults; an
explicit empty string hides them. A missing, null, or blank main title falls back
to the existing translated title. The page also keeps rendering if Strapi is
unavailable. The frontend change must be deployed before live edits take effect.

## Homepage introduction

The homepage reads the optional, localised single type `introduction` from
`/api/introduction?populate=*&locale=en` (or the visitor's selected locale).
It appears between the client logos and services. To enable it:

1. In Content-Type Builder, create a **Single Type** named **Introduction** with
   singular API ID `introduction`. Enable internationalisation and Draft & Publish.
2. Add the fields below, using the API names exactly as written. Enable localisation
   for the text and image fields so each language can be edited independently.
3. Save the schema and allow Strapi to restart. Ensure the website's API token has
   `find` access to Introduction. Public write permissions are not needed.
4. In Content Manager → Introduction, add your text and portrait, then publish each
   locale you want to show. Subsequent content edits only require Save and Publish;
   they do not require a website release.

| API field | Strapi field type | Purpose |
|---|---|---|
| `enabled` | Boolean, default true | Turn the section on or off |
| `label` | Text (short) | Small heading above the title |
| `headline` | Text (short), required | Main introduction heading |
| `introduction` | Text (long) | Your introduction; line breaks are preserved |
| `whyTitle` | Text (short) | Heading for why Digitomara is a good fit |
| `whyText` | Text (long) | Your approach and value for growing brands |
| `name` | Text (short) | Your name beneath the portrait |
| `role` | Text (short) | Your role beneath the portrait |
| `image` | Media (single, images only) | Portrait; a 4:5 crop works best |
| `contactLabel` | Text (short) | Optional link text pointing to the contact form |

Use plain long text, not a Rich Text field, for `introduction` and `whyText`.
Set the image's alternative text in the Media Library to describe the portrait.
Leave `contactLabel` empty to omit the link. The heading and at least one of
`introduction` or `whyText` must contain text to display the section. Without an
image, the layout becomes one text column. Missing types, unpublished entries,
disabled content, and failed CMS requests hide the section without breaking the page.

The initial frontend change requires the usual reviewed deployment before this
section appears on the live website.

## The contact form does not use Strapi

`ContactSection` posts to this site's own `/api/contact` route
(`src/app/api/contact/route.ts`), which appends a row to a Google Sheet. Strapi has a
`contact` collection left over from the earlier design, and `CORS_ORIGIN` is set on the
Strapi pod for the same reason. Nothing in this site depends on either.

## Releases and rollout

Every push to `main` here publishes `ghcr.io/ekenheim/marketing-agency-website:vX.Y.Z`
(see `.github/workflows/deploy.yml`). Renovate in the cluster repo picks up the new tag,
opens a PR and auto-merges it once CI passes. Flux then rolls the two website pods.
Expect a delay of up to a few hours between the image being published and it going live,
set by Renovate's schedule. The image is pulled with the `ghcr-pull` secret in the
`development` namespace.

Health: the pods are probed on `/api/health`, and the public site is monitored from
outside the cluster by Gatus.
