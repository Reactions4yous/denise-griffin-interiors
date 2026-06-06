import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SocialIcons } from "@/components/SocialIcons";
import { site, local } from "@/content/site";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/interior-design", label: "Service Areas" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-wide section !py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline text-sm text-ink/80 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Connect</p>
            <ul className="space-y-2 text-sm text-ink/80">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
              {site.phone && (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="link-underline hover:text-ink"
                  >
                    {site.phone}
                  </a>
                </li>
              )}
            </ul>
            <SocialIcons className="mt-5" />
          </div>

          <div>
            <p className="eyebrow mb-4">Areas served</p>
            <ul className="space-y-2">
              {local.areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/interior-design/${a.slug}`}
                    className="link-underline text-sm text-ink/80 hover:text-ink"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="link-underline hover:text-ink">
              Privacy Policy
            </Link>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
