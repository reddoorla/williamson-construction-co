// One resolver from a rendered element's Tailwind classes to the colours a
// visitor sees, shared by every contrast test that reads the class list (jsdom
// has no stylesheet, so the classes are the only record of the colour).
//
// The rule it holds to: every class that sets the property being measured is
// either measured or refused by name. Nothing is skipped in favour of another
// colour, because a skipped `border-white/20` used to fall through to the text
// colour and pass at 17:1 an outline a visitor sees at 1.9:1.
//
// Modelled:
// - tokens from Tailwind's default palette with app.css's @theme on top, as
//   hex (3, 4, 6, 8 digits), white/black/transparent, oklch() with an optional
//   `/ alpha`, rgb()/rgba(), and `var(--color-*)` aliases between tokens;
// - arbitrary values, `[#hex]`, `[oklch(...)]`, `[color:...]`, `(--color-*)`;
//   an arbitrary value that is a size, a position or an image is not a colour;
// - the `/N` and `/[0.N]` alpha modifiers, composited over the ground beneath;
// - `!` important (`border-dark!`, `!border-dark`): the same colour;
// - `transparent` and translucent grounds, which composite over the ancestor's;
// - `current` / `inherit` text colour (climb), and a border with no colour
//   class of its own or `border-current`, which Tailwind v4 draws in the text
//   colour;
// - interaction-state variants (`hover:`, `focus:`, `aria-invalid:`, ...) and
//   pseudo-elements: they are not the resting colour, so they are not it.
// Everything else that sets the colour throws, naming the class: a `dark:`
// colour (see VARIANTS), a breakpoint colour (jsdom has no viewport), a
// per-side border colour, an hsl() or a `var()` that is not a colour token.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export type Rgba = [number, number, number, number];
export type Colour = { name: string; rgba: Rgba };

const tokens = (path: string) => {
  const css = readFileSync(resolve(path), "utf8");
  const out: Record<string, string> = {};
  for (const m of css.matchAll(/--color-([a-z0-9-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
};
/** Every colour a utility can name: Tailwind's palette, app.css's @theme on top. */
export const THEME: Record<string, string> = {
  ...tokens("node_modules/tailwindcss/theme.css"),
  ...tokens("src/app.css"),
};

const CURRENT = "currentcolor";
const INHERIT = "inherit";

const oklchToRgb = (L: number, C: number, Hdeg: number): number[] => {
  const H = (Hdeg * Math.PI) / 180;
  const [a, b] = [C * Math.cos(H), C * Math.sin(H)];
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return linear.map((c) => {
    const x = Math.min(1, Math.max(0, c));
    return Math.round((x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055) * 255);
  });
};
const alphaOf = (raw: string | undefined) =>
  raw === undefined ? 1 : raw.endsWith("%") ? Number(raw.slice(0, -1)) / 100 : Number(raw);

/**
 * A CSS colour value as sRGB 0-255 plus alpha, or the `currentcolor` /
 * `inherit` keywords. Throws, naming `name`, on anything it cannot measure.
 */
export const parseColour = (raw: string, name: string, seen: string[] = []): Rgba | string => {
  const v = raw.trim();
  const lower = v.toLowerCase();
  if (lower === "white") return [255, 255, 255, 1];
  if (lower === "black") return [0, 0, 0, 1];
  if (lower === "transparent") return [0, 0, 0, 0];
  if (lower === CURRENT) return CURRENT;
  if (lower === INHERIT) return INHERIT;
  if (/^#[0-9a-f]+$/i.test(v) && [4, 5, 7, 9].includes(v.length)) {
    const short = v.length <= 5;
    const h = short ? v.slice(1).replace(/./g, (c) => c + c) : v.slice(1);
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
    return [r, g, b, h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
  }
  const ok =
    /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+|none)(?:deg)?\s*(?:\/\s*([\d.]+%?)\s*)?\)$/i.exec(
      v,
    );
  if (ok) {
    const L = Number(ok[1]) / (ok[2] ? 100 : 1);
    const [r, g, b] = oklchToRgb(L, Number(ok[3]), ok[4] === "none" ? 0 : Number(ok[4]));
    return [r, g, b, alphaOf(ok[5])];
  }
  const rgb =
    /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i.exec(v);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3]), alphaOf(rgb[4])];
  const alias = /^var\(\s*--color-([a-z0-9-]+)\s*\)$/i.exec(v);
  if (alias && alias[1] in THEME && !seen.includes(alias[1]))
    return parseColour(THEME[alias[1]], name, [...seen, alias[1]]);
  throw new Error(`${name} is "${raw}", a colour this test cannot measure`);
};

