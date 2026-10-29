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
          <Link href="/" style={{ color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}>
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
        <p style={{ ...p, color: "var(--muted)", marginBottom: 0 }}>
          Effective date: June 1, 2026 &middot; Last updated: October 14, 2026
        </p>

        <h2 style={h2}>1. Overview</h2>
        <p style={p}>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern the digital marketing services
          provided by RGV Performance Marketing (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;), based in Harlingen, Texas, to you (&ldquo;Client&rdquo; or
          &ldquo;you&rdquo;). By engaging our services or subscribing to a plan, you agree to be
          bound by these Terms, including the{" "}
          <a href="#baa" style={{ color: "var(--blue)" }}>
            HIPAA Business Associate Addendum
          </a>{" "}
          in Section 14 where it applies to you.
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

        <h2 style={h2}>6. Build Fees</h2>
        <p style={p}>
          The website plan, when purchased on its own, includes a one-time build fee that covers design,
          build, and setup. <strong>Build fees are non-refundable</strong> under all circumstances.
        </p>

        <h2 style={h2}>7. Cancellation Policy</h2>
        <p style={p}>You may cancel at any time with no penalty. Cancellation works as follows:</p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            To begin cancellation, you must send a cancellation request via email to{" "}
            <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--blue)" }}>
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

        <h2 id="baa" style={{ ...h2, scrollMarginTop: 100 }}>
          14. HIPAA Business Associate Addendum
        </h2>
        <p style={p}>
          This Business Associate Addendum (&ldquo;Addendum&rdquo;) is part of these Terms. It applies
          only if you are a &ldquo;Covered Entity&rdquo; or &ldquo;Business Associate&rdquo; under the
          Health Insurance Portability and Accountability Act of 1996, the HITECH Act, and their
          implementing regulations at 45 C.F.R. Parts 160 and 164 (together, &ldquo;HIPAA&rdquo;), and
          we create, receive, maintain, or transmit Protected Health Information on your behalf in the
          course of providing services. When it applies, you and we agree that accepting these Terms
          (including by subscribing to a plan) executes this Addendum, effective on the date you
          accept. Capitalized terms used but not defined here, such as &ldquo;Protected Health
          Information&rdquo; (&ldquo;PHI&rdquo;), &ldquo;Breach,&rdquo; &ldquo;Security
          Incident,&rdquo; &ldquo;Unsecured PHI,&rdquo; and &ldquo;Secretary,&rdquo; have the meanings
          given in HIPAA. PHI here means only PHI we create, receive, maintain, or transmit on your
          behalf.
        </p>

        <p style={{ ...p, fontWeight: 700, marginTop: 22 }}>14.1 Permitted uses and disclosures</p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            We may use and disclose PHI only as needed to perform the services in your plan, as
            required by law, or as otherwise permitted by this Addendum, and only in a manner that
            would not violate HIPAA if done by you.
          </li>
          <li style={li}>
            We may use PHI for our proper management and administration and to carry out our legal
            responsibilities. We may disclose PHI for those purposes if the disclosure is required by
            law, or if we obtain reasonable assurances from the recipient that it will keep the PHI
            confidential, use or further disclose it only as required by law or for the purpose for
            which it was disclosed, and notify us of any breach of confidentiality it becomes aware of.
          </li>
          <li style={li}>
            We will limit our uses, disclosures, and requests of PHI to the minimum necessary to
            accomplish the intended purpose.
          </li>
          <li style={li}>
            We may de-identify PHI in accordance with 45 C.F.R. &sect; 164.514(a)&ndash;(c).
            De-identified information is not PHI.
          </li>
        </ul>

        <p style={{ ...p, fontWeight: 700, marginTop: 22 }}>14.2 Marketing, advertising, and tracking</p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            We will not use or disclose PHI for marketing communications, audience building, or ad
            targeting unless HIPAA permits it, including, where required, a valid patient
            authorization that you obtain and provide to us.
          </li>
          <li style={li}>
            We will not knowingly upload or transmit PHI to advertising, social media, or analytics
            platforms (for example, Google Ads, Google Analytics, or Meta) or to any other vendor that
            has not agreed in writing to protect PHI as required by HIPAA.
          </li>
          <li style={li}>
            You agree to send PHI to us only through the systems we designate in writing for PHI, and
            not through ad platforms, social media messages, or other channels not designated for PHI.
          </li>
        </ul>

        <p style={{ ...p, fontWeight: 700, marginTop: 22 }}>14.3 Our obligations</p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            We will not use or disclose PHI other than as permitted by this Addendum or required by
            law.
          </li>
          <li style={li}>
            We will use appropriate administrative, physical, and technical safeguards, and comply with
            Subpart C of 45 C.F.R. Part 164 (the Security Rule) for electronic PHI, to prevent use or
            disclosure of PHI other than as provided by this Addendum.
          </li>
          <li style={li}>
            We will report to you any use or disclosure of PHI not provided for by this Addendum that
            we become aware of, including any Breach of Unsecured PHI as required by 45 C.F.R. &sect;
            164.410, and any Security Incident, without unreasonable delay and in no case later than
            ten (10) business days after discovery. Breach reports will include the information
            required by 45 C.F.R. &sect; 164.410(c) to the extent available. This paragraph serves as
            notice of, and no further report is required for, unsuccessful Security Incidents such as
            pings, port scans, blocked log-in attempts, and denial-of-service attempts that do not
            result in unauthorized access, use, or disclosure of PHI.
          </li>
          <li style={li}>
            We will mitigate, to the extent practicable, any harmful effect known to us of a use or
            disclosure of PHI in violation of this Addendum.
          </li>
          <li style={li}>
            In accordance with 45 C.F.R. &sect;&sect; 164.502(e)(1)(ii) and 164.308(b)(2), we will
            ensure that any subcontractor that creates, receives, maintains, or transmits PHI on our
            behalf agrees in writing to the same restrictions, conditions, and requirements that apply
            to us under this Addendum.
          </li>
          <li style={li}>
            Within fifteen (15) days of your request, we will make PHI in a Designated Record Set that
            we maintain available to you as needed for you to meet your obligations under 45 C.F.R.
            &sect; 164.524, and make amendments to such PHI as you direct under 45 C.F.R. &sect;
            164.526.
          </li>
          <li style={li}>
            We will document disclosures of PHI and, within fifteen (15) days of your request, provide
            the information you need to respond to an individual&apos;s request for an accounting of
            disclosures under 45 C.F.R. &sect; 164.528.
          </li>
          <li style={li}>
            If an individual asks us directly to access, amend, or account for their PHI, we will
            forward the request to you within five (5) business days.
          </li>
          <li style={li}>
            To the extent we carry out any of your obligations under Subpart E of 45 C.F.R. Part 164
            (the Privacy Rule), we will comply with the requirements of Subpart E that apply to you in
            the performance of that obligation.
          </li>
          <li style={li}>
            We will make our internal practices, books, and records relating to PHI available to the
            Secretary for purposes of determining compliance with HIPAA.
          </li>
        </ul>

        <p style={{ ...p, fontWeight: 700, marginTop: 22 }}>14.4 Your obligations</p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            You will notify us of any limitation in your notice of privacy practices, any change in or
            revocation of an individual&apos;s permission to use or disclose PHI, and any restriction
            on the use or disclosure of PHI you have agreed to under 45 C.F.R. &sect; 164.522, to the
            extent it may affect our use or disclosure of PHI.
          </li>
          <li style={li}>
            You will not ask us to use or disclose PHI in any manner that would not be permissible
            under HIPAA if done by you.
          </li>
          <li style={li}>
            You are responsible for obtaining any patient consents and authorizations required for the
            services you direct us to perform, including marketing and SMS or email communications.
          </li>
        </ul>

        <p style={{ ...p, fontWeight: 700, marginTop: 22 }}>14.5 Term and termination</p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            This Addendum stays in effect for as long as we provide services to you, and afterward
            until all PHI is returned or destroyed, or protected as described below.
          </li>
          <li style={li}>
            If you determine that we have materially breached this Addendum, you may give us written
            notice and an opportunity to cure. If we do not cure the breach within thirty (30) days,
            you may terminate your services immediately, notwithstanding Section 7.
          </li>
          <li style={li}>
            When services end for any reason, we will return or destroy all PHI that we still maintain
            in any form, and keep no copies. If return or destruction is infeasible, we will extend
            the protections of this Addendum to that PHI and limit further uses and disclosures to the
            purposes that make return or destruction infeasible, for as long as we maintain it.
          </li>
        </ul>

        <p style={{ ...p, fontWeight: 700, marginTop: 22 }}>14.6 General</p>
        <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
          <li style={li}>
            If this Addendum conflicts with any other part of these Terms or with our Privacy Policy as
            to PHI, this Addendum controls.
          </li>
          <li style={li}>
            A reference to a section of HIPAA means that section as in effect or as amended. We will
            amend this Addendum as needed to comply with changes in HIPAA, and any ambiguity will be
            resolved to permit compliance with HIPAA.
          </li>
          <li style={li}>
            Nothing in this Addendum gives any rights or remedies to anyone other than you and us. The
            parties&apos; obligations under Section 14.5 survive termination.
          </li>
          <li style={li}>
            If you need a countersigned copy of this Addendum for your records, email{" "}
            <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--blue)" }}>
              info@rgvperformancemarketing.com
            </a>
            . Notices under this Addendum should be sent to the same address.
          </li>
        </ul>

        <h2 style={h2}>15. Contact</h2>
        <p style={p}>
          Questions about these Terms? Contact us at{" "}
          <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "var(--blue)" }}>
            info@rgvperformancemarketing.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
