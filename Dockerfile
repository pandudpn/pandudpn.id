# Stage 1: Install ALL dependencies (for build)
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 1b: Production dependencies only
FROM oven/bun:1 AS prod-deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Stage 2: Build the application
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for env vars needed at build time
ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY
ARG PUBLIC_SITE_URL
ARG SUPABASE_SERVICE_KEY

ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV SUPABASE_SERVICE_KEY=$SUPABASE_SERVICE_KEY

RUN bun run build

# Stage 3: Production runtime (minimal)
FROM oven/bun:1-slim AS production
WORKDIR /app

# Copy built output + production deps only (use --chown to avoid extra layer)
COPY --from=builder --chown=1001:1001 /app/build ./build
COPY --from=builder --chown=1001:1001 /app/package.json ./
COPY --from=prod-deps --chown=1001:1001 /app/node_modules ./node_modules

# Use built-in bun user (uid 1000) instead of creating new user
USER bun

# Runtime env vars
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://pandudpn.id

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=10s \
  CMD bun -e "fetch('http://localhost:3000').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["bun", "./build/index.js"]
