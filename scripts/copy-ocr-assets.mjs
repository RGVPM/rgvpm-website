// Copies the Tesseract OCR files the Med Spa Ad Checker needs into
// public/ocr/ so the browser loads them from our own domain, not a CDN.
// Runs before `next build` and `next dev` (see package.json). The output is
// gitignored: the files come from node_modules at the pinned versions.
//
//   worker.min.js                       tesseract.js web worker
//   core/tesseract-core-*-lstm.wasm.js  OCR engine; the browser picks ONE
//                                       (relaxed SIMD, SIMD or plain)
//   lang/eng.traineddata.gz             English model (best_int, LSTM)
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkgDir = (name) => dirname(require.resolve(`${name}/package.json`));
const out = join(process.cwd(), "public", "ocr");

const files = [
  [join(pkgDir("tesseract.js"), "dist", "worker.min.js"), "worker.min.js"],
  ...["relaxedsimd-lstm", "simd-lstm", "lstm"].map((v) => [
    join(pkgDir("tesseract.js-core"), `tesseract-core-${v}.wasm.js`),
    join("core", `tesseract-core-${v}.wasm.js`),
  ]),
  [join(pkgDir("@tesseract.js-data/eng"), "4.0.0_best_int", "eng.traineddata.gz"), join("lang", "eng.traineddata.gz")],
];

for (const [from, to] of files) {
  const dest = join(out, to);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(from, dest);
}
console.log(`Copied ${files.length} OCR files to public/ocr/`);
