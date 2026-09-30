import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const publicEnv: Record<string, string | undefined> = {};
vi.mock("$env/dynamic/public", () => ({ env: publicEnv }));
vi.mock("$env/dynamic/private", () => ({
  env: {
    FORMS_INGEST_URL: "https://central.test/api/forms/williamson-construction-co",
    FORMS_INGEST_TOKEN: "t",
  },
}));
vi.mock("$lib/server/reply-copy", () => ({ replyCopyFor: async () => undefined }));

const { actions } = await import("./+page.server");
const { TOKEN_MISSING } = await import("$lib/intake");

type Posted = { url: string; body: Record<string, unknown> };

function event(fields: Record<string, string>, posted: Posted[]) {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) body.set(key, value);
  const request = new Request("https://site.test/join-the-team", { method: "POST", body });
  const fetch = vi.fn(async (url: string, init: RequestInit) => {
    posted.push({ url, body: JSON.parse(String(init.body)) });
    return new Response(JSON.stringify({ ok: true, id: "sub_1" }), { status: 200 });
  });
  return {
    request,
    fetch,
    url: new URL("https://site.test/join-the-team?utm_source=x"),
    getClientAddress: () => "127.0.0.1",
  } as never;
}

const filled = {
  ts: String(Date.now() - 60_000),
  company: "Acme Mechanical",
  email: "bids@acme.test",
  prevailing_wage: "Yes",
  union: "No",
  testMode: "true",
};

beforeEach(() => {
  delete publicEnv.PUBLIC_TURNSTILE_SITE_KEY;
});
afterEach(() => vi.restoreAllMocks());

describe("the /join-the-team action", () => {
  it("refuses a submission with no Turnstile token when a sitekey is set, and sends nothing", async () => {
    publicEnv.PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAAAAD_aiDmsrlRAHq-V";
    const posted: Posted[] = [];
    const result = (await actions.default(event(filled, posted))) as {
      status: number;
      data: { error: string };
    };
    expect(result.status).toBe(400);
    expect(result.data.error).toBe(TOKEN_MISSING);
    expect(posted).toEqual([]);
  });

  it("forwards a tokened submission as an inquiry with every intake field", async () => {
    publicEnv.PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAAAAD_aiDmsrlRAHq-V";
    const posted: Posted[] = [];
    const result = await actions.default(
      event({ ...filled, "cf-turnstile-response": "token-1" }, posted),
    );
    expect(result).toEqual({ success: true });
    expect(posted).toHaveLength(1);
    expect(posted[0].url).toBe("https://central.test/api/forms/williamson-construction-co");
    expect(posted[0].body).toMatchObject({
      formType: "inquiry",
      name: "Acme Mechanical",
      email: "bids@acme.test",
      prevailing_wage: "Yes",
      union: "No",
      testMode: true,
      sourceUrl: "https://site.test/join-the-team?utm_source=x",
    });
  });

  it("does not mark a real visitor's submission as a test", async () => {
    const posted: Posted[] = [];
    const { testMode: _drop, ...real } = filled;
    await actions.default(event(real, posted));
    expect(posted[0].body.testMode).toBeUndefined();
  });
});
