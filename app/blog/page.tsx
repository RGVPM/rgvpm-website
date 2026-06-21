import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, SITE, ORGANIZATION_ID } from "@/lib/site";
import { POSTS } from "@/lib/posts";

const url = canonical("/blog");

export const metadata: Metadata = {
  title: "Blog — Local Marketing Tips for Small Businesses",
  description:
    "Practical local marketing guides for Rio Grande Valley small businesses — local SEO, Google Maps rankings, website costs, paid ads, and more.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Blog | ${SITE.name}`,
    description: "Practical local marketing insights for small businesses in the Rio Grande Valley.",
    siteName: SITE.name,
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE.name} Blog`,
  description: "Practical local marketing insights for small businesses in the Rio Grande Valley.",
  url,
  publisher: { "@id": ORGANIZATION_ID },
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: canonical(`/blog/${p.slug}`),
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    author: { "@id": ORGANIZATION_ID },
  })),
};

const cardAccents = ["var(--orange)", "var(--teal)", "#6E86B8"];

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
          subtitle="Straight-talking guides to help Rio Grande Valley businesses get found online and turn searches into customers."
          accent="var(--teal)"
          crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
        />

        {/* Article list */}
        <section style={{ padding: "80px 0 88px", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="svc-grid-responsive">
              {POSTS.map((p, i) => {
                const accent = cardAccents[i % cardAccents.length];
                return (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="svc-card"
                    style={{ background: "#fff", border: "1px solid var(--border)", borderTop: `4px solid ${accent}`, borderRadius: 10, padding: 28, textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <Icon name={p.icon} size={23} color={accent} />
                    </div>
                    <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>
                      {p.category} · {p.readMinutes} min
                    </div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", lineHeight: 1.3, marginBottom: 10 }}>{p.title}</h2>
                    <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{p.excerpt}</p>
                    <div style={{ marginTop: "auto", fontSize: 13, fontWeight: 700, color: accent }}>Read the guide →</div>
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
