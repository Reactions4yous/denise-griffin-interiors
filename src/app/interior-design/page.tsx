import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ContactSection } from "@/components/ContactSection";
import { local } from "@/content/site";

export const metadata: Metadata = {
  title: "Service Areas — Interior Design Near Tampa",
  description:
    "Denise Griffin Interiors provides residential interior design in Dade City, Wesley Chapel, Lutz, Land O' Lakes, Odessa, Trinity, New Tampa, and South Tampa, FL.",
  alternates: { canonical: "/interior-design" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="section pt-32 md:pt-40">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">Service areas</p>
            <h1 className="display text-4xl text-ink sm:text-5xl md:text-6xl">
              Interior design across Tampa &amp; Pasco
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Based in Dade City, Denise works in person throughout the
              surrounding 40 miles. Find your area below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {local.areas.map((area, i) => (
              <Reveal key={area.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/interior-design/${area.slug}`}
                  className="group flex h-full flex-col rounded-sm border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent"
                >
                  <p className="text-xs uppercase tracking-widest text-accent">
                    {area.county}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-ink">
                    {area.name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {area.blurb}
                  </p>
                  <span className="link-underline mt-5 text-sm font-medium text-ink">
                    Interior design in {area.name} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
