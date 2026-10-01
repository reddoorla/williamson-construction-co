import { expect, test, type Page } from "@playwright/test";

type Probe = { find: string; y?: number; x?: number; w?: number; h?: number };
type Case = { page: string; width: number; origin: string; probes: Probe[] };

const CASES: Case[] = [
  {
    page: "home",
    width: 1440,
    origin: "body",
    probes: [
      { find: "h1", x: 120, y: 584, w: 784 },
      { find: "text=We're setting out to rebuild", y: 982, x: 250 },
      { find: "exact=Healthcare", x: 178, y: 1850 },
      { find: "exact=Success", x: 804, y: 3519 },
    ],
  },
  {
    page: "home",
    width: 834,
    origin: "body",
    probes: [
      { find: "[data-slice-type=video_band]", h: 417 },
      { find: "text=Williamson Construction is committed", y: 560 },
      { find: "text=Keep your space clear so", x: 83, y: 2912 },
    ],
  },
  {
    page: "home",
    width: 390,
    origin: "body",
    probes: [{ find: "[data-slice-type=video_band]", h: 195 }],
  },
  {
    page: "services",
    width: 1440,
    origin: "body",
    probes: [
      { find: "text=We're with you every step", h: 144 },
      { find: "text=Areas of Expertise", y: 1020 },
      { find: "exact=Healthcare", x: 178, y: 1379 },
    ],
  },
  {
    page: "services",
    width: 1440,
    origin: "text=Phase 1 - Project Planning",
    probes: [
      { find: "text=Phase 5 - Closeout", y: 4819 },
      { find: "text=Start feeling like a top", y: 5716 },
    ],
  },
  {
    page: "about-us",
    width: 1440,
    origin: "body",
    probes: [
      { find: "text=Leadership", y: 1582 },
      { find: "[data-slice-type=video_band]", h: 810 },
    ],
  },
  {
    page: "projects",
    width: 1440,
    origin: "text=Featured Projects",
    probes: [
      { find: "text=Providence Express Care", x: 144, y: 1780 },
      { find: "text=West High School", x: 938, y: 4674 },
    ],
  },
  {
    page: "contact",
    width: 1440,
    origin: "text=Brian Williamson",
    probes: [{ find: "text=Call to set up a meeting", x: 768, y: -381 }],
  },
  {
    page: "join-the-team",
    width: 1440,
    origin: "body",
    probes: [{ find: "text=Are you interested in joining", y: 864 }],
  },
  {
    page: "torrance-high-school",
    width: 1440,
    origin: "body",
    probes: [
      { find: "h1", x: 114, y: 584, w: 785 },
      { find: "footer", y: 3689 },
    ],
  },
];

async function rect(page: Page, find: string) {
  const loc = find.startsWith("text=")
    ? page.getByText(find.slice(5), { exact: false }).first()
    : find.startsWith("exact=")
      ? page.getByText(find.slice(6), { exact: true }).first()
      : page.locator(find).first();
  const box = await loc.boundingBox();
  const scrolled = await page.evaluate(() => window.scrollY);
  if (!box) throw new Error(`${find} has no box`);
  return { x: box.x, y: box.y + scrolled, w: box.width, h: box.height };
}

for (const c of CASES) {
  test(`${c.page} at ${c.width}px keeps the reference's geometry (from ${c.origin})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: c.width, height: 900 });
    await page.goto(`/dev/match/${c.page}`);
    await page.evaluate(() => document.fonts.ready);
    const origin = c.origin === "body" ? { y: 0 } : await rect(page, c.origin);
    for (const p of c.probes) {
      const r = await rect(page, p.find);
      const got = { x: r.x, y: r.y - origin.y, w: r.w, h: r.h };
      for (const k of ["x", "y", "w", "h"] as const) {
        if (p[k] === undefined) continue;
        expect(
          Math.abs(got[k] - p[k]!),
          `${p.find} ${k}=${Math.round(got[k])}, reference ${p[k]}`,
        ).toBeLessThanOrEqual(2);
      }
    }
  });
}
