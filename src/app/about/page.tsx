import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";
import { about, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${site.name}, a residential interior designer creating warm, personal spaces near Tampa, FL.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="section pt-32 md:pt-40">
        <div className="container-wide grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Frame
              src={about.portrait}
              alt={`Portrait of ${site.owner}`}
              ready
              index={1}
              className="aspect-[4/5] w-full rounded-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>

          <Reveal delay={120} className="md:pt-8">
            <p className="eyebrow mb-5">About</p>
            <h1 className="display text-4xl text-ink sm:text-5xl">
              {about.heading}
            </h1>
            <div className="mt-6 space-y-5">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
            <Link
              href="/#contact"
              className="mt-9 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent"
            >
              Let&apos;s work together
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-wide">
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="h-full bg-bg p-8">
                  <h3 className="font-serif text-2xl text-ink">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
