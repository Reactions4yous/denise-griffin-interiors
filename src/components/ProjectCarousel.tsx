"use client";

import { useCallback, useEffect, useState } from "react";
import { Frame } from "@/components/Frame";

/**
 * Per-project photo carousel. Auto-crossfades between images (Tesla-hero
 * style), pauses on hover, and can be flipped manually with the arrows or the
 * cream/black dots below. Each project gets its own independent instance.
 */
export function ProjectCarousel({
  images,
  title,
  intervalMs = 5000,
}: {
  images: string[];
  title: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, paused, intervalMs]);

  if (count === 0) return null;

  const Chevron = ({ dir }: { dir: "left" | "right" }) => (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );

  return (
    <div
      className="group/carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-surface ring-1 ring-black/[0.05] shadow-[0_26px_60px_-30px_rgba(44,34,37,0.38)] transition-all duration-500 ease-soft group-hover/carousel:-translate-y-1 group-hover/carousel:shadow-[0_38px_74px_-30px_rgba(44,34,37,0.46)]">
        {images.map((src, i) => (
          <div
            key={src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-soft ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Frame
              src={src}
              alt={i === 0 ? title : `${title}, detail ${i + 1}`}
              ready
              index={i}
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg/85 text-ink opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-bg group-hover/carousel:opacity-100"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg/85 text-ink opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-bg group-hover/carousel:opacity-100"
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      {/* cream/black slide indicators */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full border transition-all duration-300 ${
                i === index
                  ? "w-6 border-ink bg-ink"
                  : "w-2.5 border-ink/40 bg-bg hover:border-ink"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
