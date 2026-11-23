/**
 * Client websites we designed, shown as phones on the homepage hero and on
 * /built-by-rgvpm. Every phone is a real mobile screenshot of the live site.
 *
 * Screenshots are 585x1266 (a 390x844 phone screen at 1.5x) in
 * /public/work/phone. A `video` is a short muted loop of that site's real
 * hero, played over the screenshot (see components/home/PhoneVideo).
 * Leave `url` out for a site that isn't live yet; its phone renders unlinked.
 */
export type WorkSite = { name: string; short: string; url?: string; screenshot: string; video?: string };

export const SKIN_PERFECTIONS: WorkSite = {
  // Our redesign is live (confirmed 2026-11-22).
  name: "Skin Perfections Medical Spa",
  short: "Skin Perfections",
  url: "https://skinperfectionsrgv.com",
  screenshot: "/work/phone/skinperfections.webp",
  video: "/work/phone/video/skinperfections.mp4",
};

export const DVASH: WorkSite = {
  name: "D'Vash Aesthetics",
  short: "D'Vash",
  url: "https://dvashaesthetics.com",
  screenshot: "/work/phone/dvash.webp",
};

export const GLAMMED_UP: WorkSite = {
  name: "Glammed Up Aesthetics",
  short: "Glammed Up",
  url: "https://glammedupaesthetics.com",
  screenshot: "/work/phone/glammedup.webp",
};

export const NAPLES: WorkSite = {
  // Our redesign is live (confirmed 2026-11-22).
  name: "Naples Beauty Co.",
  short: "Naples Beauty Co.",
  url: "https://naplesbeautyco.com",
  screenshot: "/work/phone/naples.webp",
  video: "/work/phone/video/naples.mp4",
};
