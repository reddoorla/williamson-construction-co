import { chromium } from "@playwright/test";
import { REF, CAND, MATRIX, PAGES } from "./harness.mjs";

const keys = process.argv.slice(2);
const pages = keys.length ? PAGES.filter((p) => keys.includes(p.key)) : PAGES.slice(0, 1);
const FACES = [
  "300 1em freight-sans-pro-lights",
  "400 1em freight-sans-pro",
  "500 1em freight-sans-pro",
  "600 1em freight-sans-pro",
  "700 1em freight-sans-pro",
  "italic 400 1em freight-sans-pro",
];

const b = await chromium.launch(
  process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
);
try {
  for (const page of pages) {
    for (const vw of MATRIX) {
      for (const [side, url] of [
        ["ref", REF + page.ref],
        ["cand", CAND + page.cand],
      ]) {
        const p = await b.newPage({ viewport: { width: vw, height: 900 } });
        await p.goto(url, { waitUntil: "networkidle", timeout: 90000 });
        await p.evaluate(() => document.fonts.ready);
        const r = await p.evaluate((faces) => {
          const loaded = [...document.fonts]
            .filter((f) => f.status === "loaded")
            .map((f) => `${f.family.replace(/"/g, "")} ${f.weight} ${f.style}`);
          return {
            root: getComputedStyle(document.documentElement).fontSize,
            bodyW: document.body.clientWidth,
            docH: document.documentElement.scrollHeight,
            checks: faces.map((f) => `${f}=${document.fonts.check(f)}`),
            loaded: [...new Set(loaded)].sort(),
          };
        }, FACES);
        console.log(
          `${page.key} vw${vw} ${side.padEnd(4)} root=${r.root} bodyW=${r.bodyW} docH=${r.docH}\n  loaded: ${r.loaded.join(" | ")}`,
        );
        await p.close();
      }
    }
  }
} finally {
  await b.close();
}
