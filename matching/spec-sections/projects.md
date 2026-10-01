## projects

Reference `https://www.williamson-construction.com/projects` (captured `matching/spec/pages/projects/index.html`); candidate `/dev/match/projects`.
Root font-size 16px @1440, 16px @834, 16px @390. Reference document height 9901 @1440, 8347 @834, 7502 @390.

<!-- notes -->
<!-- /notes -->

### Section census — 4 sections (`body > section`, the fixed header excluded)

Gate anchors (harness.json): "Featured Projects", "Home". A section with no text of its own cannot carry an anchor and is scored inside the region above it.

1. `hero-section.overflow-hidden.position-relative` — no text (scored in the region above) — y+h 0+700 / 0+500 / 0+500 (1440 / 834 / 390)
2. `title-section` — "We build spaces that teach and heal our community." — y+h 540+296 / 340+468 / 340+363 (1440 / 834 / 390)
3. `projects-section` — "Featured Projects" — y+h 836+8297 / 808+6739 / 703+5734 (1440 / 834 / 390)
4. `footer.bg-color-gray-300` — "Home" — y+h 9165+736 / 7611+736 / 6501+1001 (1440 / 834 / 390)

#### 1. hero-section.overflow-hidden.position-relative

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (4):
  - `.hero-section` — williamson-construction.shared.3b91c7675.css:5805 { background-color: var(--primary); max-height: 90vh; }
  - `.hero-section.overflow-hidden.position-relative` — williamson-construction.shared.3b91c7675.css:5810 { object-fit: cover; background-color: #0000; justify-content: center; align-items: center; height: 700px; min-height: 400px; max-height: 700px; display }
  - `.bg-projects-template` — williamson-construction.shared.3b91c7675.css:6412 { object-fit: fill; width: 100%; position: relative; inset: 0% auto 0% 0%; transform: scale(1.1); }
  - `.hero-section.overflow-hidden.position-relative` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7206 { height: 500px; min-height: 400px; max-height: 700px; }
- Hover rules: none class-specific.
- Assets: `img 64dfcae7c99427c2cc87b620_project-bg.jpg`.

#### 2. title-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (8):
  - `.text-size-3xl` — williamson-construction.shared.3b91c7675.css:4265 { font-size: 1.875rem; }
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` — williamson-construction.shared.3b91c7675.css:5703 { margin-top: -160px; margin-bottom: 0; padding-top: 20px; padding-bottom: 20px; }
  - `.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5776 { background-color: var(--primary); }
  - `.bg-color-primary.opacity-90` — williamson-construction.shared.3b91c7675.css:5780 { background-color: var(--primary); opacity: .9; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7160 { width: auto; margin-left: 4%; margin-right: 4%; padding-bottom: 0; }
  - `.text-color-white.my-8.text-size-3xl` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7817 { font-size: 1.2rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7897 { padding-top: 0; padding-bottom: .5rem; }
- Hover rules: none class-specific.
- Typography @1440:
  - freight-sans-pro 500 62px/78px ls=normal rgb(255, 255, 255) center — h1.text-color-white.p-2.m-6 "We build spaces that teach and heal our comm"
  - freight-sans-pro 400 30px/48px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8.text-size-3xl "Williamson Construction is committed to buil"
- Typography @834:
  - freight-sans-pro 500 55px/60px ls=normal rgb(255, 255, 255) center — h1.text-color-white.p-2.m-6 "We build spaces that teach and heal our comm"
  - freight-sans-pro 400 30px/48px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8.text-size-3xl "Williamson Construction is committed to buil"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) center — h1.text-color-white.p-2.m-6 "We build spaces that teach and heal our comm"
  - freight-sans-pro 400 19.2px/30.72px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8.text-size-3xl "Williamson Construction is committed to buil"

#### 3. projects-section

- Box @1440: margin 0px / 0px, padding 64px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (22):
  - `.font-weight-bold` — williamson-construction.shared.3b91c7675.css:4228 { margin-bottom: 0; font-weight: 700; }
  - `.font-weight-bold.mb-1` — williamson-construction.shared.3b91c7675.css:4237 { margin-bottom: .5rem; }
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.text-color-white.text-align-left.pt-8.my-8` — williamson-construction.shared.3b91c7675.css:4321 { margin-top: 0; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.ratio-box-2` — williamson-construction.shared.3b91c7675.css:6138 { background-color: #dee8eb; border-radius: 8px; width: 100%; padding-top: 100%; position: relative; overflow: hidden; }
  - `.ratio-box-2._16-9` — williamson-construction.shared.3b91c7675.css:6147 { background-color: #0000; border-radius: 0; padding-top: 56.25%; }
  - `.content-block-2` — williamson-construction.shared.3b91c7675.css:6452 { flex-direction: column; justify-content: center; align-items: center; padding: 16px; display: flex; position: absolute; inset: 0%; }
  - `.content-block-2.p-0` — williamson-construction.shared.3b91c7675.css:6462 { padding: 0; }
  - `.projects-section` — williamson-construction.shared.3b91c7675.css:6693 { padding-top: 4rem; }
  - `.inline-link, .link-block` — williamson-construction.shared.3b91c7675.css:6871 { cursor: pointer; }
  - `.project-div` — williamson-construction.shared.3b91c7675.css:6989 { width: 100%; margin-bottom: 2rem; position: relative; }
  - `.project-caption-box` — williamson-construction.shared.3b91c7675.css:6995 { z-index: 3; background-color: #004a80e6; width: 33%; margin-top: -16rem; margin-left: auto; margin-right: 2rem; padding: 2rem; position: relative; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.project-div` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7347 { margin-bottom: 4rem; }
  - …and 4 more (grep the stylesheet for the classes above).
- Hover rules: `.button-default:hover` (:5894); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 45px/60px ls=normal rgb(0, 74, 128) center — h2.text-color-primary.my-8.pt-8 "Featured Projects"
  - freight-sans-pro 500 45px/60px ls=normal rgb(255, 255, 255) left — h2.text-color-white.text-align-left.mb-8 "Cedars-Sinai Cooling Tower Refurbishment"
  - freight-sans-pro 700 22px/35.2px ls=normal rgb(255, 255, 255) left — p.font-weight-bold.mb-1 "Scope of Work"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) left — p "Upgrade deteriorated structural steel platfo"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) left — a.button-default.w-button "View Project"
- Typography @834:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.text-color-primary.my-8.pt-8 "Featured Projects"
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h2.text-color-white.text-align-left.mb-8 "Cedars-Sinai Cooling Tower Refurbishment"
  - freight-sans-pro 700 22px/35.2px ls=normal rgb(255, 255, 255) left — p.font-weight-bold.mb-1 "Scope of Work"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) left — p "Upgrade deteriorated structural steel platfo"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) left — a.button-default.w-button "View Project"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.text-color-primary.my-8.pt-8 "Featured Projects"
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h2.text-color-white.text-align-left.mb-8 "Cedars-Sinai Cooling Tower Refurbishment"
  - freight-sans-pro 700 18px/28.8px ls=normal rgb(255, 255, 255) left — p.font-weight-bold.mb-1 "Scope of Work"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(255, 255, 255) left — p "Upgrade deteriorated structural steel platfo"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) left — a.button-default.w-button "View Project"
