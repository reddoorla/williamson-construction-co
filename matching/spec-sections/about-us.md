## about-us

Reference `https://www.williamson-construction.com/about-us` (captured `matching/spec/pages/about-us/index.html`); candidate `/dev/match/about-us`.
Root font-size 16px @1440, 16px @834, 16px @390. Reference document height 4593 @1440, 5412 @834, 5936 @390.

<!-- notes -->
<!-- /notes -->

### Section census — 8 sections (`body > section`, the fixed header excluded)

Gate anchors (harness.json): "Our Mission is to serve the", "We are changing the industry by", "Leadership", "Keeping your space clear", "Home". A section with no text of its own cannot carry an anchor and is scored inside the region above it.

1. `hero-section.overflow-hidden.position-relative` — no text (scored in the region above) — y+h 0+700 / 0+500 / 0+500 (1440 / 834 / 390)
2. `title-section` — "We're setting out to change the construction industry." — y+h 540+400 / 340+452 / 340+490 (1440 / 834 / 390)
3. `our-mission-section` — "Our Mission is to serve the noble calling of our healthcare " — y+h 940+338 / 792+438 / 830+318 (1440 / 834 / 390)
4. `cta-section` — "We are changing the industry by treating our clients like pe" — y+h 1278+208 / 1230+178 / 1148+435 (1440 / 834 / 390)
5. `leadership-section` — "Leadership" — y+h 1582+985 / 1504+2223 / 1679+2493 (1440 / 834 / 390)
6. `bg-video-section.offset-up` — no text (scored in the region above) — y+h 2375+810 / 3535+469 / 4012+219 (1440 / 834 / 390)
7. `testimonials-section` — "Keeping your space clear, so they can keep teaching." — y+h 3057+608 / 3876+608 / 4199+544 (1440 / 834 / 390)
8. `footer.bg-color-gray-300` — "Home" — y+h 3857+736 / 4676+736 / 4935+1001 (1440 / 834 / 390)

