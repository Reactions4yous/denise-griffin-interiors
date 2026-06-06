"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { local } from "@/content/site";
import { SocialIcons } from "@/components/SocialIcons";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // The nav sits over the dark hero video only on the homepage, at the top,
  // with the mobile menu closed. There it needs light (white) treatment.
  const overHero = isHome && !scrolled && !open;
  // Everywhere else, show a solid light bar so dark text/logo stay readable.
  const solid = !isHome || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        solid
          ? "bg-bg/95 backdrop-blur-md border-b border-line shadow-[0_4px_24px_-16px_rgba(44,34,37,0.35)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-wide flex items-center justify-between py-2.5 md:py-3">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Home">
          <Logo
            variant={overHero ? "light" : "dark"}
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`link-underline text-sm font-medium transition-colors ${
                  overHero
                    ? "text-bg/90 hover:text-bg"
                    : "text-ink/80 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent"
            >
              Get in touch
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-6 ${overHero ? "bg-bg" : "bg-ink"} transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 ${overHero ? "bg-bg" : "bg-ink"} transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 ${overHero ? "bg-bg" : "bg-ink"} transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>
      </header>

      {/* Mobile menu — rendered OUTSIDE <header> on purpose. When open, the
          header gets backdrop-blur, and backdrop-filter establishes a
          containing block that would trap this fixed overlay inside the ~60px
          header strip (so its background only covered the strip and page
          content showed through). As a viewport-level sibling, `fixed inset-0`
          fills the real screen and the backdrop is fully opaque. Tesla-style
          staggered fade-in below. */}
      <div
        style={{ backgroundColor: "var(--color-bg)" }}
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ease-soft ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* The inline backgroundColor above is the real, always-opaque backdrop
            (bypasses any Tailwind token quirk). This gradient adds subtle warmth. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(111,48,56,0.05))",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/[0.06] to-transparent" />

        <div className="relative flex h-full flex-col px-7 pb-12 pt-28">
          {/* Links */}
          <ul className="flex flex-1 flex-col justify-center gap-4">
            {links.map((l, i) => {
              const active = pathname === l.href;
              return (
                <li
                  key={l.href}
                  className={`border-b border-line/70 transition-all duration-500 ease-soft ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 80}ms` : "0ms" }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline py-7"
                  >
                    <span
                      className={`font-serif text-4xl transition-colors ${
                        active ? "text-accent" : "text-ink group-hover:text-accent"
                      }`}
                    >
                      {l.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer: CTA + contact */}
          <div
            className={`mt-8 transition-all duration-500 ease-soft ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${120 + links.length * 80}ms` : "0ms" }}
          >
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-ink py-4 text-center text-base font-medium text-bg transition-colors duration-300 hover:bg-accent"
            >
              Get in touch
            </Link>
            <div className="mt-7 flex items-center justify-between">
              <span className="text-sm text-muted">
                {local.baseCity}, {local.state}
              </span>
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
