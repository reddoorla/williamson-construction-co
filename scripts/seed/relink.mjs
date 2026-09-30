/**
 * Replace every document link in a fixture value with a thunk the Migration
 * API resolves to the document the seed creates. A link to a document the seed
 * does not create throws when resolved, so a typo'd uid fails the migration
 * instead of publishing a broken link.
 *
 * @param {unknown} value
 * @param {Map<string, unknown>} created keyed `${type}:${uid}`
 * @returns {unknown}
 */
export function relink(value, created) {
  if (Array.isArray(value)) return value.map((v) => relink(v, created));
  if (value && typeof value === "object") {
    const record = /** @type {Record<string, unknown>} */ (value);
    if (record.link_type === "Document" && record.uid) {
      const target = `${record.type}:${record.uid}`;
      return () => {
        const doc = created.get(target);
        if (!doc)
          throw new Error(`seed: a link points at ${target}, which the seed does not create`);
        return doc;
      };
    }
    if (value.constructor !== Object) return value;
    return Object.fromEntries(Object.entries(record).map(([k, v]) => [k, relink(v, created)]));
  }
  return value;
}

/**
 * Every `${type}:${uid}` a fixture links to.
 *
 * @param {unknown} value
 * @param {Set<string>} [acc]
 * @returns {Set<string>}
 */
export function linkTargets(value, acc = new Set()) {
  if (Array.isArray(value)) value.forEach((v) => linkTargets(v, acc));
  else if (value && typeof value === "object") {
    const record = /** @type {Record<string, unknown>} */ (value);
    if (record.link_type === "Document" && record.uid) acc.add(`${record.type}:${record.uid}`);
    else Object.values(record).forEach((v) => linkTargets(v, acc));
  }
  return acc;
}
