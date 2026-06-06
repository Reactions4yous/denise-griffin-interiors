"use client";

import { useEffect } from "react";

/**
 * Premium scroll-driven background.
 *
 * As each section carrying a `data-bg="#hex"` color crosses the middle of the
 * viewport, the page background eases to that color. The transition itself is a
 * CSS transition on <body> (see globals.css), so this just swaps the target
 * color, Apple/Tesla style: slow, subtle, intentional.
 *
 * On pages with no [data-bg] sections it does nothing but reset to the default
 * palette background, so other pages are unaffected.
 */
export function ScrollTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const DEFAULT =
      getComputedStyle(root).getPropertyValue("--color-bg").trim() || "";

    const reset = () => {
      document.body.style.backgroundColor = DEFAULT;
    };

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bg]"),
    );

    if (sections.length === 0) {
      reset();
      return reset;
    }

    // Respect users who prefer reduced motion: still set the color, just rely
    // on the CSS transition being disabled for them in globals.css.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute("data-bg");
            if (color) document.body.style.backgroundColor = color;
          }
        });
      },
      // A thin band across the vertical middle of the viewport: whichever
      // section is crossing the center "wins" and sets the background.
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      reset();
    };
  }, []);

  return null;
}
