import type { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, founderRef, SITE, ORGANIZATION_ID, socialMeta } from "@/lib/site";
import { POSTS } from "@/lib/posts";

const url = canonical("/blog");

export const metadata: Metadata = {
  title: "Blog — Local Marketing Tips for Small Businesses",
  description:
    "Practical local marketing guides for Rio Grande Valley small businesses — local SEO, Google Maps rankings, website costs, paid ads, and more.",
  alternates: { canonical: url },
  ...socialMeta({
    url,
    title: `Blog | ${SITE.name}`,
    description:
      "Practical local marketing insights for small businesses in the Rio Grande Valley.",
  }),
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
    "@id": `${canonical(`/blog/${p.slug}`)}#article`,
    headline: p.title,
    description: p.description,
    url: canonical(`/blog/${p.slug}`),
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    author: founderRef(),
  })),
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
          tone="blue"
          eyebrow="Blog"
          title={
            <>
              Marketing Made Practical.
              <br />
              <span style={{ color: "var(--navy)" }}>No Jargon Required.</span>
            </>
          }
          subtitle="Plain-English guides on getting found on Google, what marketing really costs, and putting AI to work in your business."
          crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
        />

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <BlogIndex
              posts={[...POSTS]
                .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
                .map((p) => ({
                  slug: p.slug,
                  title: p.title,
                  excerpt: p.excerpt,
                  category: p.category,
                  readMinutes: p.readMinutes,
                  date: p.datePublished,
                }))}
            />
          </div>
        </section>

        <InnerCTA heading="Rather Have Us Do It?" text="You don't need to read a guide to start growing. Book a quick call and we'll tell you which hat to hand off first." />
      </main>
    </>
  );
}
