import type { ReactNode } from "react";
import Image from "next/image";
import { POST_IMAGES, postImageSrc } from "@/lib/postImages";

/**
 * Cover for a post: its photo from lib/postImages.ts when it has one, otherwise
 * art drawn from its category and slug, so a new post always has a cover with
 * no design step. The category picks the motif and the slug seeds the
 * variation. A category with no motif of its own falls back to the signal rings.
 */
const BLUE = "#0B8CEB";
const NAVY = "#10223F";
const CREAM = "#FDF8EC";
const ORANGE = "#F26B1D";
const WASH = "#E6F2FD";
const SAND = "#F3E9D2";
const SKY = "#5AB4FF";

const W = 1200;
const H = 750;

/** Small deterministic generator, so server and client draw the same cover. */
function seeded(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) h = Math.imul(h ^ slug.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function nodes(r: () => number, line: string, hot: string) {
  const cols = 6;
  const rows = 4;
  const pts = Array.from({ length: cols * rows }, (_, i) => ({
    x: Math.round(((i % cols) + 0.5) * (W / cols) + (r() - 0.5) * 110),
    y: Math.round((Math.floor(i / cols) + 0.5) * (H / rows) + (r() - 0.5) * 90),
  }));
  const edges: [number, number][] = [];
  pts.forEach((_, i) => {
    if (i % cols < cols - 1 && r() > 0.3) edges.push([i, i + 1]);
    if (i + cols < pts.length && r() > 0.45) edges.push([i, i + cols]);
  });
  const lit = Math.floor(cols + 1 + r() * (cols - 2));
  return (
    <>
      {edges.map(([a, b], i) => (
        <line key={i} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke={line} strokeWidth="3" opacity="0.55" />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === lit ? 0 : 11} fill={line} />
      ))}
      <circle cx={pts[lit].x} cy={pts[lit].y} r="74" fill={hot} opacity="0.22" />
      <circle cx={pts[lit].x} cy={pts[lit].y} r="34" fill={hot} />
    </>
  );
}

function pin(x: number, y: number) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="8" rx="34" ry="11" fill={NAVY} opacity="0.18" />
      <path d="M0 4C-34-44-58-70-58-104a58 58 0 0 1 116 0C58-70 34-44 0 4Z" fill={ORANGE} />
      <circle cx="0" cy="-104" r="22" fill={CREAM} />
    </g>
  );
}

function contours(r: () => number) {
  const cx = Math.round(W * (0.22 + r() * 0.56));
  const cy = Math.round(H * (0.4 + r() * 0.3));
  const tilt = Math.round(r() * 120 - 60);
  return (
    <>
      <g transform={`rotate(${tilt} ${cx} ${cy})`} fill="none" stroke={BLUE} strokeWidth="3">
        {Array.from({ length: 11 }, (_, i) => (
          <ellipse key={i} cx={cx + i * 9} cy={cy - i * 5} rx={70 + i * 88} ry={44 + i * 54} opacity={0.75 - i * 0.05} />
        ))}
      </g>
      {pin(cx, cy)}
    </>
  );
}

/** A street map with the route to the pin drawn in. */
function streets(r: () => number) {
  const cuts = (span: number, step: number) => {
    const out: number[] = [];
    for (let at = 40 + r() * step; at < span; at += step * (0.7 + r() * 0.8)) out.push(Math.round(at));
    return out;
  };
  const xs = cuts(W, 190);
  const ys = cuts(H, 150);
  const px = xs[Math.floor(xs.length * (0.45 + r() * 0.4))];
  const py = ys[Math.floor(ys.length * (0.35 + r() * 0.4))];
  const startY = ys[ys.length - 1];
  const turnX = xs[Math.floor(xs.length * 0.2)];
  const diag = Math.round(r() * 500);
  return (
    <>
      <g stroke="#fff" strokeLinecap="round">
        {xs.map((x, i) => <line key={i} x1={x} y1="-20" x2={x} y2={H + 20} strokeWidth={i % 3 === 1 ? 24 : 12} />)}
        {ys.map((y, i) => <line key={i} x1="-20" y1={y} x2={W + 20} y2={y} strokeWidth={i % 3 === 0 ? 24 : 12} />)}
        <line x1={diag} y1={H + 20} x2={diag + 700} y2="-20" strokeWidth="30" />
      </g>
      <path d={`M-20 ${startY}H${turnX}V${py}H${px}`} fill="none" stroke={BLUE} strokeWidth="12" strokeLinejoin="round" />
      {pin(px, py)}
    </>
  );
}