#### 1. hero-section.overflow-hidden.position-relative

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (4):
  - `.hero-section` — williamson-construction.shared.3b91c7675.css:5805 { background-color: var(--primary); max-height: 90vh; }
  - `.hero-section.overflow-hidden.position-relative` — williamson-construction.shared.3b91c7675.css:5810 { object-fit: cover; background-color: #0000; justify-content: center; align-items: center; height: 700px; min-height: 400px; max-height: 700px; display }
  - `.hero-bg-vid` — williamson-construction.shared.3b91c7675.css:6430 { width: 100%; height: 100%; }
  - `.hero-section.overflow-hidden.position-relative` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7206 { height: 500px; min-height: 400px; max-height: 700px; }
- Hover rules: none class-specific.
- Assets: `video 64f8d707e375ba5bb51c0607_first-day-of-school-transcode.mp4`, `source 64f8d707e375ba5bb51c0607_first-day-of-school-transcode.mp4`, `source 64f8d707e375ba5bb51c0607_first-day-of-school-transcode.webm`, `bg 64f8d707e375ba5bb51c0607_first-day-of-school-poster-00001.jpg`.
- Interactive (2): `div.hero-bg-vid.w-background-video.w-background-video-atom`; `video`.

#### 2. title-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (18):
  - `.text-size-3xl` — williamson-construction.shared.3b91c7675.css:4265 { font-size: 1.875rem; }
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
  - `.text-color-white.text-align-left.m-6.su-m-0-mobile` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7420 { margin: 0; }
  - `.display-flex.button-holder` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7794 { flex-direction: column; justify-content: space-between; align-items: center; }
  - `.text-color-white.my-8.text-size-3xl` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7817 { font-size: 1.2rem; }
  - `.max-w-1280._w-full.m-auto.bg-color-primary.opacity-90.offset-up` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7897 { padding-top: 0; padding-bottom: .5rem; }
  - `.button-default.white-outline.ml-8, .button-default.bg-color-white.ml-8` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7911 { margin-top: 2rem; margin-left: 0; }
  - `.columns.px-4` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7957 { padding-top: 4%; }
- Hover rules: `.button-default:hover` (:5894), `.button-default.white-outline:hover` (:5938), `.button-default.white-outline.ml-8:hover` (:5942); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 62px/78px ls=normal rgb(255, 255, 255) left — h1.text-color-white.text-align-left.m-6.su-m-0-mobile "We're setting out to change the construction"
  - freight-sans-pro 400 30px/48px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8.text-size-3xl "We treat our clients like family. Relationsh"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Hire Us"
- Typography @834:
  - freight-sans-pro 500 55px/60px ls=normal rgb(255, 255, 255) left — h1.text-color-white.text-align-left.m-6.su-m-0-mobile "We're setting out to change the construction"
  - freight-sans-pro 400 30px/48px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8.text-size-3xl "We treat our clients like family. Relationsh"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Hire Us"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) left — h1.text-color-white.text-align-left.m-6.su-m-0-mobile "We're setting out to change the construction"
  - freight-sans-pro 400 19.2px/30.72px ls=normal rgb(255, 255, 255) — p.text-color-white.my-8.text-size-3xl "We treat our clients like family. Relationsh"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.w-button "Hire Us"
- Interactive (2): `a.button-default.w-button → /contact "Hire Us"`; `a.button-default.white-outline.ml-8 → /join-the-team "Get Hired"`.

#### 3. our-mission-section

- Box @1440: margin 0px / 0px, padding 64px 0px 64px 0px, bg rgba(0, 0, 0, 0).
- Source rules (8):
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.our-mission-section` — williamson-construction.shared.3b91c7675.css:6875 { padding-top: 4rem; padding-bottom: 4rem; }
  - `.our-mission-text` — williamson-construction.shared.3b91c7675.css:6880 { color: var(--primary); padding-left: 4rem; padding-right: 25%; font-size: 35px; font-weight: 300; line-height: 50px; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.our-mission-text` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7333 { padding-left: 0; padding-right: 0%; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
  - `.our-mission-text` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7751 { font-size: 25px; line-height: 35px; }
  - `.our-mission-text` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7996 { font-size: 20px; line-height: 30px; }
- Hover rules: none class-specific.
- Typography @1440:
  - freight-sans-pro 300 35px/50px ls=normal rgb(0, 74, 128) — p.our-mission-text "Our Mission is to serve the noble calling of"
- Typography @834: as @1440.
- Typography @390:
  - freight-sans-pro 300 20px/30px ls=normal rgb(0, 74, 128) — p.our-mission-text "Our Mission is to serve the noble calling of"

#### 4. cta-section

- Box @1440: margin 0px / 96px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (19):
  - `.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:4468 { background-color: #0000; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.text-color-primary.text-align-left.ml-8.pr-25pc` — williamson-construction.shared.3b91c7675.css:5797 { padding-right: 25%; }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.button-default.mr-8` — williamson-construction.shared.3b91c7675.css:5929 { border: 2px solid var(--secondary); }
  - `.button-default.bg-color-transparent` — williamson-construction.shared.3b91c7675.css:5966 { background-color: #0000; border-color: #fff; }
  - `.button-default.bg-color-transparent.text-color-primary` — williamson-construction.shared.3b91c7675.css:5979 { border-color: var(--primary); color: var(--primary); }
  - `.cta-section` — williamson-construction.shared.3b91c7675.css:6134 { margin-bottom: 6rem; }
  - `.flex-justify-start.mt-6.pt-6.button-holder.ml-8` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7051 { margin-left: 0; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.text-color-primary.text-align-left.ml-8.pr-25pc` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7201 { margin-left: 0; padding-right: 0%; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
  - `.text-color-primary.text-align-left` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7638 { font-size: 45px; line-height: 55px; }
  - `.flex-justify-start.mt-6.pt-6.button-holder` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7785 { flex-direction: column; align-items: center; }
  - `.flex-justify-start.mt-6.pt-6.button-holder.ml-8` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7790 { align-items: flex-start; }
  - `.button-default.mr-8` @(max-width: 479px) — williamson-construction.shared.3b91c7675.css:7907 { margin-right: 0; }
  - …and 1 more (grep the stylesheet for the classes above).
- Hover rules: `.button-default:hover` (:5894), `.button-default.bg-color-transparent.ml-8:hover` (:5971), `.button-default.bg-color-transparent.text-color-primary:hover` (:5984); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 45px/60px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left.ml-8.pr-25pc "We are changing the industry by treating our"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.w-button "Hire Us"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-transparent.text-color-primary.w-button "Get Hired"
- Typography @834:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left.ml-8.pr-25pc "We are changing the industry by treating our"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.w-button "Hire Us"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-transparent.text-color-primary.w-button "Get Hired"
- Typography @390:
  - freight-sans-pro 500 45px/55px ls=normal rgb(0, 74, 128) left — h2.text-color-primary.text-align-left.ml-8.pr-25pc "We are changing the industry by treating our"
  - freight-sans-pro 500 16px/20px ls=normal rgb(255, 255, 255) — a.button-default.mr-8.w-button "Hire Us"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) — a.button-default.bg-color-transparent.text-color-primary.w-button "Get Hired"
- Interactive (2): `a.button-default.mr-8.w-button → /contact "Hire Us"`; `a.button-default.bg-color-transparent.text-color-primary → /join-the-team "Get Hired"`.

#### 5. leadership-section

- Box @1440: margin 0px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (11):
  - `.text-color-white` — williamson-construction.shared.3b91c7675.css:4313 { color: #fff; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.leadership-cols` — williamson-construction.shared.3b91c7675.css:6889 { justify-content: space-around; align-items: flex-start; margin-top: 6rem; display: flex; }
  - `.leadership-instance` — williamson-construction.shared.3b91c7675.css:6896 { z-index: 3; background-color: #004a80e6; width: 32%; padding: 8rem 2rem 6rem; position: relative; }
  - `.leadership-photo` — williamson-construction.shared.3b91c7675.css:6904 { border-radius: 50%; width: 12rem; height: 12rem; }
  - `.leadership-photo-holder` — williamson-construction.shared.3b91c7675.css:6910 { justify-content: center; width: 100%; display: flex; position: absolute; top: -6rem; left: 0; }
  - `.content-width` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7172 { margin-bottom: 0; padding-left: 10%; padding-right: 10%; }
  - `.leadership-cols` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7338 { flex-direction: column; }
  - `.leadership-instance` @(max-width: 991px) — williamson-construction.shared.3b91c7675.css:7342 { width: 100%; margin-bottom: 8rem; }
  - `.content-width` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7616 { padding-left: 4%; padding-right: 4%; }
- Hover rules: none class-specific.
- Typography @1440:
  - freight-sans-pro 500 35px/45px ls=normal rgb(0, 74, 128) center — h3.text-color-primary.pb-8.mb-8 "Leadership"
  - freight-sans-pro 500 45px/60px ls=normal rgb(255, 255, 255) center — h2.text-color-white "Brian Williamson"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white "Founder and primary license holder for Willi"
- Typography @834:
  - freight-sans-pro 500 30px/35px ls=normal rgb(0, 74, 128) center — h3.text-color-primary.pb-8.mb-8 "Leadership"
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) center — h2.text-color-white "Brian Williamson"
  - freight-sans-pro 400 22px/35.2px ls=normal rgb(255, 255, 255) — p.text-color-white "Founder and primary license holder for Willi"
- Typography @390:
  - freight-sans-pro 500 25px/30px ls=normal rgb(0, 74, 128) center — h3.text-color-primary.pb-8.mb-8 "Leadership"
  - freight-sans-pro 500 35px/45px ls=normal rgb(255, 255, 255) center — h2.text-color-white "Brian Williamson"
  - freight-sans-pro 400 18px/28.8px ls=normal rgb(255, 255, 255) — p.text-color-white "Founder and primary license holder for Willi"
- Assets: `img 646d47bfeb53b0308e8d439c_williamson_actuallybrian-p-500.png`, `img 64f8d1135bd05755181d40d5_brian-douglas.png`, `img 64f8d1e124cf49c0424da3d3_jim-williamson.png`.

#### 6. bg-video-section.offset-up

- Box @1440: margin -192px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Box @390: margin -160px / 0px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (6):
  - `.ratio-box-2` — williamson-construction.shared.3b91c7675.css:6138 { background-color: #dee8eb; border-radius: 8px; width: 100%; padding-top: 100%; position: relative; overflow: hidden; }
  - `.ratio-box-2._16-9` — williamson-construction.shared.3b91c7675.css:6147 { background-color: #0000; border-radius: 0; padding-top: 56.25%; }
  - `.bg-video-section.offset-up` — williamson-construction.shared.3b91c7675.css:6448 { margin-top: -12rem; }
  - `.content-block-2` — williamson-construction.shared.3b91c7675.css:6452 { flex-direction: column; justify-content: center; align-items: center; padding: 16px; display: flex; position: absolute; inset: 0%; }
  - `.content-block-2.p-0` — williamson-construction.shared.3b91c7675.css:6462 { padding: 0; }
  - `.bg-video-section.offset-up` @(max-width: 767px) — williamson-construction.shared.3b91c7675.css:7663 { margin-top: -10rem; }
- Hover rules: none class-specific.
- Assets: `video 64f8d417da1bda9f0797bacc_scan-explanation-transcode.mp4`, `source 64f8d417da1bda9f0797bacc_scan-explanation-transcode.mp4`, `source 64f8d417da1bda9f0797bacc_scan-explanation-transcode.webm`, `bg 64f8d417da1bda9f0797bacc_scan-explanation-poster-00001.jpg`.
- Interactive (2): `div._w-full.h-full.w-background-video`; `video`.

#### 7. testimonials-section

- Box @1440: margin 0px / 192px, padding 0px 0px 0px 0px, bg rgba(0, 0, 0, 0).
- Source rules (30):
  - `.bg-color-white` — williamson-construction.shared.3b91c7675.css:4476 { background-color: #fff; }
  - `.content-width` — williamson-construction.shared.3b91c7675.css:5718 { background-color: #0000; max-width: 1280px; margin-left: auto; margin-right: auto; }
  - `.content-width.quote-slider-block` — williamson-construction.shared.3b91c7675.css:5729 { color: #fff; background-color: #004a80f2; margin-top: -8rem; padding: 6rem 6% 2rem; position: relative; }
  - `.content-width.quote-slider-block.bg-image` — williamson-construction.shared.3b91c7675.css:5737 { background-color: #0000; background-image: url("https://cdn.prod.website-files.com/646d47bfeb53b0308e8d4379/64f8d6ae10506043b9722ee7_dark-blue-bg-imag }
  - `.text-color-primary` — williamson-construction.shared.3b91c7675.css:5793 { color: var(--primary); }
  - `.text-color-secondary` — williamson-construction.shared.3b91c7675.css:5801 { color: var(--secondary); }
  - `.button-default` — williamson-construction.shared.3b91c7675.css:5884 { border: 2px solid var(--secondary); background-color: var(--secondary); color: #fff; border-radius: 10px; padding: .5rem 2rem; font-size: 1rem; transi }
  - `.button-default.text-color-secondary` — williamson-construction.shared.3b91c7675.css:5920 { border-bottom-color: var(--secondary); }
  - `.button-default.text-color-primary` — williamson-construction.shared.3b91c7675.css:5924 { border-bottom-color: var(--primary); color: var(--primary); }
  - `.button-default.bg-color-white` — williamson-construction.shared.3b91c7675.css:5956 { border-color: var(--primary); color: var(--primary); background-color: #fff; }
  - `.testimonials-section` — williamson-construction.shared.3b91c7675.css:6520 { margin-bottom: 12rem; position: relative; }
  - `.slider` — williamson-construction.shared.3b91c7675.css:6525 { background-color: #0000; width: 100%; height: 30rem; }
  - `.left-arrow` — williamson-construction.shared.3b91c7675.css:6531 { margin-left: -6rem; }
  - `.right-arrow` — williamson-construction.shared.3b91c7675.css:6535 { right: -6rem; }
  - `.slide-nav` — williamson-construction.shared.3b91c7675.css:6539 { justify-content: space-around; width: 20%; display: flex; }
  - `.slide-nav.display-none` — williamson-construction.shared.3b91c7675.css:6555 { display: none; }
  - `.icon` — williamson-construction.shared.3b91c7675.css:6563 { color: var(--secondary); }
  - `.icon-2` — williamson-construction.shared.3b91c7675.css:6567 { color: var(--secondary); cursor: pointer; }
  - …and 12 more (grep the stylesheet for the classes above).
- Hover rules: `.button-default:hover` (:5894), `.icon-2:hover` (:6572); plain links take the global `a:hover` (see shared chrome).
- Typography @1440:
  - freight-sans-pro 500 62px/78px ls=normal rgb(198, 166, 71) left — h1.text-align-left.text-color-secondary "Keeping your space clear, so they can keep t"
  - freight-sans-pro 300 35px/45px ls=normal rgb(255, 255, 255) left — h3.font-weight-thin.text-align-left "Don't let your inbox fill up with complaints"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) left — a.button-default.text-color-primary.bg-color-white.w-button "Contact"
  - freight-sans-pro 300 35px/45px ls=normal rgb(255, 255, 255) center — h3.font-weight-thin "There doesn't need to be that many change or"
- Typography @834:
  - freight-sans-pro 500 55px/60px ls=normal rgb(198, 166, 71) left — h1.text-align-left.text-color-secondary "Keeping your space clear, so they can keep t"
  - freight-sans-pro 300 30px/35px ls=normal rgb(255, 255, 255) left — h3.font-weight-thin.text-align-left "Don't let your inbox fill up with complaints"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) left — a.button-default.text-color-primary.bg-color-white.w-button "Contact"
  - freight-sans-pro 300 30px/35px ls=normal rgb(255, 255, 255) center — h3.font-weight-thin "There doesn't need to be that many change or"
- Typography @390:
  - freight-sans-pro 500 35px/45px ls=normal rgb(198, 166, 71) left — h1.text-align-left.text-color-secondary "Keeping your space clear, so they can keep t"
  - freight-sans-pro 300 25px/30px ls=normal rgb(255, 255, 255) left — h3.font-weight-thin.text-align-left "Don't let your inbox fill up with complaints"
  - freight-sans-pro 500 16px/20px ls=normal rgb(0, 74, 128) left — a.button-default.text-color-primary.bg-color-white.w-button "Contact"
  - freight-sans-pro 300 25px/30px ls=normal rgb(255, 255, 255) center — h3.font-weight-thin "There doesn't need to be that many change or"
- Assets: `bg 64f8d6ae10506043b9722ee7_dark-blue-bg-image.png`.
- Interactive (6): `div.slider.w-slider`; `a.button-default.text-color-primary.bg-color-white → /contact "Contact"`; `div.left-arrow.w-slider-arrow-left`; `div.right-arrow.w-slider-arrow-right`; `div.w-slider-dot`; `div.w-slider-dot.w-active`.

#### 8. footer.bg-color-gray-300

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
- Interactive (7): `a.w-inline-block → / ""`; `a.text-color-black.p-6 → / "Home"`; `a.text-color-black.p-6 → /services "Services"`; `a.text-color-black.p-6.w--current → /about-us "About"`; `a.text-color-black.p-6 → /projects "Projects"`; `a.text-color-black.p-6 → /contact "Contact Us"`; `a.text-color-black.p-6 → /join-the-team "Join the Team"`.

### Interaction inventory — 21 entries on this page (shared header/footer counted in shared chrome)

Every link, slider control, video and data-w-id target inside the census sections above. Phase 5 verifies exactly this many.
