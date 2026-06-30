import { site, local } from "@/content/site";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.denisegriffininteriors.com";

/**
 * JSON-LD structured data (LocalBusiness).
 *
 * This tells Google, ChatGPT, Perplexity, and Google AI Overviews exactly
 * what Denise is, where she's based, the towns she serves, and her pricing —
 * the foundation of both local SEO (map pack) and AEO (being cited in AI
 * answers). 88% of sites skip schema, so this is a real competitive edge.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#business`,
    name: site.name,
    description: site.description,
    url: base,
    image: `${base}/images/hero.jpg`,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    priceRange: local.priceRange,
    // Home-based service business: city only, no street address published.
    address: {
      "@type": "PostalAddress",
      addressLocality: local.baseCity,
      addressRegion: local.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: local.geo.lat,
      longitude: local.geo.lng,
    },
    // The towns she serves in person.
    areaServed: local.areas.map((area) => ({
      "@type": "City",
      name: `${area.name}, ${local.state}`,
    })),
    // Defines the 40-mile in-person radius.
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: local.geo.lat,
        longitude: local.geo.lng,
      },
      geoRadius: local.serviceRadiusMiles * 1609, // miles -> meters
    },
    knowsAbout: [
      "Interior Styling",
      "Interior Design",
      "Home Styling",
      "Room Styling",
    ],
    sameAs: Object.values(site.socials).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
