import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import nodePath from "node:path";
import { KIT_FILES, KIT_ZIP, KIT_DIR, KIT_NAME } from "@/lib/leadMagnet";
import { AI_BOOKING_URL } from "@/lib/aiImplementation";

/**
 * Where the lead-system form redirects after signup, and the link in the
 * welcome email. Not indexed. Every template is readable in place (read from
 * /public at build time) and downloadable as one zip.
 */
export const metadata: Metadata = {
  title: `Your ${KIT_NAME}`,
  robots: { index: false, follow: false },
};

function read(file: string) {
  return fs.readFileSync(nodePath.join(process.cwd(), "public", KIT_DIR, file), "utf8");
}

const mono = "var(--font-dm-mono), ui-monospace, monospace";

export default function KitPage() {
  return (
    <main>
      <section style={{ background: "linear-gradient(180deg, var(--navy) 0%, #15233D 100%)", paddingTop: "clamp(112px, 13vh, 144px)", paddingBottom: "clamp(56px, 7vh, 80px)" }}>
        <div className="rg-container">
          <p className="rg-label" style={{ color: "var(--orange-on-dark)", margin: "0 0 var(--s5)" }}>You&rsquo;re in</p>
          <h1 className="rg-display" style={{ fontSize: "var(--fs-hero)", color: "#fff", margin: 0, lineHeight: 0.96 }}>
            Your {KIT_NAME}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: "50ch", margin: "var(--s5) 0 var(--s6)" }}>
            Download everything as one zip, or read each template below. Day 1 of your course
            arrives by email tomorrow morning.
          </p>
          <a
            href={KIT_ZIP}
            download
            className="rg-hero-cta"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 18, lineHeight: 1, padding: "18px 26px", borderRadius: "var(--r-hero-sm)", textDecoration: "none", boxShadow: "var(--shadow-orange)" }}
          >
            Download the kit (.zip)
          </a>
        </div>
      </section>

      <section style={{ background: "var(--cream)", paddingBlock: "var(--section-y-tight)" }}>
        <div className="rg-container" style={{ maxWidth: 900 }}>
          {KIT_FILES.map((f, i) => (
            <details key={f.file} open={i === 0} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-md)", marginBottom: 12 }}>
              <summary style={{ cursor: "pointer", padding: "18px 22px", listStyle: "none" }}>
                <span style={{ display: "block", fontSize: 17, fontWeight: 700, color: "var(--navy)" }}>{f.title}</span>
                <span style={{ display: "block", fontSize: 14, color: "var(--muted)", marginTop: 3 }}>{f.text}</span>
                <span style={{ display: "block", fontFamily: mono, fontSize: 11.5, color: "var(--orange-ink)", marginTop: 6 }}>{f.file}</span>
              </summary>
              <pre style={{ margin: 0, padding: "18px 22px", borderTop: "1px solid var(--border)", background: "#FBFAF7", fontFamily: mono, fontSize: 13, lineHeight: 1.6, color: "var(--navy)", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowX: "auto" }}>
                {read(f.file)}
              </pre>
            </details>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--navy)", paddingBlock: "var(--section-y-tight)" }}>
        <div className="rg-container" style={{ textAlign: "center" }}>
          <h2 className="rg-display" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#fff", margin: "0 0 var(--s4)" }}>Want to Build It Together?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", margin: "0 auto var(--s6)", maxWidth: "46ch" }}>
            Book a 1-on-1 session and build a real tool for your business with us beside you.
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
