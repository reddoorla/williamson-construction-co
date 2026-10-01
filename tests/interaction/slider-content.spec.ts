import { expect, test, type Page } from "@playwright/test";

async function clipped(page: Page, slice: string) {
  return page.evaluate((slice) => {
    const root = document.querySelector(`[data-slice-type="${slice}"]`)!;
    const slides = [...root.querySelectorAll('[role="group"]')];
    let track: Element | null = slides[0].parentElement;
    while (track && getComputedStyle(track).overflow !== "hidden") track = track.parentElement;
    const t = track!.getBoundingClientRect();
    const out: string[] = [];
    slides.forEach((slide, i) => {
      for (const el of slide.querySelectorAll("h3, p, blockquote, a")) {
        const r = el.getBoundingClientRect();
        if (r.height === 0) continue;
        if (r.top < t.top - 0.5 || r.bottom > t.bottom + 0.5)
          out.push(
            `slide ${i + 1} <${el.tagName.toLowerCase()}> ${Math.round(r.top - t.top)}..${Math.round(r.bottom - t.top)} of ${Math.round(t.height)}`,
          );
      }
    });
    return out;
  }, slice);
}

for (const width of [390, 834, 1440]) {
  test(`at ${width}px no slide clips its own content`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/dev/match/services");
    expect(await clipped(page, "phase_slider")).toEqual([]);
    await page.goto("/dev/match/home");
    expect(await clipped(page, "quote_slider")).toEqual([]);
    await page.goto("/dev/match/about-us");
    expect(await clipped(page, "quote_slider")).toEqual([]);
  });
}
