import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "#fff", padding: "64px 0 32px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="footer-grid-responsive">
          <div>
            <Image src="/logo.png" alt="RGV Performance Marketing" width={200} height={47} style={{ height: 47, width: "auto", marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              AI-powered digital marketing for local businesses. Websites, SEO, ads, lead management, newsletters, and more. Locally rooted. Built to scale.
            </p>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>
              <div>📍 Harlingen, TX</div>
              <div>✉️ <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--orange)", textDecoration: "none" }}>info@rgvperformancemarketing.com</a></div>
            </div>
          </div>

          {[
            {
              title: "Services",
              links: [
                { label: "Website Design", href: "/services/website-design" },
                { label: "AI Implementation", href: "/services/ai-implementation" },
                { label: "Google Business Profile", href: "/services/google-business-profile" },
                { label: "Local SEO", href: "/services/local-seo" },
                { label: "Paid Advertising", href: "/services/paid-advertising" },
                { label: "SMS & Email Marketing", href: "/services/sms-email-marketing" },
                { label: "Lead Management", href: "/services/lead-management" },
                { label: "Social Media & Newsletter", href: "/services/social-media-newsletter" },
              ],
            },
            {
              title: "Plans",
              links: [
                { label: "Plant the Flag — $399/mo", href: "/pricing" },
                { label: "Build the Machine — $899/mo", href: "/pricing" },
                { label: "Own the Market — $1,999/mo", href: "/pricing" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "Services", href: "/services" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 18 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none" }}>
                {col.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: 9 }}>
                    <Link href={link.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} RGV Performance Marketing. All rights reserved.
          </div>
          <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
            THE RGV PERFORMANCE MARKETING TEAM
          </div>
        </div>
      </div>
    </footer>
  );
}
