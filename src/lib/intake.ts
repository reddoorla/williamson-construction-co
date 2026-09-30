export const YES_NO = ["Yes", "No"] as const;

/** The page document whose route (src/routes/join-the-team) carries the form. */
export const INTAKE_PAGE_UID = "join-the-team";

export type IntakeField =
  | {
      name: string;
      label: string;
      kind: "text" | "email" | "tel";
      required?: boolean;
      autocomplete?: "organization" | "email" | "tel";
      description?: string;
    }
  | { name: string; label: string; kind: "yes-no" };

/**
 * The trade-partner intake, field for field as the reference's /join-the-team
 * form, with its one unlabeled Webflow field (`name-6`, data-name "Name 6")
 * named for what its label says: Project Size.
 */
export const INTAKE_FIELDS: readonly IntakeField[] = [
  {
    name: "company",
    label: "Company Name",
    kind: "text",
    required: true,
    autocomplete: "organization",
  },
  { name: "trade", label: "Trade", kind: "text" },
  { name: "phone", label: "Phone", kind: "tel", autocomplete: "tel" },
  { name: "email", label: "Email", kind: "email", required: true, autocomplete: "email" },
  { name: "license_number", label: "License Number", kind: "text" },
  { name: "insurance", label: "Insurance", kind: "yes-no" },
  {
    name: "project_size",
    label: "Project Size",
    kind: "text",
    description: "For example, 5K to 100K",
  },
  { name: "prevailing_wage", label: "Prevailing Wage", kind: "yes-no" },
  { name: "union", label: "Union", kind: "yes-no" },
];

const MAX_LENGTH = 500;

function text(form: FormData, name: string): string | undefined {
  const value = form.get(name);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, MAX_LENGTH);
  return trimmed || undefined;
}

function yesNo(form: FormData, name: string): "Yes" | "No" | undefined {
  const value = form.get(name);
  return value === "Yes" || value === "No" ? value : undefined;
}

/**
 * The fleet payload for one intake. `name`, `email` and `phone` are the
 * ingest's known keys (the company is the lead's name); every other field
 * travels as its own key, which central stores in extraFields and the notify
 * email shows as a labelled row.
 */
export function intakePayload(form: FormData): Record<string, string | undefined> {
  return {
    name: text(form, "company"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    trade: text(form, "trade"),
    license_number: text(form, "license_number"),
    insurance: yesNo(form, "insurance"),
    project_size: text(form, "project_size"),
    prevailing_wage: yesNo(form, "prevailing_wage"),
    union: yesNo(form, "union"),
  };
}
