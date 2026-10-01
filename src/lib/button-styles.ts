export type ButtonVariant =
  "gold" | "outline-light" | "primary" | "outline-primary" | "white" | "ghost-primary";

export const BUTTON_BASE =
  "inline-block rounded-[10px] border-2 px-8 py-2 text-base leading-5 font-medium [transition:background-color_0.2s_ease-in,opacity_0.25s_ease-in] hover:opacity-100";

export const BUTTON_CLASS: Record<ButtonVariant, string> = {
  gold: "border-gold bg-gold text-navy hover:bg-white",
  "outline-light":
    "border-white bg-transparent text-white hover:bg-white/10 focus-visible:outline-gold",
  primary: "border-primary bg-primary text-white hover:bg-primary/80",
  "outline-primary": "border-primary bg-white text-primary hover:bg-primary/15",
  white:
    "border-white bg-white text-primary hover:border-gold hover:bg-gold hover:text-navy focus-visible:outline-gold",
  "ghost-primary": "border-primary bg-transparent text-primary hover:bg-primary/10",
};

export const BUTTON_CLASS_ON_LIGHT: Partial<Record<ButtonVariant, string>> = {
  gold: "border-gold bg-gold text-navy hover:bg-gold/55",
};

export type Ground = "white" | "light" | "primary" | "band-over-white" | "band-over-black";

const LIGHT_GROUNDS: readonly Ground[] = ["white", "light"];

export const BUTTON_GROUNDS: Record<ButtonVariant, readonly Ground[]> = {
  gold: ["white", "primary", "band-over-white", "band-over-black"],
  "outline-light": ["primary", "band-over-white", "band-over-black"],
  primary: ["white", "light"],
  "outline-primary": ["white", "light"],
  white: ["primary", "band-over-white", "band-over-black"],
  "ghost-primary": ["white", "light"],
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

export function variantClass(variant: ButtonVariant, grounds: readonly Ground[] = []): string {
  const onLight = BUTTON_CLASS_ON_LIGHT[variant];
  const light = grounds.length > 0 && grounds.every((g) => LIGHT_GROUNDS.includes(g));
  return light && onLight ? onLight : BUTTON_CLASS[variant];
}

export function buttonClass(
  variant: ButtonVariant,
  extra = "",
  grounds: readonly Ground[] = [],
): string {
  return `${BUTTON_BASE} ${variantClass(variant, grounds)}${extra ? ` ${extra}` : ""}`;
}

export function isButtonVariant(value: unknown): value is ButtonVariant {
  return typeof value === "string" && value in BUTTON_CLASS;
}
