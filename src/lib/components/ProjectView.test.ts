import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import ProjectView from "./ProjectView.svelte";

afterEach(() => cleanup());

const image = (name: string, alt: string | null = null) => ({
  url: `https://images.prismic.io/williamson-construction/${name}.jpg`,
  alt,
  copyright: null,
  dimensions: { width: 1600, height: 1067 },
  edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
  id: name,
});

const make = (vimeo_url: string | null) =>
  ({
    id: "p1",
    uid: "cedars-sinai-pro-building-cooling-tower-refurbishment",
    type: "project",
    data: {
      title: "Cedars-Sinai Cooling Tower Refurbishment",
      hero_image: image("hero"),
      scope: [
        {
          type: "paragraph",
          text: "Refurbish existing cooling tower equipment and piping.",
          spans: [],
        },
      ],
      vimeo_url,
      gallery: [
        { image: image("one", "Cooling tower, north") },
        { image: image("two") },
        { image: {} },
      ],
      meta_title: null,
      meta_description: null,
      meta_image: {},
    },
  }) as never;

describe("ProjectView", () => {
  it("titles the page with the project and lists its scope of work", () => {
    const { getByRole, getByText } = render(ProjectView, { props: { project: make(null) } });
    expect(getByRole("heading", { level: 1 }).textContent?.trim()).toBe(
      "Cedars-Sinai Cooling Tower Refurbishment",
    );
    expect(getByRole("heading", { level: 2, name: "Scope of Work" })).toBeTruthy();
    expect(getByText("Refurbish existing cooling tower equipment and piping.")).toBeTruthy();
  });

  it("paints the hero photo as a decorative background", () => {
    const { container } = render(ProjectView, { props: { project: make(null) } });
    const hero = container.querySelector("article img");
    expect(hero?.getAttribute("src")).toContain("/hero.jpg");
    expect(hero?.getAttribute("alt")).toBe("");
  });

  it("shows every filled gallery image, keeping editor alt text", () => {
    const { container } = render(ProjectView, { props: { project: make(null) } });
    const photos = [...container.querySelectorAll("ul img")];
    expect(photos).toHaveLength(2);
    expect(photos.map((img) => img.getAttribute("alt"))).toEqual(["Cooling tower, north", ""]);
  });

  it("embeds a Vimeo video only when the project names one", () => {
    const without = render(ProjectView, { props: { project: make(null) } });
    expect(without.container.querySelector("iframe")).toBeNull();
    cleanup();
    const withVideo = render(ProjectView, {
      props: { project: make("https://vimeo.com/1138278406?share=copy") },
    });
    const frame = withVideo.container.querySelector("iframe");
    expect(frame?.getAttribute("src")).toBe("https://player.vimeo.com/video/1138278406?dnt=1");
    expect(frame?.getAttribute("title")).toBe("Cedars-Sinai Cooling Tower Refurbishment video");
  });
});
