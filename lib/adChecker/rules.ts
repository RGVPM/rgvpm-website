/**
 * Med Spa Ad Checker rules (/med-spa-ad-checker).
 *
 * Deterministic, browser-only checks for Facebook/Instagram ad copy. Every
 * rule cites the published page it is based on. If a rule can't be tied to
 * a source on Meta's Advertising Standards or the FTC's guidance, it doesn't
 * belong here. Sources were last checked on RULES_CHECKED (below); Meta edits these pages often,
 * so re-read them before changing a rule.
 */

export type Severity = "high" | "medium" | "low";

export type Topic = "neurotoxin" | "filler" | "weightLoss" | "laserBody" | "skin" | "promo";

export type Source = { label: string; url: string };

export const SOURCES = {
  metaIntro: {
    label: "Meta Advertising Standards (introduction)",
    url: "https://transparency.meta.com/policies/ad-standards/",
  },
  metaPersonal: {
    label: "Meta Advertising Standards: Privacy violations and personal attributes",
    url: "https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/",
  },
  metaHealth: {
    label: "Meta Advertising Standards: Health and Wellness",
    url: "https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/",
  },
  metaDrugs: {
    label: "Meta Advertising Standards: Drugs and Pharmaceuticals",
    url: "https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/",
  },
  metaCommercial: {
    label: "Meta Advertising Standards: Prohibited commercial practices",
    url: "https://transparency.meta.com/policies/ad-standards/deceptive-content/prohibited-commercial-practices/",
  },
  ftcHealth: {
    label: "FTC: Health Products Compliance Guidance",
    url: "https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance",
  },
  ftcFaq: {
    label: "FTC: Advertising FAQs, a Guide for Small Business",
    url: "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business",
  },
} satisfies Record<string, Source>;

export type TopicOption = { id: Topic; label: string };

export const TOPICS: TopicOption[] = [
  { id: "neurotoxin", label: "Neurotoxin / Botox" },
  { id: "filler", label: "Fillers" },
  { id: "weightLoss", label: "Weight loss / GLP-1" },
  { id: "laserBody", label: "Laser / body contouring" },
  { id: "skin", label: "Skin treatments" },
  { id: "promo", label: "Membership / promo" },
];

/** A rule that looks for words in the ad text. */
export type TextRule = {
  id: string;
  title: string;
  severity: Severity;
  /** Each pattern must use the g and i flags. */
  patterns: RegExp[];
  /** Plain-English reason, about a 6th-grade reading level. */
  reason: string;
  /** What to write instead. */
  fix: string;
  sources: Source[];
};

/** A rule driven by the checkboxes, not the words. */
export type SettingRule = {
  id: string;
  title: string;
  severity: Severity;
  /** Reminders show up but don't raise the overall risk. */
  reminder?: boolean;
  reason: string;
  fix: string;
  sources: Source[];
};

// Body parts and looks people feel touchy about. Used with "you/your".
const LOOKS =
  "wrinkles?|fine lines|crow'?s[- ]feet|forehead lines|frown lines|laugh lines|smile lines|11s|elevens|" +
  "(?:belly |stubborn |body |extra |excess )?fat|belly|love handles|muffin top|double chin|jowls|turkey neck|" +
  "cellulite|stretch marks|acne(?: scars)?|scars?|pimples|breakouts|rosacea|melasma|dark spots|age spots|sun spots|sun damage|" +
  "sagging(?: skin)?|saggy skin|loose skin|thin lips|flat butt|hair loss|thinning hair|bald(?:ing)? spots?|" +
  "weight|extra pounds|extra weight|pounds|thighs|arms|flab|aging skin|tired eyes|under[- ]eye bags|eye bags|dark circles|" +
  "diabetes|depression|anxiety|insecurit(?:y|ies)|flaws|problem areas?";

