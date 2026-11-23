import { ENGINE_LABEL, TREATMENTS, type Answer, type CheckResult, type EngineId, type QuestionResult, type TreatmentId } from "./config";
import { askEngine, type EngineAnswer } from "./engines";
import { isMentioned } from "./match";
import { mockAnswer } from "./mock";

export interface CheckInput {
  spaName: string;
  city: string;
  /** Full state name, e.g. "Texas". */
  state: string;
  /** Bare domain or "". */
  domain: string;
  treatments: TreatmentId[];
}

/** Always 3 questions: the "best med spa" one, then up to 2 treatment ones, then a fill-in. */
export function buildQuestions(city: string, state: string, treatments: TreatmentId[]): { id: string; text: string }[] {
  const where = `${city}, ${state}`;
  const qs = [{ id: "med-spa", text: `What is the best med spa in ${where}?` }];
  for (const id of treatments) {
    const t = TREATMENTS.find((x) => x.id === id);
    if (t) qs.push({ id, text: `Where should I get ${t.ask} in ${where}?` });
  }
  const fill = [
    { id: "top-rated", text: `Which med spas in ${where} have the best reviews?` },
    { id: "botox", text: `Where should I get Botox in ${where}?` },
  ];
  for (const f of fill) if (qs.length < 3 && !qs.some((q) => q.id === f.id)) qs.push(f);
  return qs.slice(0, 3);
}

export async function runCheck(input: CheckInput, engines: EngineId[], mock: boolean): Promise<CheckResult> {
  const questions = buildQuestions(input.city, input.state, input.treatments);

  // Every engine × question runs at once; each call has its own timeout.
  const jobs = questions.flatMap((q, qi) =>
    engines.map(async (engine): Promise<[number, Answer]> => {
      try {
        const a: EngineAnswer = mock ? await mockAnswer(engine, qi, input) : await askEngine(engine, q.text);
        const mentioned = isMentioned({
          ownerName: input.spaName,
          ownerDomain: input.domain,
          text: a.text,
          businesses: a.businesses,
          sourceUrls: a.sources.map((s) => s.url),
        });
        return [qi, { engine, label: ENGINE_LABEL[engine], status: "ok", mentioned, businesses: a.businesses, sources: a.sources }];
      } catch (e) {
        // Log the engine and error kind only. No inputs, no answer text.
        console.error("ai-recommend engine failed", engine, e instanceof Error ? e.message.slice(0, 80) : "error");
        return [qi, { engine, label: ENGINE_LABEL[engine], status: "error", mentioned: false, businesses: [], sources: [] }];
      }
    }),
  );
  const settled = await Promise.all(jobs);

  const out: QuestionResult[] = questions.map((q) => ({ ...q, answers: [] }));
  for (const [qi, a] of settled) out[qi].answers.push(a);
  for (const q of out) q.answers.sort((a, b) => engines.indexOf(a.engine) - engines.indexOf(b.engine));

  const ok = settled.map(([, a]) => a).filter((a) => a.status === "ok");
  return {
    mock,
    spaName: input.spaName,
    city: input.city,
    state: input.state,
    questions: out,
    mentioned: ok.filter((a) => a.mentioned).length,
    total: ok.length,
    checkedAt: new Date().toISOString(),
  };
}
