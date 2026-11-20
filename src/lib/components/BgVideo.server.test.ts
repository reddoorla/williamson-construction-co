// @vitest-environment node
// The server render: nothing here may start a video download before the browser has
// checked whether it is an automated one (P1-119).
import { describe, it, expect } from "vitest";
import { render } from "svelte/server";
import BgVideo from "./BgVideo.svelte";

describe("BgVideo on the server", () => {
  it("puts no video source in the markup, so nothing downloads before the check runs", () => {
    const { body } = render(BgVideo, {
      props: {
        mp4: "/v/hero.mp4",
        webm: "/v/hero.webm",
        mobileMp4: "/v/hero-720.mp4",
        poster: "/p.jpg",
      },
    });
    expect(body).toContain("<video");
    expect(body).not.toContain("<source");
    expect(body).not.toMatch(/<video[^>]*\ssrc=/);
    expect(body).toContain("/p.jpg");
  });
});
