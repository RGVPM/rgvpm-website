import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import MetaPixel from "@/components/offer/MetaPixel";
import { OfferTopBar, StickyMobileCta } from "@/components/offer/OfferChrome";
import OfferHero from "@/components/offer/OfferHero";
import LeadFlow from "@/components/offer/LeadFlow";
import OfferPlans from "@/components/offer/OfferPlans";
import ValueAnchor from "@/components/offer/ValueAnchor";
import WhyRgvpm from "@/components/offer/WhyRgvpm";
import HowItWorks from "@/components/offer/HowItWorks";
import OfferFaq from "@/components/offer/OfferFaq";
import FinalCta from "@/components/offer/FinalCta";
import OfferFooter from "@/components/offer/OfferFooter";

import { OFFER, OFFER_FAQS, PLANS } from "@/lib/offer";
import {
  ORGANIZATION_ID,
  SERVICE_AREA_CITIES,
  SITE,
  breadcrumbSchema,
  canonical,
  faqSchema,
  localBusinessSchema,
} from "@/lib/site";

const PATH = "/website-offer";

export const metadata: Metadata = {
  title: "$0 Upfront Website for Texas Businesses",
  description:
    "RGV Performance Marketing builds professional websites for Texas businesses with $0 upfront website build fee when enrolled in a qualifying 12-month Website + CRM or SEO plan.",
  alternates: { canonical: canonical(PATH) },
  openGraph: {
    type: "website",
    url: canonical(PATH),
    siteName: SITE.name,
    title: "$0 Upfront Website for Texas Businesses | RGV Performance Marketing",
    description:
      "Your new website, $0 upfront build fee with a qualifying 12-month plan. Website, CRM, lead capture and ongoing support from $299/month. Optional SEO from $549/month.",
  },
  twitter: {
    card: "summary_large_image",
    title: "$0 Upfront Website for Texas Businesses | RGV Performance Marketing",
    description:
      "Your new website, $0 upfront build fee with a qualifying 12-month plan. Website, CRM, lead capture and ongoing support from $299/month.",
  },
};

/**
 * The $0-upfront website offer — a paid-traffic landing page.
 *
 * Runs without the global <nav> and <footer>: both are hidden by the
 * `.lp-root` rules in globals.css (scoped with :has(), so nothing else on
 * the site is touched) and replaced with OfferTopBar and OfferFooter.
 * Everything here is a server component except the pixel loader and the two
 * tracked-CTA helpers, so the route ships almost no JavaScript.
 *
 * All copy, pricing, links and legal text come from lib/offer.ts.
 */
export default function WebsiteOfferPage() {
  return (
    <div className="lp-root">
      <MetaPixel />
      <JsonLd
        data={[
          localBusinessSchema(),
          serviceSchema(),
          faqSchema(OFFER_FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "$0 Upfront Website Offer", path: PATH },
          ]),
        ]}
      />

      <OfferTopBar />

      <main id="offer-main">
        <OfferHero />
        <LeadFlow />
        <OfferPlans />
        <ValueAnchor />
        <WhyRgvpm />
        <HowItWorks />
        <OfferFaq />
        <FinalCta />
        <OfferFooter />
      </main>

      <StickyMobileCta />
    </div>
  );
}

/**
 * Service node with one Offer per plan.
 *
 * Prices are the recurring monthly fee — the thing actually charged — not
 * the waived build fee, so a rich result can never read as "$0 website".
 * The 12-month condition rides along in each offer's description and
 * eligibility note.
 */
function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical(PATH)}#service`,
    name: "Website + CRM and Growth + SEO plans",
    serviceType: "Website design, lead management and SEO",
    description:
      "Professional website design, hosting, maintenance, lead capture and CRM for Texas businesses, with the standard website build fee waived on enrollment in a qualifying 12-month service agreement.",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      ...SERVICE_AREA_CITIES.map((name) => ({ "@type": "City", name })),
      { "@type": "State", name: "Texas" },
    ],
    url: canonical(PATH),
    offers: PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: `${plan.tagline} Standard website build fee waived with a qualifying ${OFFER.agreementMonths}-month service agreement; monthly service fees apply.`,
      price: plan.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      eligibleCustomerType: "https://schema.org/Business",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price,
        priceCurrency: "USD",
        unitText: "MONTH",
        billingDuration: OFFER.agreementMonths,
        billingIncrement: 1,
      },
    })),
  };
}
