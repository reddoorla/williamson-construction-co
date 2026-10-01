import { chromium } from "@playwright/test";
import { REF, CAND, PAGES } from "./harness.mjs";

const [mode, key, ...rest] = process.argv.slice(2);
const launch = process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {};
const page = PAGES.find((p) => p.key === key) ?? { key, ref: rest[0], cand: rest[1] };

async function open(b, url, vw) {
  const p = await b.newPage({ viewport: { width: vw, height: 900 }, reducedMotion: "reduce" });
  await p.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  for (let y = 0; y < (await p.evaluate(() => document.body.scrollHeight)); y += 250) {
    await p.evaluate((y) => scrollTo(0, y), y);
    await p.waitForTimeout(40);
  }
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(300);
  return p;
}

const blocks = () => {
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
  const vw = innerWidth;
  const out = [];
  const visit = (el, depth) => {
    const kids = [...el.children].flatMap((c) =>
      getComputedStyle(c).display === "contents" ? [...c.children] : [c],
    );
    const big = kids.filter((c) => {
      const r = c.getBoundingClientRect();
      return r.height > 40 && r.width >= vw * 0.9 && getComputedStyle(c).position !== "fixed";
    });
    if (big.length === 1 && depth < 6) return visit(big[0], depth + 1);
    for (const c of big) {
      const r = c.getBoundingClientRect();
      const cls = (c.className && typeof c.className === "string" ? c.className : "").trim().split(/\s+/).slice(0, 3).join(".");
      out.push(`y=${Math.round(r.top + scrollY)} h=${Math.round(r.height)} ${c.tagName.toLowerCase()}.${cls} — "${norm(c.textContent).slice(0, 70)}"`);
    }
  };
  visit(document.body, 0);
  return out;
};

const resolve = (anchors) => {
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
  const all = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,li,span,div,section,button")];
  return anchors.map((a) => {
    const hits = all.filter((e) => norm(e.textContent).startsWith(norm(a)));
    const roots = hits.filter((e) => !hits.some((o) => o !== e && o.contains(e)));
    const el = hits[0];
    if (!el) return { a, y: null, roots: 0, lead: null };
    const y = Math.round(el.getBoundingClientRect().top + scrollY);
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.nodeValue.trim() ? 1 : 3) });
    const t = tw.nextNode();
    const range = t && document.createRange();
    if (range) range.selectNodeContents(t);
    const ty = range ? Math.round(range.getBoundingClientRect().top + scrollY) : y;
    return { a, y, roots: roots.length, lead: ty - y, tag: el.tagName.toLowerCase() + "." + [...el.classList].slice(0, 2).join(".") };
  });
};

const b = await chromium.launch(launch);
try {
  if (mode === "blocks") {
    for (const [side, url] of [["ref", REF + page.ref], ["cand", CAND + page.cand]]) {
      const p = await open(b, url, Number(process.env.VW ?? 1440));
      console.log(`== ${side} ${url} docH=${await p.evaluate(() => document.body.scrollHeight)}`);
      for (const l of await p.evaluate(blocks)) console.log("  " + l);
      await p.close();
    }
  } else if (mode === "anchors") {
    const anchors = process.env.ANCHORS ? process.env.ANCHORS.split("|") : page.anchors;
    let bad = 0;
    for (const vw of [1440, 834, 390]) {
      const ys = {};
      for (const [side, url] of [["ref", REF + page.ref], ["cand", CAND + page.cand]]) {
        const p = await open(b, url, vw);
        ys[side] = await p.evaluate(resolve, anchors);
        await p.close();
      }
      for (const [side, rs] of Object.entries(ys)) {
        const order = rs.every((r, i) => i === 0 || (r.y ?? -1) > (rs[i - 1].y ?? -1));
        const flags = rs.filter((r) => r.y == null || r.roots > 1).map((r) => `${r.a}${r.y == null ? " UNRESOLVED" : ` roots=${r.roots}`}`);
        if (!order || flags.length) bad++;
        console.log(`vw${vw} ${side.padEnd(4)} ${order ? "in-order" : "OUT-OF-ORDER"} ${rs.map((r) => r.y).join(",")}${flags.length ? "  !! " + flags.join("; ") : ""}`);
        console.log(`        lead ${rs.map((r) => r.lead).join(",")}`);
      }
      for (let i = 0; i < anchors.length; i++) {
        const d = Math.abs((ys.ref[i].lead ?? 0) - (ys.cand[i].lead ?? 0));
        if (d > 120) {
          bad++;
          console.log(`        !! "${anchors[i]}" text sits ${ys.ref[i].lead}px below the cut on ref (${ys.ref[i].tag}) but ${ys.cand[i].lead}px on cand (${ys.cand[i].tag})`);
        }
      }
    }
    process.exitCode = bad ? 1 : 0;
  }
} finally {
  await b.close();
}
