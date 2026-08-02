"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

/**
 * Every href below resolves to a page that already exists — the eight
 * solution links are the real /services routes, and "Results" is the
 * /results work page. "Industries" and "Case Studies" are deliberately
 * absent: neither has a destination yet, and a nav that leads somewhere
 * empty costs more trust than a shorter nav does.
 */
const SOLUTIONS = [
  { label: "Website Design", href: "/services/website-design" },
  { label: "Local SEO", href: "/services/local-seo" },
  { label: "Google Business Profile", href: "/services/google-business-profile" },
  { label: "Paid Advertising", href: "/services/paid-advertising" },
  { label: "Lead Management", href: "/services/lead-management" },
  { label: "AI Implementation", href: "/services/ai-implementation" },
  { label: "SMS & Email Marketing", href: "/services/sms-email-marketing" },
  { label: "Social Media & Newsletters", href: "/services/social-media-newsletter" },
];

const NAV_LINKS: NavItem[] = [
  { label: "Solutions", href: "/services", children: SOLUTIONS },
  { label: "Results", href: "/results" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Sticky header.
 *
 * Stays on the cream surface at every scroll position so the full-colour
 * logo is always legible — its navy fill would vanish against the navy
 * hero. It reads as part of the hero via the orange hairline along its
 * bottom edge, which fades out once you scroll and the drop shadow takes
 * over. Height never changes, so neither state costs any layout shift.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // Hovering the trigger opens the panel, so by the time the click lands the
  // panel is already open and a plain toggle would immediately shut it again.
  // This records that the pointer did the opening, and the first click after
  // that is swallowed.
  const hoverOpened = useRef(false);
  const pathname = usePathname();

  // In-page anchors never read as the current page — the active state marks
  // which route you're on, not which section. No nav link uses a hash today;
  // this keeps that true if one is added.
  const isActive = (href: string) =>
    href.includes("#") ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

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
    setMenu(null);
  }

  // Close the desktop dropdown on an outside click.
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menu]);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open && !menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, menu]);

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
          // The header stays on the light surface at every scroll position:
          // the logo is navy-filled with an orange stroke, so over the navy
          // hero the fill would disappear. Integration with the hero comes
          // from the shared orange hairline below, not from transparency.
          background: "rgba(247,244,239,0.94)",
          backdropFilter: "blur(14px) saturate(1.2)",
          WebkitBackdropFilter: "blur(14px) saturate(1.2)",
          borderBottom: "1px solid var(--border)",
          boxShadow: scrolled ? "0 6px 28px -14px rgba(26,43,74,0.35)" : "none",
          transition: "box-shadow var(--t-med) var(--ease)",
        }}
      >
        {/* Orange hairline stitching the header to the hero beneath it */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(232,98,26,0.55) 30%, var(--orange) 50%, rgba(232,98,26,0.55) 70%, transparent)",
            opacity: scrolled ? 0 : 1,
            transition: "opacity var(--t-med) var(--ease)",
          }}
        />
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
              style={{ height: 44, width: "auto" }}
            />
          </Link>

          {/* Desktop nav switches in at xl, not lg: the assessment CTA is a
              long label, and at 1024px the row would have to crowd or wrap.
              Between lg and xl the (fully featured) mobile menu takes over. */}
          <div
            ref={menuRef}
            className="hidden xl:flex"
            style={{ alignItems: "center", gap: 28 }}
          >
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              const linkStyle = {
                position: "relative" as const,
                fontSize: 14.5,
                fontWeight: active ? 700 : 500,
                color: active ? "var(--orange-ink)" : "var(--muted)",
                textDecoration: "none",
                paddingBlock: 6,
                transition: "color var(--t-fast) var(--ease)",
              };

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="rg-navlink"
                    style={linkStyle}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="rg-navlink-rule"
                      style={active ? { transform: "scaleX(1)" } : undefined}
                    />
                  </Link>
                );
              }

              // Disclosure pattern: the trigger opens the panel and the panel's
              // first row links to the section index, so the parent page stays
              // reachable without stealing a second tab stop from the trigger.
              const expanded = menu === item.label;
              return (
                <div
                  key={item.href}
                  style={{ position: "relative" }}
                  onMouseEnter={() => {
                    hoverOpened.current = menu !== item.label;
                    setMenu(item.label);
                  }}
                  onMouseLeave={(e) => {
                    hoverOpened.current = false;
                    // Don't yank the panel away from a keyboard user just
                    // because the pointer drifted off it.
                    if (!e.currentTarget.contains(document.activeElement)) setMenu(null);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenu(null);
                  }}
                >
                  <button
                    type="button"
                    className="rg-navlink"
                    aria-expanded={expanded}
                    aria-controls={`nav-menu-${item.label.toLowerCase()}`}
                    onClick={() => {
                      if (hoverOpened.current) {
                        hoverOpened.current = false;
                        return;
                      }
                      setMenu(expanded ? null : item.label);
                    }}
                    style={{
                      ...linkStyle,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      font: "inherit",
                      fontSize: 14.5,
                      fontWeight: active ? 700 : 500,
                      color: active ? "var(--orange-ink)" : "var(--muted)",
                    }}
                  >
                    {item.label}
                    <svg
                      width="9"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                      style={{
                        transform: expanded ? "rotate(180deg)" : "none",
                        transition: "transform var(--t-fast) var(--ease)",
                      }}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      aria-hidden="true"
                      className="rg-navlink-rule"
                      style={active ? { transform: "scaleX(1)" } : undefined}
                    />
                  </button>

                  <div
                    id={`nav-menu-${item.label.toLowerCase()}`}
                    hidden={!expanded}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 14px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      minWidth: 264,
                      padding: 8,
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-md)",
                      boxShadow: "var(--shadow-3)",
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenu(null)}
                      className="rg-navmenu-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "9px 12px",
                        marginBottom: 4,
                        borderRadius: "var(--r-sm)",
                        borderBottom: "1px solid var(--border)",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "var(--orange-ink)",
                        textDecoration: "none",
                      }}
                    >
                      All {item.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenu(null)}
                        aria-current={pathname === child.href ? "page" : undefined}
                        className="rg-navmenu-item"
                        style={{
                          display: "block",
                          padding: "9px 12px",
                          borderRadius: "var(--r-sm)",
                          fontSize: 14,
                          fontWeight: pathname === child.href ? 700 : 500,
                          color: pathname === child.href ? "var(--orange-ink)" : "var(--navy)",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex rg-btn"
              style={{
                alignItems: "center",
                gap: 8,
                background: "var(--orange)",
                color: "#fff",
                fontWeight: 700,
                // 19px clears WCAG's 18.66px large-text threshold, so white on
                // the brand orange passes at 3:1 without altering the colour.
                fontSize: 19,
                padding: "11px 22px",
                whiteSpace: "nowrap",
                borderRadius: "var(--r-sm)",
                textDecoration: "none",
                boxShadow: "var(--shadow-orange)",
                transition:
                  "background var(--t-fast) var(--ease), transform var(--t-fast) var(--ease), box-shadow var(--t-med) var(--ease)",
              }}
            >
              Get My Growth Assessment
            </a>

            <button
              className="flex xl:hidden"
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
                    background: "var(--navy)",
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
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: 56,
                    borderBottom: item.children ? "none" : "1px solid var(--border)",
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
                {/* Sub-links render inline rather than behind a toggle: six
                    extra rows is a shorter path than an accordion, and it
                    keeps the menu working with no additional state. */}
                {item.children && (
                  <ul
                    style={{
                      listStyle: "none",
                      margin: "0 0 var(--s2)",
                      padding: "0 0 var(--s3) var(--s4)",
                      borderBottom: "1px solid var(--border)",
                      borderLeft: "2px solid rgba(232,98,26,0.28)",
                    }}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          aria-current={pathname === child.href ? "page" : undefined}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            minHeight: 46,
                            fontSize: 15,
                            fontWeight: pathname === child.href ? 700 : 400,
                            color: pathname === child.href ? "var(--orange-ink)" : "var(--muted)",
                            textDecoration: "none",
                          }}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
              textAlign: "center",
            }}
          >
            Get My Growth Assessment <span aria-hidden="true">→</span>
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
