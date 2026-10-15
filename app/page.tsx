import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "@/components/home/afterglow/afterglow.css";
import Sky from "@/components/home/afterglow/Sky";
import NightDrive from "@/components/home/afterglow/NightDrive";
import Motion from "@/components/home/afterglow/Motion";
import HomeHero, { HERO_CTA_ID } from "@/components/home/HomeHero";
import ProofStrip from "@/components/home/ProofStrip";
import MedspaSuite from "@/components/home/MedspaSuite";
import IndustrySwitcher from "@/components/home/IndustrySwitcher";
import Capabilities from "@/components/home/Capabilities";
import Process from "@/components/home/Process";
import PlanLadder from "@/components/home/PlanLadder";
import RiskReversal from "@/components/home/RiskReversal";
import AiSection from "@/components/home/AiSection";
import BlogEditorial from "@/components/home/BlogEditorial";
import HomeFaq from "@/components/home/HomeFaq";
import FinalCta, { FINAL_CTA_ID } from "@/components/home/FinalCta";
import StickyCta from "@/components/home/StickyCta";
import HomeAnalytics from "@/components/home/HomeAnalytics";
import { bookingHref } from "@/components/home/HomePrimitives";
import JsonLd from "@/components/JsonLd";
import { faqSchema, socialMeta, SITE, PLANS_FROM } from "@/lib/site";
import { homeFaqs } from "@/lib/faqs";

/* Homepage-only faces (spec §3). Instantiated here, not in layout.tsx, so
   only "/" downloads them; every other route keeps DM Sans / Bebas.
   Bricolage is the LCP face, so it is the only one preloaded. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-ev-display",
});
const body = Geist({ subsets: ["latin"], display: "swap", variable: "--font-ev-body", preload: false });
const mono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-ev-mono", preload: false });

export default function Home() {
  return (
    <>
      {/* Business + WebSite nodes are emitted site-wide from app/layout.tsx. */}
      <JsonLd data={[faqSchema(homeFaqs)]} />
      {/* rg-home--afterglow scopes every v2 token, font and rule to "/". */}
      <main className={`rg-home rg-home--afterglow ${display.variable} ${body.variable} ${mono.variable}`}>
        <Sky />
        <HomeHero />
        <ProofStrip />
        <MedspaSuite />
        <NightDrive />
        <IndustrySwitcher />
        <Capabilities />
        <Process />
        <PlanLadder />
        <RiskReversal />
        <AiSection />
        <BlogEditorial />
        <HomeFaq />
        <FinalCta />
        <StickyCta
          href={bookingHref("sticky")}
          note={`Websites from $${PLANS_FROM}/mo · Month-to-month`}
          label="Book a free call"
          heroCtaId={HERO_CTA_ID}
          finalId={FINAL_CTA_ID}
        />
        <HomeAnalytics />
        <Motion />
      </main>
    </>
  );
}

// Keep "AI & Marketing Agency" in the title (owner's positioning call).
const HOME_TITLE = "AI & Digital Marketing Agency | Harlingen TX & Nationwide";
const HOME_DESCRIPTION =
  "AI & marketing agency in Harlingen, TX, serving businesses nationwide: websites, SEO, Google Ads and AI that follows up on every lead. From $397/mo.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: SITE.url },
  ...socialMeta({ url: SITE.url, title: HOME_TITLE, description: HOME_DESCRIPTION }),
};
