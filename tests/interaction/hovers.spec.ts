import { expect, test, type Locator, type Page } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

const PIXEL = `(c) => {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const on = (ground) => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data.slice(0, 3)];
  };
  const white = on("#ffffff");
  const black = on("#000000");
  const alpha = 1 - (white[0] - black[0]) / 255;
  const rgb = black.map((k) => (alpha > 0 ? k / alpha : 0));
  return [...rgb.map((k) => Math.round(k)), Math.round(alpha * 100) / 100, white, black];
}`;

async function css(el: Locator, prop: string) {
  return el.evaluate(
    (e, [prop, pixel]) => {
      const value = getComputedStyle(e).getPropertyValue(prop).trim();
      if (!/color/.test(prop)) return value;
      return (0, eval)(pixel)(value);
    },
    [prop, PIXEL] as const,
  );
}

const paint = (page: Page, color: string) =>
  page.evaluate(([color, pixel]) => (0, eval)(pixel)(color), [color, PIXEL] as const);

async function expectColor(page: Page, el: Locator, prop: string, expected: string, what = "") {
  const got = (await css(el, prop)) as unknown as [
    number,
    number,
    number,
    number,
    number[],
    number[],
  ];
  const want = (await paint(page, expected)) as [
    number,
    number,
    number,
    number,
    number[],
    number[],
  ];
  const off = [0, 1, 2].flatMap((k) => [
    Math.abs(got[4][k] - want[4][k]),
    Math.abs(got[5][k] - want[5][k]),
  ]);
  expect(
    Math.max(...off),
    `${what} ${prop} ${JSON.stringify(got.slice(0, 4))} vs ${expected}`,
  ).toBeLessThanOrEqual(2);
}

async function hovered(page: Page, el: Locator) {
  await page.mouse.move(0, 0);
  await el.scrollIntoViewIfNeeded();
  const point = await el.evaluate((e) => {
    const r = e.getBoundingClientRect();
    for (let y = r.top + 2; y < r.bottom - 1; y += 3) {
      for (let x = r.left + 2; x < r.right - 1; x += 3) {
        const hit = document.elementFromPoint(x, y);
        if (hit === e || e.contains(hit)) return { x, y };
      }
    }
    return null;
  });
  expect(point, "no point on the element is topmost").not.toBeNull();
  await page.mouse.move(point!.x, point!.y);
  await page.waitForTimeout(900);
}

type ButtonCase = [path: string, slice: string, label: string, bg: string, reference: string];

const BUTTONS: ButtonCase[] = [
  ["/", "cta_block", "Contact", "rgba(198, 166, 71, 0.55)", ".button-default:hover"],
  [
    "/join-the-team",
    "employee_application",
    "Employee Application",
    "rgba(198, 166, 71, 0.55)",
    ".button-default:hover",
  ],
  ["/join-the-team", "intake_form", "Submit", "rgba(198, 166, 71, 0.55)", ".button-default:hover"],
  ["/", "page_hero", "Contact", "#ffffff", ".button-default:hover (a11y substitute on blue)"],
  [
    "/",
    "page_hero",
    "Services",
    "rgba(255, 255, 255, 0.1)",
    ".button-default.white-outline.ml-8:hover",
  ],
  [
    "/",
    "our_plan",
    "Services",
    "rgba(255, 255, 255, 0.1)",
    ".button-default.bg-color-transparent.ml-8:hover",
  ],
  [
    "/",
    "sector_feature",
    "Contact",
    "rgba(0, 74, 128, 0.8)",
    ".button-default.bg-color-primary.mr-8:hover",
  ],
  [
    "/",
    "sector_feature",
    "Services",
    "rgba(0, 74, 128, 0.15)",
    ".button-default.bg-color-white.ml-8:hover",
  ],
  [
    "/",
    "cta_block",
    "About",
    "rgba(0, 74, 128, 0.1)",
    ".button-default.bg-color-transparent.text-color-primary:hover",
  ],
];

