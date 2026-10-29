import type { Metadata } from "next";
import Link from "next/link";
import { canonical, breadcrumbSchema, serviceListSchema, SITE, socialMeta } from "@/lib/site";
import { getService } from "@/lib/services";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";

/**
 * The services hub, and the menu's only "Services" link. Every service is a
 * hat card (the homepage's language), so a visitor sees in one screen what
 * we take off their plate and where each one lives. Website design and AI
 * have their own page components, so their cards are written out here; the
 * rest come from lib/services.ts.
 */
type Hat = { hat: string; sub: string; text: string; href: string; cta: string; from?: string };

const fromService = (slug: string, sub: string): Hat => {
  const s = getService(slug)!;
  return { hat: s.hat, sub, text: s.cardText, href: `/services/${slug}`, cta: s.shortName, from: s.startsAt.price };
};

const HATS: Hat[] = [
  {
    hat: "Web Designer",
    sub: "+ website & landing pages",
    text: "A custom website, live in 8 to 10 days. We host it, update it and keep the Book button where customers see it, plus landing pages for your events and specials.",
    href: "/services/website-design",
    cta: "Website design",
    from: "$397/mo",
  },
  fromService("local-seo", "+ Google & AI search"),
  fromService("google-business-profile", "+ map pack & reviews"),
  fromService("lead-management", "+ lead inbox, SMS & email"),
  fromService("social-media-newsletter", "+ content creator"),
  fromService("paid-advertising", "+ Google & Meta ads"),
  {
    hat: "Automation Specialist",
    sub: "+ AI that does the busywork",
    text: "We find the repetitive work eating your week, like answering the same questions or chasing follow-ups, then build the AI that handles it.",
    href: "/services/ai-implementation",
    cta: "AI consulting & builds",
  },
];

const url = canonical("/services");

const linkStyle = { color: "var(--blue-ink)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 } as const;

export const metadata: Metadata = {
  title: "Digital Marketing Services for Local Businesses",
  description:
    "Websites, local SEO, Google Business Profile, paid ads, lead management with SMS & email, social media and AI automation. One team for all of it.",
  alternates: { canonical: url },
  ...socialMeta({
    url,
    title: `Digital Marketing Services | ${SITE.name}`,
    description:
      "Everything a local business needs to get found online and turn searches into booked customers.",
  }),
};

export default function ServicesHub() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          serviceListSchema([
            { name: "Website Design", path: "/services/website-design" },
            { name: "AI Implementation", path: "/services/ai-implementation" },
            { name: "Local SEO", path: "/services/local-seo" },
            { name: "Google Business Profile", path: "/services/google-business-profile" },
            { name: "Paid Advertising", path: "/services/paid-advertising" },
            { name: "Lead Management, SMS & Email", path: "/services/lead-management" },
            { name: "Social Media & Newsletter", path: "/services/social-media-newsletter" },
          ]),
        ]}
      />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Our services"
          title={
            <>
              Every Hat You&rsquo;re Wearing.
              <br />
              <span style={{ color: "var(--navy)" }}>Pick the Ones to Hand Off.</span>
            </>
          }
          subtitle="Website, Google, follow-up, content, ads and AI. Each one below is a job we take off your plate, and they all work better together."
          crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
        />

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <ul className="rg-hats" style={{ marginTop: 0 }}>
              {HATS.map((h, i) => (
                <li key={h.href} className="rg-reveal">
                  <Link href={h.href} className="rg-hat">
                    <span className="rg-hat-pill">Hat {String(i + 1).padStart(2, "0")}</span>
                    <h2 className="rg-display rg-hat-title">{h.hat}</h2>
                    <p className="rg-hat-sub">{h.sub}</p>
                    <span className="rg-hat-rule" aria-hidden="true" />
                    <p className="rg-hat-text">{h.text}</p>
                    {h.from && <p className="rg-hat-from">From {h.from}</p>}
                    <span className="rg-hat-more">
                      {h.cta} <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="rg-reveal rg-hats-span2">
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-hat rg-hat--navy">
                  <span className="rg-hat-pill">Not sure?</span>
                  <h2 className="rg-display rg-hat-title">Start With a Call</h2>
                  <p className="rg-hat-sub">+ we&rsquo;ll tell you what to hand off first</p>
                  <span className="rg-hat-rule" aria-hidden="true" />
                  <p className="rg-hat-text">
                    A quick call with Derrick or Kelsey. We look at where leads are slipping and
                    which hat would free up the most of your week.
                  </p>
                  <span className="rg-hat-more">
                    Book with us! <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
            </ul>

            {/* Where to start: in-copy links to the core service pages. */}
            <p style={{ maxWidth: 760, margin: "var(--s8) auto 0", fontSize: 16, color: "var(--muted)", lineHeight: 1.8, textAlign: "center" }}>
              Most Valley businesses begin with a website that catches leads, then add{" "}
              <Link href="/services/local-seo" style={linkStyle}>local SEO</Link> so more of the right people find them
              on Google. <Link href="/services/paid-advertising" style={linkStyle}>Paid advertising</Link> brings in calls
              while the organic work builds, and <Link href="/services/lead-management" style={linkStyle}>lead management</Link>{" "}
              makes sure every call, text and form gets a fast reply. In Harlingen? See{" "}
              <Link href="/website-design-harlingen-tx" style={linkStyle}>website design for Harlingen businesses</Link>, or
              read <Link href="/blog" style={linkStyle}>our blog</Link> for plain-English local marketing guides.
            </p>
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
