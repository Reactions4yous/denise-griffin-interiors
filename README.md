# Denise — Interior Stylist Website

A fast, secure marketing site built with **Next.js (App Router) + TypeScript + Tailwind CSS**, designed to deploy on **Vercel**.

It's a fully static site (no backend, no database) — every page is pre-rendered and served from Vercel's global CDN, so it stays fast and stable even under heavy traffic. The only dynamic piece is the contact form, which sends an email.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # run the production build locally
```

---

## Where to edit things

| You want to change…              | Edit this file                          |
| -------------------------------- | --------------------------------------- |
| Any text, services, projects, bio | `src/content/site.ts`                  |
| Brand colors & spacing           | `src/app/globals.css` (the `:root` tokens) |
| Fonts                            | `src/app/layout.tsx`                    |
| Photos                           | `public/images/` (see its README)       |

**You almost never need to touch the page code** — content lives in `src/content/site.ts`.

---

## Adding Denise's photos

1. Drop the images into `public/images/` (filenames listed in `public/images/README.md`).
2. In `src/components/Frame.tsx`, set `export const IMAGES_READY = true;`.
3. Done — placeholders become real, auto-optimized images.

---

## Contact form (email)

The form posts to `/api/contact`, which emails Denise via [Resend](https://resend.com) (free tier is plenty).

1. Create a Resend account and an API key.
2. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (Denise's inbox)
   - `CONTACT_FROM_EMAIL` (a verified sender on your domain)

Until those are set, submissions are logged to the server console and the form still "succeeds" — so you can test the flow before wiring email.

## Booking link

Set `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` to Denise's Calendly link and a
"Book a free intro call" button appears in the contact section automatically.

---

## Deploying to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import the repo at <https://vercel.com/new>.
3. Add the environment variables from `.env.example` in **Project → Settings → Environment Variables**.
4. Deploy. Add the custom domain once it's purchased (**Settings → Domains**).

Vercel auto-detects Next.js — no extra config needed.

---

## What's already handled

- **Performance** — static generation + CDN caching, self-hosted fonts (no layout shift), modern image formats (AVIF/WebP), long-cache immutable assets.
- **SEO** — per-page metadata, OpenGraph/Twitter cards, `sitemap.xml`, `robots.txt`, JSON-LD structured data.
- **Security** — HSTS, anti-clickjacking, no-sniff, referrer & permissions policies (in `next.config.mjs`); form input validation + honeypot spam trap.
- **Accessibility** — semantic HTML, keyboard-friendly nav, reduced-motion support, alt text.
- **Responsive** — mobile menu, fluid type and spacing.

---

## Tech

Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · deploys on Vercel.
