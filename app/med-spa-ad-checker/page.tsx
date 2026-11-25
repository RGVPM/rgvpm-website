import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import AdChecker from "@/components/AdChecker";
import { SOURCES, type Source } from "@/lib/adChecker/rules";
import { canonical, breadcrumbSchema, faqSchema, SITE, socialMeta, ORGANIZATION_ID } from "@/lib/site";

const path = "/med-spa-ad-checker";
const url = canonical(path);
const title = "Med Spa Ad Checker: Will Meta Reject Your Ad?";
const description =
  "Free Med Spa Ad Checker. Paste your Facebook or Instagram ad and see the words Meta is likely to reject, why, and what to write instead. Runs in your browser. No email needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `${title} | ${SITE.name}`, description }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Medspa Marketing", path: "/medspa-marketing" },
  { name: "Med Spa Ad Checker", path },
];

const REASONS: { title: string; text: string; sources: Source[] }[] = [
  {
    title: "The ad talks about the reader's body or health",
    text: "Meta bans ads that \"assert or imply personal attributes,\" including physical or mental health. \"Are you tired of your wrinkles?\" breaks the rule. \"Smooth the look of fine lines\" does not.",
    sources: [SOURCES.metaPersonal],
  },
  {
    title: "The ad makes people feel bad about how they look",
    text: "Weight loss and cosmetic ads can't contain \"statements of inferiority about physical appearance.\" Words like \"ugly,\" \"flabby\" or \"stop hiding\" are the usual triggers.",
    sources: [SOURCES.metaHealth, SOURCES.metaIntro],
  },
  {
    title: "The ad names a prescription drug",
    text: "Botox, Dysport, semaglutide and tirzepatide are prescription drugs. Meta only allows prescription drug ads from advertisers certified by LegitScript or approved through Meta's own review, aimed at people 18+ in the US, Canada or New Zealand.",
    sources: [SOURCES.metaDrugs],
  },
  {
    title: "Before-and-after photos break the rules",
    text: "Meta's rules on before-and-after photos have changed several times. Some versions ban side-by-side photos for weight loss and wrinkle treatments. Weight loss ads can't show close-ups that pinch fat.",
    sources: [SOURCES.metaHealth],
  },
  {
    title: "The audience includes people under 18",
    text: "Ads for weight loss and for cosmetic procedures \"must be targeted to people at least 18 years or older.\" This is a setting in Ads Manager, not something in the text.",
    sources: [SOURCES.metaHealth],
  },
  {
    title: "The ad promises fast or guaranteed results",
    text: "Meta bans health ads with \"exaggerated or extreme claims, or promises of specific outcomes within a set timeframe.\" \"Lose 20 lbs in 30 days\" and \"guaranteed results\" fall here.",
    sources: [SOURCES.metaHealth],
  },
  {
    title: "The ad makes a health claim it can't prove",
    text: "Meta bans claims to cure diseases like diabetes or thyroid problems. The FTC says health claims need \"competent and reliable scientific evidence,\" so \"clinically proven,\" \"FDA approved\" and \"#1\" need proof.",
    sources: [SOURCES.metaHealth, SOURCES.ftcHealth, SOURCES.ftcFaq],
  },
];

