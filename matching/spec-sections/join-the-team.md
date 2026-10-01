## join-the-team

Reference `https://www.williamson-construction.com/join-the-team` (captured `matching/spec/pages/join-the-team/index.html`); candidate `/dev/match/join-the-team`.
Root font-size 16px @1440, 16px @834, 16px @390. Reference document height 2702 @1440, 2474 @834, 2805 @390.

<!-- notes -->
<!-- /notes -->

### Section census — 4 sections (`body > section`, the fixed header excluded)

Gate anchors (harness.json): "Are you interested in joining the", "Home". A section with no text of its own cannot carry an anchor and is scored inside the region above it.

1. `hero-section.overflow-hidden.position-relative` — no text (scored in the region above) — y+h 0+700 / 0+500 / 0+500 (1440 / 834 / 390)
2. `title-section` — "Be a part of a team that teaches and heals our community." — y+h 540+260 / 340+240 / 364+228 (1440 / 834 / 390)
3. `joining-section` — "Are you interested in joining the Williamson Construction te" — y+h 800+1166 / 604+1134 / 592+1212 (1440 / 834 / 390)
4. `footer.bg-color-gray-300` — "Home" — y+h 1966+736 / 1738+736 / 1804+1001 (1440 / 834 / 390)

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
- Source rules (8):
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.text-color-white.text-align-left.m-6` — williamson-construction.shared.3b91c7675.css:4325 { margin-top: 1.5rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` — williamson-construction.shared.3b91c7675.css:5703 { margin-top: -160px; margin-bottom: 0; padding-top: 20px; padding-bottom: 20px; }
  - `.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5776 { background-color: var(--primary); }
  - `.bg-color-primary.opacity-90` — williamson-construction.shared.3b91c7675.css:5780 { background-color: var(--primary); opacity: .9; }
  - `.text-color-white.text-align-left.m-6` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7118 { margin-top: 1.5rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7160 { width: auto; margin-left: 4%; margin-right: 4%; padding-bottom: 0; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7897 { padding-top: 0; padding-bottom: .5rem; }
- Hover rules: none class-specific.
- Typography @1440:
  - freight-sans-pro 500 62px/78px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.text-align-left "Be a part of a team that teaches and heals o"
- Typography @834:
  - freight-sans-pro 500 55px/60px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.text-align-left "Be a part of a team that teaches and heals o"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h1.text-color-white.p-2.m-6.text-align-left "Be a part of a team that teaches and heals o"

#### 3. joining-section

- Box @1440: margin 0px / 0px, padding 64px 0px 64px 0px, bg rgba(0, 0, 0, 0).
- Source rules (20):
  - `._w-40pc` — williamson-construction.shared.3b91c7675.css:3459 { width: 40%; margin-left: auto; margin-right: auto; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.content-width.text-color-primary.mx-8` — williamson-construction.shared.3b91c7675.css:5757 { font-size: 35px; line-height: 45px; }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.joining-section` — williamson-construction.shared.3b91c7675.css:6927 { padding-top: 4rem; padding-bottom: 4rem; }
  - `.form-label` — williamson-construction.shared.3b91c7675.css:6932 { color: var(--primary); align-self: flex-start; margin-bottom: 0; font-size: 18px; font-weight: 300; line-height: 40px; display: inline-block; }
  - `.form-input-container` — williamson-construction.shared.3b91c7675.css:6942 { justify-content: space-between; align-items: center; width: 100%; margin-bottom: 1rem; display: flex; }
  - `.form-input-container.radio` — williamson-construction.shared.3b91c7675.css:6950 { justify-content: flex-start; width: 6rem; }
  - `.text-input` — williamson-construction.shared.3b91c7675.css:6955 { width: 75%; margin-bottom: 0; }
  - `.radio-button-container` — williamson-construction.shared.3b91c7675.css:6966 { justify-content: flex-start; width: 75%; margin-bottom: -17px; display: flex; }
  - `.radio-button` — williamson-construction.shared.3b91c7675.css:6973 { margin-right: 10px; }
  - `.form` — williamson-construction.shared.3b91c7675.css:6977 { width: 30rem; margin-left: auto; margin-right: auto; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.content-width.text-color-primary.mx-8._w-40pc.pb-8, .content-width.text-color-primary.mx-8._w-60pc` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7186 { width: 80%; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
  - `.content-width.text-color-primary.mx-8._w-40pc.pb-8` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7625 { width: 100%; }
  - …and 2 more (grep the stylesheet for the classes above).
- Hover rules: `.button-default:hover` (:5894); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.content-width.text-color-primary.mx-8._w-40pc.pb-8 "Are you interested in joining the Williamson"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(0, 74, 128) center — p.text-align-center.text-color-primary.mb-4 "Download and submit the below form to info@w"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Employee Application"
  - freight-sans-pro 300 18px/40px ls=normal rgb(0, 74, 128) — label.form-label "Company Name"
- Typography @834: as @1440.
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.content-width.text-color-primary.mx-8._w-40pc.pb-8 "Are you interested in joining the Williamson"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(0, 74, 128) center — p.text-align-center.text-color-primary.mb-4 "Download and submit the below form to info@w"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Employee Application"
  - freight-sans-pro 300 14px/40px ls=normal rgb(0, 74, 128) — label.form-label "Company Name"
- Interactive (2): `a.button-default.w-button → https://cdn.prod.website-files.com/646d47bfeb53b0308e8d4379/64f8dd6f593629be0e87380a_williamson-employee-app.pdf "Employee Application"`; `form`.

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
- Interactive (7): `a.w-inline-block → / ""`; `a.text-color-black.p-6 → / "Home"`; `a.text-color-black.p-6 → /services "Services"`; `a.text-color-black.p-6 → /about-us "About"`; `a.text-color-black.p-6 → /projects "Projects"`; `a.text-color-black.p-6 → /contact "Contact Us"`; `a.text-color-black.p-6.w--current → /join-the-team "Join the Team"`.

### Interaction inventory — 9 entries on this page (shared header/footer counted in shared chrome)

Every link, slider control, video and data-w-id target inside the census sections above. Phase 5 verifies exactly this many.
