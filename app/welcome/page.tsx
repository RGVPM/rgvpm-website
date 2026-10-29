import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";

/** Where Stripe Checkout lands a new client. Not for search, so noindex. */
export const metadata: Metadata = {
  title: "Welcome Aboard",
  robots: { index: false, follow: false },
};

const STEPS = [
  { title: "Check your inbox", text: "Your receipt is on its way, along with a short onboarding form: your logo, photos, services and the logins we'll need." },
  { title: "We reach out within one business day", text: "Someone from our team will call or email to confirm the details and answer any questions." },
  { title: "Your new site goes live in 8 to 10 days", text: "We build, you review, we launch. Your add-ons switch on as soon as the site is up." },
];

export default function WelcomePage() {
  return (
    <main>
      <PageHero
        tone="blue"
        eyebrow="You're in"
        title={
          <>
            Welcome Aboard.
            <br />
            <span style={{ color: "var(--navy)" }}>Those Hats Are Ours Now.</span>
          </>
        }
        subtitle="Thanks for signing up. Here's what happens next, and you don't have to do much of it."
      />
      <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
        <div className="rg-container">
          <ol className="rg-steps rg-steps--cream">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rg-step">
                <span className="rg-step-marker rg-display" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.3, color: "var(--navy)", margin: "0 0 var(--s3)" }}>{s.title}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{s.text}</p>
              </li>
            ))}
          </ol>
          <p style={{ margin: "var(--s8) auto 0", textAlign: "center", fontSize: 16, color: "var(--muted)" }}>
            Questions in the meantime? Call{" "}
            <a href={`tel:${SITE.phone}`} className="rg-text-link">{SITE.phoneHuman}</a> or email{" "}
            <a href={`mailto:${SITE.email}`} className="rg-text-link">{SITE.email}</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
