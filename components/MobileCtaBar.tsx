"use client";

import { useEffect } from "react";
import Icon from "@/components/Icon";
import { SITE } from "@/lib/site";

/**
 * Sticky Call / Book bar for phones (hidden above 768px).
 *
 * The buttons stop short of the right edge so the chat launcher (bottom-right,
 * 58px, 20px in) sits beside them instead of on top of them. The chat
 * widget's "Hi there! Have a question?" prompt card is hidden on phones: it
 * opened on every page load and covered the first-screen CTA. The launcher
 * itself is untouched, so chat still opens with one tap.
 */
const PROMPT_CSS =
  "@media (max-width: 768px){.lc_text-widget--prompt{display:none!important}}";

function hideChatPrompt(): boolean {
  const root = document.querySelector("chat-widget")?.shadowRoot;
  if (!root) return false;
  if (!root.querySelector("style[data-rgvpm]")) {
    const style = document.createElement("style");
    style.setAttribute("data-rgvpm", "");
    style.textContent = PROMPT_CSS;
    root.appendChild(style);
  }
  return true;
}

export default function MobileCtaBar() {
  useEffect(() => {
    // The widget loads after the page, so look for it for up to 20 seconds.
    if (hideChatPrompt()) return;
    const timer = window.setInterval(() => {
      if (hideChatPrompt()) window.clearInterval(timer);
    }, 500);
    const stop = window.setTimeout(() => window.clearInterval(timer), 20000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(stop);
    };
  }, []);

  const btn: React.CSSProperties = {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 46,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <style>{`
        .mobile-cta-bar, .mobile-cta-spacer { display: none; }
        @media (max-width: 768px) {
          .mobile-cta-bar { display: flex; }
          .mobile-cta-spacer { display: block; height: calc(66px + env(safe-area-inset-bottom)); }
        }
      `}</style>
      <div className="mobile-cta-spacer" aria-hidden="true" />
      <div
        className="mobile-cta-bar"
        role="region"
        aria-label="Call or book a free call"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 90,
          gap: 8,
          padding: "10px 92px calc(10px + env(safe-area-inset-bottom)) 12px",
          background: "var(--navy)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 -6px 20px rgba(26,43,74,0.18)",
        }}
      >
        <a href={`tel:${SITE.phone}`} style={{ ...btn, background: "#fff", color: "var(--navy)" }}>
          <Icon name="phone" size={16} color="var(--navy)" />
          Call Us
        </a>
        <a
          href={SITE.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btn, background: "var(--orange)", color: "#fff" }}
        >
          <Icon name="calendar" size={16} color="#fff" />
          Book a Free Call
        </a>
      </div>
    </>
  );
}
