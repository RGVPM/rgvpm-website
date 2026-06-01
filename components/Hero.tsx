"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

type Stat = {
  num?: string;
  target?: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { num: "AI", label: "Powered systems & tools" },
  { target: 24, suffix: "/7", label: "Always-on lead capture" },
  { num: "956", target: 956, label: "Locally rooted. Broadly serving." },
];

function StatValue({ stat, duration = 1500 }: { stat: Stat; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  const numberStyle: React.CSSProperties = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 32,
    color: "var(--orange)",
    letterSpacing: "0.04em",
  };

  useEffect(() => {
    // Non-numeric stats (e.g. "AI") render statically — nothing to count.
    if (stat.target == null) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(stat.target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
              setValue(Math.round(eased * (stat.target as number)));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.target, duration]);

  if (stat.target == null) {
    return <div style={numberStyle}>{stat.num}</div>;
  }

  return (
    <div ref={ref} style={numberStyle}>
      {value}
      {stat.suffix ?? ""}
    </div>
  );
}

export default function Hero() {
  const services = [
    { icon: "globe" as const, name: "Websites & SEO", sub: "Built to rank. Built to convert." },
    { icon: "megaphone" as const, name: "Paid Advertising", sub: "Google, Meta, retargeting" },
    { icon: "chat" as const, name: "Two-Way SMS & Email", sub: "Inbox, blasts & automation" },
    { icon: "calendar" as const, name: "Social Media Planner", sub: "Schedule posts across platforms" },
    { icon: "settings" as const, name: "Lead Management", sub: "Pipelines, follow-up, appointments" },
  ];

  return (
    <section
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", background: "var(--navy)",
        position: "relative", overflow: "hidden", paddingTop: 72,
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.035,
        backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", right: -100, top: -100, width: 700, height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,98,26,0.15) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}
          className="hero-grid-responsive">
          {/* Left */}
          <div>
            <div className="hero-animate" style={{ marginBottom: 24, animationDelay: "0.05s" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-dm-mono), monospace", fontSize: 11,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--orange)", background: "rgba(232,98,26,0.15)",
                padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)",
              }}>
                AI-Powered Digital Marketing
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(50px, 6vw, 84px)", lineHeight: 0.95,
              color: "#fff", letterSpacing: "0.02em", marginBottom: 24,
            }}>
              <span className="hero-animate" style={{ display: "block", animationDelay: "0.15s" }}>
                More Leads.
              </span>
              <span className="hero-animate" style={{ display: "block", color: "var(--orange)", animationDelay: "0.25s" }}>
                More Customers.
              </span>
              <span className="hero-animate" style={{ display: "block", animationDelay: "0.35s" }}>
                Less Guesswork.
              </span>
            </h1>
            <p className="hero-animate" style={{ fontSize: 18, fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 480, marginBottom: 36, animationDelay: "0.45s" }}>
              We build the digital systems that grow your business — websites, SEO, ads, lead management, and more. Straightforward plans, real results.
            </p>
            <div className="hero-animate" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48, animationDelay: "0.55s" }}>
              <a href="https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
                Book a Free Call →
              </a>
              <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
                View Plans →
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <StatValue stat={s} />
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="hidden lg:block hero-card-animate">
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 28, backdropFilter: "blur(8px)" }}>
              <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 18 }}>
                {"// What we handle"}
              </div>
              {services.map((svc) => (
                <div key={svc.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 7, background: "var(--orange-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={svc.icon} size={17} color="var(--orange)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{svc.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{svc.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
