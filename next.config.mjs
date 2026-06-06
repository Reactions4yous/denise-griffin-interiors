import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */

// Security headers applied to every response.
// These harden the site against common attacks (clickjacking, MIME sniffing,
// referrer leakage) with zero runtime cost.
const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Don't let the browser guess content types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disallow the site being embedded in iframes (clickjacking protection).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Only send the origin on cross-site requests.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turn off browser features the site doesn't use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Pin the project root so Next ignores any stray lockfile in a parent
  // (e.g. an accidental package-lock.json in the home folder). Without this,
  // Next can pick the wrong root and the App Router breaks at runtime.
  outputFileTracingRoot: __dirname,

  // Image optimization: serve modern formats automatically.
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote image hosts here if Denise's photos live off-site.
    remotePatterns: [],
  },

  async headers() {
    const headers = [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];

    if (process.env.NODE_ENV === "production") {
      // PRODUCTION: long-cache fingerprinted static assets (immutable = never
      // re-fetch) for speed. Safe because prod filenames are content-hashed.
      headers.push({
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      });
    } else {
      // DEV: actively forbid caching on EVERYTHING so a normal (non-incognito)
      // browser window can never serve a stale bundle. This is what causes the
      // recurring phantom hydration errors. `no-store` means the browser must
      // re-fetch every file every time, so edits always show on a plain reload.
      headers.push({
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, max-age=0",
          },
        ],
      });
    }

    return headers;
  },
};

export default nextConfig;