function bars(r: () => number) {
  const n = 8;
  const bw = 96;
  const gap = 34;
  const x0 = (W - (n * bw + (n - 1) * gap)) / 2;
  return Array.from({ length: n }, (_, i) => {
    const h = Math.round(110 + (i / (n - 1)) * 410 + (r() - 0.5) * 70);
    return <rect key={i} x={x0 + i * (bw + gap)} y={H - h} width={bw} height={h} rx="10" fill={i === n - 1 ? ORANGE : CREAM} opacity={i === n - 1 ? 1 : 0.2 + i * 0.08} />;
  });
}

function rings(r: () => number) {
  const cx = Math.round(W * (0.2 + r() * 0.6));
  const cy = Math.round(H * (0.55 + r() * 0.45));
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={cx} cy={cy} r={70 + i * 92} fill="none" stroke={NAVY} strokeWidth={i % 3 === 0 ? 6 : 2.5} opacity={0.8 - i * 0.06} />
      ))}
      <circle cx={cx} cy={cy} r="38" fill={ORANGE} />
    </>
  );
}

function windows(r: () => number) {
  const off = Math.round(r() * 60);
  const frame = (x: number, y: number, fill: string, bar: string) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="640" height="430" rx="20" fill={fill} />
      <rect width="640" height="56" rx="20" fill={bar} />
      <circle cx="36" cy="28" r="9" fill={ORANGE} />
      <circle cx="66" cy="28" r="9" fill={CREAM} opacity="0.7" />
    </g>
  );
  return (
    <>
      {frame(120 + off, 90, BLUE, NAVY)}
      {frame(420 - off, 240, CREAM, NAVY)}
      <rect x={470 - off} y="346" width="330" height="26" rx="13" fill={NAVY} />
      <rect x={470 - off} y="392" width="480" height="14" rx="7" fill={NAVY} opacity="0.3" />
      <rect x={470 - off} y="422" width="420" height="14" rx="7" fill={NAVY} opacity="0.3" />
      <rect x={470 - off} y="480" width="170" height="52" rx="26" fill={BLUE} />
    </>
  );
}

const ART: Record<string, { bg: string; draw: (r: () => number) => ReactNode }> = {
  "AI Friday": { bg: BLUE, draw: (r) => nodes(r, CREAM, NAVY) },
  "AI Automation": { bg: NAVY, draw: (r) => nodes(r, SKY, ORANGE) },
  "Local SEO": { bg: WASH, draw: (r) => (r() > 0.5 ? streets(r) : contours(r)) },
  "Paid Advertising": { bg: NAVY, draw: bars },
  "Website Design": { bg: SAND, draw: windows },
};

export default function PostCover({
  slug,
  category,
  sizes = "(max-width: 640px) 100vw, 50vw",
  priority = false,
}: {
  slug: string;
  category: string;
  sizes?: string;
  priority?: boolean;
}) {
  const photo = postImageSrc(slug);
  if (photo) {
    return <Image src={photo} alt={POST_IMAGES[slug]} width={1680} height={944} sizes={sizes} priority={priority} className="rg-cover" />;
  }

  const art = ART[category] ?? { bg: SAND, draw: rings };
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="rg-cover"
      style={{ background: art.bg }}
      aria-hidden="true"
      focusable="false"
    >
      {art.draw(seeded(slug))}
    </svg>
  );
}
