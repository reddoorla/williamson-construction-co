## contact

Reference `https://www.williamson-construction.com/contact` (captured `matching/spec/pages/contact/index.html`); candidate `/dev/match/contact`.
Root font-size 16px @1440, 16px @834, 16px @390. Reference document height 2424 @1440, 2504 @834, 2863 @390.

<!-- notes -->
<!-- /notes -->

### Section census — 5 sections (`body > section`, the fixed header excluded)

Gate anchors (harness.json): "We care more about your project", "Brian Williamson", "Home". A section with no text of its own cannot carry an anchor and is scored inside the region above it.

1. `hero-section.overflow-hidden.position-relative` — no text (scored in the region above) — y+h 0+700 / 0+500 / 0+500 (1440 / 834 / 390)
2. `title-section` — "Contact us for your next project, start feeling like a prior" — y+h 540+380 / 340+360 / 364+388 (1440 / 834 / 390)
3. `project-goals-section.su-py-8-desk-4-mobile` — "We care more about your project goals than our profit margin" — y+h 920+186 / 724+186 / 752+244 (1440 / 834 / 390)
4. `meeting-cols` — "Brian Williamson" — y+h 1106+518 / 910+794 / 996+802 (1440 / 834 / 390)
5. `footer.bg-color-gray-300` — "Home" — y+h 1688+736 / 1768+736 / 1862+1001 (1440 / 834 / 390)

