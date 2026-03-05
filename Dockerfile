FROM node:22-alpine AS build
RUN apk add --no-cache libc6-compat

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_STRAPI_URL=https://strapi.ekenhome.se
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}

RUN npm run build

# Production runtime
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Server-side runtime env var for constructing absolute Strapi media URLs.
# Unlike NEXT_PUBLIC_ vars (which are inlined at build time and lost if the
# build-arg is empty), this is read from process.env at request time by the
# server component. K8s can override by setting STRAPI_PUBLIC_URL in the pod.
ENV STRAPI_PUBLIC_URL=https://strapi.ekenhome.se

CMD ["node", "server.js"]
