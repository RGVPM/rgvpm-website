import HomeHero from "@/components/home/HomeHero";
import IndustryMarquee from "@/components/home/IndustryMarquee";
import WorkShowcase from "@/components/home/WorkShowcase";
import Capabilities from "@/components/home/Capabilities";
import Process from "@/components/home/Process";
import WhyUs from "@/components/home/WhyUs";
import Approach from "@/components/home/Approach";
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
        <IndustryMarquee />
        <WorkShowcase />
        <Capabilities />
        <Process />
        <WhyUs />
        <Approach />
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
