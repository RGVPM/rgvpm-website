export interface Client {
  /** Client business name (used as the logo's alt text and text fallback). */
  name: string;
  /** Client website — rendered as a real dofollow backlink (passes SEO value to them). */
  url: string;
  /** Path to the logo file in /public/clients/, e.g. "/clients/ccl-contracting.png".
   *  If omitted, the client name renders as a text wordmark instead. */
  logo?: string;
}

/**
 * Featured client logos for the homepage "client" marquee.
 * Each entry becomes a dofollow link to the client's site (a backlink for them).
 *
 * TODO(owner): add your real clients. For each:
 *   1. Drop their logo (transparent PNG/SVG, ~light on dark works best) in public/clients/
 *   2. Add an entry below with their name, website URL, and the logo path.
 * The marquee section stays hidden until at least one client is listed.
 *
 * Example:
 *   { name: "CCL Contracting", url: "https://cclcontracting.com", logo: "/clients/ccl-contracting.png" },
 */
export const CLIENTS: Client[] = [
];
