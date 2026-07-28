"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Sticky header.
 *
 * On the homepage it sits transparent over the navy hero so it reads as
 * part of the hero rather than a bar floating above it, then resolves to
 * the cream surface once scrolled. Height is identical in both states,
 * so the transition costs no layout shift.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Only the homepage has a dark hero for the header to sit on.
  const overHero = pathname === "/" && !scrolled && !open;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close the mobile menu on route change. Adjusting state during render is
  // React's documented pattern for deriving from a prop change — an effect
  // here would cause a second render pass with the stale menu still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkColor = overHero ? "rgba(255,255,255,0.72)" : "var(--muted)";
  const barColor = overHero ? "#fff" : "var(--navy)";

  return (
    <>
      <a href="#main-content" className="rg-skip">
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: overHero ? "transparent" : "rgba(247,244,239,0.92)",
          backdropFilter: overHero ? "none" : "blur(14px) saturate(1.2)",
          WebkitBackdropFilter: overHero ? "none" : "blur(14px) saturate(1.2)",
          borderBottom: `1px solid ${overHero ? "transparent" : "var(--border)"}`,
          boxShadow: scrolled && !overHero ? "0 6px 28px -14px rgba(26,43,74,0.35)" : "none",
          transition:
            "background var(--t-med) var(--ease), border-color var(--t-med) var(--ease), box-shadow var(--t-med) var(--ease)",
        }}
      >
        <div
          className="rg-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            paddingBlock: 14,
          }}
        >
          <Link
            href="/"
            aria-label="RGV Performance Marketing — home"
            style={{ display: "flex", flexShrink: 0 }}
          >
            <Image
              src="/logo.png"
              alt="RGV Performance Marketing"
              height={44}
              width={220}
              sizes="220px"
              priority
              style={{
                height: 44,
                width: "auto",
                // Logo artwork is dark; invert it while it sits on the navy hero.
                filter: overHero ? "brightness(0) invert(1)" : "none",
                transition: "filter var(--t-med) var(--ease)",
              }}
            />
          </Link>

          <div className="hidden lg:flex" style={{ alignItems: "center", gap: 30 }}>
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="rg-navlink"
                  style={{
                    position: "relative",
                    fontSize: 14.5,
                    fontWeight: active ? 700 : 500,
                    color: active ? "var(--orange-ink)" : linkColor,
                    textDecoration: "none",
                    paddingBlock: 6,
                    transition: "color var(--t-fast) var(--ease)",
                  }}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="rg-navlink-rule"
                    style={active ? { transform: "scaleX(1)" } : undefined}
                  />
                </Link>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex rg-btn"
              style={{
                alignItems: "center",
                gap: 8,
                background: "var(--orange)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                padding: "12px 22px",
                borderRadius: "var(--r-sm)",
                textDecoration: "none",
                boxShadow: overHero ? "none" : "var(--shadow-orange)",
                transition:
                  "background var(--t-fast) var(--ease), transform var(--t-fast) var(--ease), box-shadow var(--t-med) var(--ease)",
              }}
            >
              Book a Free Call
            </a>

            <button
              className="flex lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              style={{
                flexDirection: "column",
                gap: 5,
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 24,
                    height: 2,
                    borderRadius: 2,
                    background: barColor,
                    transition:
                      "transform var(--t-med) var(--ease), opacity var(--t-fast) var(--ease), background var(--t-med) var(--ease)",
                    transform:
                      open && i === 0
                        ? "translateY(7px) rotate(45deg)"
                        : open && i === 2
                          ? "translateY(-7px) rotate(-45deg)"
                          : "none",
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu — generous thumb targets, scrolls if it overflows */}
        <div
          id="mobile-menu"
          hidden={!open}
          style={{
            background: "var(--cream)",
            borderTop: "1px solid var(--border)",
            padding: "var(--s4) var(--gutter) var(--s7)",
            maxHeight: "calc(100dvh - 72px)",
            overflowY: "auto",
          }}
        >
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 56,
                  borderBottom: "1px solid var(--border)",
                  fontSize: 17,
                  fontWeight: active ? 700 : 500,
                  color: active ? "var(--orange-ink)" : "var(--navy)",
                  textDecoration: "none",
                }}
              >
                {item.label}
                <span aria-hidden="true" style={{ color: "var(--muted)", fontSize: 15 }}>
                  →
                </span>
              </Link>
            );
          })}
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: "var(--s6)",
              minHeight: 56,
              background: "var(--orange)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: "var(--r-sm)",
              textDecoration: "none",
              boxShadow: "var(--shadow-orange)",
            }}
          >
            Book a Free Call <span aria-hidden="true">→</span>
          </a>
          <a
            href={`tel:${SITE.phone}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 52,
              marginTop: "var(--s3)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--navy)",
              textDecoration: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)",
            }}
          >
            Call {SITE.phoneHuman}
          </a>
        </div>
      </nav>
    </>
  );
}
