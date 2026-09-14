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
  title: "Meet the Team — Derrick & Kelsey Tamez",
  description:
    "RGV Performance Marketing is run by Derrick Tamez, MBA, and Kelsey Tamez, a husband-and-wife team in Harlingen, TX. Meet the team, see what we build for Rio Grande Valley businesses, and find out how to join us.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `About ${SITE.name}`,
    description:
      "Meet Derrick and Kelsey Tamez, the husband-and-wife team behind RGV Performance Marketing. We're hiring.",
    siteName: SITE.name,
  },
};

/**
 * Founder profiles. Photos live in /public/founders/ (4:5 portrait, at
 * least 900px wide). Leave `photo` undefined and the card renders a navy
 * panel with the founder's initials instead, so the page never shows a
 * broken image while a photo is pending.
 *
 * Derrick's `facts` and `bio` were written with him. Kelsey's section is written from what the previous About page
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
    name: "Derrick Tamez, MBA",
    title: "Founder & CEO",
    initials: "DT",
    photo: "/founders/derrick.jpg",
    facts: [
      "10+ years in sales & marketing leadership",
      "Sales operations & systems",
      "AI Guru",
      "Lean Six Sigma Black Belt",
    ],
    bio: [
      "Derrick spent more than a decade in sales and marketing leadership, including five years inside software companies serving small businesses. At Aesthetic Record, a leading software platform for the aesthetics industry, he worked his way from sales into Sales Operations Manager, where he helped build a lead management and marketing division from a single account into a seven-figure line of business. Along the way, he designed the sales processes, forecasting systems, and operational structure needed to scale it.",
      "During that time, Derrick also began building his own AI-powered tools. What started as simple automations for lead follow-up quickly expanded into reporting systems, internal workflows, and tools that could take over entire parts of his day-to-day work. Each time he found a way to automate a repetitive process, he used the time it created to build the next system.",
      "That mindset became the foundation for RGV Performance Marketing.",
      "Today, Derrick uses the same approach to help small businesses operate and market themselves more efficiently. By combining websites, local search, paid advertising, lead management automation, and AI-driven follow-up into one streamlined system, RGV Performance Marketing gives local businesses access to capabilities that once required multiple agencies, employees, and software platforms.",
      "With an MBA and more than a decade of experience building sales and marketing systems, Derrick now brings that experience directly to businesses across the Rio Grande Valley and beyond.",
    ],
  },
  {
    first: "Kelsey",
    name: "Kelsey Tamez",
    title: "Co-Founder & Operations Director",
    initials: "KT",
    // photo: "/founders/kelsey.jpg",  // TODO(owner): drop kelsey.jpg in /public/founders and uncomment
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
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        background: "linear-gradient(160deg, #243658 0%, #1A2B4A 100%)",
        border: "1px solid var(--border)",
        boxShadow: "0 30px 60px -30px rgba(26,43,74,0.45)",
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
        {/* ── Meet the team: the first thing on the page ─────────── */}
        <section
          aria-labelledby="about-heading"
          style={{
            background: "var(--cream)",
            paddingTop: "clamp(120px, 14vh, 152px)",
            paddingBottom: "clamp(72px, 8vh, 110px)",
          }}
        >
          <div className="rg-container">
            <div style={{ maxWidth: 780 }}>
              <p className="rg-label" style={{ color: "var(--orange-ink)", margin: "0 0 var(--s4)" }}>
                Meet the Team
              </p>
              <h1
                id="about-heading"
                className="rg-display"
                style={{ fontSize: "var(--fs-hero)", color: "var(--navy)", margin: 0, lineHeight: 0.96 }}
              >
                Small Team. Serious Systems.
                <span style={{ display: "block", color: "var(--orange)" }}>Built in the Rio Grande Valley.</span>
              </h1>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  maxWidth: "52ch",
                  margin: "var(--s5) 0 0",
                }}
              >
                We&rsquo;re a husband-and-wife team in Harlingen, Texas. We build websites, local
                search, ads, and follow-up systems for small businesses, then run them so the
                owner doesn&rsquo;t have to. And we&rsquo;re growing.
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
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                }}
              >
                <div className="rg-founder-photo" style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <Portrait f={f} />
                </div>
                <div>
                  <h2
                    className="rg-display"
                    style={{ fontSize: "clamp(32px, 3.4vw, 46px)", color: "var(--navy)", margin: 0 }}
                  >
                    {f.name}
                  </h2>
                  <p style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-ink)", margin: "10px 0 0" }}>
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
                          color: "var(--navy)",
                          background: "#fff",
                          border: "1px solid var(--border)",
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
                        color: "var(--muted)",
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
              <p style={{ margin: "var(--s7) 0 0", fontSize: 15, color: "var(--muted)" }}>
                Want the longer version?{" "}
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--navy)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 5, textDecorationColor: "var(--orange)" }}>
                  Follow us on LinkedIn
                </a>
                , where we post the client breakdowns.
              </p>
            )}
          </div>
        </section>

        {/* ── We're hiring ─────────────────────────────────────── */}
        <section aria-labelledby="hiring-heading" style={{ background: "var(--navy)", padding: "clamp(64px, 7vw, 96px) 0" }}>
          <div className="rg-container">
            <div
              className="why-grid-responsive"
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "clamp(32px, 5vw, 72px)",
                alignItems: "center",
              }}
            >
              <div>
                <p className="rg-label" style={{ color: "var(--orange-on-dark)", margin: "0 0 var(--s4)" }}>
                  We&rsquo;re Hiring
                </p>
                <h2 id="hiring-heading" className="rg-display" style={{ fontSize: "var(--fs-h2)", color: "#fff", margin: 0 }}>
                  The Team Is Growing.
                  <span style={{ display: "block", color: "var(--orange)" }}>Come Build With Us.</span>
                </h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", maxWidth: "52ch", margin: "var(--s5) 0 0" }}>
                  We&rsquo;re adding to the team this week. If you&rsquo;re in the Valley, you care
                  about local businesses, and you&rsquo;re good at what you do, we want to hear
                  from you. Tell us what you&rsquo;d bring and why. No cover-letter formality
                  required.
                </p>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "var(--r-md)",
                  padding: "var(--s6)",
                }}
              >
                <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>
                  How to reach us
                </p>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent("I'd like to join the RGVPM team")}`}
                  className="rg-btn rg-hero-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: "var(--s4)",
                    background: "var(--orange)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 17,
                    lineHeight: 1,
                    padding: "16px 22px",
                    borderRadius: "var(--r-hero-sm)",
                    textDecoration: "none",
                    boxShadow: "var(--shadow-orange)",
                  }}
                >
                  Email Us About Joining
                </a>
                <p style={{ fontFamily: mono, fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "var(--s4) 0 0", wordBreak: "break-all" }}>
                  {SITE.email}
                </p>
              </div>
            </div>
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
