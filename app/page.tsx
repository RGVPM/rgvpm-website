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

export const metadata = {
  alternates: { canonical: SITE.url },
};
