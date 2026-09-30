export type ButtonVariant = "gold" | "outline-light" | "primary" | "outline-primary" | "white";

export const BUTTON_BASE =
  "inline-block rounded-[10px] border-2 px-8 py-2 text-base leading-6 transition-colors duration-200";

export const BUTTON_CLASS: Record<ButtonVariant, string> = {
  gold: "border-gold bg-gold text-navy hover:bg-white",
  "outline-light":
    "border-white bg-transparent text-white hover:bg-white/10 focus-visible:outline-gold",
  primary: "border-primary bg-primary text-white hover:bg-primary/80",
  "outline-primary": "border-primary bg-white text-primary hover:bg-primary/15",
  white:
    "border-white bg-white text-primary hover:border-gold hover:bg-gold hover:text-navy focus-visible:outline-gold",
};

export type Ground = "white" | "light" | "primary" | "band-over-white" | "band-over-black";

export const BUTTON_GROUNDS: Record<ButtonVariant, readonly Ground[]> = {
  gold: ["white", "primary", "band-over-white", "band-over-black"],
  "outline-light": ["primary", "band-over-white", "band-over-black"],
  primary: ["white", "light"],
  "outline-primary": ["white", "light"],
  white: ["primary", "band-over-white", "band-over-black"],
};

const VARIANTS = Object.keys(BUTTON_CLASS) as ButtonVariant[];

export function isLegibleOn(variant: ButtonVariant, grounds: readonly Ground[]): boolean {
  return grounds.every((ground) => BUTTON_GROUNDS[variant].includes(ground));
}

export function legibleVariant(
  requested: unknown,
  grounds: readonly Ground[],
  fallback: ButtonVariant,
): ButtonVariant {
  if (isButtonVariant(requested) && isLegibleOn(requested, grounds)) return requested;
  if (isLegibleOn(fallback, grounds)) return fallback;
  const any = VARIANTS.find((variant) => isLegibleOn(variant, grounds));
  if (!any) throw new Error(`no button variant is legible on ${grounds.join(" + ")}`);
  return any;
}

export function buttonClass(variant: ButtonVariant, extra = ""): string {
  return `${BUTTON_BASE} ${BUTTON_CLASS[variant]}${extra ? ` ${extra}` : ""}`;
}

export function isButtonVariant(value: unknown): value is ButtonVariant {
  return typeof value === "string" && value in BUTTON_CLASS;
}
