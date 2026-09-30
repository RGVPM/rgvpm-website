import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import { IndustryStrip } from "@/components/Sections";
import Capabilities from "@/components/home/Capabilities";
import AiSection from "@/components/home/AiSection";
import Process from "@/components/home/Process";
import SocialFollow from "@/components/home/SocialFollow";
import BlogEditorial from "@/components/home/BlogEditorial";
import HomeFaq from "@/components/home/HomeFaq";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, organizationSchema, websiteSchema, faqSchema, SITE } from "@/lib/site";
import { homeFaqs } from "@/lib/faqs";

export default function Home() {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), organizationSchema(), websiteSchema(), faqSchema(homeFaqs)]} />
      <main>
        <HomeHero />
        {/* Client logo marquee — each logo links out to the client's site. */}
        <IndustryStrip />
        <Capabilities />
        <AiSection />
        <Process />
        <SocialFollow />
        <BlogEditorial />
        <HomeFaq />
        <FinalCta />
      </main>
    </>
  );
}

const HOME_TITLE = "Harlingen Marketing Agency & SEO | RGV Performance Marketing";
const HOME_DESCRIPTION =
  "Harlingen marketing agency for RGV small businesses: websites, local SEO and Google Ads that bring in calls, plus AI that follows up. Month-to-month plans.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: SITE.url },
  openGraph: { type: "website", url: SITE.url, title: HOME_TITLE, description: HOME_DESCRIPTION, siteName: SITE.name },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: HOME_DESCRIPTION },
};
