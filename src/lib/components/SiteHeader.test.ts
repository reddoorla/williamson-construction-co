import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

vi.mock("$app/state", () => ({ page: { url: new URL("https://example.test/services") } }));

const { default: SiteHeader } = await import("./SiteHeader.svelte");

afterEach(() => cleanup());

describe("SiteHeader", () => {
  it("points aria-controls at the menu only while the menu exists", async () => {
    const { container, getByLabelText } = render(SiteHeader);
    const button = getByLabelText("Open menu");
    expect(button.hasAttribute("aria-controls")).toBe(false);
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(container.ownerDocument.getElementById("wc-menu")).toBeNull();

    await fireEvent.click(button);
    expect(button.getAttribute("aria-controls")).toBe("wc-menu");
    expect(container.ownerDocument.getElementById("wc-menu")).not.toBeNull();
  });

  it("marks the current section and links Services to /services", () => {
    const { container } = render(SiteHeader);
    const current = [...container.querySelectorAll('nav a[aria-current="page"]')];
    expect(current.map((a) => a.getAttribute("href"))).toEqual(["/services"]);
    const services = [...container.querySelectorAll("nav a")].find(
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
