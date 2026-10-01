import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DIR, PAGES } from "./harness.mjs";

const manifest = JSON.parse(readFileSync(join(DIR, "spec/manifest.json"), "utf8"));
const captured = manifest.pages.map((p) => (typeof p === "string" ? p : p.path)).sort();
const spec = readFileSync(join(DIR, "SPEC.md"), "utf8");

test("the gate's page table covers every captured reference page", () => {
  assert.deepEqual(PAGES.map((p) => p.ref).sort(), captured);
});

for (const page of PAGES) {
  test(`${page.key} has a SPEC.md section and at least one anchor`, () => {
    assert.match(spec, new RegExp(`^## ${page.key}$`, "m"));
    assert.ok(page.anchors.length > 0);
  });
}
