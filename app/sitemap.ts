import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { citySlugs, webDesignCityPath, aiCityPath, aiCityIndexable } from "@/lib/cities";
import { localSeoCityPath, LOCAL_SEO_CITIES } from "@/lib/localSeo";
import { googleAdsCityPath, googleAdsCityIndexable, GOOGLE_ADS_CITIES } from "@/lib/googleAds";
import { gbpCityPath, gbpCityIndexable, GBP_CITIES } from "@/lib/gbp";
import { POSTS } from "@/lib/posts";
import { ES_PATHS, esAlternates } from "@/lib/es";
import { TEXAS_CITIES } from "@/lib/texasMedspa";
import { VS_PAGES, GUIDE_PATH } from "@/lib/vsPages";
import { MEDSPA_SERVICE_LIST } from "@/lib/medspaServicePages";

/**
 * Last real content update for non-blog pages. Bump this by hand when page
 * copy changes; don't use `new Date()` (a lastmod that is always "now" teaches
 * Google to ignore it). Blog posts use their own dates from lib/posts.ts.
 * changefreq and priority are left out on purpose: Google ignores both.
 */
const PAGES_LAST_MODIFIED = "2026-11-21";

/** Pages updated after PAGES_LAST_MODIFIED, with their own date. */
const PAGE_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-11-22",
  "/about": "2026-11-22",
  "/pricing": "2026-11-22",
  "/medspa-marketing": "2026-11-25",
  "/growth99-alternatives": "2026-11-22",
  "/med-spa-marketing-agency-pricing": "2026-11-22",
  [GUIDE_PATH]: "2026-11-25",
  ...Object.fromEntries(VS_PAGES.map((v) => [v.path, "2026-11-22"])),
  "/services/lead-management": "2026-11-22",
  "/research/texas-med-spa-website-report-2026": "2026-11-22",
  "/scanrank": "2026-11-22",
  "/med-spa-ad-checker": "2026-11-25",
  "/areas-we-serve": "2026-11-22",
  "/built-by-rgvpm": "2026-11-22",
  "/company-facts": "2026-11-22",
  ...Object.fromEntries(TEXAS_CITIES.map((c) => [c.path, "2026-11-22"])),
  ...Object.fromEntries(MEDSPA_SERVICE_LIST.map((p) => [p.path, p.slug === "website" ? "2026-11-25" : "2026-11-22"])),
};

/** Pages with an /es twin (both sides of each pair). */
const HAS_SPANISH_TWIN = new Set<string>([...Object.values(ES_PATHS), "/", "/pricing", "/services/website-design"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/services",
    "/medspa-marketing",
    "/growth99-alternatives",
    "/med-spa-marketing-agency-pricing",
    // Buyer's guide + RGVPM vs <competitor> pages (lib/vsPages.ts).
    GUIDE_PATH,
    ...VS_PAGES.map((v) => v.path),
    // Med spa service pages (lib/medspaServicePages.ts).
    ...MEDSPA_SERVICE_LIST.map((p) => p.path),
    "/research/texas-med-spa-website-report-2026",
    "/scanrank",
    "/med-spa-ad-checker",
    "/areas-we-serve",
    // Texas metro med spa pages (lib/texasMedspa.ts).
    ...TEXAS_CITIES.map((c) => c.path),
    "/digital-marketing-harlingen-tx",
    "/pricing",
    // Paid-traffic offer page. Indexable and canonical to itself — it targets
    // "$0 upfront website" intent that /pricing doesn't. Its thank-you page is
    // noindex and deliberately absent here.
    "/website-offer",
    "/learn-claude-code",
    "/claude-code-templates",
    "/about",
    // Quotable company facts in FAQPage schema (lib/companyFacts.ts).
    "/company-facts",
    // Landing page for the "Designed by RGV Performance Marketing" credit links.
    "/built-by-rgvpm",
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
    ...Object.values(ES_PATHS),
  ].map((path) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: PAGE_LAST_MODIFIED[path] ?? PAGES_LAST_MODIFIED,
    // English/Spanish pairs list each other as hreflang alternates.
    ...(HAS_SPANISH_TWIN.has(path) ? { alternates: { languages: esAlternates(path) } } : {}),
  }));

  // Blog posts: the post's own modified date (falls back to published).
  const posts = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.dateModified || p.datePublished,
  }));

  return [...pages, ...posts];
}
