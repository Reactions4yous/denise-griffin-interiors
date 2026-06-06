# Inspiration & Design Notes

Banked references for Denise's site. Add new inspiration sites here with her
own words about what she likes.

---

## 1. Danielle Rose Design Co. — https://www.daniellerosedesignco.com/

**Denise's words:** "I like the simplicity of this one but the other one is my
favorite." *(The favorite site is still to be provided.)*

**Platform:** Wix, template by IDCO Studio (a studio that builds sites
specifically for interior designers — so this is a genre-defining example).

**Brand color spotted:** deep olive-brown `#3A3319` over warm cream.

### Page structure (single-column scroll)
1. Minimal centered-logo nav: Portfolio · About · Services · Press · Shop · Blog · Contact
2. **Hero** — large image + headline ("Elevated Eclectic Interior Design") + short warm paragraph + ONE CTA ("Browse Work")
3. **Meet Danielle** — short founder story + "Learn More"
4. **As Featured In** — press logos (social proof)
5. **Design Services** — simple bulleted list + "Learn More"
6. **Testimonial** — one large client quote (carousel of 5)
7. **Featured Work** — single project spotlight ("Roslyn Historic") + "Tour the Project"
8. **Instagram** feed
9. Footer — repeated nav + Instagram + privacy/terms

### Why "simplicity" works here (the principle to copy)
- The design *recedes* so the rooms are the hero — few nav items, heavy
  whitespace, ONE call-to-action per section, oversized photography, minimal text.
- The section order is a **trust staircase**: Beautiful? → Who are you? →
  Can I trust you (press + testimonial)? → What do you do? → See one in full →
  Contact. Each section answers the visitor's next question.
- Philosophy: minimalism = *deference*. A quiet site silently promises "I'll
  make YOUR home the star, not my website." The medium proves the message.

### What to copy vs. adapt for Denise
- **Copy:** the restraint, the one-CTA-per-section rhythm, big imagery, the
  trust-staircase order, a press/testimonial (social-proof) section, a single
  Featured Work spotlight.
- **Adapt:** Denise is *local* (Dade City + 40mi), an interior *stylist* (not
  full-service designer), at an approachable $100/hr. So the voice stays warm
  and accessible — not luxury-NYC. Social proof leans on **reviews** (which
  also drive her local SEO) rather than national press logos.

> Our current build already mirrors this skeleton. The work is to dial up the
> restraint and add a testimonial + featured-project spotlight.

---

## 2. Studio McGee — https://www.studio-mcgee.com/  ⭐ HER FAVORITE

**Denise's words:** "I like the animation of this website too." (This is the
"other one is my favorite" she referenced.)

**Stack (important):** Built on **Next.js + Vercel** — the *exact* stack we
chose for Denise. So matching its feel is native to our build, not a stretch.
(Spotted `/_next/image` + a `studio-mcgee-v3.vercel.app` link.)

### The animations she likes
- **Full-screen autoplay video hero** (a muted, looping room/lifestyle clip)
  with the headline overlaid — "A design house rooted in Modern tradition."
  This is the signature move. We'll make our hero **video-ready**: image now,
  swap to a short clip when Denise has footage.
- **Slow fade/slide-up reveals** as each section scrolls in (we already built
  this with `<Reveal>` — dial the easing to match: gentle, ~0.7s).
- **Hover zoom** on 3:4 portfolio tiles (we have this).

### Page structure
Video hero → "Read the latest" feature → editorial blog grid → **New Heritage**
brand-story block (philosophy) → press pull-quote (NYT) → Portfolio grid (3:4
tiles) → Shop → Instagram → footer.

### Philosophy (use this as a north star for Denise's voice)
Shea McGee: *"design has always been about how a space makes you feel—not just
how it looks."* Warm, layered, collected, "effortlessly timeless." Denise's
voice should live in this family — warm + intentional — but **local and
approachable**, not national-luxury.

### Colors (Denise's direction, from her texts)
- **Option 1 (preferred):** main = warm **mauve/dusty-rose** neutral,
  secondary = **maroon**, plus **white**. → implemented as the live palette.
- **Option 2 (backup, "if the maroon is too much"):** Studio McGee's
  **warm brown + cream**. → saved as a comment block in `globals.css`.

---

## Brand
- **Business name:** Denise Griffin Interiors
- **Owner:** Denise Griffin
- **Logo:** black script "dg" monogram + "DENISE GRIFFIN / INTERIORS" serif.
  *Need the file* dropped in as `/public/images/logo.png`, then flip
  `LOGO_READY = true` in `src/components/Logo.tsx`. Interim: serif wordmark.

## Shared takeaway across both sites
Both are restrained, photography-forward, single-column scrolls with a clear
trust order and gentle scroll animations. Our build already matches the
skeleton; the work is palette + voice + her photos + the video-hero option.
