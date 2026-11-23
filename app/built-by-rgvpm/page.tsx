import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, socialMeta, SITE, ENTITY_LINE, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/site";

/**
 * Quiet landing page for the "Designed by / Site by RGV Performance Marketing"
 * credit links on sites we build. Keep it short and generic: no client or
 * partner names beyond the work links below, no offers aimed at any one
 * audience. Query params (?ref=, utm_*) are ignored; the page stays static and
 * the canonical drops them.
 */
const path = "/built-by-rgvpm";
const url = canonical(path);
const description =
  "You clicked a credit on something we built. RGV Performance Marketing is an AI & marketing agency for med spas and aesthetic practices in Harlingen, Texas.";

export const metadata: Metadata = {
  title: "Built by RGVPM",
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `Built by ${SITE.name}`, description }),
};

/** Plain summaries of PLANS in lib/site.ts. Prices live on /pricing only. */
const SERVICES = [
  { name: "Websites", text: "We build your site, host it and keep it updated. Every lead lands in one inbox." },
  { name: "Local SEO & Google profile", text: "We build out your Google Business Profile and add city and service pages." },
  { name: "Content & social", text: "You shoot and we edit. Or we shoot, post and answer your DMs." },
  { name: "Ads", text: "We build and manage your Google or Meta ads. Google and Meta bill the ad spend to you." },
  { name: "AI follow-up", text: "We text back missed calls and follow up with new leads by text and email." },
];

/** Live client sites that carry our footer credit. Names and links only. */
const WORK = [
  { name: "Naples Beauty Co.", url: "https://naplesbeautyco.com" },
  { name: "Skin Perfections Medical Spa", url: "https://skinperfectionsrgv.com" },
  { name: "Glammed Up Aesthetics", url: "https://glammedupaesthetics.com" },
];

export default function BuiltByPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: `Built by ${SITE.name}`,
            description,
            isPartOf: { "@id": WEBSITE_ID },
            about: { "@id": ORGANIZATION_ID },
            publisher: { "@id": ORGANIZATION_ID },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Built by RGVPM", path },
          ]),
        ]}
      />
      <main className="rg-built">
        <div className="rg-container rg-built-wrap">
          <span className="rg-label" style={{ color: "var(--blue-ink)" }}>Built by RGVPM</span>
          <h1 className="rg-display rg-built-h1">You found us through something we built.</h1>
          <p className="rg-built-lede">
            {ENTITY_LINE} We build your website and run the marketing around it.
          </p>

          <section aria-labelledby="built-what" className="rg-built-section">
            <h2 id="built-what" className="rg-built-h2">What we do</h2>
            <ul className="rg-built-list">
              {SERVICES.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}</strong>
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
            <p className="rg-built-note">
              Plans start with the website. You add what you need, month to month.
            </p>
          </section>

          <section aria-labelledby="built-work" className="rg-built-section">
            <h2 id="built-work" className="rg-built-h2">Some of our work</h2>
            <ul className="rg-built-work">
              {WORK.map((w) => (
                <li key={w.url}>
                  <a href={w.url} target="_blank" rel="noopener" className="rg-text-link">{w.name}</a>
                </li>
              ))}
            </ul>
          </section>

          <p className="rg-built-note rg-built-section">
            Derrick and Kelsey Tamez run RGVPM. They each spent 5 years at Aesthetic Record.{" "}
            <Link href="/about" className="rg-text-link">Meet the team</Link>
          </p>

          <div className="rg-built-cta">
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-built-btn">
              Book a call <span aria-hidden="true">→</span>
            </a>
            <Link href="/pricing" className="rg-text-link">See pricing</Link>
          </div>
        </div>
      </main>
    </>
  );
}
