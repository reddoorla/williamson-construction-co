import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/svelte";
import { tick } from "svelte";
import BgVideo from "./BgVideo.svelte";

type MediaListener = (e: { matches: boolean }) => void;

let reducedMotion = false;
const mediaListeners = new Set<MediaListener>();
let playSpy: ReturnType<typeof vi.spyOn>;
let pauseSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  reducedMotion = false;
  mediaListeners.clear();
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
    media: query,
    addEventListener: (_: string, cb: MediaListener) => mediaListeners.add(cb),
    removeEventListener: (_: string, cb: MediaListener) => mediaListeners.delete(cb),
  }));
  playSpy = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  pauseSpy = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const props = { mp4: "/v/hero.mp4", webm: "/v/hero.webm", poster: "/p.jpg" };

describe("BgVideo", () => {
  it("does not autoplay from the server markup, so motion starts only after the preference is read", () => {
    const { container } = render(BgVideo, { props });
    const video = container.querySelector("video")!;
    expect(video.hasAttribute("autoplay")).toBe(false);
    expect(video.muted).toBe(true);
  });

  it("plays on mount and offers a pause control (WCAG 2.2.2)", async () => {
    const { getByRole } = render(BgVideo, { props });
    await tick();
    expect(playSpy).toHaveBeenCalledTimes(1);
    const control = getByRole("button", { name: "Pause background video" });
    await fireEvent.click(control);
    expect(pauseSpy).toHaveBeenCalled();
    expect(getByRole("button", { name: "Play background video" })).toBeTruthy();
    await fireEvent.click(getByRole("button", { name: "Play background video" }));
    expect(playSpy).toHaveBeenCalledTimes(2);
    expect(getByRole("button", { name: "Pause background video" })).toBeTruthy();
  });

  it("stays still under prefers-reduced-motion", async () => {
    reducedMotion = true;
    const { getByRole } = render(BgVideo, { props });
    await tick();
    expect(playSpy).not.toHaveBeenCalled();
    expect(getByRole("button", { name: "Play background video" })).toBeTruthy();
  });

  it("pauses when reduced motion is switched on after load", async () => {
    const { getByRole } = render(BgVideo, { props });
    await tick();
    for (const listener of mediaListeners) listener({ matches: true });
    await tick();
    expect(pauseSpy).toHaveBeenCalled();
    expect(getByRole("button", { name: "Play background video" })).toBeTruthy();
  });

  it("shows the play control again when the browser refuses to play", async () => {
    playSpy.mockRejectedValue(new Error("NotAllowedError"));
    const { findByRole } = render(BgVideo, { props });
    expect(await findByRole("button", { name: "Play background video" })).toBeTruthy();
  });
});
