import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  loadPage: vi.fn(),
  loadProjectCards: vi.fn(),
}));
vi.mock("$lib/prismicio", () => ({ isPlaceholderRepo: false, createClient: () => ({}) }));
vi.mock("$lib/page-load", () => ({ loadPage: state.loadPage }));
vi.mock("$lib/projects", () => ({ loadProjectCards: state.loadProjectCards }));

const home = await import("./+page.server");
const byUid = await import("./[uid]/+page.server");

const cards = [{ id: "p1", uid: "west-high-school", title: "West High School" }];
const event = (uid?: string) =>
  ({
    params: uid ? { uid } : {},
    fetch: globalThis.fetch,
    cookies: { get: () => undefined },
  }) as never;

beforeEach(() => {
  state.loadPage
    .mockReset()
    .mockImplementation(async (_c: unknown, uid: string) => ({ page: { uid } }));
  state.loadProjectCards.mockReset().mockResolvedValue(cards);
});

describe("page loads hand the project cards to the SliceZone", () => {
  it("home carries the projects next to its page", async () => {
    const data = (await home.load(event())) as Record<string, unknown>;
    expect(state.loadPage).toHaveBeenCalledWith(expect.anything(), "home");
    expect(data.projects).toEqual(cards);
    expect(data.page).toEqual({ uid: "home" });
  });

  it("every other page carries them too", async () => {
    const data = (await byUid.load(event("about-us"))) as Record<string, unknown>;
    expect(state.loadPage).toHaveBeenCalledWith(expect.anything(), "about-us");
    expect(data.projects).toEqual(cards);
  });

  it("fails the page loud when the project query fails, rather than rendering an empty list", async () => {
    state.loadProjectCards.mockRejectedValueOnce(new Error("prismic down"));
    await expect(byUid.load(event("projects"))).rejects.toThrow("prismic down");
  });
});
