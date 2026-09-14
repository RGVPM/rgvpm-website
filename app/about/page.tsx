import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, localBusinessSchema, SITE, SOCIAL_PROFILES } from "@/lib/site";

const url = canonical("/about");
const linkedinUrl = SOCIAL_PROFILES.find((u) => u.includes("linkedin"));

export const metadata: Metadata = {
  title: "About Us — Meet Derrick & Kelsey Tamez",
  description:
    "RGV Performance Marketing is run by Derrick and Kelsey Tamez, a husband-and-wife team in Harlingen, TX. Meet the founders and see what we build for Rio Grande Valley businesses.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `About ${SITE.name}`,
    description:
      "Meet Derrick and Kelsey Tamez, the husband-and-wife team behind RGV Performance Marketing.",
    siteName: SITE.name,
  },
};

/**
 * Founder profiles. Photos live in /public/founders/ (4:5 portrait, at
 * least 900px wide). Leave `photo` undefined and the card renders a navy
 * panel with the founder's initials instead, so the page never shows a
 * broken image while a photo is pending.
 *
 * Every claim in `facts` and `bio` comes from Derrick's own partnership
 * portfolio. Kelsey's section is written from what the previous About page
 * said about her role; TODO(owner): replace with her real background.
 */
type Founder = {
  first: string;
  name: string;
  title: string;
  initials: string;
  photo?: string;
  facts: string[];
  bio: string[];
};

const FOUNDERS: Founder[] = [
  {
    first: "Derrick",
    name: "Derrick Tamez",
    title: "Co-Founder & CEO",
    initials: "DT",
    // photo: "/founders/derrick.jpg",
    facts: [
      "10+ years in sales & marketing leadership",
      "Built a department from 1 to 580 accounts",
      "Closed 387 of those accounts personally",
      "MBA · Bilingual English & Spanish",
    ],
    bio: [
      "Derrick has spent more than ten years in sales and marketing leadership, the last five of them inside software companies that serve small businesses. At Aesthetic Record, a software platform for the aesthetics industry, he was promoted from sales into Sales Operations Manager and built its lead-management and marketing department from a single account into a seven-figure line of business with 580 customers. He closed 387 of them himself.",
      "He designed the sales process, the forecasting model, and the operations behind that department, and was one of four brand ambassadors chosen to represent the company at industry conferences. Along the way he built an AI-powered operations stack that cut 30 to 40 hours of manual work a week from each workflow it touched.",
      "That is the leverage RGV Performance Marketing brings to local businesses: the systems big companies pay whole teams to run, built and managed for a price a Valley business can afford. Derrick holds an MBA, works in English and Spanish, and lives in Harlingen.",
    ],
  },
  {
    first: "Kelsey",
    name: "Kelsey Tamez",
    title: "Co-Founder & Operations Director",
    initials: "KT",
    // photo: "/founders/kelsey.jpg",
    facts: [
      "Runs onboarding and client communication",
      "Owns timelines, details, and delivery",
      "Your point of contact, not a rotating handoff",
    ],
    bio: [
      "Kelsey runs the side of the business clients feel every week: onboarding, communication, timelines, and the standard of care that makes people want to stay. When a site is in build, she is the one keeping the schedule honest and making sure nothing gets lost between a kickoff call and a launch.",
      "Every account gets both founders. Derrick lives in the strategy, the systems, and the numbers. Kelsey keeps the relationship, the details, and the follow-through. You get both of us, not a handoff to someone you have never met.",
    ],
  },
];

const values = [
  { icon: "cpu" as const, title: "AI-Powered, Human-Led", text: "We use modern AI tools to move faster and smarter, but every strategy and decision is led by people who care about your results." },
  { icon: "chart" as const, title: "Results Over Vanity", text: "We report on leads, calls, and booked appointments, the numbers that actually grow a business, not impressions and likes." },
  { icon: "shield" as const, title: "No Long-Term Traps", text: "Month-to-month, always. We keep clients by earning their business every month, not by locking them into contracts." },
  { icon: "users" as const, title: "Bilingual & Local", text: "Rooted in the Rio Grande Valley, we create content in English and Spanish to help you reach every customer in your market." },
];

const mono = "var(--font-dm-mono), ui-monospace, monospace";

