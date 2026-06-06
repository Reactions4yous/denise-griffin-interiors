import Image from "next/image";
import { site } from "@/content/site";

/**
 * Brand logo — Denise's real "dg" monogram wordmark.
 *
 * Two transparent PNGs live in /public/images:
 *   logo.png        — black ink, for light backgrounds (nav when scrolled, footer)
 *   logo-white.png  — white, for over the dark hero video
 *
 * Set LOGO_READY = false to fall back to the plain text wordmark.
 */
export const LOGO_READY = true;

const LOGO_W = 720;
const LOGO_H = 452;

export function Logo({
  className = "h-12 w-auto md:h-14",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  if (LOGO_READY) {
    return (
      <Image
        src={variant === "light" ? "/images/logo-white.png" : "/images/logo.png"}
        alt={site.name}
        width={LOGO_W}
        height={LOGO_H}
        priority
        className={className}
      />
    );
  }

  const color = variant === "light" ? "text-bg" : "text-ink";

  return (
    <span className={`flex flex-col leading-none ${color}`}>
      <span className="font-serif text-2xl tracking-tight">
        {site.wordmark.top}
      </span>
      <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.35em] text-accent">
        {site.wordmark.bottom}
      </span>
    </span>
  );
}
