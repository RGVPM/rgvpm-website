import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleToc, { type TocItem } from "@/components/ArticleToc";
import Breadcrumbs from "@/components/Breadcrumbs";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import ReadingProgress from "@/components/ReadingProgress";
import { AR_LEADAR } from "@/lib/arLeadar";
import {
  GUIDES,
  GUIDES_HUB,
  GUIDES_UPDATED,
  GUIDES_UPDATED_LABEL,
  GUIDE_AUTHORS,
  GUIDE_INDEPENDENCE,
  getGuide,
  guidePath,
} from "@/lib/arGuides";
import {
  canonical,
  breadcrumbSchema,
  faqSchema,
  founderRef,
  cofounderRef,
  socialMeta,
  SITE,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/lib/site";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = canonical(guidePath(slug));
  const social = socialMeta({ url, title: guide.metaTitle, description: guide.description, type: "article" });
  return {
    title: { absolute: `${guide.metaTitle} | ${SITE.name}` },
    description: guide.description,
    alternates: { canonical: url },
    ...social,
    openGraph: {
      ...social.openGraph,
      type: "article",
      publishedTime: GUIDES_UPDATED,
      modifiedTime: GUIDES_UPDATED,
      authors: [canonical("/about")],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = canonical(guidePath(slug));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Aesthetic Record & LeadAR Guides", path: GUIDES_HUB.path },
    { name: guide.title, path: guidePath(slug) },
  ];
  const who = GUIDE_AUTHORS[guide.author];
  const author = guide.author === "kelsey" ? cofounderRef() : founderRef();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.description,
    url,
    datePublished: GUIDES_UPDATED,
    dateModified: GUIDES_UPDATED,
    image: `${SITE.url}/opengraph-image`,
    inLanguage: "en-US",
    articleSection: "Aesthetic Record & LeadAR Guides",
    about: [
      { "@type": "SoftwareApplication", name: "Aesthetic Record" },
      { "@type": "SoftwareApplication", name: "LeadAR" },
    ],
    author,
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    citation: guide.sources.map((s) => s.url),
  };

  const toc: TocItem[] = [
    ...guide.stepGroups.map((g) => ({ id: slugify(g.heading), text: g.heading.replace(/^\d+\.\s*/, "") })),
    { id: "tips", text: guide.tips.heading },
    { id: "get-help", text: "When to get help" },
    { id: "questions", text: "Common questions" },
  ];
  const related = guide.related.flatMap((s) => {
    const g = getGuide(s);
    return g ? [g] : [];
  });

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema(crumbs), faqSchema(guide.faqs)]} />
      <ReadingProgress targetId="article" />
      <main>
        <article id="article">
          <div className="rg-ahero rg-ghero">
            <header className="rg-ahead">
              <Breadcrumbs items={crumbs.slice(0, 2)} dark inHero />
              <p className="rg-kicker">Aesthetic Record & LeadAR Guide</p>
              <h1 className="rg-ahead-title">{guide.title}</h1>
              <div className="rg-byline">
                <Image src={who.photo} alt="" width={48} height={48} />
                <p>
                  <Link href="/about">{who.name}</Link>
                  <span>{who.line}</span>
                </p>
              </div>
              <time className="rg-gupdated" dateTime={GUIDES_UPDATED}>{GUIDES_UPDATED_LABEL}</time>
            </header>
          </div>

          <div className="rg-alayout">
            <aside className="rg-arail">
              <ArticleToc items={toc} />
              <Link href={AR_LEADAR.path} className="rg-arail-cta">
                Want help with this? <span aria-hidden="true">→</span>
              </Link>
            </aside>

            <div className="rg-prose">
              <div className="rg-answer">
                <p className="rg-answer-label">Quick answer</p>
                <p>{guide.answer}</p>
              </div>

              <div className="rg-gvideo">
                {guide.video.embedUrl ? (
                  <iframe src={guide.video.embedUrl} title={guide.video.title} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
                ) : (
                  <div className="rg-gvideo-soon">
                    <div className="rg-gvideo-play" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <strong>60-second walkthrough coming soon</strong>
                    <span>{guide.video.title}</span>
                  </div>
                )}
              </div>

              <p>{guide.intro}</p>

              {guide.stepGroups.map((g) => (
                <section key={g.heading}>
                  <h2 id={slugify(g.heading)}>{g.heading}</h2>
                  {g.intro && <p>{g.intro}</p>}
                  <ol className="rg-gsteps">
                    {g.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                  {g.note && <p className="rg-gnote">{g.note}</p>}
                </section>
              ))}

              <h2 id="tips">{guide.tips.heading}</h2>
              <ul>
                {guide.tips.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <section className="rg-ghelp" aria-labelledby="get-help">
                <h2 id="get-help">When to get help</h2>
                {guide.help.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p>
                  Derrick and Kelsey spent five years each at Aesthetic Record. See how we help practices on our{" "}
                  <Link href={AR_LEADAR.path}>Aesthetic Record &amp; LeadAR consultant page</Link>.
                </p>
                <Link href={AR_LEADAR.path} className="rg-ghelp-cta">
                  Get Aesthetic Record &amp; LeadAR help <span aria-hidden="true">→</span>
                </Link>
              </section>

              <section className="rg-faqs" aria-labelledby="questions">
                <h2 id="questions">Common questions</h2>
                <dl>
                  {guide.faqs.map((f) => (
                    <div key={f.q}>
                      <dt>{f.q}</dt>
                      <dd>{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="rg-gsources" aria-labelledby="sources">
                <h2 id="sources">Sources</h2>
                <p>Every step above comes from these public pages, read in November 2026.</p>
                <ul>
                  {guide.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="rg-author">
                <Image src={who.photo} alt={who.name} width={72} height={72} />
                <p>
                  <span>Written by</span>
                  <Link href="/about">{who.name}</Link>
                  <span>{who.role}, {SITE.name}</span>
                </p>
              </div>

              <p className="rg-gdisclaimer">{GUIDE_INDEPENDENCE}</p>
            </div>
          </div>
        </article>

        <section className="rg-next" aria-labelledby="more-guides">
          <div className="rg-container">
            <div className="rg-next-head">
              <h2 id="more-guides" className="rg-bbrowse-title">More guides</h2>
              <Link href={GUIDES_HUB.path} className="rg-next-all">
                All guides <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="rg-ggrid">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link href={guidePath(g.slug)} className="rg-gcard">
                    <h3>{g.title}</h3>
                    <p>{g.description}</p>
                    <span className="rg-gcard-meta">By {GUIDE_AUTHORS[g.author].name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <InnerCTA
          heading="Get Even More Out of Aesthetic Record & LeadAR"
          text="Fifteen minutes with someone who worked there. Tell us what you want your software to do for you, and we'll show you where to start."
        />
      </main>
    </>
  );
}
