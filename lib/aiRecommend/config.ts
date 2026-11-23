/**
 * "Does ChatGPT Recommend Your Med Spa?" (/does-chatgpt-recommend-my-med-spa).
 * Shared by the page (server), the form (client) and the check route.
 * Nothing secret lives here: the page only learns which engines are on.
 */

export const TOOL_PATH = "/does-chatgpt-recommend-my-med-spa";
export const CHECK_PATH = `${TOOL_PATH}/check`;
export const LEAD_FORM_NAME = "ai-recommend-lead";

export const TREATMENTS = [
  { id: "botox", label: "Botox/neurotoxin", ask: "Botox" },
  { id: "lip-filler", label: "Lip filler", ask: "lip filler" },
  { id: "laser-hair-removal", label: "Laser hair removal", ask: "laser hair removal" },
  { id: "hydrafacial", label: "HydraFacial", ask: "a HydraFacial" },
  { id: "microneedling", label: "Microneedling", ask: "microneedling" },
  { id: "weight-loss", label: "Weight loss/GLP-1", ask: "medical weight loss like semaglutide" },
  { id: "body-contouring", label: "Body contouring", ask: "body contouring" },
  { id: "chemical-peel", label: "Chemical peel", ask: "a chemical peel" },
] as const;

export type TreatmentId = (typeof TREATMENTS)[number]["id"];
export const MAX_TREATMENTS = 2;

export const US_STATES: [code: string, name: string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"],
  ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"],
  ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"],
  ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"],
  ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"],
  ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"],
  ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

export type EngineId = "openai" | "perplexity";
export const ENGINE_LABEL: Record<EngineId, string> = { openai: "ChatGPT", perplexity: "Perplexity" };

/**
 * AI_CHECK_MOCK is inlined at build time by next.config.ts, so the
 * netlify.toml deploy-preview value reaches the server code too
 * (netlify.toml variables are not visible to functions at runtime).
 */
export function mockMode(): boolean {
  return process.env.AI_CHECK_MOCK === "1";
}

/** Engines that will run, in display order. Server only (reads env). */
export function enabledEngines(): EngineId[] {
  const out: EngineId[] = [];
  if (mockMode() || process.env.OPENAI_API_KEY) out.push("openai");
  if (mockMode() || process.env.PERPLEXITY_API_KEY) out.push("perplexity");
  return out;
}

// ── result shape (what /check returns) ────────────────────────────────────

export interface Source {
  url: string;
  title: string;
}

export interface Answer {
  engine: EngineId;
  label: string;
  /** "error" = that engine failed or timed out for this question; left out of the score. */
  status: "ok" | "error";
  mentioned: boolean;
  businesses: string[];
  sources: Source[];
}

export interface QuestionResult {
  id: string;
  text: string;
  answers: Answer[];
}

export interface CheckResult {
  mock: boolean;
  spaName: string;
  city: string;
  state: string;
  questions: QuestionResult[];
  mentioned: number;
  total: number;
  checkedAt: string;
}
