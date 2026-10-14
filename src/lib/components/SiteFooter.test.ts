import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import SiteFooter from "./SiteFooter.svelte";

afterEach(() => cleanup());

describe("SiteFooter", () => {
  it("links to the privacy page", () => {
    const { container } = render(SiteFooter);
    const link = container.querySelector("footer a[href='/privacy']");
    expect(link?.textContent).toBe("Privacy Policy");
  });
});
