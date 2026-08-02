import Image from "next/image";
import { CLIENTS } from "@/lib/clients";

/**
 * Transparent, card-less marquee of client logos — sits directly on its
 * parent section background. Renders nothing until at least one client is
 * added in lib/clients.ts.
 *
 * The logos point at /results rather than out to each client's site: this
 * strip's job is to hand people off to the work. The clients still get
 * their outbound dofollow link from the showcase cards on that page, so no
 * backlink is lost by routing the logos inward.
 */
export default function ClientMarquee() {
  if (CLIENTS.length === 0) return null;

  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Businesses We Work With
      </p>
      <p style={{ textAlign: "center", marginBottom: 28 }}>
        <a
          href="/results"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--orange-ink)",
            textDecoration: "none",
          }}
        >
          See their results <span aria-hidden="true">→</span>
        </a>
      </p>
      <div
        className="rg-scroller"
        style={{
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="rg-marquee-track" data-dir="right" style={{ ["--track-duration" as string]: "50s" }}>
          <Pass />
          {/* Duplicate pass makes the loop seamless. aria-hidden + inert so a
              screen reader meets each client once, not twice. */}
          <div aria-hidden="true" inert style={{ display: "flex" }}>
            <Pass />
          </div>
        </div>
      </div>
    </div>
  );
}

function Pass() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {CLIENTS.map((client) => (
        <a
          key={client.name}
          href="/results"
          aria-label={`${client.name} — see client results`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: "0 48px",
            height: 100,
            opacity: 0.82,
            textDecoration: "none",
          }}
        >
          {client.logo ? (
            <Image
              src={client.logo}
              alt={`${client.name} logo`}
              height={200}
              width={360}
              style={{
                height: "auto",
                maxHeight: client.maxHeight ?? 84,
                width: "auto",
                maxWidth: 260,
                objectFit: "contain",
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 26,
                letterSpacing: "0.05em",
                color: "var(--navy)",
                whiteSpace: "nowrap",
              }}
            >
              {client.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
