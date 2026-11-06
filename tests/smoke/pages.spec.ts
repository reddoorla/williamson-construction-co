import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";
import { smokeRoutes } from "./routes";

// Console messages we don't care about. Add patterns here only after seeing them
// in CI and confirming they aren't actionable. Patterns are matched against both
// the message text and the offending resource URL — Chromium's "Failed to load
// resource" text omits the URL, so URL matching catches third-party network noise.
const ALLOWED_CONSOLE_PATTERNS: RegExp[] = [
  // Vimeo iframe embeds + their CDN telemetry endpoints occasionally 403 from
  // cloud IPs due to bot detection.
  /vimeo/i,
  // Turnstile (Cloudflare) telemetry occasionally surfaces in console.
  /turnstile|challenges\.cloudflare/i,
];

function attachConsoleWatcher(page: Page, extraAllowed: RegExp[] = []) {
  const errors: string[] = [];
  const allowed = [...ALLOWED_CONSOLE_PATTERNS, ...extraAllowed];
  const isAllowed = (s: string) => !!s && allowed.some((re) => re.test(s));

  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    const url = msg.location()?.url ?? "";
    if (isAllowed(text) || isAllowed(url)) return;
    errors.push(`[console.error] ${text}${url ? ` (${url})` : ""}`);
  });

  page.on("pageerror", (err) => {
    if (isAllowed(err.message)) return;
    errors.push(`[pageerror] ${err.message}`);
  });

  return errors;
}

// The root layout's onMount writes `html[data-hydrated]`. Console errors are read
// only after it, because CI's smoke step runs on `vite dev`, where `load` fires
// about 2s before hydration and an error thrown while hydrating would otherwise
// ship green. A hydration that never happens is reported after the errors, which
// are usually its cause.
async function hydrated(page: Page, errors: string[], where: string) {
  await page
    .locator("html[data-hydrated]")
    .waitFor({ state: "attached", timeout: 15_000 })
    .catch(() => {});
  expect(errors, `console errors on ${where}`).toEqual([]);
  await expect(page.locator("html[data-hydrated]"), "the app never hydrated").toBeAttached();
}

for (const route of smokeRoutes) {
  test(
    `${route.path} (${route.name}) loads with no console errors`,
    { tag: "@smoke" },
    async ({ page }) => {
      const expectedStatus = route.expectStatus ?? 200;
      // A route whose expected status IS an error (e.g. "/" on the placeholder
      // starter, see tests/smoke/routes.ts) makes the browser log "Failed to
      // load resource: ... <status>" for the document itself — expected, not a
      // bug. Same allowance as the dedicated 404-page test below.
      const errors = attachConsoleWatcher(
        page,
        expectedStatus >= 400
          ? [new RegExp(`Failed to load resource.*${expectedStatus}`, "i")]
          : [],
      );
      const response = await page.goto(route.path, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status(), `HTTP status for ${route.path}`).toBe(expectedStatus);
      if (route.hydrationMarker) {
        await expect(
          page.locator(route.hydrationMarker),
          `hydration marker "${route.hydrationMarker}" on ${route.path}`,
        ).toBeVisible();
      }
      await hydrated(page, errors, route.path);
    },
  );
}

test("404 page renders the custom error component", { tag: "@smoke" }, async ({ page }) => {
  // The browser logs a top-level "Failed to load resource: 404" for the page
  // itself — expected on a 404 route, not a bug. Allow it here.
  const errors = attachConsoleWatcher(page, [/Failed to load resource.*404/i]);
  const response = await page.goto("/this-uid-does-not-exist", {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status()).toBe(404);
  // src/routes/+error.svelte renders `<h1>{page.status}</h1>` → "404".
  await expect(page.getByText("404", { exact: false }).first()).toBeVisible();
  await hydrated(page, errors, "the 404 page");
});
