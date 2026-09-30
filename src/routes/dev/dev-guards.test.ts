import { afterEach, describe, expect, it, vi } from "vitest";
import { isHttpError } from "@sveltejs/kit";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const env = vi.hoisted(() => ({ dev: false }));
vi.mock("$app/environment", () => ({
  get dev() {
    return env.dev;
  },
  browser: false,
  building: false,
}));

const layout = await import("./+layout.server");
const spec = await import("./spec/[...path]/+server");
const match = await import("./match/[uid]/+page.server");

async function statusOf(run: () => unknown): Promise<number | "resolved"> {
  try {
    await run();
    return "resolved";
  } catch (err) {
    if (isHttpError(err)) return err.status;
    throw err;
  }
}

function firstSvg(): string {
  const dir = resolve(process.cwd(), "matching/spec/files");
  const hit = readdirSync(dir, { recursive: true, encoding: "utf8" }).find((f) =>
    f.endsWith(".svg"),
  );
  if (!hit) throw new Error("no svg in the capture");
  return hit;
}

const specGet = (path: string) => () => spec.GET({ params: { path } } as never);
const matchLoad = (uid: string) => () =>
  match.load({ params: { uid }, url: new URL("http://localhost:5173/dev/match/" + uid) } as never);

afterEach(() => {
  env.dev = false;
  vi.unstubAllEnvs();
});

describe("/dev on a production build", () => {
  it("the layout guard 404s every child route", async () => {
    expect(await statusOf(() => layout.load())).toBe(404);
  });

  it("/dev/spec 404s before touching the filesystem", async () => {
    expect(await statusOf(specGet("manifest.json"))).toBe(404);
  });

  it("/dev/match 404s before reading the capture", async () => {
    expect(await statusOf(matchLoad("home"))).toBe(404);
  });
});

describe("/dev on the dev server", () => {
  it("/dev/spec serves a captured file, the control for the refusals below", async () => {
    env.dev = true;
    const res = (await spec.GET({ params: { path: "files/" + firstSvg() } } as never)) as Response;
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
  });

  it("the layout guard lets the fixtures through", async () => {
    env.dev = true;
    expect(await statusOf(() => layout.load())).toBe("resolved");
  });

  it("/dev/spec refuses a path that climbs out of matching/spec", async () => {
    env.dev = true;
    expect(await statusOf(specGet("../../static/images/wcc-logo.svg"))).toBe(404);
  });

  it("/dev/spec refuses a file type it does not serve", async () => {
    env.dev = true;
    expect(await statusOf(specGet("CAPTURE.md"))).toBe(404);
  });
});
