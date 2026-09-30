import { error, fail } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";
import { createIngestAction } from "@reddoorla/maintenance/forms";

import { INTAKE_PAGE_UID, TOKEN_MISSING, intakePayload, missingTurnstileToken } from "$lib/intake";
import { loadPage } from "$lib/page-load";
import { createClient, isPlaceholderRepo } from "$lib/prismicio";
import { replyCopyFor } from "$lib/server/reply-copy";
import type { Actions, PageServerLoad } from "./$types";

// A form action cannot run on a prerendered route.
export const prerender = false;

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  if (isPlaceholderRepo) error(404, { message: "Page not found" });

  const loaded = await loadPage(createClient({ fetch, cookies }), INTAKE_PAGE_UID);
  return { ...loaded, formTs: Date.now() };
};

const ingest = createIngestAction({
  formType: "inquiry",
  getConfig: () => ({ url: env.FORMS_INGEST_URL, token: env.FORMS_INGEST_TOKEN }),
  buildPayload: async (form, event) => ({
    ...intakePayload(form),
    sourceUrl: event.url.href,
    // The fleet form-e2e probe's marker, forwarded only when the form carries
    // it; central routes a testMode submission away from every real sink.
    testMode: form.get("testMode")?.toString() === "true" || undefined,
    _reply: await replyCopyFor(event, "inquiry"),
  }),
});

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request
      .clone()
      .formData()
      .catch(() => null);
    if (form && missingTurnstileToken(form, publicEnv.PUBLIC_TURNSTILE_SITE_KEY)) {
      return fail(400, { error: TOKEN_MISSING });
    }
    return ingest(event);
  },
};
