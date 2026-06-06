"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type HeroSlide = { src: string; poster: string; alt: string };

/**
 * Tesla-style hero: plays each video, crossfades to the next when it ends,
 * and loops the playlist. Each layer shows its poster first, then its video.
 * Honors prefers-reduced-motion (shows the first still, no motion).
 */
export function HeroSlideshow({
  slides,
  className = "",
}: {
  slides: HeroSlide[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Play the active video from the start whenever it becomes active.
  useEffect(() => {
    if (reduced) return;
    const v = videoRefs.current[active];
    if (!v) return;
    try {
      v.currentTime = 0;
      const p = v.play();
      if (p) p.catch(() => {});
    } catch {
      /* autoplay may be blocked; poster still shows */
    }
  }, [active, reduced]);

  // Safety net: if a video stalls, still advance after its duration + buffer.
  useEffect(() => {
    if (reduced || slides.length < 2) return;
    const v = videoRefs.current[active];
    const ms = v && v.duration ? v.duration * 1000 + 800 : 6000;
    const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), ms);
    return () => clearTimeout(t);
  }, [active, reduced, slides.length]);

  const advance = () => setActive((a) => (a + 1) % slides.length);

  return (
    <div className={`overflow-hidden bg-ink ${className}`}>
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-soft"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i === active ? undefined : true}
        >
          <Image
            src={s.poster}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          {!reduced && (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full object-cover"
              src={s.src}
              poster={s.poster}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              onEnded={advance}
            />
          )}
        </div>
      ))}
    </div>
  );
}
