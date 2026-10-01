// Style-census rows the OPERATOR has looked at and chosen to keep. Same
// contract as matching/floors.mjs: nothing is hidden, everything is counted
// under its own heading, and every entry needs a LEDGER entry to stay honest.
//
//   node matching/census-count.mjs <log>   -> "<real> <ambiguous> <declared>"
//
// Without this, `census.sh` can never reach zero and an "N remaining" figure
// says nothing about how much work is left — one permanent decision is counted
// once per page per viewport, so a single ACK can account for dozens of rows.

/** A row is `{ label, ref, cand }`, each of ref/cand a "fam | wt | size | lh |
 *  ls | transform | colour" tuple string. */
const fields = (t) => t.split("|").map((f) => f.trim());
const sameExcept = (r, i, from, to) => {
  const a = fields(r.ref);
  const b = fields(r.cand);
  return (
    a.length === 7 &&
    b.length === 7 &&
    a[i] === from &&
    b[i] === to &&
    a.every((v, k) => k === i || v === b[k])
  );
};

export const DECLARED = [
  {
    ledger: "2026-09-30 OD7-P2b type: weight 300 is the -lights family in kit noj4tji",
    match: (r) => sameExcept(r, 0, "freight-sans-pro", "freight-sans-pro-lights"),
  },
  {
    ledger: "2026-09-30 a11y palette: gold text on white is --color-secondary #735a14",
    match: (r) => sameExcept(r, 6, "rgb(198, 166, 71)", "rgb(115, 90, 20)"),
  },
  {
    ledger: "2026-09-30 a11y palette: white on gold is 2.35:1, gold buttons carry navy",
    match: (r) =>
      sameExcept(r, 6, "rgb(255, 255, 255)", "rgb(0, 46, 82)") &&
      fields(r.ref).slice(1, 4).join(" ") === "500 16px 20px",
  },
  {
    ledger: "2026-09-30 our plan: the disc number is navy on gold; the shapes carry SVG step labels",
    match: (r) =>
      /^"[1-4]"$/.test(r.label) &&
      fields(r.ref).join(" ") === "freight-sans-pro 400 48px 20px ls=normal none rgb(255, 255, 255)",
  },
];
