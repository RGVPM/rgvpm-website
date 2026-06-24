import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { IndustryStrip, HowItWorks, WhyUs, CTA } from "@/components/Sections";
import FAQ from "@/components/FAQ";
import HomeBlogStrip from "@/components/HomeBlogStrip";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, organizationSchema, websiteSchema, faqSchema, SITE } from "@/lib/site";
import { homeFaqs } from "@/lib/faqs";

export default function Home() {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), organizationSchema(), websiteSchema(), faqSchema(homeFaqs)]} />
      <main>
        <Hero />
        <Marquee />
        <IndustryStrip />
        <HowItWorks />
        <WhyUs />
        <HomeBlogStrip />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}

export const metadata = {
  alternates: { canonical: SITE.url },
};
