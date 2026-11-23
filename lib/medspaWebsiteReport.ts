/**
 * "State of Med Spa Websites 2026": aggregate results only.
 *
 * Source: a homepage scan RGV Performance Marketing ran on 2026-11-22. The raw
 * per-site file (with business names) stays private and is never published
 * here. Every number below is a count or share across the whole sample, so no
 * practice is named or singled out. Percentages are of REPORT.sample unless a
 * field says otherwise.
 */

export const REPORT = {
  path: "/research/state-of-med-spa-websites-2026",
  title: "State of Med Spa Websites 2026",
  datePublished: "2026-11-22",
  dateCollected: "2026-11-22",
  /** Unique practice domains in the starting lists. */
  domains: 867,
  /** Homepages analyzed (the denominator for every share). */
  sample: 686,
  excluded: {
    parked: 72, // parked, expired, "coming soon" or empty pages
    unreachable: 108, // DNS/TLS failures, timeouts, 4xx/5xx, bot walls, robots.txt disallow
    agencyClients: 1, // RGV Performance Marketing's own clients, left out on purpose
  },
  regions: [
    { name: "Dallas-Fort Worth", n: 255 },
    { name: "Rio Grande Valley", n: 125 },
    { name: "Austin", n: 92 },
    { name: "San Antonio", n: 83 },
    { name: "Houston", n: 81 },
    { name: "Corpus Christi area", n: 40 },
    { name: "Arizona & Florida", n: 10 },
  ],
} as const;

/** Share of homepages with each item, highest first. */
export const HAVE_IT = [
  { label: "Mobile viewport tag", pct: 99.7 },
  { label: "HTTPS works", pct: 99.6 },
  { label: "Tap-to-call phone link", pct: 65.9 },
  { label: "Link to an online booking platform", pct: 56.7 },
  { label: "LocalBusiness-type schema", pct: 51.6 },
  { label: "Reviews or testimonials on the page", pct: 49.4 },
  { label: "A file at /llms.txt", pct: 42.0 },
  { label: "Text or chat option", pct: 20.6 },
  { label: "Treatment prices published", pct: 19.1 },
  { label: "FAQ schema", pct: 6.7 },
] as const;

/** Booking platforms, as a share of the 389 homepages that link to one. */
export const BOOKING_WITH_PLATFORM = 389;
export const BOOKING_PLATFORMS = [
  { label: "Boulevard", pct: 16.7 },
  { label: "Aesthetic Record", pct: 13.6 },
  { label: "Square", pct: 10.3 },
  { label: "Zenoti", pct: 8.0 },
  { label: "Vagaro", pct: 6.4 },
  { label: "GlossGenius", pct: 5.7 },
  { label: "PatientNow", pct: 5.4 },
  { label: "Jane", pct: 4.9 },
  { label: "AestheticsPro", pct: 4.9 },
  { label: "Moxie", pct: 4.6 },
  { label: "Mangomint", pct: 3.6 },
  { label: "Others (25+ tools)", pct: 19.8 },
] as const;

/** llms.txt split across the full sample (sums to 100). */
export const LLMS_SPLIT = [
  { label: "Made by the site platform or an SEO plugin", pct: 22.7, color: "var(--blue)" },
  { label: "Follows a site-builder template", pct: 6.9, color: "var(--blue-light)" },
  { label: "Looks written for the practice", pct: 12.4, color: "var(--navy)" },
  { label: "No llms.txt", pct: 58.0, color: "var(--cream-dark)" },
] as const;

/** How many of 8 basics each homepage passed (count of sites per score). */
export const SCORE_DIST = [1, 1, 39, 121, 169, 150, 141, 53, 11] as const;

export const SPEED = {
  htmlKbMedian: 248,
  htmlKbP75: 574,
  htmlKbP90: 1067,
  htmlOver500Pct: 28.1,
  ttfbMedian: 0.35,
  ttfbP90: 1.08,
  ttfbOver1sPct: 10.6,
};

/** Detector accuracy on 15 randomly drawn homepages checked by hand. */
export const ACCURACY = {
  sites: 15,
  checks: 135,
  correct: 133,
  bookingCorrect: 13,
};

export const HEADLINES = [
  { num: "43", unit: "%", text: "of homepages had no link to an online booking platform." },
  { num: "34", unit: "%", text: "had no tap-to-call phone link, so a mobile visitor has to copy the number." },
  { num: "79", unit: "%", text: "gave visitors no way to text or chat. Only 7% had a text-message link." },
  { num: "38", unit: "%", text: "offered neither online booking nor text or chat. Visitors could only call or fill out a form." },
  { num: "81", unit: "%", text: "published no treatment prices on the homepage or a linked price page." },
  { num: "48", unit: "%", text: "had no LocalBusiness-type schema telling Google and AI tools who and where they are." },
  { num: "54", unit: "%", text: "of the llms.txt files we found came from the website platform or an SEO plugin. Only 12% of sites had one that looked written for the practice." },
  { num: "11", unit: "", text: "sites out of 686 passed all eight basics we checked. The median site passed five." },
] as const;
