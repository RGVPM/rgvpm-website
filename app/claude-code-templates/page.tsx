import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { canonical, breadcrumbSchema, faqSchema, SITE } from "@/lib/site";
import { KIT_FORM_ID, KIT_FALLBACK_MAILTO, KIT_PROMISE, KIT_COURSE, KIT_NAME } from "@/lib/leadMagnet";

/**
 * Lead magnet landing page: a free Morning Inbox Agent + the Claude Code
 * Starter Kit + a 5-day email course, in exchange for a newsletter signup.
 *
 * Targets "claude code templates" (Semrush, Sept 2026: 880/mo, difficulty 11)
 * and "claude code cheat sheet" (390/mo). The signup form is an embed from the
 * lead system (KIT_FORM_ID); until that exists, a pre-filled email stands in.
 */
const path = "/claude-code-templates";
const url = canonical(path);

export const metadata: Metadata = {
  title: "Free AI Inbox Agent + Claude Code Starter Kit",
  description:
    "A free AI agent that reviews your Gmail every morning at 8 and emails you what needs a reply. Set up in 10 minutes, no coding. Plus Claude Code templates, a cheat sheet, and a 5-day email course.",
  alternates: { canonical: url },
  keywords: ["claude code templates", "claude.md template", "claude code cheat sheet", "claude code best practices"],
  openGraph: {
    type: "website",
    url,
    title: `Free AI Inbox Agent + Claude Code Starter Kit | ${SITE.name}`,
    description: "A free AI agent that reviews your inbox every morning at 8. Plus Claude Code templates and a 5-day course.",
    siteName: SITE.name,
  },
};

const FAQS = [
  { q: "Is it really free?", a: "Yes. Sign up with your name and email and Derrick sends you the agent and setup guide personally, plus five short emails that help you build your next one. Unsubscribe any time." },
  { q: "Do I need to know how to code?", a: "No. Setup is copy and paste: open Google Apps Script, paste the agent in, click Run. The setup guide we send you walks through every click." },
  { q: "Does it cost anything to run?", a: "The agent runs free on Google. The optional AI summary uses your own Claude API key and typically costs a few cents a day. Skip it and you still get a clean, sorted briefing every morning." },
  { q: "Is my email safe?", a: "The agent runs inside your own Google account, and nothing comes to us. If you turn on the AI summary, short previews of your emails are sent to Anthropic's API to write it." },
  { q: "Does it work with Outlook?", a: "Not this version. It works with Gmail and Google Workspace accounts." },
];

const mono = "var(--font-dm-mono), ui-monospace, monospace";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Learn Claude Code", path: "/learn-claude-code" },
  { name: "Free AI Agent", path },
];

function SignupBox() {
  if (KIT_FORM_ID) {
    return (
      <>
        <Script src="https://api.rgvperformancemarketing.com/js/form_embed.js" strategy="afterInteractive" />
        <iframe
          src={`https://api.rgvperformancemarketing.com/widget/form/${KIT_FORM_ID}`}
          id={`inline-${KIT_FORM_ID}`}
          title={KIT_NAME}
          data-layout="{'id':'INLINE'}"
          data-form-name={KIT_NAME}
          data-layout-iframe-id={`inline-${KIT_FORM_ID}`}
          data-form-id={KIT_FORM_ID}
          style={{ width: "100%", minHeight: 420, border: "none", borderRadius: 8 }}
        />
      </>
    );
  }
  return (
    <>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 18px" }}>
        Send us a quick email and we&rsquo;ll reply with the agent, the kit, and your 5-day course.
      </p>
      <a
        href={KIT_FALLBACK_MAILTO}
        className="rg-hero-cta"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 17, lineHeight: 1, padding: "18px 24px", borderRadius: "var(--r-hero-sm)", textDecoration: "none", boxShadow: "var(--shadow-orange)" }}
      >
        Send me the free agent <span aria-hidden="true">→</span>
      </a>
    </>
  );
}

export default function ClaudeCodeTemplatesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(FAQS)]} />
      <main>
        <section
          aria-labelledby="kit-heading"
          style={{ background: "linear-gradient(180deg, var(--navy) 0%, #15233D 100%)", paddingTop: "clamp(112px, 13vh, 144px)", paddingBottom: "clamp(64px, 8vh, 96px)" }}
        >
          <div className="rg-container">
            <Breadcrumbs items={crumbs} dark inHero />
            <div className="rg-kit-hero">
              <div>
                <p className="rg-label" style={{ color: "var(--orange-on-dark)", margin: "var(--s4) 0 var(--s5)" }}>Free AI Agent</p>
                <h1 id="kit-heading" className="rg-display" style={{ fontSize: "var(--fs-hero)", color: "#fff", margin: 0, lineHeight: 0.96 }}>
                  Wake Up to an Inbox
                  <span style={{ display: "block", color: "var(--orange)" }}>That&rsquo;s Already Sorted.</span>
                </h1>
                <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: "46ch", margin: "var(--s5) 0 0", textWrap: "pretty" }}>
                  A free AI agent that reviews your Gmail every morning at 8 and emails you what needs a
                  reply, what you&rsquo;re waiting on, and what to skip. Copy, paste, done in 10 minutes.
                </p>
                <ul className="rg-kit-list">
                  {KIT_PROMISE.map((t) => (
                    <li key={t}>
                      <span aria-hidden="true">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rg-kit-card" id="get-the-kit">
                <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-ink)", margin: 0 }}>Get the agent</p>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", lineHeight: 1.25, margin: "8px 0 14px" }}>
                  Join the AI Builder newsletter and get the agent free.
                </h2>
                <SignupBox />
                <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--muted)", margin: "14px 0 0" }}>
                  One useful email a week after the course. Unsubscribe any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: "#fff", paddingBlock: "var(--section-y)" }}>
          <div className="rg-container rg-kit-two">
            <div>
              <h2 className="rg-display" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", color: "var(--navy)", margin: 0 }}>Your 8 AM Briefing</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--muted)", margin: "var(--s4) 0 0" }}>
                Every morning, one email in your inbox:
              </p>
              <div className="rg-brief-mock" aria-label="Example briefing">
                <p className="rg-brief-hi">Good morning.</p>
                <p className="rg-brief-ai">
                  <strong>Top priorities:</strong>{" "}Send Maria the roof quote. Confirm Thursday&rsquo;s install. Pay the supplier invoice.
                </p>
                <p className="rg-brief-h">Needs your reply (3)</p>
                <p className="rg-brief-h">Waiting on someone else (2)</p>
                <p className="rg-brief-h">Newsletters and notifications (11)</p>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", margin: "10px 0 0" }}>
                Example only. The AI summary on top is optional.
              </p>
            </div>
            <div>
              <h2 className="rg-display" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", color: "var(--navy)", margin: 0 }}>The 5-Day Course</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--muted)", margin: "var(--s4) 0 0" }}>
                One short email a day. By day five you&rsquo;ve changed your agent yourself and built your next one.
              </p>
              <ol className="rg-kit-days">
                {KIT_COURSE.map((d) => (
                  <li key={d.day}>
                    <span>{d.day}</span>
                    {d.title}
                  </li>
                ))}
              </ol>
              <Link href="/learn-claude-code" className="rg-hero-secondary" style={{ display: "inline-block", marginTop: "var(--s6)", color: "var(--navy)" }}>
                Rather build it with us? See 1-on-1 sessions
              </Link>
            </div>
          </div>
        </section>

        <section style={{ background: "var(--cream)", paddingBlock: "var(--section-y-tight)" }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            {FAQS.map((f) => (
              <details key={f.q} className="rg-faq" style={{ borderBottom: "1px solid var(--border)" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "18px 0", cursor: "pointer", fontSize: 16.5, fontWeight: 600, color: "var(--navy)", listStyle: "none" }}>
                  {f.q} <span aria-hidden="true" style={{ color: "var(--orange)" }}>+</span>
                </summary>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 18px" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
