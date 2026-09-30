# Deviations / masks / floors ledger

Append-only, and written at the moment a decision is made — not reconstructed at
the end of a round, when the reason has already been lost. An entry is never
edited to be right: a later entry corrects an earlier one and says which.

Every entry in `matching/floors.mjs` and `matching/census-deviations.mjs`, and
every mask in `matching/harness.json`, needs a line here. Without one the gate
has been quietly widened and nothing records who widened it, or why.

- [deviation | floor | mask | a11y] `<region or selector>` — what differs, why
  it is accepted, and the evidence: a spec citation, a census row, a gate run.

## 2026-09-30 — OD7-P2 first build (site slices, before any gate run)

- [a11y] palette — the reference's `--secondary` gold `#c6a647` is 2.35:1 as
  text on white and 2.35:1 under white button text. Gold is kept as a fill
  (`--color-gold`) carrying navy `#002e52` text (5.91:1); text on white that the
  reference sets in gold uses `--color-secondary` `#735a14` (6.56:1 on white,
  5.06:1 on `--color-light`). Gold stays as text only on the blue bands and only
  at heading size (3.90:1 on primary, the large-text bar); `theme-contrast.test.ts`
  refuses a `text-gold` without a `wc-h1/2/3` class.
- [a11y] buttons — the reference's hover fills (`#c6a6478c` under white text,
  1.56:1 on white) are replaced by states `button-styles.test.ts` measures on
  every ground each variant is placed on: gold → white, white → gold,
  primary → primary/80, outline-primary → primary/15, outline-light → white/10.
- [deviation] type — `freight-sans-pro` (Adobe Fonts kit `htt1asl`, D8 open) is
  replaced by self-hosted Lato 300/400/700 and 400 italic from the capture's own
  Google Fonts files. `TODO(D8)` in `src/app.css`.
- [deviation] client logos — the reference shows them three at a time in a
  Webflow slider; they render as a wrapping row, so every logo is visible
  without a control.
- [deviation] header — one fixed bar, as the reference has. The mobile menu's
  "Services" link pointed at `/projects` in the reference; it points at
  `/services`.
- [deviation] our plan — the reference's four shapes respond to mouse clicks
  only; here they are a tablist (arrow keys, Home/End) with the selected step as
  its tabpanel, and the disc number on the gold circle is navy, not white.
- [deviation] video bands — 16:9 on mobile, 720px from `md`: the 720×480
  `home_drVid` file carries black bars top and bottom, which the reference
  hides by its band's aspect; a 400px band showed them.
- [kept] our plan — an unselected shape's fill `#005a91` on the `#004a80` band
  is 1.25:1, as in the reference. Each tab stays identifiable by its white step
  number (9.2:1) and the selected one by its gold fill (3.1:1), so the shapes
  keep the reference's colours.
- [deviation] background videos — every `BgVideo` carries a pause/play button
  (WCAG 2.2.2), which the reference does not have. Playback starts from script
  after `prefers-reduced-motion` is read, never from an `autoplay` attribute,
  and turning that setting on later pauses the video.
- [deviation] focus ring — the navy outline has a 2px white halo inside it, so
  keyboard focus shows on the navy bands too, where a navy ring alone is 1:1.
