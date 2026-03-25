# Stage 1: Build SvelteKit app
FROM oven/bun:1-slim AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY
ARG PUBLIC_SITE_URL
ARG SUPABASE_SERVICE_KEY

ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV SUPABASE_SERVICE_KEY=$SUPABASE_SERVICE_KEY

RUN bun run build

# Stage 2: Install production dependencies
FROM oven/bun:1-slim AS prod-deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production \
    && rm -rf /root/.bun/install/cache \
    && find node_modules -type f -name "*.md" -delete \
    && find node_modules -type f -name "*.ts" -delete \
    && find node_modules -type d -name "test" -exec rm -rf {} + 2>/dev/null || true \
    && find node_modules -type d -name "tests" -exec rm -rf {} + 2>/dev/null || true \
    && find node_modules -type d -name ".github" -exec rm -rf {} + 2>/dev/null || true

# Stage 3: Runtime with Bun serving adapter-node output
FROM oven/bun:1-slim AS production
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://pandudpn.id

EXPOSE 3000
CMD ["bun", "./build/index.js"]
