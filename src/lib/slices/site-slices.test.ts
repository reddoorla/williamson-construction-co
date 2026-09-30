import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

import PageHero from "./PageHero/index.svelte";
import ProjectList from "./ProjectList/index.svelte";
import OurPlan from "./OurPlan/index.svelte";
import QuoteSlider from "./QuoteSlider/index.svelte";
import SectorFeature from "./SectorFeature/index.svelte";
import PhaseBubbles from "./PhaseBubbles/index.svelte";
import PhaseDetail from "./PhaseDetail/index.svelte";
import EmployeeApplication from "./EmployeeApplication/index.svelte";
import ContactCard from "./ContactCard/index.svelte";
import CtaBlock from "./CtaBlock/index.svelte";
import ClientLogos from "./ClientLogos/index.svelte";
import type { ProjectCard } from "$lib/projects";

afterEach(() => cleanup());

const image = (name: string, alt: string | null = null) => ({
  url: `https://images.prismic.io/williamson-construction/${name}.jpg`,
  alt,
  copyright: null,
  dimensions: { width: 1600, height: 1067 },
  edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
  id: name,
});
const mediaLink = (name: string) => ({
  link_type: "Media",
  kind: "file",
  id: name,
  url: `https://williamson-construction.cdn.prismic.io/williamson-construction/${name}`,
  name,
  size: "1",
});
const noMedia = { link_type: "Media" };
const para = (text: string) => [{ type: "paragraph", text, spans: [] }];
const web = (url: string) => ({ link_type: "Web", url });
const button = (label: string, url: string, style: string | null = null) => ({
  button_label: label,
  button_link: web(url),
  button_style: style,
});
const slice = (slice_type: string, primary: Record<string, unknown>, items: unknown[] = []) =>
  ({ slice_type, variation: "default", id: `${slice_type}$1`, primary, items }) as never;

const cards: ProjectCard[] = [
  {
    id: "p1",
    uid: "west-high-school",
    title: "West High School",
    image: image("w"),
    scope: para("Courtyard Modernization") as never,
  },
  { id: "p2", uid: "mbm-hospitality", title: "MBM Hospitality", image: image("m"), scope: [] },
];
const rel = (id: string) => ({
  project: { link_type: "Document", id, type: "project", uid: id, isBroken: false },
});

describe("PageHero", () => {
  const primary = {
    heading: "We build spaces that teach and heal our community.",
    body: para("Williamson Construction is committed…"),
    background_image: image("poster"),
    video_mp4: mediaLink("hero.mp4"),
    video_webm: mediaLink("hero.webm"),
    heading_align: "left",
  };

  it("plays the self-hosted video with the photo as its poster, silently and out of the tab order", () => {
    const { container } = render(PageHero, { props: { slice: slice("page_hero", primary) } });
    const video = container.querySelector("video")!;
    expect(video).not.toBeNull();
    expect(video.getAttribute("poster")).toContain("/poster.jpg");
    expect(video.muted).toBe(true);
    expect(video.getAttribute("aria-hidden")).toBe("true");
    expect(video.getAttribute("tabindex")).toBe("-1");
    expect([...video.querySelectorAll("source")].map((s) => s.getAttribute("type"))).toEqual([
      "video/webm",
      "video/mp4",
    ]);
    expect(container.innerHTML).not.toMatch(/website-files\.com/);
  });

  it("falls back to the photo when no video is set", () => {
    const { container } = render(PageHero, {
      props: { slice: slice("page_hero", { ...primary, video_mp4: noMedia, video_webm: noMedia }) },
    });
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img")?.getAttribute("src")).toContain("/poster.jpg");
  });

  it("renders one h1 and each button in the style the editor chose", () => {
    const { container, getAllByRole } = render(PageHero, {
      props: {
        slice: slice("page_hero", primary, [
          button("Contact", "/contact", "gold"),
          button("Services", "/services", "outline-light"),
          button("Services", "/services", "outline-light"),
        ]),
      },
    });
    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const links = [...container.querySelectorAll("a")];
    expect(links).toHaveLength(3);
    expect(links[0].className).toContain("bg-gold");
    expect(links[1].className).toContain("border-white");
  });
});