- Assets: `img 691ce9282a35b6bc5a2d74eb_CSMC%20-%20Cooling%20Tower%20-%20North%20-2-p-1600.jpeg`, `img 64dfc1537201985fa6041acb_pExpressExt-p-1600.jpeg`, `img 64dfc2547e30e94826c8e262_providenceSJExt-p-1600.jpg`, `img 64dfc30498546f189bf235e3_cedarsBHWilshire-p-1600.jpg`, `img 64dfc292aa2e0d93d942f9b4_westHighSign-p-1600.jpg`, `img 64dfc6acd0afd862f87683e2_torranceHighFacade.jpg`, `img 64dfc6e7f8704e43a1354957_providenceMaryExt.jpg`, `img 66d0c4b3d615a010bfa3c3fd_Office%20Exterior_MBM_031124_0366_V3.jpg`.
- Interactive (16): `a.inline-link.w-inline-block → /projects/cedars-sinai-pro-building-cooling-tower-refurbishment ""`; `a.button-default.w-button → /projects/cedars-sinai-pro-building-cooling-tower-refurbishment "View Project"`; `a.inline-link.w-inline-block → /projects/providence-express-care ""`; `a.button-default.w-button → /projects/providence-express-care "View Project"`; `a.inline-link.w-inline-block → /projects/providence-saint-johns ""`; `a.button-default.w-button → /projects/providence-saint-johns "View Project"`; `a.inline-link.w-inline-block → /projects/cedars-sinai-beverly-hills ""`; `a.button-default.w-button → /projects/cedars-sinai-beverly-hills "View Project"`; `a.inline-link.w-inline-block → /projects/west-high-school ""`; `a.button-default.w-button → /projects/west-high-school "View Project"`; `a.inline-link.w-inline-block → /projects/torrance-high-school ""`; `a.button-default.w-button → /projects/torrance-high-school "View Project"`; `a.inline-link.w-inline-block → /projects/providence-hospital-little-company-of-mary ""`; `a.button-default.w-button → /projects/providence-hospital-little-company-of-mary "View Project"`; `a.inline-link.w-inline-block → /projects/mbm-hospitality ""`; `a.button-default.w-button → /projects/mbm-hospitality "View Project"`.

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
- Interactive (7): `a.w-inline-block → / ""`; `a.text-color-black.p-6 → / "Home"`; `a.text-color-black.p-6 → /services "Services"`; `a.text-color-black.p-6 → /about-us "About"`; `a.text-color-black.p-6.w--current → /projects "Projects"`; `a.text-color-black.p-6 → /contact "Contact Us"`; `a.text-color-black.p-6 → /join-the-team "Join the Team"`.

### Interaction inventory — 23 entries on this page (shared header/footer counted in shared chrome)

Every link, slider control, video and data-w-id target inside the census sections above. Phase 5 verifies exactly this many.
