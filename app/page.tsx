import type { Metadata } from "next";
import "@/components/home/home.css";
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

export default function Home() {
  return (
    <>
      {/* Business + WebSite nodes are emitted site-wide from app/layout.tsx. */}
      <JsonLd data={[faqSchema(homeFaqs)]} />
      <main className="rg-home">
        <HomeHero />
        <ProofStrip />
        <MedspaSuite />
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