describe("ProjectList", () => {
  it("lists every project when the editor chose none, with scope and a named link", () => {
    const { container, getByRole } = render(ProjectList, {
      props: {
        slice: slice("project_list", { heading: "Featured Projects" }),
        context: { projects: cards },
      },
    });
    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.textContent).toContain("Courtyard Modernization");
    expect(getByRole("link", { name: "View Project: West High School" }).getAttribute("href")).toBe(
      "/projects/west-high-school",
    );
  });

  it("keeps the editor's order", () => {
    const { container } = render(ProjectList, {
      props: {
        slice: slice("project_list", { heading: null }, [rel("p2"), rel("p1")]),
        context: { projects: cards },
      },
    });
    expect([...container.querySelectorAll("h3")].map((h) => h.textContent?.trim())).toEqual([
      "MBM Hospitality",
      "West High School",
    ]);
  });

  it("shows no Scope of Work label for a project without one", () => {
    const { container } = render(ProjectList, {
      props: {
        slice: slice("project_list", { heading: null }, [rel("p2")]),
        context: { projects: cards },
      },
    });
    expect(container.textContent).not.toContain("Scope of Work");
  });
});

describe("OurPlan", () => {
  const steps = [
    "Are we the right fit?",
    "Bid Process",
    "Project Award & Kickoff",
    "Project Completion",
  ].map((title, i) => ({
    title,
    body: `Step ${i + 1} text`,
    button_label: "Contact",
    button_link: web("/contact"),
    button2_label: "Services",
    button2_link: web("/services"),
  }));
  const plan = () => slice("our_plan", { heading: "Our Plan for Your Project" }, steps);

  it("shows the first step and selects its shape", () => {
    const { getAllByRole, getByRole } = render(OurPlan, { props: { slice: plan() } });
    const tabs = getAllByRole("tab");
    expect(tabs).toHaveLength(4);
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(getByRole("tabpanel").textContent).toContain("Are we the right fit?");
  });

  it("switches the step when its shape is clicked, and paints only that shape gold", async () => {
    const { getAllByRole, getByRole, container } = render(OurPlan, { props: { slice: plan() } });
    await fireEvent.click(getAllByRole("tab")[2]);
    expect(getByRole("tabpanel").textContent).toContain("Project Award & Kickoff");
    const fills = [...container.querySelectorAll("polygon, rect")].map((el) =>
      el.getAttribute("fill"),
    );
    expect(fills.filter((f) => f === "#c6a647")).toHaveLength(1);
    expect(container.querySelectorAll("polygon")[2].getAttribute("fill")).toBe("#c6a647");
  });

  it("moves between steps with the arrow keys, keeping one shape in the tab order", async () => {
    const { getAllByRole, getByRole } = render(OurPlan, { props: { slice: plan() } });
    const tabs = getAllByRole("tab");
    await fireEvent.keyDown(tabs[0], { key: "ArrowLeft" });
    expect(getByRole("tabpanel").textContent).toContain("Project Completion");
    expect(getAllByRole("tab").map((t) => t.getAttribute("tabindex"))).toEqual([
      "-1",
      "-1",
      "-1",
      "0",
    ]);
  });
});

describe("QuoteSlider", () => {
  it("renders a quote with its attribution", () => {
    const { container } = render(QuoteSlider, {
      props: {
        slice: slice("quote_slider", { background_image: {} }, [
          {
            heading: null,
            accent: null,
            quote: "“On time.”",
            attribution: "— Steve Thompson",
            button_label: null,
            button_link: { link_type: "Any" },
          },
        ]),
      },
    });
    expect(container.querySelector("blockquote")?.textContent?.trim()).toBe("“On time.”");
    expect(container.textContent).toContain("— Steve Thompson");
    expect(container.querySelector('[aria-roledescription="carousel"]')).not.toBeNull();
  });

  it("renders a headline slide with its button", () => {
    const { getByRole, container } = render(QuoteSlider, {
      props: {
        slice: slice("quote_slider", { background_image: image("bg") }, [
          {
            heading: "Keeping your space clear,",
            accent: "so they can keep teaching.",
            quote: "Don't let your inbox fill up.",
            attribution: null,
            button_label: "Contact",
            button_link: web("/contact"),
          },
        ]),
      },
    });
    expect(getByRole("link", { name: "Contact" }).getAttribute("href")).toBe("/contact");
    expect(container.textContent).toContain("so they can keep teaching.");
  });
});

