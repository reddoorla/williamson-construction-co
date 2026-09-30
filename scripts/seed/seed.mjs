import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import * as prismic from "@prismicio/client";

import { captureFileFor, collectImageKeys } from "../../src/lib/capture-files.js";
import { documents, lang } from "../../src/lib/site-pages.js";
import { linkTargets, relink } from "./relink.mjs";

const SPEC = "matching/spec";
const dryRun = process.argv.includes("--dry-run");
const manifest = JSON.parse(readFileSync(join(SPEC, "manifest.json"), "utf8"));

const keys = collectImageKeys(documents);
const files = new Map(keys.map((key) => [key, captureFileFor(manifest, key)]));
const plan = documents((key) => ({ key }));
const planned = new Set(plan.map((doc) => `${doc.type}:${doc.uid}`));
const dangling = [...linkTargets(plan)].filter((target) => !planned.has(target));
if (dangling.length > 0) {
  console.error(`seed: links to documents the seed does not create: ${dangling.join(", ")}`);
  process.exit(1);
}

console.log(
  `seed plan: ${plan.filter((d) => d.type === "page").length} pages, ` +
    `${plan.filter((d) => d.type === "project").length} projects, ${files.size} files from ${SPEC}`,
);
if (dryRun) process.exit(0);

const repositoryName = process.env.PRISMIC_REPOSITORY_NAME;
const writeToken = process.env.PRISMIC_WRITE_TOKEN;
if (!repositoryName || !writeToken) {
  console.error("PRISMIC_REPOSITORY_NAME and PRISMIC_WRITE_TOKEN must be set (or pass --dry-run).");
  process.exit(1);
}

const migration = prismic.createMigration();
const assets = new Map();
/** @param {string} key @param {string} [alt] */
const asset = (key, alt) => {
  if (!assets.has(key)) {
    const file = files.get(key);
    const bytes = readFileSync(join(SPEC, file));
    assets.set(
      key,
      migration.createAsset(new File([bytes], basename(file)), basename(file), alt ? { alt } : {}),
    );
  }
  return assets.get(key);
};
/** @param {string} key */
const media = (key) => ({ link_type: "Media", id: asset(key) });

const docs = documents(asset, media);
const created = new Map();

for (const doc of docs) {
  created.set(
    `${doc.type}:${doc.uid}`,
    migration.createDocument(
      { type: doc.type, uid: doc.uid, lang, data: relink(doc.data, created) },
      doc.title,
    ),
  );
}

const client = prismic.createWriteClient(repositoryName, { writeToken });
await client.migrate(migration, {
  reporter: (event) => console.log(event.type, event.data?.current ?? "", event.data?.total ?? ""),
});
console.log("seed: done — review the migration release in Prismic, then publish it");
