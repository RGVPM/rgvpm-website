import type { Metadata } from "next";
import PricingTabs from "@/components/PricingTabs";
import { SITE } from "@/lib/site";

/**
 * Unlisted checkout page: the full plan grid with working payment links.
 * Sent to prospects after a call; the public /pricing page only books calls.
 *
 * noindex and absent from the sitemap and every nav. Not linked from
 * anywhere on the site. It is private by obscurity, not access control.
 */
export const metadata: Metadata = {
  title: "Your Plan Options",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/plans/start` },
};

export default function PlansStartPage() {
  return (
    <main>
      <div style={{ background: "#0f1c33", paddingTop: 100 }} />
      <PricingTabs mode="private" />
    </main>
  );
}
