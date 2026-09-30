/**
 * Has this seed already run against the repository? The migration release it
 * creates is invisible to the public Content API (only the master ref is
 * listed), so the check asks the Asset API whether a file only the seed
 * uploads is already there. A second run would upload every file again and
 * then collide on the uids it staged the first time.
 *
 * @param {{ repositoryName: string, writeToken: string, filename: string, fetch?: typeof fetch }} options
 * @returns {Promise<boolean>}
 */
export async function alreadySeeded({
  repositoryName,
  writeToken,
  filename,
  fetch = globalThis.fetch,
}) {
  const keyword = filename.replace(/\.[^.]+$/, "");
  const res = await fetch(
    `https://asset-api.prismic.io/assets?keyword=${encodeURIComponent(keyword)}&limit=50`,
    { headers: { Authorization: `Bearer ${writeToken}`, repository: repositoryName } },
  );
  if (!res.ok)
    throw new Error(
      `seed: the Asset API answered ${res.status}; cannot tell whether the seed already ran`,
    );
  const body = /** @type {{ items?: Array<{ filename?: string }> }} */ (await res.json());
  return (body.items ?? []).some((item) => item.filename === filename);
}
