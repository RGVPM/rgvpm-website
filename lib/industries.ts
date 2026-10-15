/**
 * Homepage industry switcher content. Every screenshot and logo is a real
 * client asset already in /public.
 * TODO(owner): confirm each client's category and permission to feature
 * (spec section 6, decision #7).
 * The CCL screenshot is a clean capture without the site's chat pop-up
 * (public/work/ccl-contracting-clean.webp).
 */
export type Industry = {
  id: string;
  label: string;
  lines: string;
  setup: [string, string, string];
  shot: { src: string; caption: string; alt: string; url?: string };
  logos?: { src: string; alt: string; width: number; height: number }[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "contractors",
    label: "Contractors & home services",
    lines:
      "Your customers search “near me” and call one of the first few names they see. If a quote request sits until tomorrow, someone else gets the job.",
    setup: [
      "A site with a page for each service and city you cover",
      "A Google Business Profile with real job photos",
      "Quote requests and calls in one inbox on your phone",
    ],
    shot: {
      src: "/work/ccl-contracting-clean.webp",
      caption: "CCL Contracting",
      alt: "Homepage of the CCL Contracting website",
      url: "https://www.cclcontracting.com",
    },
    // Logos, not a lone thumbnail, so every panel's proof column ends the
    // same way. V&S Painting is a real client (lib/clients.ts); its category
    // here is pending owner confirmation with the rest of decision #7.
    logos: [
      { src: "/clients/premium-foam-trim.png", alt: "Premium Foam Spray Foam Insulation logo", width: 599, height: 362 },
      { src: "/clients/vs-painting.png", alt: "V&S Painting & More logo", width: 356, height: 123 },
    ],
  },
  {
    id: "clinics",
    label: "Clinics & wellness",
    lines:
      "Patients read your Google profile and your website before they ever call. They want to book without a phone tag marathon.",
    setup: [
      "A booking-first site that loads fast on a phone",
      "Local SEO for the services you offer",
      "A HIPAA Business Associate Addendum in our Terms",
    ],
    shot: {
      src: "/work/us-to-you-mobile-health.webp",
      caption: "Us To You Mobile Health",
      alt: "Homepage of the Us To You Mobile Health website",
      url: "https://www.ustoyoumobilehealth.com",
    },
    logos: [
      { src: "/clients/neuromotion-rehab.png", alt: "NeuroMotion Rehabilitation logo", width: 600, height: 600 },
      { src: "/clients/6-day-medical-weight-loss.png", alt: "6 Day Medical Weight Loss logo", width: 621, height: 168 },
    ],
  },
  {
    id: "beauty",
    label: "Beauty & personal care",
    lines:
      "Clients find you on Instagram, then check Google before they book. Your feed and your site need to look like the same business.",
    setup: [
      "A site that matches your brand and links straight to booking",
      "Content Crew: you shoot, we edit a reel and a branded post every week",
      "Review requests after each visit (Build the Machine)",
    ],
    shot: {
      src: "/work/rgv-scalp-ink.webp",
      caption: "RGV Scalp Ink",
      alt: "Homepage of the RGV Scalp Ink website",
      url: "https://www.rgvscalpinkllc.com",
    },
    logos: [
      { src: "/clients/glammed-up-aesthetics.png", alt: "Glammed Up Aesthetics logo", width: 700, height: 383 },
    ],
  },
  {
    id: "local",
    label: "Food, retail & recreation",
    lines: "People pick where to go from the map on their phone. Hours, photos and reviews decide it.",
    setup: [
      "A Google Business Profile that’s complete and current",
      "A simple site with your menu or products, hours and directions",
      "Social posts that show what’s new this week",
    ],
    shot: {
      src: "/work/macs-dove-hunts.webp",
      caption: "Mac’s Dove Hunts",
      alt: "Homepage of the Mac’s Dove Hunts website",
      url: "https://www.macsdovehunts.com",
    },
    logos: [
      { src: "/clients/tsukie-coffee.png", alt: "Tsukie Coffee logo", width: 700, height: 694 },
      { src: "/clients/la-feria-coop.png", alt: "La Feria Co-op Gin & Supply logo", width: 363, height: 278 },
    ],
  },
];
