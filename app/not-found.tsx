import type { Metadata } from "next";
import Link from "next/link";

// Own metadata so a 404 doesn't inherit the homepage title, canonical and
// "index, follow" from app/layout.tsx.
export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page doesn't exist. Find RGV Performance Marketing's services, pricing, blog or contact details instead.",
  alternates: { canonical: null },
  // null: Next already injects "noindex" on 404s; this drops the layout's "index, follow".
  robots: null,
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <main style={{ background: "var(--cream)", padding: "160px 0 120px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-ink)", margin: "0 0 12px" }}>
          404
        </p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1, margin: "0 0 16px" }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, margin: "0 0 32px" }}>
          The page you&apos;re looking for moved or never existed. Try one of these instead.
        </p>
        <nav aria-label="Helpful links" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", background: "#fff", border: "1px solid var(--border)", borderRadius: 6, padding: "10px 16px", textDecoration: "none" }}
            >
              {l.label} →
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