/** `top` composited over an opaque `under`. */
export const over = (top: Rgba, under: Rgba): Rgba => {
  const a = top[3];
  return [0, 1, 2].map((i) => Math.round(top[i] * a + under[i] * (1 - a))).concat(1) as Rgba;
};
const lum = ([r, g, b]: Rgba) => {
  const [R, G, B] = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
/** WCAG contrast of two opaque colours. */
export const contrast = (a: Rgba, b: Rgba) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Variants. An interaction state or a pseudo-element is not the resting
// colour, so a class behind one is not measured here (`hover:border-dark` is
// the hover sweep's business, `aria-invalid:border-red-600` the invalid
// state's). `dark:` throws rather than being ignored: this site ships no dark
// scheme (no `dark:` class, no `color-scheme` and no custom dark variant
// anywhere in src at 2026-10-27), so dark-mode visitors get the light colours
// this test measures. Tailwind v4's default `dark:` is
// `prefers-color-scheme: dark`, so the first `dark:` colour class would start
// shipping one, and this helper must learn to measure that scheme then.
// Breakpoints throw too: jsdom has no viewport to pick a breakpoint's colour.
const STATE =
  /^(hover|focus|focus-visible|focus-within|active|visited|disabled|enabled|checked|invalid|required|optional|placeholder-shown|read-only|open|target|first|last|only|odd|even|empty|selection|placeholder|marker|file|backdrop|before|after|first-letter|first-line|print|motion-safe|(group|peer)(-[a-z-]+)?(\/[a-z0-9-]+)?|(group|peer)-\[[^\]]+\]|aria-[a-z-]+|aria-\[[^\]]+\]|data-[a-z-]+|data-\[[^\]]+\]|not-[a-z-]+)$/;

/** Split a class into its variants and utility, at colons outside brackets. */
const splitClass = (cls: string) => {
  const parts: string[] = [];
  let depth = 0;
  let at = 0;
  for (let i = 0; i < cls.length; i++) {
    const c = cls[i];
    if (c === "[" || c === "(") depth++;
    else if (c === "]" || c === ")") depth--;
    else if (c === ":" && depth === 0) {
      parts.push(cls.slice(at, i));
      at = i + 1;
    }
  }
  let util = cls.slice(at);
  if (util.startsWith("!")) util = util.slice(1);
  if (util.endsWith("!")) util = util.slice(0, -1);
  return { variants: parts, util };
};

const COLOUR_LOOKING =
  /^(#|rgba?\(|hsla?\(|hwb\(|oklch\(|oklab\(|lab\(|lch\(|color\(|color-mix\(|var\(--color-|transparent$|currentcolor$|inherit$)/i;
const NON_COLOUR_TYPE =
  /^(length|size|percentage|number|position|image|url|line-width|absolute-size|relative-size|family-name|bg-size|vector|integer|angle):/;
// A value that is plainly a size, a position or an image: a number with a unit,
// a maths function, a keyword list joined by `_`, or url()/gradient().
const NON_COLOUR_VALUE =
  /^(-?[\d.]+[a-z%]*|(clamp|calc|min|max|minmax|url|image-set|(repeating-)?(linear|radial|conic)-gradient)\(.*\)|[a-z-]+(_[a-z0-9.%-]+)+)$/i;

/** One utility's value as a colour, or "skip" when it does not set a colour. */
const valueColour = (value: string, name: string): Rgba | string | "skip" => {
  let alpha: string | undefined;
  let base = value;
  // The alpha modifier sits after the last `/` outside brackets.
  const slash = /^(.*[^/])\/(\d+(?:\.\d+)?|\[[^\]]+\]|\([^)]+\))$/.exec(value);
  if (slash && !/^\[[^\]]*$/.test(slash[1])) [base, alpha] = [slash[1], slash[2]];

  let colour: Rgba | string | "skip";
  const arb = /^\[(.*)\]$/.exec(base);
  const paren = /^\((.*)\)$/.exec(base);
  if (arb || paren) {
    const inner = (arb ?? paren)![1].replace(/_/g, " ");
    const raw = paren ? `var(${inner})` : inner;
    if (NON_COLOUR_TYPE.test(inner)) return "skip";
    const typed = /^color:(.*)$/.exec(inner);
    if (typed) colour = parseColour(paren ? `var(${typed[1]})` : typed[1], name);
    else if (COLOUR_LOOKING.test(raw)) colour = parseColour(raw, name);
    else if (NON_COLOUR_VALUE.test((arb ?? paren)![1])) return "skip";
    else throw new Error(`${name}: cannot tell whether "${inner}" is a colour`);
  } else if (base in THEME) {
    colour = parseColour(THEME[base], name);
  } else return "skip"; // `text-xl`, `border-2`, `bg-cover`: Tailwind makes no colour of it

  if (alpha === undefined) return colour;
  if (typeof colour === "string")
    throw new Error(`${name}: an alpha modifier on ${colour} is not modelled`);
  const a = /^\[(.*)\]$/.exec(alpha)?.[1] ?? alpha;
  if (!/^[\d.]+%?$/.test(a)) throw new Error(`${name}: cannot read the alpha "${alpha}"`);
  const n = a.endsWith("%") ? Number(a.slice(0, -1)) / 100 : Number(a) / (alpha === a ? 100 : 1);
  return [colour[0], colour[1], colour[2], colour[3] * n];
};

