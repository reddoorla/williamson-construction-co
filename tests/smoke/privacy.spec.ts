import { expect, test } from "@playwright/test";

// The footer's privacy link must be in the server-rendered HTML, so it is
// there for a visitor whose script never runs. `request` fetches the document
// without a browser, so nothing client-side can have added it.
test("the home page's server HTML links to /privacy", async ({ request }) => {
  const response = await request.get("/");
  const html = await response.text();
  expect(html).toMatch(/<footer[\s\S]*<a[^>]*href="\/privacy"[\s\S]*<\/footer>/);
});
