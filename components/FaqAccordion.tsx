"use client";
import { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {items.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
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
            maxHeight: open === i ? 400 : 0, overflow: "hidden",
            transition: "max-height 0.4s ease",
            fontSize: 14, color: "var(--muted)", lineHeight: 1.7,
            paddingBottom: open === i ? 22 : 0,
          }}>
            {faq.a}
          </div>
        </div>
      ))}
    </div>
  );
}
