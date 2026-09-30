import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

vi.mock("$app/forms", () => ({ enhance: () => ({ destroy() {} }) }));
vi.mock("$env/dynamic/public", () => ({ env: {} }));

const { default: IntakeForm } = await import("./index.svelte");
const { CONTACT_EMAIL } = await import("$lib/contact");

afterEach(() => cleanup());

const slice = {
  slice_type: "intake_form",
  variation: "default",
  id: "s1",
  primary: { heading: "Join the team", success_message: "Thanks" },
  items: [],
} as never;

describe("IntakeForm slice", () => {
  it("keeps the email address beside the form, which every error message points to", () => {
    const { container } = render(IntakeForm, {
      props: { slice, context: { intake: { formTs: 1, result: { error: "x" } } } },
    });
    expect(container.querySelector("form")).not.toBeNull();
    expect(container.querySelector(`a[href^="mailto:"]`)?.textContent).toBe(CONTACT_EMAIL);
  });
});
