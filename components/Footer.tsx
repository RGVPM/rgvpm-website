import Image from "next/image";
import Link from "next/link";
import { cities, webDesignCityPath, aiCityPath } from "@/lib/cities";
import { localSeoCityPath } from "@/lib/localSeo";
import { googleAdsCityPath } from "@/lib/googleAds";
import { gbpCityPath } from "@/lib/gbp";
import { SOCIAL_PROFILES } from "@/lib/site";

function socialLabel(url: string): string {
  if (url.includes("instagram")) return "Instagram";
  if (url.includes("facebook")) return "Facebook";
  if (url.includes("linkedin")) return "LinkedIn";
  if (url.includes("youtube")) return "YouTube";
  if (url.includes("google")) return "Google";
  return "Profile";
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "#fff", padding: "var(--s9) 0 var(--s6)" }}>
      <div className="rg-container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: "var(--s9)" }} className="footer-grid-responsive">
          <div>
            <Image src="/logo.png" alt="RGV Performance Marketing" width={200} height={47} sizes="200px" style={{ height: 47, width: "auto", marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              AI-powered digital marketing for local businesses. Websites, SEO, ads, lead management, newsletters, and more. Locally rooted. Built to scale.
            </p>
            <address style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, fontStyle: "normal" }}>
              <div>📍 Harlingen, TX</div>
              <div>📞 <a href="tel:+19567939152" style={{ color: "var(--orange-on-dark)", textDecoration: "none" }}>(956) 793-9152</a></div>
              <div style={{ wordBreak: "break-word" }}>✉️ <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--orange-on-dark)", textDecoration: "none" }}>info@rgvperformancemarketing.com</a></div>
            </address>
            {SOCIAL_PROFILES.length > 0 && (
              <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
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
                { label: "Own the Market — $2,499/mo", href: "/pricing" },
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

        {/* Areas We Serve — internal links to every city landing page */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.66)", marginBottom: 14 }}>
            Areas We Serve
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "22px 24px" }}>
            {cities.map((c) => (
              <div key={c.slug}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>{c.name}, TX</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <Link href={localSeoCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Local SEO</Link>
                  <Link href={gbpCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Google Business Profile</Link>
                  <Link href={googleAdsCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Google Ads</Link>
                  <Link href={webDesignCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Website Design</Link>
                  <Link href={aiCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>AI Implementation</Link>
                </div>
              </div>
            ))}
          </div>
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
