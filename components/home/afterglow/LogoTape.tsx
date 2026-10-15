import Image from "next/image";
import { CLIENTS, type Client } from "@/lib/clients";

/**
 * Two tilted logo tapes that run in opposite directions and never cross
 * (spec §7). Tape A, on the sunset gradient, carries health and beauty;
 * tape B, on plum, carries local and trades. Every logo is a real client.
 *
 * Each track holds its list twice for a seamless loop; the second copy is
 * aria-hidden with its links out of the tab order. Speed, direction and
 * scroll-velocity response are GSAP (motion/logos.ts). With reduced motion
 * the tapes are swapped for a still, full-color grid (CSS).
 */
const TAPE_A = [
  "D'Vash Aesthetics",
  "Face Forward Regenerative Aesthetics",
  "Glammed Up Aesthetics",
  "DrBrainRx",
  "6 Day Medical Weight Loss",
  "Belleza De Oro Salon",
  "The Spa Business Coach",
  "Us To You Mobile Health",
  "NeuroMotion Rehabilitation",
];

const TAPE_B = [
  "RGV Scalp Ink",
  "CCL Contracting",
  "Premium Foam: Spray Foam Insulation",
  "V&S Painting & More",
  "STX Swing Doctor",
  "Tsukie Coffee",
  "EZ Clean Express",
  "La Feria Co-op Gin & Supply",
  "Mac's Dove Hunts",
];

/* Rendered heights in px, balanced by eye so wide wordmarks and square
   badges carry similar weight on the tapes (v1 visible-area heights x 1.15,
   then tuned on screenshots). */
const HEIGHTS: Record<string, number> = {
  "D'Vash Aesthetics": 50,
  "Face Forward Regenerative Aesthetics": 24,
  "Glammed Up Aesthetics": 52,
  "DrBrainRx": 30,
  "6 Day Medical Weight Loss": 36,
  "Belleza De Oro Salon": 44,
  "The Spa Business Coach": 42,
  "Us To You Mobile Health": 36,
  "NeuroMotion Rehabilitation": 64,
  "RGV Scalp Ink": 60,
  "CCL Contracting": 46,
  "Premium Foam: Spray Foam Insulation": 52,
  "V&S Painting & More": 40,
  "STX Swing Doctor": 62,
  "Tsukie Coffee": 70,
  "EZ Clean Express": 56,
  "La Feria Co-op Gin & Supply": 62,
  // Mac's Dove Hunts has no logo file yet (text wordmark). Add its height
  // here and its size to DIMS when a logo is added.
};

/* Intrinsic sizes of the logo files, so every <img> reserves its box. */
const DIMS: Record<string, [number, number]> = {
  "CCL Contracting": [285, 137],
  "Premium Foam: Spray Foam Insulation": [599, 362],
  "RGV Scalp Ink": [640, 640],
  "Us To You Mobile Health": [260, 68],
  "D'Vash Aesthetics": [448, 177],
  "Face Forward Regenerative Aesthetics": [900, 82],
  "DrBrainRx": [900, 148],
  "Belleza De Oro Salon": [700, 181],
  "NeuroMotion Rehabilitation": [600, 600],
  "6 Day Medical Weight Loss": [621, 168],
  "V&S Painting & More": [356, 123],
  "STX Swing Doctor": [752, 701],
  "The Spa Business Coach": [900, 354],
  "Tsukie Coffee": [700, 694],
  "Glammed Up Aesthetics": [700, 383],
  "EZ Clean Express": [700, 515],
  "La Feria Co-op Gin & Supply": [363, 278],
};

function pick(names: string[]): Client[] {
  return names
    .map((n) => CLIENTS.find((c) => c.name === n))
    .filter((c): c is Client => Boolean(c));
}

function Mark({ client, hidden }: { client: Client; hidden?: boolean }) {
  const h = HEIGHTS[client.name] ?? 44;
  const [w, ht] = DIMS[client.name] ?? [400, 200];
  // next/image: some source PNGs are large (one is 620 KB). sizes is the
  // mark's real rendered width (height x aspect, capped by the 220px CSS
  // max-width), so each logo is fetched at about 2x its display size.
  const cssW = Math.min(220, Math.ceil((h * w) / ht));
  const body = client.logo ? (
    <Image
      src={client.logo}
      alt={hidden ? "" : `${client.name} logo`}
      width={w}
      height={ht}
      sizes={`${cssW}px`}
      loading="lazy"
      style={{ ["--h" as string]: `${h}px` }}
    />
  ) : (
    <span className="ev-wordmark">{client.name}</span>
  );
  const markCls = client.plate && client.logo ? "ev-mark ev-mark--plate" : "ev-mark";
  if (client.url) {
    return (
      <a
        className={markCls}
        href={client.url}
        target="_blank"
        rel="noopener"
        tabIndex={hidden ? -1 : undefined}
        aria-label={hidden ? undefined : `${client.name}, visit their website (opens in a new tab)`}
      >
        {body}
      </a>
    );
  }
  return <span className={markCls}>{body}</span>;
}

function Track({ list }: { list: Client[] }) {
  return (
    <div className="ev-tape-track">
      <ul className="ev-tape-set">
        {list.map((c) => (
          <li key={c.name}>
            <Mark client={c} />
          </li>
        ))}
      </ul>
      <ul className="ev-tape-set" aria-hidden="true">
        {list.map((c) => (
          <li key={c.name}>
            <Mark client={c} hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LogoTape() {
  const a = pick(TAPE_A);
  const b = pick(TAPE_B);
  if (a.length + b.length === 0) return null;
  return (
    <div className="ev-logos">
      <div className="ev-tapes">
        <div className="ev-tape ev-tape--a">
          <Track list={a} />
        </div>
        <div className="ev-tape ev-tape--b">
          <Track list={b} />
        </div>
      </div>
      <ul className="ev-logo-grid">
        {[...a, ...b].map((c) => (
          <li key={c.name}>
            <Mark client={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