type Prop = "text" | "bg" | "border";
type Found = { name: string; colour: Rgba | string };

/** Every resting `prop` colour class on `el` itself. */
const own = (el: Element, prop: Prop): Found[] => {
  const out: Found[] = [];
  for (const cls of el.classList) {
    const { variants, util } = splitClass(cls);
    const side = prop === "border" && /^border-[trblxyse]-(.+)$/.exec(util);
    const m = side ? null : util.match(new RegExp(`^${prop}-(.+)$`));
    const value = side ? side[1] : m?.[1];
    if (value === undefined) continue;
    if (variants.length && variants.every((v) => STATE.test(v))) continue;
    const colour = valueColour(value, cls);
    if (colour === "skip") continue;
    if (side) throw new Error(`${cls}: a per-side border colour is not modelled`);
    if (variants.length)
      throw new Error(`${cls}: a colour behind "${variants.join(":")}:" is not modelled`);
    out.push({ name: cls, colour });
  }
  return out;
};

/** The opaque ground `el` paints on: its own background over its ancestors'. */
export const groundOf = (el: Element | null): Colour => {
  for (let at = el; at; at = at.parentElement) {
    const found = own(at, "bg");
    if (found.length > 1)
      throw new Error(`competing backgrounds on one element: ${found.map((f) => f.name)}`);
    if (!found.length) continue;
    const [{ name, colour }] = found;
    if (typeof colour === "string") throw new Error(`${name}: a ${colour} ground is not modelled`);
    if (colour[3] >= 1) return { name, rgba: colour };
    const under = groundOf(at.parentElement);
    if (colour[3] <= 0) return under; // bg-transparent: the ancestor's ground shows through
    return { name: `${name} over ${under.name}`, rgba: over(colour, under.rgba) };
  }
  // app.css paints `body` with --color-background.
  const page = parseColour(THEME.background ?? "white", "--color-background");
  if (typeof page === "string" || page[3] < 1)
    throw new Error(`--color-background is "${THEME.background}", which is not an opaque ground`);
  return { name: "the page (--color-background)", rgba: page };
};

/** Every text colour `el` can render in, composited over its ground. */
export const textColours = (el: Element | null): Colour[] => {
  for (let at = el; at; at = at.parentElement) {
    const found = own(at, "text").filter(
      (f) => f.colour !== CURRENT && f.colour !== INHERIT, // the parent's colour: climb
    );
    if (!found.length) continue;
    const ground = groundOf(el);
    return found.map(({ name, colour }) => ({
      name,
      rgba: over(colour as Rgba, ground.rgba),
    }));
  }
  // app.css sets no body colour, so text with no colour class anywhere above
  // it is the browser's default, black.
  return [{ name: "the default text colour (black)", rgba: [0, 0, 0, 1] }];
};

/**
 * Every colour `el`'s border can be drawn in, composited over its ground.
 * Border colour is not inherited: with no colour class of its own, or with
 * `border-current`, Tailwind v4 draws it in currentColor, the text colour.
 */
export const borderColours = (el: Element): Colour[] => {
  const found = own(el, "border");
  const ground = groundOf(el);
  const out: Colour[] = [];
  for (const { name, colour } of found) {
    if (colour === INHERIT) throw new Error(`${name}: an inherited border colour is not modelled`);
    if (colour === CURRENT) out.push(...textColours(el));
    else out.push({ name, rgba: over(colour as Rgba, ground.rgba) });
  }
  return found.length ? out : textColours(el);
};
