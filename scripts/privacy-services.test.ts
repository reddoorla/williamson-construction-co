// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { collectBuildServices } from "./privacy-services.ts";
import siteConfig from "../src/lib/site-config.json" with { type: "json" };

let root: string;
const put = (rel: string, text: string) => {
  mkdirSync(dirname(join(root, rel)), { recursive: true });
  writeFileSync(join(root, rel), text);
};

// SvelteKit 3: the options are top-level in sveltekit.config.js, with no `kit`.
const config = (directives: Record<string, string[]> | null) =>
  `export default { adapter: { name: "@sveltejs/adapter-netlify" }${
    directives ? `, csp: { directives: ${JSON.stringify(directives)} }` : ""
  } };`;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "privacy-"));
  put("sveltekit.config.js", config({ "frame-src": ["self"] }));
});
afterEach(() => rmSync(root, { recursive: true, force: true }));

describe("collectBuildServices", () => {
  it("reads the client hook for GA4", async () => {
    put("src/hooks.client.ts", `initAnalytics({ measurementId: "G-ABCDEFGHIJ" });`);
    expect((await collectBuildServices(root)).ga4).toBe(true);
  });

  it("does not count tests, type declarations, dev fixtures or the privacy code itself", async () => {
    const all = `initAnalytics({}); createIngestAction({ formType: "newsletter" });`;
    put("src/hooks.client.test.ts", all);
    put("src/lib/a.spec.ts", all);
    put("src/global.d.ts", all);
    put("src/routes/dev/x/+page.svelte", all);
    put("src/routes/privacy/+page.svelte", all);
    put("src/lib/privacy/services.ts", all);
    expect(await collectBuildServices(root)).toMatchObject({
      ga4: false,
      forms: false,
      newsletter: false,
    });
  });

  it("reads the CSP the config resolves to, not the text it is written in", async () => {
    put(
      "sveltekit.config.js",
      `const base = { "frame-src": ["https://*.vimeo.com"] };
export default { csp: { directives: { ...base } } };`,
    );
    expect((await collectBuildServices(root)).vimeo).toBe(true);
  });

  it("finishes on a source tree with symlink cycles", async () => {
    put("src/a/x.ts", "export {};");
    put("src/b/y.ts", "export {};");
    symlinkSync(join(root, "src"), join(root, "src/a/up"));
    symlinkSync(join(root, "src"), join(root, "src/b/up2"));
    expect((await collectBuildServices(root)).forms).toBe(false);
  });

  it("keeps a CSP with no directives from counting as a CSP", async () => {
    put("sveltekit.config.js", `export default { csp: { directives: {} } };`);
    put("src/lib/V.svelte", `<iframe src="https://player.vimeo.com/video/1"></iframe>`);
    expect((await collectBuildServices(root)).vimeo).toBe(true);
  });

  it("falls back to the source when the config sets no CSP", async () => {
    put("sveltekit.config.js", config(null));
    put("src/lib/V.svelte", `<iframe src="https://player.vimeo.com/video/1"></iframe>`);
    expect((await collectBuildServices(root)).vimeo).toBe(true);
  });
});

describe("this site itself", () => {
  const site = join(dirname(fileURLToPath(import.meta.url)), "..");

  // Evidence for each switch, read 2026-10-14:
  //   forms      — src/routes/join-the-team/+page.server.ts calls createIngestAction
  //   newsletter — no form posts formType "newsletter"
  //   ga4        — nothing calls initAnalytics yet (the analytics-tag PR follows)
  //   netlify    — sveltekit.config.js builds with @sveltejs/adapter-netlify
  //   vimeo      — the CSP's frame-src admits player.vimeo.com (VideoBand, BgVideo)
  //   youtube    — no CSP directive admits a YouTube host
  //   googleFonts— style-src admits fonts.googleapis.com, but nothing loads it
  //   adobeFonts — src/app.html loads use.typekit.net/noj4tji.css, and style-src admits it
  it("lists forms, Netlify, Vimeo, Adobe Fonts and the GA4 its hook starts, and nothing it never loads", async () => {
    expect(await collectBuildServices(site)).toEqual({
      forms: true,
      newsletter: false,
      ga4: true,
      netlify: true,
      vimeo: true,
      youtube: false,
      googleFonts: false,
      adobeFonts: true,
    });
  });

  // site-config's discloseAhead is a bridge, not a switch: once the code that
  // starts a service lands, the build derives it and the entry must go, or it
  // would keep the disclosure on after that code is removed again.
  it("discloses ahead only services the build does not yet derive", async () => {
    const built = (await collectBuildServices(site)) as unknown as Record<string, boolean>;
    const ahead = (siteConfig.privacy?.discloseAhead ?? []) as string[];
    for (const service of ahead) expect(built[service], service).toBe(false);
  });
});
