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
    ];
  },
};

export default nextConfig;
