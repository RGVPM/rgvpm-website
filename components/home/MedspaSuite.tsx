import Image from "next/image";
import { BezelFrame, HButton, HEyebrow, HLink, HSection, bookingHref } from "@/components/home/HomePrimitives";

/**
 * Section 3, `#medspas`. The medspa focus: the founders' real Aesthetic
 * Record background, a real aesthetics site we built, and the HIPAA BAA
 * that is live in our Terms. No outcomes, no medical claims.
 *
 * Not shown without the client's written OK (spec decision #5): a named
 * panel for our Tacoma, WA medspa client.
 */
const CAPABILITIES = [
  {
    title: "A site that sells the consult.",
    body: "Your treatment menu, your providers, and a Book button within reach on every screen. Fast on the phone your patients are holding.",
    plan: "Included on Plant the Flag and SEO Package. Quoted up front on Build the Machine.",
  },
  {
    title: "Found for the treatments you sell.",
    body: "A complete Google Business Profile and local pages built around the searches your patients type, like lip filler or laser hair removal near them.",
    plan: "From $597/mo",
  },
  {
    title: "Ads written for the rules.",
    body: "Google or Meta campaigns built inside each platform’s health, beauty and prescription-drug rules. We promote the consult and the practice, with landing pages that match the ad. You fund the spend directly.",
    plan: "Google or Meta from $899/mo. Both from $1,499/mo.",
  },
  {
    title: "Follow-up and rebooks.",
    body: "Inquiries, texts and email in one inbox, with reminders when it’s time to rebook.",
    plan: "From $899/mo",
  },
];

export default function MedspaSuite() {
  return (
    <HSection id="medspas" surface="blush" labelledBy="medspa-heading" className="rg-h-medspa">
      {/* data-chat-hold: the chat widget waits until this band is scrolled past. */}
      <div className="rg-h-wrap" data-chat-hold="">
        <div className="rg-h-head rg-h-reveal">
          <HEyebrow>For medspas and aesthetic practices</HEyebrow>
          <h2 id="medspa-heading" className="rg-h-h2">
            Built for medspas that want a fuller <em>book</em>.
          </h2>
          <p className="rg-h-lede">
            Kelsey spent five years at Aesthetic Record, a leading software platform for the
            aesthetics industry, working with hundreds of clinic owners. Derrick helped build its
            lead management and marketing division. Now we run the marketing side for practices
            like yours.
          </p>
        </div>

        <div className="rg-h-medspa-grid rg-h-reveal">
          <a
            href="https://www.dvashaesthetics.com"
            target="_blank"
            rel="noopener"
            className="rg-h-media rg-h-medspa-shot"
          >
            <Image
              src="/work/dvash-aesthetics-clean.webp"
              alt="Homepage of the D'Vash Aesthetics website"
              width={1200}
              height={750}
              sizes="(max-width: 1023px) 92vw, 680px"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>

          <BezelFrame tone="dark" className="rg-h-baa">
            <span className="rg-h-seal" aria-hidden="true">
              <span>
                <span>HIPAA</span>
                <strong>BAA</strong>
              </span>
            </span>
            <h3 className="rg-h-h3">HIPAA Business Associate Addendum</h3>
            <p>
              It&rsquo;s part of our Terms. If you&rsquo;re a covered entity and we handle patient
              information for you, it takes effect the day you subscribe.
            </p>
            <HLink href="/terms#baa">Read the addendum</HLink>
          </BezelFrame>
        </div>
        <p className="rg-h-medspa-credit">
          <a href="https://www.dvashaesthetics.com" target="_blank" rel="noopener">
            D&rsquo;Vash Aesthetics<span className="sr-only"> (opens in a new tab)</span>
          </a>
          . Website by RGV Performance Marketing.
        </p>

        <ul className="rg-h-caps">
          {CAPABILITIES.map((c) => (
            <li key={c.title} className="rg-h-reveal">
              <h3 className="rg-h-h3">{c.title}</h3>
              <p className="rg-h-body">{c.body}</p>
              <p className="rg-h-cap-plan">{c.plan}</p>
            </li>
          ))}
        </ul>

        <div className="rg-h-medspa-foot">
          <p className="rg-h-small">
            We keep outcome promises out of your copy, and we follow each ad platform&rsquo;s rules on before-and-after images.
          </p>
          <div className="rg-h-ctas">
            <HButton href={bookingHref("medspa")} event="medspa_cta_click">
              Book a free strategy call
            </HButton>
            <HLink href="#plans" event="pricing_link_click" eventLabel="medspa">
              See the plan we recommend for medspas
            </HLink>
          </div>
        </div>
      </div>
    </HSection>
  );
}
