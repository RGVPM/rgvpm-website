import Image from "next/image";
import { CLIENTS } from "@/lib/clients";

/**
 * Left-to-right marquee of client logos. Each logo links out to the client's
 * website as a dofollow backlink (SEO value for them). Renders nothing until
 * at least one client is added in lib/clients.ts.
 */
export default function ClientMarquee() {
  if (CLIENTS.length === 0) return null;

  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section style={{ background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", marginBottom: 22, textAlign: "center" }}>
        <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          Businesses We&apos;ve Built For
        </span>
      </div>
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}>
        <div className="animate-marquee-reverse" style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", width: "max-content" }}>
          {doubled.map((client, i) => (
            <a
              key={`${client.url}-${i}`}
              href={client.url}
              target="_blank"
              rel="noopener"
              title={`Visit ${client.name}`}
              style={{ display: "inline-flex", alignItems: "center", padding: "0 16px", textDecoration: "none" }}
            >
              <div style={{ background: "#fff", borderRadius: 12, height: 84, minWidth: 210, padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    height={140}
                    width={260}
                    style={{ height: "auto", maxHeight: 68, width: "auto", maxWidth: 200, objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "0.05em", color: "var(--navy)" }}>
                    {client.name}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
