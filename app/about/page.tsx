import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import TeamGrid, { type TeamMember } from "@/components/TeamGrid";
import { canonical, breadcrumbSchema, SITE, SOCIAL_PROFILES, socialMeta, ORGANIZATION_ID, PERSON_DERRICK_ID, PERSON_KELSEY_ID } from "@/lib/site";

const url = canonical("/about");
const linkedinUrl = SOCIAL_PROFILES.find((u) => u.includes("linkedin"));

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the RGV Performance Marketing team in Harlingen, TX: founder and CEO Derrick Tamez, MBA, co-founder Kelsey Tamez, and Director of Marketing Anthony Lopez. See who builds and runs your marketing, and how to join us.",
  alternates: { canonical: url },
  ...socialMeta({
    url,
    title: `About ${SITE.name}`,
    description:
      "Meet the leadership and team behind RGV Performance Marketing in Harlingen, TX. We're hiring.",
  }),
};

/**
 * Team profiles, grouped like an org chart. Every card is the same size;
 * the bio opens on click (components/TeamGrid). Add new hires to TEAM.
 * Photos live in /public/founders/ (4:5 portrait, at least 900px wide).
 */
const LEADERSHIP: TeamMember[] = [
  {
    id: PERSON_DERRICK_ID,
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
      "Derrick spent more than a decade in sales and marketing leadership, including five years inside software companies serving businesses of all sizes. At Aesthetic Record, a leading software platform for the aesthetics industry, he worked his way from sales into Sales Operations Manager, where he helped build a lead management and marketing division from a single account into a seven-figure line of business. Along the way, he designed the sales processes, forecasting systems, and operational structure needed to scale it.",
      "During that time, Derrick also began building his own AI-powered tools. What started as simple automations for lead follow-up quickly expanded into reporting systems, internal workflows, and tools that could take over entire parts of his day-to-day work. Each time he found a way to automate a repetitive process, he used the time it created to build the next system.",
      "That mindset became the foundation for RGV Performance Marketing.",
      "Today, Derrick uses the same approach to help businesses of every size operate and market themselves more efficiently. By combining websites, local search, paid advertising, lead management automation, and AI-driven follow-up into one streamlined system, RGV Performance Marketing gives local businesses access to capabilities that once required multiple agencies, employees, and software platforms.",
      "With an MBA and more than a decade of experience building sales and marketing systems, Derrick now brings that experience directly to businesses across the Rio Grande Valley and beyond.",
    ],
  },
  {
    id: PERSON_KELSEY_ID,
    first: "Kelsey",
    name: "Kelsey Tamez",
    title: "Co-Founder & Operations Director",
    initials: "KT",
    photo: "/founders/kelsey.jpg",
    facts: [
      "5 years as a Senior Account Manager",
      "UTSA, Early Childhood Education",
      "Client onboarding & operations",
    ],
    bio: [
      "Kelsey graduated from the University of Texas at San Antonio with a degree in early childhood education, a field that teaches you how to meet people where they are, explain things clearly, and build routines that hold up under pressure. She brought all of that into business.",
      "She spent five years at Aesthetic Record as a Senior Account Manager, working with hundreds of clinic owners and staff as they set up their software, trained their teams, and grew their practices. Day after day she watched which setups worked and which ones fell apart, and she developed an eye for the most effective way to organize a business so it runs smoothly from the start.",
      "At RGV Performance Marketing, Kelsey runs onboarding, client communication, and delivery. When a new client comes on, she is the one mapping out how their systems should fit together, keeping the timeline honest, and making sure nothing gets lost between kickoff and launch. Clients get her directly, not a handoff.",
    ],
  },
];

const TEAM: TeamMember[] = [
  {
    id: `${SITE.url}/about#anthony-lopez`,
    first: "Anthony",
    name: "Anthony Lopez",
    title: "Director of Marketing",
    initials: "AL",
    photo: "/founders/anthony.jpg",
    facts: [
      "UTRGV alumnus",
      "6 years in the beauty industry",
      "Marketing & social media",
      "Sales & operations growth",
    ],
    bio: [
      "Anthony graduated from UTRGV and spent the next six years in the Valley's beauty industry at Valley Beauty Supply. He handled marketing and social media there, and helped grow the company's sales and operations along the way.",
      "That mix is what he brings to our clients. He knows what gets a customer's attention online, and he knows what has to happen behind the counter to turn that attention into sales.",
      "As Director of Marketing, Anthony leads marketing and social media strategy for our clients. Salons, med spas, and aesthetics businesses get someone who has already sold to their customers.",
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

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          ...[...LEADERSHIP, ...TEAM].map((f) => {
            const [name, suffix] = f.name.split(", ");
            return {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": f.id,
              name,
              ...(suffix ? { honorificSuffix: suffix } : {}),
              jobTitle: f.title,
              ...(f.photo ? { image: `${SITE.url}${f.photo}` } : {}),
              worksFor: { "@id": ORGANIZATION_ID },
              url,
            };
          }),
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
                Real People. Serious Systems.
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
                We&rsquo;re an AI and marketing agency in Harlingen, Texas. We build websites, local
                search, ads, and the AI systems behind them, then run it all so the owner
                doesn&rsquo;t have to. Meet the people doing the work.
              </p>
            </div>

            <TeamGrid
              groups={[
                { label: "Leadership", members: LEADERSHIP },
                { label: "The Team", members: TEAM },
              ]}
            />

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
                  We&rsquo;re still adding to the team. If you&rsquo;re in the Valley, you care
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
