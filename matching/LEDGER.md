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
400ms ease` inline on every polygon and rect, so they snap to 0.6 on hover;
  only the discs fade (`opacity 400ms`, `ease` by default). The rebuild uses
  the same properties, durations and `ease`. Only the right slider arrow
  (`.icon-2`) fades to 0.8; the left one (`.icon`) has no hover. A phase
  with no anchor renders as plain content and does not fade.
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
- [deviation] mobile menu, page click — a click or tap anywhere outside the
  header closes the open menu, because `<main tabindex="-1">` takes focus and
  focus leaving the header closes it. The reference's panel stays open until
  its close icon is clicked. Kept on the operator's answer to BACKLOG 52: on
  a phone, tapping the page to dismiss the menu is the expected behaviour.
  Focus falling to `<body>` (a window blur) still leaves it open.

## 2026-10-01 — matching gate, Phase 0 and the shared footer (cloud)

- [fix] scrollbar gutter — the starter's `html { scrollbar-gutter: stable }`
  reserved 15px at every width (`body.clientWidth` 1425 / 819 / 375 against
  the reference's 1440 / 834 / 390, measured headless in the gate's own
  browser). The reference reserves none, so every section was 15px narrower
  and wrapped differently. Set to `auto` site-locally (the skill's Phase 0
  step 4); `tests/smoke/gutter.spec.ts` pins it.
- [fix] footer — rebuilt to the reference's structure: 128px spacers top and
  bottom (`.spacer-32`, shared.css:5853), six `p-6` links at the global `a`
  type (500 19.2px/20px, shared.css:2165, 3952), logo column with its 4rem
  spacer (shared.css:5849), `.column-3` 40px margins when stacked
  (shared.css:7690). Was 488px tall against 736 (1001 at 390). The top
  spacing is padding on an inner `div` rather than on `<footer>`, because
  page-diff's anchor search does not look at `<footer>` elements: with the
  padding on the landmark, the "Home" cut landed 128px lower on the candidate
  than on the reference. `tests/smoke/footer.spec.ts` pins height, the Home
  link's offset and the copyright's offset at all three widths.
- [deviation] footer copyright year — the reference prints "2023" as a
  literal; the rebuild prints the current year (`SiteFooter.svelte`). A
  copyright line that goes stale every January is worse than a 4-character
  text-diff row.
- [deviation] fonts — `freight-sans-pro` comes from kit `noj4tji` on the
  candidate and `htt1asl` on the reference. Confirmed loading on the
  localhost candidate (400, 400 italic, 500, 700, and
  `freight-sans-pro-lights` 300). Advance widths differ by up to 3px per
  footer link ("Contact Us" 136 vs 133px at 19.2px), so a wrapped line can
  break one word differently. Not chased.

## 2026-10-01 — matching gate, Phase 1 for 14 pages and the first rounds (cloud)

- [harness] anchors — every page's first section (the title band) carries no
  anchor: on the candidate the first element whose text starts with the
  title is the slice wrapper at y=0, so the cut landed 540px above the
  reference's. Hero and title are scored together as `top`.
- [harness] home testimonials — no anchor. The reference prints the quote
  with straight `"` and the content carries `“ ”`, so no prefix is shared;
  the region "Committed to your" runs from the statement band through the
  photo, the testimonial and the client logos.
