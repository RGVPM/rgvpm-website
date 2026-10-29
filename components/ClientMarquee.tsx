import Image from "next/image";
import { CLIENTS, CREDENTIALS, type Client, type Credential } from "@/lib/clients";

/**
 * Client + training logo marquee, set in a navy-outlined capsule like the
 * "We handle it" cards in the social graphics. Logos sit in one ink
 * (grayscale) so a dozen brand colors read as one calm row, and come back
 * to full color on hover. Small orange dots separate them. Renders nothing
 * until at least one client is added in lib/clients.ts.
 *
 * Each client logo is a real dofollow link out to the client's live site —
 * a small backlink for them, and proof for the visitor that the work
 * exists. Training logos are spread through the row, each tagged
 * "Trained with" so they never read as clients.
 */
export default function ClientMarquee() {
  if (CLIENTS.length === 0) return null;

  return (
    <div>
      <p className="rg-marquee-label">
        Trusted by 50+ businesses
        <span className="rg-hide-sm"> &middot; Trained with Chicago Booth, OpenAI &amp; MasterClass</span>
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
              <span className="rg-cred-tag">Trained with</span>
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
