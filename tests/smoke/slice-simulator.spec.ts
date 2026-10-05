import { test, expect } from "@playwright/test";

const PRISMIC_FRAMER = "https://*.prismic.io";

for (const path of ["/slice-simulator", "/slice%2Dsimulator", "/slice%2dsimulator"]) {
  test(`${path} lets Prismic frame it`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers()["x-frame-options"]).toBeUndefined();
    const policy = response.headers()["content-security-policy"] ?? "";
    expect(policy.match(/frame-ancestors[^;]*/)?.[0]).toContain(PRISMIC_FRAMER);
  });
}

test("an ordinary server-rendered page does not let Prismic frame it", async ({ request }) => {
  const response = await request.get("/join-the-team");
  expect(response.status()).toBe(200);
  expect(response.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  const policy = response.headers()["content-security-policy"] ?? "";
  const ancestors = policy.match(/frame-ancestors[^;]*/)?.[0];
  expect(ancestors).toBeDefined();
  expect(ancestors).not.toContain(PRISMIC_FRAMER);
});
