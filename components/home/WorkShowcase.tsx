import Image from "next/image";
import { Label, Section } from "@/components/home/Primitives";
import { workTracks, type Project } from "@/lib/work";

/**
 * "Some of Our Recent Work" — two tracks of browser-framed client sites
 * drifting in opposite directions.
 *
 * Server-rendered: every project name, industry and link is real HTML,
 * so the section is crawlable and the links pass authority to clients.
 * Motion is pure CSS (no JS, no observer). The track pauses on hover and
 * on focus-within, holds still under prefers-reduced-motion, and becomes
 * a snap-scrolling swipe track on touch devices.
 */

function BrowserCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener"
      className="rg-work-card rg-snap"
      style={{
        flexShrink: 0,
        width: "clamp(280px, 34vw, 460px)",
        marginRight: "var(--s5)",
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div
        className="rg-work-frame"
        style={{
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "#fff",
          boxShadow: "var(--shadow-2)",
        }}
      >
        {/* Consistent browser chrome across every project */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 12px",
            background: "var(--cream-dark)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span
              key={c}
              aria-hidden="true"
              style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }}
            />
          ))}
          <span
            aria-hidden="true"
            style={{
              marginLeft: 8,
              flex: 1,
              height: 17,
              borderRadius: "var(--r-pill)",
              background: "rgba(26,43,74,0.07)",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 9,
              color: "var(--muted)",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          </span>
        </div>

        {/* 16:10 window — fixed ratio keeps every card the same height */}
        <div style={{ position: "relative", aspectRatio: "16 / 10", background: "var(--cream-dark)" }}>
          {project.screenshot ? (
            <Image
              src={project.screenshot}
              alt={`${project.name} website, designed by RGV Performance Marketing`}
              fill
              loading="lazy"
              sizes="(max-width: 700px) 80vw, (max-width: 1180px) 40vw, 460px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          ) : (
            /* Fallback when no screenshot exists yet — never a broken image */
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(150deg, var(--cream) 0%, var(--cream-dark) 100%)",
                padding: "0 24px",
                textAlign: "center",
              }}
            >
              <span
                className="rg-display"
                style={{ fontSize: 30, color: "var(--navy)", opacity: 0.75 }}
              >
                {project.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Visit site
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Caption sits outside the frame — always readable, never hover-only */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginTop: "var(--s4)",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 15.5,
              fontWeight: 700,
              color: "var(--navy)",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.name}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>
            {project.industry} · {project.location}
          </div>
        </div>
        <span
          className="rg-work-cta"
          style={{
            flexShrink: 0,
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--orange-ink)",
            whiteSpace: "nowrap",
          }}
        >
          View Website <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}

function Track({
  projects,
  dir,
  duration,
}: {
  projects: Project[];
  dir: "left" | "right";
  duration: string;
}) {
  return (
    <div
      className="rg-scroller"
      style={{
        overflow: "hidden",
        maskImage: "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
        paddingBlock: "var(--s2)",
      }}
    >
      <div
        className="rg-marquee-track"
        data-dir={dir}
        style={{ ["--track-duration" as string]: duration }}
      >
        {projects.map((p) => (
          <BrowserCard key={p.url} project={p} />
        ))}
        {/* Duplicate pass makes the loop seamless. aria-hidden + inert so
            screen readers and keyboard users only meet each project once. */}
        <div aria-hidden="true" inert style={{ display: "flex" }}>
          {projects.map((p) => (
            <BrowserCard key={`dup-${p.url}`} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @param withHeader  Set false on /results, where PageHero already supplies
 *   the h1 and the intro — a second heading directly beneath it would be
 *   redundant to read and would give the page two competing titles.
 */
export default function WorkShowcase({ withHeader = true }: { withHeader?: boolean } = {}) {
  const [trackA, trackB] = workTracks();
  if (trackA.length === 0) return null;

  return (
    <Section
      background="var(--cream)"
      labelledBy={withHeader ? "recent-work-heading" : undefined}
      style={{ overflow: "hidden" }}
    >
      {withHeader && (
        <div className="rg-container">
          <div
            className="rg-reveal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "var(--s6)",
              flexWrap: "wrap",
              marginBottom: "var(--s8)",
            }}
          >
            {/* px, not ch — this wrapper uses the body font, so `ch` here would
                size against DM Sans and crush the Bebas heading inside it. */}
            <div style={{ maxWidth: 560 }}>
              <Label>Some of Our Recent Work</Label>
              <h2
                id="recent-work-heading"
                className="rg-display"
                style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
              >
                Websites for Businesses That Need to Be Found
              </h2>
            </div>
            <p
              style={{
                fontSize: 15.5,
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: "42ch",
                margin: 0,
              }}
            >
              Real websites we designed and launched for real Rio Grande Valley businesses. Every
              one is live — click through and see it for yourself.
            </p>
          </div>
        </div>
      )}

      {/* Full-bleed tracks — the sites are the point, so they run edge to edge */}
      <div style={{ display: "grid", gap: "var(--s6)" }} className="rg-reveal">
        <Track projects={trackA} dir="left" duration="64s" />
        {trackB.length > 0 && <Track projects={trackB} dir="right" duration="76s" />}
      </div>
    </Section>
  );
}
