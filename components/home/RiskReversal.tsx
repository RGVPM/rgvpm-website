import Link from "next/link";
import { HSection } from "@/components/home/HomePrimitives";

/**
 * Section 8. Answers "what if it doesn't work, or I want out" right after
 * the prices. Only true statements; no invented guarantee.
 *
 * Every line is backed by /terms: cancellation (Section 7, 5 business days
 * before the next billing date), website files, domain and Google Business
 * Profile (Section 8), ad account ownership (Section 9), the BAA (#baa).
 * "Your accounts stay yours" is spec decision #2, narrowed to what the Terms
 * already say. Forms, inbox, widgets and hosting end on cancellation
 * (Section 8), so the copy never says "everything goes with you".
 */
export default function RiskReversal() {
  return (
    <HSection surface="bone" tight labelledBy="risk-heading">
      <div className="rg-h-wrap">
        <div className="rg-h-risk-grid">
          <h2 id="risk-heading" className="rg-h-h2 rg-h-reveal">
            What you&rsquo;re signing up for
          </h2>
          <ul className="rg-h-risk-items">
            <li className="rg-h-reveal">
              <span className="rg-h-tick" aria-hidden="true" />
              <div>
                <h3 className="rg-h-h3">Month-to-month.</h3>
                <p className="rg-h-body">
                  Cancel any month with 5 business days&rsquo; notice before your next billing date.
                  The only setup fee is the $399 activation on Build the Machine. Need a new site on
                  Build the Machine or Own the Market? We quote it up front, before you sign.
                </p>
              </div>
            </li>
            <li className="rg-h-reveal">
              <span className="rg-h-tick" aria-hidden="true" />
              <div>
                <h3 className="rg-h-h3">Your accounts stay yours.</h3>
                <p className="rg-h-body">
                  Your ad accounts, Google Business Profile and domain stay in your name, and the
                  site files we built are yours to download if you leave.
                </p>
              </div>
            </li>
            <li className="rg-h-reveal">
              <span className="rg-h-tick" aria-hidden="true" />
              <div>
                <h3 className="rg-h-h3">Ad spend goes straight to the platform.</h3>
                <p className="rg-h-body">
                  You pay Google or Meta directly and see every charge on your own statement.
                </p>
              </div>
            </li>
            <li className="rg-h-reveal">
              <span className="rg-h-tick" aria-hidden="true" />
              <div>
                <h3 className="rg-h-h3">HIPAA BAA for healthcare.</h3>
                <p className="rg-h-body">
                  Our Terms include a Business Associate Addendum for medspas, clinics and other
                  covered entities.{" "}
                  <Link href="/terms#baa" className="rg-h-link">
                    Read it
                  </Link>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p className="rg-h-honesty">
          We won&rsquo;t promise you a #1 ranking on Google. SEO usually takes 60 to 90 days to show
          traction, and we&rsquo;ll give you a timeline for each channel before you start.
        </p>
      </div>
    </HSection>
  );
}
