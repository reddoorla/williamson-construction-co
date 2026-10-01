import { expect, test } from "@playwright/test";

for (const width of [1440, 834, 390]) {
  test(`at ${width}px <html> reserves no scrollbar gutter around <body>`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const { inner, body, html } = await page.evaluate(() => ({
      inner: window.innerWidth,
      body: document.body.getBoundingClientRect().width,
      html: getComputedStyle(document.documentElement).scrollbarGutter,
    }));
    expect(html).toBe("auto");
    expect(body, "matching/LEDGER.md 2026-10-01: the reference reserves no gutter").toBe(inner);
  });
}
