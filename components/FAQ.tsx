"use client";
import { useState } from "react";
import { homeFaqs as faqs } from "@/lib/faqs";

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
