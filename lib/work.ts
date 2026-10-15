/**
 * Client sites shown in the homepage "Night Drive" showcase (#work).
 *
 * Every entry is a site we built and that is live today. The captures in
 * public/work/scroll/ are the top of each live page (desktop 1200x3500,
 * mobile 780x7200), made with scripts/capture-work.mjs. Re-capture every
 * quarter or when a client site changes: stale captures are the main risk.
 *
 * Lines stay descriptive: no metrics, no outcomes. Each one was checked
 * against the live site. Cities are left out unless verified.
 */
export interface WorkSlide {
  slug: string;
  name: string;
  url: string;
  host: string;
  industry: string;
  line: string;
}

export const CAPTURE = {
  desktop: { width: 1200, height: 3500 },
  mobile: { width: 780, height: 7200 },
} as const;

export const WORK: WorkSlide[] = [
  {
    slug: "us-to-you-mobile-health",
    name: "Us To You Mobile Health",
    url: "https://www.ustoyoumobilehealth.com",
    host: "ustoyoumobilehealth.com",
    industry: "Mobile health care",
    line: "A site that explains mobile care simply and keeps booking within reach.",
  },
  {
    slug: "rgv-scalp-ink",
    name: "RGV Scalp Ink",
    url: "https://www.rgvscalpinkllc.com",
    host: "rgvscalpinkllc.com",
    industry: "Scalp micropigmentation",
    line: "A dark, editorial studio site with a consultation button in every section.",
  },
  {
    slug: "premium-foam",
    name: "Premium Foam",
    url: "https://www.cclcontracting.com/spray-foam-insulation/",
    host: "cclcontracting.com/spray-foam-insulation",
    industry: "Spray foam insulation",
    line: "Seven foam systems, each explained plainly, with an estimate request up front.",
  },
  // Slide 4 is CCL, not Mac's Dove Hunts: the Mac's mobile capture shows the
  // live site's own clipped "Guaranteed" heading, and a re-capture with
  // reveals forced on came out the same (spec §6 S4 fallback).
  {
    slug: "ccl-contracting",
    name: "CCL Contracting",
    url: "https://www.cclcontracting.com",
    host: "cclcontracting.com",
    industry: "General contractor",
    line: "Six services laid out plainly, with a free estimate one tap away in the header.",
  },
];
