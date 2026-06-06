import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you share through this website.`,
};

export default function PrivacyPage() {
  const updated = "June 2026";

  return (
    <section className="section pt-32 md:pt-40">
      <div className="container-wide max-w-3xl">
        <Reveal>
          <p className="eyebrow mb-5">Privacy</p>
          <h1 className="display text-4xl text-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        </Reveal>

        <Reveal delay={120} className="mt-10 space-y-9 leading-relaxed text-muted">
          <p>
            Your privacy matters. This page explains, in plain language, what
            happens to the information you share with {site.name} through this
            website, especially when you fill out the contact form. The short
            version: we only use it to respond to you, and we never sell or
            share it.
          </p>

          <div>
            <h2 className="font-serif text-2xl text-ink">
              What we collect
            </h2>
            <p className="mt-3">
              The only information we collect is what you choose to give us in
              the contact form, your name, your email address, the type of
              project you&apos;re interested in, and any details you write about
              your space. We don&apos;t ask for sensitive personal information,
              and we don&apos;t run hidden trackers or sell-your-data
              advertising tools on this site.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink">How we use it</h2>
            <p className="mt-3">
              We use your information for one purpose only: to read your message
              and get back to you about your project. That&apos;s it. We
              won&apos;t add you to any marketing lists or send you newsletters
              you didn&apos;t ask for.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink">
              We never sell or share your information
            </h2>
            <p className="mt-3">
              {site.name} does not sell, rent, trade, or share your personal
              information with any third parties for their marketing or any
              other purpose. Your details stay with us and are used solely to
              respond to your inquiry.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink">
              How your message is handled
            </h2>
            <p className="mt-3">
              When you submit the form, your message is delivered to us securely
              by email so we can reply. We keep it only as long as we need it to
              be in touch with you about your project. There is no public
              database of your information on this website.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink">Your choices</h2>
            <p className="mt-3">
              You&apos;re always in control. If you&apos;d like us to delete the
              information you sent, or you have any questions about your privacy,
              just email us at{" "}
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-ink hover:text-accent"
              >
                {site.email}
              </a>{" "}
              and we&apos;ll take care of it.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink">Updates</h2>
            <p className="mt-3">
              If this policy ever changes, we&apos;ll update the date at the top
              of this page. You can always reach us with questions at{" "}
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-ink hover:text-accent"
              >
                {site.email}
              </a>
              .
            </p>
          </div>

          <p className="border-t border-line pt-8 text-sm">
            {site.name} · {site.location}.{" "}
            <Link href="/#contact" className="link-underline text-ink hover:text-accent">
              Get in touch
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
