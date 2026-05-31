import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { IndustryStrip, HowItWorks, WhyUs, CTA } from "@/components/Sections";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <IndustryStrip />
        <HowItWorks />
        <Services />
        <Pricing />
        <WhyUs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
