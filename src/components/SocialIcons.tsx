import { site } from "@/content/site";
import type { ReactNode } from "react";

type SocialItem = {
  label: string;
  href: string;
  filled: boolean;
  path: ReactNode;
};

const ICONS: SocialItem[] = [
  {
    label: "Instagram",
    href: site.socials.instagram,
    filled: false,
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "TikTok",
    href: site.socials.tiktok,
    filled: true,
    path: (
      <path d="M16.5 3c.4 2.2 1.9 3.9 4 4.1v3.1c-1.5 0-2.9-.5-4-1.3v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.2a2.6 2.6 0 1 0 2.1 2.5V3h2.7z" />
    ),
  },
  {
    label: "Facebook",
    href: site.socials.facebook,
    filled: true,
    path: (
      <path d="M14.5 8.5H17V5.6h-2.6c-2.1 0-3.6 1.5-3.6 3.7v1.9H8.4v2.9h2.4V21h3v-6.7h2.4l.5-2.9h-2.9V9.6c0-.7.3-1.1 1.1-1.1z" />
    ),
  },
];

/**
 * Social icon buttons: black icons on white circular chips with a soft shadow.
 * Clean and quiet (no animation). Shared by the mobile menu and the footer.
 */
export function SocialIcons({ className = "" }: { className?: string }) {
  const items = ICONS.filter((s) => s.href);
  if (items.length === 0) return null;

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {items.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-black/[0.06] shadow-[0_6px_16px_-8px_rgba(44,34,37,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(44,34,37,0.55)] hover:text-accent"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[1.15rem] w-[1.15rem]"
            fill={s.filled ? "currentColor" : "none"}
            stroke={s.filled ? "none" : "currentColor"}
            strokeWidth={s.filled ? 0 : 1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {s.path}
          </svg>
        </a>
      ))}
    </div>
  );
}
