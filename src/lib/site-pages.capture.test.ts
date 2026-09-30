import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { captureFileFor, collectImageKeys } from "./capture-files.js";
import { documents, PROJECTS } from "./site-pages.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SPEC = join(ROOT, "matching/spec");
const manifest = JSON.parse(readFileSync(join(SPEC, "manifest.json"), "utf8")) as {
  pages: Array<{ path: string; file: string }>;
  files: Array<{ file: string }>;
};

type Doc = { type: string; uid: string; data: Record<string, unknown> };
const docs = documents((key: string) => ({ key })) as Doc[];

const capturedProjectSlugs = manifest.pages
  .map((page) => page.path.match(/^\/projects\/([^/]+)$/)?.[1])
  .filter((slug): slug is string => !!slug)
  .sort();

function galleryInCapture(slug: string): number {
  const html = readFileSync(join(SPEC, `pages/projects/${slug}/index.html`), "utf8");
  const list = html.split('role="list" class="w-dyn-items"')[1]?.split("</section>")[0] ?? "";
  return (list.match(/<img /g) ?? []).length;
}

function modelFields(file: string): string[] {
  const model = JSON.parse(readFileSync(join(ROOT, file), "utf8"));
  return Object.values(model.json as Record<string, Record<string, unknown>>).flatMap((tab) =>
    Object.keys(tab),
  );
}

describe("site-pages against the Webflow capture", () => {
  it("seeds exactly the projects the reference publishes", () => {
    expect(capturedProjectSlugs).toHaveLength(8);
    expect(PROJECTS.map((p) => p.uid).sort()).toEqual(capturedProjectSlugs);
    expect(
      docs
        .filter((d) => d.type === "project")
        .map((d) => d.uid)
        .sort(),
    ).toEqual(capturedProjectSlugs);
  });

  it("carries every gallery photo each project page shows", () => {
    for (const project of PROJECTS) {
      expect(project.gallery.length, project.uid).toBe(galleryInCapture(project.uid));
    }
  });

  it("lists the projects in the order the reference's /projects page does", () => {
    const html = readFileSync(join(SPEC, "pages/projects/index.html"), "utf8");
    const order = [
      ...html.matchAll(/href="\/projects\/([^"]+)" class="inline-link w-inline-block"/g),
    ].map((m) => m[1]);
    expect(order).toHaveLength(8);
    expect(PROJECTS.map((p) => p.uid)).toEqual(order);
  });

  it("carries each project's scope of work as the reference writes it", () => {
    for (const project of PROJECTS) {
      const html = readFileSync(join(SPEC, `pages/projects/${project.uid}/index.html`), "utf8");
      const block =
        html.split('Scope of Work</p><div class="w-richtext">')[1]?.split("</div>")[0] ?? "";
      const lines = [...block.matchAll(/<p>(.*?)<\/p>/g)]
        .map((m) =>
          m[1]
            .replace(/<[^>]+>/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&#x27;/g, "'")
            .replace(/\u200d/g, "")
            .trim(),
        )
        .filter(Boolean);
      expect(project.scope, project.uid).toEqual(lines);
    }
  });

  it("embeds the one Vimeo video the reference shows, on its project", () => {
    const withVideo = PROJECTS.filter((p) => p.vimeo).map((p) => [p.uid, p.vimeo]);
    expect(withVideo).toEqual([
      ["cedars-sinai-pro-building-cooling-tower-refurbishment", "https://vimeo.com/1138278406"],
    ]);
  });

  it("resolves every image to exactly one captured file", () => {
    const keys = collectImageKeys(documents);
    const galleryTotal = PROJECTS.reduce((n, p) => n + p.gallery.length, 0);
    expect(galleryTotal).toBe(38);
    expect(keys.length).toBeGreaterThan(galleryTotal);
    for (const key of keys) {
      const file = captureFileFor(manifest, key);
      expect(existsSync(join(SPEC, file)), key).toBe(true);
    }
  });

  it("self-hosts all six background videos, both encodings, and the application PDF", () => {
    const media: string[] = [];
    documents(
      () => ({}),
      (key: string) => {
        media.push(key);
        return {};
      },
    );
    const unique = [...new Set(media)];
    expect(unique.filter((k) => k.endsWith(".mp4"))).toHaveLength(6);
    expect(unique.filter((k) => k.endsWith(".webm"))).toHaveLength(6);
    expect(unique.filter((k) => k.endsWith(".pdf"))).toHaveLength(1);
    for (const key of unique)
      expect(existsSync(join(SPEC, captureFileFor(manifest, key))), key).toBe(true);
  });

  it("names no Webflow host or githack URL outside the image resolver", () => {
    const serialized = JSON.stringify(documents(() => ({ key: "IMG" })));
    expect(serialized).not.toMatch(/website-files\.com|webflow|githack/i);
  });
});

