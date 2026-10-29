import Image from "next/image";
import { CLIENTS } from "@/lib/clients";

/**
 * Client logo marquee, set in a navy-outlined capsule like the "We handle
 * it" cards in the social graphics. Logos keep their own colors; small
 * orange dots separate them. Renders nothing until at least one client is
 * added in lib/clients.ts.
 *
 * Each logo is a real dofollow link out to the client's live site — a
 * small backlink for them, and proof for the visitor that the work exists.
 * Clients only: training credentials live in the team bios on /about.
 */
export default function ClientMarquee() {
  if (CLIENTS.length === 0) return null;

  return (
    <div>
      <p className="rg-marquee-label">Trusted by 150+ businesses across the U.S.</p>
      <div className="rg-marquee-capsule">
        <div
          className="rg-scroller"
          style={{
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          }}
        >
          <div className="rg-marquee-track" data-dir="right" style={{ ["--track-duration" as string]: "60s" }}>
            <Pass />
            {/* Duplicate pass makes the loop seamless. aria-hidden + inert so a
                screen reader meets each client once, not twice. */}
            <div aria-hidden="true" inert style={{ display: "flex" }}>
              <Pass />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pass() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {CLIENTS.map((client) => {
        const inner = client.logo ? (
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            height={200}
            width={360}
            // next/image won't optimize SVG; serve those files as-is.
            unoptimized={client.logo.endsWith(".svg")}
            // Eager: lazy images inside a transformed, overflow-hidden track
            // load late or never on some phones, leaving blank gaps.
            loading="eager"
            className="rg-logo-img"
            style={{ ["--logo-mh" as string]: `${Math.round((client.maxHeight ?? 84) * 0.78)}px` }}
          />
        ) : (
          <span className="rg-logo-word">{client.name}</span>
        );

        // Clients without a url render as a plain image, not a link.
        return client.url ? (
          <a
            key={client.name}
            href={client.url}
            target="_blank"
            rel="noopener"
            aria-label={`${client.name} — visit their website (opens in a new tab)`}
            className="rg-logo-cell"
          >
            {inner}
          </a>
        ) : (
          <span key={client.name} className="rg-logo-cell">
            {inner}
          </span>
        );
      })}
    </div>
  );
}
