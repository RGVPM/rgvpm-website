import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import nodePath from "node:path";
import CopyButton from "@/components/CopyButton";
import { KIT_ZIP, KIT_DIR, KIT_NAME, KIT_AGENT_FILE } from "@/lib/leadMagnet";
import { AI_BOOKING_URL } from "@/lib/aiImplementation";

/**
 * Where the lead-system form redirects after signup, and the link in the
 * welcome email. Not indexed. Leads with the four-step agent setup and the
 * script (with a copy button); the Claude Code extras sit below. Files are
 * read from /public at build time so the page and the zip never drift.
 */
export const metadata: Metadata = {
  title: `Your Morning Inbox Agent + ${KIT_NAME}`,
  robots: { index: false, follow: false },
};

function read(file: string) {
  return fs.readFileSync(nodePath.join(process.cwd(), "public", KIT_DIR, file), "utf8");
}

const mono = "var(--font-dm-mono), ui-monospace, monospace";

const STEPS = [
  { title: "Open Google Apps Script", body: <>Go to <a href="https://script.google.com" target="_blank" rel="noopener noreferrer">script.google.com</a>, signed in to the Gmail account you want briefed, and click <strong>New project</strong>.</> },
  { title: "Paste the agent", body: <>Delete the code that&rsquo;s there, click <strong>Copy the script</strong> below, paste it in, and click <strong>Save</strong>.</> },
  { title: "Optional: turn on the AI summary", body: <>Get a Claude API key at <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a>. In Apps Script, open <strong>Project Settings</strong> (gear icon) &gt; <strong>Script properties</strong> &gt; <strong>Add script property</strong>. Name it <code>ANTHROPIC_API_KEY</code> and paste your key. Typically a few cents a day.</> },
  { title: "Start it", body: <>Pick <strong>setup</strong> in the function menu and click <strong>Run</strong>. Approve the Google permissions (it&rsquo;s your own script: Advanced &gt; Go to project &gt; Allow). Your first briefing arrives within a minute, then every morning around 8.</> },
];

const EXTRAS = [
  { file: "CLAUDE.md", title: "CLAUDE.md template", text: "Drop it in your next Claude Code project and fill in the blanks." },
  { file: "claude-code-cheat-sheet.md", title: "Claude Code cheat sheet", text: "The commands and habits you'll use every day." },
  { file: "morning-inbox-agent-setup.md", title: "Full setup guide + how to customize with Claude Code", text: "Change the time, add urgent rules, send it to your assistant, and more." },
];

export default function KitPage() {
  const script = read(KIT_AGENT_FILE);
  return (
    <main>
      <section style={{ background: "linear-gradient(180deg, var(--navy) 0%, #15233D 100%)", paddingTop: "clamp(112px, 13vh, 144px)", paddingBottom: "clamp(56px, 7vh, 80px)" }}>
        <div className="rg-container">
          <p className="rg-label" style={{ color: "var(--orange-on-dark)", margin: "0 0 var(--s5)" }}>You&rsquo;re in</p>
          <h1 className="rg-display" style={{ fontSize: "var(--fs-hero)", color: "#fff", margin: 0, lineHeight: 0.96 }}>
            Set Up Your Morning Inbox Agent
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: "50ch", margin: "var(--s5) 0 0" }}>
            Four steps, about 10 minutes, no coding. Tomorrow morning your inbox briefing is waiting for you.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", paddingBlock: "var(--section-y-tight)" }}>
        <div className="rg-container" style={{ maxWidth: 900 }}>
          <ol className="rg-setup-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="rg-step-marker rg-display" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 style={{ fontSize: 19, fontWeight: 700, color: "var(--navy)", margin: 0 }}>{s.title}</h2>
                  <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--muted)", margin: "6px 0 0" }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rg-code-box">
            <div className="rg-code-bar">
              <span style={{ fontFamily: mono, fontSize: 12.5, color: "rgba(255,255,255,0.8)" }}>{KIT_AGENT_FILE}</span>
              <CopyButton text={script} />
            </div>
            <pre>{script}</pre>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream)", paddingBlock: "var(--section-y-tight)" }}>
        <div className="rg-container" style={{ maxWidth: 900 }}>
          <h2 className="rg-display" style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "var(--navy)", margin: "0 0 var(--s3)" }}>Your Claude Code Starter Kit</h2>
          <p style={{ fontSize: 16, color: "var(--muted)", margin: "0 0 var(--s5)" }}>
            For when you&rsquo;re ready to build your next agent.{" "}
            <a href={KIT_ZIP} download style={{ color: "var(--orange-ink)", fontWeight: 700 }}>Download everything (.zip)</a>
          </p>
          {EXTRAS.map((f) => (
            <details key={f.file} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-md)", marginBottom: 12 }}>
              <summary style={{ cursor: "pointer", padding: "18px 22px", listStyle: "none" }}>
                <span style={{ display: "block", fontSize: 17, fontWeight: 700, color: "var(--navy)" }}>{f.title}</span>
                <span style={{ display: "block", fontSize: 14, color: "var(--muted)", marginTop: 3 }}>{f.text}</span>
              </summary>
              <pre style={{ margin: 0, padding: "18px 22px", borderTop: "1px solid var(--border)", background: "#FBFAF7", fontFamily: mono, fontSize: 13, lineHeight: 1.6, color: "var(--navy)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {read(f.file)}
              </pre>
            </details>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--navy)", paddingBlock: "var(--section-y-tight)" }}>
        <div className="rg-container" style={{ textAlign: "center" }}>
          <h2 className="rg-display" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#fff", margin: "0 0 var(--s4)" }}>Want to Build Your Next Agent Together?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", margin: "0 auto var(--s6)", maxWidth: "46ch" }}>
            Book a 1-on-1 session and build a real tool for your business with Claude Code, with us beside you.
          </p>
          <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s4)", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <a href={AI_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rg-hero-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 17, lineHeight: 1, padding: "17px 26px", borderRadius: "var(--r-hero-sm)", textDecoration: "none" }}>
              Book a build session <span aria-hidden="true">→</span>
            </a>
            <Link href="/learn-claude-code" className="rg-hero-secondary">How sessions work</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
