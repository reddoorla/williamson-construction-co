import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/svelte";
import Field from "./Field.svelte";
import { borderColours, contrast, groundOf } from "../../test-utils/colour";

// Border colours resolve through the shared resolver: every colour a designer
// can name is measured (any palette token, an arbitrary hex, an alpha
// modifier), and one it cannot measure fails by name.

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
      const control = getByLabelText("A");
      const ground = groundOf(control);
      const borders = borderColours(control);
      expect(borders.length, "a resting border colour").toBeGreaterThan(0);
      for (const border of borders)
        expect(
          contrast(border.rgba, ground.rgba),
          `${border.name} on ${ground.name}`,
        ).toBeGreaterThanOrEqual(3);
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
