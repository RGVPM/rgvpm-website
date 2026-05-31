import Link from "next/link";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visual breadcrumb trail. The last item is the current page (plain text).
 * `dark` renders light-on-dark for use inside a navy hero; `inHero` removes
 * the standalone top padding when the parent hero already clears the fixed nav.
 */
export default function Breadcrumbs({
  items,
  dark = false,
  inHero = false,
}: {
  items: Crumb[];
  dark?: boolean;
  inHero?: boolean;
}) {
  const linkColor = dark ? "rgba(255,255,255,0.6)" : "var(--muted)";
  const currentColor = dark ? "#fff" : "var(--navy)";

  const list = (
    <ol
      style={{
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
        fontSize: 12.5,
        fontFamily: "var(--font-dm-mono), monospace",
        letterSpacing: "0.04em",
        color: linkColor,
        margin: 0,
        padding: 0,
      }}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={item.path} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {last ? (
              <span style={{ color: currentColor }}>{item.name}</span>
            ) : (
              <>
                <Link href={item.path} style={{ color: linkColor, textDecoration: "none" }}>
                  {item.name}
                </Link>
                <span style={{ color: "var(--orange)" }}>/</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );

  if (inHero) {
    return (
      <nav aria-label="Breadcrumb" style={{ marginBottom: 22 }}>
        {list}
      </nav>
    );
  }

  return (
    <nav aria-label="Breadcrumb" style={{ maxWidth: 1140, margin: "0 auto", padding: "20px 24px 0" }}>
      {list}
    </nav>
  );
}
