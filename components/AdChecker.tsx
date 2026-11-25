"use client";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import Link from "next/link";
import { DISCLAIMER, RULES_CHECKED, detectTopics } from "@/lib/adChecker/rules";
import { checkAd, segments, FIELD_LABEL, type AdField, type Flag } from "@/lib/adChecker/check";
import { OCR_MAX_BYTES, OCR_MAX_FILES, OCR_TYPES, readImages, type OcrProgress } from "@/lib/adChecker/ocr";
import { track } from "@/lib/track";

/**
 * The Med Spa Ad Checker, built so anyone can use it: add your ad (picture
 * and/or words), answer one yes/no question, tap Grade, get PASS or FAIL with
 * a plain reason and a fix for each problem. Topics are guessed from the
 * words (lib/adChecker/rules detectTopics), so there are no topic boxes.
 * Runs lib/adChecker rules in the browser: no API, no server, nothing saved.
 * Pictures are read with in-browser OCR (lib/adChecker/ocr.ts) and never
 * leave the device. The optional lead box posts to Netlify Forms (form
 * "ad-checker-lead", registered by public/__forms.html).
 */

const field: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  fontSize: 17, // 16px+ stops iOS zooming into the field on focus
  border: "2px solid var(--border)",
  borderRadius: 14,
  background: "#fff",
  color: "var(--navy)",
  fontFamily: "var(--font-dm-sans), sans-serif",
  lineHeight: 1.5,
};
const label: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 6 };

const SAMPLE =
  "Are you tired of your wrinkles? Our Botox specials are back! Get $3 off per unit and see instant results. Guaranteed to take 10 years off. #1 Botox in McAllen. Painless treatments by expert injectors.";

type YesNo = "yes" | "no" | null;

