## home

Reference `https://www.williamson-construction.com/` (captured `matching/spec/pages/index.html`); candidate `/dev/match/home`.
Root font-size 16px @1440, 16px @834, 16px @390. Reference document height 7932 @1440, 7643 @834, 7520 @390.

<!-- notes -->
<!-- /notes -->

### Section census — 14 sections (`body > section`, the fixed header excluded)

Gate anchors (harness.json): "We're setting out to rebuild spaces", "Healthcare", "Keep your space clear so", "Committed to your", "Our Plan for Your Project", "Start feeling like a top priority", "Home". A section with no text of its own cannot carry an anchor and is scored inside the region above it.

1. `hero-section.overflow-hidden.position-relative` — no text (scored in the region above) — y+h 0+700 / 0+500 / 0+500 (1440 / 834 / 390)
2. `title-section` — "We build spaces that teach and heal our community." — y+h 540+314 / 340+426 / 340+532 (1440 / 834 / 390)
3. `rebuild-spaces-section` — "We're setting out to rebuild spaces in healthcare and educat" — y+h 854+346 / 766+326 / 872+316 (1440 / 834 / 390)
4. `bg-video-section` — no text (scored in the region above) — y+h 1200+720 / 1092+417 / 1188+195 (1440 / 834 / 390)
5. `modernizing-section` — "Healthcare" — y+h 1920+432 / 1509+634 / 1383+771 (1440 / 834 / 390)
6. `bg-video-section` — no text (scored in the region above) — y+h 2352+720 / 2143+417 / 2154+195 (1440 / 834 / 390)
7. `keep-learning-section` — "Keep your space clear so" — y+h 3072+384 / 2592+522 / 2381+704 (1440 / 834 / 390)
8. `committed-block` — "Committed to your" — y+h 3456+435 / 3146+451 / 3117+441 (1440 / 834 / 390)
9. `full-width-image-section` — no text (scored in the region above) — y+h 4019+810 / 3725+469 / 3686+219 (1440 / 834 / 390)
10. `testimonials-section` — ""We choose Williamson Construction because they can be count" — y+h 4701+608 / 4067+608 / 3873+544 (1440 / 834 / 390)
11. `clients-section` — no text (scored in the region above) — y+h 5501+300 / 4867+300 / 4609+300 (1440 / 834 / 390)
12. `our-plan-section` — "Our Plan for Your Project" — y+h 5801+913 / 5167+1252 / 4909+960 (1440 / 834 / 390)
13. `cta-section` — "Start feeling like a top priority, and not like a bottom lin" — y+h 6778+322 / 6483+328 / 5933+490 (1440 / 834 / 390)
14. `footer.bg-color-gray-300` — "Home" — y+h 7196+736 / 6907+736 / 6519+1001 (1440 / 834 / 390)

