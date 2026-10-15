import Link from "next/link";
import { HSection } from "@/components/home/HomePrimitives";

/**
 * Section 8. Answers "what if it doesn't work, or I want out" right after
 * the prices. Only true statements; no invented guarantee.
 *
 * Item 2 uses the spec's fallback ("You work with the founders") until the
 * owner confirms clients keep their domain, Google profile and ad accounts
 * (spec decision #2). Approved alternative copy:
 *   "Your accounts stay yours." / "Your domain, Google Business Profile and
 *   ad accounts stay in your name. If you leave, they go with you."
 */
export default function RiskReversal() {
  return (
    <HSection surface="bone" tight labelledBy="risk-heading">
      <div className="rg-h-wrap">
        <div className="rg-h-risk-grid">
          <h2 id="risk-heading" className="rg-h-h2 rg-h-reveal">
            What you&rsquo;re actually signing up for
          </h2>
          <ul className="rg-h-risk-items">
            <li className="rg-h-reveal">
              <span className="rg-h-tick" aria-hidden="true" />
              <div>
                <h3 className="rg-h-h3">Month-to-month.</h3>
                <p className="rg-h-body">
                  Cancel any month. The only upfront fee on any plan is the $399 activation on
                  Build the Machine.
                </p>
              </div>
            </li>
            <li className="rg-h-reveal">
              <span className="rg-h-tick" aria-hidden="true" />
              <div>
                <h3 className="rg-h-h3">You work with the founders.</h3>
                <p className="rg-h-body">Derrick and Kelsey run your account, from the first call on.</p>
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
          traction, and we&rsquo;ll give you an honest timeline for each channel before you start.
        </p>
      </div>
    </HSection>
  );
}
