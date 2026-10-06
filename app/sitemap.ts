import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { citySlugs, webDesignCityPath, aiCityPath, aiCityIndexable } from "@/lib/cities";
import { localSeoCityPath, LOCAL_SEO_CITIES } from "@/lib/localSeo";
import { googleAdsCityPath, googleAdsCityIndexable, GOOGLE_ADS_CITIES } from "@/lib/googleAds";
import { gbpCityPath, gbpCityIndexable, GBP_CITIES } from "@/lib/gbp";
import { POSTS } from "@/lib/posts";

/**
 * Last real content update for non-blog pages. Bump this by hand when page
 * copy changes; don't use `new Date()` (a lastmod that is always "now" teaches
 * Google to ignore it). Blog posts use their own dates from lib/posts.ts.
 * changefreq and priority are left out on purpose: Google ignores both.
 */
const PAGES_LAST_MODIFIED = "2026-10-06";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/services",
    "/pricing",
    // Paid-traffic offer page. Indexable and canonical to itself — it targets
    // "$0 upfront website" intent that /pricing doesn't. Its thank-you page is
    // noindex and deliberately absent here.
    "/website-offer",
    "/learn-claude-code",
    "/claude-code-templates",
    "/about",
    "/contact",
    "/blog",
    // Legal pages are indexable (index, follow) so they belong here too.
    "/privacy",
    "/terms",
  ];

  const servicePaths = serviceSlugs.map((slug) => `/services/${slug}`);

  // Specialized service pages (not part of the lib/services data set).
  const specializedServicePaths = ["/services/website-design", "/services/ai-implementation"];

  // City landing pages for website design + AI implementation. Noindexed
  // (thin) city pages stay out of the sitemap; see the *_INDEXABLE_CITIES sets.
  const cityPaths = citySlugs.flatMap((slug) => [
    webDesignCityPath(slug),
    ...(aiCityIndexable(slug) ? [aiCityPath(slug)] : []),
  ]);

  // Local SEO, Google Ads and Google Business Profile city landing pages.
  const localSeoPaths = Object.keys(LOCAL_SEO_CITIES).map(localSeoCityPath);
  const googleAdsPaths = Object.keys(GOOGLE_ADS_CITIES).filter(googleAdsCityIndexable).map(googleAdsCityPath);
  const gbpPaths = Object.keys(GBP_CITIES).filter(gbpCityIndexable).map(gbpCityPath);

  const pages = [
    ...staticPaths,
    ...servicePaths,
    ...specializedServicePaths,
    ...cityPaths,
    ...localSeoPaths,
    ...googleAdsPaths,
    ...gbpPaths,
  ].map((path) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: PAGES_LAST_MODIFIED,
  }));

  // Blog posts: the post's own modified date (falls back to published).
  const posts = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.dateModified || p.datePublished,
  }));

  return [...pages, ...posts];
}
