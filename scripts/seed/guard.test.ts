import { describe, expect, it } from "vitest";

import { alreadySeeded } from "./guard.mjs";

const fake = (status: number, items: Array<{ filename: string }>) =>
  (async () =>
    new Response(JSON.stringify({ total: 4, items }), { status })) as unknown as typeof fetch;

const options = {
  repositoryName: "williamson-construction",
  writeToken: "t",
  filename: "x_employee-app.pdf",
};

describe("alreadySeeded", () => {
  it("is true when the seed's own file is in the media library", async () => {
    expect(
      await alreadySeeded({ ...options, fetch: fake(200, [{ filename: "x_employee-app.pdf" }]) }),
    ).toBe(true);
  });

  it("is false on a keyword match that is not the file, even when total says otherwise", async () => {
    expect(
      await alreadySeeded({
        ...options,
        fetch: fake(200, [{ filename: "x_employee-app-v2.pdf" }]),
      }),
    ).toBe(false);
    expect(await alreadySeeded({ ...options, fetch: fake(200, []) })).toBe(false);
  });

  it("refuses to guess when the Asset API fails", async () => {
    await expect(alreadySeeded({ ...options, fetch: fake(401, []) })).rejects.toThrow(/401/);
  });
});
