import type { MetadataRoute } from "next";
import { portfolio, projects } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!portfolio.siteUrl) return [];
  return [
    { url: `${portfolio.siteUrl}/` },
    ...projects.map((project) => ({
      url: `${portfolio.siteUrl}/projects/${project.slug}/`,
    })),
  ];
}
