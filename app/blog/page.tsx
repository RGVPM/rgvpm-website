import type { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";
import Breadcrumbs from "@/components/Breadcrumbs";
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
        <div className="rg-container">
          <header className="rg-bmast">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} inHero />
            <h1 className="rg-bmast-title">
              Marketing made practical. <em>No jargon required.</em>
            </h1>
            <p className="rg-bmast-text">
              Plain-English guides on getting found on Google, what marketing really costs, and putting AI to work in your business.
            </p>
          </header>

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

        <InnerCTA heading="Rather Have Us Do It?" text="You don't need to read a guide to start growing. Book a quick call and we'll tell you which hat to hand off first." />
      </main>
    </>
  );
}
