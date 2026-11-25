import Link from "next/link";
import { SOCIAL_PROFILES, ENTITY_SHORT } from "@/lib/site";
import BrandMark from "@/components/BrandMark";

function socialLabel(url: string): string {
  if (url.includes("instagram")) return "Instagram";
  if (url.includes("facebook")) return "Facebook";
  if (url.includes("linkedin")) return "LinkedIn";
  if (url.includes("youtube")) return "YouTube";
  if (url.includes("tiktok")) return "TikTok";
  if (url.includes("google")) return "Google";
  return "Profile";
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "#fff", padding: "var(--s9) 0 var(--s6)" }}>
      <div className="rg-container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: "var(--s9)" }} className="footer-grid-responsive">
          <div>
            <div style={{ marginBottom: 18 }}><BrandMark size={64} tone="dark" /></div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              {ENTITY_SHORT}
            </p>
            <address style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, fontStyle: "normal" }}>
              <div>📍 Harlingen, TX</div>
              <div>📞 <a href="tel:+19567939152" style={{ color: "var(--blue-on-dark)", textDecoration: "none" }}>(956) 793-9152</a></div>
              <div style={{ wordBreak: "break-word" }}>✉️ <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--blue-on-dark)", textDecoration: "none" }}>info@rgvperformancemarketing.com</a></div>
            </address>
            {SOCIAL_PROFILES.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 16px", marginTop: 18 }}>
                {SOCIAL_PROFILES.map((href) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
                    {socialLabel(href)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {[
            {
              title: "Services",
              links: [
                { label: "Website Design", href: "/services/website-design" },
                { label: "AI Consulting & Builds", href: "/services/ai-implementation" },
                { label: "Google Business Profile", href: "/services/google-business-profile" },
                { label: "Local SEO", href: "/services/local-seo" },
                { label: "Paid Advertising", href: "/services/paid-advertising" },
                { label: "Lead Management, SMS & Email", href: "/services/lead-management" },
                { label: "Social Media & Newsletter", href: "/services/social-media-newsletter" },
                { label: "Medspa Marketing", href: "/medspa-marketing" },
                { label: "Med Spa SEO", href: "/med-spa-seo" },
                { label: "Med Spa Advertising", href: "/med-spa-advertising" },
                { label: "Med Spa Social Media", href: "/med-spa-social-media-marketing" },
                { label: "ScanRank: AI Readiness Score", href: "/scanrank" },
                { label: "Med Spa Ad Checker", href: "/med-spa-ad-checker" },
                { label: "Learn Claude Code 1-on-1", href: "/learn-claude-code" },
              ],
            },
            {
              title: "Plans",
              links: [
                { label: "Website — $397/mo", href: "/pricing" },
                { label: "Add-ons — from $297/mo", href: "/pricing" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "Services", href: "/services" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
                { label: "Company Facts", href: "/company-facts" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "En español", href: "/es" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.66)", marginBottom: 18 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none" }}>
                {col.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: 9 }}>
                    <Link href={link.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Areas We Serve: one compact line. Every city page is linked from
            /areas-we-serve (and the Texas metros from /medspa-marketing#texas). */}
        <div className="footer-areas" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, paddingBottom: 24, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 20px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
          <span>Based in Harlingen, TX · Serving med spas nationwide</span>
          <span style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
            <Link href="/medspa-marketing#texas" style={{ color: "var(--blue-on-dark)", textDecoration: "none", fontWeight: 600 }}>Texas</Link>
            <Link href="/areas-we-serve" style={{ color: "var(--blue-on-dark)", textDecoration: "none", fontWeight: 600 }}>Areas we serve</Link>
          </span>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            © {new Date().getFullYear()} RGV Performance Marketing. All rights reserved.
          </div>
          <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.62)" }}>
            THE RGV PERFORMANCE MARKETING TEAM
          </div>
        </div>
      </div>
    </footer>
  );
}
