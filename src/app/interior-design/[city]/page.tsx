import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";
import { ContactSection } from "@/components/ContactSection";
import { local, services, projects, site } from "@/content/site";

type Params = { params: Promise<{ city: string }> };

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.denisegriffininteriors.com";

export function generateStaticParams() {
  return local.areas.map((a) => ({ city: a.slug }));
}

function getArea(slug: string) {
  return local.areas.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city } = await params;
  const area = getArea(city);
  if (!area) return {};
  const title = `Interior Designer in ${area.name}, FL`;
  return {
    title,
    description: area.intro,
    alternates: { canonical: `/interior-design/${area.slug}` },
    openGraph: {
      title: `${title} — ${site.name}`,
      description: area.intro,
      url: `${base}/interior-design/${area.slug}`,
    },
  };
}

export default async function AreaPage({ params }: Params) {
  const { city } = await params;
  const area = getArea(city);
  if (!area) notFound();

  const featured = projects.slice(0, 3);

  const faqs = [
    {
      q: `How much does an interior designer in ${area.name} cost?`,
      a: `Pricing depends on the scope of help you need. Full interior design can be a flat project fee, hourly, or by the square foot of the home. Most ${area.name} projects start with an in-home consultation so you get an honest sense of investment before committing.`,
    },
    {
      q: `Do you serve ${area.name} in person?`,
      a: `Yes. Denise is based in Dade City, FL and works in person throughout ${area.name} and the surrounding 40 miles — including consultations, sourcing, and install day.`,
    },
    {
      q: `Do you furnish new-construction homes in ${area.name}?`,
      a: `Absolutely. Furnishing and styling brand-new builds from empty rooms is a specialty — space planning, furniture, art, and the finishing layers that make a new ${area.name} house finally feel like home.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <section className="section pt-32 md:pt-40">
        <div className="container-wide grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="eyebrow mb-5">
              Interior Design · {area.county}
            </p>
            <h1 className="display text-4xl text-ink sm:text-5xl">
              Interior Designer in {area.name}, FL
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {area.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent"
              >
                Start your project
              </Link>
              <Link
                href="/portfolio"
                className="rounded-full border border-ink px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
              >
                View portfolio
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Frame
              src="/images/hero.jpg"
              alt={`Interior design and styling in ${area.name}, FL by Denise Griffin Interiors`}
              ready
              index={2}
              className="aspect-[4/5] w-full rounded-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Local body copy */}
      <section className="pb-8">
        <div className="container-wide max-w-3xl space-y-5">
          {area.body.map((p, i) => (
            <Reveal key={i}>
              <p className="text-lg leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4">Services in {area.name}</p>
            <h2 className="display text-3xl text-ink sm:text-4xl">
              How I can help
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="flex h-full flex-col bg-bg p-8">
                  <span className="font-serif text-xl text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {s.blurb}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section bg-surface">
        <div className="container-wide">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4">Selected work</p>
            <h2 className="display text-3xl text-ink sm:text-4xl">
              Recent projects
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link href="/portfolio" className="group block">
                  <Frame
                    src={p.image}
                    alt={p.title}
                    label={p.title}
                    index={i}
                    ready={p.ready}
                    className="aspect-[3/4] w-full rounded-sm"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <h3 className="mt-4 font-serif text-xl text-ink">{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (AEO) */}
      <section className="section">
        <div className="container-wide max-w-3xl">
          <Reveal className="mb-10">
            <p className="eyebrow mb-4">Common questions</p>
            <h2 className="display text-3xl text-ink sm:text-4xl">
              Interior design in {area.name}
            </h2>
          </Reveal>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <div className="py-7">
                  <h3 className="font-serif text-xl text-ink">{f.q}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
