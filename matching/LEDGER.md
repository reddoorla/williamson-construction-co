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

## 2026-09-30 — OD7-P2b fidelity pass

- [corrects the 2026-09-30 "type" entry] type — `freight-sans-pro` now loads
  from Reddoor's Adobe Fonts kit `noj4tji` (D8 answered; `htt1asl` stays with
  the Webflow build). Lato and its four self-hosted files are gone. Adobe
  ships Light only as the separate family `freight-sans-pro-lights`, so
  `font-light` (every weight-300 rule the reference has: `.our-mission-text`,
  `.font-weight-thin`, `.form-label`, the centred `text-size-4xl` intro) sets
  that family; otherwise Chrome synthesizes 300 from the 400 face.
  `tests/smoke/fonts.spec.ts` asserts it per text node.
- [a11y] link hover — the reference's `a:hover` (opacity 0.55, fill
  `#6d6a690f`, 0.35s/0.7s) applies to every plain link. At 0.55, with that
  fill, black text on white stays AA (4.57:1), so those links and every
  image-only link fade to exactly 0.55. Primary text on white does not
  (2.82:1), so a `--wc-link-fade` floor raises it to 0.75 (4.54:1; on
  `bg-light` 0.85), black on `bg-light` to 0.6, and white text to 0.65 for any
  link a rich-text field puts on a navy band. `tests/interaction/hovers.spec.ts`
  measures each link in the browser and refuses any value other than 0.55
  where 0.55 passes. The hover is behind `@media (hover: hover)`, like every
  Tailwind `hover:`, so a tap on a phone leaves no faded link behind.
- [corrects the 2026-09-30 "buttons" entry, in part] gold — on white and light
  grounds gold now takes the reference's own hover, gold at 55%, under navy
  text (8.9:1). On the blue grounds gold at 55% under navy is 3.13:1, below
  the 4.5:1 that 16px text needs, so it keeps the white substitute there.
  Button transitions are the reference's `background-color .2s ease-in,
opacity .25s ease-in`.
- [kept] white button (About's testimonial "Contact") and the contact page's
  outline phone buttons — the reference shows no hover on either, because
  `.button-default.bg-color-white` and `.button-default.bg-color-transparent`
  sit later in the stylesheet at the same specificity as `.button-default:hover`
  and undo it. Their siblings `.bg-color-white.ml-8:hover` and
  `.bg-color-transparent.ml-8:hover` do hover, so the missing state reads as a
  cascade accident, and both keep a hover (gold, and white at 10%). Matching
  would also need a new Prismic select option, because the phone buttons share
  `outline-light` with the hero's.
- [deviation] phase bubbles — each reference phase is three links (number,
  icon, label); the number link keeps opacity 1 (`.number-bubble:hover`, except
  phase 1, whose number is wrapped in a plain link), and the icon and label
  links fade to 0.55. The rebuild's phase is one link: its number stays at 1,
  its icon fades to 0.55 and its label to the primary floor 0.75, together.
  The reference's `a:hover` fill also replaces the number's navy (0,1,1 beats
  0,1,0), so its white number vanishes on hover; the rebuild keeps the navy.
- [kept] `.bg-color-transparent.ml-8:hover` is white at 11% (`#ffffff1c`); the
  Our Plan "Services" button shares `outline-light`'s white at 10%
  (`#ffffff1a`), 2/255 apart in alpha.
- [measured] the plan's shapes — Webflow's script writes `transition: fill
400ms` inline on every polygon and rect, so they snap to 0.6 on hover; only
  the discs fade (`opacity 400ms`). The rebuild does the same. Only the right
  slider arrow (`.icon-2`) fades to 0.8; the left one (`.icon`) has no hover.
- [corrects the 2026-09-30 "header" entry, in part] mobile menu — the
  full-screen blue dialog is replaced by the reference's IX2 `open-nav` /
  `close-nav`: a 208px white panel of four 52px links (19.2px, weight 500,
  primary) slides from -15rem to 0 under the 64px bar over 500ms `ease`. On
  open the menu icon fades out over 500ms and the close icon in over 700ms
  after 200ms; on close the close icon fades out over 700ms and the menu icon
  returns only after it, 200ms later, over 500ms. It uses the reference's own
  icon files. [deviation] One `<button>` with `aria-expanded` replaces the two
  clickable `<img>`s, and the panel is a `<nav aria-label="Menu">` list. The
  closed panel is `inert` at once and `visibility: hidden` after its slide (the
  reference only moves it). Escape closes it and returns focus, focus leaving
  the header closes it (the old dialog trapped focus instead), and
  `prefers-reduced-motion` drops the slide. The toggle fades to 0.6 on every
  hover; in the reference IX2's inline opacity beats the stylesheet's
  `.open-nav:hover` / `.close-nav:hover` after the first click, so it shows only
  before one. The panel is absolutely positioned under the bar, so the fixed
  header stays 64px tall; the reference's in-flow panel made its fixed header
  272px tall, covering clicks on the top of the page.
- [n/a] IX2 "Viewer Accordion" (events `e` / `e-2`) targets
  `data-w-id="3470f1d8-…"`, which is on none of the 14 captured pages. The
  other three click events (`e-9`, `e-11`, `e-13`) drive the mobile menu.