- [harness] services slider — anchored on its first body line ("Early
  project planning is a"), not "Phase 1: Planning": the phase bubble's
  screen-reader label reads "Phase 1: Planning" too and cut the region
  inside Phased Approach on the candidate only.
- [deviation] testimonial quote marks — `“ ”` in the content, `"` on the
  reference. Typographic; a content edit if anyone wants it.
- [corrects the 2026-09-30 "video bands" entry] video bands are
  `.ratio-box-2._2-1` (padding-top 50%, shared.css:6153) at every width:
  720/417/195px. A 2:1 crop of the 720×480 file hides its bars at every
  width, so the 16:9 / 720px rule is gone. About's band is `_16-9` with
  `.offset-up` (below).
- [structure] one slice type, several reference sections — Headline is four
  sections on the reference (home `.rebuild-spaces-section`, services
  `.areas-of-section` and `.phases-expanded-section`, contact
  `.project-goals-section`), VideoBand two (`_2-1`, and about's `_16-9`
  `.offset-up`), and PageHero's body is `.text-size-3xl` everywhere but home,
  with about's h1/aside dropping their margins below 767. No field tells
  them apart, so the rebuild picks by the slice that follows (CSS
  `:has(+ …)`), which today's content fixes. A Prismic slice variation
  would say it explicitly but needs a content edit in four documents
  (BACKLOG Operator decisions).
- [deviation] slider controls — testimonials and phase slider keep the
  shared Slider's one row (pause, previous, dots, next), pinned to the
  box's foot where the reference has its dots; the reference has 80px
  full-height side arrows. The pause button is WCAG 2.2.2 for an
  auto-advancing carousel.
- [a11y] ghost button — the reference's `.bg-color-transparent.text-color-
primary` has a white border with a primary bottom edge (shared.css:5966,
  :5924): on white the boundary is the bottom edge only.
  `button-styles.test.ts` measures each variant's boundary at 3:1, so it
  keeps a full primary border.
- [a11y] trade-partner form — the reference's 1px `#ccc` input border is
  1.6:1 on white; inputs keep the 2px `--color-secondary` border (4.8:1).
  The rebuild adds a "* marks a required field" line, shows "For example,
  5K to 100K" as a description where the reference uses a placeholder (not
  an accessible label), a Turnstile widget, and a "Questions? Email us at"
  line. Together 80–175px of height in the join region.
- [deviation] content — the reference's Providence Hospital scope ends in
  an empty `<p>&zwj;</p>` (45px on /projects); the migrated content does
  not carry it.
- [deviation] header — the current page's nav link is underlined
  (`aria-current`); the reference shows no current state.
- [deviation] projects alternation — the reference moves every second
  caption box left from an inline jQuery `onresize` handler above 992px;
  here it is CSS (`nth-child(even)` from 993px), no runtime.
- [census] `matching/census-deviations.mjs` declares four row classes, each an
  exact before/after pair with every other field equal: weight 300 set in
  `freight-sans-pro-lights` (2026-09-30 "type"), gold text `#c6a647` →
  `#735a14` and white-on-gold button text → navy `#002e52` (2026-09-30
  a11y palette), and Our Plan's disc number in navy with the SVG step
  labels (2026-09-30 "our plan"). Census 2026-10-01 at `659f9a7`: 92 rows,
  87 of them in these classes; the other five were the phase-bubble
  numbers at weight 400 where the reference's link gives them 500, fixed.

## 2026-10-01 — after the three-lens review of 205608d..a90b17a

- [corrects the 2026-10-01 "[a11y] ghost button" entry] there is no
  deviation. `.button-default.bg-color-transparent.text-color-primary`
  (shared.css:5979, three classes) sets `border-color: var(--primary)` and
  outranks the two-class rules :5966 and :5924 that entry cited, so the
  reference's border is primary all round. a48d2c1's bottom-edge-only
  border was wrong; 16b293d's full primary border is the reference, kept
  for the wrong stated reason.
- [corrects the 2026-10-01 "[census]" entry] the figures were not a census
  after the fix. Recounted over the same logs (all taken before b241c57):
  92 rows, 77 declared, 15 real, the 15 being the phase-bubble numbers at
  three viewports. The declarations were also wider than that entry said:
  the disc-number one never looked at the candidate, and the `-lights` one
  did not require weight 300. `census-deviations.mjs` now declares a row
  only when every reference element is matched by an identical candidate
  or by one named transformation, and every leftover candidate is a named
  extra; `census-deviations.test.mjs` (node --test) pins eleven cases, and
  dropping the weight guard or the extra-candidate check each turns one
  red. `census-count.mjs` passes every element of a row (it kept the first
  of each) and parses a negative `y`. Known limit: the tuple carries no
  background, so a gold-to-#735a14 swap on a navy band would also be
  declared; none exists today.
