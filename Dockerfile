# Stage 1: Install dependencies
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock* package-lock.json* ./
RUN bun install --frozen-lockfile 2>/dev/null || bun install

# Stage 2: Build the application
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for env vars needed at build time
ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY
ARG PUBLIC_SITE_URL

ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL

RUN bun run build

# Stage 3: Production runtime
FROM oven/bun:1-slim AS production
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 sveltekit && \
    adduser --system --uid 1001 sveltekit

# Copy built output
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Install only production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Set ownership
RUN chown -R sveltekit:sveltekit /app

USER sveltekit

# Runtime env vars
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://pandudpn.id

EXPOSE 3000

# Run with Bun
CMD ["bun", "./build/index.js"]
