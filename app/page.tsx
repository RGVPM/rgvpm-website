import HomeHero from "@/components/home/HomeHero";
import Capabilities from "@/components/home/Capabilities";
import Process from "@/components/home/Process";
import HomeProof from "@/components/home/HomeProof";
import LogoStrip from "@/components/home/LogoStrip";
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
        <Capabilities />
        <Process />
        <HomeProof />
        <LogoStrip />
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
