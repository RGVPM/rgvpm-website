import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the phone / other LAN devices to load dev JS chunks (HMR + hydration)
  // when testing via the local network IP. Without this, Next.js 16 blocks the
  // cross-origin dev resources and the client never hydrates, leaving the page
  // visible but non-interactive on those devices.
  allowedDevOrigins: ["192.168.1.233"],
  async redirects() {
    return [
      // /results was retired (Sept 2026). Google had it indexed, and the
      // hero + client marquee used to link there, so send stragglers home.
      { source: "/results", destination: "/", permanent: true },
      // City SEO blog posts retired Sept 2026: near-duplicates of each other
      // that competed with the city service pages for the same keywords.
      { source: "/blog/brownsville-seo-how-to-rank-local-business", destination: "/local-seo-brownsville-tx", permanent: true },
      { source: "/blog/harlingen-seo-how-to-rank-local-business", destination: "/local-seo-harlingen-tx", permanent: true },
      { source: "/blog/mcallen-seo-how-to-rank-local-business", destination: "/local-seo-mcallen-tx", permanent: true },
    ];
  },
};

export default nextConfig;
