import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

function svelteFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) svelteFiles(full, acc);
    else if (entry.name.endsWith(".svelte")) acc.push(full);
  }
  return acc;
}

describe("the page chrome", () => {
  it("renders exactly one SiteHeader, from the root layout, so there is no second sticky copy", () => {
    const uses = svelteFiles(resolve(process.cwd(), "src")).flatMap((file) =>
      [...readFileSync(file, "utf8").matchAll(/<SiteHeader\b/g)].map(() => file),
    );
    expect(uses.map((f) => f.replace(process.cwd() + "/", ""))).toEqual([
      "src/routes/+layout.svelte",
    ]);
  });
});
