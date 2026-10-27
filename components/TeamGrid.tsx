"use client";

import { useRef } from "react";
import Image from "next/image";

/**
 * Meet-the-team grid. Every person gets the same portrait card (photo, name,
 * title); clicking a card opens their bio in a native <dialog>. The dialogs
 * are always in the HTML, so crawlers still read every bio. showModal()
 * renders in the browser's top layer, so the layout's transformed
 * .page-transition wrapper can't misplace it.
 */
export type TeamMember = {
  /** Schema.org @id, stable so other pages can reference this person. */
  id: string;
  first: string;
  name: string;
  title: string;
  initials: string;
  /** /public path, 4:5 portrait at least 900px wide. Omit to show initials. */
  photo?: string;
  facts: string[];
  bio: string[];
};

const mono = "var(--font-dm-mono), ui-monospace, monospace";
const bebas = "'Bebas Neue', sans-serif";

function Portrait({ m, priority }: { m: TeamMember; priority?: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "4 / 5",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        background: "linear-gradient(160deg, #243658 0%, #1A2B4A 100%)",
        border: "1px solid var(--border)",
      }}
    >
      {m.photo ? (
        <Image
          src={m.photo}
          alt={`${m.name}, ${m.title}`}
          fill
          sizes="(max-width: 640px) 92vw, 280px"
          style={{ objectFit: "cover" }}
          priority={priority}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: bebas,
            fontSize: 110,
            letterSpacing: "0.04em",
            color: "rgba(247,244,239,0.14)",
          }}
        >
          {m.initials}
        </div>
      )}
    </div>
  );
}

function MemberCard({ m, priority }: { m: TeamMember; priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <li style={{ listStyle: "none" }}>
      <button
        type="button"
        className="rg-team-card"
        onClick={() => dialog.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={`${m.name}, ${m.title}. Read bio`}
      >
        <Portrait m={m} priority={priority} />
        <span style={{ display: "block", fontFamily: bebas, fontSize: 26, letterSpacing: "0.04em", color: "var(--navy)", lineHeight: 1, marginTop: 16 }}>
          {m.name}
        </span>
        <span style={{ display: "block", fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-ink)", marginTop: 8 }}>
          {m.title}
        </span>
        <span className="rg-team-more" style={{ display: "inline-block", fontSize: 14, fontWeight: 600, color: "var(--navy)", marginTop: 12 }}>
          Read bio <span aria-hidden="true">→</span>
        </span>
      </button>

      <dialog
        ref={dialog}
        className="rg-team-dialog"
        aria-labelledby={`${m.first.toLowerCase()}-bio-name`}
        // A click on the backdrop lands on the <dialog> itself; close on it.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="rg-team-dialog-body">
          <button type="button" onClick={close} aria-label="Close" className="rg-team-dialog-close">
            ×
          </button>
          <div className="rg-team-dialog-photo">
            <Portrait m={m} />
          </div>
          <div>
            <h3 id={`${m.first.toLowerCase()}-bio-name`} className="rg-display" style={{ fontSize: "clamp(30px, 3vw, 40px)", color: "var(--navy)", margin: 0 }}>
              {m.name}
            </h3>
            <p style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-ink)", margin: "10px 0 0" }}>
              {m.title}
            </p>
            <ul style={{ listStyle: "none", margin: "var(--s5) 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {m.facts.map((fact) => (
                <li
                  key={fact}
                  style={{
                    fontFamily: mono,
                    fontSize: 10.5,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--navy)",
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-pill)",
                    padding: "6px 11px",
                  }}
                >
                  {fact}
                </li>
              ))}
            </ul>
            {m.bio.map((para, j) => (
              <p key={j} style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)", margin: j === 0 ? "var(--s5) 0 0" : "var(--s4) 0 0" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </dialog>
    </li>
  );
}

export default function TeamGrid({ groups }: { groups: { label: string; members: TeamMember[] }[] }) {
  return (
    <>
      {groups.map((g, gi) => (
        <div key={g.label} style={{ marginTop: gi === 0 ? "var(--s8)" : "var(--s7)" }}>
          <h2 className="rg-label" style={{ color: "var(--orange-ink)", margin: 0 }}>
            {g.label}
          </h2>
          <ul className="rg-team-grid">
            {g.members.map((m) => (
              <MemberCard key={m.id} m={m} priority={gi === 0} />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
