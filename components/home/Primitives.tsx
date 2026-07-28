import type { CSSProperties, ReactNode } from "react";

/**
 * Shared building blocks for the homepage so every section speaks the
 * same visual language — one label treatment, one heading scale, one
 * button set. Server components: no client JS ships for any of these.
 */

type Tone = "light" | "dark";

/** Small mono eyebrow with a leading rule. */
export function Label({
  children,
  tone = "light",
  color,
}: {
  children: ReactNode;
  tone?: Tone;
  color?: string;
}) {
  // Labels are 11px, so they need the AA-compliant ink, not the brand orange.
  return (
    <span
      className="rg-label"
      style={{ color: color ?? (tone === "dark" ? "var(--orange-on-dark)" : "var(--orange-ink)") }}
    >
      {children}
    </span>
  );
}

/** Section heading locked to the display scale. */
export function SectionHeading({
  children,
  tone = "light",
  id,
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  style?: CSSProperties;
}) {
  return (
    <h2
      id={id}
      className="rg-display"
      style={{
        fontSize: "var(--fs-h2)",
        color: tone === "dark" ? "#fff" : "var(--navy)",
        margin: "var(--s4) 0 0",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/** Lede paragraph under a section heading. */
export function Lede({
  children,
  tone = "light",
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        fontSize: 17,
        lineHeight: 1.7,
        color: tone === "dark" ? "rgba(255,255,255,0.7)" : "var(--muted)",
        maxWidth: "62ch",
        margin: "var(--s5) 0 0",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

const buttonBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontWeight: 700,
  fontSize: 15,
  lineHeight: 1,
  padding: "16px 28px",
  borderRadius: "var(--r-sm)",
  textDecoration: "none",
  transition:
    "background var(--t-fast) var(--ease), color var(--t-fast) var(--ease), transform var(--t-fast) var(--ease), box-shadow var(--t-med) var(--ease), border-color var(--t-fast) var(--ease)",
};

export type ButtonVariant = "primary" | "onDark" | "onOrange" | "ghostDark" | "ghostLight";

const variants: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "var(--orange)",
    color: "#fff",
    boxShadow: "var(--shadow-orange)",
  },
  onDark: {
    background: "var(--orange)",
    color: "#fff",
    boxShadow: "var(--shadow-orange)",
  },
  onOrange: {
    background: "#fff",
    color: "var(--navy)",
    boxShadow: "0 14px 34px -14px rgba(0,0,0,0.5)",
  },
  ghostDark: {
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.24)",
  },
  ghostLight: {
    background: "transparent",
    color: "var(--navy)",
    border: "1px solid var(--border)",
  },
};

/** The homepage's only two button shapes, in five tonal skins. */
export function Button({
  href,
  children,
  variant = "primary",
  external,
  style,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  style?: CSSProperties;
}) {
  const ext = external ?? href.startsWith("http");
  return (
    <a
      href={href}
      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="rg-btn"
      style={{ ...buttonBase, ...variants[variant], ...style }}
    >
      {children}
    </a>
  );
}

/** Full-bleed section wrapper with consistent rhythm. */
export function Section({
  children,
  background = "#fff",
  id,
  tight,
  style,
  labelledBy,
}: {
  children: ReactNode;
  background?: string;
  id?: string;
  tight?: boolean;
  style?: CSSProperties;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      style={{
        background,
        paddingBlock: tight ? "var(--section-y-tight)" : "var(--section-y)",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/** Faint navy blueprint grid used on dark sections. */
export function GridTexture({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage:
          "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        pointerEvents: "none",
      }}
    />
  );
}
