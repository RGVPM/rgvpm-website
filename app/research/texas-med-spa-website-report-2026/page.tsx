import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import {
  REPORT,
  HAVE_IT,
  BOOKING_PLATFORMS,
  BOOKING_WITH_PLATFORM,
  LLMS_SPLIT,
  SCORE_DIST,
  SPEED,
  ACCURACY,
  HEADLINES,
} from "@/lib/medspaWebsiteReport";
import { canonical, breadcrumbSchema, SITE, socialMeta, founderRef, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/site";

const path = REPORT.path;
const url = canonical(path);
const title = REPORT.title;
const description = `We scanned ${REPORT.sample} med spa and aesthetic practice homepages, mostly in Texas, for booking, click-to-call, chat, schema, llms.txt, reviews and prices.`;

export const metadata: Metadata = {
  title: { absolute: REPORT.seoTitle },
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: REPORT.seoTitle, description, type: "article" }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Medspa Marketing", path: "/medspa-marketing" },
  { name: "Texas Med Spa Website Report 2026", path },
];

const published = "November 22, 2026";
const maxScore = Math.max(...SCORE_DIST);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${url}#article`,
  headline: title,
  description,
  url,
  datePublished: REPORT.datePublished,
  dateModified: REPORT.datePublished,
  image: `${SITE.url}/opengraph-image`,
  inLanguage: "en-US",
  articleSection: "Research",
  author: founderRef(),
  publisher: { "@id": ORGANIZATION_ID },
  isPartOf: { "@id": WEBSITE_ID },
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  about: { "@id": `${url}#dataset` },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": `${url}#dataset`,
  name: "The Texas Med Spa Website Report 2026 (aggregate results)",
  description: `Aggregate results from an automated scan of ${REPORT.sample} public med spa and aesthetic practice homepages, collected ${REPORT.dateCollected}. Measures HTTPS, mobile viewport, online booking platform links, tap-to-call links, text and chat options, LocalBusiness and FAQ schema, llms.txt, AI crawler rules in robots.txt, on-page reviews, published prices and HTML size. Only shares across the sample are published; no individual practice is identified.`,
  url,
  creator: founderRef(),
  publisher: { "@id": ORGANIZATION_ID },
  datePublished: REPORT.datePublished,
  temporalCoverage: REPORT.dateCollected,
  spatialCoverage: { "@type": "Place", name: "Texas, United States (plus a small number of sites in Arizona and Florida)" },
  isAccessibleForFree: true,
  measurementTechnique: "Automated homepage fetch with a custom user agent, robots.txt respected, up to 3 concurrent requests; pattern detection on HTML; 15-site manual spot-check",
  variableMeasured: [
    "HTTPS", "Mobile viewport meta tag", "Online booking platform link", "Tap-to-call link", "SMS link or chat widget",
    "LocalBusiness-type JSON-LD", "FAQPage JSON-LD", "llms.txt", "AI crawler blocks in robots.txt",
    "Reviews or testimonials", "Published treatment prices", "HTML size", "Server response time",
  ],
};