describe("site-pages documents against their custom types", () => {
  const allowed: Record<string, string[]> = {
    page: modelFields("customtypes/page/index.json"),
    project: modelFields("customtypes/project/index.json"),
  };

  it("sets only fields the model declares, so the Migration API strips nothing", () => {
    const stripped: string[] = [];
    for (const doc of docs) {
      const fields = allowed[doc.type];
      expect(fields, doc.type).toBeDefined();
      for (const key of Object.keys(doc.data)) {
        if (!fields.includes(key)) stripped.push(`${doc.type}/${doc.uid}.${key}`);
      }
    }
    expect(stripped).toEqual([]);
  });

  it("gives every page a unique uid and the six reference paths", () => {
    const pages = docs.filter((d) => d.type === "page").map((d) => d.uid);
    expect(new Set(pages).size).toBe(pages.length);
    const captured = manifest.pages
      .map((page) => page.path)
      .filter((path) => !path.startsWith("/projects/"))
      .map((path) => (path === "/" ? "home" : path.slice(1)))
      .sort();
    expect(captured).toHaveLength(6);
    expect(pages.sort()).toEqual(captured);
  });

  it("uses only slices the page type allows", () => {
    const page = JSON.parse(readFileSync(join(ROOT, "customtypes/page/index.json"), "utf8"));
    const choices = Object.keys(page.json.Main.slices.config.choices);
    const used = docs.flatMap((d) =>
      ((d.data.slices as Array<{ slice_type: string }> | undefined) ?? []).map((s) => s.slice_type),
    );
    expect(used.length).toBeGreaterThan(0);
    expect([...new Set(used)].filter((t) => !choices.includes(t))).toEqual([]);
  });
});

describe("site-pages buttons against the capture", () => {
  type Link = { link_type?: string; url?: string; uid?: string; type?: string; key?: string };
  const href = (link: Link | undefined): string | null => {
    if (!link) return null;
    if (link.link_type === "Document") return link.uid === "home" ? "/" : `/${link.uid}`;
    if (link.link_type === "Web") return link.url ?? null;
    if (link.link_type === "Media") return link.key ? `media:${link.key.split("/").pop()}` : null;
    return null;
  };

  function fixtureButtons(uid: string): string[] {
    const doc = docs.find((d) => d.uid === uid)!;
    const out: string[] = [];
    for (const s of (doc.data.slices as Array<{
      slice_type: string;
      primary: Record<string, unknown>;
      items: Array<Record<string, unknown>>;
    }>) ?? []) {
      for (const item of s.items) {
        for (const [label, link] of [
          ["button_label", "button_link"],
          ["button2_label", "button2_link"],
        ]) {
          const target = href(item[link] as Link);
          if (item[label] && target) out.push(`${item[label]} -> ${target}`);
        }
        if (s.slice_type === "phase_slider" && item.anchor)
          out.push(`${item.button_label} -> #${item.anchor}`);
      }
      if (s.slice_type === "employee_application")
        out.push(`${s.primary.button_label} -> ${href(s.primary.file as Link)}`);
    }
    return out;
  }

  function captureButtons(uid: string): string[] {
    const path = uid === "home" ? "pages/index.html" : `pages/${uid}/index.html`;
    const html = readFileSync(join(SPEC, path), "utf8");
    const main = html.slice(html.indexOf("</section>"), html.indexOf('<section class="footer'));
    return [...main.matchAll(/<a href="([^"]+)" class="[^"]*\bw-button\b[^"]*">([^<]+)<\/a>/g)]
      .map(([, target, label]) => {
        const file = /^https:\/\/cdn\.prod\.website-files\.com\//.test(target)
          ? `media:${target.split("/").pop()}`
          : target;
        return `${label.trim()} -> ${file}`;
      })
      .filter((pair) => !pair.startsWith("View Project -> "));
  }

  // Deliberate, each with a matching/LEDGER.md line: the plan's "Services"
  // buttons go to /services (the reference sent three of four to /contact), and
  // phone links are digits only.
  const deviate = (pair: string) =>
    pair
      .replace("Services -> /contact", "Services -> /services")
      .replace("tel:310.570.7278", "tel:3105707278");

  it.each(["home", "services", "about-us", "projects", "contact", "join-the-team"])(
    "%s carries the reference's buttons, labels and targets, in order",
    (uid) => {
      const expected = captureButtons(uid).map(deviate);
      expect(fixtureButtons(uid)).toEqual(expected);
    },
  );
});