- [census] the closed mobile menu — the reference's off-canvas `.mobile-nav`
  links are in the DOM at 19.2px primary; the rebuild's closed panel is
  hidden (2026-09-30 OD7-P2b "mobile menu"). Declared only as a reference
  element with no candidate, on the four nav labels.
- [structure] PhaseDetail picks the last phase section (12rem below, not
  15rem; shared.css:6867) by sibling order, the same content-order
  dependence as the `:has(+ …)` cases above.
- [a11y] slider dots — the reference's inactive `.w-slider-dot` is `#fff6`,
  2.62:1 on the `#004a80f2` box; inactive dots are white at 60% (4.0:1).
- [deviation] fixed heights that clip — the reference's slides are 20rem
  (phase slider) and 30rem (testimonials) with the mask's overflow hidden,
  which at 390 clips its own "See More" button, a focusable control. The
  rebuild's slides are `min-height` at those values: identical wherever
  the content fits, taller where it does not.
  `tests/interaction/slider-content.spec.ts` checks every slide at three
  widths. Our Plan's 24rem panel goes in flow below 992 the same way, and
  its buttons wrap.
- [corrects the 2026-10-01 "[a11y] trade-partner form" entry, in part] the
  2px `--color-secondary` border is `#735a14`, 6.56:1 on white, not 4.8:1.
- [fix] `.w-container`'s `max-width: none` is the 479 rule (shared.css:929),
  not 767; the radio labels take `.form-input-container`'s 1rem bottom
  margin (:6942), not `.w-radio`'s 5px; at exactly 992px every caption box
  sits left, as the reference's script's else branch does.
- [measured] footer: the logo column's 83px below 768 is `.spacer-16` (64px)
  plus the empty second logo link's 20px line box, less a 1px line-box
  rounding; `md:pr-[10px]` is `.w-col`'s 10px padding (shared.css:725).
- [errata] commit text, not code: d3c1a69 credits the footer links' 20px
  line-height to the `a` rule (:2165); it is `body` (:2091). 659f9a7 cites
  :5684 for the nav type; the column is `.w-col-medium-6` (:824) with
  `.p-2` (:3936) on the icon holder. a923409 says nine geometry cases;
  a90b17a added a tenth.

## 2026-10-01 — round-2 review findings, fixed and unreviewed

- [a11y] slider controls over slide content — with min-height slides, the
  tallest phase slide's See More button reached the region's foot, where
  the absolutely placed controls row sat over it and took its clicks; on
  about's heading slides the controls sat over the Contact button at 390.
  The row now passes pointer events through except on its own buttons, and
  below 768 the phase slider (32px) and heading slides (24px) reserve room
  for it. `slider-content.spec.ts` checks no slide link sits under a
  control (M18, M19 red).
- [fix] the phase icon's offsets are fixed px (-16rem, -10rem at 991, -14rem
  at 767: 80/50/70% of the 20rem slide, shared.css:6819, :7324, :7740), so
  a taller slide no longer moves or clips its icon.
- [fix] Webflow's `max-width: 991/767/479px` include those widths; Tailwind's
  `max-[Npx]` is `width < N`, so every variant moved to 992/768/480. The
  matrix widths do not change; 991, 767 and 479 now match.
- [census] the closed-menu declaration only applies off canvas (y < 0), and
  the disc-number transformation only to labels 1–4.
- [deviation] gate r7 on 7db29f3: services' slider region and home's
  "Committed to your" fail at 390 on height alone, because the slides grow
  rather than clip (see the "fixed heights that clip" entry).
