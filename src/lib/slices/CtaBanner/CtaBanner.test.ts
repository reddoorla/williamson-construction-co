import { describe, expect, it, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import CtaBanner from "./index.svelte";

// Contrast computed from the app.css @theme tokens, so the test names no
// colour: it asks whether the ground and the text an editor's choice resolves
// to can be read against each other.
const THEME: Record<string, string> = (() => {
  const css = readFileSync(resolve("src/app.css"), "utf8");
  const block = css.match(/@theme\s*\{([\s\S]*?)\n\}/);
  if (!block) throw new Error("app.css has no @theme block");
  const named: Record<string, string> = { white: "#ffffff", black: "#000000" };
  const out: Record<string, string> = {};
  for (const m of block[1].matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6}|white|black);/g))
    out[m[1]] = named[m[2]] ?? m[2];
  return out;
})();
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
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
/** The nearest `<prefix>-<theme token>` class on el or an ancestor. */
const nearestToken = (el: Element | null, prefix: "text" | "bg"): string | undefined => {
  for (let at = el; at; at = at.parentElement) {
    const token = [...at.classList]
      .map((c) => c.match(new RegExp(`^${prefix}-([a-z][a-z0-9-]*)$`))?.[1])
      .find((t) => t !== undefined && t in THEME);
    if (token) return token;
  }
  return undefined;
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
    const text = nearestToken(h, "text");
    const ground = nearestToken(h, "bg");
    expect(text, "a text-* theme token over the headline").toBeDefined();
    expect(ground, "a bg-* theme token under the headline").toBeDefined();
    expect(
      contrast(hex(THEME[text!]), hex(THEME[ground!])),
      `text-${text} on bg-${ground}`,
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("does not draw a dark-bordered button on the dark ground", () => {
    const { container } = render(CtaBanner, {
      props: { slice: makeSlice({ background: "dark" }) },
    });
    const cta = container.querySelector("a");
    expect(cta?.className).not.toContain("border-dark");
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
