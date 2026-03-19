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

# Stage 3: Distroless production runtime
FROM gcr.io/distroless/cc-debian12 AS production
WORKDIR /app

# Copy bun binary from official image
COPY --from=oven/bun:1-slim /usr/local/bin/bun /usr/local/bin/bun

# Copy built output + production deps
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules

# Distroless runs as nonroot (uid 65534) by default
USER nonroot

# Runtime env vars
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://pandudpn.id

EXPOSE 3000

CMD ["/usr/local/bin/bun", "./build/index.js"]
