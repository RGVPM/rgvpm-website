"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. All plans are month-to-month. We believe in earning your business every month — not locking you in. The only upfront cost is the one-time activation fee on Plant the Flag and Build the Machine plans, which covers onboarding, setup, and getting everything configured.",
  },
  {
    q: "Is website design included in the plans?",
    a: "Website design is a separate service on all plans — not bundled into the monthly fee. This keeps plan pricing clean and means you're not paying for a website rebuild every month. We'll quote your site separately based on what you need, and it integrates seamlessly with whichever plan you're on.",
  },
  {
    q: "How does the newsletter work?",
    a: "Every month, you tell us the topic — a promotion, a seasonal update, a service spotlight, whatever makes sense for your business. We write it, design it, and send it to your customer list. You stay top of mind without lifting a finger.",
  },
  {
    q: "What's the social media planner tool?",
    a: "It's a scheduling tool included with every plan that lets you (or your team) plan and schedule posts across your social platforms from one place. On the Own the Market plan, we manage and post the content for you. On Plant the Flag and Build the Machine, you have the tool to do it yourself whenever you want.",
  },
  {
    q: "What does \"two-way SMS & email\" mean?",
    a: "It means you can have real back-and-forth conversations with leads and customers via text and email — all from one inbox. When someone texts your business number or replies to an email, you see it and can respond. On Build the Machine and up, you can also send broadcast campaigns — promos, announcements, and follow-ups — to your entire list at once.",
  },
  {
    q: "Does ad spend come out of the monthly fee?",
    a: "No. Ad management is included in your plan, but the actual spend (what you pay Google or Meta to run your ads) is a separate budget billed directly to you by the platform. We help you set the right budget and manage every dollar of it — you just fund the account.",
  },
  {
    q: "How quickly will I see results?",
    a: "Paid ads can generate leads within the first week. SEO takes 60–90 days to show meaningful traction but compounds over time. GBP optimization and reputation management often show results within 30 days. We'll give you honest timelines for every channel from day one.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "We work with service-based local businesses across industries — home services, medical and wellness, salons, contractors, restaurants, retail, healthcare, auto services, and professional services. If you serve customers locally and need more of them finding you online, we can help.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: "96px 0", background: "var(--cream)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
            FAQ
          </span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,4vw,54px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 16px" }}>
            Common Questions
          </h2>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65 }}>Straight answers. No runaround.</p>
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  gap: 16, padding: "22px 0", cursor: "pointer",
                  background: "none", border: "none", textAlign: "left",
                  fontSize: 16, fontWeight: 600, color: open === i ? "var(--orange)" : "var(--navy)",
                  transition: "color 0.2s", fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                {faq.q}
                <span style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                  background: open === i ? "var(--orange)" : "var(--cream-dark)",
                  color: open === i ? "#fff" : "var(--navy)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                  transform: open === i ? "rotate(45deg)" : "none",
                  transition: "transform 0.3s, background 0.2s",
                }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? 300 : 0, overflow: "hidden",
                transition: "max-height 0.4s ease",
                fontSize: 14, color: "var(--muted)", lineHeight: 1.7,
                paddingBottom: open === i ? 22 : 0,
              }}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
