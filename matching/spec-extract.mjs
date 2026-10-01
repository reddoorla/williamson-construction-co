import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { DIR, REF, CAND, MATRIX, PAGES } from "./harness.mjs";

const pageFile = (ref) => (ref === "/" ? "pages/index.html" : `pages${ref}/index.html`);

const extract = () => {
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
  const secs = [...document.querySelectorAll("body > section")].filter(
    (s) => !s.classList.contains("header"),
  );
  return secs.map((sec, idx) => {
    const r = sec.getBoundingClientRect();
    const tokens = new Set();
    for (const el of [sec, ...sec.querySelectorAll("*")]) for (const c of el.classList) tokens.add(c);
    const type = new Map();
    let firstText = null;
    for (const el of sec.querySelectorAll("*")) {
      const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.nodeValue.trim()).map((n) => n.nodeValue).join(" ");
      if (!own.trim()) continue;
      const er = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (er.width === 0 || cs.visibility === "hidden" || cs.display === "none") continue;
      if (el.closest("[aria-live], .w-slider-nav")) continue;
      if (!firstText) firstText = norm(own);
      const key = `${cs.fontFamily.split(",")[0].replace(/"/g, "")} ${cs.fontWeight} ${cs.fontStyle === "italic" ? "italic " : ""}${cs.fontSize}/${cs.lineHeight} ls=${cs.letterSpacing} ${cs.color}${cs.textTransform !== "none" ? " " + cs.textTransform : ""}${cs.textAlign !== "start" ? " " + cs.textAlign : ""}`;
      if (!type.has(key)) type.set(key, { key, tag: el.tagName.toLowerCase(), cls: [...el.classList].join("."), text: norm(own).slice(0, 44) });
    }
    const assets = [];
    for (const el of sec.querySelectorAll("img, video source, video")) {
      const src = el.currentSrc || el.getAttribute("src");
      if (src) assets.push(`${el.tagName.toLowerCase()} ${src.split("/").pop().split("?")[0]}`);
    }
    for (const el of [sec, ...sec.querySelectorAll("*")]) {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg.includes("url(")) assets.push(`bg ${bg.match(/url\("?([^")]+)/)[1].split("/").pop()}`);
    }
    const interactive = [];
    for (const el of sec.querySelectorAll("[data-w-id], .w-slider, .w-slider-arrow-left, .w-slider-arrow-right, .w-slider-dot, .w-background-video, video, iframe, form, a[href]")) {
      const tag = el.tagName.toLowerCase();
      const cls = [...el.classList].slice(0, 3).join(".");
      const label = tag === "a" ? `a${cls ? "." + cls : ""} → ${el.getAttribute("href")} "${norm(el.textContent).slice(0, 30)}"` : `${tag}${cls ? "." + cls : ""}${el.dataset.wId ? ` data-w-id=${el.dataset.wId.slice(0, 8)}…` : ""}`;
      interactive.push(label);
    }
    const cs = getComputedStyle(sec);
    return {
      idx,
      cls: [...sec.classList].join("."),
      y: Math.round(r.top + scrollY),
      h: Math.round(r.height),
      box: `margin ${cs.marginTop} / ${cs.marginBottom}, padding ${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}, bg ${cs.backgroundColor}`,
      firstText,
      tokens: [...tokens],
      type: [...type.values()],
      assets: [...new Set(assets)],
      interactive: [...new Set(interactive)],
    };
  });
};

async function open(b, url, vw) {
  const p = await b.newPage({ viewport: { width: vw, height: 900 }, reducedMotion: "reduce" });
  await p.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 250) {
    await p.evaluate((y) => scrollTo(0, y), y);
    await p.waitForTimeout(30);
  }
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(400);
  return p;
}

const keys = process.argv.slice(2);
const pages = keys.length ? PAGES.filter((p) => keys.includes(p.key)) : PAGES;
const launch = process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {};
const b = await chromium.launch(launch);
try {
  for (const page of pages) {
    const per = {};
    for (const vw of MATRIX) {
      const p = await open(b, REF + page.ref, vw);
      per[vw] = { secs: await p.evaluate(extract), root: await p.evaluate(() => getComputedStyle(document.documentElement).fontSize), docH: await p.evaluate(() => document.documentElement.scrollHeight) };
      await p.close();
    }
    const out = { key: page.key, ref: REF + page.ref, cand: CAND + page.cand, file: pageFile(page.ref), per };
    writeFileSync(join(DIR, `extract-${page.key}.json`), JSON.stringify(out, null, 1));
    console.log(`${page.key}: ${per[MATRIX[0]].secs.length} sections, docH ${MATRIX.map((v) => per[v].docH).join("/")}`);
  }
} finally {
  await b.close();
}

