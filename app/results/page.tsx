import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WorkShowcase from "@/components/home/WorkShowcase";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, localBusinessSchema, SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/work";

const url = canonical("/results");

export const metadata: Metadata = {
  title: "Our Work — Websites We've Designed for RGV Businesses",
  description:
    "Real websites we designed and launched for Rio Grande Valley businesses — contractors, med spas, healthcare, and outfitters. Every one is live. Click through and see it for yourself.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Our Work | ${SITE.name}`,
    description:
      "Real websites we designed and launched for real Rio Grande Valley businesses.",
    siteName: SITE.name,
  },
};

export default function ResultsPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Results", path: "/results" },
          ]),
          /**
           * The portfolio as an ItemList. Every entry is a real, live client
           * site already listed in lib/work.ts, so this asserts nothing the
           * page doesn't show — it just makes the list legible to crawlers
           * and AI answer engines.
           */
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Client work by ${SITE.name}`,
            itemListElement: PROJECTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: p.url,
            })),
          },
        ]}
      />
      <main>
        <PageHero
          eyebrow="Results"
          title="Look at the Work. Then Decide."
          subtitle="Every site below is live and running for a client right now — contractors, med spas, healthcare, outfitters. Click any one and see it for yourself."
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Results", path: "/results" },
          ]}
        />
        {/* Header off: PageHero above already carries the h1 and the intro. */}
        <WorkShowcase withHeader={false} />
        <InnerCTA
          heading="Want This For Your Business?"
          text="Tell us what you're trying to grow and we'll map out the work — no pressure, no obligation."
        />
      </main>
    </>
  );
}
