import { error } from "@sveltejs/kit";

import { loadPage } from "$lib/page-load";
import { createClient, isPlaceholderRepo } from "$lib/prismicio";
import { loadProjectCards } from "$lib/projects";

export async function load({ fetch, cookies }) {
  if (isPlaceholderRepo) error(404, { message: "Page not found" });

  const client = createClient({ fetch, cookies });
  const [loaded, projects] = await Promise.all([
    loadPage(client, "home"),
    loadProjectCards(client),
  ]);
  return { ...loaded, projects };
}

export function entries() {
  return isPlaceholderRepo ? [] : [{}];
}
