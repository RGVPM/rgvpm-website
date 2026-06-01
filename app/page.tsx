import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { IndustryStrip, HowItWorks, WhyUs, CTA } from "@/components/Sections";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, faqSchema, SITE } from "@/lib/site";
import { homeFaqs } from "@/lib/faqs";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How RGV Performance Marketing grows your business",
  description:
    "Our three-step process to get a local business found online and turning searches into booked customers.",
  totalTime: "P14D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Diagnose",
      text: "We audit your current digital presence — website, Google profile, competitors — and pinpoint exactly where you're losing leads and visibility.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Build",
      text: "We set up your growth engine: Google Business Profile optimization, NAP consistency, lead capture, automated follow-up, newsletters, and ad campaigns — all in one coordinated push.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Grow",
      text: "We execute, optimize, and report every month. You see exactly what's working, what we're improving, and how every dollar is performing.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), faqSchema(homeFaqs), howToSchema]} />
      <main>
        <Hero />
        <Marquee />
        <IndustryStrip />
        <HowItWorks />
        <WhyUs />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}

export const metadata = {
  alternates: { canonical: SITE.url },
};