export default function AdChecker() {
  const [words, setWords] = useState("");
  const [imageText, setImageText] = useState("");
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [beforeAfter, setBeforeAfter] = useState<YesNo>(null);
  const [certified, setCertified] = useState<YesNo>(null);
  const [graded, setGraded] = useState(false);
  const [ocr, setOcr] = useState<OcrProgress | null>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const allText = `${words}\n${imageText}`;
  const report = useMemo(
    () =>
      checkAd({
        primary: words,
        headline: "",
        description: "",
        image: imageText,
        topics: detectTopics(allText),
        beforeAfter: beforeAfter === "yes",
        certified: certified === "yes",
      }),
    [words, imageText, allText, beforeAfter, certified],
  );
  const hasAd = Boolean(words.trim() || imageText.trim());
  const namesDrug = report.flags.some((f) => f.id === "prescription-drugs");

  useEffect(() => () => thumbs.forEach((u) => URL.revokeObjectURL(u)), [thumbs]);

  async function addImages(files: File[]) {
    if (!files.length) return;
    setOcrError(null);
    if (files.length > OCR_MAX_FILES) return setOcrError(`Pick up to ${OCR_MAX_FILES} pictures at a time.`);
    const bad = files.find((f) => !OCR_TYPES.includes(f.type));
    if (bad) return setOcrError(`${bad.name} isn't a picture we can read. Use PNG, JPG or WebP.`);
    const big = files.find((f) => f.size > OCR_MAX_BYTES);
    if (big) return setOcrError(`${big.name} is too big (over 10 MB). Try a smaller one.`);
    setThumbs(files.map((f) => URL.createObjectURL(f)));
    setOcr({ file: 0, files: files.length, status: "loading", progress: 0 });
    try {
      const texts = await readImages(files, setOcr);
      const found = texts.filter(Boolean).join("\n\n");
      if (!found) setOcrError("We didn't see any words in your picture. That's OK. If it has words, type them in the box.");
      setImageText(found);
    } catch {
      setOcrError("We couldn't read that picture. Type the words from it in the box instead.");
    } finally {
      setOcr(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onPick(e: ChangeEvent<HTMLInputElement>) {
    addImages(Array.from(e.target.files ?? []));
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    if (ocr) return;
    addImages(Array.from(e.dataTransfer.files ?? []));
  }

  function grade() {
    if (!hasAd) return;
    setGraded(true);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function trySample() {
    setWords(SAMPLE);
    setBeforeAfter("yes");
    setGraded(false);
  }

  function startOver() {
    setWords("");
    setImageText("");
    setThumbs([]);
    setBeforeAfter(null);
    setCertified(null);
    setGraded(false);
    setOcrError(null);
  }

  const problems = report.flags.filter((f) => !f.reminder && f.severity !== "low");
  const tips = report.flags.filter((f) => f.reminder || f.severity === "low");
  const fields: { key: AdField; value: string }[] = [
    { key: "primary", value: words },
    { key: "image", value: imageText },
  ];

  return (
    <div>
      <ol className="adc-steps" aria-label="How it works">
        <li><span>1</span>Add your ad</li>
        <li><span>2</span>Tap Grade</li>
        <li><span>3</span>See pass or fail</li>
      </ol>

      <form className="adc-simple" onSubmit={(e) => { e.preventDefault(); grade(); }} noValidate>
        <h3 className="adc-q"><span className="adc-num">1</span>Add your ad</h3>

        <label
          htmlFor="adc-image"
          className={`adc-drop${dragging ? " adc-drop--over" : ""}${ocr ? " adc-drop--busy" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {thumbs.length > 0 ? (
            <span className="adc-thumbs">
              {thumbs.map((u) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={u} src={u} alt="Your ad picture" />
              ))}
            </span>
          ) : (
            <svg className="adc-drop-icon" aria-hidden="true" viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.8" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          )}
          <span className="adc-drop-big">
            {ocr
              ? ocr.status === "recognizing text"
                ? `Reading your picture… ${Math.round(ocr.progress * 100)}%`
                : "Getting ready to read your picture…"
              : thumbs.length
                ? "Tap to pick a different picture"
                : "Tap here to add your ad picture"}
          </span>
          {!ocr && !thumbs.length && <span className="adc-drop-small">or drag it here. Up to 3 for a carousel.</span>}
          <input
            ref={fileRef}
            id="adc-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            disabled={ocr !== null}
            onChange={onPick}
            className="adc-file-hidden"
          />
        </label>
        {ocrError && <p role="alert" className="avc-error" style={{ marginTop: 10 }}>{ocrError}</p>}

        {imageText && !ocr && (
          <details className="adc-read">
            <summary>See the words we read from your picture</summary>
            <label htmlFor="adc-image-text" style={{ ...label, marginTop: 10 }}>Fix anything we got wrong:</label>
            <textarea
              id="adc-image-text"
              rows={3}
              maxLength={3000}
              value={imageText}
              onChange={(e) => setImageText(e.target.value)}
              style={{ ...field, resize: "vertical" }}
            />
          </details>
        )}

        <label htmlFor="adc-words" className="adc-words-label">And paste your ad words here</label>
        <textarea
          id="adc-words"
          rows={5}
          maxLength={3000}
          placeholder="Copy the words from your Facebook or Instagram ad and paste them here. Headline too!"
          value={words}
          onChange={(e) => setWords(e.target.value)}
          style={{ ...field, resize: "vertical" }}
        />

        <h3 className="adc-q"><span className="adc-num">2</span>Does your ad show a before-and-after photo?</h3>
        <YesNoButtons name="before-after" value={beforeAfter} onChange={setBeforeAfter} />

        {namesDrug && (
          <>
            <h3 className="adc-q"><span className="adc-num">!</span>Your ad names a prescription drug. Is your spa LegitScript certified?</h3>
            <YesNoButtons name="certified" value={certified} onChange={setCertified} noLabel="No / not sure" />
          </>
        )}

        <button type="submit" className="adc-grade-btn" disabled={!hasAd || ocr !== null}>
          Grade my ad
        </button>
        <p className="adc-under">
          {hasAd ? "Free. No email. Your ad stays on your device." : "Add a picture or paste your words to start."}{" "}
          <button type="button" className="adc-link-btn" onClick={trySample}>Try an example</button>
          {hasAd && <> · <button type="button" className="adc-link-btn" onClick={startOver}>Start over</button></>}
        </p>
      </form>

      <div aria-live="polite" ref={resultRef} style={{ scrollMarginTop: 96 }}>
        {graded && hasAd && (
          <div className="avc-report">
            <div className={`adc-verdict adc-verdict--${report.grade.toLowerCase()}`}>
              <span className="adc-verdict-icon" aria-hidden="true">{report.grade === "PASS" ? "✓" : "✕"}</span>
              <div>
                <p className="adc-verdict-word rg-display">{report.grade}</p>
                <p className="adc-verdict-text">
                  {report.grade === "PASS"
                    ? tips.length
                      ? "Nice! We didn't find anything Meta usually rejects. Read the tips below before you post."
                      : "Nice! We didn't find anything Meta usually rejects."
                    : `Meta will probably reject this ad. Fix ${problems.length === 1 ? "this 1 thing" : `these ${problems.length} things`} first.`}
                </p>
              </div>
            </div>

            {problems.length > 0 && (
              <>
                <h3 className="adc-list-h">{problems.length === 1 ? "What to fix" : `What to fix (${problems.length})`}</h3>
                <ol className="adc-cards">
                  {problems.map((f) => <ResultCard key={f.id} f={f} tone="fail" />)}
                </ol>
              </>
            )}

            {tips.length > 0 && (
              <>
                <h3 className="adc-list-h">{report.grade === "PASS" ? "Tips before you post" : "Also check"}</h3>
                <ol className="adc-cards">
                  {tips.map((f) => <ResultCard key={f.id} f={f} tone="tip" />)}
                </ol>
              </>
            )}

            {report.hits.length > 0 && (
              <details className="adc-read" style={{ marginTop: 20 }}>
                <summary>Show my ad with the problem words marked</summary>
                <div className="adc-preview" style={{ marginTop: 12 }}>
                  {fields
                    .filter((f) => f.value.trim())
                    .map((f) => (
                      <div key={f.key} className="adc-preview-field">
                        <span className="adc-preview-label">{FIELD_LABEL[f.key]}</span>
                        <p>
                          {segments(f.value, report.hits, f.key).map((s, i) =>
                            s.hit ? (
                              <mark key={i} className={`adc-mark adc-mark--${s.hit.severity}`}>{s.text}</mark>
                            ) : (
                              <span key={i}>{s.text}</span>
                            ),
                          )}
                        </p>
                      </div>
                    ))}
                </div>
              </details>
            )}

            <p className="adc-disclaimer">{DISCLAIMER}</p>
            <p className="adc-disclaimer" style={{ marginTop: 6 }}>
              Rules last checked against Meta and FTC policy: <time dateTime={RULES_CHECKED}>{formatDate(RULES_CHECKED)}</time>
            </p>
          </div>
        )}
      </div>

      <LeadBox risk={graded && hasAd ? report.grade : ""} />
    </div>
  );
}

function YesNoButtons({
  name,
  value,
  onChange,
  noLabel = "No",
}: {
  name: string;
  value: YesNo;
  onChange: (v: YesNo) => void;
  noLabel?: string;
}) {
  return (
    <div className="adc-yesno" role="radiogroup" aria-label={name}>
      {(["yes", "no"] as const).map((v) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          className={`adc-yn${value === v ? " adc-yn--on" : ""}`}
          onClick={() => onChange(v)}
        >
          {v === "yes" ? "Yes" : noLabel}
        </button>
      ))}
    </div>
  );
}

function ResultCard({ f, tone }: { f: Flag; tone: "fail" | "tip" }) {
  return (
    <li className={`adc-card adc-card--${tone}`}>
      <span className="adc-card-icon" aria-hidden="true">{tone === "fail" ? "✕" : "i"}</span>
      <div className="avc-row-body">
        <p className="adc-card-simple">{f.simple}</p>
        {f.matches.length > 0 && (
          <p className="avc-found">
            We found:{" "}
            {f.matches.map((m, i) => (
              <span key={i}>
                {i > 0 && ", "}
                <mark className={`adc-mark adc-mark--${f.severity}`}>{m.text}</mark>
              </span>
            ))}
          </p>
        )}
        <p className="adc-card-fix"><strong>Try this:</strong> {f.fix}</p>
        <details className="adc-more">
          <summary>Why? (the details)</summary>
          <p className="avc-why">{f.reason}</p>
          <p className="adc-source">
            Source:{" "}
            {f.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && "; "}
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </span>
            ))}
          </p>
        </details>
      </div>
    </li>
  );
}

type Status = "idle" | "sending" | "done" | "error";

function LeadBox({ risk }: { risk: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const body = new URLSearchParams();
    new FormData(form).forEach((v, k) => body.append(k, String(v)));
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("Lead", { content_name: "Med Spa Ad Checker" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="adc-lead">
      <h3>Want us to write and run compliant ads for you?</h3>
      {status === "done" ? (
        <p role="status" className="adc-lead-text">
          Thanks! We got it. Someone from our team will reach out within one business day.
        </p>
      ) : (
        <>
          <p className="adc-lead-text">Optional. Leave your details and we&apos;ll get back to you within one business day.</p>
          <form name="ad-checker-lead" onSubmit={onSubmit} className="adc-lead-form">
            <input type="hidden" name="form-name" value="ad-checker-lead" />
            <input type="hidden" name="risk" value={risk} />
            <p hidden>
              <label>
                Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div>
              <label htmlFor="adc-lead-name" style={label}>Name</label>
              <input id="adc-lead-name" name="name" required autoComplete="name" maxLength={100} style={{ ...field, fontSize: 16, padding: "14px 16px", borderWidth: 1, borderRadius: 10 }} />
            </div>
            <div>
              <label htmlFor="adc-lead-email" style={label}>Email</label>
              <input id="adc-lead-email" name="email" type="email" required autoComplete="email" maxLength={200} style={{ ...field, fontSize: 16, padding: "14px 16px", borderWidth: 1, borderRadius: 10 }} />
            </div>
            <div>
              <label htmlFor="adc-lead-practice" style={label}>Practice name</label>
              <input id="adc-lead-practice" name="practice" required autoComplete="organization" maxLength={150} style={{ ...field, fontSize: 16, padding: "14px 16px", borderWidth: 1, borderRadius: 10 }} />
            </div>
            <div>
              <label htmlFor="adc-lead-phone" style={label}>Phone <span className="avc-opt">(optional)</span></label>
              <input id="adc-lead-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} style={{ ...field, fontSize: 16, padding: "14px 16px", borderWidth: 1, borderRadius: 10 }} />
            </div>
            <button type="submit" className="rg-btn avc-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : <>Send <span aria-hidden="true">→</span></>}
            </button>
            {status === "error" && (
              <p role="alert" className="avc-error" style={{ gridColumn: "1 / -1", marginTop: 0 }}>
                Something went wrong. Please try again, or email us at info@rgvperformancemarketing.com.
              </p>
            )}
          </form>
        </>
      )}
      <p className="adc-lead-more">
        Or see <Link href="/med-spa-advertising" className="rg-text-link">how we run med spa ads</Link>.
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
