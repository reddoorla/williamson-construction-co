import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Focus styling in this template is opt-in per component: the buttons on the
// fixtures page carry their own rings and everything else falls back to the
// UA's 1px hairline, which is invisible on a dark nav or over a photo hero
// (WCAG 2.4.7). There was no floor at all — `grep -a "focus-visible" src/app.css`
// returned nothing. This asserts the floor exists, since a CSS cascade rule is
// not reachable from jsdom, which resolves no stylesheets.
// Resolved from the project root, not `import.meta.url`: under the jsdom
// environment vite serves this module over http, so `new URL(..., import.meta.url)`
// is not a file: URL and readFileSync rejects it.
const css = readFileSync(resolve(process.cwd(), "src/app.css"), "utf-8");

const FLOOR_SELECTOR = ':where(a, button, summary, [tabindex]:not([tabindex="-1"])):focus-visible';

describe("the keyboard-focus floor", () => {
  it("gives every interactive element a visible outline on :focus-visible", () => {
    // Located by string, then sliced to the closing brace. A regex for the
    // selector is a trap here: `[^)]*` stops at the nested `)` inside
    // `:not([tabindex="-1"])`, so it matches nothing however good the CSS is —
    // which is exactly how a check that can only ever fail gets written.
    const at = css.indexOf(FLOOR_SELECTOR);
    expect(at, "no :focus-visible floor rule in app.css").toBeGreaterThan(-1);
    const rule = css.slice(at, css.indexOf("}", at) + 1);
    expect(rule).toMatch(/outline:\s*2px solid/);
  });

  // `:where()` contributes ZERO specificity, so the floor weighs one
  // pseudo-class and every authored `focus-visible:ring-*` still wins twice
  // over — higher specificity AND a later cascade layer. Written as a bare
  // selector it would outrank the utilities it is meant to sit under.
  it("is written with :where() so authored rings still win", () => {
    expect(css).toContain(
      ':where(a, button, summary, [tabindex]:not([tabindex="-1"])):focus-visible',
    );
  });
});

function channel(v: number): number {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => channel(parseInt(h.slice(i, i + 2), 16)));
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

describe("the focus floor on this site's navy bands", () => {
  const at = css.indexOf(FLOOR_SELECTOR);
  const rule = css.slice(at, css.indexOf("}", at) + 1);
  const primary = css.match(/--color-primary:\s*(#[0-9a-f]{6})/i)![1]!;

  it("uses a navy that the white halo clears at 3:1 (WCAG 1.4.11)", () => {
    expect(contrast(primary, "#ffffff")).toBeGreaterThanOrEqual(3);
  });

  it("pairs the navy outline with a white halo that fills the offset gap", () => {
    expect(rule).toMatch(/outline:\s*2px solid var\(--color-primary\)/);
    const offset = Number(rule.match(/outline-offset:\s*(\d+)px/)![1]);
    const halo = rule.match(/box-shadow:\s*0 0 0 (\d+)px var\(--color-white\)/);
    expect(halo, "no white halo: the ring is navy on navy on every bg-primary band").not.toBeNull();
    expect(Number(halo![1])).toBeGreaterThanOrEqual(offset);
  });
});
