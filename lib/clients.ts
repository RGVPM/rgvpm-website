export interface Client {
  /** Client business name (used as the logo's alt text and text fallback). */
  name: string;
  /** Client website — rendered as a real dofollow backlink (passes SEO value to them).
   *  Omit it and the logo renders as a plain, unlinked image. */
  url?: string;
  /** Path to the logo file in /public/clients/, e.g. "/clients/ccl-contracting.png".
   *  If omitted, the client name renders as a text wordmark instead. */
  logo?: string;
  /** Optional per-logo max height in px (default 84) — for visually balancing
   *  logos that read larger/smaller than the rest. */
  maxHeight?: number;
}

/**
 * Client logos for the homepage "Trusted by" marquee.
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
  { name: "CCL Contracting", url: "https://www.cclcontracting.com", logo: "/clients/ccl-contracting.png", maxHeight: 70 },
  { name: "Premium Foam — Spray Foam Insulation", url: "https://www.cclcontracting.com/spray-foam-insulation/", logo: "/clients/premium-foam.png" },
  { name: "RGV Scalp Ink", url: "https://www.rgvscalpinkllc.com", logo: "/clients/rgv-scalp-ink.png" },
  { name: "Us To You Mobile Health", url: "https://www.ustoyoumobilehealth.com", logo: "/clients/us-to-you-mobile-health.webp" },
  { name: "D'Vash Aesthetics", url: "https://www.dvashaesthetics.com", logo: "/clients/dvash-aesthetics.png" },
  // Logo is a white-on-dark wordmark (invisible on the cream strip) and no
  // light/transparent version exists yet — renders as a Bebas text wordmark.
  // TODO(owner): drop a dark or transparent logo in /clients to swap in.
  { name: "Mac's Dove Hunts", url: "https://www.macsdovehunts.com" },
  { name: "NeuroMotion Rehabilitation", url: "https://neuromotionrehabilitation.com", logo: "/clients/neuromotion-rehab.png", maxHeight: 92 },
  // Unlinked by request.
  { name: "6 Day Medical Weight Loss", logo: "/clients/6-day-medical-weight-loss.png", maxHeight: 56 },
  { name: "V&S Painting & More", url: "https://vspaintingaustin.com", logo: "/clients/vs-painting.png", maxHeight: 60 },
  { name: "STX Swing Doctor", url: "https://www.stxswingdoctor.com", logo: "/clients/stx-swing-doctor.png", maxHeight: 94 },
  // Recolored navy from the champagne original so it reads on the cream strip.
  { name: "The Spa Business Coach", logo: "/clients/the-spa-business-coach.png", maxHeight: 70 },
  // No website yet (Instagram only), so it renders unlinked.
  { name: "Tsukie Coffee", logo: "/clients/tsukie-coffee.png", maxHeight: 96 },
];
