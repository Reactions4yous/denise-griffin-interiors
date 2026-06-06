# CLAUDE.md — Denise Griffin Interiors

Project context and working guide for Claude. Read this first.

## What we're building

A fast, secure marketing website for **Denise Griffin Interiors** — a
**residential interior designer** based in **Dade City, FL**, serving clients
in person within ~40 miles (Tampa, Wesley Chapel, Lutz, etc.). Built by Dmitry
as a real, paid client project ($1,000 fixed).

**The goal:** generate real, local, in-person design clients. Her old Wix site
(online-only, "e-design") failed. This site is repositioned around
**local + in-person residential interior design at $100/hour**, optimized for
local SEO + AEO (being the answer in Google AI / ChatGPT).

## Positioning (important)

- She is a **Residential Interior Designer**, NOT "stylist" or "e-design".
  Full-service: concept, space planning, sourcing, styling. She subcontracts
  technical plans on the rare occasion they're needed.
- Services: **Full-Service Interior Design**, **Furnishing & Styling**,
  **Design Consultation**. (E-Design was removed — do not reintroduce it.)
- Target areas are **higher-end only** (she's $100/hr): Dade City, Wesley
  Chapel, Lutz, Land O' Lakes, Odessa, Trinity, New Tampa, South Tampa.
- Her home address stays **private** — show "Dade City + 40-mile radius" only.

## Tech stack & why

- **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**.
- **Fully static** (SSG) — no backend, no database. A portfolio is a brochure;
  static pages on a CDN stay fast and never break under traffic. The only
  dynamic piece is the contact form API route.
- Next.js **16.2.7** (Turbopack default). React 19. Keep Next current — the
  dev overlay flags "outdated" whenever a newer release exists.

## Where everything lives (edit these, not the page code)

| To change…                         | Edit |
| ---------------------------------- | ---- |
| All text, services, projects, areas | `src/content/site.ts` |
| Brand colors & spacing (design tokens) | `src/app/globals.css` (`:root`) |
| Fonts | `src/app/layout.tsx` (next/font) |
| Photos / video | `public/images/` |
| Logo | `public/images/logo.png` + `logo-white.png` |

`src/content/site.ts` is the single source of truth for content:
`site` (brand/contact), `home`, `services`, `projects`, `beforeAfters`,
`about`, and `local` (areas — each drives an SEO page).

## Key components

- `Frame` — renders project images. Per-image `ready` flag; shows a tasteful
  gradient placeholder until a real photo exists (`IMAGES_READY` global default).
- `HeroVideo` — autoplay/muted/looping hero (Studio McGee style), poster
  fallback, honors reduced-motion. Home hero uses `home.heroVideo`.
- `Logo` — real "dg" wordmark; `logo.png` (black) for light bg, `logo-white.png`
  for over the dark hero. `LOGO_READY` flag. Nav auto-picks white over the hero.
- `Reveal` — scroll fade-up (IntersectionObserver).
- `StructuredData` — LocalBusiness JSON-LD (areas, $100/hr, geo).

## Local SEO / AEO

- 8 area pages at `/interior-design/[city]` with **unique** answer-first copy
  + per-page FAQ schema. Index at `/interior-design`. Data in `local.areas`.
- Keep area copy genuinely unique per city (no duplicate/doorway pages).
- Answer-first: open sections with a tight 40–60 word answer engines can lift.
- The **Google Business Profile** is the real local engine (~32% of local
  ranking). The site supports it; it does not replace it.

## Brand

- Palette (live): warm mauve main (`#f5efed`) + maroon accent (`#6f3038`) +
  white. Backup "Studio McGee brown" palette is commented in `globals.css`.
- Her real photos read warmer (greige + terracotta + wood + brass + green).
  Maroon still harmonizes; switch palettes via the one `:root` block if needed.
- Inspiration analysis (Danielle Rose, Studio McGee) is in `docs/inspiration.md`.

## Run / build / deploy

```bash
npm install
npm run dev      # http://localhost:3005  (fresh port — avoids CRM:3000 / funnel:3001, AND
                 #                          sidesteps the old poisoned browser cache on :3002)
npm run build
```

If the dev server shows a hydration error or "stale" UI after edits:
**stop it (Ctrl+C), `rm -rf .next`, `npm run dev`, then hard-refresh (Cmd+Shift+R).**
Never use `pkill` — it kills Dmitry's other local servers too.

**ROOT CAUSE of the recurring "stale UI / hydration mismatch" (fixed 2026-06-05):**
`next.config.mjs` set `Cache-Control: immutable` on `/_next/static/:path*`. In dev
that made the browser cache OLD JS bundles, so hydration mismatches (client = old
code, server = new code) survived even `rm -rf .next`. Now: production gets the long
immutable cache header; **dev actively sends `Cache-Control: no-store` on every route**
so a normal (non-incognito) browser can never serve a stale bundle. If this regresses,
check that `headers()` gate first.

**ONE-TIME flush (only needed once, on a browser that already cached the old
immutable bundles):** open localhost:3002, open DevTools, right-click the reload
button → "Empty Cache and Hard Reload". After that, the dev no-store header keeps
normal-window reloads clean forever — no incognito needed.

Contact form: set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
in `.env.local`. Booking: `NEXT_PUBLIC_CALENDLY_URL`. See `.env.example`.

Deploy: push to Git → import at vercel.com → add env vars → add domain.

## Status (as of June 2026)

Done: full site, brand + real logo, her real photos + video hero, palette,
repositioning to residential interior design, 8 local-SEO area pages, slim nav,
before/after, Next 16 upgrade.

Pending / next: Denise's **story** for the About page (still generic), her
**portrait** photo, confirm her **Google Business Profile**, wire **Resend** +
**Calendly** keys, buy the **domain**. Later: ManyChat on Instagram for organic
funneling.

## Conventions

- Keep it static. Don't add a backend/DB unless truly required.
- Content goes in `site.ts`, not hard-coded in pages.
- Every referenced image must exist (or use the placeholder `ready={false}`).
- Verify changes with `npx tsc --noEmit` and `next build` before declaring done.
