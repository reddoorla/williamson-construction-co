import { error, redirect } from "@sveltejs/kit";

import { INTAKE_PAGE_UID } from "$lib/intake";
import { loadPage } from "$lib/page-load";
import { createClient, isPlaceholderRepo } from "$lib/prismicio";
import { loadProjectCards } from "$lib/projects";

export async function load({ params, fetch, cookies }) {
  if (params.uid === "home") redirect(308, "/");

  if (isPlaceholderRepo) error(404, { message: "Page not found" });

  const client = createClient({ fetch, cookies });
  const [loaded, projects] = await Promise.all([
    loadPage(client, params.uid),
    loadProjectCards(client),
  ]);
  return { ...loaded, projects };
}

export async function entries() {
  if (isPlaceholderRepo) return [];

  const pages = await createClient().getAllByType("page");
  // /join-the-team has its own route: it carries a form action, so it is not
  // prerendered and must not be listed here.
  return pages
    .filter((page) => page.uid !== "home" && page.uid !== INTAKE_PAGE_UID)
    .map((page) => ({ uid: page.uid }));
}
