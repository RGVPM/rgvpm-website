"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(247,244,239,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(26,43,74,0.12)",
        boxShadow: scrolled ? "0 2px 20px rgba(26,43,74,0.1)" : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/">
          <Image src="/logo.png" alt="RGV Performance Marketing" height={44} width={220} style={{ height: 44, width: "auto" }} priority />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "var(--orange)" : "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "var(--orange)" : "var(--muted)")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/pricing"
          className="hidden md:inline-flex"
          style={{ background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 4, textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-light)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--orange)")}
        >
          Get Started
        </Link>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span style={{ display: "block", width: 24, height: 2, background: "var(--navy)", transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "var(--navy)", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 24, height: 2, background: "var(--navy)", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "var(--cream)", borderTop: "1px solid var(--border)", padding: "8px 24px 20px" }}>
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                style={{ display: "block", padding: "13px 0", borderBottom: "1px solid var(--border)", fontSize: 16, fontWeight: active ? 700 : 500, color: active ? "var(--orange)" : "var(--text)", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/pricing"
            onClick={() => setOpen(false)}
            style={{ display: "inline-flex", marginTop: 16, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px 24px", borderRadius: 4, textDecoration: "none" }}
          >
            Get Started →
          </Link>
        </div>
      )}
    </nav>
  );
}
