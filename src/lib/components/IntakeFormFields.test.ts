import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import { flushSync } from "svelte";

type Submit = (input: { cancel: () => void }) => unknown;
const enhanced = vi.hoisted(() => ({ submit: undefined as Submit | undefined }));

vi.mock("$app/forms", () => ({
  enhance: (_form: HTMLFormElement, submit: Submit) => {
    enhanced.submit = submit;
    return { destroy() {} };
  },
}));
vi.mock("$env/dynamic/public", () => ({ env: {} }));

const { default: IntakeFormFields } = await import("./IntakeFormFields.svelte");
const { intakePayload } = await import("$lib/intake");

afterEach(() => cleanup());

describe("IntakeFormFields", () => {
  it("labels every question, and groups each yes/no pair under its question", () => {
    const { getByLabelText, container } = render(IntakeFormFields, {
      props: { formTs: 1, result: null },
    });
    for (const label of [
      "Company Name",
      "Trade",
      "Phone",
      "Email",
      "License Number",
      "Project Size",
    ]) {
      expect(getByLabelText(label, { exact: false })).toBeTruthy();
    }
    const legends = [...container.querySelectorAll("fieldset legend")].map((l) =>
      l.textContent?.trim(),
    );
    expect(legends).toEqual(["Insurance", "Prevailing Wage", "Union"]);
    for (const fieldset of container.querySelectorAll("fieldset")) {
      expect(fieldset.querySelectorAll('input[type="radio"]')).toHaveLength(2);
    }
  });

  it("requires the company and an email, and carries the bot screens", () => {
    const { container } = render(IntakeFormFields, { props: { formTs: 1234, result: null } });
    const required = [...container.querySelectorAll("[required]")].map((el) =>
      el.getAttribute("name"),
    );
    expect(required).toEqual(["company", "email"]);
    expect(container.querySelector('input[name="ts"]')?.getAttribute("value")).toBe("1234");
    expect(container.querySelector('input[name="bot-field"]')?.getAttribute("tabindex")).toBe("-1");
  });

  it("shows the error the action returned", () => {
    const { getByRole } = render(IntakeFormFields, {
      props: { formTs: 1, result: { error: "We couldn't verify this submission." } },
    });
    expect(getByRole("alert").textContent).toContain("couldn't verify");
  });

  it("replaces the form with the editor's message and moves focus to it", async () => {
    const { container, getByRole } = render(IntakeFormFields, {
      props: { formTs: 1, result: { success: true }, successMessage: "Thank you!" },
    });
    expect(container.querySelector("form")).toBeNull();
    const status = getByRole("status");
    expect(status.textContent?.trim()).toBe("Thank you!");
    await vi.waitFor(() => expect(document.activeElement).toBe(status));
  });

  it("posts every question under the name the payload reads", () => {
    const { container } = render(IntakeFormFields, { props: { formTs: 1, result: null } });
    const form = container.querySelector("form")!;
    const data = new FormData();
    const names = new Set<string>();
    for (const el of form.querySelectorAll<HTMLInputElement>("input[name]")) {
      if (el.type === "hidden" || el.name === "bot-field") continue;
      names.add(el.name);
      if (el.type === "radio") {
        if (el.value === "Yes") data.set(el.name, "Yes");
      } else {
        data.set(el.name, `v-${el.name}`);
      }
    }
    expect(names.size).toBe(9);
    const payload = intakePayload(data);
    const sent = Object.values(payload).filter((v) => v !== undefined);
    expect(sent).toHaveLength(9);
  });

  it("keeps the submit button focusable while sending, and ignores a second press", () => {
    const { getByRole } = render(IntakeFormFields, { props: { formTs: 1, result: null } });
    const button = getByRole("button", { name: /submit/i });
    const cancel = vi.fn();
    enhanced.submit!({ cancel });
    flushSync();
    expect(button.hasAttribute("disabled")).toBe(false);
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(cancel).not.toHaveBeenCalled();
    enhanced.submit!({ cancel });
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("moves focus to the error, and announces a repeated error as a new alert", async () => {
    const error = "We couldn't verify this submission.";
    const { getByRole, rerender } = render(IntakeFormFields, {
      props: { formTs: 1, result: { error } },
    });
    const first = getByRole("alert");
    await vi.waitFor(() => expect(document.activeElement).toBe(first));
    await rerender({ formTs: 1, result: { error } });
    const second = getByRole("alert");
    expect(second).not.toBe(first);
    await vi.waitFor(() => expect(document.activeElement).toBe(second));
  });

  it("explains the required marker, and gives Project Size's format as text, not a placeholder", () => {
    const { container, getByLabelText } = render(IntakeFormFields, {
      props: { formTs: 1, result: null },
    });
    expect(container.textContent).toContain("marks a required field");
    const size = getByLabelText("Project Size", { exact: false });
    expect(size.hasAttribute("placeholder")).toBe(false);
    const describedBy = size.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)?.textContent).toContain("5K to 100K");
  });
});
