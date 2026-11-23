import type { EngineId } from "./config";
import type { EngineAnswer } from "./engines";
import { parseBusinesses } from "./engines";
import type { CheckInput } from "./check";

/**
 * Canned answers for AI_CHECK_MOCK=1 (deploy previews). Shaped like real
 * engine output and run through the same parser and matcher, so the preview
 * shows the real UI: a mix of "mentioned" and "not mentioned". Spa names are
 * generic on purpose. Costs nothing and calls no API.
 */

const OTHERS = ["Example Med Spa A", "Example Aesthetics B", "Example Skin Studio C", "Example Wellness D", "Example Laser Center E"];

export async function mockAnswer(engine: EngineId, qi: number, input: CheckInput): Promise<EngineAnswer> {
  await new Promise((r) => setTimeout(r, 900 + qi * 250 + (engine === "perplexity" ? 300 : 0)));
  // The owner's spa shows up in ChatGPT's first answer and Perplexity's last one.
  const includeOwner = (engine === "openai" && qi === 0) || (engine === "perplexity" && qi === 2);
  const start = (qi + (engine === "perplexity" ? 2 : 0)) % OTHERS.length;
  const names = [OTHERS[start], OTHERS[(start + 1) % OTHERS.length], OTHERS[(start + 2) % OTHERS.length]];
  if (includeOwner) names.splice(1, 0, input.spaName);

  const where = `${input.city}, ${input.state}`;
  const lines = names.map((n, i) =>
    engine === "openai"
      ? `${i + 1}. **${n}** - Known for friendly staff and clear pricing.`
      : `- **${n}**: Strong reviews from local patients in ${input.city} [${i + 1}].`,
  );
  const raw = `Here are a few well-reviewed options in ${where}:\n\n${lines.join("\n")}\n\nCall ahead to ask about a free consult.\nBUSINESSES: ${JSON.stringify(names)}`;
  const { text, businesses } = parseBusinesses(raw);
  return {
    text,
    businesses,
    sources: [
      { url: "https://www.example.com/best-med-spas", title: `Best Med Spas in ${input.city} (example source)` },
      { url: "https://www.example.org/reviews/med-spas", title: "Med spa reviews (example source)" },
      { url: "https://www.example.net/directory/aesthetics", title: "Aesthetics directory (example source)" },
    ].slice(0, engine === "openai" ? 2 : 3),
  };
}
