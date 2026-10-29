import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import TeamGrid, { type TeamMember } from "@/components/TeamGrid";
import { canonical, breadcrumbSchema, SITE, SOCIAL_PROFILES, socialMeta, ORGANIZATION_ID, PERSON_DERRICK_ID, PERSON_KELSEY_ID } from "@/lib/site";

const url = canonical("/about");
const linkedinUrl = SOCIAL_PROFILES.find((u) => u.includes("linkedin"));

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the RGV Performance Marketing team in Harlingen, TX: founder and CEO Derrick Tamez, MBA, co-founder Kelsey Tamez, Director of Marketing Anthony Lopez, and Client Success Coach Shaye Arenas. See who builds and runs your marketing, and how to join us.",
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
 * the bio opens on click (components/TeamGrid). Add new hires to their
 * department array, or add a new array and group for a new department.
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
      "MasterClass Executive, Chicago Booth × OpenAI",
    ],
    bio: [
      "Derrick spent more than a decade in sales and marketing leadership, including five years inside software companies serving businesses of all sizes. At Aesthetic Record, a leading software platform for the aesthetics industry, he worked his way from sales into Sales Operations Manager, where he helped build a lead management and marketing division from a single account into a seven-figure line of business. Along the way, he designed the sales processes, forecasting systems, and operational structure needed to scale it.",
      "During that time, Derrick also began building his own AI-powered tools. What started as simple automations for lead follow-up quickly expanded into reporting systems, internal workflows, and tools that could take over entire parts of his day-to-day work. Each time he found a way to automate a repetitive process, he used the time it created to build the next system.",
      "That mindset became the foundation for RGV Performance Marketing.",
      "Today, Derrick uses the same approach to help businesses of every size operate and market themselves more efficiently. By combining websites, local search, paid advertising, lead management automation, and AI-driven follow-up into one streamlined system, RGV Performance Marketing gives local businesses access to capabilities that once required multiple agencies, employees, and software platforms.",
      "Derrick also trained in MasterClass Executive, the AI-era business program Chicago Booth built with OpenAI, learning from Mark Cuban, Indra Nooyi, Paul Krugman and Nobel-winning Booth faculty.",
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

const SALES_MARKETING: TeamMember[] = [
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

const CLIENT_SUCCESS: TeamMember[] = [
  {
    id: `${SITE.url}/about#shaye-arenas`,
    first: "Shaye",
    name: "Shaye Arenas",
    title: "Client Success Coach",
    initials: "SA",
    facts: [
      "Computer science degree",
      "CRM specialist",
      "Experience across industries",
    ],
    bio: [
      "Shaye earned her degree in computer science, and she puts it to work on the systems that keep client accounts running. As our CRM specialist, she knows how leads, pipelines, automations, and follow-ups fit together, and how to keep them clean.",
      "She has worked with businesses across a wide range of industries, so she is quick to learn how a new client operates and what they need from their CRM.",
      "As Client Success Coach, Shaye helps clients get the most out of the systems we build: answering questions, walking them through their inbox and pipeline, and making sure the tools actually get used.",
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
          ...[...LEADERSHIP, ...SALES_MARKETING, ...CLIENT_SUCCESS].map((f) => {
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
        <PageHero
          tone="blue"
          eyebrow="Meet the team"
          title={
            <>
              Real People. Serious Systems.
              <br />
              <span style={{ color: "var(--navy)" }}>Built in the Rio Grande Valley.</span>
            </>
          }
          subtitle="We're based in Harlingen, Texas, and work with businesses across the U.S. We build your website, Google, ads and follow-up, then run all of it so you don't have to. Here's who does the work."
          crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
        >
          <ul className="rg-about-proof">
            <li>150+ businesses served</li>
            <li>Live in 8 to 10 days</li>
            <li>English &amp; Spanish</li>
            <li>Month-to-month</li>
          </ul>
        </PageHero>

        {/* ── The team ─────────────────────────────────────────── */}
        <section aria-labelledby="team-heading" className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div className="rg-reveal" style={{ maxWidth: 720 }}>
              <span className="rg-pill">The people</span>
              <h2 id="team-heading" className="rg-display rg-svc-h2">
                You&rsquo;ll Know Us <span style={{ color: "var(--blue)" }}>By Name.</span>
              </h2>
              <p className="rg-svc-body">
                No account managers you never meet. Tap anyone below to read their story.
              </p>
            </div>

            <TeamGrid
              groups={[
                { label: "Leadership", members: LEADERSHIP },
                { label: "Sales & Marketing", members: SALES_MARKETING },
                { label: "Client Success", members: CLIENT_SUCCESS },
              ]}
            />

            {linkedinUrl && (
              <p style={{ margin: "var(--s7) 0 0", fontSize: 15, color: "var(--muted)" }}>
                Want the longer version?{" "}
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="rg-text-link">
                  Follow us on LinkedIn
                </a>
                , where we post the client breakdowns.
              </p>
            )}
          </div>
        </section>

        {/* ── Why we started ───────────────────────────────────── */}
        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container rg-svc-split">
            <div className="rg-reveal">
              <span className="rg-pill">Why we started</span>
              <h2 className="rg-display rg-svc-h2">
                Owners Wear Too Many Hats.
                <span style={{ display: "block", color: "var(--blue)" }}>We Take Some Off.</span>
              </h2>
              <p className="rg-svc-body">
                Most small businesses are invisible online. Not because the work isn&apos;t good, but
                because nobody built them a system to get found. The owner is busy running the
                business, marketing falls to the bottom of the list, and the competitor down the
                street who simply shows up first wins the customer.
              </p>
              <p className="rg-svc-body">
                That is the gap we close. We build the website, the Google Business Profile, the
                local search presence, the ads and the follow-up, then run all of it for you.
                Modern AI tools let a small team deliver what used to take one three times our
                size, at prices a local business can actually afford.
              </p>
              <p className="rg-svc-body" style={{ margin: 0 }}>
                <Link href="/services" className="rg-text-link">See the hats we wear</Link>
              </p>
            </div>
            <aside className="rg-svc-card rg-reveal" aria-label="How we work">
              <p className="rg-svc-card-kicker">How we work</p>
              <ul className="rg-values">
                {values.map((v) => (
                  <li key={v.title}>
                    <span className="rg-handled-check" aria-hidden="true">✓</span>
                    <div>
                      <h3>{v.title}</h3>
                      <p>{v.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* ── We're hiring ─────────────────────────────────────── */}
        <section aria-labelledby="hiring-heading" className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div className="rg-hiring rg-reveal">
              <div>
                <span className="rg-pill rg-pill--orange">We&rsquo;re hiring</span>
                <h2 id="hiring-heading" className="rg-display rg-svc-h2" style={{ color: "var(--cream)" }}>
                  The Team Is Growing.
                  <span style={{ display: "block", color: "var(--blue-on-dark)" }}>Come Build With Us.</span>
                </h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(253,248,236,0.82)", maxWidth: "52ch", margin: 0 }}>
                  If you&rsquo;re in the Valley, you care about local businesses, and you&rsquo;re
                  good at what you do, we want to hear from you. Tell us what you&rsquo;d bring and
                  why. No cover-letter formality required.
                </p>
              </div>
              <div>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent("I'd like to join the RGVPM team")}`}
                  className="rg-btn rg-cta-cream"
                >
                  Email us about joining <span aria-hidden="true">→</span>
                </a>
                <p style={{ fontFamily: mono, fontSize: 12, color: "rgba(253,248,236,0.65)", margin: "var(--s4) 0 0", wordBreak: "break-all" }}>
                  {SITE.email}
                </p>
              </div>
            </div>
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
