import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

vi.mock("$app/forms", () => ({ enhance: () => ({ destroy() {} }) }));
vi.mock("$env/dynamic/public", () => ({ env: {} }));

const { default: IntakeFormFields } = await import("./IntakeFormFields.svelte");

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
});
