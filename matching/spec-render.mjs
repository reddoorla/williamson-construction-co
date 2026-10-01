import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { DIR, MATRIX, PAGES } from "./harness.mjs";

const CSS_REL = "spec/files/cdn.prod.website-files.com/646d47bfeb53b0308e8d4379/css/williamson-construction.shared.3b91c7675.css";
const CSS = readFileSync(join(DIR, CSS_REL), "utf8").split("\n");

const rules = [];
{
  let media = null;
  let depth = 0;
  CSS.forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith("@media")) media = t.replace(/\s*\{$/, "").replace(/^@media\s+(screen and\s+)?/, "");
    if (t.endsWith("{") && !t.startsWith("@")) {
      const body = [];
      for (let j = i + 1; j < CSS.length && !CSS[j].includes("}"); j++) body.push(CSS[j].trim());
      rules.push({ line: i + 1, sel: t.slice(0, -1).trim(), media: depth > 0 ? media : null, body });
    }
    depth += (t.match(/\{/g) || []).length - (t.match(/\}/g) || []).length;
    if (depth === 0) media = null;
  });
}

const GENERIC = /^(w-|_w-full$|m-auto$|max-w-|p-|px-|py-|pt-|pb-|pl-|pr-|m-|mx-|my-|mt-|mb-|ml-|mr-|h-|display-|flex-|float-|position-|overflow-|opacity-|text-align|su-|spacer-)/;

function cite(tokens) {
  const set = new Set(tokens);
  return rules.filter((r) => {
    const sels = r.sel.split(",").map((s) => s.trim());
    return sels.some((s) => {
      const classes = (s.match(/\.[A-Za-z0-9_-]+/g) || []).map((c) => c.slice(1));
      return classes.length && classes.every((c) => set.has(c)) && classes.some((c) => !GENERIC.test(c));
    });
  });
}

const fmtRule = (r) => `\`${r.sel}\`${r.media ? ` @${r.media}` : ""} — ${CSS_REL.split("/").pop()}:${r.line} { ${r.body.join(" ").slice(0, 150)} }`;

const keys = process.argv.slice(2);
const pages = keys.length ? PAGES.filter((p) => keys.includes(p.key)) : PAGES;
for (const page of pages) {
  const x = JSON.parse(readFileSync(join(DIR, `extract-${page.key}.json`), "utf8"));
  const file = join(DIR, "spec-sections", `${page.key}.md`);
  const prior = existsSync(file) ? readFileSync(file, "utf8") : "";
  const notes = prior.match(/<!-- notes -->[\s\S]*?<!-- \/notes -->/)?.[0] ?? "<!-- notes -->\n<!-- /notes -->";
  const top = x.per[MATRIX[0]];
  const L = [];
  L.push(`## ${page.key}`, "");
  L.push(`Reference \`${x.ref}\` (captured \`matching/spec/${x.file}\`); candidate \`${page.cand}\`.`);
  L.push(`Root font-size ${MATRIX.map((v) => `${x.per[v].root} @${v}`).join(", ")}. Reference document height ${MATRIX.map((v) => `${x.per[v].docH} @${v}`).join(", ")}.`, "");
  L.push(notes, "");
  L.push(`### Section census — ${top.secs.length} sections (\`body > section\`, the fixed header excluded)`, "");
  L.push(`Gate anchors (harness.json): ${page.anchors.map((a) => `"${a}"`).join(", ")}. A section with no text of its own cannot carry an anchor and is scored inside the region above it.`, "");
  top.secs.forEach((s, i) => {
    const ys = MATRIX.map((v) => {
      const t = x.per[v].secs[i];
      return t ? `${t.y}+${t.h}` : "—";
    }).join(" / ");
    const anchor = s.firstText ? `"${s.firstText.slice(0, 60)}"` : "no text (scored in the region above)";
    L.push(`${i + 1}. \`${s.cls}\` — ${anchor} — y+h ${ys} (${MATRIX.join(" / ")})`);
  });
  L.push("");
  let interactions = 0;
  const inv = [];
  top.secs.forEach((s, i) => {
    L.push(`#### ${i + 1}. ${s.cls}`, "");
    L.push(`- Box @${MATRIX[0]}: ${s.box}.`);
    for (const v of MATRIX.slice(1)) {
      const t = x.per[v].secs[i];
      if (t && t.box !== s.box) L.push(`- Box @${v}: ${t.box}.`);
    }
    const cited = cite(s.tokens).filter((r) => !r.sel.includes(":hover"));
    if (cited.length) {
      L.push(`- Source rules (${cited.length}):`);
      for (const r of cited.slice(0, 18)) L.push(`  - ${fmtRule(r)}`);
      if (cited.length > 18) L.push(`  - …and ${cited.length - 18} more (grep the stylesheet for the classes above).`);
    }
    const hovers = cite(s.tokens).filter((r) => r.sel.includes(":hover"));
    const genericHover = s.interactive.some((l) => l.startsWith("a"));
    L.push(`- Hover rules: ${hovers.length ? hovers.map((r) => `\`${r.sel}\` (:${r.line})`).join(", ") : "none class-specific"}${genericHover ? "; plain links take the global `a:hover` (see shared chrome)" : ""}.`);
    for (const v of MATRIX) {
      const t = x.per[v].secs[i];
      if (!t || !t.type.length) continue;
      if (v !== MATRIX[0] && JSON.stringify(t.type.map((r) => r.key)) === JSON.stringify(s.type.map((r) => r.key))) {
        L.push(`- Typography @${v}: as @${MATRIX[0]}.`);
        continue;
      }
      L.push(`- Typography @${v}:`);
      for (const r of t.type) L.push(`  - ${r.key} — ${r.tag}${r.cls ? "." + r.cls : ""} "${r.text}"`);
    }
    if (s.assets.length) L.push(`- Assets: ${s.assets.map((a) => `\`${a}\``).join(", ")}.`);
    if (s.interactive.length) {
      L.push(`- Interactive (${s.interactive.length}): ${s.interactive.map((a) => `\`${a}\``).join("; ")}.`);
      interactions += s.interactive.length;
      inv.push(...s.interactive.map((l) => `${i + 1}. ${l}`));
    }
    L.push("");
  });
  L.push(`### Interaction inventory — ${interactions} entries on this page (shared header/footer counted in shared chrome)`, "");
  L.push("Every link, slider control, video and data-w-id target inside the census sections above. Phase 5 verifies exactly this many.", "");
  writeFileSync(file, L.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n");
  console.log(`${page.key}: ${top.secs.length} sections, ${interactions} interactive`);
}
