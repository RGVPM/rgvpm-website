import type { Metadata } from "next";
import Link from "next/link";
import { canonical, breadcrumbSchema, SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";

const specialized = [
  {
    href: "/services/website-design",
    icon: "target" as const,
    title: "Website Design",
    text: "Fast, mobile-first websites with SEO and lead capture built in — designed to rank on Google and convert visitors into leads.",
  },
  {
    href: "/services/ai-implementation",
    icon: "cpu" as const,
    title: "AI Implementation",
    text: "Put AI to work in your business — an AI voice receptionist, instant lead follow-up, chatbots, and workflow automation that runs the busywork for you.",
  },
];

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

        {/* Specialized services */}
        <section style={{ padding: "0 0 96px", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
              <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", background: "var(--teal-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--teal)" }}>
                Specialized Services
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
                Website Design &amp; AI Implementation
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="why-grid-responsive">
              {specialized.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="svc-card"
                  style={{ background: "#fff", border: "1px solid var(--border)", borderTop: "4px solid var(--orange)", borderRadius: 10, padding: 32, textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "var(--orange-wash)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)", marginBottom: 16 }}>
                    <Icon name={svc.icon} size={26} color="var(--orange)" />
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{svc.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{svc.text}</p>
                  <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: "var(--orange)" }}>Learn more →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
