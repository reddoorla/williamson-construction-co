import { expect, test } from "@playwright/test";

const REFERENCE = [
  { width: 1440, height: 736, home: 128, copyright: 536 },
  { width: 834, height: 736, home: 128, copyright: 536 },
  { width: 390, height: 1001, home: 353, copyright: 801 },
];

for (const ref of REFERENCE) {
  test(`at ${ref.width}px the footer keeps the reference's geometry`, async ({ page }) => {
    await page.setViewportSize({ width: ref.width, height: 900 });
    await page.goto("/contact");
    const got = await page.evaluate(() => {
      const footer = document.querySelector("footer")!;
      const top = footer.getBoundingClientRect().top;
      const home = [...footer.querySelectorAll("a")].find((a) => a.textContent?.trim() === "Home")!;
      const em = footer.querySelector("em")!;
      const cs = getComputedStyle(home);
      return {
        height: Math.round(footer.getBoundingClientRect().height),
        home: Math.round(home.getBoundingClientRect().top - top),
        homeHeight: Math.round(home.getBoundingClientRect().height),
        copyright: Math.round(em.getBoundingClientRect().top - top),
        type: `${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight}`,
      };
    });
    expect(Math.abs(got.height - ref.height), `footer height ${got.height}`).toBeLessThanOrEqual(2);
    expect(Math.abs(got.home - ref.home), `Home top ${got.home}`).toBeLessThanOrEqual(2);
    expect(
      Math.abs(got.copyright - ref.copyright),
      `copyright top ${got.copyright}`,
    ).toBeLessThanOrEqual(2);
    expect(got.homeHeight).toBe(68);
    expect(got.type).toBe("500 19.2px/20px");
  });
}
