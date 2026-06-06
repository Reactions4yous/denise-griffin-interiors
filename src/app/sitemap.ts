import type { MetadataRoute } from "next";
import { local } from "@/content/site";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.denisegriffininteriors.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = ["", "/portfolio", "/about", "/services", "/interior-design"].map(
    (route) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const areaPages = local.areas.map((area) => ({
    url: `${base}/interior-design/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...core, ...areaPages];
}
