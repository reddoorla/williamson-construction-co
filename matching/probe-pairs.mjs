import { chromium } from "@playwright/test";
import { REF, CAND, MATRIX, byKey } from "./harness.mjs";

const [key, origin, list, vws] = process.argv.slice(2);
const page = byKey[key];
const snippets = list.split("|");
const viewports = vws ? vws.split(",").map(Number) : MATRIX;
const launch = process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {};

const measure = ([origin, snippets]) => {
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
  const own = (e) => norm([...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join(" "));
  const find = (s) => {
    if (s.startsWith("img:")) return [...document.querySelectorAll("img")].find((i) => (i.currentSrc || i.src).includes(s.slice(4)));
    if (s.startsWith("css:")) return document.querySelector(s.slice(4));
    return [...document.querySelectorAll("body *")].find((e) => own(e).startsWith(norm(s)) && e.getBoundingClientRect().width > 0);
  };
  const o = find(origin);
  const oy = o ? o.getBoundingClientRect().top + scrollY : 0;
  return snippets.map((s) => {
    const e = find(s);
    if (!e) return { s, miss: true };
    const r = e.getBoundingClientRect();
    const cs = getComputedStyle(e);
    return { s, x: Math.round(r.left), y: Math.round(r.top + scrollY - oy), w: Math.round(r.width), h: Math.round(r.height), t: `${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ${cs.color}` };
  });
};

const b = await chromium.launch(launch);
try {
  for (const vw of viewports) {
    const res = {};
    for (const [side, url] of [["ref", REF + page.ref], ["cand", CAND + page.cand]]) {
      const p = await b.newPage({ viewport: { width: vw, height: 900 }, reducedMotion: "reduce" });
      await p.goto(url, { waitUntil: "networkidle", timeout: 90000 });
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < H; y += 250) {
        await p.evaluate((y) => scrollTo(0, y), y);
        await p.waitForTimeout(25);
      }
      await p.waitForTimeout(300);
      res[side] = await p.evaluate(measure, [origin, snippets]);
      await p.close();
    }
    console.log(`vw${vw} (y relative to "${origin}")`);
    res.ref.forEach((r, i) => {
      const c = res.cand[i];
      if (r.miss || c.miss) return console.log(`  ${r.s.slice(0, 28).padEnd(28)} ${r.miss ? "REF MISSING" : ""} ${c.miss ? "CAND MISSING" : ""}`);
      const d = ["x", "y", "w", "h"].map((k) => c[k] - r[k]);
      const flag = d.some((v) => Math.abs(v) > 2) || r.t !== c.t ? "  !!" : "";
      console.log(`  ${r.s.slice(0, 28).padEnd(28)} ref ${r.x},${r.y} ${r.w}x${r.h}  cand ${c.x},${c.y} ${c.w}x${c.h}  Δ ${d.join(",")}${flag}`);
      if (r.t !== c.t) console.log(`  ${"".padEnd(28)} type ref ${r.t} | cand ${c.t}`);
    });
  }
} finally {
  await b.close();
}
