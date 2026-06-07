import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ContactSection } from "@/components/ContactSection";
import { site, home, projects, services, local } from "@/content/site";

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <HeroSlideshow
          slides={home.heroSlides}
          className="absolute inset-0 h-full w-full"
        />
        {/* Flat darkening tint — keeps the white text legible even when a clip
            cuts to a bright/white frame (consistent floor on every frame). */}
        <div className="absolute inset-0 bg-ink/20" />
        {/* readability scrim — bottom (text) + top (nav). */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/15" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/55 to-transparent" />

        <div className="container-wide relative z-10 pb-16 md:pb-24 [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
          <p className="eyebrow mb-5 animate-fade-up !text-accent-soft">
            {site.role}
          </p>
          <h1 className="display max-w-3xl animate-fade-up text-5xl text-bg sm:text-6xl md:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-bg">
            {home.intro}
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="rounded-full bg-bg px-7 py-3.5 text-sm font-medium text-ink shadow-lg shadow-black/20 transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-accent hover:text-bg hover:shadow-xl hover:shadow-black/30 active:translate-y-0 active:scale-[0.98]"
            >
              View portfolio
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border-2 border-bg/90 px-7 py-3.5 text-sm font-medium text-bg backdrop-blur-[2px] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-bg hover:text-ink active:translate-y-0 active:scale-[0.98]"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- INTRO + STATS ---------- */}
      <section className="section">
        <div className="container-wide grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">The approach</p>
            <h2 className="display text-3xl text-ink sm:text-4xl md:text-5xl">
              {site.description}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="divide-y divide-line border-l border-line pl-8">
              {home.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline gap-5 py-4 first:pt-0 last:pb-0"
                >
                  <p className="w-32 shrink-0 font-serif text-3xl leading-none text-accent md:text-4xl">
                    {s.value}
                  </p>
                  <p className="text-sm leading-snug text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FEATURED WORK ---------- */}
      <section
        className="section"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg) 0px, var(--color-surface) 800px, var(--color-surface) calc(100% - 800px), var(--color-bg) 100%)",
        }}
      >
        <div className="container-wide">
          <Reveal className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Selected work</p>
              <h2 className="display text-3xl text-ink sm:text-4xl md:text-5xl">
                Recent projects
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="link-underline hidden whitespace-nowrap text-sm font-medium text-ink sm:block"
            >
              View all
            </Link>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 120}>
                <Link href="/portfolio" className="group block">
                  <Frame
                    src={p.image}
                    alt={p.title}
                    label={p.title}
                    index={i}
                    ready={p.ready}
                    className="aspect-[3/4] w-full rounded-sm ring-1 ring-black/[0.05] shadow-[0_18px_42px_-26px_rgba(44,34,37,0.32)] transition-all duration-500 ease-soft group-hover:-translate-y-1.5 group-hover:shadow-[0_32px_62px_-28px_rgba(44,34,37,0.44)]"
                  />
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl text-ink">{p.title}</h3>
                    <span className="text-xs uppercase tracking-widest text-muted">
                      {p.category}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Link
              href="/portfolio"
              className="link-underline text-sm font-medium text-ink"
            >
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES PREVIEW ---------- */}
      <section className="section">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4">How I can help</p>
            <h2 className="display text-3xl text-ink sm:text-4xl md:text-5xl">
              Ways to work together
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <Link
                  href="/services"
                  className="group relative flex h-full flex-col rounded-sm border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_45px_-28px_rgba(111,48,56,0.45)]"
                >
                  {/* number + hairline rule that lights up on hover */}
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-serif text-3xl leading-none text-accent">
                      0{i + 1}
                    </span>
                    <span className="h-px flex-1 bg-line transition-colors duration-300 group-hover:bg-accent/40" />
                  </div>
                  <h3 className="font-serif text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {s.blurb}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    Learn more
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- AREAS SERVED ---------- */}
      <section
        className="section"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg) 0px, var(--color-surface) 800px, var(--color-surface) calc(100% - 800px), var(--color-bg) 100%)",
        }}
      >
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow mb-4">Where I work</p>
            <h2 className="display text-3xl text-ink sm:text-4xl md:text-5xl">
              Serving Tampa &amp; the surrounding 40 miles
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Based in Dade City, working in person across Pasco and north
              Hillsborough.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-3">
            {local.areas.map((a) => (
              <Link
                key={a.slug}
                href={`/interior-design/${a.slug}`}
                className="rounded-full border border-line px-5 py-2.5 text-sm text-ink/80 transition-colors duration-300 hover:border-accent hover:text-ink"
              >
                {a.name}
              </Link>
            ))}
            <Link
              href="/interior-design"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent"
            >
              All service areas →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <ContactSection />
    </>
  );
}
