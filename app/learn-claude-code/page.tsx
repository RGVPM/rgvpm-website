import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import { AI_BOOKING_URL, AI_TOOLS } from "@/lib/aiImplementation";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID } from "@/lib/site";

/**
 * /learn-claude-code: one-on-one "build with me" sessions teaching business
 * owners and teams to build with AI coding agents (Claude Code, Codex).
 *
 * Search demand behind it (Semrush, Sept 2026, US): "how to use claude code"
 * 5.4k/mo, "claude code tutorial" 2.4k, "learn claude code" 1k, "claude code
 * course" 1k (low difficulty), "build ai agents" 1.3k. No pricing on the page
 * by design; the CTA is the AI booking calendar.
 */
const path = "/learn-claude-code";
const url = canonical(path);

export const metadata: Metadata = {
  title: "Learn Claude Code & Codex 1-on-1 | AI Build Sessions",
  description:
    "Learn Claude Code and Codex by building a real tool for your business, one-on-one. Remote or in person in the Rio Grande Valley. No coding background needed. You keep everything you build.",
  alternates: { canonical: url },
  keywords: ["learn claude code", "claude code course", "claude code training", "codex tutorial", "build ai agents", "ai coaching"],
  openGraph: {
    type: "website",
    url,
    title: `Learn Claude Code & Codex 1-on-1 | ${SITE.name}`,
    description: "Build a real tool for your business with AI coding agents, one-on-one. No coding background needed.",
    siteName: SITE.name,
  },
};

const STEPS = [
  { num: "01", title: "Bring a real problem", text: "A report you rebuild every week, a tool you wish existed, a site you want to ship. We build around it." },
  { num: "02", title: "Set up your tools", text: "Claude Code, Codex, and the rest of the stack on your own machine, with GitHub, so everything stays yours." },
  { num: "03", title: "Build it together", text: "You drive, I coach. Write the spec, steer the agent, review what it made, and fix what's off." },
  { num: "04", title: "Ship it and keep it", text: "We put it live, then you leave with the project, the notes, and a plan for what to build next." },
];

const LEARN = [
  "Write a spec an AI agent can actually build from",
  "Steer and review code without being a developer",
  "Use Git so nothing you build ever gets lost",
  "Deploy what you make to a real, live link",
  "Build agents that work with your own data, safely",
];

const WHO = [
  "Owners and operators with a process worth automating",
  "Marketers who want to ship their own pages and tools",
  "Teams getting serious about AI, together",
  "Developers who want to move faster with agents",
];

const TOOLS = [...AI_TOOLS, "GitHub", "Cursor", "Next.js", "Supabase", "n8n", "Netlify"];

const FAQS = [
  { q: "Do I need to know how to code?", a: "No. Most people who book have never written code. AI coding agents write the code; you learn to describe what you want clearly, steer the agent, and check the result. That's the skill that matters now." },
  { q: "What's the difference between Claude Code and Codex?", a: "Both are AI coding agents that read your project, write and edit code, and run commands for you. Claude Code is Anthropic's; Codex is OpenAI's. They have different strengths, so we set up both and you'll learn when to reach for each." },
  { q: "What should I bring to a session?", a: "A laptop and a real problem you want solved. It can be small: a spreadsheet you rebuild every week, a page you want live, a tool your team keeps asking for. Real problems teach faster than exercises." },
  { q: "Can you train my whole team?", a: "Yes. We run one-on-one sessions and team workshops, remote or in person in the Rio Grande Valley. Team sessions are built around your own workflows, so people leave with something they'll actually use." },
  { q: "Do I own what we build?", a: "Yes. Everything lives on your machine and in your own GitHub account from the first session. You leave with the code, the working tool, and notes so you can keep building on your own." },
];

const mono = "var(--font-dm-mono), ui-monospace, monospace";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "AI Automation", path: "/services/ai-implementation" },
  { name: "Learn Claude Code", path },
];

