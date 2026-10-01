// Style-census rows the OPERATOR has looked at and chosen to keep. Same
// contract as matching/floors.mjs: nothing is hidden, everything is counted
// under its own heading, and every entry needs a LEDGER entry to stay honest.
//
//   node matching/census-count.mjs <log>   -> "<real> <ambiguous> <declared>"
//
// A row carries every reference and candidate element sharing its text
// (`refs`, `cands`). It is declared only when EVERY element is accounted for:
// each reference tuple has a candidate that is identical or is that tuple
// under one ledgered transformation below, and every candidate left over is a
// ledgered extra. A transformation names the exact before and after; a field
// it does not name must be equal.

const T = (s) => s.split("|").map((f) => f.trim());
const same = (a, b) => a.length === b.length && a.every((v, k) => v === b[k]);
const swap = (a, i, from, to) => (a[i] === from ? a.map((v, k) => (k === i ? to : v)) : null);

const TRANSFORMS = [
  (a) => (a[1] === "300" ? swap(a, 0, "freight-sans-pro", "freight-sans-pro-lights") : null),
  (a) => swap(a, 6, "rgb(198, 166, 71)", "rgb(115, 90, 20)"),
  (a) =>
    a.slice(1, 4).join(" ") === "500 16px 20px"
      ? swap(a, 6, "rgb(255, 255, 255)", "rgb(0, 46, 82)")
      : null,
  (a) =>
    a.slice(0, 4).join(" ") === "freight-sans-pro 400 48px 20px"
      ? swap(a, 6, "rgb(255, 255, 255)", "rgb(0, 46, 82)")
      : null,
];

const EXTRA_CAND = (label, b) =>
  /^"[1-4]"$/.test(label) &&
  same(b, T("freight-sans-pro | 400 | 18px | 20px | ls=normal | none | rgb(0, 0, 0)"));

const NAV = /^"(about|services|projects|contact)"$/;
const DROPPED_REF = (label, a) =>
  NAV.test(label) &&
  same(a, T("freight-sans-pro | 500 | 19px | 20px | ls=normal | none | rgb(0, 74, 128)"));

export function declared(r) {
  const refs = (r.refs ?? [r.ref]).filter(Boolean).map(T);
  const cands = (r.cands ?? [r.cand]).filter(Boolean).map(T);
  const used = new Set();
  let ledgered = false;
  const take = (want) => {
    const k = cands.findIndex((b, j) => !used.has(j) && same(want, b));
    if (k >= 0) used.add(k);
    return k >= 0;
  };
  for (const a of refs) {
    if (take(a)) continue;
    const hit = TRANSFORMS.some((f) => {
      const want = f(a);
      return want !== null && take(want);
    });
    if (hit) {
      ledgered = true;
      continue;
    }
    if (DROPPED_REF(r.label, a)) {
      ledgered = true;
      continue;
    }
    return false;
  }
  for (let j = 0; j < cands.length; j++) {
    if (used.has(j)) continue;
    if (!EXTRA_CAND(r.label, cands[j])) return false;
    ledgered = true;
  }
  return ledgered;
}

/** A row is `{ label, ref, cand, refs, cands }`, each tuple a "fam | wt | size |
 *  lh | ls | transform | colour" string. LEDGER entries: 2026-09-30 OD7-P2b
 *  "type" (-lights at 300), 2026-09-30 a11y palette (gold text, navy on gold
 *  buttons), 2026-09-30 "our plan" (navy disc number, SVG step labels),
 *  2026-09-30 OD7-P2b mobile menu (the closed panel is hidden, not moved off
 *  canvas), and 2026-10-01 "[census]". */
export const DECLARED = [{ match: declared }];
