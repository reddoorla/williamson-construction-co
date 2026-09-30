import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/about-us", "/services", "/join-the-team"];

for (const path of ROUTES) {
  test(`${path} sets its type in freight-sans-pro from Adobe Fonts kit noj4tji`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);

    const kit = await page.evaluate(() =>
      [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.getAttribute("href")),
    );
    expect(kit).toContain("https://use.typekit.net/noj4tji.css");

    const text = await page.evaluate(() => {
      const out: { weight: string; family: string; tag: string; text: string }[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const seen = new Set<Element>();
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const el = n.parentElement;
        if (!el || seen.has(el) || !n.textContent?.trim()) continue;
        seen.add(el);
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (s.visibility === "hidden" || s.display === "none" || r.width === 0) continue;
        if (el.closest("svg, script, style, noscript")) continue;
        out.push({
          weight: s.fontWeight,
          family: s.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
          tag: el.tagName.toLowerCase(),
          text: n.textContent.trim().slice(0, 40),
        });
      }
      return out;
    });
    expect(text.length).toBeGreaterThan(5);
    const wrong = text.filter(
      (t) => t.family !== (t.weight === "300" ? "freight-sans-pro-lights" : "freight-sans-pro"),
    );
    expect(wrong, "light (300) text in -lights, everything else in freight-sans-pro").toEqual([]);

    const faces = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts]
        .filter((f) => f.status === "loaded")
        .map((f) => `${f.family.replace(/["']/g, "")} ${f.weight} ${f.style}`);
    });
    expect(faces).toContain("freight-sans-pro 400 normal");
    const weights = new Set(text.map((t) => t.weight));
    for (const w of weights) {
      const family = w === "300" ? "freight-sans-pro-lights" : "freight-sans-pro";
      expect(faces, `${family} ${w} was used but never loaded`).toContain(`${family} ${w} normal`);
    }
  });
}

test("the light face is in use somewhere, so the -lights rule is exercised", async ({ page }) => {
  await page.goto("/services");
  await page.evaluate(() => document.fonts.ready);
  const lights = await page.evaluate(
    () =>
      [...document.querySelectorAll("body *")].filter(
        (el) => getComputedStyle(el).fontWeight === "300" && el.textContent?.trim(),
      ).length,
  );
  expect(lights).toBeGreaterThan(0);
});
