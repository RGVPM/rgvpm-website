import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | RGV Performance Marketing",
  description:
    "Terms & Conditions for RGV Performance Marketing services — billing, cancellation, refunds, intellectual property, and governing law.",
  alternates: { canonical: "/terms" },
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

export default function TermsPage() {
  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <div style={wrap}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28 }}>
          <Link href="/" style={{ color: "var(--orange)", textDecoration: "none", fontWeight: 600 }}>
            Home
          </Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>Terms &amp; Conditions</span>
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
          Terms &amp; Conditions
        </h1>
        <p style={{ ...p, color: "var(--muted)", marginBottom: 0 }}>Effective date: June 1, 2026</p>

        <h2 style={h2}>1. Overview</h2>
        <p style={p}>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern the digital marketing services
          provided by RGV Performance Marketing (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;), based in Harlingen, Texas, to you (&ldquo;Client&rdquo; or
          &ldquo;you&rdquo;). By engaging our services or subscribing to a plan, you agree to be
          bound by these Terms.
        </p>

        <h2 style={h2}>2. Services</h2>
        <p style={p}>
          RGV Performance Marketing provides digital marketing services that may include local SEO,
          paid advertising management, lead management, websites and landing pages, email and SMS
          campaigns, and related services as described in your selected plan. The specific scope of
          work depends on the plan you subscribe to.
        </p>

        <h2 style={h2}>3. Service Agreement &amp; Term</h2>
        <p style={p}>
          All services are provided on a month-to-month basis. There are no long-term contracts. Your
          subscription renews automatically each month until cancelled in accordance with the
          cancellation policy below.
        </p>

        <h2 style={h2}>4. Payment Terms</h2>
        <p style={p}>
          Services are billed monthly. Payment is due at the start of each billing period. Access to
          services and ongoing work is contingent on payment being current. Plans renew and bill
          automatically on the same date each month.
        </p>

        <h2 style={h2}>5. No Refunds</h2>
        <p style={p}>
          <strong>All payments are final.</strong> No refunds will be issued for any reason, including
          but not limited to unused time within a billing period, dissatisfaction with results, or
          cancellation mid-cycle. By subscribing, you acknowledge and accept this no-refund policy.
        </p>

        <h2 style={h2}>6. Activation Fees</h2>
        <p style={p}>
          Certain plans include a one-time activation fee that covers onboarding, account setup, and
          configuration. <strong>Activation fees are non-refundable</strong> under all circumstances.
        </p>

        <h2 style={h2}>7. Cancellation Policy</h2>
        <p style={p}>You may cancel at any time with no penalty. Cancellation works as follows:</p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            To begin cancellation, you must send a cancellation request via email to{" "}
            <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--orange)" }}>
              info@rgvperformancemarketing.com
            </a>
            .
          </li>
          <li style={li}>
            Upon receiving your request, we will send you a cancellation form to complete.
          </li>
          <li style={li}>
            <strong>
              Cancellation is only processed once the completed form is submitted &mdash; not upon
              your initial request.
            </strong>
          </li>
          <li style={li}>
            You remain responsible for any billing that occurs before the completed form is submitted
            and processed. Billing continues as normal until that point.
          </li>
        </ul>
        <p style={p}>
          Cancellation requests must be submitted at least 5 business days before the next billing
          date. Requests submitted less than 5 business days before the billing date will take effect
          the following billing cycle, and the client will be charged for that cycle normally.
        </p>

        <h2 style={h2}>8. Website Services &amp; Cancellation</h2>
        <p style={p}>
          Active clients on a paid plan are entitled to unlimited website update requests at no
          additional charge. Requests must be submitted at least 24 hours in advance. Updates are only
          available while the client&apos;s plan is active and in good standing. New pages, full
          redesigns, or significant structural changes may be quoted separately.
        </p>
        <p style={p}>
          Where RGV Performance Marketing built your website, the following applies upon cancellation
          of services:
        </p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            All lead capture forms installed on the website will be deactivated and removed.
          </li>
          <li style={li}>
            Any SMS, email inbox, chat, or booking widgets installed under the RGV Performance
            Marketing account will be disconnected.
          </li>
          <li style={li}>
            Review request automations and social media planner access tied to the agency account
            will be revoked.
          </li>
          <li style={li}>
            Any tracking pixels, GTM containers, or analytics configurations managed by RGV
            Performance Marketing may be removed.
          </li>
          <li style={li}>
            Website hosting provided through RGV Performance Marketing will be terminated. The client
            is responsible for migrating to their own hosting provider prior to or at the time of
            cancellation.
          </li>
          <li style={li}>
            Website files (HTML, code, images, copy) belong to the client upon final payment and will
            be made available for download upon request.
          </li>
          <li style={li}>
            Domain names should be, and are assumed to be, registered in the client&apos;s name. RGV
            Performance Marketing is not responsible for domain renewals.
          </li>
          <li style={li}>
            Google Business Profile access granted to the client remains the client&apos;s property.
          </li>
          <li style={li}>
            RGV Performance Marketing is not responsible for any loss of leads, traffic, or revenue
            resulting from cancellation of services.
          </li>
        </ul>

        <h2 style={h2}>9. Ad Spend</h2>
        <p style={p}>
          Where your plan includes paid advertising, we manage ad campaigns on your behalf. However,
          ad spend budgets &mdash; the amounts paid to platforms such as Google and Meta to run your
          ads &mdash; are billed directly to you by those platforms. Ad spend is not included in your
          monthly service fee and is not our financial responsibility. We help you set and manage your
          budget; you fund the ad accounts.
        </p>
        <p style={p}>
          All ad accounts (Google Ads, Meta Ads, etc.) are created under the client&apos;s own Google
          and/or Meta account. Client retains full ownership of all ad accounts, pixel data,
          audiences, and campaign history at all times, including after cancellation. RGV Performance
          Marketing will request access as a manager or partner &mdash; we do not take ownership of
          client ad accounts.
        </p>

        <h2 style={h2}>10. Termination by Us</h2>
        <p style={p}>
          We reserve the right to suspend or terminate service for non-payment or for abusive,
          unlawful, or otherwise inappropriate behavior toward our team. Termination for these reasons
          does not entitle you to a refund of any payments made.
        </p>

        <h2 style={h2}>11. Intellectual Property</h2>
        <p style={p}>
          Work product created specifically for you in the course of providing services becomes your
          property upon final payment for that work. Until final payment is received, all work product
          remains the property of RGV Performance Marketing. We retain the right to use general
          methods, know-how, and non-client-specific tools developed in the course of our business.
        </p>

        <h2 style={h2}>12. Limitation of Liability</h2>
        <p style={p}>
          To the fullest extent permitted by law, RGV Performance Marketing shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages, or for any loss of
          profits or revenue, arising out of or related to our services. We do not guarantee specific
          results, rankings, lead volumes, or revenue outcomes. Our total liability for any claim
          arising under these Terms shall not exceed the amount you paid us in the one (1) month
          preceding the event giving rise to the claim.
        </p>

        <h2 style={h2}>13. Governing Law</h2>
        <p style={p}>
          These Terms are governed by and construed in accordance with the laws of the State of Texas,
          without regard to its conflict-of-law provisions. Any disputes shall be resolved in the
          courts located in the State of Texas.
        </p>

        <h2 style={h2}>14. Contact</h2>
        <p style={p}>
          Questions about these Terms? Contact us at{" "}
          <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--orange)" }}>
            info@rgvperformancemarketing.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
