import { HLink, HSection } from "@/components/home/HomePrimitives";

/**
 * Section 9. Supports the "AI & Marketing Agency" positioning for curious
 * buyers without competing with the main booking path: no second booking
 * button, three crawlable links.
 */
const ROWS = [
  {
    title: "Inquiry follow-up.",
    body: "Texts and emails go out to new leads automatically, with a person stepping in when it matters.",
  },
  {
    title: "After-hours chatbot.",
    body: "Your site answers common questions at night and points people to booking.",
  },
  {
    title: "Custom tools.",
    body: "Small apps and agents for the tasks your team repeats every week.",
  },
];

export default function AiSection() {
  return (
    <HSection surface="cream" labelledBy="ai-heading">
      <div className="rg-h-wrap rg-h-ai-grid">
        <div className="rg-h-reveal">
          <h2 id="ai-heading" className="rg-h-h2">
            AI that handles the follow-up your team never gets to.
          </h2>
          <p className="rg-h-lede">
            We run our own agency on tools like Claude Code and Codex. For clients, we build the
            pieces that give hours back each week.
          </p>
        </div>
        <div className="rg-h-reveal">
          <ul className="rg-h-ai-rows">
            {ROWS.map((r) => (
              <li key={r.title}>
                <h3 className="rg-h-h3">{r.title}</h3>
                <p className="rg-h-body">{r.body}</p>
              </li>
            ))}
          </ul>
          <ul className="rg-h-ai-links">
            <li>
              <HLink href="/services/ai-implementation">AI consulting and builds</HLink>
            </li>
            <li>
              <HLink href="/learn-claude-code">Learn Claude Code 1-on-1</HLink>
            </li>
            <li>
              <HLink href="/claude-code-templates">
                Free: an AI agent that reviews your inbox every morning
              </HLink>
            </li>
          </ul>
        </div>
      </div>
    </HSection>
  );
}
