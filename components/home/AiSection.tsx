import { HLink, HSection } from "@/components/home/HomePrimitives";

/**
 * Section 10, the violet hour. Supports the "AI & Marketing Agency"
 * positioning for curious buyers without competing with the main booking
 * path: no second booking button, three crawlable links.
 *
 * The thread on the right is an illustration, labeled "Example": plain
 * words, no numbers, no claims, and no missed-call framing. Its bubbles
 * reveal once, in sequence (motion/sections.ts).
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

const THREAD = [
  { who: "Lead", side: "in", text: "Hi, do you have anything open this week?" },
  {
    who: "Auto reply",
    side: "out",
    text: "Thanks for reaching out! Here’s our booking link, and someone from our team will follow up shortly.",
  },
  { who: "Team", side: "out", text: "Hi, this is Kelsey. I saw your message and can help you pick a time." },
];

export default function AiSection() {
  return (
    <HSection surface="night" labelledBy="ai-heading" className="ev-ai">
      <span className="ev-ai-orb" aria-hidden="true" />
      <div className="ev-wrap ev-ai-grid">
        <div>
          <h2 id="ai-heading" className="ev-h2" data-ev-reveal="">
            AI that handles the follow-up your team never gets to.
          </h2>
          <p className="ev-lede ev-rise">
            We run our own agency on tools like Claude Code and Codex. For clients, we build the
            pieces that give hours back each week.
          </p>
          <ul className="ev-ai-rows">
            {ROWS.map((r) => (
              <li key={r.title} className="ev-rise">
                <h3 className="ev-h3">{r.title}</h3>
                <p className="ev-body">{r.body}</p>
              </li>
            ))}
          </ul>
          <ul className="ev-ai-links ev-rise">
            <li>
              <HLink href="/services/ai-implementation">AI consulting and builds</HLink>
            </li>
            <li>
              <HLink href="/learn-claude-code">Learn Claude Code 1-on-1</HLink>
            </li>
            <li>
              <HLink href="/claude-code-templates">Free AI agent that reviews your inbox</HLink>
            </li>
          </ul>
        </div>
        <figure className="ev-thread" aria-label="Example message thread">
          <figcaption className="ev-thread-label">Example</figcaption>
          <ol className="ev-thread-list">
            {THREAD.map((m) => (
              <li key={m.who} className={`ev-bubble ev-bubble--${m.side}`}>
                <span className="ev-bubble-who">{m.who}</span>
                <span className="ev-bubble-text">{m.text}</span>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </HSection>
  );
}
