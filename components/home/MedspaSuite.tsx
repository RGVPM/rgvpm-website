import { BrowserFrame } from "@/components/home/afterglow/DeviceFrame";
import { HButton, HEyebrow, HLink, bookingHref } from "@/components/home/HomePrimitives";

/**
 * Section 3, `#medspas`: golden hour, close-up. The medspa focus: the
 * founders' real Aesthetic Record background, a real aesthetics site we
 * built (auto-scrolling inside a peach-lit arch), the four capabilities as
 * a treatment menu, and the HIPAA BAA as a still plaque (never a seal: it
 * must not read as a certification). No outcomes, no medical claims.
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
    <section id="medspas" aria-labelledby="medspa-heading" className="ev-section ev-medspa">
      {/* data-chat-hold: the chat widget waits until this band is scrolled past. */}
      <div className="ev-wrap ev-medspa-panel" data-chat-hold="">
        <div className="ev-medspa-top">
          <div className="ev-medspa-head">
            <HEyebrow>For medspas and aesthetic practices</HEyebrow>
            <h2 id="medspa-heading" className="ev-h2 ev-h2--soft" data-ev-reveal="">
              Built for medspas that want a fuller <strong>book</strong>.
            </h2>
            <p className="ev-lede ev-rise">
              Kelsey spent five years at Aesthetic Record, a leading software platform for the
              aesthetics industry, working with hundreds of clinic owners. Derrick helped build its
              lead management and marketing division. Now we run the marketing side for practices
              like yours.
            </p>
          </div>

          <figure className="ev-arch-scene">
            <span className="ev-arch-glow" aria-hidden="true" />
            <span className="ev-arch" aria-hidden="true" />
            <a
              href="https://www.dvashaesthetics.com"
              target="_blank"
              rel="noopener"
              className="ev-arch-browser"
              aria-label="dvashaesthetics.com: D’Vash Aesthetics website, built by us (opens in a new tab)"
            >
              <BrowserFrame
                slug="dvash-aesthetics"
                host="dvashaesthetics.com"
                alt="Full page of the D’Vash Aesthetics website"
                sizes="(max-width: 1023px) 88vw, 560px"
                className="ev-autoscroll"
              />
            </a>
            <figcaption className="ev-medspa-credit">
              <a href="https://www.dvashaesthetics.com" target="_blank" rel="noopener">
                D&rsquo;Vash Aesthetics<span className="sr-only"> (opens in a new tab)</span>
              </a>
              . Website by RGV Performance Marketing.
            </figcaption>
          </figure>
        </div>

        <ul className="ev-menu">
          {CAPABILITIES.map((c) => (
            <li key={c.title} className="ev-menu-item">
              <div className="ev-menu-line">
                <h3 className="ev-menu-title">
                  <span className="ev-mask">
                    <span>{c.title}</span>
                  </span>
                </h3>
                <span className="ev-menu-leader" aria-hidden="true" />
                <p className="ev-menu-plan">{c.plan}</p>
              </div>
              <p className="ev-menu-body">{c.body}</p>
            </li>
          ))}
        </ul>

        <div className="ev-medspa-foot">
          <div className="ev-plaque ev-rise">
            <div className="ev-plaque-inner">
              <p className="ev-plaque-label">HIPAA BAA</p>
              <h3 className="ev-h3">HIPAA Business Associate Addendum</h3>
              <p>
                It&rsquo;s part of our Terms. If you&rsquo;re a covered entity and we handle patient
                information for you, it takes effect the day you subscribe.
              </p>
              <HLink href="/terms#baa">Read the addendum</HLink>
            </div>
          </div>

          <div className="ev-medspa-cta ev-rise">
            <p className="ev-small">
              We keep outcome promises out of your copy, and we follow each ad platform&rsquo;s rules on before-and-after images.
            </p>
            <div className="ev-ctas">
              <HButton href={bookingHref("medspa")} event="medspa_cta_click">
                Book a free strategy call
              </HButton>
              <HLink href="#plans" event="pricing_link_click" eventLabel="medspa">
                See the plan we recommend for medspas
              </HLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