function Portrait({ f }: { f: Founder }) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "4 / 5",
        borderRadius: "var(--r-hero-md)",
        overflow: "hidden",
        background: "linear-gradient(160deg, #243658 0%, #0F1C34 100%)",
        border: "1px solid rgba(247,244,239,0.18)",
        boxShadow: "0 34px 70px -28px rgba(4,9,20,0.8)",
      }}
    >
      {f.photo ? (
        <Image
          src={f.photo}
          alt={`${f.name}, ${f.title} of ${SITE.name}`}
          fill
          sizes="(max-width: 900px) 92vw, 420px"
          style={{ objectFit: "cover" }}
          priority
        />
      ) : (
        <div
          aria-label={`${f.name} portrait`}
          role="img"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(96px, 14vw, 170px)",
            letterSpacing: "0.04em",
            color: "rgba(247,244,239,0.14)",
          }}
        >
          {f.initials}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "40px 22px 20px",
          background: "linear-gradient(to top, rgba(8,14,26,0.92), transparent)",
        }}
      >
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.04em", color: "#fff", lineHeight: 1 }}>
          {f.name}
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-on-dark)", marginTop: 8 }}>
          {f.title}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          ...FOUNDERS.map((f) => ({
            "@context": "https://schema.org",
            "@type": "Person",
            name: f.name,
            jobTitle: f.title,
            worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
            url,
          })),
        ]}
      />
      <main>
        {/* ── Meet the founders: the first thing on the page ─────── */}
        <section
          aria-labelledby="about-heading"
          style={{
            background: "linear-gradient(180deg, var(--navy) 0%, #15233D 100%)",
            paddingTop: "clamp(120px, 14vh, 152px)",
            paddingBottom: "clamp(72px, 8vh, 110px)",
          }}
        >
          <div className="rg-container">
            <div style={{ maxWidth: 780 }}>
              <p className="rg-label" style={{ color: "var(--orange-on-dark)", margin: "0 0 var(--s4)" }}>
                Meet the Founders
              </p>
              <h1
                id="about-heading"
                className="rg-display"
                style={{ fontSize: "var(--fs-hero)", color: "#fff", margin: 0, lineHeight: 0.96 }}
              >
                We&rsquo;re Derrick and Kelsey Tamez.
                <span style={{ display: "block", color: "var(--orange)" }}>
                  We Get Valley Businesses Found.
                </span>
              </h1>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.78)",
                  maxWidth: "52ch",
                  margin: "var(--s5) 0 0",
                }}
              >
                A husband-and-wife team in Harlingen, Texas. We build websites, local search,
                ads, and follow-up systems for small businesses, then run them so the owner
                doesn&rsquo;t have to.
              </p>
            </div>

            {FOUNDERS.map((f, i) => (
              <div
                key={f.name}
                className="why-grid-responsive"
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "0.42fr 0.58fr" : "0.58fr 0.42fr",
                  gap: "clamp(32px, 5vw, 72px)",
                  alignItems: "center",
                  marginTop: i === 0 ? "var(--s9)" : "var(--s8)",
                  paddingTop: i === 0 ? 0 : "var(--s8)",
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="rg-founder-photo" style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <Portrait f={f} />
                </div>
                <div>
                  <h2
                    className="rg-display"
                    style={{ fontSize: "clamp(32px, 3.4vw, 46px)", color: "#fff", margin: 0 }}
                  >
                    {f.first}
                  </h2>
                  <p style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-on-dark)", margin: "10px 0 0" }}>
                    {f.title}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: "var(--s5) 0 0",
                      padding: 0,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {f.facts.map((fact) => (
                      <li
                        key={fact}
                        style={{
                          fontFamily: mono,
                          fontSize: 11,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.78)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          borderRadius: "var(--r-pill)",
                          padding: "7px 12px",
                        }}
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                  {f.bio.map((para, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: 16.5,
                        lineHeight: 1.75,
                        color: "rgba(255,255,255,0.76)",
                        margin: j === 0 ? "var(--s5) 0 0" : "var(--s4) 0 0",
                        maxWidth: "62ch",
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {linkedinUrl && (
              <p style={{ margin: "var(--s7) 0 0", fontSize: 15, color: "rgba(255,255,255,0.7)" }}>
                Want the longer version?{" "}
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 5, textDecorationColor: "var(--orange)" }}>
                  Follow us on LinkedIn
                </a>
                , where we post the client breakdowns.
              </p>
            )}
          </div>
        </section>

        {/* ── What we do ───────────────────────────────────────── */}
        <section style={{ padding: "88px 0", background: "#fff" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "0 0 24px" }}>
              What We Do
            </h2>
            <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18 }}>
              Most small businesses are invisible online. Not because the work isn&apos;t good, but because nobody built them a system to get found. The owner is busy running the business, marketing falls to the bottom of the list, and the competitor down the street who simply shows up first wins the customer.
            </p>
            <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18 }}>
              That is the gap we close. We build the website, the Google Business Profile, the local search presence, the ads, and the follow-up system, then run all of it for you. A new site goes live in as little as 8 to 10 days, and from there we keep it growing.
            </p>
            <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75 }}>
              Modern AI tools plus hands-on strategy let us deliver what used to take a team three times our size, at prices a local business can actually afford. Straightforward plans, real reporting, no long-term contracts.
            </p>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────── */}
        <section style={{ padding: "88px 0", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: 0 }}>
                How We Work
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="svc-grid-responsive">
              {values.map((v, i) => {
                const accent = i % 2 === 0 ? "var(--orange)" : "var(--teal)";
                return (
                  <div key={v.title} style={{ background: "#fff", border: "1px solid var(--border)", borderLeft: `4px solid ${accent}`, borderRadius: 10, padding: "28px 26px", display: "flex", gap: 18 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={v.icon} size={24} color={accent} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{v.title}</h3>
                      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{v.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section style={{ padding: "72px 0", background: "var(--navy)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="svc-grid-responsive">
              {[
                { num: "8-10 Days", label: "New website, kickoff to launch" },
                { num: "50+", label: "Live client sites" },
                { num: "EN+ES", label: "Bilingual content available" },
                { num: "956", label: "Locally rooted, broadly serving" },
              ].map((m) => (
                <div key={m.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: "var(--orange)", letterSpacing: "0.04em" }}>{m.num}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Explore services ─────────────────────────────────── */}
        <section style={{ padding: "72px 0", background: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3vw,40px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.05, marginBottom: 16 }}>
              See How We Can Help
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65, marginBottom: 28 }}>
              Explore the services that make up your growth engine, or jump straight to plans and pricing.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--navy)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
                Explore Services →
              </Link>
              <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", background: "var(--cream-dark)", color: "var(--navy)", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
