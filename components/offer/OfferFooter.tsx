import Image from "next/image";
import Link from "next/link";
import { OFFER_LINKS } from "@/lib/offer";
import { SITE, SERVICE_AREA_CITIES } from "@/lib/site";

/**
 * The landing page's own footer.
 *
 * Not the site footer, which carries ~60 city and service links and would
 * undo the point of a focused landing page. Just identity, contact, and the
 * two legal routes.
 *
 * The standalone "Offer Terms & Disclaimers" section that used to sit above
 * this was removed. Every point it made still appears on the page: the
 * 12-month condition in the agreement callout under the pricing cards, and
 * turnaround, standard updates, usage-based charges and the no-SEO-guarantee
 * language in the FAQ — which is also where the asterisks now resolve.
 */

const YEAR = 2026;

export default function OfferFooter() {
  return (
    <footer className="lp-footer">
      <div className="rg-container">
        <div className="lp-footer-top">
          <div>
            <Image
              src="/logo.png"
              alt="RGV Performance Marketing"
              width={200}
              height={44}
              sizes="200px"
              style={{ height: 44, width: "auto" }}
            />
            <p className="lp-footer-blurb">
              Websites, lead management and SEO for Texas businesses. Based in {SITE.city},{" "}
              {SITE.region}.
            </p>
          </div>

          <div className="lp-footer-contact">
            <a href={OFFER_LINKS.sms}>Text {OFFER_LINKS.phoneHuman}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={OFFER_LINKS.booking} target="_blank" rel="noopener noreferrer">
              Book a free consultation
            </a>
          </div>
        </div>

        <p className="lp-footer-area">
          Serving {SERVICE_AREA_CITIES.join(" · ")} and businesses across Texas.
        </p>

        <div className="lp-footer-bottom">
          <p>
            © {YEAR} {SITE.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <Link href="/">Home</Link>
            <a href="#faq">FAQ</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
