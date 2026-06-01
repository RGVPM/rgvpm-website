import type { Metadata } from "next";
import { canonical, breadcrumbSchema, SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";

const url = canonical("/services");

export const metadata: Metadata = {
  title: "Digital Marketing Services for Local Businesses",
  description:
    "Local SEO, Google Business Profile, paid advertising, SMS & email marketing, lead management, and social media — everything a local business needs to grow online.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Digital Marketing Services | ${SITE.name}`,
    description:
      "Everything a local business needs to get found online and turn searches into booked customers.",
    siteName: SITE.name,
  },
};

export default function ServicesHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <main>
        <PageHero
          eyebrow="Our Services"
          title="Digital Marketing Services for Local Businesses"
          subtitle="From showing up on Google to turning leads into booked appointments, our services work together as one coordinated growth engine — locally rooted and built to scale."
          crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
        />

        <Services />

        <InnerCTA />
      </main>
    </>
  );
}
