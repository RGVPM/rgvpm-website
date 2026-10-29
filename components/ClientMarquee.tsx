import Image from "next/image";
import { CLIENTS, CREDENTIALS, type Client, type Credential } from "@/lib/clients";

/**
 * Client + training logo marquee, set in a navy-outlined capsule like the
 * "We handle it" cards in the social graphics. Logos keep their own
 * colors; small orange dots separate them. Renders nothing
 * until at least one client is added in lib/clients.ts.
 *
 * Each client logo is a real dofollow link out to the client's live site —
 * a small backlink for them, and proof for the visitor that the work
 * exists. Logos from the team's AI training (MasterClass Executive) are
 * spread through the row; the label above names the program.
 */
export default function ClientMarquee() {
  if (CLIENTS.length === 0) return null;

  return (
    <div>
      <p className="rg-marquee-label">
        Trusted by 150+ businesses
        <span className="rg-hide-sm"> &middot; MasterClass Executive with Chicago Booth &amp; OpenAI</span>
      </p>
      <div className="rg-marquee-capsule">
        <div
          className="rg-scroller"
          style={{
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          }}
        >
          <div className="rg-marquee-track" data-dir="right" style={{ ["--track-duration" as string]: "70s" }}>
            <Pass />
            {/* Duplicate pass makes the loop seamless. aria-hidden + inert so a
                screen reader meets each logo once, not twice. */}
            <div aria-hidden="true" inert style={{ display: "flex" }}>
              <Pass />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Item = { kind: "client"; client: Client } | { kind: "credential"; credential: Credential };

/** Clients in order, with one training logo dropped in every few clients. */
function items(): Item[] {
  const out: Item[] = [];
  const every = Math.max(1, Math.ceil(CLIENTS.length / CREDENTIALS.length));
  CLIENTS.forEach((client, i) => {
    if (i % every === 0 && CREDENTIALS[i / every]) {
      out.push({ kind: "credential", credential: CREDENTIALS[i / every] });
    }
    out.push({ kind: "client", client });
  });
  return out;
}

function Pass() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {items().map((item) => {
        if (item.kind === "credential") {
          const c = item.credential;
          return (
            <span key={c.name} className="rg-logo-cell rg-logo-cell--cred">
              <Image
                src={c.logo}
                alt={`${c.name} logo`}
                height={120}
                width={360}
                unoptimized
                loading="eager"
                className="rg-logo-img"
                style={{ ["--logo-mh" as string]: `${c.maxHeight ?? 46}px` }}
              />
            </span>
          );
        }

        const client = item.client;
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
