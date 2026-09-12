import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/home/Primitives";
import { CLIENTS } from "@/lib/clients";

/**
 * Quiet logo strip. Only names and files already in lib/clients.ts /
 * public/clients/. Add more by dropping a file and appending to CLIENTS.
 * Renders a reserved empty slot if the list is ever cleared.
 */
export default function LogoStrip() {
  return (
    <Section background="var(--cream)" labelledBy="logos-heading" tight>
      <div className="rg-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "var(--s4)",
            flexWrap: "wrap",
            marginBottom: "var(--s6)",
          }}
        >
          <h2
            id="logos-heading"
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Businesses we work with
          </h2>
          <Link
            href="/results"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--orange-ink)",
              textDecoration: "none",
            }}
          >
            See their sites <span aria-hidden="true">→</span>
          </Link>
        </div>

        {CLIENTS.length === 0 ? (
          <p
            style={{
              fontSize: 15,
              color: "var(--muted)",
              margin: 0,
              minHeight: 72,
              display: "flex",
              alignItems: "center",
            }}
          >
            Client logos will show here.
          </p>
        ) : (
          <ul
            className="rg-logo-strip"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "clamp(28px, 4vw, 48px)",
            }}
          >
            {CLIENTS.map((client) => (
              <li key={client.name}>
                <Link
                  href="/results"
                  aria-label={`${client.name} — see client results`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 56,
                    textDecoration: "none",
                    opacity: 0.88,
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
                        maxHeight: client.maxHeight ?? 52,
                        width: "auto",
                        maxWidth: 180,
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--navy)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {client.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
