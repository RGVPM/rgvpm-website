import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, SITE } from "@/lib/site";

const url = canonical("/blog");

export const metadata: Metadata = {
  title: "Blog — Local Marketing Tips for Small Businesses",
  description:
    "Practical local marketing insights for small businesses — SEO, Google Business Profile, paid ads, lead management, and more. New articles coming soon.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Blog | ${SITE.name}`,
    description: "Practical local marketing insights for small businesses. Coming soon.",
    siteName: SITE.name,
  },
};

// Planned content categories — each maps to a service so the empty state still
// drives internal links and signals topical focus to search engines.
const topics = [
  { icon: "search" as const, title: "Local SEO", text: "How local businesses climb the rankings and win the map pack.", href: "/services/local-seo" },
  { icon: "map-pin" as const, title: "Google Business Profile", text: "Getting found, earning reviews, and standing out locally.", href: "/services/google-business-profile" },
  { icon: "megaphone" as const, title: "Paid Advertising", text: "Running Google and Meta ads that produce real leads.", href: "/services/paid-advertising" },
  { icon: "settings" as const, title: "Lead Management", text: "Capturing, responding to, and converting more of your leads.", href: "/services/lead-management" },
  { icon: "chat" as const, title: "SMS & Email", text: "Staying in front of customers with messages they actually read.", href: "/services/sms-email-marketing" },
  { icon: "calendar" as const, title: "Social & Content", text: "Staying top of mind with consistent, bilingual content.", href: "/services/social-media-newsletter" },
];

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE.name} Blog`,
  description: "Practical local marketing insights for small businesses.",
  url,
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={[
          blogSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <main>
        <PageHero
          eyebrow="Blog"
          title="Local Marketing, Made Practical"
          subtitle="Straight-talking insights to help local businesses get found online and turn searches into customers. We're publishing our first articles soon."
          accent="var(--teal)"
          crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
        />

        {/* Empty state */}
        <section style={{ padding: "88px 0 56px", background: "var(--cream)" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: "#fff", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Icon name="chart" size={30} color="var(--teal)" />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3vw,42px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.05, marginBottom: 14 }}>
              Articles Coming Soon
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>
              We&apos;re building a library of practical guides on local SEO, Google Business Profile, paid ads, and lead management — written for busy small-business owners, not marketers. In the meantime, explore the topics we&apos;ll be covering.
            </p>
          </div>
        </section>

        {/* Topic categories */}
        <section style={{ padding: "0 0 88px", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {topics.map((t, i) => {
                const accent = ["var(--orange)", "var(--teal)", "#6E86B8"][i % 3];
                return (
                  <Link
                    key={t.title}
                    href={t.href}
                    className="svc-card"
                    style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 26, textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <Icon name={t.icon} size={22} color={accent} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{t.title}</h3>
                    <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>{t.text}</p>
                    <div style={{ marginTop: 12, fontSize: 12.5, fontWeight: 700, color: accent }}>Explore service →</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <InnerCTA heading="Don't Wait on a Blog Post" text="You don't need to read a guide to start growing. Pick a plan and we'll build your growth engine for you." />
      </main>
    </>
  );
}
