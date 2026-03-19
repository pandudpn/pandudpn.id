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

# Stage 2: Compile to single executable
FROM oven/bun:1-slim AS compiler
WORKDIR /app

# Install production deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production \
    && rm -rf /root/.bun/install/cache

# Copy build output
COPY --from=builder /app/build ./build

# Compile to single executable
RUN bun build ./build/index.js \
    --compile \
    --outfile server \
    --minify \
    --target=bun-linux-x64

# Stage 3: Minimal production image
FROM gcr.io/distroless/static-debian12:latest AS production
WORKDIR /app

COPY --from=compiler /app/server /app/server
COPY --from=builder /app/build /app/build

USER nonroot
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://pandudpn.id

EXPOSE 3000
CMD ["/app/server"]