const faqs = [
  {
    q: "Can a med spa say \"Botox\" in a Facebook or Instagram ad?",
    a: "Botox is a prescription drug. Meta's Drugs and Pharmaceuticals policy only allows ads that promote prescription drugs from advertisers who are certified by LegitScript or approved through Meta's own review. Those ads must also include a disclaimer to consult a licensed health professional and target people 18+ in the US, Canada or New Zealand. Meta's policy page doesn't list brand names, so it's Meta's reviewers who decide if an ad promotes the drug.",
  },
  {
    q: "Can I use before-and-after photos in med spa ads?",
    a: "Sometimes. The current Meta Health and Wellness page allows before-and-after for general cosmetic procedures when the ad targets people 18+. Earlier versions banned side-by-side photos for weight loss and for wrinkle treatments like Botox and fillers, and weight loss ads still can't show close-ups that pinch fat. Use real, realistic photos and say how long the results took.",
  },
  {
    q: "Why did Meta reject my ad for \"personal attributes\"?",
    a: "Meta doesn't let ads suggest they know something personal about the reader, like their health, weight or age. \"You\" is fine by itself. \"Are you tired of your belly fat?\" is not, because it says the reader has belly fat. Talk about the treatment instead of the reader's body.",
  },
  {
    q: "Do med spa ads have to target 18 and older?",
    a: "Yes, for most of them. Meta says ads for weight loss products and services, and for cosmetic products, procedures or surgeries, must be targeted to people at least 18 years old. Prescription drug ads must also target 18+ only. Set this in Ads Manager before you publish.",
  },
  {
    q: "If my ad passes this checker, will Meta approve it?",
    a: "Not for sure. This tool checks the words in your ad for common reasons Meta rejects med spa ads. Meta reviews every ad itself, including the images, the landing page and your targeting. Passing here lowers your risk. It doesn't guarantee approval, and it isn't legal advice.",
  },
  {
    q: "Can it check the words on my ad image?",
    a: "Yes. Upload up to 3 images (PNG, JPG or WebP). The checker reads the words on them right in your browser and runs the same rules on that text. Your image stays on your device. We don't upload or save it. The text reader can miss or misread fancy, script or very small fonts, and text on busy photos, so check the \"Text found in your image\" box and fix any mistakes. It reads words only. It doesn't judge the photo itself, so before-and-after photos still need the checkbox.",
  },
  {
    q: "Do you save my ad or need my email?",
    a: "No. The checker runs in your browser with a fixed list of rules. Your ad text and images never leave your device. The form under the results is optional and only for people who want us to write and run their ads.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  url,
  name: title,
  description,
  publisher: { "@id": ORGANIZATION_ID },
  about: { "@type": "Thing", name: "Meta advertising policies for med spa ads" },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${url}#tool`,
  name: "Med Spa Ad Checker",
  alternateName: "Med Spa Ad Checker: Will Meta reject your ad?",
  url,
  description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (runs in the browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  provider: { "@id": ORGANIZATION_ID },
};

export default function MedSpaAdCheckerPage() {
  return (
    <>
      <JsonLd data={[pageSchema, appSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Free tool for med spas"
          title={title}
          subtitle="Paste your Facebook or Instagram ad. We'll flag the words Meta is likely to reject, tell you why, and suggest what to write instead."
          crumbs={crumbs}
        />

        <section className="rg-svc-band" style={{ background: "var(--cream)" }} id="check">
          <div className="rg-container" style={{ maxWidth: 900 }}>
            <p className="rg-svc-body" style={{ maxWidth: "70ch", marginBottom: 24 }}>
              Meta has strict rules for cosmetic treatments, weight loss and
              prescription drugs like Botox and semaglutide. This checker looks for the most common problems we see.
              You can also upload your ad image and we&apos;ll read the words on it. It all runs in your browser, works without an email, and every rule links to the policy it comes from.
            </p>
            <div className="avc-card">
              <AdChecker />
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 900 }}>
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              <span className="rg-pill">Meta ad rules</span>
              <h2 className="rg-display rg-svc-h2">The 7 Most Common Reasons Med Spa Ads Get Rejected</h2>
              <p className="rg-svc-body">
                Each one comes straight from Meta&apos;s Advertising Standards or the FTC&apos;s guidance. Click a source
                to read the rule yourself.
              </p>
            </div>
            <ol className="adc-reasons">
              {REASONS.map((r) => (
                <li key={r.title}>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  <p className="adc-source">
                    Source:{" "}
                    {r.sources.map((s, i) => (
                      <span key={s.url}>
                        {i > 0 && "; "}
                        <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
            <p className="rg-svc-body" style={{ marginTop: 28, maxWidth: "70ch" }}>
              Want ads written to these rules from the start? See{" "}
              <Link href="/med-spa-advertising" className="rg-text-link">med spa advertising</Link> and{" "}
              <Link href="/pricing" className="rg-text-link">our prices</Link>. Curious if AI assistants can find your
              website? Try <Link href="/scanrank" className="rg-text-link">ScanRank</Link>, our free AI readiness score.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">Med Spa Ad Questions</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <InnerCTA
          heading="Want Us to Run Your Ads?"
          text="Book fifteen minutes with Kelsey. We'll look at your ads and tell you what to change so they get approved and bring in bookings."
        />
      </main>
    </>
  );
}
