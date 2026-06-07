import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { projects, beforeAfters } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Residential interior design and styling by Denise Griffin — bedrooms, living spaces, baths, and full-home transformations near Tampa, FL.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="section pt-32 md:pt-40">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">Portfolio</p>
            <h1 className="display text-4xl text-ink sm:text-5xl md:text-6xl">
              Spaces with a story
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Every project is shaped around the people who live there. Here are
              a few of my favorites.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-wide space-y-24 md:space-y-32">
          {projects.map((p, i) => {
            const images = [p.image, ...(p.gallery ?? [])];
            const flip = i % 2 === 1; // alternate sides for editorial rhythm
            return (
              <Reveal key={p.slug}>
                <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  {/* Intro */}
                  <div className={`max-w-md ${flip ? "md:order-2" : ""}`}>
                    <p className="text-xs uppercase tracking-widest text-accent">
                      {p.category}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
                      {p.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted">
                      {p.description}
                    </p>
                  </div>

                  {/* Auto-crossfading carousel (flip manually with arrows/dots) */}
                  <div className={flip ? "md:order-1" : ""}>
                    <ProjectCarousel images={images} title={p.title} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Before / After */}
      {beforeAfters.length > 0 && (
        <section className="section bg-surface">
          <div className="container-wide">
            <Reveal className="mb-12 max-w-2xl">
              <p className="eyebrow mb-4">Before &amp; after</p>
              <h2 className="display text-3xl text-ink sm:text-4xl md:text-5xl">
                The power of a thoughtful redesign
              </h2>
            </Reveal>

            <div className="space-y-16">
              {beforeAfters.map((ba) => (
                <Reveal key={ba.title}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <div className="relative">
                        <Frame
                          src={ba.before}
                          alt={`${ba.title} before redesign`}
                          ready
                          className="aspect-[3/4] w-full rounded-sm ring-1 ring-black/[0.05] shadow-[0_20px_46px_-26px_rgba(44,34,37,0.32)]"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-widest text-bg">
                          Before
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="relative">
                        <Frame
                          src={ba.after}
                          alt={`${ba.title} after redesign by Denise Griffin Interiors`}
                          ready
                          className="aspect-[3/4] w-full rounded-sm ring-1 ring-black/[0.05] shadow-[0_20px_46px_-26px_rgba(44,34,37,0.32)]"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs uppercase tracking-widest text-bg">
                          After
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 max-w-2xl">
                    <h3 className="font-serif text-2xl text-ink">{ba.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-accent">
                      {ba.location}
                    </p>
                    <p className="mt-3 leading-relaxed text-muted">{ba.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
