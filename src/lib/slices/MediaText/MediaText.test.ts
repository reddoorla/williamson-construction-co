import { render } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import type { Content } from "@prismicio/client";
import MediaText from "./index.svelte";

function makeSlice(variation: "imageRight" | "imageLeft") {
  return {
    slice_type: "media_text",
    variation,
    primary: {
      heading: [{ type: "heading2", text: "Amenities", spans: [] }],
      body: [{ type: "paragraph", text: "A resort-style pool.", spans: [] }],
      media: {
        url: "https://img.example/pool.jpg",
        alt: "Pool",
        dimensions: { width: 800, height: 600 },
      },
    },
    items: [],
  } as unknown as Content.MediaTextSlice;
}

describe("MediaText slice", () => {
  it("renders heading, body, and image with alt", () => {
    const { getByRole } = render(MediaText, {
      props: { slice: makeSlice("imageRight") },
    });
    expect(getByRole("heading", { level: 2 }).textContent).toContain("Amenities");
    expect(getByRole("img").getAttribute("alt")).toBe("Pool");
  });

  it("puts the media ahead of the copy on large screens for imageLeft", () => {
    // The editor's imageLeft choice must change the desktop order: the media
    // column's lg:order sorts before the copy column's. A relation between the
    // two columns, not a pinned value.
    const { container } = render(MediaText, {
      props: { slice: makeSlice("imageLeft") },
    });
    const lgOrder = (el: Element | null) => {
      const m = [...(el?.classList ?? [])].map((c) => c.match(/^lg:order-(\d+)$/)).find(Boolean);
      return m ? Number(m[1]) : 0; // CSS order defaults to 0
    };
    const media = container.querySelector(".mt-media");
    const copy = container.querySelector(".mt-copy");
    expect(media).not.toBeNull();
    expect(copy).not.toBeNull();
    expect(lgOrder(media)).toBeLessThan(lgOrder(copy));
  });
});
