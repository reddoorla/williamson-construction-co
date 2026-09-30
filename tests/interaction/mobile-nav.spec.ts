import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

const box = (page: Page, selector: string) =>
  page.locator(selector).evaluate((e) => {
    const r = e.getBoundingClientRect();
    const s = getComputedStyle(e);
    return {
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      height: Math.round(r.height),
      width: Math.round(r.width),
      visibility: s.visibility,
      background: s.backgroundColor,
      transform: s.transform,
    };
  });

async function open(page: Page) {
  const button = page.getByRole("button", { name: "Menu" });
  await expect(async () => {
    if ((await button.getAttribute("aria-expanded")) !== "true") await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true", { timeout: 1000 });
  }).toPass({ timeout: 20000 });
  return button;
}

test("closed, the panel sits 15rem up behind the bar and is hidden (.mobile-nav)", async ({
  page,
}) => {
  await page.goto("/");
  const panel = await box(page, "#wc-menu");
  expect(panel.visibility).toBe("hidden");
  expect(panel.top).toBe(64 - 240);
  await expect(page.locator("#wc-menu a").filter({ visible: true })).toHaveCount(0);
});

test("open, it is the reference's 208px white panel of four 52px links under the 64px bar", async ({
  page,
}) => {
  await page.goto("/");
  await open(page);
  await expect.poll(async () => (await box(page, "#wc-menu")).top, { timeout: 3000 }).toBe(64);
  const panel = await box(page, "#wc-menu");
  const header = await box(page, "header");
  expect(panel).toMatchObject({ top: 64, height: 208, width: header.width, visibility: "visible" });
  expect(panel.background).toBe("rgb(255, 255, 255)");

  const links = page.locator("#wc-menu a");
  await expect(links).toHaveCount(4);
  for (let i = 0; i < 4; i++) {
    const m = await links.nth(i).evaluate((e) => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return {
        height: Math.round(r.height),
        centre: (() => {
          const p = e.parentElement!.getBoundingClientRect();
          return Math.abs(Math.round(r.left + r.width / 2 - (p.left + p.width / 2)));
        })(),
        size: s.fontSize,
        weight: s.fontWeight,
        color: s.color,
        padding: s.padding,
      };
    });
    expect(m).toEqual({
      height: 52,
      centre: 0,
      size: "19.2px",
      weight: "500",
      color: "rgb(0, 74, 128)",
      padding: "16px",
    });
  }
});

test("the icons cross-fade: menu out, close in, in the same 32px spot (.open-nav, .close-nav)", async ({
  page,
}) => {
  await page.goto("/");
  const [menu, close] = [
    page.locator('button[aria-controls="wc-menu"] img').nth(0),
    page.locator('button[aria-controls="wc-menu"] img').nth(1),
  ];
  await expect(menu).toHaveCSS("opacity", "1");
  await expect(close).toHaveCSS("opacity", "0");
  await open(page);
  await expect(menu).toHaveCSS("opacity", "0");
  await expect(close).toHaveCSS("opacity", "1");
  const [a, b] = [await menu.boundingBox(), await close.boundingBox()];
  const button = (await page.getByRole("button", { name: "Menu" }).boundingBox())!;
  expect(a).toEqual(b);
  expect(button).toMatchObject({ y: 0, width: 64, height: 64 });
  expect({ ...a!, x: a!.x - button.x }).toEqual({ x: 16, y: 16, width: 32, height: 32 });
});

test("Tab past the last menu link closes the menu, so the next control is not under it", async ({
  page,
}) => {
  await page.goto("/");
  const button = await open(page);
  await button.focus();
  await expect(button).toBeFocused();
  for (const name of ["About", "Services", "Projects", "Contact"]) {
    await page.keyboard.press("Tab");
    await expect(page.locator("#wc-menu").getByRole("link", { name })).toBeFocused();
  }
  await page.keyboard.press("Tab");
  const where = await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 120));
  await expect(button, `focus went to ${where}`).toHaveAttribute("aria-expanded", "false");
  const covered = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const r = el.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!hit?.closest("#wc-menu");
  });
  expect(covered).toBe(false);
});

test("the toggle fades to 0.6 on hover (.open-nav:hover, .close-nav:hover)", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Menu" });
  const icons = button.locator("span").first();
  await button.hover();
  await expect(icons).toHaveCSS("opacity", "0.6");
});

test.describe("with motion allowed", () => {
  test.use({ contextOptions: { reducedMotion: "no-preference" } });

  test("the panel slides for 500ms (TRANSFORM_MOVE, ease) and the icons fade on the IX2 timings", async ({
    page,
  }) => {
    await page.goto("/");
    const panel = page.locator("#wc-menu");
    const [menu, close] = [
      page.locator('button[aria-controls="wc-menu"] img').nth(0),
      page.locator('button[aria-controls="wc-menu"] img').nth(1),
    ];
    const button = page.getByRole("button", { name: "Menu" });
    await expect(async () => {
      await button.click();
      await expect(button).toHaveAttribute("aria-expanded", "true", { timeout: 300 });
    }).toPass({ timeout: 20000 });
    const tops: number[] = [];
    for (let i = 0; i < 6; i++) {
      tops.push((await box(page, "#wc-menu")).top);
      await page.waitForTimeout(80);
    }
    expect(
      tops.some((t) => t > -176 && t < 64),
      `mid-slide positions ${tops}`,
    ).toBe(true);
    await expect.poll(async () => (await box(page, "#wc-menu")).top).toBe(64);

    const timing = async (l: typeof panel, prop: string) =>
      l.evaluate((e, prop) => {
        const s = getComputedStyle(e);
        const props = s.transitionProperty.split(",").map((p) => p.trim());
        const i = props.indexOf(prop);
        const at = (list: string) => list.split(",").map((p) => p.trim())[i];
        return i < 0
          ? null
          : `${at(s.transitionDuration)} ${at(s.transitionTimingFunction)} ${at(s.transitionDelay)}`;
      }, prop);
    expect(await timing(panel, "translate")).toBe("0.5s ease 0s");
    expect(await timing(menu, "opacity")).toBe("0.5s ease 0s");
    expect(await timing(close, "opacity")).toBe("0.7s ease 0.2s");
    await expect(close).toHaveCSS("opacity", "1");

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "false");
    expect(await timing(close, "opacity")).toBe("0.7s ease 0s");
    expect(await timing(menu, "opacity")).toBe("0.5s ease 0.9s");
    await page.waitForTimeout(600);
    expect(Number(await menu.evaluate((e) => getComputedStyle(e).opacity))).toBe(0);
    await expect(menu).toHaveCSS("opacity", "1", { timeout: 3000 });
    await expect.poll(async () => (await box(page, "#wc-menu")).top).toBe(64 - 240);
  });

  test("Tab straight after closing goes on into the page, never into the sliding panel", async ({
    page,
  }) => {
    await page.goto("/");
    const button = await open(page);
    await button.focus();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Tab");
    const inPanel = await page.evaluate(() => !!document.activeElement?.closest("#wc-menu"));
    expect(inPanel).toBe(false);
  });
});
