/**
 * Reads the text in ad images, in the browser, with tesseract.js.
 *
 * tesseract.js is imported only when someone picks an image, so it costs
 * nothing on page load. The worker, OCR engine and English model are served
 * from our own domain (public/ocr/, copied from node_modules by
 * scripts/copy-ocr-assets.mjs), so no CDN is contacted and the image never
 * leaves the device.
 */

export const OCR_MAX_FILES = 3;
export const OCR_MAX_BYTES = 10 * 1024 * 1024;
export const OCR_TYPES = ["image/png", "image/jpeg", "image/webp"];

export type OcrProgress = { file: number; files: number; status: string; progress: number };

export async function readImages(files: File[], onProgress: (p: OcrProgress) => void): Promise<string[]> {
  const { createWorker, OEM } = await import("tesseract.js");
  const base = `${window.location.origin}/ocr`;
  let current = 0;
  const worker = await createWorker("eng", OEM.LSTM_ONLY, {
    workerPath: `${base}/worker.min.js`,
    corePath: `${base}/core`,
    langPath: `${base}/lang`,
    logger: (m: { status: string; progress: number }) =>
      onProgress({ file: current, files: files.length, status: m.status, progress: m.progress }),
  });
  try {
    const texts: string[] = [];
    for (let i = 0; i < files.length; i++) {
      current = i + 1;
      const { data } = await worker.recognize(files[i]);
      texts.push(tidy(data.text));
    }
    return texts;
  } finally {
    await worker.terminate();
  }
}

/** OCR output has ragged line breaks. Keep paragraphs, join wrapped lines. */
function tidy(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").replace(/[ \t]+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}
