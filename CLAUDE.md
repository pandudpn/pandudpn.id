# pandudpn.id — Project Context

## Overview

Personal website for **Pandu Dwi Putra Nugroho** — Senior Backend Engineer.
Design theme: **Terminal Noir × Editorial** (dark-first with light mode toggle).

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 (Runes)
- **UI Library**: shadcn-svelte (Tailwind CSS v4 underneath)
- **State**: Svelte 5 Runes ($state, $derived, $effect) + @tanstack/svelte-query for API data
- **Forms**: Zod validation + plain fetch (contact form)
- **Theme**: mode-watcher (dark/light/system)
- **Icons**: lucide-svelte (NO emoji icons ever)
- **Fonts**: Plus Jakarta Sans (heading+body, Google Fonts) + JetBrains Mono (code, Google Fonts)
- **Deployment**: Docker + Bun via @sveltejs/adapter-node
- **Database**: Supabase (visitor tracking, contact form)

## Design System (Terminal Noir)

### Dark Mode (default)

- Background: #0A0A0B (Obsidian)
- Card/Elevated: #131316 (Charcoal)
- Border: #212126 (Graphite)
- Body text: #DBDBE0 (Silver)
- Heading text: #F5F5F2 (Snow)
- Primary accent: #00F0FF (Electric Cyan)
- Secondary accent: #FFB347 (Warm Amber)

### Light Mode

- Background: #FAF9F6 (Warm cream)
- Primary: #0094A3 (Darker cyan)
- Secondary: #C47F1A (Darker amber)

### CSS Utilities

- `.glass-card` — Glassmorphism card (bg-white/3% + backdrop-blur)
- `.glass-glow` — Hover glow effect (cyan box-shadow)
- `.text-gradient-primary` — Cyan-to-amber gradient text

## Project Structure

```
src/
├── app.html                    # HTML template (Google Fonts, OG tags)
├── app.css                     # Global styles, CSS vars, Terminal Noir theme
├── app.d.ts                    # TypeScript declarations
├── hooks.server.ts             # Security headers
│
├── lib/
│   ├── utils.ts                # cn() helper (clsx + twMerge)
│   ├── components/
│   │   ├── ui/                 # shadcn-svelte components (auto-generated, don't edit)
│   │   ├── custom/             # Custom components (edit freely)
│   │   │   ├── TextScramble.svelte
│   │   │   ├── TerminalText.svelte
│   │   │   ├── MagneticButton.svelte
│   │   │   ├── GrainOverlay.svelte
│   │   │   ├── GlassCard.svelte
│   │   │   ├── SectionHeading.svelte
│   │   │   ├── ScrollReveal.svelte
│   │   │   ├── AnimatedCounter.svelte
│   │   │   ├── TechCategoryGrid.svelte   # Card grid (all devices)
│   │   │   ├── ExperienceCard.svelte
│   │   │   ├── BentoGrid.svelte
│   │   │   ├── AvailabilityBadge.svelte
│   │   │   ├── CursorGlow.svelte
│   │   │   └── ThemeToggle.svelte
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero.svelte
│   │   │   ├── About.svelte
│   │   │   ├── TechStack.svelte          # Categorized skill grid
│   │   │   ├── Experience.svelte         # Vertical 2-column timeline
│   │   │   ├── Projects.svelte
│   │   │   └── Contact.svelte
│   │   ├── Navigation.svelte
│   │   └── Footer.svelte
│   │
│   ├── actions/                # Svelte actions (plain .ts — NO RUNES here)
│   │   ├── inview.ts           # IntersectionObserver
│   │   ├── magnetic.ts         # Magnetic cursor hover
│   │   ├── scramble.ts         # Text scramble effect
│   │   └── parallax.ts         # Scroll parallax
│   │
│   ├── stores/                 # .svelte.ts files (runes OK here)
│   │   ├── activeSection.svelte.ts
│   │   └── theme.ts
│   │
│   ├── data/                   # Static content (edit for content changes)
│   │   ├── personal.ts         # Name, bio, stats, social links
│   │   ├── experience.ts       # Career timeline
│   │   ├── projects.ts         # All projects
│   │   ├── skills.ts           # Tech stack with proficiency
│   │   └── navigation.ts       # Nav items
│   │
│   ├── queries/                # TanStack Query definitions
│   │   ├── github.ts           # GitHub stars
│   │   └── visitor.ts          # Visitor count + tracking
│   │
│   ├── server/                 # Server-only
│   │   └── supabase.ts
│   │
│   └── types/                  # TypeScript interfaces
│       ├── index.ts
│       ├── project.ts
│       ├── experience.ts
│       └── skill.ts
│
└── routes/
    ├── +layout.svelte          # Root: QueryClientProvider, ModeWatcher, visitor tracking
    ├── +layout.ts              # QueryClient init (enabled: browser)
    ├── +page.svelte            # All sections composed
    ├── +error.svelte           # Terminal-style error page
    └── api/
        ├── contact/+server.ts  # POST: contact form
        └── visitor/+server.ts  # GET: count, POST: track
```

## Critical Rules

### Svelte 5 Syntax

- ALWAYS use: `$props()`, `$state()`, `$derived()`, `$effect()`
- ALWAYS use `{@render children()}` — NEVER `<slot />`
- NEVER use deprecated Svelte 4 syntax

### Runes File Rules

- `.ts` files (actions/, queries/, data/, types/) → **NO runes** ($state, $derived, $effect forbidden)
- `.svelte.ts` files (stores/) → **Runes OK**
- `.svelte` files → **Runes OK**

### Styling

- Use shadcn CSS variable classes: `bg-background`, `text-foreground`, `text-primary`, `bg-card`, `text-muted-foreground`, `border-border`
- Use `glass-card` and `glass-glow` utility classes for custom cards
- Font classes: headings auto-inherit from CSS vars, use `font-mono` for code/terminal elements
- Responsive: mobile-first with `md:` and `lg:` breakpoints

### Icons

- **ALWAYS** use Lucide SVG icons from `lucide-svelte`
- **NEVER** use emoji as icons (👨‍💻, 🚀, ⚡, etc.)

### Environment Variables

- `PUBLIC_SUPABASE_URL` — client-accessible
- `PUBLIC_SUPABASE_ANON_KEY` — client-accessible
- `SUPABASE_SERVICE_KEY` — server-only (no PUBLIC\_ prefix)
- `PUBLIC_SITE_URL` — client-accessible

## Commands

```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run preview      # Preview production build
bun run check        # TypeScript check
bun run lint         # ESLint + Prettier check
bun run format       # Format code
bun x playwright test  # Run E2E tests

docker compose up -d    # Start production container
docker compose down     # Stop container
docker compose logs -f  # View logs
```

## Sections (single page)

1. **Hero** — Full-screen, text scramble, terminal typing, stats
2. **About** (#about) — Editorial layout, profile, metrics
3. **Tech Stack** (#tech-stack) — Categorized skill grid
4. **Experience** (#experience) — Vertical 2-column timeline (Brittany Chiang style)
5. **Projects** (#projects) — Bento grid, filter tabs, GitHub stars
6. **Contact** (#contact) — Info + form, Zod validation
7. **Footer** — Terminal style, visitor count

## Current Status

- [x] Sprint 1: Foundation (scaffold, theme, layout, data, actions, shadcn)
- [x] Sprint 2: Navigation + Hero + About
- [x] Sprint 3: Tech Stack (dual view) + Experience (vertical timeline)
- [x] Sprint 4: Projects + Contact + Footer + API routes
- [x] Sprint 5: Polish + Accessibility + Playwright Test + Deploy prep
