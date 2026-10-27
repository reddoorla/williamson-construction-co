import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Field from "./Field.svelte";

// Every colour a `border-*` utility can name: Tailwind's default palette, with
// app.css's @theme on top (it overrides and adds). A designer may pick any of
// them, so the contrast check below has to be able to measure any of them.
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
// Anything else (transparent, currentColor) throws: it is no visible boundary.
const toRgb = (raw: string, token: string): number[] => {
  const v = NAMED[raw] ?? raw;
  if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(v)) {
    const h = v.length === 4 ? v.slice(1).replace(/./g, (c) => c + c) : v.slice(1);
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const m = /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+|none)(?:deg)?\s*\)$/i.exec(v);
  if (!m) throw new Error(`--color-${token} is "${raw}", which this test cannot measure`);
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
  const CONTROLS: [kind: string, type: "textarea" | undefined][] = [
    ["input", undefined],
    ["textarea", "textarea"],
  ];

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
    "draws the %s's resting border so it clears the 3:1 non-text minimum",
    (_kind, type) => {
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
      // A theme token (`border-dark`) or an arbitrary hex (`border-[#767676]`):
      // either is a designer's legitimate way to name the colour.
      const borders = cls.split(/\s+/).flatMap((c): [string, string][] => {
        const token = c.match(/^border-([a-z][a-z0-9-]*)$/)?.[1];
        if (token && token in THEME) return [[`border-${token}`, THEME[token]]];
        const hex = c.match(/^border-\[(#[0-9a-f]{3}(?:[0-9a-f]{3})?)\]$/i)?.[1];
        return hex ? [[c, hex]] : [];
      });
      expect(borders.length, "a resting border colour").toBeGreaterThan(0);
      for (const [name, raw] of borders) {
        expect(
          contrast(toRgb(raw, name), [255, 255, 255]),
          `${name} on white`,
        ).toBeGreaterThanOrEqual(3);
      }
    },
  );

  it.each(CONTROLS)(
    "keeps the %s's forced-colors outline fallback on focus (Tailwind v4)",
    (_kind, type) => {
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
