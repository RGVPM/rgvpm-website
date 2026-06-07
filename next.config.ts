import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the phone / other LAN devices to load dev JS chunks (HMR + hydration)
  // when testing via the local network IP. Without this, Next.js 16 blocks the
  // cross-origin dev resources and the client never hydrates, leaving the page
  // visible but non-interactive on those devices.
  allowedDevOrigins: ["192.168.1.233"],
};

export default nextConfig;
