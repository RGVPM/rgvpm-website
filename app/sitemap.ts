import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/blog", priority: 0.5, changeFrequency: "weekly" },
  ];

  const servicePaths = serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPaths, ...servicePaths].map((entry) => ({
    url: entry.path === "/" ? SITE.url : `${SITE.url}${entry.path}`,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
