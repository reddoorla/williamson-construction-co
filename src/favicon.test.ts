import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = JSON.parse(readFileSync(join(ROOT, "matching/spec/manifest.json"), "utf8")) as {
  files: { file: string }[];
};
const captured = (name: string) => {
  const hit = MANIFEST.files.find((f) => f.file.endsWith(`/${name}`));
  if (!hit) throw new Error(`${name} is not in the capture`);
  return join(ROOT, "matching/spec", hit.file);
};
const STARTER_FAVICON_MD5 = "3a387408ecc6cc283f724b39ca5fffb4";

const html = readFileSync(join(ROOT, "src/app.html"), "utf8");
const digest = (algo: "md5" | "sha256", path: string) =>
  createHash(algo).update(readFileSync(path)).digest("hex");

function linked(rel: string): string {
  const tag = [...html.matchAll(/<link\b[^>]*>/g)]
    .map((m) => m[0])
    .find((t) => new RegExp(`\\brel="${rel}"`).test(t));
  const href = tag?.match(/\bhref="%sveltekit\.assets%\/([^"]+)"/)?.[1];
  if (!href) throw new Error(`no <link rel="${rel}"> into static/ in src/app.html`);
  return join(ROOT, "static", href);
}

describe("the site's icons are the reference's own files", () => {
  it.each([
    ["icon", "64f907571881c5058670cce8_favicon-32x32.png"],
    ["apple-touch-icon", "66d1fc8eddaa9eee71e2820f_williamsonConstruction.png"],
  ])("rel=%s serves %s byte for byte", (rel, file) => {
    const path = linked(rel);
    expect(digest("md5", path)).not.toBe(STARTER_FAVICON_MD5);
    expect(digest("sha256", path)).toBe(digest("sha256", captured(file)));
  });
});

const NETLIFY_DEFAULT_ICO_MD5 = "e0dc6025f3ad91101529eaab3879cf79";

describe("/favicon.ico", () => {
  const ico = readFileSync(join(ROOT, "static/favicon.ico"));
  const entries = Array.from({ length: ico.readUInt16LE(4) }, (_, i) => 6 + i * 16);
  const frames = entries.map((at) => ico[at] || 256);

  it("is an icon file of our own, so the host's default never answers", () => {
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(createHash("md5").update(ico).digest("hex")).not.toBe(NETLIFY_DEFAULT_ICO_MD5);
  });

  it("carries 16, 32 and 48px frames", () => {
    expect([...frames].sort((a, b) => a - b)).toEqual([16, 32, 48]);
  });

  it("its 32px frame is the reference's favicon, pixel for pixel", async () => {
    const at = entries.find((e) => ico[e] === 32);
    if (at === undefined) throw new Error("no 32px frame");
    const dib = ico.readUInt32LE(at + 12);
    expect(ico.readUInt16LE(dib + 14)).toBe(32);
    const bgra = ico.subarray(
      dib + ico.readUInt32LE(dib),
      dib + ico.readUInt32LE(dib) + 32 * 32 * 4,
    );
    const rgba = Buffer.alloc(32 * 32 * 4);
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++) {
        const from = ((31 - y) * 32 + x) * 4;
        const to = (y * 32 + x) * 4;
        rgba[to] = bgra[from + 2];
        rgba[to + 1] = bgra[from + 1];
        rgba[to + 2] = bgra[from];
        rgba[to + 3] = bgra[from + 3];
      }
    const png = await sharp(join(ROOT, "static/favicon.png")).ensureAlpha().raw().toBuffer();
    expect(rgba.equals(png)).toBe(true);
  });
});