export const TEXT_RULES: TextRule[] = [
  {
    id: "personal-attributes",
    title: "Talks to the reader about their body or health",
    severity: "high",
    patterns: [
      // "your wrinkles", "your stubborn belly fat", "your double chin"
      new RegExp(`\\byour\\s+(?:[a-z'-]+\\s+){0,2}?(?:${LOOKS})\\b`, "gi"),
      // "Are you tired of...", "Do you hate...", "Feeling insecure about..."
      /\b(?:are|do|did|have|were)\s+you\s+(?:still\s+|really\s+|so\s+)?(?:tired of|sick of|fed up with|embarrassed|ashamed|insecure|self[- ]conscious|unhappy|struggling|suffering|bothered|frustrated|hiding|overweight|over ?weight|getting older|aging|over\s+(?:30|40|50|60)|hate|have\s+(?:wrinkles|acne|diabetes|cellulite|stubborn)|losing your|dealing with)\b/gi,
      /\byou(?:'re|\s+are)\s+(?:overweight|over ?weight|getting older|aging|over\s+(?:30|40|50|60)|insecure|self[- ]conscious|embarrassed|unhappy with|not happy with)\b/gi,
      /\b(?:hate|tired of|sick of|embarrassed by|ashamed of|unhappy with)\s+(?:the way you look|how you look|your (?:body|face|skin|reflection|looks|appearance))\b/gi,
      // Meta's own example: "Ready to upgrade your skin to look younger?"
      /\byour\s+(?:[a-z'-]+\s+){0,3}?to\s+look\s+younger\b/gi,
    ],
    reason:
      "Meta does not allow ads that say or hint that they know something personal about the reader, like their health, their body or their age. \"You\" and \"your\" are fine on their own. They become a problem when they point at a body part, a flaw or a health issue, like \"your wrinkles\" or \"Are you tired of your belly fat?\"",
    fix:
      "Talk about the treatment, not the reader's body. Instead of \"Tired of your wrinkles?\" try \"Smooth the look of fine lines in a quick lunch-break visit.\"",
    sources: [SOURCES.metaPersonal],
  },
  {
    id: "negative-self-perception",
    title: "Body shaming or negative words about looks",
    severity: "high",
    patterns: [
      /\b(?:ugly|uglier|gross|disgusting|hideous|unsightly|unattractive|embarrassing|flabby|saggy|chubby|frumpy|bingo wings|fat rolls|muffin tops?|turkey necks?|cankles|thunder thighs|old[- ]looking|look(?:ing)? old|look(?:ing)? tired|look(?:ing)? your age|hate your body|stop hiding|cover up your|don'?t let (?:your )?(?:wrinkles|fat|weight|acne|age))\b/gi,
    ],
    reason:
      "Meta bans weight loss and cosmetic ads with \"statements of inferiority about physical appearance,\" meaning words that attack how someone looks or a body part. Its standards also bar content meant to make people feel bad about themselves to sell diet, weight loss or other health products.",
    fix:
      "Lead with the good outcome, not the flaw. Instead of \"Get rid of that ugly belly fat\" try \"Body contouring with no surgery. Book a free consult.\"",
    sources: [SOURCES.metaHealth, SOURCES.metaIntro],
  },
  {
    id: "prescription-drugs",
    title: "Names a prescription drug",
    severity: "high",
    patterns: [
      /\b(?:botox|dysport|xeomin|jeuveau|daxxify|letybo|semaglutide|tirzepatide|ozempic|wegovy|mounjaro|zepbound|rybelsus|saxenda|liraglutide|phentermine|glp-?1s?)\b/gi,
    ],
    reason:
      "These are prescription drugs. Meta's Drugs and Pharmaceuticals policy says ads that promote prescription drugs are only allowed from advertisers who are actively certified by LegitScript or approved through Meta's own review, who include a disclaimer to consult a licensed health professional or get a valid prescription, who finish Meta's onboarding for prescription drugs, and who target only people 18+ in the United States, Canada or New Zealand where they are certified. Meta's page does not list drugs by brand name.",
    fix:
      "If you are not certified, talk about your consult and your provider instead of the drug, for example \"Book a consult with our nurse injector to see which wrinkle treatment fits you.\" Meta can still review it as a drug ad. If you plan to name the drug, get certified and authorized first and add a line like \"Talk to a licensed provider to see if this is right for you.\"",
    sources: [SOURCES.metaDrugs, SOURCES.metaHealth],
  },
  {
    id: "weight-loss-numbers",
    title: "Promises a set amount of weight loss",
    severity: "high",
    patterns: [
      /\b(?:lose|lost|drop|dropped|shed|melt|burn|torch)\s+(?:up\s+to\s+|over\s+|at\s+least\s+)?\d+(?:\.\d+)?\s*\+?\s*(?:lbs?|pounds|kg|kilos|inches|in\.|sizes?|dress sizes?|pant sizes?)\b/gi,
      /\b\d+\s*\+?\s*(?:lbs?|pounds|kg|inches|sizes?)\s+(?:in|within|by)\s+(?:just\s+|only\s+)?(?:\d+|one|two|three|four|six|a)\s+(?:days?|weeks?|months?)\b/gi,
      /\b(?:melts?|burns?|torch(?:es)?)\s+(?:away\s+)?(?:the\s+)?(?:fat|pounds|weight)\b/gi,
      /\b(?:fast|rapid|quick|effortless|easy)\s+weight\s+loss\b/gi,
    ],
    reason:
      "Meta bans clickbait in weight loss ads: \"sensational language with exaggerated or extreme claims, or promises of specific outcomes within a set timeframe without disclaimers or qualifiers.\" A number of pounds or sizes, or a promise of fast loss, reads that way.",
    fix:
      "Drop the number and the deadline. Instead of \"Lose 20 lbs in 30 days\" try \"A medical weight loss plan built around you, with check-ins from our team. Results vary.\"",
    sources: [SOURCES.metaHealth],
  },
  {
    id: "guaranteed-results",
    title: "Guarantees results or makes a miracle claim",
    severity: "high",
    patterns: [
      /\b(?:guarantee[ds]?|guaranteeing|100%\s+(?:results|effective|guaranteed|satisfaction)|miracle|magic(?:al)?\s+(?:results|fix|shot|cure)|works for everyone|never fails)\b/gi,
    ],
    reason:
      "Meta bans health and weight loss ads with \"sensational language with exaggerated or extreme claims.\" The FTC also says health claims must be backed by \"competent and reliable scientific evidence,\" and no treatment works the same on everyone.",
    fix:
      "Cut the guarantee. Try \"Real, natural-looking results from licensed providers.\" If you offer a money-back policy, spell out the terms in plain words instead.",
    sources: [SOURCES.metaHealth, SOURCES.ftcHealth],
  },
  {
    id: "timeframe-instant",
    title: "Promises instant or fast results",
    severity: "medium",
    patterns: [
      /\b(?:instant(?:ly)?|immediate(?:ly)?|overnight)\s+(?:results|fix|lift|glow|transformation|change|weight loss|fat loss|youth|difference)\b/gi,
      /\bresults\s+(?:instantly|immediately|overnight)\b/gi,
      /\b(?:see|get|guaranteed)\s+results\s+in\s+(?:just\s+|only\s+)?(?:\d+|one|two|three|a)\s+(?:minutes?|hours?|days?|weeks?)\b/gi,
      /\bin\s+(?:just|only)\s+(?:\d+|one|two|three|a)\s+(?:minutes?|hours?|days?|weeks?|sessions?)\b/gi,
    ],
    reason:
      "Meta flags health ads that promise \"specific outcomes within a set timeframe without disclaimers or qualifiers.\" \"Instant\" or \"in just 3 days\" is that kind of promise.",
    fix:
      "Say when most clients notice a change, and qualify it. Try \"Most clients see results in about 1 to 2 weeks. Results vary.\" Use your real numbers.",
    sources: [SOURCES.metaHealth],
  },
  {
    id: "permanent",
    title: "Says results are permanent or last forever",
    severity: "medium",
    patterns: [/\b(?:permanent(?:ly)?|forever|for good|never come back|last(?:s)? a lifetime|lifetime results)\b/gi],
    reason:
      "\"Permanent\" is an extreme claim for most med spa treatments, and Meta bans exaggerated or extreme claims in health ads. The FTC says health claims need solid scientific proof.",
    fix:
      "Say how long results usually last for most clients, and only if you can back it up. Try \"Long-lasting results. Ask us how long yours may last.\"",
    sources: [SOURCES.metaHealth, SOURCES.ftcHealth],
  },
  {
    id: "safety-claims",
    title: "Says a treatment is painless or has no risk",
    severity: "medium",
    patterns: [
      /\b(?:painless|pain[- ]free|no pain|zero pain|100%\s+safe|completely safe|totally safe|perfectly safe|risk[- ]free|no risks?|no side effects|zero side effects|side[- ]effect[- ]free|zero risk)\b/gi,
    ],
    reason:
      "The FTC says claims about a health product's safety need \"competent and reliable scientific evidence,\" and ads should not hide real risks. Every injection or laser treatment has some risk or discomfort, so \"painless\" or \"no side effects\" is hard to prove.",
    fix:
      "Describe comfort honestly. Try \"We use numbing cream to keep you comfortable\" or \"Done by licensed providers in a medical setting.\"",
    sources: [SOURCES.ftcHealth],
  },
  {
    id: "cure-disease",
    title: "Claims to cure a disease",
    severity: "high",
    patterns: [
      /\b(?:cures?|cured|curing|heals?|healed|healing|eliminates?|eliminated|eliminating)\s+(?:your\s+|my\s+)?(?:type\s*[12]\s+)?(?:diabetes|herpes|thyroid(?:\s+(?:disease|problems|issues))?|hypothyroidism|psoriasis|ebola|cancer|autism|alzheimer'?s|parkinson'?s|als|hiv)\b/gi,
    ],
    reason:
      "Meta bans claims to \"cure, heal, or eliminate\" diseases on its list, which includes diabetes, thyroid, psoriasis and cancer. This is true even when a health professional makes the claim. Talking about treating or managing symptoms is allowed.",
    fix:
      "Remove the cure claim. If it's accurate, talk about symptoms or support instead, like \"Medical weight loss with support from our provider.\"",
    sources: [SOURCES.metaHealth],
  },
  {
    id: "clinically-proven",
    title: "Says \"clinically proven\" or \"doctor proven\"",
    severity: "medium",
    patterns: [/\b(?:clinically|scientifically|medically|doctor)[- ](?:proven|tested and proven|backed|validated)\b/gi],
    reason:
      "The FTC says health claims need \"competent and reliable scientific evidence.\" Saying a treatment is clinically proven means you need studies that prove it for that exact use.",
    fix:
      "Only keep it if you can point to the study. Otherwise try \"A treatment our licensed providers use every day.\"",
    sources: [SOURCES.ftcHealth],
  },
  {
    id: "fda-approved",
    title: "Uses \"FDA approved\" loosely",
    severity: "medium",
    patterns: [/\bFDA[- ](?:approved|certified|registered|endorsed)\b/gi, /\bapproved by (?:the )?FDA\b/gi],
    reason:
      "The FTC warns marketers not to overstate what a government agency has reviewed or approved. FDA approval or clearance covers a specific product for a specific use, not your whole treatment or every result.",
    fix:
      "Name exactly what the FDA approved or cleared and for what, or cut it. For example: \"Uses an FDA-cleared device for [the cleared use].\"",
    sources: [SOURCES.ftcHealth],
  },
  {
    id: "number-one",
    title: "Says \"#1\" or \"top rated\" without proof",
    severity: "medium",
    patterns: [
      /(?:#\s?1\b|\bnumber\s+one\b|\bno\.\s?1\b|\btop[- ]rated\b|\bhighest[- ]rated\b|\bvoted\s+(?:the\s+)?best\b|\baward[- ]winning\b|\b(?:most|best)\s+(?:trusted|experienced|reviewed)\b|\bleading\s+(?:med\s?spa|provider|clinic)\b)/gi,
    ],
    reason:
      "\"#1\" and \"top rated\" sound like facts. The FTC says \"before a company runs an ad, it has to have a 'reasonable basis' for the claims.\" If you can't show the ranking or rating, it can be seen as misleading.",
    fix:
      "Use proof people can check. Try \"Rated 4.9 stars by 300+ Google reviewers\" (with your real numbers) or name the award and the year.",
    sources: [SOURCES.ftcFaq],
  },
  {
    id: "best",
    title: "Says \"best\"",
    severity: "low",
    patterns: [/\b(?:the\s+)?best\b(?!\s+(?:time|way|part|friend|of luck))/gi],
    reason:
      "\"Best\" as an opinion is usually fine. The FTC says claims people can judge for themselves get less attention. But if it reads like a fact, such as \"best results in Texas,\" you need a \"reasonable basis\" to back it up.",
    fix:
      "Keep it clearly as opinion, or swap it for something you can prove, like \"Over 2,000 treatments done\" (if true).",
    sources: [SOURCES.ftcFaq],
  },
];

export const BEFORE_AFTER_RULE: SettingRule = {
  id: "before-after",
  title: "Uses before-and-after images",
  severity: "medium",
  reason:
    "Meta's Health and Wellness policy page has changed several times. Some versions ban side-by-side before-and-after photos for weight loss and for wrinkle treatments like Botox and fillers. The version live today allows before-and-after for general cosmetic procedures when the ad targets people 18+. For weight loss ads it bans close-ups that pinch fat. It also says the ad should \"clearly indicate the time taken to achieve noticeable results.\"",
  fix:
    "Use realistic, untouched photos, say how long the results took, and skip fat-pinching close-ups. For Botox, fillers and weight loss, a single \"after\" photo or a close-up of the treated area is the safer choice.",
  sources: [SOURCES.metaHealth],
};

export const BEFORE_AFTER_HIGH_TOPICS: Topic[] = ["neurotoxin", "filler", "weightLoss"];

export const AGE_RULE: SettingRule = {
  id: "age-18",
  title: "Set your audience to 18+",
  severity: "low",
  reminder: true,
  reason:
    "Meta says ads for weight loss products and services, and for cosmetic procedures, \"must be targeted to people at least 18 years or older.\" Ads for prescription drugs must also target 18+ only.",
  fix: "In Ads Manager, set the age range to start at 18 or older before you publish.",
  sources: [SOURCES.metaHealth, SOURCES.metaDrugs],
};

export const AGE_TOPICS: Topic[] = ["neurotoxin", "filler", "weightLoss", "laserBody", "skin"];

export const PROMO_RULE: SettingRule = {
  id: "promo-terms",
  title: "Make the offer terms clear",
  severity: "low",
  reminder: true,
  reason:
    "Meta's rules on prohibited commercial practices list \"deceptive pricing\" as something it doesn't allow. A specials or membership ad should match what people pay at the front desk.",
  fix: "Say what's included, the real price, and when the offer ends. Example: \"$10 off per unit through Dec 31. New clients only.\"",
  sources: [SOURCES.metaCommercial],
};

/**
 * Shown when the advertiser ticks "We're LegitScript certified (or Meta has
 * approved us for prescription drug ads)". Replaces the High drug-name flag
 * with a reminder. Quotes only Meta's Drugs and Pharmaceuticals page.
 */
export const RX_CERTIFIED_RULE: SettingRule = {
  id: "prescription-drugs",
  title: "Names a prescription drug (you said you're certified)",
  severity: "low",
  reminder: true,
  reason:
    "Certified advertisers can name prescription drugs, but must still include Meta's required disclaimer and 18+ targeting. Meta's Drugs and Pharmaceuticals policy says advertisers \"actively certified with LegitScript\" (or approved through Meta's internal review) must \"include a disclaimer to consult a licensed health professional or obtain a valid prescription,\" \"only target people 18 years or older,\" only target eligible countries (United States, Canada or New Zealand) where they are certified, and \"obtain authorization from Meta.\"",
  fix: "Add a line like \"Talk to a licensed provider to see if this treatment is right for you,\" and set the audience to 18+ in the countries you're certified in.",
  sources: [SOURCES.metaDrugs],
};

/** Prefixed to the drug-name flag when the certified box is NOT ticked. */
export const RX_NOT_CERTIFIED_NOTE = "This assumes you're not LegitScript certified.";

/**
 * The date these rules were last checked against the source pages above.
 * Updated by the monthly policy watcher, which re-reads Meta's and the FTC's
 * pages and bumps this date (and any rule that changed). Shown on the page.
 */
export const RULES_CHECKED = "2026-11-25";

export const DISCLAIMER =
  "This checks common reasons Meta rejects med spa ads. Meta reviews every ad itself, so passing here doesn't guarantee approval. Not legal advice.";
