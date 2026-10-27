import { describe, expect, it, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import CtaBanner from "./index.svelte";

// Contrast computed from the colour tokens (Tailwind's default palette, with
// app.css's @theme on top), so the test names no colour: it asks whether the
// ground and the text an editor's choice resolves to can be read against each
// other. Any colour a designer can name (a token, an oklch token, an arbitrary
// `[#hex]`) is measured; one it cannot measure fails loudly, naming the class.
const tokens = (path: string) => {
  const css = readFileSync(resolve(path), "utf8");
  const out: Record<string, string> = {};
  for (const m of css.matchAll(/--color-([a-z0-9-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
};
const THEME: Record<string, string> = {
  ...tokens("node_modules/tailwindcss/theme.css"),
  ...tokens("src/app.css"),
};
const NAMED: Record<string, string> = { white: "#ffffff", black: "#000000" };
// sRGB 0-255 for a hex, a named white/black, or an oklch() (a `none` hue is 0).
const toRgb = (raw: string, name: string): number[] => {
  const v = NAMED[raw] ?? raw;
  if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(v)) {
    const h = v.length === 4 ? v.slice(1).replace(/./g, (c) => c + c) : v.slice(1);
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const m = /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+|none)(?:deg)?\s*\)$/i.exec(v);
  if (!m) throw new Error(`${name} is "${raw}", which this test cannot measure`);
  const L = Number(m[1]) / (m[2] ? 100 : 1);
  const C = Number(m[3]);
  const H = ((m[4] === "none" ? 0 : Number(m[4])) * Math.PI) / 180;
  const [a, b] = [C * Math.cos(H), C * Math.sin(H)];
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  ];
  return linear.map((c) => {
    const x = Math.min(1, Math.max(0, c));
    return Math.round((x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055) * 255);
  });
};
const lum = (c: number[]) => {
  const [r, g, b] = c.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: number[], b: number[]) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
type Colour = { name: string; rgb: number[] };
/** The `<prefix>-<colour>` class on el itself: a token or an arbitrary `[#hex]`. */
const ownColour = (el: Element, prefix: "text" | "bg" | "border"): Colour | undefined => {
  for (const c of el.classList) {
    const token = c.match(new RegExp(`^${prefix}-([a-z][a-z0-9-]*)$`))?.[1];
    if (token && token in THEME) return { name: c, rgb: toRgb(THEME[token], c) };
    const hex = c.match(new RegExp(`^${prefix}-\\[(#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)\\]$`))?.[1];
    if (hex) return { name: c, rgb: toRgb(hex, c) };
    // Any other arbitrary value that is not a length (`border-[2px]`,
    // `text-[1.2rem]`) or an image (`bg-[url(...)]`) is a colour this test
    // cannot measure: fail, by name, rather than pass on a fallback.
    const arb = c.match(new RegExp(`^${prefix}-\\[([^\\]]+)\\]$`))?.[1];
    if (arb && !/^(length:)?[\d.]+(px|rem|em|%)?$|^url\(/.test(arb))
      throw new Error(`${c} is a colour this test cannot measure`);
  }
  return undefined;
};
/** Text colour and ground are inherited/painted from ancestors, so climb. */
const nearestColour = (el: Element | null, prefix: "text" | "bg"): Colour | undefined => {
  for (let at = el; at; at = at.parentElement) {
    const found = ownColour(at, prefix);
    if (found) return found;
  }
  return undefined;
};
/** Border colour is not inherited: with no colour class of its own, or with
 *  `border-current`, Tailwind v4 draws it in currentColor, the text colour. */
const borderColour = (el: Element): Colour | undefined => {
  const isCurrent = [...el.classList].includes("border-current");
  return (isCurrent ? undefined : ownColour(el, "border")) ?? nearestColour(el, "text");
};

afterEach(() => cleanup());

const heading = [{ type: "heading2", text: "Ready to start your project?", spans: [] }];
const link = { link_type: "Web", url: "https://example.com" };

const makeSlice = (primary: Record<string, unknown> = {}) =>
  ({
    slice_type: "cta_banner",
    variation: "default",
    primary: {
      heading,
      buttonLabel: "Talk with us",
      buttonLink: link,
      background: "light",
      ...primary,
    },
    items: [],
  }) as never;

describe("CtaBanner slice", () => {
  it("renders the heading and the CTA as an anchor", () => {
    const { container, getByRole } = render(CtaBanner, {
      props: { slice: makeSlice() },
    });

    expect(getByRole("heading", { level: 2 }).textContent).toContain(
      "Ready to start your project?",
    );
    const cta = getByRole("link", { name: "Talk with us" });
    expect(cta.tagName).toBe("A");
    expect(cta.getAttribute("href")).toBe("https://example.com");
    // A navigating CTA is an <a>, never a <button> nested inside one.
    expect(cta.querySelector("button")).toBeNull();
    expect(container.querySelector("button")).toBeNull();
    expect(container.querySelector('[data-slice-type="cta_banner"]')).not.toBeNull();
  });

  it("keeps the headline readable on the dark ground", () => {
    // An editor who picks "dark" must get a headline a visitor can read: the
    // text token and the ground token it lands on clear AA (4.5:1).
    const { getByRole } = render(CtaBanner, {
      props: { slice: makeSlice({ background: "dark" }) },
    });
    const h = getByRole("heading", { level: 2 });
    const text = nearestColour(h, "text");
    const ground = nearestColour(h, "bg");
    expect(text, "a text-* colour over the headline").toBeDefined();
    expect(ground, "a bg-* colour under the headline").toBeDefined();
    expect(
      contrast(text!.rgb, ground!.rgb),
      `${text!.name} on ${ground!.name}`,
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps the CTA button readable on the dark ground", () => {
    // The button's own text clears AA (4.5:1) against the ground it sits on,
    // and its outline clears the 3:1 that WCAG 1.4.11 asks of a control's
    // boundary. Which tokens it wears is the design's choice.
    const { getByRole } = render(CtaBanner, {
      props: { slice: makeSlice({ background: "dark" }) },
    });
    const cta = getByRole("link", { name: "Talk with us" });
    const ground = nearestColour(cta, "bg");
    const text = nearestColour(cta, "text");
    const border = borderColour(cta);
    expect(ground, "a bg-* colour under the CTA").toBeDefined();
    expect(text, "a text-* colour on the CTA").toBeDefined();
    expect(border, "a border colour on the CTA").toBeDefined();
    expect(
      contrast(text!.rgb, ground!.rgb),
      `${text!.name} on ${ground!.name}`,
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast(border!.rgb, ground!.rgb),
      `${border!.name} (border) on ${ground!.name}`,
    ).toBeGreaterThanOrEqual(3);
  });

  it("omits the CTA when the link or the label is missing", () => {
    const { container: noLabel } = render(CtaBanner, {
      props: { slice: makeSlice({ buttonLabel: "" }) },
    });
    expect(noLabel.querySelector("a")).toBeNull();
    cleanup();

    const { container: noLink } = render(CtaBanner, {
      props: { slice: makeSlice({ buttonLink: null }) },
    });
    expect(noLink.querySelector("a")).toBeNull();
  });
});
