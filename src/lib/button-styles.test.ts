import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { BUTTON_CLASS, BUTTON_GROUNDS, type Ground } from "./button-styles";

type Rgb = [number, number, number];

const css = readFileSync(resolve(process.cwd(), "src/app.css"), "utf8");
const theme = css.match(/@theme\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
const tokens: Record<string, string> = { white: "#ffffff", black: "#000000", transparent: "" };
for (const m of theme.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6});/gi)) tokens[m[1]] = m[2];

const hex = (h: string): Rgb => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb;
const blend = (fg: Rgb, alpha: number, bg: Rgb): Rgb =>
  fg.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha))) as Rgb;
const luminance = (rgb: Rgb) => {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const token = (name: string): Rgb => {
  const value = tokens[name];
  if (!value) throw new Error(`no --color-${name} in app.css`);
  return hex(value);
};

const grounds: Record<Ground, Rgb> = {
  white: token("white"),
  light: token("light"),
  "band-over-white": blend(token("primary"), 0.9, token("white")),
  "band-over-black": blend(token("primary"), 0.9, token("black")),
};

type Paint = { name: string; alpha: number } | null;

function paint(classes: string, prefix: "" | "hover:", kind: "bg" | "text"): Paint {
  const re = new RegExp(
    `(?:^|\\s)${prefix.replace(":", "\\:")}${kind}-([a-z]+)(?:/(\\d+))?(?=\\s|$)`,
  );
  const m = re.exec(classes);
  if (!m) return null;
  if (m[1] === "transparent") return { name: "transparent", alpha: 0 };
  return { name: m[1], alpha: m[2] ? Number(m[2]) / 100 : 1 };
}

function surface(fill: Paint, ground: Rgb): Rgb {
  if (!fill || fill.alpha === 0) return ground;
  return blend(token(fill.name), fill.alpha, ground);
}

const cases = Object.entries(BUTTON_CLASS).flatMap(([variant, classes]) =>
  BUTTON_GROUNDS[variant as keyof typeof BUTTON_GROUNDS].flatMap((ground) =>
    (["rest", "hover"] as const).map((state) => ({ variant, classes, ground, state })),
  ),
);

describe("button contrast, every state on every ground it is placed on", () => {
  it.each(cases)("$variant $state on $ground meets AA", ({ classes, ground, state }) => {
    const restFill = paint(classes, "", "bg");
    const hoverFill = paint(classes, "hover:", "bg");
    const text =
      paint(classes, state === "hover" ? "hover:" : "", "text") ?? paint(classes, "", "text");
    expect(text, `no text colour in "${classes}"`).not.toBeNull();
    const under = surface(restFill, grounds[ground]);
    const face = state === "hover" && hoverFill ? surface(hoverFill, grounds[ground]) : under;
    const ratio = contrast(token(text!.name), face);
    expect(ratio, `${ratio.toFixed(2)}:1 in "${classes}"`).toBeGreaterThanOrEqual(4.5);
  });

  it("reads the hover fill the way the class writes it", () => {
    expect(paint("hover:bg-secondary/10", "hover:", "bg")).toEqual({
      name: "secondary",
      alpha: 0.1,
    });
    expect(paint("bg-gold hover:bg-white", "", "bg")).toEqual({ name: "gold", alpha: 1 });
    expect(paint("bg-transparent", "", "bg")).toEqual({ name: "transparent", alpha: 0 });
  });

  it("fails the Homes defect: a gold hover at 55% under white text", () => {
    const face = surface({ name: "gold", alpha: 0.55 }, grounds.white);
    expect(contrast(token("white"), face)).toBeLessThan(4.5);
  });
});
