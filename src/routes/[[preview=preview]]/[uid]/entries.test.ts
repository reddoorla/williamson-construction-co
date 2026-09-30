import { describe, expect, it, vi } from "vitest";

vi.mock("$lib/prismicio", () => ({
  isPlaceholderRepo: false,
  createClient: () => ({
    getAllByType: async () =>
      ["home", "services", "about-us", "projects", "contact", "join-the-team"].map((uid) => ({
        uid,
      })),
  }),
}));

const { entries } = await import("./+page.server");

describe("[uid] entries", () => {
  it("prerenders every page but home and the form page, which has a route of its own", async () => {
    expect((await entries()).map((e) => e.uid)).toEqual([
      "services",
      "about-us",
      "projects",
      "contact",
    ]);
  });
});
