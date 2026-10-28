import Image from "next/image";

/**
 * The round RGV badge plus the agency name, used in every header and footer.
 * The badge carries the brand; the name beside it keeps "RGV Performance
 * Marketing" legible at nav size, where the badge's ring text is too small
 * to read. `tone="dark"` is for navy backgrounds.
 */
export default function BrandMark({
  size = 52,
  tone = "light",
  priority,
}: {
  size?: number;
  tone?: "light" | "dark";
  priority?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <span className="rg-brandmark" style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.24) }}>
      <Image
        src="/brand/rgvpm-badge.png"
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        priority={priority}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          boxShadow: dark ? "0 6px 18px -8px rgba(0,0,0,0.5)" : "0 6px 16px -8px rgba(16,34,63,0.45)",
        }}
      />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: Math.round(size * 0.1) }}>
        <span
          style={{
            fontSize: Math.round(size * 0.34),
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: dark ? "var(--cream)" : "var(--navy)",
            whiteSpace: "nowrap",
          }}
        >
          RGV Performance
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
            fontSize: Math.max(9, Math.round(size * 0.2)),
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: dark ? "var(--blue-on-dark)" : "var(--blue-ink)",
            whiteSpace: "nowrap",
          }}
        >
          Marketing
        </span>
      </span>
    </span>
  );
}
