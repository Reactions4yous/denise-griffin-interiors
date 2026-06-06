import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export function ContactSection() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section id="contact" className="section scroll-mt-24 bg-surface">
      <div className="container-wide grid gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="eyebrow mb-5">Contact</p>
          <h2 className="display text-3xl text-ink sm:text-4xl md:text-5xl">
            Let&apos;s create a space you love.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted">
            Tell me about your project and I&apos;ll get back to you within 1–2
            business days. Prefer to talk it through? Book a free intro call.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <div>
              <p className="eyebrow mb-1">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-ink"
              >
                {site.email}
              </a>
            </div>
            {site.phone && (
              <div>
                <p className="eyebrow mb-1">Phone</p>
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="link-underline text-ink"
                >
                  {site.phone}
                </a>
              </div>
            )}
            <div>
              <p className="eyebrow mb-1">Based</p>
              <p className="text-ink">{site.location}</p>
            </div>
          </div>

          {/* Booking link (set NEXT_PUBLIC_CALENDLY_URL in .env.local) */}
          {calendly && (
            <a
              href={calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-ink px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
            >
              Book a free intro call →
            </a>
          )}
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
