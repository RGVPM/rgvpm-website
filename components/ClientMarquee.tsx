import Image from "next/image";
import { CLIENTS } from "@/lib/clients";

/**
 * Transparent, card-less marquee of client logos — sits directly on its
 * parent section background. Each logo is a dofollow backlink to the client.
 * Renders nothing until at least one client is added in lib/clients.ts.
 */
export default function ClientMarquee() {
  if (CLIENTS.length === 0) return null;

  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <div>
      <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", textAlign: "center", marginBottom: 32 }}>
        Some of Our Recent Work
      </p>
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}>
        <div className="animate-marquee-reverse" style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", width: "max-content" }}>
          {doubled.map((client, i) => (
            <a
              key={`${client.url}-${i}`}
              href={client.url}
              target="_blank"
              rel="noopener"
              title={`Visit ${client.name}`}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 48px", height: 100, opacity: 0.82, textDecoration: "none" }}
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  height={200}
                  width={360}
                  style={{ height: "auto", maxHeight: 84, width: "auto", maxWidth: 260, objectFit: "contain" }}
                />
              ) : (
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "0.05em", color: "var(--navy)" }}>
                  {client.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
