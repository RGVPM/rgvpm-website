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

/* Small line icons in on-dark-soft (replaces the old emoji). */
const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  style: { flexShrink: 0, color: "var(--on-dark-soft)" },
};
const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const contactRow = { display: "flex", alignItems: "center", gap: 8 } as const;

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "#fff", padding: "var(--s9) 0 var(--s6)", borderTop: "1px solid rgba(247,244,239,0.1)" }}>
      <div className="rg-container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: "var(--s9)" }} className="footer-grid-responsive">
          <div>
            <Image src="/logo.png" alt="RGV Performance Marketing" width={200} height={47} sizes="200px" style={{ height: 47, width: "auto", marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              An AI and marketing agency for local businesses. Websites, SEO, ads, and AI systems that answer calls and follow up for you. Locally rooted. Built to scale.
            </p>
            <address style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, fontStyle: "normal" }}>
              <div style={contactRow}><PinIcon /> Harlingen, TX</div>
              <div style={contactRow}><PhoneIcon /> <a href="tel:+19567939152" style={{ color: "var(--orange-on-dark)", textDecoration: "none" }}>(956) 793-9152</a></div>
              <div style={{ ...contactRow, wordBreak: "break-word" }}><MailIcon /> <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--orange-on-dark)", textDecoration: "none" }}>info@rgvperformancemarketing.com</a></div>
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
                { label: "AI Consulting & Builds", href: "/services/ai-implementation" },
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
                { label: "Plant the Flag · $397/mo", href: "/pricing" },
                { label: "SEO Package · $597/mo", href: "/pricing" },
                { label: "Build the Machine · $899/mo", href: "/pricing" },
                { label: "Own the Market · $1,499/mo", href: "/pricing" },
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

        {/* Areas We Serve: internal links to every city landing page. A
            <details> so phones can collapse it (it is most of the footer's
            height there); on wider screens globals.css keeps it open. The
            links are in the HTML either way. */}
        <details className="rg-footer-areas" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, marginBottom: 8 }}>
          <summary style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.66)", marginBottom: 14 }}>
            Areas We Serve
          </summary>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "22px 24px" }}>
            {cities.map((c) => (
              <div key={c.slug}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>{c.name}, TX</div>
                <div className="rg-footer-city-links" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  <Link href={localSeoCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Local SEO</Link>
                  <Link href={gbpCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Google Business Profile</Link>
                  <Link href={googleAdsCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Google Ads</Link>
                  <Link href={webDesignCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>Website Design</Link>
                  <Link href={aiCityPath(c.slug)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.68)", textDecoration: "none" }}>AI Implementation</Link>
                </div>
              </div>
            ))}
          </div>
        </details>

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
