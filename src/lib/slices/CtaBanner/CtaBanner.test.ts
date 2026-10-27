import { describe, expect, it, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/svelte";
import CtaBanner from "./index.svelte";
import { borderColours, contrast, groundOf, textColours } from "../../../test-utils/colour";

// Contrast computed from the colour tokens through the shared resolver, so the
// test names no colour: it asks whether the ground and the text an editor's
// choice resolves to can be read against each other. Any colour a designer can
// name is measured, and one the resolver cannot measure fails by name.

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
    const ground = groundOf(h);
    const texts = textColours(h);
    expect(texts.length, "a text colour over the headline").toBeGreaterThan(0);
    for (const text of texts)
      expect(
        contrast(text.rgba, ground.rgba),
        `${text.name} on ${ground.name}`,
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
    const ground = groundOf(cta);
    const texts = textColours(cta);
    const borders = borderColours(cta);
    expect(texts.length, "a text colour on the CTA").toBeGreaterThan(0);
    for (const text of texts)
      expect(
        contrast(text.rgba, ground.rgba),
        `${text.name} on ${ground.name}`,
      ).toBeGreaterThanOrEqual(4.5);
    for (const border of borders)
      expect(
        contrast(border.rgba, ground.rgba),
        `${border.name} (border) on ${ground.name}`,
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
