import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { citySlugs, webDesignCityPath, aiCityPath } from "@/lib/cities";
import { localSeoCityPath, LOCAL_SEO_CITIES } from "@/lib/localSeo";

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

  // New specialized service pages (not part of the lib/services data set).
  const specializedServicePaths = [
    { path: "/services/website-design", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/ai-implementation", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  // City landing pages for website design + AI implementation.
  const cityPaths = citySlugs.flatMap((slug) => [
    { path: webDesignCityPath(slug), priority: 0.7, changeFrequency: "monthly" as const },
    { path: aiCityPath(slug), priority: 0.7, changeFrequency: "monthly" as const },
  ]);

  // Local SEO city landing pages.
  const localSeoPaths = Object.keys(LOCAL_SEO_CITIES).map((slug) => ({
    path: localSeoCityPath(slug),
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const lastModified = new Date();

  return [...staticPaths, ...servicePaths, ...specializedServicePaths, ...cityPaths, ...localSeoPaths].map((entry) => ({
    url: entry.path === "/" ? SITE.url : `${SITE.url}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
