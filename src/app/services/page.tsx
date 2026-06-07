import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential interior design services by Denise Griffin — full-service interior design, furnishing & styling, and design consultations near Tampa, FL.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section pt-32 md:pt-40">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">Services</p>
            <h1 className="display text-4xl text-ink sm:text-5xl md:text-6xl">
              Ways to work together
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Whether you want a fully styled home or just a confident plan to
              tackle it yourself, there&apos;s an option for you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-wide space-y-px overflow-hidden rounded-sm border border-line bg-line">
          {services.map((s, i) => (
            <Reveal key={s.title}>
              <div className="grid gap-6 bg-bg p-8 md:grid-cols-[auto_1fr_1.2fr] md:items-start md:gap-12 md:p-12">
                <span className="font-serif text-4xl text-accent md:text-5xl">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-ink md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{s.blurb}</p>
                </div>
                <ul className="space-y-3">
                  {s.details.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-sm leading-relaxed text-ink/80"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <Reveal className="relative overflow-hidden rounded-sm bg-ink px-8 py-16 text-center md:px-16 md:py-24">
            {/* warm accent glow + hairline inner frame for depth */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-3 rounded-sm border border-bg/10" />

            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow mb-5 !text-accent-soft">Let&apos;s begin</p>
              <h2 className="display text-3xl text-bg sm:text-4xl md:text-5xl">
                Not sure which is right for you?
              </h2>
              <p className="mx-auto mt-5 max-w-lg leading-relaxed text-bg/80">
                Tell me a little about your space and I&apos;ll point you in the
                right direction, no pressure.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="rounded-full bg-bg px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-bg"
                >
                  Book a consultation
                </Link>
                <Link
                  href="/portfolio"
                  className="rounded-full border border-bg/35 px-7 py-3.5 text-sm font-medium text-bg transition-colors duration-300 hover:border-bg hover:bg-bg hover:text-ink"
                >
                  See recent work
                </Link>
              </div>
              <p className="mt-7 text-sm tracking-wide text-bg/55">
                Tailored pricing · Dade City + 40 miles · in person
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
