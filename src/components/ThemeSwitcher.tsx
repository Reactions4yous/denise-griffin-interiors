"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ThemeSwitcher — a small on-page palette picker so Denise can preview the
 * color schemes she liked and "get a feel" before we lock one in.
 *
 * How it works: each option sets `data-theme` on <html>, which flips the brand
 * CSS variables defined in globals.css (which Tailwind reads), so the WHOLE
 * site recolors instantly. The choice is saved to localStorage and re-applied
 * before paint by a tiny script in layout.tsx (no flash of the wrong palette).
 *
 * This is a temporary preview tool. To lock a palette in permanently, copy its
 * values into :root in globals.css and delete this component + the script.
 * Keep PALETTES in sync with the html[data-theme="…"] blocks in globals.css.
 */

export const STORAGE_KEY = "dgi-theme";

type Palette = {
  id: string;
  name: string;
  note: string;
  bg: string;
  accent: string;
  ink: string;
};

const PALETTES: Palette[] = [
  {
    id: "greige",
    name: "Sage & Espresso",
    note: "Grey-green · espresso brown",
    bg: "#dfe2d8",
    accent: "#59412f",
    ink: "#2a2119",
  },
  {
    id: "clay",
    name: "Warm Clay",
    note: "Sandy tan · terracotta",
    bg: "#f0e2d2",
    accent: "#b5613f",
    ink: "#2a2420",
  },
  {
    id: "mauve",
    name: "Heritage Mauve",
    note: "Warm mauve-cream · maroon",
    bg: "#f5efed",
    accent: "#6f3038",
    ink: "#2c2225",
  },
  {
    id: "rose",
    name: "Dusty Rose",
    note: "Soft blush · maroon",
    bg: "#eeddd8",
    accent: "#6f3038",
    ink: "#32262a",
  },
];

const DEFAULT_ID = "greige";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(DEFAULT_ID);
  const ref = useRef<HTMLDivElement>(null);

  // Read whatever the no-flash script (or a prior visit) already applied.
  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") || DEFAULT_ID;
    setActive(current);
  }, []);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id: string) => {
    document.documentElement.setAttribute("data-theme", id);
    // ScrollTheme may have pinned an inline background on <body>; clear it so
    // the new palette's --color-bg shows through immediately.
    document.body.style.backgroundColor = "";
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* private mode — preview still works for this session */
    }
    setActive(id);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="fixed bottom-5 right-5 z-[60] print:hidden"
      data-theme-switcher
    >
      {open && (
        <div
          role="menu"
          aria-label="Color palettes"
          className="mb-3 w-72 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_60px_-20px_rgba(44,34,37,0.45)] animate-fade-up"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="font-serif text-lg leading-none text-ink">
              Choose a palette
            </p>
            <p className="mt-1 text-xs text-muted">
              Preview only — pick the feel you like.
            </p>
          </div>
          <ul className="p-2">
            {PALETTES.map((p) => {
              const selected = p.id === active;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => choose(p.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      selected ? "bg-accent-soft" : "hover:bg-accent-soft/50"
                    }`}
                  >
                    <span className="flex flex-none items-center -space-x-1.5">
                      <Swatch color={p.bg} />
                      <Swatch color={p.accent} />
                      <Swatch color={p.ink} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-ink">
                        {p.name}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {p.note}
                      </span>
                    </span>
                    {selected && (
                      <CheckIcon className="h-4 w-4 flex-none text-accent" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change color palette"
        className="flex items-center gap-2 rounded-full border border-line bg-surface/95 px-4 py-2.5 text-sm font-medium text-ink shadow-[0_10px_30px_-12px_rgba(44,34,37,0.5)] backdrop-blur transition-transform hover:-translate-y-0.5"
      >
        <PaletteIcon className="h-4 w-4 text-accent" />
        Theme
      </button>
    </div>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="h-5 w-5 rounded-full ring-2 ring-surface"
      style={{ backgroundColor: color }}
    />
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.36-.59-.36-.99 0-.83.67-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
