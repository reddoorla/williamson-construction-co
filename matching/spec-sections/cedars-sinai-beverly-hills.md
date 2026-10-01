## cedars-sinai-beverly-hills

Reference `https://www.williamson-construction.com/projects/cedars-sinai-beverly-hills` (captured `matching/spec/pages/projects/cedars-sinai-beverly-hills/index.html`); candidate `/dev/match/cedars-sinai-beverly-hills`.
Root font-size 16px @1440, 16px @834, 16px @390. Reference document height 3508 @1440, 2728 @834, 2502 @390.

<!-- notes -->
<!-- /notes -->

### Section census — 4 sections (`body > section`, the fixed header excluded)

Gate anchors (harness.json): "Home". A section with no text of its own cannot carry an anchor and is scored inside the region above it.

1. `hero-section.overflow-hidden.position-relative` — no text (scored in the region above) — y+h 0+700 / 0+500 / 0+500 (1440 / 834 / 390)
2. `title-section` — "Cedars-Sinai, Beverly Hills" — y+h 540+269 / 340+284 / 340+385 (1440 / 834 / 390)
3. `gallery-section` — no text (scored in the region above) — y+h 873+1835 / 688+1240 / 789+647 (1440 / 834 / 390)
4. `footer.bg-color-gray-300` — "Home" — y+h 2772+736 / 1992+736 / 1501+1001 (1440 / 834 / 390)

#### 1. hero-section.overflow-hidden.position-relative

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (4):
  - `.hero-section` — williamson-construction.shared.3b91c7675.css:5805 { background-color: var(--primary); max-height: 90vh; }
  - `.hero-section.overflow-hidden.position-relative` — williamson-construction.shared.3b91c7675.css:5810 { object-fit: cover; background-color: #0000; justify-content: center; align-items: center; height: 700px; min-height: 400px; max-height: 700px; display }
  - `.bg-projects-template` — williamson-construction.shared.3b91c7675.css:6412 { object-fit: fill; width: 100%; position: relative; inset: 0% auto 0% 0%; transform: scale(1.1); }
  - `.hero-section.overflow-hidden.position-relative` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7206 { height: 500px; min-height: 400px; max-height: 700px; }
- Hover rules: none class-specific.
- Assets: `img 64dfc30498546f189bf235e3_cedarsBHWilshire-p-1600.jpg`.

#### 2. title-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (12):
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.text-color-white.text-align-left.mt-8` — williamson-construction.shared.3b91c7675.css:4317 { margin-top: 2rem; }
  - `.text-color-white.text-align-left.m-6` — williamson-construction.shared.3b91c7675.css:4325 { margin-top: 1.5rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` — williamson-construction.shared.3b91c7675.css:5703 { margin-top: -160px; margin-bottom: 0; padding-top: 20px; padding-bottom: 20px; }
  - `.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5776 { background-color: var(--primary); }
  - `.bg-color-primary.opacity-90` — williamson-construction.shared.3b91c7675.css:5780 { background-color: var(--primary); opacity: .9; }
  - `.bold-text` — williamson-construction.shared.3b91c7675.css:6499 { font-weight: 600; }
  - `.text-color-white.p-2.m-6.projects` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7113 { font-size: 40px; line-height: 55px; }
  - `.text-color-white.text-align-left.m-6` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7118 { margin-top: 1.5rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7160 { width: auto; margin-left: 4%; margin-right: 4%; padding-bottom: 0; }
  - `.text-color-white.p-2.m-6.projects` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7812 { margin-left: 0; margin-right: 0; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7897 { padding-top: 0; padding-bottom: .5rem; }
- Hover rules: none class-specific.
- Typography @1440:
  - freight-sans-pro 500 62px/78px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.projects.text-align-left "Cedars-Sinai, Beverly Hills"
  - freight-sans-pro 600 22px/35.2px ls=normal rgb(255, 255, 255) — p.mt-8.pt-4.bold-text "Scope of Work"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p "Mink Radiology"
- Typography @834:
  - freight-sans-pro 500 40px/55px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.projects.text-align-left "Cedars-Sinai, Beverly Hills"
  - freight-sans-pro 600 22px/35.2px ls=normal rgb(255, 255, 255) — p.mt-8.pt-4.bold-text "Scope of Work"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p "Mink Radiology"
- Typography @390:
  - freight-sans-pro 500 40px/55px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.projects.text-align-left "Cedars-Sinai, Beverly Hills"
  - freight-sans-pro 600 18px/28.8px ls=normal rgb(255, 255, 255) — p.mt-8.pt-4.bold-text "Scope of Work"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(255, 255, 255) — p "Mink Radiology"

#### 3. gallery-section

- Box @1440: margin 64px / 64px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (3):
  - `.gallery-section` — williamson-construction.shared.3b91c7675.css:6420 { width: 100%; max-width: 1280px; margin: 4rem auto; }
  - `.vimeo-iframe` — williamson-construction.shared.3b91c7675.css:7018 { margin-bottom: 0; padding-bottom: 0; }
  - `.collection-list-wrapper` — williamson-construction.shared.3b91c7675.css:7023 { margin-top: 60px; }
- Hover rules: none class-specific.
- Assets: `img 64dfc30c3e972341f1ad5b0c_cedarsBHSign-p-1600.jpg`, `img 64dfc319688272920a143a35_cedarsBHOEC-p-1600.jpg`.

#### 4. footer.bg-color-gray-300

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgb(226, 226, 226).
- Box @834: margin 0px / 0px, padding 0px 33.3594px 0px 33.3594px, bg rgb(226, 226, 226).
- Box @390: margin 0px / 0px, padding 0px 15.5938px 0px 15.5938px, bg rgb(226, 226, 226).
- Source rules (6):
  - `.text-color-black` — williamson-construction.shared.3b91c7675.css:4309 { color: #000; }
  - `.bg-color-gray-300` — williamson-construction.shared.3b91c7675.css:5270 { background-color: #e2e8f0; }
  - `.footer.bg-color-gray-300` — williamson-construction.shared.3b91c7675.css:5714 { background-color: #e2e2e2; }
  - `.column-2` — williamson-construction.shared.3b91c7675.css:6439 { padding-left: 0; }
  - `.footer.bg-color-gray-300` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7167 { padding-left: 4%; padding-right: 4%; }
  - `.column-3` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7690 { margin-top: 40px; margin-bottom: 40px; padding-left: 0; }
- Hover rules: none class-specific; plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 19.2px/20px ls=normal rgb(0, 0, 0) — a.text-color-black.p-6 "Home"
  - freight-sans-pro 400 italic 14px/20px ls=normal rgb(0, 0, 0) — em.italic-text "© Williamson Construction 2023, All Rights R"
  - freight-sans-pro 400 14px/20px ls=normal rgb(0, 0, 0) — div.max-w-1280._w-full.m-auto "License 976074 SBE 2019518"
- Typography @834: as @1440.
- Typography @390: as @1440.
- Assets: `img 6514801e11f270f8acfd0544_wcc-logo.svg`.
- Interactive (7): `a.w-inline-block → / ""`; `a.text-color-black.p-6 → / "Home"`; `a.text-color-black.p-6 → /services "Services"`; `a.text-color-black.p-6 → /about-us "About"`; `a.text-color-black.p-6 → /projects "Projects"`; `a.text-color-black.p-6 → /contact "Contact Us"`; `a.text-color-black.p-6 → /join-the-team "Join the Team"`.

### Interaction inventory — 7 entries on this page (shared header/footer counted in shared chrome)

Every link, slider control, video and data-w-id target inside the census sections above. Phase 5 verifies exactly this many.