export default function LearnClaudeCodePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "One-on-one Claude Code & Codex training",
            serviceType: "AI coding agent training",
            description: metadata.description,
            url,
            areaServed: [{ "@type": "AdministrativeArea", name: SITE.areaServed }, { "@type": "Country", name: "United States" }],
            provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
          },
        ]}
      />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="lcc-heading"
          style={{ background: "linear-gradient(180deg, var(--navy) 0%, #15233D 100%)", paddingTop: "clamp(112px, 13vh, 144px)", paddingBottom: "clamp(64px, 8vh, 96px)" }}
        >
          <div className="rg-container">
            <Breadcrumbs items={crumbs} dark inHero />
            <p className="rg-label" style={{ color: "var(--orange-on-dark)", margin: "var(--s4) 0 var(--s5)" }}>
              1-on-1 AI Build Sessions
            </p>
            <h1 id="lcc-heading" className="rg-display" style={{ fontSize: "var(--fs-hero)", color: "#fff", margin: 0, lineHeight: 0.96 }}>
              Learn Claude Code &amp; Codex
              <span style={{ display: "block", color: "var(--orange)" }}>By Building Something Real.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: "52ch", margin: "var(--s5) 0 0", textWrap: "pretty" }}>
              Sit down with Derrick and build a working tool for your business, from an empty folder to
              a live link, with the same AI coding agents we use every day. No coding background needed.
            </p>
            <div className="rg-hero-actions" style={{ display: "flex", alignItems: "center", gap: "var(--s5)", flexWrap: "wrap", margin: "var(--s6) 0 var(--s6)" }}>
              <a
                href={AI_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rg-hero-cta"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 18, lineHeight: 1, padding: "18px 26px", borderRadius: "var(--r-hero-sm)", textDecoration: "none", boxShadow: "var(--shadow-orange)" }}
              >
                Book a build session <span aria-hidden="true">→</span>
              </a>
              <a href="#how" className="rg-hero-secondary">How a session works</a>
            </div>
            <ul className="rg-hero-proof" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 0", listStyle: "none", margin: 0, padding: 0, fontFamily: mono, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.56)" }}>
              {["1-on-1, remote or in person", "No coding required", "You keep what you build"].map((t) => (
                <li key={t} className="rg-hero-proof-item">{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Proof: we build this way ─────────────────────────────── */}
        <section style={{ background: "var(--cream)", paddingBlock: "var(--section-y-tight)" }}>
          <div className="rg-container">
            <div className="rg-lcc-proof">
              <h2 className="rg-display" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", color: "var(--navy)", margin: 0 }}>
                We Don&rsquo;t Teach From Slides.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)", margin: 0, maxWidth: "56ch" }}>
                This website and the client sites we launch are built with Claude Code, and so are the
                internal tools and AI agents we run our own business on. You learn the exact workflow we
                use every day.
              </p>
            </div>
          </div>
        </section>

        {/* ── How a session works ──────────────────────────────────── */}
        <section id="how" aria-labelledby="how-heading" style={{ background: "#fff", paddingBlock: "var(--section-y)" }}>
          <div className="rg-container">
            <h2 id="how-heading" className="rg-display" style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: 0 }}>
              How a Session Works
            </h2>
            <ol className="rg-steps rg-steps--4">
              {STEPS.map((s) => (
                <li key={s.num} className="rg-step">
                  <span className="rg-step-marker rg-display" aria-hidden="true">{s.num}</span>
                  <h3 className="rg-display" style={{ fontSize: "clamp(24px, 2.2vw, 30px)", color: "var(--navy)", margin: "0 0 var(--s2)" }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Learn / who ──────────────────────────────────────────── */}
        <section style={{ background: "var(--cream)", paddingBlock: "var(--section-y)" }}>
          <div className="rg-container rg-lcc-two">
            {[
              { h: "What You'll Walk Away With", items: LEARN },
              { h: "Who It's For", items: WHO },
            ].map((col) => (
              <div key={col.h}>
                <h2 className="rg-display" style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "var(--navy)", margin: 0 }}>{col.h}</h2>
                <ul style={{ listStyle: "none", margin: "var(--s5) 0 0", padding: 0 }}>
                  {col.items.map((it) => (
                    <li key={it} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "12px 0", borderTop: "1px solid var(--border)", fontSize: 16, lineHeight: 1.5, color: "var(--navy)" }}>
                      <span aria-hidden="true" style={{ color: "var(--orange)", fontWeight: 700 }}>✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tools ────────────────────────────────────────────────── */}
        <section style={{ background: "#fff", paddingBlock: "var(--section-y-tight)" }}>
          <div className="rg-container" style={{ textAlign: "center" }}>
            <h2 className="rg-display" style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "var(--navy)", margin: 0 }}>The Tools You&rsquo;ll Use</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", margin: "var(--s3) auto 0", maxWidth: "52ch" }}>
              Claude Code, Codex, Hermes, Orca, and Grokbot, plus the stack we ship with. We
              pick the right ones for what you&rsquo;re making.
            </p>
            <ul style={{ listStyle: "none", margin: "var(--s6) auto 0", padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, maxWidth: 820 }}>
              {TOOLS.map((t) => (
                <li key={t} style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: "0.04em", color: "var(--navy)", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-pill)", padding: "9px 16px" }}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Free kit ─────────────────────────────────────────────── */}
        <section style={{ background: "var(--navy)", paddingBlock: "var(--section-y-tight)" }}>
          <div className="rg-container rg-bwm">
            <div>
              <h2 className="rg-display" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", color: "#fff", margin: 0 }}>
                Not Ready for a Session? <span style={{ color: "var(--orange)" }}>Start Free.</span>
              </h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", margin: "14px 0 0", maxWidth: "50ch" }}>
                Get a free AI agent that reviews your inbox every morning, plus our Claude Code starter
                kit and a 5-day email course.
              </p>
            </div>
            <div>
              <Link href="/claude-code-templates" className="rg-hero-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 17, lineHeight: 1, padding: "17px 24px", borderRadius: "var(--r-hero-sm)", textDecoration: "none", boxShadow: "var(--shadow-orange)" }}>
                Get the free agent <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section style={{ background: "var(--cream)", paddingBlock: "var(--section-y)" }}>
          <div className="rg-container" style={{ maxWidth: 860 }}>
            <h2 className="rg-display" style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "0 0 var(--s6)", textAlign: "center" }}>Questions</h2>
            <FaqAccordion items={FAQS} />
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(180deg, var(--navy) 0%, #15233D 100%)", paddingBlock: "var(--section-y)" }}>
          <div className="rg-container" style={{ textAlign: "center" }}>
            <h2 className="rg-display" style={{ fontSize: "clamp(40px, 5.4vw, 76px)", color: "#fff", margin: "0 auto var(--s5)", maxWidth: "15ch" }}>
              Build Your First AI Tool This Week.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", margin: "0 auto var(--s6)", maxWidth: "48ch" }}>
              Tell us what you want to build. We&rsquo;ll set up a session around it.
            </p>
            <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s4)", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <a href={AI_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rg-hero-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 17, lineHeight: 1, padding: "18px 28px", borderRadius: "var(--r-hero-sm)", textDecoration: "none", boxShadow: "var(--shadow-orange)" }}>
                Book a build session <span aria-hidden="true">→</span>
              </a>
              <Link href="/services/ai-implementation" className="rg-hero-secondary">See all AI automation services</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