#### 1. hero-section.overflow-hidden.position-relative

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (4):
  - `.hero-section` — williamson-construction.shared.3b91c7675.css:5805 { background-color: var(--primary); max-height: 90vh; }
  - `.hero-section.overflow-hidden.position-relative` — williamson-construction.shared.3b91c7675.css:5810 { object-fit: cover; background-color: #0000; justify-content: center; align-items: center; height: 700px; min-height: 400px; max-height: 700px; display }
  - `.bg-projects-template` — williamson-construction.shared.3b91c7675.css:6412 { object-fit: fill; width: 100%; position: relative; inset: 0% auto 0% 0%; transform: scale(1.1); }
  - `.hero-section.overflow-hidden.position-relative` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7206 { height: 500px; min-height: 400px; max-height: 700px; }
- Hover rules: none class-specific.
- Assets: `img 64dfdff53fe087da21beea87_beautifulMinds.jpg`.

#### 2. title-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (14):
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.text-color-white.text-align-left.m-6` — williamson-construction.shared.3b91c7675.css:4325 { margin-top: 1.5rem; }
  - `.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:4468 { background-color: #0000; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` — williamson-construction.shared.3b91c7675.css:5703 { margin-top: -160px; margin-bottom: 0; padding-top: 20px; padding-bottom: 20px; }
  - `.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5776 { background-color: var(--primary); }
  - `.bg-color-primary.opacity-90` — williamson-construction.shared.3b91c7675.css:5780 { background-color: var(--primary); opacity: .9; }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.mr-8` — williamson-construction.shared.3b91c7675.css:5929 { border: 2px solid var(--secondary); }
  - `.button-default.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5946 { border-color: var(--primary); background-color: var(--primary); font-size: 1rem; }
  - `.button-default.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:5966 { background-color: #0000; border-color: #fff; }
  - `.text-color-white.text-align-left.m-6` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7118 { margin-top: 1.5rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7160 { width: auto; margin-left: 4%; margin-right: 4%; padding-bottom: 0; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7897 { padding-top: 0; padding-bottom: .5rem; }
  - `.button-default.mr-8` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7907 { margin-right: 0; }
- Hover rules: `.button-default:hover` (:5894), `.button-default.bg-color-primary.mr-8:hover` (:5952); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 62px/78px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.text-align-left "Contact us for your next project, start feel"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.mb-4.w-button "Email us"
- Typography @834:
  - freight-sans-pro 500 55px/60px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.text-align-left "Contact us for your next project, start feel"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.mb-4.w-button "Email us"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.text-align-left "Contact us for your next project, start feel"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.mb-4.w-button "Email us"
- Interactive (2): `a.button-default.mr-8.mb-4 → mailto:info@williamson-construction.com "Email us"`; `a.button-default.mr-8.bg-color-transparent → tel:310.570.7278 "310.570.7278"`.

#### 3. project-goals-section.su-py-8-desk-4-mobile

- Box @1440: margin 0px / 0px, padding 32px 0px 32px 0px, bg rgba(0, 0, 0, 0).
- Box @390: margin 0px / 0px, padding 16px 0px 16px 0px, bg rgba(0, 0, 0, 0).
- Source rules (9):
  - `._w-60pc` — williamson-construction.shared.3b91c7675.css:3465 { width: 60%; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.content-width.text-color-primary.mx-8` — williamson-construction.shared.3b91c7675.css:5757 { font-size: 35px; line-height: 45px; }
  - `.content-width.text-color-primary.mx-8._w-60pc` — williamson-construction.shared.3b91c7675.css:5762 { margin-bottom: 2rem; }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.content-width.text-color-primary.mx-8._w-40pc.pb-8, .content-width.text-color-primary.mx-8._w-60pc` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7186 { width: 80%; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
  - `.content-width.text-color-primary.mx-8._w-60pc` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7629 { width: 90%; }
- Hover rules: none class-specific.
- Typography @1440:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.content-width.text-color-primary.mx-8._w-60pc "We care more about your project goals than o"
- Typography @834: as @1440.
- Typography @390: as @1440.

#### 4. meeting-cols

- Box @1440: margin 0px / 64px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (22):
  - `._w-half` — williamson-construction.shared.3b91c7675.css:2854 { width: 50%; }
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.text-color-white.text-align-left.pt-8.my-8` — williamson-construction.shared.3b91c7675.css:4321 { margin-top: 0; }
  - `.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:4468 { background-color: #0000; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.button-default.mr-8` — williamson-construction.shared.3b91c7675.css:5929 { border: 2px solid var(--secondary); }
  - `.button-default.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:5966 { background-color: #0000; border-color: #fff; }
  - `.button-default.bg-color-transparent.text-color-primary` — williamson-construction.shared.3b91c7675.css:5979 { border-color: var(--primary); color: var(--primary); }
  - `.meeting-cols` — williamson-construction.shared.3b91c7675.css:6726 { margin-bottom: 4rem; }
  - `.info-block` — williamson-construction.shared.3b91c7675.css:6730 { background-color: var(--primary); margin-bottom: 2rem; padding: 0 2rem 1rem; }
  - `.big-head` — williamson-construction.shared.3b91c7675.css:6736 { width: 60%; }
  - `._w-half.p-4.su-w-full-tablet` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7043 { width: 100%; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.content-width.display-flex.su-flex-v-tablet` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7190 { align-items: center; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
  - …and 4 more (grep the stylesheet for the classes above).
- Hover rules: `.button-default:hover` (:5894), `.button-default.bg-color-transparent.text-color-primary:hover` (:5984); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 45px/60px ls=normal rgb(0, 74, 128) center — h2.mt-4.text-color-primary "Brian Williamson"
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h3.text-color-primary "CEO"
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h3.text-color-white.text-align-left.pt-8.my-8 "Call to set up a meeting"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white "All we need is a few minutes to setup a meet"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.mb-4.w-button "Email me"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(0, 74, 128) — p.text-color-primary "info@williamson-construction.com 14701 Hawth"
- Typography @834:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.mt-4.text-color-primary "Brian Williamson"
  - freight-sans-pro 500 30px/35px ls=normal rgb(0, 74, 128) center — h3.text-color-primary "CEO"
  - freight-sans-pro 500 30px/35px ls=normal rgb(255, 255, 255) left — h3.text-color-white.text-align-left.pt-8.my-8 "Call to set up a meeting"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white "All we need is a few minutes to setup a meet"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.mb-4.w-button "Email me"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(0, 74, 128) — p.text-color-primary "info@williamson-construction.com 14701 Hawth"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.mt-4.text-color-primary "Brian Williamson"
  - freight-sans-pro 500 25px/30px ls=normal rgb(0, 74, 128) center — h3.text-color-primary "CEO"
  - freight-sans-pro 500 25px/30px ls=normal rgb(255, 255, 255) left — h3.text-color-white.text-align-left.pt-8.my-8 "Call to set up a meeting"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(255, 255, 255) — p.text-color-white "All we need is a few minutes to setup a meet"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.mb-4.w-button "Email me"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(0, 74, 128) — p.text-color-primary "info@williamson-construction.com 14701 Hawth"
- Assets: `img 646d47bfeb53b0308e8d439c_williamson_actuallybrian-p-500.png`.
- Interactive (2): `a.button-default.mr-8.mb-4 → mailto:info@williamson-construction.com "Email me"`; `a.button-default.mr-8.bg-color-transparent → tel:310.570.7278 "310.570.7278"`.

#### 5. footer.bg-color-gray-300

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
- Interactive (7): `a.w-inline-block → / ""`; `a.text-color-black.p-6 → / "Home"`; `a.text-color-black.p-6 → /services "Services"`; `a.text-color-black.p-6 → /about-us "About"`; `a.text-color-black.p-6 → /projects "Projects"`; `a.text-color-black.p-6.w--current → /contact "Contact Us"`; `a.text-color-black.p-6 → /join-the-team "Join the Team"`.

### Interaction inventory — 11 entries on this page (shared header/footer counted in shared chrome)

Every link, slider control, video and data-w-id target inside the census sections above. Phase 5 verifies exactly this many.