function Bars({ rows, navy = false, label }: { rows: readonly { label: string; pct: number }[]; navy?: boolean; label: string }) {
  return (
    <ul className="rpt-chart" aria-label={label}>
      {rows.map((r) => (
        <li key={r.label} className="rpt-bar-row">
          <span className="rpt-bar-label">{r.label}</span>
          <span className="rpt-bar-track" aria-hidden="true">
            <span className={`rpt-bar-fill${navy ? " rpt-bar-fill--navy" : ""}`} style={{ width: `${r.pct}%`, display: "block" }} />
          </span>
          <span className="rpt-bar-val">{Math.round(r.pct)}%</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHead({ pill, heading, children }: { pill: string; heading: string; children?: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 720, marginBottom: 32 }}>
      <span className="rg-pill">{pill}</span>
      <h2 className="rg-display rg-svc-h2">{heading}</h2>
      {children}
    </div>
  );
}

const CHECKLIST = [
  {
    t: "Put a booking link in your header and hero.",
    d: "Link straight to your booking page in Boulevard, Aesthetic Record, Vagaro or whatever you use. A contact form makes the patient wait for you to call back.",
  },
  {
    t: "Make every phone number a tap-to-call link.",
    d: "Wrap the number in a tel: link so a phone dials it in one tap. It takes your web person five minutes.",
  },
  {
    t: "Give people a way to text you.",
    d: "Some people can't take a call at work. Add an sms: link or a chat or text widget that reaches a person, and answer it the same day.",
  },
  {
    t: "Add LocalBusiness schema to your homepage.",
    d: "Use MedicalBusiness or another LocalBusiness subtype with your name, address, phone, hours and booking link. Google and AI assistants read it to confirm who you are and where you are.",
  },
  {
    t: "Show reviews on the homepage.",
    d: "Pull in your Google reviews or post real patient quotes, with their permission. Half the sites we scanned showed none.",
  },
  {
    t: "Publish starting prices.",
    d: "A \"from\" price per unit, syringe or session answers the first question most people have. Four out of five sites we scanned published none.",
  },
  {
    t: "Read your llms.txt before you trust it.",
    d: "If your platform made one for you, open it. Check that it names your treatments, city, phone and booking link, and fix anything wrong or missing.",
  },
  {
    t: "Check what your robots.txt allows.",
    d: "Few sites blocked AI crawlers, and most that did used a Cloudflare setting. Decide on purpose whether you want ChatGPT, Perplexity and Google's AI features to read your site.",
  },
] as const;

export default function StateOfMedSpaWebsitesPage() {
  const totalExcluded = REPORT.excluded.parked + REPORT.excluded.unreachable + REPORT.excluded.agencyClients;
  return (
    <>
      <JsonLd data={[articleSchema, datasetSchema, breadcrumbSchema(crumbs)]} />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Original research"
          title={title}
          subtitle={`We checked ${REPORT.sample} med spa websites across Texas. 79% give patients no way to text or chat.`}
          crumbs={crumbs}
        >
          <div className="rpt-meta">
            <span>By Derrick Tamez</span>
            <span>Published {published}</span>
            <span>{REPORT.sample} websites</span>
          </div>
        </PageHero>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <SectionHead pill="Key findings" heading="Eight Numbers From 686 Homepages">
              <p className="rg-svc-body">
                Most sites load over HTTPS and fit a phone screen. The gaps show up when a visitor tries to book, call,
                text or check a price. Every number below covers the full sample. We name no practice.
              </p>
            </SectionHead>
            <div className="rpt-stats">
              {HEADLINES.map((h) => (
                <div key={h.text} className="rpt-stat">
                  <p className="rpt-stat-num">
                    {h.num}
                    <span>{h.unit}</span>
                  </p>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <SectionHead pill="The basics" heading="What a Typical Homepage Has">
              <p className="rg-svc-body">Share of the {REPORT.sample} homepages where we found each item.</p>
            </SectionHead>
            <Bars rows={HAVE_IT} label={`Share of ${REPORT.sample} med spa homepages with each item`} />
            <p className="rpt-note">
              Online booking counts only a link or embed for a known booking platform on the homepage. A practice that
              books through a form, a phone call or a page one click deep shows up here as no booking, so treat 57% as
              a floor.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <SectionHead pill="Booking" heading="Which Booking Tools Med Spas Link To">
              <p className="rg-svc-body">
                {BOOKING_WITH_PLATFORM} homepages linked to an online booking platform. Boulevard and Aesthetic Record
                led, and no single tool reached one in five. Some sites link to more than one, so the shares add up to
                more than 100%.
              </p>
            </SectionHead>
            <Bars rows={BOOKING_PLATFORMS} navy label={`Booking platforms linked from ${BOOKING_WITH_PLATFORM} med spa homepages`} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <SectionHead pill="AI search" heading="Ready for ChatGPT and AI Overviews?">
              <p className="rg-svc-body">
                AI assistants answer questions like &quot;best Botox near me&quot; by reading websites. We checked three
                things that help or block them: an llms.txt file, schema markup, and AI crawler rules in robots.txt.
              </p>
            </SectionHead>

            <h3 style={{ fontSize: 18, color: "var(--navy)", margin: "0 0 12px" }}>llms.txt across all {REPORT.sample} sites</h3>
            <div
              className="rpt-stack"
              role="img"
              aria-label={LLMS_SPLIT.map((s) => `${s.label}: ${Math.round(s.pct)}%`).join("; ")}
            >
              {LLMS_SPLIT.map((s) => (
                <span key={s.label} style={{ width: `${s.pct}%`, background: s.color }} />
              ))}
            </div>
            <ul className="rpt-legend">
              {LLMS_SPLIT.map((s) => (
                <li key={s.label}>
                  <i style={{ background: s.color }} aria-hidden="true" />
                  {s.label} ({Math.round(s.pct)}%)
                </li>
              ))}
            </ul>
            <p className="rpt-note">
              Wix, Shopify and SEO plugins such as Rank Math, Yoast and All in One SEO now create llms.txt files on
              their own. That explains most of the 42%. We found these files but did not grade what they say.
            </p>

            <div className="rpt-stats" style={{ marginTop: 40 }}>
              <div className="rpt-stat">
                <p className="rpt-stat-num">52<span>%</span></p>
                <p>had LocalBusiness-type schema. 25% used a medical type such as MedicalBusiness or MedicalClinic.</p>
              </div>
              <div className="rpt-stat">
                <p className="rpt-stat-num">7<span>%</span></p>
                <p>had FAQ schema on the homepage.</p>
              </div>
              <div className="rpt-stat">
                <p className="rpt-stat-num">2<span>%</span></p>
                <p>blocked GPTBot, ClaudeBot or Google-Extended in robots.txt, mostly through Cloudflare&apos;s managed setting.</p>
              </div>
              <div className="rpt-stat">
                <p className="rpt-stat-num">0</p>
                <p>sites blocked OAI-SearchBot (ChatGPT search) or PerplexityBot.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <SectionHead pill="Scorecard" heading="How Many of Eight Basics Each Site Passed">
              <p className="rg-svc-body">
                We scored each homepage on eight checks: HTTPS, mobile viewport, online booking, tap-to-call, text or
                chat, LocalBusiness schema, reviews and published prices. The median site passed five. Eleven passed
                all eight.
              </p>
            </SectionHead>
            <div
              role="img"
              aria-label={`Number of sites by score out of 8: ${SCORE_DIST.map((n, i) => `${i}: ${n}`).join(", ")}`}
            >
              <div className="rpt-cols" aria-hidden="true">
                {SCORE_DIST.map((n, i) => (
                  <div key={i} className="rpt-col">
                    <span className="rpt-col-val">{n}</span>
                    <span className="rpt-col-bar" style={{ height: `${Math.max(1, (n / maxScore) * 100)}%` }} />
                  </div>
                ))}
              </div>
              <div className="rpt-col-axis" aria-hidden="true">
                {SCORE_DIST.map((_, i) => (
                  <span key={i}>{i}/8</span>
                ))}
              </div>
            </div>
            <p className="rpt-note">Number of sites at each score. 48% passed four or fewer.</p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <SectionHead pill="Page weight" heading="Homepage Size and Server Response">
              <p className="rg-svc-body">
                We measured the HTML document and how fast the server answered. These numbers cover the HTML only, not
                images, scripts or fonts.
              </p>
            </SectionHead>
            <div className="rpt-table-wrap">
              <table className="rpt-table">
                <caption className="sr-only">Homepage HTML size and server response time</caption>
                <thead>
                  <tr>
                    <th scope="col">Measure</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Median HTML size</td><td>{SPEED.htmlKbMedian} KB</td></tr>
                  <tr><td>HTML size, heaviest quarter starts at</td><td>{SPEED.htmlKbP75} KB</td></tr>
                  <tr><td>Sites with more than 500 KB of HTML</td><td>{Math.round(SPEED.htmlOver500Pct)}%</td></tr>
                  <tr><td>Median time to first byte</td><td>{SPEED.ttfbMedian} s</td></tr>
                  <tr><td>Sites taking longer than 1 second to first byte</td><td>{Math.round(SPEED.ttfbOver1sPct)}%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="rpt-note">
              Big HTML usually means a page builder packed its settings into the page. The phone has to download and
              read all of it before the page shows up.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 860 }}>
            <SectionHead pill="Your practice" heading="What This Means for Your Practice">
              <p className="rg-svc-body">
                Open your own homepage on your phone and go down this list. Most fixes take an afternoon, and none
                needs a new website.
              </p>
            </SectionHead>
            <ol className="rpt-check">
              {CHECKLIST.map((c) => (
                <li key={c.t}>
                  <strong>{c.t}</strong>
                  {c.d}
                </li>
              ))}
            </ol>
            <p className="rg-svc-body" style={{ marginTop: 28 }}>
              Want a team to handle the list? See how we run{" "}
              <Link href="/medspa-marketing" className="rg-text-link">marketing for med spas</Link>, or check{" "}
              <Link href="/pricing" className="rg-text-link">our published pricing</Link>.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }} id="methodology">
          <div className="rg-container" style={{ maxWidth: 860 }}>
            <SectionHead pill="Methodology" heading="How We Ran the Scan" />
            <div className="rpt-method">
              <h3>The sample</h3>
              <p>
                We started from med spa and aesthetic practice lists that RGV Performance Marketing built for its own
                outreach: {REPORT.domains} unique website domains after removing duplicates. We kept med spas,
                injectors, laser and body-contouring clinics, and cosmetic dermatology. We dropped practices listed only
                as weight loss, IV therapy, hormones or plastic surgery. Listings that pointed to a booking page or social
                profile instead of the practice&apos;s own domain stayed out.
              </p>
              <p>
                We then removed {totalExcluded} domains: {REPORT.excluded.parked} parked, expired or &quot;coming
                soon&quot; pages, {REPORT.excluded.unreachable} that failed to load, refused automated visitors or asked
                crawlers to stay out in robots.txt, and our own clients. That left {REPORT.sample} homepages.
              </p>
              <div className="rpt-table-wrap">
                <table className="rpt-table">
                  <caption className="sr-only">Sample by region</caption>
                  <thead>
                    <tr>
                      <th scope="col">Region</th>
                      <th scope="col">Sites</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REPORT.regions.map((r) => (
                      <tr key={r.name}><td>{r.name}</td><td>{r.n}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: 12 }}>
                This is a convenience sample, not a random one. It leans toward Texas metros and the Rio Grande Valley, so
                read it as a picture of Texas med spas, not every med spa in the country.
              </p>

              <h3>What we measured</h3>
              <ul>
                <li><strong>HTTPS and mobile:</strong> the homepage loads over HTTPS with a valid certificate; the HTML has a viewport meta tag.</li>
                <li><strong>Online booking:</strong> a link or embed for a known booking platform, including Aesthetic Record, Boulevard, Vagaro, Zenoti, Mindbody, Jane, Square, Mangomint, GlossGenius, Acuity, Calendly, PatientNow, AestheticsPro and Moxie.</li>
                <li><strong>Tap-to-call:</strong> at least one tel: link.</li>
                <li><strong>Text or chat:</strong> an sms: link or a known chat or text widget, such as LeadConnector, Podium, Birdeye, Weave or Tidio.</li>
                <li><strong>Schema:</strong> JSON-LD with LocalBusiness or a subtype (MedicalBusiness, MedicalClinic, HealthAndBeautyBusiness, DaySpa and others), and FAQPage.</li>
                <li><strong>llms.txt:</strong> a plain-text or Markdown file at /llms.txt that starts like an llms.txt file. We sorted files by whether a platform or plugin labeled itself as the author.</li>
                <li><strong>AI crawlers:</strong> whether robots.txt blocks the homepage for GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot or Google-Extended.</li>
                <li><strong>Reviews:</strong> a review widget, review schema, or a reviews or testimonials section in the page text.</li>
                <li><strong>Prices:</strong> at least two different dollar amounts next to treatment words (units, syringes, facials, laser, sessions and so on) on the homepage or on a linked pricing page. We ignored discounts, gift cards, financing and deposits.</li>
                <li><strong>HTML size and response time:</strong> the size of the homepage HTML and the time to first byte, from one request.</li>
              </ul>

              <h3>How we collected it</h3>
              <p>
                On {published}, a script fetched each public homepage plus robots.txt, llms.txt and any linked pricing
                page. It identified itself as &quot;RGVPM-research&quot;, made no more than three requests at a time,
                gave up after 15 seconds, and skipped any site whose robots.txt disallowed it. It read only public pages
                and submitted no forms.
              </p>

              <h3>Accuracy</h3>
              <p>
                We checked {ACCURACY.sites} randomly picked homepages by hand against nine detectors.{" "}
                {ACCURACY.correct} of {ACCURACY.checks} calls matched ({Math.round((ACCURACY.correct / ACCURACY.checks) * 1000) / 10}%).
                Both misses were booking: one practice ran its booking platform under its own subdomain, and another
                placed its booking widget one page deep. Booking numbers therefore run low. An earlier hand check of 15
                other sites turned up gaps we fixed before the final run: Wix settings code that looked like chat
                widgets, cookie-consent lists that named review tools, and booking tools missing from our list.
              </p>

              <h3>Limits</h3>
              <ul>
                <li>We scanned homepages only. A site can have booking, prices or schema on other pages.</li>
                <li>Sites that build the page in the browser with JavaScript can hide links from an HTML scan, so some counts run low.</li>
                <li>We detect that a feature exists, not whether it works well.</li>
                <li>This is one day&apos;s snapshot. Sites change.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }} id="cite">
          <div className="rg-container" style={{ maxWidth: 860 }}>
            <div className="rpt-cite">
              <span className="rg-pill rg-pill--cream">Cite this report</span>
              <p style={{ marginTop: 18 }}>
                You can quote these numbers in articles, decks and posts. Please link back to this page.
              </p>
              <code>
                Tamez, D. (2026). The Texas Med Spa Website Report 2026. RGV Performance Marketing. {url}
              </code>
              <p style={{ marginTop: 14, marginBottom: 0, fontSize: 14.5 }}>
                Questions about the data? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </div>
          </div>
        </section>

        <InnerCTA
          heading="Want Your Site Checked?"
          text="Book fifteen minutes. We'll open your homepage with you and walk through the same eight checks."
        />
      </main>
    </>
  );
}
