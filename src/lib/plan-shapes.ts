export type PlanShape =
  | { kind: "polygon"; points: string }
  | { kind: "rect"; x: number; y: number; width: number; height: number; transform: string };

export const PLAN_VIEWBOX = "0 0 620.38 578";
export const PLAN_FILL = "#005a91";
export const PLAN_ACTIVE_FILL = "#c6a647";
export const PLAN_DISC_FILL = "#004a80";

export const PLAN_SHAPES: ReadonlyArray<{ shape: PlanShape; disc: { cx: number; cy: number } }> = [
  {
    shape: {
      kind: "polygon",
      points:
        "351.41 236.75 282.87 322.1 94.33 170.7 231.41 0 294.25 50.47 225.72 135.82 351.41 236.75",
    },
    disc: { cx: 235.91, cy: 212.71 },
  },
  {
    shape: {
      kind: "polygon",
      points:
        "530.58 194.35 393.5 365.06 330.66 314.59 399.2 229.24 273.5 128.3 342.04 42.95 530.58 194.35",
    },
    disc: { cx: 395.12, cy: 147.28 },
  },
  {
    shape: {
      kind: "polygon",
      points: "552.4 212.71 620.38 266.64 370.28 578 302.31 524.07 552.4 212.71",
    },
    disc: { cx: 472.31, cy: 395.36 },
  },
  {
    shape: {
      kind: "rect",
      x: 119.44,
      y: 170.82,
      width: 109.46,
      height: 358.86,
      transform: "translate(-207.98 266.76) rotate(-51.24)",
    },
    disc: { cx: 169.36, cy: 346.39 },
  },
];

export function nextStep(current: number, key: string, count: number): number | null {
  if (count <= 0) return null;
  if (key === "ArrowRight" || key === "ArrowDown") return (current + 1) % count;
  if (key === "ArrowLeft" || key === "ArrowUp") return (current - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}
