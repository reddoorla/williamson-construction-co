import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Field from "./Field.svelte";

const THEME: Record<string, string> = (() => {
  const css = readFileSync(resolve("src/app.css"), "utf8");
  const block = css.match(/@theme\s*\{([\s\S]*?)\n\}/);
  if (!block) throw new Error("app.css has no @theme block");
  const out: Record<string, string> = {};
  for (const m of block[1].matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6});/g))
    out[m[1]] = m[2];
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

afterEach(() => cleanup());

describe("Field", () => {
  it("renders a label associated with the input", () => {
    const { getByLabelText } = render(Field, { name: "email", label: "Email" });
    const input = getByLabelText("Email") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
    expect(input.name).toBe("email");
  });

  it("marks required fields with aria + visible indicator", () => {
    const { getByLabelText, getByText } = render(Field, {
      name: "email",
      label: "Email",
      required: true,
    });
    const input = getByLabelText(/Email/) as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(getByText("(required)")).toBeTruthy();
  });

  it("links description via aria-describedby", () => {
    const { getByLabelText, getByText } = render(Field, {
      name: "email",
      label: "Email",
      description: "We never share it.",
    });
    const input = getByLabelText("Email") as HTMLInputElement;
    const description = getByText("We never share it.");
    expect(input.getAttribute("aria-describedby")).toContain(description.id);
  });

  it("links error via aria-describedby and sets aria-invalid", () => {
    const { getByLabelText, getByRole } = render(Field, {
      name: "email",
      label: "Email",
      error: "Required",
    });
    const input = getByLabelText("Email") as HTMLInputElement;
    const alert = getByRole("alert");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain(alert.id);
    expect(alert.textContent).toBe("Required");
  });

  it("renders a textarea when type=textarea", () => {
    const { getByLabelText } = render(Field, {
      name: "msg",
      label: "Message",
      type: "textarea",
    });
    const textarea = getByLabelText("Message") as HTMLTextAreaElement;
    expect(textarea.tagName).toBe("TEXTAREA");
  });
});

// The control's skin, which had two defects a class list cannot show you.
describe("Field styling", () => {
  // The input and the textarea once carried two copy-pasted class lists, which
  // is exactly how a fix lands on one control and not the other, so every
  // styling contract below runs over both.
  const CONTROLS = [
    { kind: "input", type: undefined },
    { kind: "textarea", type: "textarea" },
  ] as const;

  it("gives the input and the textarea the same class string", () => {
    // One string, two controls: whatever the skin is, a fix to it (the focus
    // ring, the border) has to reach the message box too. This asserts the two
    // agree, not what the classes are.
    const input = render(Field, { name: "a", label: "A" });
    const inputClass = input.getByLabelText("A").className;
    input.unmount();
    const area = render(Field, { name: "b", label: "B", type: "textarea" });
    expect(area.getByLabelText("B").className).toBe(inputClass);
  });

  it.each(CONTROLS)(
    "draws a $kind's resting border that clears the 3:1 non-text minimum",
    ({ type }) => {
      // --color-light is #e2e2e2: 1.30:1 against the white card, so the
      // fields read as invisible boxes and a visitor has to hunt for where to
      // type. WCAG 1.4.11 wants 3:1 for a control's boundary.
      const { getByLabelText } = render(Field, {
        name: "a",
        label: "A",
        ...(type ? { type } : {}),
      });
      const cls = getByLabelText("A").getAttribute("class") ?? "";
      expect(cls).not.toContain("border-light");
      const tokens = cls
        .split(/\s+/)
        .map((c) => c.match(/^border-([a-z][a-z0-9-]*)$/)?.[1])
        .filter((t): t is string => !!t && t in THEME);
      expect(tokens.length, "a resting border-* colour token from @theme").toBeGreaterThan(0);
      for (const token of tokens) {
        expect(
          contrast(hex(THEME[token]), [255, 255, 255]),
          `border-${token} on white`,
        ).toBeGreaterThanOrEqual(3);
      }
    },
  );

  it.each(CONTROLS)(
    "keeps the $kind's forced-colors outline fallback on focus (Tailwind v4)",
    ({ type }) => {
      // In Tailwind v4 `outline-none` resolves to `outline-style: none` and takes
      // the forced-colors fallback with it; `outline-hidden` keeps the 2px
      // transparent outline the forced-colors palette repaints. Under forced
      // colours the ring is dropped by the engine, so that outline is the only
      // focus affordance left.
      const { getByLabelText } = render(Field, {
        name: "a",
        label: "A",
        ...(type ? { type } : {}),
      });
      const cls = getByLabelText("A").getAttribute("class") ?? "";
      expect(cls).toContain("focus:outline-hidden");
      expect(cls).not.toContain("focus:outline-none");
    },
  );
});

// Modal.svelte finds its initial-focus target by `[autofocus]`; with none, the
// native dialog-focusing steps land on the first focusable child, which is the
// ✕ — the exit. Opt-in, and off by default so no page ever grabs focus on load
// by accident.
describe("Field autofocus", () => {
  it("carries no autofocus attribute unless asked", () => {
    const { getByLabelText } = render(Field, { name: "email", label: "Email" });
    expect((getByLabelText("Email") as HTMLInputElement).hasAttribute("autofocus")).toBe(false);
  });

  it("marks the control as the dialog's focus target when autofocus is set", () => {
    const { getByLabelText } = render(Field, {
      name: "name",
      label: "Name",
      autofocus: true,
    });
    expect((getByLabelText("Name") as HTMLInputElement).hasAttribute("autofocus")).toBe(true);
  });

  it("applies to the textarea as well as the input", () => {
    // The two controls are a standing source of one-sided fixes in this
    // component (see "gives the input and the textarea the SAME classes").
    const { getByLabelText } = render(Field, {
      name: "msg",
      label: "Message",
      type: "textarea",
      autofocus: true,
    });
    expect((getByLabelText("Message") as HTMLTextAreaElement).hasAttribute("autofocus")).toBe(true);
  });
});
