import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | RGV Performance Marketing",
  description:
    "Privacy Policy for RGV Performance Marketing — what information we collect, how we use it, cookies, data retention, and your right to request deletion.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const wrap: React.CSSProperties = {
  maxWidth: 800,
  margin: "0 auto",
  padding: "120px 24px 88px",
};

const h2: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 28,
  letterSpacing: "0.03em",
  color: "var(--navy)",
  lineHeight: 1.05,
  margin: "40px 0 12px",
};

const p: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
  fontSize: 16,
  lineHeight: 1.7,
  color: "var(--navy)",
  marginBottom: 14,
};

const li: React.CSSProperties = {
  ...p,
  marginBottom: 8,
};

export default function PrivacyPage() {
  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <div style={wrap}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28 }}>
          <Link href="/" style={{ color: "var(--orange)", textDecoration: "none", fontWeight: 600 }}>
            Home
          </Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>Privacy Policy</span>
        </nav>

        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 6vw, 60px)",
            letterSpacing: "0.02em",
            color: "var(--navy)",
            lineHeight: 1.0,
            marginBottom: 10,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ ...p, color: "var(--muted)", marginBottom: 0 }}>Effective date: June 1, 2026</p>

        <h2 style={h2}>1. Overview</h2>
        <p style={p}>
          This Privacy Policy explains how RGV Performance Marketing (&ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;), based in Harlingen, Texas, collects, uses, and
          protects information when you interact with us or use our services.
        </p>

        <h2 style={h2}>2. Information We Collect</h2>
        <p style={p}>
          We collect information you provide directly to us through our contact and intake forms,
          including your name, email address, phone number, and business information. We may also
          collect details you share with us in the course of providing services.
        </p>

        <h2 style={h2}>3. How We Use Your Information</h2>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>To provide, manage, and improve our services.</li>
          <li style={li}>To respond to your inquiries and communicate with you about your account.</li>
          <li style={li}>To send newsletters and marketing updates, but only if you have opted in.</li>
        </ul>

        <h2 style={h2}>4. We Do Not Sell Your Information</h2>
        <p style={p}>
          We do not sell your personal information to third parties. We do not trade or rent your
          personal data.
        </p>

        <h2 style={h2}>5. Third-Party Tools</h2>
        <p style={p}>
          We use third-party tools to operate our business and deliver services, including Google
          Analytics, Meta Ads, and SMS/email marketing platforms. These tools may collect data
          according to their own privacy policies, which are outside our control. We encourage you to
          review the privacy policies of these providers.
        </p>

        <h2 style={h2}>6. Cookies</h2>
        <p style={p}>
          We use cookies for analytics purposes only &mdash; to understand how visitors use our site
          so we can improve it. We do not use cookies to sell your data.
        </p>

        <h2 style={h2}>7. Data Retention</h2>
        <p style={p}>
          We retain client data for the duration of the service relationship plus one (1) year, after
          which it is eligible for deletion unless we are required to retain it longer by law.
        </p>

        <h2 style={h2}>8. Your Right to Deletion</h2>
        <p style={p}>
          You have the right to request deletion of your personal data. To do so, email us at{" "}
          <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--orange)" }}>
            info@rgvperformancemarketing.com
          </a>{" "}
          and we will process your request in accordance with applicable law.
        </p>

        <h2 style={h2}>9. Contact</h2>
        <p style={p}>
          For any privacy-related questions or requests, contact us at{" "}
          <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--orange)" }}>
            info@rgvperformancemarketing.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
