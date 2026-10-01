## shared chrome

Measured 2026-10-01 from the live reference at 1440/834/390. Gated in full on
`home` and inside every page's last region (the footer anchor "Home").

**Body.** `body` sets `freight-sans-pro, sans-serif` 14px/20px, colour
`#000`, `transition: opacity .25s` (williamson-construction.shared.3b91c7675.css:2091). Root 16px. Tokens
`--primary: #004a80`, `--secondary: #c6a647` (williamson-construction.shared.3b91c7675.css:2049). No scrollbar
gutter: `body.clientWidth` equals the viewport at all three widths.

**Fonts.** The reference loads kit `htt1asl`: `freight-sans-pro` 300, 400,
500, 600, 700, each with italic, plus Google `Lato` and `Montserrat` through
`webfont.js` (loaded, never used as a computed family on any text node in the
14 pages' extracts). The candidate loads kit `noj4tji`: `freight-sans-pro`
400, 400 italic, 500, 700 and `freight-sans-pro-lights` 300 (LEDGER
2026-09-30 OD7-P2b "type").

**Header** (`section.header.max-w-1280.m-auto`, williamson-construction.shared.3b91c7675.css:5684): `position: fixed;
inset: 0 0 auto; z-index: 10; width: 100%`. A 64px `.bg-color-white.h-16.opacity-90`
row: logo link left (`.w-col-8`), four `.nav-item` links right (About,
Services, Projects, Contact; `text-color-primary`). Below 991px the links hide
and the IX2 `.open-nav` / `.close-nav` icons drive `.mobile-nav`
(williamson-construction.shared.3b91c7675.css:6740–6749, 7696–7736). The mobile menu, its timings and its deviations are
in LEDGER 2026-09-30 OD7-P2b and are not re-specified here.

**Footer** (`section.footer.bg-color-gray-300`, williamson-construction.shared.3b91c7675.css:5714, `#e2e2e2`), top to bottom:

1. `.spacer-32` — 8rem = 128px (williamson-construction.shared.3b91c7675.css:5853).
2. `.max-w-1280._w-full.m-auto.w-row`: `.column-2.w-col-6` holds the logo
   link and a `.spacer-16` (4rem, williamson-construction.shared.3b91c7675.css:5849); `.column-3.w-col-6` holds a
   right-floated vertical list of six `.text-color-black.p-6` links (Home,
   Services, About, Projects, Contact Us, Join the Team; `.p-6` = 1.5rem
   padding, williamson-construction.shared.3b91c7675.css:3952).
3. `em.italic-text` "© Williamson Construction 2023, All Rights Reserved".
4. `.spacer-8` — 2rem (williamson-construction.shared.3b91c7675.css:5988).
5. "License 976074 SBE 2019518".
6. `.spacer-32` — 128px.

Total height 736px at 1440 and 834, 1001px at 390 (the columns stack below
767px; `.column-3` and `.su-float-left-mobile` at williamson-construction.shared.3b91c7675.css:7686–7690). The text
"Home" sits 149px below the footer's top at 1440 (128 spacer + 24 padding −
line-box offset) and 374px below it at 390 (the logo column stacks first).
Typography per viewport: see `home` §14.

**Global link hover** `a:hover { opacity: .55; background-color: #6d6a690f }`
(williamson-construction.shared.3b91c7675.css:2178), with `a` transitions at williamson-construction.shared.3b91c7675.css:2165. Implemented with the floors
recorded in LEDGER 2026-09-30 OD7-P2b "link hover".

**Interaction inventory, shared chrome — 17 entries:** header 1 logo link +
4 nav links + 1 menu toggle (the reference's two IX2 icons, one `<button>` in
the rebuild) + 4 mobile-nav links = 10; footer 1 logo link + 6 text links = 7.
The menu is verified by OD7-P2b's `tests/interaction/mobile-nav.spec.ts` and
every hover by `tests/interaction/hovers.spec.ts`.