describe("SectorFeature", () => {
  it("sets the heading's second line in text-capable gold, not the fill gold", () => {
    const { container } = render(SectorFeature, {
      props: {
        slice: slice(
          "sector_feature",
          {
            label: "Healthcare",
            body: para("We have experience…"),
            icon: image("icon"),
            heading: "Modernizing spaces that",
            accent: "help them heal.",
            card_side: "left",
          },
          [button("Contact", "/contact", "primary")],
        ),
      },
    });
    const accent = [...container.querySelectorAll("h2 span")][1];
    expect(accent.textContent?.trim()).toBe("help them heal.");
    expect(accent.className).toContain("text-secondary");
    expect(accent.className).not.toContain("text-gold");
  });
});

describe("PhaseBubbles and PhaseDetail", () => {
  it("links each phase to its section and names it for a screen reader", () => {
    const { container } = render(PhaseBubbles, {
      props: {
        slice: slice(
          "phase_bubbles",
          { section_id: "approach", heading: "Phased Approach", intro: "WCC strives…", outro: [] },
          [{ icon: image("p"), label: "Planning", anchor: "phase-1" }],
        ),
      },
    });
    expect(container.querySelector("section")?.id).toBe("approach");
    const link = container.querySelector("a")!;
    expect(link.getAttribute("href")).toBe("#phase-1");
    expect(link.textContent?.replace(/\s+/g, " ").trim()).toBe("1 Phase 1: Planning");
  });

  it("gives the phase its anchor and renders its list", () => {
    const { container } = render(PhaseDetail, {
      props: {
        slice: slice("phase_detail", {
          section_id: "phase-2",
          heading: "Phase 2 - Design",
          icon: image("d"),
          body: [
            { type: "paragraph", text: "4) Design activities include:", spans: [] },
            { type: "list-item", text: "User group meetings", spans: [] },
          ],
        }),
      },
    });
    expect(container.querySelector("section")?.id).toBe("phase-2");
    expect(container.querySelector("li")?.textContent).toBe("User group meetings");
  });
});

describe("EmployeeApplication, ContactCard, CtaBlock, ClientLogos", () => {
  it("links the self-hosted application file", () => {
    const { getByRole } = render(EmployeeApplication, {
      props: {
        slice: slice("employee_application", {
          heading: "Are you interested in joining the Williamson Construction team?",
          body: "Download and submit the below form to",
          email: "info@williamson-construction.com",
          file: mediaLink("williamson-employee-app.pdf"),
          button_label: "Employee Application",
        }),
      },
    });
    expect(getByRole("link", { name: "Employee Application" }).getAttribute("href")).toContain(
      "cdn.prismic.io",
    );
    expect(
      getByRole("link", { name: "info@williamson-construction.com" }).getAttribute("href"),
    ).toBe("mailto:info@williamson-construction.com");
  });

  it("puts the company's details in an address", () => {
    const { container } = render(ContactCard, {
      props: {
        slice: slice(
          "contact_card",
          {
            photo: image("brian"),
            name: "Brian Williamson",
            role: "CEO",
            heading: "Call to set up a meeting",
            body: "…",
            email: "info@williamson-construction.com",
            address: "14701 Hawthorne Blvd. Lawndale, CA 90260",
            license: "Lic.# 976074",
          },
          [button("Email me", "mailto:info@williamson-construction.com", "gold")],
        ),
      },
    });
    const address = container.querySelector("address")!;
    expect(address.textContent).toContain("14701 Hawthorne Blvd.");
    expect(address.querySelector("a")?.getAttribute("href")).toBe(
      "mailto:info@williamson-construction.com",
    );
  });

  it("sizes the CTA heading as the editor chose", () => {
    const { container } = render(CtaBlock, {
      props: {
        slice: slice("cta_block", { heading: "We are changing the industry…", size: "medium" }),
      },
    });
    expect(container.querySelector("h2")?.className).toContain("wc-h2");
  });

  it("names each client logo from its alt text and skips empty ones", () => {
    const { container } = render(ClientLogos, {
      props: {
        slice: slice("client_logos", { heading: null }, [
          { logo: image("c", "Cedars-Sinai") },
          { logo: {} },
        ]),
      },
    });
    const logos = [...container.querySelectorAll("img")];
    expect(logos).toHaveLength(1);
    expect(logos[0].getAttribute("alt")).toBe("Cedars-Sinai");
  });
});
