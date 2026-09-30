import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { INTAKE_FIELDS, intakePayload } from "./intake";

const form = (entries: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.set(key, value);
  return data;
};

const complete = {
  company: "  Acme Mechanical ",
  trade: "HVAC",
  phone: "310.555.0100",
  email: "bids@acme.test",
  license_number: "C-20 123456",
  insurance: "Yes",
  project_size: "5K to 100K",
  prevailing_wage: "No",
  union: "Yes",
};

describe("intakePayload", () => {
  it("carries every field of the intake, the company as the lead's name", () => {
    expect(intakePayload(form(complete))).toEqual({
      name: "Acme Mechanical",
      email: "bids@acme.test",
      phone: "310.555.0100",
      trade: "HVAC",
      license_number: "C-20 123456",
      insurance: "Yes",
      project_size: "5K to 100K",
      prevailing_wage: "No",
      union: "Yes",
    });
  });

  it("keeps each yes/no answer apart from the others", () => {
    const payload = intakePayload(
      form({ ...complete, insurance: "No", prevailing_wage: "Yes", union: "No" }),
    );
    expect([payload.insurance, payload.prevailing_wage, payload.union]).toEqual([
      "No",
      "Yes",
      "No",
    ]);
  });

  it("drops a yes/no value the form never offers, and an unanswered question", () => {
    const payload = intakePayload(form({ company: "Acme", prevailing_wage: "Maybe" }));
    expect(payload.prevailing_wage).toBeUndefined();
    expect(payload.union).toBeUndefined();
  });

  it("caps a field at 500 characters", () => {
    expect(intakePayload(form({ trade: "x".repeat(900) })).trade).toHaveLength(500);
  });
});

describe("INTAKE_FIELDS against the reference form", () => {
  const html = readFileSync(
    join(process.cwd(), "matching/spec/pages/join-the-team/index.html"),
    "utf8",
  );
  const formHtml = html.split('id="email-form"')[1].split("</form>")[0];
  const labels = [...formHtml.matchAll(/class="form-label"[^>]*>([^<]+)</g)].map((m) =>
    m[1].trim(),
  );

  it("asks the same nine questions, in the same order", () => {
    expect(labels).toEqual([
      "Company Name",
      "Trade",
      "Phone",
      "Email",
      "License Number",
      "Insurance",
      "Project Size",
      "Prevailing Wage",
      "Union",
    ]);
    expect(INTAKE_FIELDS.map((f) => f.label)).toEqual(labels);
  });

  it("names the reference's unlabeled 'Name 6' field for its label", () => {
    expect(formHtml).toContain('data-name="Name 6"');
    expect(INTAKE_FIELDS.find((f) => f.label === "Project Size")?.name).toBe("project_size");
  });

  it("offers the same yes/no questions as radios", () => {
    const radios = [
      ...new Set([...formHtml.matchAll(/type="radio"[^>]*data-name="([^"]+)"/g)].map((m) => m[1])),
    ];
    expect(radios).toEqual(["Insurance", "Prevailing Wage", "Union"]);
    expect(INTAKE_FIELDS.filter((f) => f.kind === "yes-no").map((f) => f.label)).toEqual(radios);
  });
});
