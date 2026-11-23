"use client";
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { TOPICS, DISCLAIMER, type Topic } from "@/lib/adChecker/rules";
import { checkAd, segments, FIELD_LABEL, type AdField, type Flag } from "@/lib/adChecker/check";
import { OCR_MAX_BYTES, OCR_MAX_FILES, OCR_TYPES, readImages, type OcrProgress } from "@/lib/adChecker/ocr";
import { track } from "@/lib/track";

/**
 * The Med Spa Ad Checker. Runs lib/adChecker rules in the browser on every
 * keystroke: no API, no server, nothing saved. Uploaded images are read with
 * in-browser OCR (lib/adChecker/ocr.ts) and never leave the device. The
 * optional lead box below it
 * posts to Netlify Forms (form "ad-checker-lead", registered by
 * public/__forms.html).
 */

const field: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 16, // 16px stops iOS zooming into the field on focus
  border: "1px solid var(--border)",
  borderRadius: 10,
  background: "#fff",
  color: "var(--navy)",
  fontFamily: "var(--font-dm-sans), sans-serif",
  lineHeight: 1.5,
};
const label: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 6 };

const SAMPLE = {
  primary:
    "Are you tired of your wrinkles? Our Botox specials are back! Get $3 off per unit and see instant results. Guaranteed to take 10 years off.",
  headline: "#1 Botox in McAllen",
  description: "Painless treatments by expert injectors",
  topics: ["neurotoxin", "promo"] as Topic[],
  beforeAfter: true,
};

const SEVERITY_LABEL = { high: "High risk", medium: "Medium risk", low: "Low risk" } as const;
const ROW_CLASS = { high: "fail", medium: "warn", low: "warn" } as const;
const ROW_ICON = { high: "✕", medium: "!", low: "!" } as const;

