import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

vi.mock("$app/state", () => ({ page: { url: new URL("https://example.test/services") } }));

const { default: SiteHeader } = await import("./SiteHeader.svelte");

afterEach(() => cleanup());

const menuOf = (container: HTMLElement) => container.ownerDocument.getElementById("wc-menu")!;

describe("SiteHeader", () => {
  it("toggles one disclosure panel from one button, as the reference's open-nav/close-nav do", async () => {
    const { container, getByRole } = render(SiteHeader);
    const button = getByRole("button", { name: "Menu" });
    expect(button.getAttribute("aria-controls")).toBe("wc-menu");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(menuOf(container).dataset.open).toBe("false");

    await fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(menuOf(container).dataset.open).toBe("true");

    await fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(menuOf(container).dataset.open).toBe("false");
  });

  it("is a panel under the bar, not a modal dialog", () => {
    const { container } = render(SiteHeader);
    const menu = menuOf(container);
    expect(menu.closest("header")).not.toBeNull();
    expect(menu.getAttribute("role")).toBeNull();
    expect(menu.getAttribute("aria-modal")).toBeNull();
  });

  it("hides the closed panel from the tab order and the accessibility tree", async () => {
    const { container, getByRole } = render(SiteHeader);
    expect(menuOf(container).className).toMatch(/(^|\s)invisible(\s|$)/);
    await fireEvent.click(getByRole("button", { name: "Menu" }));
    expect(menuOf(container).className).toMatch(/(^|\s)visible(\s|$)/);
    expect(menuOf(container).className).not.toMatch(/(^|\s)invisible(\s|$)/);
  });

  it("makes the closed panel inert at once, so Tab cannot land in it while it slides away", async () => {
    const { container, getByRole } = render(SiteHeader);
    const button = getByRole("button", { name: "Menu" });
    expect(menuOf(container).inert).toBe(true);
    await fireEvent.click(button);
    expect(menuOf(container).inert).toBe(false);
    await fireEvent.click(button);
    expect(menuOf(container).inert).toBe(true);
  });

  it("is a labelled navigation list on a phone, where the desktop nav is not displayed", () => {
    const { container } = render(SiteHeader);
    const menu = menuOf(container);
    expect(menu.tagName).toBe("NAV");
    expect(menu.getAttribute("aria-label")).toBe("Menu");
    expect(menu.querySelectorAll("ul > li > a")).toHaveLength(4);
  });

  it("closes when focus leaves the header, and not when it moves inside it", async () => {
    const { container, getByRole } = render(SiteHeader);
    const button = getByRole("button", { name: "Menu" });
    const outside = container.ownerDocument.createElement("button");
    container.ownerDocument.body.appendChild(outside);
    await fireEvent.click(button);
    const links = menuOf(container).querySelectorAll("a");
    links[1]!.focus();
    expect(button.getAttribute("aria-expanded")).toBe("true");
    await new Promise((r) => setTimeout(r));
    expect(button.getAttribute("aria-expanded")).toBe("true");
    links[1]!.blur();
    await new Promise((r) => setTimeout(r));
    expect(
      button.getAttribute("aria-expanded"),
      "focus falling to <body> is not focus leaving",
    ).toBe("true");
    links[1]!.focus();
    outside.focus();
    await new Promise((r) => setTimeout(r));
    expect(button.getAttribute("aria-expanded")).toBe("false");
    outside.remove();
  });

  it("closes on Escape and hands focus back to the button", async () => {
    const { container, getByRole } = render(SiteHeader);
    const button = getByRole("button", { name: "Menu" });
    await fireEvent.click(button);
    const link = menuOf(container).querySelector("a")!;
    link.focus();
    await fireEvent.keyDown(link, { key: "Escape" });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(button);
  });

  it("closes when one of its links is followed", async () => {
    const { container, getByRole } = render(SiteHeader);
    const button = getByRole("button", { name: "Menu" });
    await fireEvent.click(button);
    await fireEvent.click(menuOf(container).querySelector("a")!);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("uses the reference's own menu and close icons", () => {
    const { getByRole } = render(SiteHeader);
    const srcs = [...getByRole("button", { name: "Menu" }).querySelectorAll("img")].map((i) =>
      i.getAttribute("src"),
    );
    expect(srcs).toEqual(["/images/menu-icon_white.svg", "/images/close-icon_white.svg"]);
  });

  it("lists the four sections in the panel, Services pointing at /services", () => {
    const { container } = render(SiteHeader);
    const links = [...menuOf(container).querySelectorAll("a")].map((a) => [
      a.textContent?.trim(),
      a.getAttribute("href"),
    ]);
    expect(links).toEqual([
      ["About", "/about-us"],
      ["Services", "/services"],
      ["Projects", "/projects"],
      ["Contact", "/contact"],
    ]);
  });

  it("marks the current section and links Services to /services", () => {
    const { container } = render(SiteHeader);
    const current = [
      ...container.querySelectorAll('nav[aria-label="Main"] a[aria-current="page"]'),
    ];
    expect(current.map((a) => a.getAttribute("href"))).toEqual(["/services"]);
    const services = [...container.querySelectorAll('nav[aria-label="Main"] a')].find(
      (a) => a.textContent?.trim() === "Services",
    );
    expect(services?.getAttribute("href")).toBe("/services");
  });

  it("renders one header bar, with no second sticky copy to overlap it", () => {
    const { container } = render(SiteHeader);
    expect(container.querySelectorAll("header")).toHaveLength(1);
    expect(container.querySelectorAll('nav[aria-label^="Main"]')).toHaveLength(1);
  });
});