#### 1. hero-section.overflow-hidden.position-relative

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (4):
  - `.hero-section` — williamson-construction.shared.3b91c7675.css:5805 { background-color: var(--primary); max-height: 90vh; }
  - `.hero-section.overflow-hidden.position-relative` — williamson-construction.shared.3b91c7675.css:5810 { object-fit: cover; background-color: #0000; justify-content: center; align-items: center; height: 700px; min-height: 400px; max-height: 700px; display }
  - `.hero-bg-vid` — williamson-construction.shared.3b91c7675.css:6430 { width: 100%; height: 100%; }
  - `.hero-section.overflow-hidden.position-relative` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7206 { height: 500px; min-height: 400px; max-height: 700px; }
- Hover rules: none class-specific.
- Assets: `video 646fe45468720e506da8fa8e_williamsonConstruction_homeVidTeacher-transcode.mp4`, `source 646fe45468720e506da8fa8e_williamsonConstruction_homeVidTeacher-transcode.mp4`, `source 646fe45468720e506da8fa8e_williamsonConstruction_homeVidTeacher-transcode.webm`, `bg 646fe45468720e506da8fa8e_williamsonConstruction_homeVidTeacher-poster-00001.jpg`.
- Interactive (2): `div.hero-bg-vid.w-background-video.w-background-video-atom`; `video`.

#### 2. title-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (15):
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.text-color-white.text-align-left.m-6` — williamson-construction.shared.3b91c7675.css:4325 { margin-top: 1.5rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` — williamson-construction.shared.3b91c7675.css:5703 { margin-top: -160px; margin-bottom: 0; padding-top: 20px; padding-bottom: 20px; }
  - `.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5776 { background-color: var(--primary); }
  - `.bg-color-primary.opacity-90` — williamson-construction.shared.3b91c7675.css:5780 { background-color: var(--primary); opacity: .9; }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.white-outline` — williamson-construction.shared.3b91c7675.css:5933 { background-color: #0000; border-color: #fff; }
  - `.button-default.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5946 { border-color: var(--primary); background-color: var(--primary); font-size: 1rem; }
  - `.text-color-white.text-align-left.m-6` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7118 { margin-top: 1.5rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7160 { width: auto; margin-left: 4%; margin-right: 4%; padding-bottom: 0; }
  - `.columns` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7301 { padding-left: 4%; padding-right: 4%; }
  - `.display-flex.button-holder` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7794 { flex-direction: column; justify-content: space-between; align-items: center; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7897 { padding-top: 0; padding-bottom: .5rem; }
  - `.button-default.white-outline.ml-8, .button-default.bg-color-white.ml-8` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7911 { margin-top: 2rem; margin-left: 0; }
  - `.columns.px-4` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7957 { padding-top: 4%; }
- Hover rules: `.button-default:hover` (:5894), `.button-default.white-outline:hover` (:5938), `.button-default.white-outline.ml-8:hover` (:5942); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 62px/78px ls=normal rgb(255, 255, 255) left — h1.text-color-white.text-align-left.m-6 "We build spaces that teach and heal our comm"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8 "Williamson Construction is committed to buil"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Contact"
- Typography @834:
  - freight-sans-pro 500 55px/60px ls=normal rgb(255, 255, 255) left — h1.text-color-white.text-align-left.m-6 "We build spaces that teach and heal our comm"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8 "Williamson Construction is committed to buil"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Contact"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h1.text-color-white.text-align-left.m-6 "We build spaces that teach and heal our comm"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8 "Williamson Construction is committed to buil"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Contact"
- Interactive (2): `a.button-default.w-button → /contact "Contact"`; `a.button-default.white-outline.ml-8 → /services "Services"`.

#### 3. rebuild-spaces-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (1):
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
- Hover rules: none class-specific.
- Typography @1440:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h3.text-color-primary "We're setting out to rebuild spaces in healt"
- Typography @834:
  - freight-sans-pro 500 30px/35px ls=normal rgb(0, 74, 128) center — h3.text-color-primary "We're setting out to rebuild spaces in healt"
- Typography @390:
  - freight-sans-pro 500 25px/30px ls=normal rgb(0, 74, 128) center — h3.text-color-primary "We're setting out to rebuild spaces in healt"

#### 4. bg-video-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (4):
  - `.ratio-box-2` — williamson-construction.shared.3b91c7675.css:6138 { background-color: #dee8eb; border-radius: 8px; width: 100%; padding-top: 100%; position: relative; overflow: hidden; }
  - `.ratio-box-2._2-1` — williamson-construction.shared.3b91c7675.css:6153 { background-color: #0000; padding-top: 50%; }
  - `.content-block-2` — williamson-construction.shared.3b91c7675.css:6452 { flex-direction: column; justify-content: center; align-items: center; padding: 16px; display: flex; position: absolute; inset: 0%; }
  - `.content-block-2.p-0` — williamson-construction.shared.3b91c7675.css:6462 { padding: 0; }
- Hover rules: none class-specific.
- Assets: `video 646ff29fd6b1000a85c630fb_williamsonConstruction_home_drVid-transcode.mp4`, `source 646ff29fd6b1000a85c630fb_williamsonConstruction_home_drVid-transcode.mp4`, `source 646ff29fd6b1000a85c630fb_williamsonConstruction_home_drVid-transcode.webm`, `bg 646ff29fd6b1000a85c630fb_williamsonConstruction_home_drVid-poster-00001.jpg`.
- Interactive (2): `div._w-full.h-full.w-background-video`; `video`.

#### 5. modernizing-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (34):
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.bg-color-white` — williamson-construction.shared.3b91c7675.css:4476 { background-color: #fff; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5776 { background-color: var(--primary); }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.text-color-secondary` — williamson-construction.shared.3b91c7675.css:5801 { color: var(--secondary); }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-secondary` — williamson-construction.shared.3b91c7675.css:5920 { border-bottom-color: var(--secondary); }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.button-default.mr-8` — williamson-construction.shared.3b91c7675.css:5929 { border: 2px solid var(--secondary); }
  - `.button-default.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5946 { border-color: var(--primary); background-color: var(--primary); font-size: 1rem; }
  - `.button-default.bg-color-white` — williamson-construction.shared.3b91c7675.css:5956 { border-color: var(--primary); color: var(--primary); background-color: #fff; }
  - `.offset-trans-block` — williamson-construction.shared.3b91c7675.css:6474 { background-color: #004a80f2; width: 40%; min-height: 24rem; padding: 4rem 6% 2rem; position: relative; top: -10rem; }
  - `._w-46pc` — williamson-construction.shared.3b91c7675.css:6487 { width: 46%; }
  - `._w-46pc.p-6.my-8` — williamson-construction.shared.3b91c7675.css:6491 { height: 20rem; }
  - `.bold-text` — williamson-construction.shared.3b91c7675.css:6499 { font-weight: 600; }
  - `.offset-icon-circle` — williamson-construction.shared.3b91c7675.css:6503 { width: 37.5%; position: absolute; top: -7rem; left: 4%; }
  - `.flex-justify-start.mt-6.pt-6.button-holder.ml-8` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7051 { margin-left: 0; }
  - …and 16 more (grep the stylesheet for the classes above).
- Hover rules: `.button-default:hover` (:5894), `.button-default.bg-color-primary.mr-8:hover` (:5952), `.button-default.bg-color-white.ml-8:hover` (:5962); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 600 22px/35.2px ls=normal rgb(255, 255, 255) — strong.bold-text.text-color-white "Healthcare"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white "We have experience building clinic spaces, i"
  - freight-sans-pro 500 45px/60px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left "Modernizing spaces that"
  - freight-sans-pro 500 45px/60px ls=normal rgb(198, 166, 71) left — h2.text-color-secondary.text-align-left "help them heal."
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.bg-color-primary.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-white.ml-8.w-button "Services"
- Typography @834:
  - freight-sans-pro 600 22px/35.2px ls=normal rgb(255, 255, 255) — strong.bold-text.text-color-white "Healthcare"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white "We have experience building clinic spaces, i"
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left "Modernizing spaces that"
  - freight-sans-pro 500 35px/45px ls=normal rgb(198, 166, 71) left — h2.text-color-secondary.text-align-left "help them heal."
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.bg-color-primary.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-white.ml-8.w-button "Services"
- Typography @390:
  - freight-sans-pro 600 18px/28.8px ls=normal rgb(255, 255, 255) — strong.bold-text.text-color-white "Healthcare"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(255, 255, 255) — p.text-color-white "We have experience building clinic spaces, i"
  - freight-sans-pro 500 45px/55px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left "Modernizing spaces that"
  - freight-sans-pro 500 35px/45px ls=normal rgb(198, 166, 71) left — h2.text-color-secondary.text-align-left "help them heal."
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.bg-color-primary.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-white.ml-8.w-button "Services"
- Assets: `img 64da84cd743d7dd19c6cd39d_healthcare_circ_white.svg`.
- Interactive (2): `a.button-default.bg-color-primary.mr-8 → /contact "Contact"`; `a.button-default.bg-color-white.ml-8 → /services "Services"`.

#### 6. bg-video-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (4):
  - `.ratio-box-2` — williamson-construction.shared.3b91c7675.css:6138 { background-color: #dee8eb; border-radius: 8px; width: 100%; padding-top: 100%; position: relative; overflow: hidden; }
  - `.ratio-box-2._2-1` — williamson-construction.shared.3b91c7675.css:6153 { background-color: #0000; padding-top: 50%; }
  - `.content-block-2` — williamson-construction.shared.3b91c7675.css:6452 { flex-direction: column; justify-content: center; align-items: center; padding: 16px; display: flex; position: absolute; inset: 0%; }
  - `.content-block-2.p-0` — williamson-construction.shared.3b91c7675.css:6462 { padding: 0; }
- Hover rules: none class-specific.
- Assets: `video 64da8614020f42a5804854d3_school_vid-transcode.mp4`, `source 64da8614020f42a5804854d3_school_vid-transcode.mp4`, `source 64da8614020f42a5804854d3_school_vid-transcode.webm`, `bg 64da8614020f42a5804854d3_school_vid-poster-00001.jpg`.
- Interactive (2): `div._w-full.h-full.w-background-video`; `video`.

#### 7. keep-learning-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (38):
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.bg-color-white` — williamson-construction.shared.3b91c7675.css:4476 { background-color: #fff; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.content-width.desk-cols` — williamson-construction.shared.3b91c7675.css:5766 { justify-content: space-between; display: flex; position: relative; }
  - `.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5776 { background-color: var(--primary); }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.text-color-secondary` — williamson-construction.shared.3b91c7675.css:5801 { color: var(--secondary); }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-secondary` — williamson-construction.shared.3b91c7675.css:5920 { border-bottom-color: var(--secondary); }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.button-default.mr-8` — williamson-construction.shared.3b91c7675.css:5929 { border: 2px solid var(--secondary); }
  - `.button-default.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5946 { border-color: var(--primary); background-color: var(--primary); font-size: 1rem; }
  - `.button-default.bg-color-white` — williamson-construction.shared.3b91c7675.css:5956 { border-color: var(--primary); color: var(--primary); background-color: #fff; }
  - `.offset-trans-block` — williamson-construction.shared.3b91c7675.css:6474 { background-color: #004a80f2; width: 40%; min-height: 24rem; padding: 4rem 6% 2rem; position: relative; top: -10rem; }
  - `._w-46pc` — williamson-construction.shared.3b91c7675.css:6487 { width: 46%; }
  - `._w-46pc.p-6.my-8` — williamson-construction.shared.3b91c7675.css:6491 { height: 20rem; }
  - `.bold-text` — williamson-construction.shared.3b91c7675.css:6499 { font-weight: 600; }
  - `.offset-icon-circle` — williamson-construction.shared.3b91c7675.css:6503 { width: 37.5%; position: absolute; top: -7rem; left: 4%; }
  - …and 20 more (grep the stylesheet for the classes above).
- Hover rules: `.button-default:hover` (:5894), `.button-default.bg-color-primary.mr-8:hover` (:5952), `.button-default.bg-color-white.ml-8:hover` (:5962); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 45px/60px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left "Keep your space clear so"
  - freight-sans-pro 500 45px/60px ls=normal rgb(198, 166, 71) left — h2.text-color-secondary.text-align-left "they can keep learning"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.bg-color-primary.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-white.ml-8.w-button "Services"
  - freight-sans-pro 600 22px/35.2px ls=normal rgb(255, 255, 255) — strong.bold-text.text-color-white "Education"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white "We are passionately invested in modernizatio"
- Typography @834:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left "Keep your space clear so"
  - freight-sans-pro 500 35px/45px ls=normal rgb(198, 166, 71) left — h2.text-color-secondary.text-align-left "they can keep learning"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.bg-color-primary.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-white.ml-8.w-button "Services"
  - freight-sans-pro 600 22px/35.2px ls=normal rgb(255, 255, 255) — strong.bold-text.text-color-white "Education"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white "We are passionately invested in modernizatio"
- Typography @390:
  - freight-sans-pro 500 45px/55px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left "Keep your space clear so"
  - freight-sans-pro 500 35px/45px ls=normal rgb(198, 166, 71) left — h2.text-color-secondary.text-align-left "they can keep learning"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.bg-color-primary.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-white.ml-8.w-button "Services"
  - freight-sans-pro 600 18px/28.8px ls=normal rgb(255, 255, 255) — strong.bold-text.text-color-white "Education"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(255, 255, 255) — p.text-color-white "We are passionately invested in modernizatio"
- Assets: `img 64da94e57b43c071cfe34277_education_circ_white.svg`.
- Interactive (2): `a.button-default.bg-color-primary.mr-8 → /contact "Contact"`; `a.button-default.bg-color-white.ml-8 → /services "Services"`.

#### 8. committed-block

- Box @1440: margin 0px / 128px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (13):
  - `.text-size-4xl` — williamson-construction.shared.3b91c7675.css:4269 { font-size: 2.25rem; }
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.text-align-center.px-14pc.text-size-4xl` — williamson-construction.shared.3b91c7675.css:4363 { line-height: 1.6em; }
  - `.text-align-center.px-14pc.text-size-4xl.pb-8` — williamson-construction.shared.3b91c7675.css:4367 { color: #fff; margin-left: 14%; margin-right: 14%; font-weight: 300; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.bg-color-primary` — williamson-construction.shared.3b91c7675.css:5776 { background-color: var(--primary); }
  - `.text-color-secondary` — williamson-construction.shared.3b91c7675.css:5801 { color: var(--secondary); }
  - `.committed-block` — williamson-construction.shared.3b91c7675.css:6516 { margin-bottom: 8rem; }
  - `.text-align-center.px-14pc.text-size-4xl.pb-8` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7122 { margin-left: auto; margin-right: auto; font-size: 2rem; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.committed-block, .testimonials-section` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7269 { margin-left: 4%; margin-right: 4%; }
  - `.text-align-center.px-14pc.text-size-4xl.pb-8` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7428 { font-size: 1.4rem; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
- Hover rules: none class-specific.
- Typography @1440:
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) center — span.text-color-white "Committed to your"
  - freight-sans-pro 500 35px/45px ls=normal rgb(198, 166, 71) center — span.text-color-secondary "Success"
  - freight-sans-pro 300 36px/57.6px ls=normal rgb(255, 255, 255) center — div.text-align-center.px-14pc.text-size-4xl.pb-8 "We get that you are accountable for the proj"
- Typography @834:
  - freight-sans-pro 500 30px/35px ls=normal rgb(255, 255, 255) center — span.text-color-white "Committed to your"
  - freight-sans-pro 500 30px/35px ls=normal rgb(198, 166, 71) center — span.text-color-secondary "Success"
  - freight-sans-pro 300 32px/51.2px ls=normal rgb(255, 255, 255) center — div.text-align-center.px-14pc.text-size-4xl.pb-8 "We get that you are accountable for the proj"
- Typography @390:
  - freight-sans-pro 500 25px/30px ls=normal rgb(255, 255, 255) center — span.text-color-white "Committed to your"
  - freight-sans-pro 500 25px/30px ls=normal rgb(198, 166, 71) center — span.text-color-secondary "Success"
  - freight-sans-pro 300 22.4px/35.84px ls=normal rgb(255, 255, 255) center — div.text-align-center.px-14pc.text-size-4xl.pb-8 "We get that you are accountable for the proj"

#### 9. full-width-image-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (4):
  - `.ratio-box-2` — williamson-construction.shared.3b91c7675.css:6138 { background-color: #dee8eb; border-radius: 8px; width: 100%; padding-top: 100%; position: relative; overflow: hidden; }
  - `.ratio-box-2._16-9` — williamson-construction.shared.3b91c7675.css:6147 { background-color: #0000; border-radius: 0; padding-top: 56.25%; }
  - `.content-block-2` — williamson-construction.shared.3b91c7675.css:6452 { flex-direction: column; justify-content: center; align-items: center; padding: 16px; display: flex; position: absolute; inset: 0%; }
  - `.content-block-2.p-0` — williamson-construction.shared.3b91c7675.css:6462 { padding: 0; }
- Hover rules: none class-specific.
- Assets: `img 64da891d6c0e42f6e7c7f07d_patient_dropoff-p-1600.jpg`.

#### 10. testimonials-section

- Box @1440: margin 0px / 192px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (23):
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.content-width.quote-slider-block` — williamson-construction.shared.3b91c7675.css:5729 { color: #fff; background-color: #004a80f2; margin-top: -8rem; padding: 6rem 6% 2rem; position: relative; }
  - `.testimonials-section` — williamson-construction.shared.3b91c7675.css:6520 { margin-bottom: 12rem; position: relative; }
  - `.slider` — williamson-construction.shared.3b91c7675.css:6525 { background-color: #0000; width: 100%; height: 30rem; }
  - `.left-arrow` — williamson-construction.shared.3b91c7675.css:6531 { margin-left: -6rem; }
  - `.right-arrow` — williamson-construction.shared.3b91c7675.css:6535 { right: -6rem; }
  - `.slide-nav` — williamson-construction.shared.3b91c7675.css:6539 { justify-content: space-around; width: 20%; display: flex; }
  - `.slide-nav.tesimonials` — williamson-construction.shared.3b91c7675.css:6545 { width: 10%; bottom: -1rem; }
  - `.slide` — williamson-construction.shared.3b91c7675.css:6559 { background-color: #0000; }
  - `.icon` — williamson-construction.shared.3b91c7675.css:6563 { color: var(--secondary); }
  - `.icon-2` — williamson-construction.shared.3b91c7675.css:6567 { color: var(--secondary); cursor: pointer; }
  - `.slider-attribution` — williamson-construction.shared.3b91c7675.css:6576 { margin-top: 2rem; font-size: 22px; line-height: 35px; }
  - `.slide-2` — williamson-construction.shared.3b91c7675.css:6582 { background-color: #0000; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.committed-block, .testimonials-section` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7269 { margin-left: 4%; margin-right: 4%; }
  - `.slider` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7274 { padding-left: 4%; padding-right: 4%; }
  - `.left-arrow` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7279 { margin-left: -3rem; }
  - `.right-arrow` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7283 { right: -3rem; }
  - …and 5 more (grep the stylesheet for the classes above).
- Hover rules: `.icon-2:hover` (:6572).
- Typography @1440:
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h3.text-align-left ""We choose Williamson Construction because t"
  - freight-sans-pro 400 22px/35px ls=normal rgb(255, 255, 255) left — div.slider-attribution "— Steve Thompson | Physical Optics Corporati"
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) center — h3 ""Williamson Construction demonstrates the ex"
- Typography @834:
  - freight-sans-pro 500 30px/35px ls=normal rgb(255, 255, 255) left — h3.text-align-left ""We choose Williamson Construction because t"
  - freight-sans-pro 400 22px/35px ls=normal rgb(255, 255, 255) left — div.slider-attribution "— Steve Thompson | Physical Optics Corporati"
  - freight-sans-pro 500 30px/35px ls=normal rgb(255, 255, 255) center — h3 ""Williamson Construction demonstrates the ex"
- Typography @390:
  - freight-sans-pro 500 25px/30px ls=normal rgb(255, 255, 255) left — h3.text-align-left ""We choose Williamson Construction because t"
  - freight-sans-pro 400 18px/25px ls=normal rgb(255, 255, 255) left — div.slider-attribution "— Steve Thompson | Physical Optics Corporati"
  - freight-sans-pro 500 25px/30px ls=normal rgb(255, 255, 255) center — h3 ""Williamson Construction demonstrates the ex"
- Interactive (5): `div.slider.w-slider`; `div.left-arrow.w-slider-arrow-left`; `div.right-arrow.w-slider-arrow-right`; `div.w-slider-dot`; `div.w-slider-dot.w-active`.

#### 11. clients-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (7):
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.slide-nav` — williamson-construction.shared.3b91c7675.css:6539 { justify-content: space-around; width: 20%; display: flex; }
  - `.slide-nav.clients` — williamson-construction.shared.3b91c7675.css:6550 { width: 10%; top: 0; }
  - `.slide-nav.display-none` — williamson-construction.shared.3b91c7675.css:6555 { display: none; }
  - `.client-slider-logo` — williamson-construction.shared.3b91c7675.css:6590 { object-fit: contain; width: 18%; max-height: 6rem; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
- Hover rules: none class-specific.
- Assets: `img 64da8ee2df5077be76c13ee3_torance-school.png`, `img 64da8f62a89ac42abc3f9345_cedars-logo.png`, `img 64da8f816c21a97562b1594b_poc_logo.png`, `img 64da8fad8ef95adc337dea13_providence_logo.png`, `img 64da8fd9f862276f3c62c8f8_labiomed_logo.png`, `img 64da9140dbf6666fa2d7404e_pvschools_logo.png`, `img 64da91635ce2afe9568fa1a8_esschools_logo.jpg`, `img 64da918b6c673529ecb02fd2_rbschools_logo.jpg`, `img 64da91ba91ec99a63ba7f0fc_mbschools_logo.png`, `img 64da91d74fd91631ad907afc_faceymed_logo.png`.
- Interactive (5): `div.content-width.w-slider`; `div.display-none.w-slider-arrow-left`; `div.display-none.w-slider-arrow-right`; `div.w-slider-dot`; `div.w-slider-dot.w-active`.

#### 12. our-plan-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (33):
  - `._w-40pc` — williamson-construction.shared.3b91c7675.css:3459 { width: 40%; margin-left: auto; margin-right: auto; }
  - `._w-60pc` — williamson-construction.shared.3b91c7675.css:3465 { width: 60%; }
  - `.text-size-2xl` — williamson-construction.shared.3b91c7675.css:4261 { font-size: 1.5rem; }
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:4468 { background-color: #0000; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.content-width.ourplan-holder` — williamson-construction.shared.3b91c7675.css:5744 { background-color: #004a7e; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 4rem; display: flex; }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.button-default.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:5966 { background-color: #0000; border-color: #fff; }
  - `.button-default.bg-color-transparent.text-color-primary` — williamson-construction.shared.3b91c7675.css:5979 { border-color: var(--primary); color: var(--primary); }
  - `.interactive-logo-container` — williamson-construction.shared.3b91c7675.css:6596 { margin-top: 2rem; margin-bottom: 2rem; margin-left: 0; }
  - `.plan-container` — williamson-construction.shared.3b91c7675.css:6602 { height: 24rem; margin-bottom: 4rem; padding-left: 8%; position: relative; }
  - `.plan-1` — williamson-construction.shared.3b91c7675.css:6609 { opacity: 0; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding-right: 10%; transition: opacity .2s; display: f }
  - `.plan-1.active` — williamson-construction.shared.3b91c7675.css:6621 { opacity: 1; }
  - `.gold-circled-number` — williamson-construction.shared.3b91c7675.css:6625 { background-color: var(--secondary); border-radius: 50%; justify-content: center; align-items: center; width: 5rem; height: 5rem; display: flex; positi }
  - `.white-number` — williamson-construction.shared.3b91c7675.css:6636 { color: #fff; margin-top: -1rem; font-size: 3rem; }
  - …and 15 more (grep the stylesheet for the classes above).
- Hover rules: `.button-default:hover` (:5894), `.button-default.bg-color-transparent.ml-8:hover` (:5971), `.button-default.bg-color-transparent.text-color-primary:hover` (:5984); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 45px/60px ls=normal rgb(0, 74, 128) center — h2.text-color-primary.mb-8.pb-8 "Our Plan for Your Project"
  - freight-sans-pro 400 48px/20px ls=normal rgb(255, 255, 255) — div.white-number "1"
  - freight-sans-pro 500 45px/60px ls=normal rgb(255, 255, 255) left — h2.text-align-left.text-color-white "Are we the right fit?"
  - freight-sans-pro 400 24px/38.4px ls=normal rgb(255, 255, 255) — p.text-color-white.text-size-2xl "We meet and discuss your project/ determine "
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Contact"
- Typography @834:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.text-color-primary.mb-8.pb-8 "Our Plan for Your Project"
  - freight-sans-pro 400 48px/20px ls=normal rgb(255, 255, 255) — div.white-number "1"
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h2.text-align-left.text-color-white "Are we the right fit?"
  - freight-sans-pro 400 24px/38.4px ls=normal rgb(255, 255, 255) — p.text-color-white.text-size-2xl "We meet and discuss your project/ determine "
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Contact"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h2.text-color-primary.mb-8.pb-8 "Our Plan for Your Project"
  - freight-sans-pro 400 48px/20px ls=normal rgb(255, 255, 255) — div.white-number "1"
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h2.text-align-left.text-color-white "Are we the right fit?"
  - freight-sans-pro 400 24px/38.4px ls=normal rgb(255, 255, 255) — p.text-color-white.text-size-2xl "We meet and discuss your project/ determine "
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Contact"
- Interactive (3): `a.button-default.w-button → /contact "Contact"`; `a.button-default.bg-color-transparent.ml-8 → /contact "Services"`; `a.button-default.bg-color-transparent.ml-8 → /services "Services"`.

#### 13. cta-section

- Box @1440: margin 0px / 96px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (16):
  - `.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:4468 { background-color: #0000; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.content-width.cta-block` — williamson-construction.shared.3b91c7675.css:5753 { max-width: 920px; }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.button-default.mr-8` — williamson-construction.shared.3b91c7675.css:5929 { border: 2px solid var(--secondary); }
  - `.button-default.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:5966 { background-color: #0000; border-color: #fff; }
  - `.button-default.bg-color-transparent.text-color-primary` — williamson-construction.shared.3b91c7675.css:5979 { border-color: var(--primary); color: var(--primary); }
  - `.cta-section` — williamson-construction.shared.3b91c7675.css:6134 { margin-bottom: 6rem; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
  - `.text-color-primary.text-align-left` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7638 { font-size: 45px; line-height: 55px; }
  - `.flex-justify-start.mt-6.pt-6.button-holder` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7785 { flex-direction: column; align-items: center; }
  - `.button-default.mr-8` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7907 { margin-right: 0; }
  - `.button-default.bg-color-transparent.text-color-primary` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7916 { margin-top: 2rem; }
- Hover rules: `.button-default:hover` (:5894), `.button-default.bg-color-transparent.text-color-primary:hover` (:5984); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 62px/78px ls=normal rgb(0, 74, 128) left — h1.text-color-primary.text-align-left "Start feeling like a top priority, and not l"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-transparent.text-color-primary.w-button "About"
- Typography @834:
  - freight-sans-pro 500 55px/60px ls=normal rgb(0, 74, 128) left — h1.text-color-primary.text-align-left "Start feeling like a top priority, and not l"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-transparent.text-color-primary.w-button "About"
- Typography @390:
  - freight-sans-pro 500 45px/55px ls=normal rgb(0, 74, 128) left — h1.text-color-primary.text-align-left "Start feeling like a top priority, and not l"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.w-button "Contact"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-transparent.text-color-primary.w-button "About"
- Interactive (2): `a.button-default.mr-8.w-button → /contact "Contact"`; `a.button-default.bg-color-transparent.text-color-primary → /about-us "About"`.

#### 14. footer.bg-color-gray-300

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
  - freight-sans-pro 500 19.2px/20px ls=normal rgb(0, 0, 0) — a.text-color-black.p-6.w--current "Home"
  - freight-sans-pro 400 italic 14px/20px ls=normal rgb(0, 0, 0) — em.italic-text "© Williamson Construction 2023, All Rights R"
  - freight-sans-pro 400 14px/20px ls=normal rgb(0, 0, 0) — div.max-w-1280._w-full.m-auto "License 976074 SBE 2019518"
- Typography @834: as @1440.
- Typography @390: as @1440.
- Assets: `img 6514801e11f270f8acfd0544_wcc-logo.svg`.
- Interactive (7): `a.w-inline-block.w--current → / ""`; `a.text-color-black.p-6.w--current → / "Home"`; `a.text-color-black.p-6 → /services "Services"`; `a.text-color-black.p-6 → /about-us "About"`; `a.text-color-black.p-6 → /projects "Projects"`; `a.text-color-black.p-6 → /contact "Contact Us"`; `a.text-color-black.p-6 → /join-the-team "Join the Team"`.

### Interaction inventory — 34 entries on this page (shared header/footer counted in shared chrome)

Every link, slider control, video and data-w-id target inside the census sections above. Phase 5 verifies exactly this many.
