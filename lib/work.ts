export interface Project {
  /** Client business name — used as the visible project title and image alt. */
  name: string;
  /** Industry label shown under the project name. */
  industry: string;
  /** Screenshot in /public/work/ — 1200x750 (16:10) keeps the browser
   *  mockups a uniform height. Omit and the card falls back to a
   *  typographic panel, so a missing file never breaks the layout. */
  screenshot?: string;
  /** Live site — rendered as a real dofollow link (a backlink for them). */
  url: string;
  /** City/area served, shown as a small meta line. */
  location: string;
  /** Featured projects lead the first track. */
  featured?: boolean;
}

/**
 * Homepage "recent work" showcase.
 *
 * To add a project:
 *   1. Capture the homepage at 1440x900 and save it to /public/work/
 *      as a 1200x750 .webp (any 16:10 image works — it's object-fit: cover).
 *   2. Add an entry below. Order here is the order on the page.
 * Entries without a `screenshot` still render (typographic fallback),
 * so you can list a project before its image is ready.
 */
export const PROJECTS: Project[] = [
  {
    name: "CCL Contracting",
    industry: "General Contractor",
    screenshot: "/work/ccl-contracting.webp",
    url: "https://www.cclcontracting.com",
    location: "Weslaco, TX",
    featured: true,
  },
  {
    name: "D'Vash Aesthetics",
    industry: "Boutique Med Spa",
    screenshot: "/work/dvash-aesthetics.webp",
    url: "https://www.dvashaesthetics.com",
    location: "Harlingen, TX",
    featured: true,
  },
  {
    name: "Mac's Dove Hunts",
    industry: "Outfitter & Hunting",
    screenshot: "/work/macs-dove-hunts.webp",
    url: "https://www.macsdovehunts.com",
    location: "Mercedes & Donna, TX",
    featured: true,
  },
  {
    name: "RGV Scalp Ink",
    industry: "Scalp Micropigmentation",
    screenshot: "/work/rgv-scalp-ink.webp",
    url: "https://www.rgvscalpinkllc.com",
    location: "McAllen, TX",
  },
  {
    name: "Premium Foam",
    industry: "Spray Foam Insulation",
    screenshot: "/work/premium-foam.webp",
    url: "https://www.cclcontracting.com/spray-foam-insulation/",
    location: "Rio Grande Valley",
  },
  {
    name: "Us To You Mobile Health",
    industry: "Mobile Healthcare",
    screenshot: "/work/us-to-you-mobile-health.webp",
    url: "https://www.ustoyoumobilehealth.com",
    location: "San Antonio, TX",
  },
];

/** Split into two tracks that scroll in opposite directions. */
export function workTracks(): [Project[], Project[]] {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  // Guarantee both tracks are populated even if `featured` isn't set.
  if (rest.length === 0) {
    const mid = Math.ceil(PROJECTS.length / 2);
    return [PROJECTS.slice(0, mid), PROJECTS.slice(mid)];
  }
  return [featured.length ? featured : PROJECTS, rest];
}