for (const [path, slice, label, bg, reference] of BUTTONS) {
  test(`${path} ${slice} "${label}" hovers as ${reference}`, async ({ page }) => {
    await page.goto(path);
    const button = page
      .locator(`[data-slice-type="${slice}"]`)
      .getByRole(label === "Submit" ? "button" : "link", { name: label, exact: true })
      .first();
    await hovered(page, button);
    await expectColor(page, button, "background-color", bg, label);
    expect(await css(button, "opacity")).toBe("1");
  });
}

test("slider arrows fade to 0.8 on hover with no fill (.icon-2:hover)", async ({ page }) => {
  await page.goto("/services");
  const next = page.locator('[data-slice-type="phase_slider"]').getByLabel("Next slide");
  await hovered(page, next);
  expect(await css(next, "opacity")).toBe("0.8");
  await expectColor(page, next, "background-color", "transparent", "next arrow");
});

test("a phase bubble does not fade on hover (.number-bubble:hover opacity 1)", async ({ page }) => {
  await page.goto("/services");
  const bubble = page.locator('[data-slice-type="phase_bubbles"] a').first();
  await hovered(page, bubble);
  expect(await css(bubble, "opacity")).toBe("1");
});

test("the plan's shapes and discs fade to 0.6 on hover (inline polygon, circle, rect:hover)", async ({
  page,
}) => {
  await page.goto("/");
  const plan = page.locator('[data-slice-type="our_plan"] svg');
  for (const shape of [plan.locator("polygon").first(), plan.locator("circle").first()]) {
    await hovered(page, shape);
    expect(await css(shape, "opacity")).toBe("0.6");
  }
});

const ROUTES = ["/", "/about-us", "/services", "/contact", "/join-the-team", "/projects"];

for (const path of ROUTES) {
  test(`${path}: every plain link fades as the reference's a:hover does, no further than AA allows`, async ({
    page,
  }) => {
    await page.goto(path);
    const links = page.locator("a:visible");
    const count = await links.count();
    let measured = 0;
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const isButton = await link.evaluate((e) => /\bhover:opacity-100\b/.test(e.className));
      const box = await link.boundingBox();
      if (isButton || !box || box.width < 2 || box.height < 2) continue;
      await hovered(page, link);
      const m = await link.evaluate((e, pixel) => {
        const parse = (0, eval)(pixel) as (c: string) => number[];
        const over = (top: number[], under: number[]) =>
          [0, 1, 2].map((k) => top[k] * top[3] + under[k] * (1 - top[3]));
        const layers: number[][] = [];
        for (let n = e.parentElement; n; n = n.parentElement) {
          const c = parse(getComputedStyle(n).backgroundColor);
          if (c[3] > 0) layers.push(c);
          if (c[3] === 1) break;
        }
        let ground = [255, 255, 255];
        for (const layer of layers.reverse()) ground = over(layer, ground);
        const s = getComputedStyle(e);
        const opacity = Number(s.opacity);
        const text = parse(s.color);
        const tint = parse(s.backgroundColor);
        const lin = (c: number) => {
          c /= 255;
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        };
        const lum = (c: number[]) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
        const ratio = (a: number[], b: number[]) => {
          const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
          return (hi + 0.05) / (lo + 0.05);
        };
        const at = (o: number) => {
          const face = over([...over(tint.slice(0, 4), ground), o], ground);
          return ratio(over([...text.slice(0, 3), o], face), face);
        };
        const size = parseFloat(s.fontSize);
        const bold = Number(s.fontWeight) >= 700;
        const floor = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
        const hasText = !!e.textContent?.trim();
        return {
          label: `${e.getAttribute("href")} "${e.textContent?.trim().slice(0, 30)}"`,
          opacity,
          tint: s.backgroundColor,
          hasText,
          floor,
          now: at(opacity),
          atReference: at(0.55),
        };
      }, PIXEL);
      measured++;
      expect(m.opacity, `${m.label} does not fade`).toBeLessThan(1);
      await expectColor(page, link, "background-color", "rgba(109, 106, 105, 0.06)", m.label);
      if (!m.hasText || m.atReference >= m.floor) {
        expect(m.opacity, `${m.label} passes AA at the reference's 0.55`).toBe(0.55);
      } else {
        expect(m.now, `${m.label} hovered contrast`).toBeGreaterThanOrEqual(m.floor);
      }
    }
    expect(measured).toBeGreaterThan(3);
  });
}
