import { test } from "node:test";
import assert from "node:assert/strict";
import { declared } from "./census-deviations.mjs";

const row = (label, refs, cands, y = 100) => ({ y, label: `"${label}"`, refs, cands });
const tuple = (fam, wt, size, lh, colour) => `${fam} | ${wt} | ${size} | ${lh} | ls=normal | none | ${colour}`;
const BLUE = "rgb(0, 74, 128)";
const WHITE = "rgb(255, 255, 255)";
const NAVY = "rgb(0, 46, 82)";
const FSP = "freight-sans-pro";
const LIGHTS = "freight-sans-pro-lights";

const CASES = [
  ["the -lights family at weight 300", row("x", [tuple(FSP, 300, "18px", "40px", BLUE)], [tuple(LIGHTS, 300, "18px", "40px", BLUE)]), true],
  ["the -lights family at weight 500", row("x", [tuple(FSP, 500, "18px", "40px", BLUE)], [tuple(LIGHTS, 500, "18px", "40px", BLUE)]), false],
  ["gold text as #735a14", row("x", [tuple(FSP, 500, "45px", "60px", "rgb(198, 166, 71)")], [tuple(FSP, 500, "45px", "60px", "rgb(115, 90, 20)")]), true],
  ["navy on a gold button", row("x", [tuple(FSP, 500, "16px", "20px", WHITE)], [tuple(FSP, 500, "16px", "20px", NAVY)]), true],
  ["navy on 18px text", row("x", [tuple(FSP, 500, "18px", "20px", WHITE)], [tuple(FSP, 500, "18px", "20px", NAVY)]), false],
  ["the disc number navy, with the SVG step label", row("1", [tuple(FSP, 400, "48px", "20px", WHITE)], [tuple(FSP, 400, "18px", "20px", "rgb(0, 0, 0)"), tuple(FSP, 400, "48px", "20px", NAVY)]), true],
  ["the disc number at the wrong size", row("1", [tuple(FSP, 400, "48px", "20px", WHITE)], [tuple(FSP, 400, "18px", "20px", "rgb(0, 0, 0)"), tuple(FSP, 400, "30px", "20px", NAVY)]), false],
  ["the disc number missing", row("1", [tuple(FSP, 400, "48px", "20px", WHITE)], [tuple(FSP, 400, "18px", "20px", "rgb(0, 0, 0)")]), false],
  ["a bubble number at 400 for 500", row("1", [tuple(FSP, 500, "26px", "20px", WHITE)], [tuple(FSP, 400, "26px", "20px", WHITE)]), false],
  ["the closed mobile link absent (off canvas) beside a gold button", row("contact", [tuple(FSP, 500, "16px", "20px", WHITE), tuple(FSP, 500, "19px", "20px", BLUE)], [tuple(FSP, 500, "16px", "20px", NAVY)], -20), true],
  ["a nav link absent on the page", row("contact", [tuple(FSP, 500, "16px", "20px", WHITE), tuple(FSP, 500, "19px", "20px", BLUE)], [tuple(FSP, 500, "16px", "20px", NAVY)], 22), false],
  ["the disc-number change on another label", row("x", [tuple(FSP, 400, "48px", "20px", WHITE)], [tuple(FSP, 400, "48px", "20px", NAVY)]), false],
  ["an unledgered extra candidate", row("x", [tuple(FSP, 300, "18px", "40px", BLUE)], [tuple(LIGHTS, 300, "18px", "40px", BLUE), tuple(FSP, 400, "16px", "24px", BLUE)]), false],
];

for (const [name, r, want] of CASES) {
  test(`${want ? "declares" : "does not declare"} ${name}`, () => assert.equal(declared(r), want));
}
