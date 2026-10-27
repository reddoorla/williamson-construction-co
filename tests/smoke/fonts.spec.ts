import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/about-us", "/services", "/join-the-team"];

for (const path of ROUTES) {
  test(`${path} sets every visible family and weight in a loaded webfont face`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);

    const text = await page.evaluate(() => {
      const out: { weight: string; style: string; family: string; tag: string; text: string }[] =
        [];
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
          style: s.fontStyle,
          family: s.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
          tag: el.tagName.toLowerCase(),
          text: n.textContent.trim().slice(0, 40),
        });
      }
      return out;
    });
    expect(text.length).toBeGreaterThan(5);

    const faces = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts]
        .filter((f) => f.status === "loaded")
        .map((f) => `${f.family.replace(/["']/g, "")} ${f.weight} ${f.style}`);
    });
    expect(faces.length, "at least one webfont face loaded").toBeGreaterThan(0);
    const used = new Set(text.map((t) => `${t.family} ${t.weight} ${t.style}`));
    for (const face of used) {
      expect(faces, `${face} was used but never loaded`).toContain(face);
    }
  });
}
