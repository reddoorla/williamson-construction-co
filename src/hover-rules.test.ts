import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SPEC = join(ROOT, "matching/spec");
const MANIFEST = JSON.parse(readFileSync(join(SPEC, "manifest.json"), "utf8")) as {
  files: { file: string }[];
};
const captured = (name: string) => {
  const hit = MANIFEST.files.find((f) => f.file.endsWith(`/${name}`));
  if (!hit) throw new Error(`${name} is not in the capture`);
  return join(SPEC, hit.file);
};
const CSS = captured("williamson-construction.shared.3b91c7675.css");

const pages = (function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith(".html") ? [join(dir, d.name)] : [],
  );
})(join(SPEC, "pages")).map((p) => readFileSync(p, "utf8"));

function hoverSelectors(css: string): string[] {
  const out: string[] = [];
  const text = css.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const m of text.matchAll(/([^{}]+)\{[^{}]*\}/g)) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    if (/:hover\b/.test(selector) && !selector.startsWith("@")) out.push(selector);
  }
  return out;
}

const sheet = hoverSelectors(readFileSync(CSS, "utf8"));
const inline = [
  ...new Set(
    pages.flatMap((html) =>
      [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].flatMap((m) => hoverSelectors(m[1])),
    ),
  ),
];

const classSets = pages.flatMap((html) =>
  [...html.matchAll(/\bclass="([^"]*)"/g)].map((m) => new Set(m[1].split(/\s+/))),
);
const onAnyPage = (compound: string) => {
  const classes = [...compound.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
  return classSets.some((set) => classes.every((c) => set.has(c)));
};

const HOVERS = readFileSync(join(ROOT, "tests/interaction/hovers.spec.ts"), "utf8");
const NAV = readFileSync(join(ROOT, "tests/interaction/mobile-nav.spec.ts"), "utf8");

type Disposition =
  | { measured: string; in: "hovers" | "nav" }
  | { absent: string[] }
  | { shadowedBy: string }
  | { reset: string };

const RULES: Record<string, Disposition> = {
  "a:active, a:hover": { reset: "normalize.css outline: 0; no link here draws a hover outline" },
  ".w-lightbox-control:hover": { absent: [".w-lightbox-control"] },
  ".w-lightbox-inactive, .w-lightbox-inactive:hover": { absent: [".w-lightbox-inactive"] },
  "a:hover": { measured: "every plain link fades as the reference's a:hover does", in: "hovers" },
  ".button-default:hover": { measured: '".button-default:hover"', in: "hovers" },
  ".button-default.mx-6:hover": { absent: [".button-default.mx-6"] },
  ".button-default.white-outline:hover": {
    shadowedBy: ".button-default.white-outline.ml-8:hover",
  },
  ".button-default.white-outline.ml-8:hover": {
    measured: '".button-default.white-outline.ml-8:hover"',
    in: "hovers",
  },
  ".button-default.bg-color-primary.mr-8:hover": {
    measured: '".button-default.bg-color-primary.mr-8:hover"',
    in: "hovers",
  },
  ".button-default.bg-color-white.ml-8:hover": {
    measured: '".button-default.bg-color-white.ml-8:hover"',
    in: "hovers",
  },
  ".button-default.bg-color-transparent.ml-8:hover": {
    measured: '".button-default.bg-color-transparent.ml-8:hover"',
    in: "hovers",
  },
  ".button-default.bg-color-transparent.text-color-primary:hover": {
    measured: '".button-default.bg-color-transparent.text-color-primary:hover"',
    in: "hovers",
  },
  ".content-block.home-project-item-image, .content-block.home-project-item-image:hover": {
    absent: [".content-block.home-project-item-image"],
  },
  ".filled-circle.mx-auto:hover": { absent: [".filled-circle.mx-auto"] },
  ".icon-2:hover": { measured: "(.icon-2:hover)", in: "hovers" },
  ".number-bubble:hover": { measured: "(.number-bubble:hover opacity 1)", in: "hovers" },
  ".open-nav:hover": { measured: "(.open-nav:hover, .close-nav:hover)", in: "nav" },
  ".close-nav:hover": { measured: "(.open-nav:hover, .close-nav:hover)", in: "nav" },
};

const INLINE: Record<string, Disposition> = {
  "polygon:hover, circle:hover, rect:hover": {
    measured: "(inline polygon, circle, rect:hover)",
    in: "hovers",
  },
};

describe("every :hover rule in the reference has a disposition", () => {
  it("counts no skipped or fixme test as a measurement", () => {
    for (const spec of [HOVERS, NAV])
      expect(spec).not.toMatch(/test\.(skip|fixme|only)\b|\.skip\(/);
  });

  it("finds the 18 rules of the shared stylesheet and no others", () => {
    expect(sheet).toHaveLength(18);
    expect([...sheet].sort()).toEqual(Object.keys(RULES).sort());
  });

  it("finds the pages' one inline hover rule", () => {
    expect(inline.sort()).toEqual(Object.keys(INLINE).sort());
  });

  it.each(Object.entries({ ...RULES, ...INLINE }))("%s", (selector, d) => {
    if ("measured" in d) {
      const spec = d.in === "hovers" ? HOVERS : NAV;
      expect(spec, `no test titled "…${d.measured}…"`).toContain(d.measured);
    } else if ("absent" in d) {
      for (const compound of d.absent) {
        expect(onAnyPage(compound), `${compound} is on a captured page`).toBe(false);
      }
    } else if ("shadowedBy" in d) {
      const base = selector.replace(/:hover$/, "");
      const wider = d.shadowedBy.replace(/:hover$/, "");
      const hits = classSets.filter((set) =>
        [...base.matchAll(/\.([\w-]+)/g)].every((m) => set.has(m[1])),
      );
      expect(hits.length).toBeGreaterThan(0);
      for (const set of hits) {
        expect([...wider.matchAll(/\.([\w-]+)/g)].every((m) => set.has(m[1]))).toBe(true);
      }
      expect(RULES[d.shadowedBy]).toHaveProperty("measured");
    } else {
      expect(d.reset.length).toBeGreaterThan(0);
    }
  });

  it("would notice a rule whose element does appear on a page", () => {
    expect(onAnyPage(".button-default.bg-color-primary.mr-8")).toBe(true);
    expect(onAnyPage(".number-bubble")).toBe(true);
  });
});

describe("every IX2 click interaction in the reference has a disposition", () => {
  const JS = dirname(captured("williamson-construction.schunk.c2d6e1a16b4abded.js"));
  const source = readdirSync(JS)
    .map((f) => readFileSync(join(JS, f), "utf8"))
    .join("\n");
  const events = [
    ...source.matchAll(
      /eventTypeId:"(MOUSE_[A-Z_]+)"[\s\S]*?actionListId:"([\w-]+)"[\s\S]*?target:\{id:"([^"]+)"/g,
    ),
  ].map((m) => ({ type: m[1], list: m[2], wid: m[3].split("|").pop()! }));
  const onPage = (wid: string) => pages.some((html) => html.includes(`data-w-id="${wid}"`));

  const CLICKS: Record<string, { measured: string } | { absent: true }> = {
    "18870274-2ae1-f042-1f01-c9df6ec97daa": { measured: "the icons cross-fade" },
    "88b40549-d323-22e0-e020-6be108f76823": { measured: "the panel slides for 500ms" },
    "3470f1d8-a34d-8ab9-44a3-af0ff660fa87": { absent: true },
  };

  it("finds no IX2 event of any other type", () => {
    const types = [...source.matchAll(/eventTypeId:"([A-Z_]+)"/g)].map((m) => m[1]);
    expect([...new Set(types)].sort()).toEqual(["MOUSE_CLICK", "MOUSE_SECOND_CLICK"]);
  });

  it("finds 4 MOUSE_CLICK and 1 MOUSE_SECOND_CLICK and nothing scroll-driven", () => {
    expect(events.map((e) => e.type).sort()).toEqual([
      "MOUSE_CLICK",
      "MOUSE_CLICK",
      "MOUSE_CLICK",
      "MOUSE_CLICK",
      "MOUSE_SECOND_CLICK",
    ]);
    expect(source).not.toMatch(/eventTypeId:"(SCROLL|PAGE_SCROLL|SCROLL_INTO_VIEW)/);
  });

  it.each(Object.entries(CLICKS))("target %s", (wid, d) => {
    expect(events.some((e) => e.wid === wid)).toBe(true);
    if ("absent" in d) expect(onPage(wid), `${wid} is on a captured page`).toBe(false);
    else {
      expect(onPage(wid)).toBe(true);
      expect(NAV).toContain(d.measured);
    }
  });

  it("covers every target", () => {
    expect([...new Set(events.map((e) => e.wid))].sort()).toEqual(Object.keys(CLICKS).sort());
  });
});