export default function AdChecker() {
  const [primary, setPrimary] = useState("");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [beforeAfter, setBeforeAfter] = useState(false);
  const [imageText, setImageText] = useState("");
  const [ocr, setOcr] = useState<OcrProgress | null>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [showImageBox, setShowImageBox] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const report = useMemo(
    () => checkAd({ primary, headline, description, image: imageText, topics, beforeAfter }),
    [primary, headline, description, imageText, topics, beforeAfter],
  );
  const hasText = Boolean(primary.trim() || headline.trim() || description.trim() || imageText.trim());

  async function onImages(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setOcrError(null);
    if (files.length > OCR_MAX_FILES) {
      setOcrError(`Pick up to ${OCR_MAX_FILES} images at a time.`);
      return;
    }
    const bad = files.find((f) => !OCR_TYPES.includes(f.type));
    if (bad) {
      setOcrError(`${bad.name} isn't a PNG, JPG or WebP image.`);
      return;
    }
    const big = files.find((f) => f.size > OCR_MAX_BYTES);
    if (big) {
      setOcrError(`${big.name} is over 10 MB. Try a smaller export.`);
      return;
    }
    setOcr({ file: 0, files: files.length, status: "loading", progress: 0 });
    setShowImageBox(true);
    try {
      const texts = await readImages(files, setOcr);
      const found = texts.filter(Boolean).join("\n\n");
      if (!found) setOcrError("We couldn't find any text in that image. If it has text, type it in the box below.");
      setImageText(found);
    } catch {
      setOcrError("We couldn't read that image. You can type the text from it into the box below instead.");
    } finally {
      setOcr(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function toggleTopic(t: Topic) {
    setTopics((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  }

  function loadSample() {
    setPrimary(SAMPLE.primary);
    setHeadline(SAMPLE.headline);
    setDescription(SAMPLE.description);
    setTopics(SAMPLE.topics);
    setBeforeAfter(SAMPLE.beforeAfter);
  }

  function clearAll() {
    setPrimary("");
    setHeadline("");
    setDescription("");
    setTopics([]);
    setBeforeAfter(false);
    setImageText("");
    setOcrError(null);
    setShowImageBox(false);
  }

  const flags = report.flags.filter((f) => !f.reminder);
  const reminders = report.flags.filter((f) => f.reminder);
  const fields: { key: AdField; value: string }[] = [
    { key: "primary", value: primary },
    { key: "headline", value: headline },
    { key: "description", value: description },
    { key: "image", value: imageText },
  ];

  return (
    <div>
      <form className="adc-form" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="adc-full">
          <label htmlFor="adc-primary" style={label}>Primary text</label>
          <textarea
            id="adc-primary"
            rows={5}
            maxLength={3000}
            placeholder="Paste the main text of your Facebook or Instagram ad"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
            style={{ ...field, resize: "vertical" }}
          />
        </div>
        <div>
          <label htmlFor="adc-headline" style={label}>Headline</label>
          <input id="adc-headline" type="text" maxLength={300} value={headline} onChange={(e) => setHeadline(e.target.value)} style={field} />
        </div>
        <div>
          <label htmlFor="adc-description" style={label}>Description <span className="avc-opt">(optional)</span></label>
          <input id="adc-description" type="text" maxLength={300} value={description} onChange={(e) => setDescription(e.target.value)} style={field} />
        </div>

        <fieldset className="adc-full adc-fieldset">
          <legend style={label}>What does the ad promote? <span className="avc-opt">(tick all that apply)</span></legend>
          <div className="adc-checks">
            {TOPICS.map((t) => (
              <label key={t.id} className="adc-check">
                <input type="checkbox" checked={topics.includes(t.id)} onChange={() => toggleTopic(t.id)} />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="adc-full adc-fieldset">
          <legend style={label}>Images</legend>
          <label className="adc-check adc-check--wide">
            <input type="checkbox" checked={beforeAfter} onChange={(e) => setBeforeAfter(e.target.checked)} />
            <span>This ad uses before-and-after images</span>
          </label>
        </fieldset>

        <div className="adc-full adc-upload">
          <label htmlFor="adc-image" style={label}>
            Upload your ad image <span className="avc-opt">(optional, PNG, JPG or WebP, up to 3 for a carousel)</span>
          </label>
          <input
            ref={fileRef}
            id="adc-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            disabled={ocr !== null}
            onChange={onImages}
            className="adc-file"
          />
          <p className="adc-private">Your image stays on your device. We don&apos;t upload or save it. We only read the words on it.</p>
          {ocr && (
            <p className="adc-ocr-status" role="status">
              {ocr.status === "recognizing text"
                ? `Reading image ${ocr.file} of ${ocr.files}… ${Math.round(ocr.progress * 100)}%`
                : "Getting the text reader ready…"}
            </p>
          )}
          {ocrError && <p role="alert" className="avc-error" style={{ marginTop: 10 }}>{ocrError}</p>}
          {showImageBox && ocr === null && (
            <div style={{ marginTop: 14 }}>
              <label htmlFor="adc-image-text" style={label}>
                Text found in your image <span className="avc-opt">(fix any mistakes)</span>
              </label>
              <textarea
                id="adc-image-text"
                rows={4}
                maxLength={3000}
                value={imageText}
                onChange={(e) => setImageText(e.target.value)}
                style={{ ...field, resize: "vertical" }}
              />
            </div>
          )}
        </div>

        <div className="adc-full adc-actions">
          <button type="button" className="adc-link-btn" onClick={loadSample}>Try a sample ad</button>
          {hasText && <button type="button" className="adc-link-btn" onClick={clearAll}>Clear</button>}
        </div>
        <p className="avc-fine">Free. No email needed. Results update as you type. Your ad stays in your browser. We don&apos;t save it.</p>
      </form>

      <div aria-live="polite">
        {hasText && (
          <div className="avc-report">
            <div className="adc-summary">
              <p className={`adc-risk adc-risk--${report.risk.toLowerCase()}`}>
                <span className="rg-display">{report.risk}</span> rejection risk
              </p>
              <p className="avc-counts">
                {flags.length === 0
                  ? "We didn't find any of the common problems we check for."
                  : `${flags.length} possible ${flags.length === 1 ? "problem" : "problems"} found.`}
                {reminders.length > 0 && ` Plus ${reminders.length} ${reminders.length === 1 ? "reminder" : "reminders"}.`}
              </p>
            </div>

            {report.hits.length > 0 && (
              <div className="adc-preview">
                <p className="avc-host">Your ad, with flagged words highlighted</p>
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
            )}

            {report.flags.length > 0 && (
              <ol className="avc-list">
                {report.flags.map((f) => (
                  <FlagRow key={f.id} f={f} />
                ))}
              </ol>
            )}

            <p className="adc-disclaimer">{DISCLAIMER}</p>
          </div>
        )}
      </div>

      <LeadBox risk={hasText ? report.risk : ""} />
    </div>
  );
}

function FlagRow({ f }: { f: Flag }) {
  const tone = f.reminder ? "pass" : ROW_CLASS[f.severity];
  return (
    <li className={`avc-row avc-row--${tone}`}>
      <span className="avc-badge" aria-hidden="true">{f.reminder ? "i" : ROW_ICON[f.severity]}</span>
      <div className="avc-row-body">
        <div className="avc-row-head">
          <h3>{f.title}</h3>
          <span className="avc-status">{f.reminder ? "Reminder" : SEVERITY_LABEL[f.severity]}</span>
        </div>
        {f.matches.length > 0 && (
          <p className="avc-found">
            Found:{" "}
            {f.matches.map((m, i) => (
              <span key={i}>
                {i > 0 && ", "}
                <mark className={`adc-mark adc-mark--${f.severity}`}>{m.text}</mark>{" "}
                <span className="adc-where">({FIELD_LABEL[m.field].toLowerCase()})</span>
              </span>
            ))}
          </p>
        )}
        <p className="avc-why"><strong>Why:</strong> {f.reason}</p>
        <p className="avc-todo"><strong>Try this instead:</strong> {f.fix}</p>
        <p className="adc-source">
          Source:{" "}
          {f.sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && "; "}
              <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
            </span>
          ))}
        </p>
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
              <input id="adc-lead-name" name="name" required autoComplete="name" maxLength={100} style={field} />
            </div>
            <div>
              <label htmlFor="adc-lead-email" style={label}>Email</label>
              <input id="adc-lead-email" name="email" type="email" required autoComplete="email" maxLength={200} style={field} />
            </div>
            <div>
              <label htmlFor="adc-lead-practice" style={label}>Practice name</label>
              <input id="adc-lead-practice" name="practice" required autoComplete="organization" maxLength={150} style={field} />
            </div>
            <div>
              <label htmlFor="adc-lead-phone" style={label}>Phone <span className="avc-opt">(optional)</span></label>
              <input id="adc-lead-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} style={field} />
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
