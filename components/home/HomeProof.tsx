import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/home/Primitives";
import { PROJECTS } from "@/lib/work";

/**
 * Real client sites already listed in lib/work.ts. No invented numbers,
 * rankings, or "live" metrics — just the work that is already on /results.
 */
export default function HomeProof() {
  const projects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <Section background="#fff" labelledBy="proof-heading">
      <div className="rg-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "var(--s5)",
            flexWrap: "wrap",
            marginBottom: "var(--s8)",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <h2
              id="proof-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: 0 }}
            >
              Real work for real businesses
            </h2>
            <p
              style={{
                fontSize: 18,
                color: "var(--muted)",
                lineHeight: 1.6,
                margin: "var(--s4) 0 0",
                maxWidth: "42ch",
              }}
            >
              These sites are live. Click one and see it for yourself.
            </p>
          </div>
          <Link
            href="/results"
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--orange-ink)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            See all client results <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul
          className="rg-proof-grid"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(20px, 2.4vw, 28px)",
          }}
        >
          {projects.map((project) => (
            <li key={project.url}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    background: "var(--cream-dark)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    marginBottom: "var(--s4)",
                  }}
                >
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} website`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 700px) 100vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  ) : null}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--navy)",
                    lineHeight: 1.3,
                  }}
                >
                  {project.name}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>
                  {project.industry}
                  {project.location ? ` · ${project.location}` : ""}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
