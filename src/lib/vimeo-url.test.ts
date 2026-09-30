import { describe, expect, it } from "vitest";
import { vimeoEmbedUrl, vimeoId } from "./vimeo-url";

describe("vimeoId", () => {
  it("reads the id from a share link, a player link and a bare link", () => {
    expect(vimeoId("https://vimeo.com/1138278406?share=copy&fl=sv&fe=ci")).toBe("1138278406");
    expect(vimeoId("https://player.vimeo.com/video/1138278406")).toBe("1138278406");
    expect(vimeoId(" https://www.vimeo.com/1138278406 ")).toBe("1138278406");
  });

  it("refuses anything that is not a Vimeo video", () => {
    expect(vimeoId("https://youtube.com/watch?v=1138278406")).toBeNull();
    expect(vimeoId("https://vimeo.com.evil.test/1138278406")).toBeNull();
    expect(vimeoId("")).toBeNull();
    expect(vimeoId(null)).toBeNull();
  });

  it("embeds with do-not-track", () => {
    expect(vimeoEmbedUrl("https://vimeo.com/1138278406")).toBe(
      "https://player.vimeo.com/video/1138278406?dnt=1",
    );
  });
});
