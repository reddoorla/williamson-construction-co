import { describe, expect, it } from "vitest";

import { documents } from "../../src/lib/site-pages.js";
import { linkTargets, relink } from "./relink.mjs";

const link = (type: string, uid: string) => ({
  link_type: "Document",
  type,
  uid,
  id: `${type}-${uid}`,
});

describe("relink", () => {
  it("resolves a link to a document the seed creates", () => {
    const created = new Map<string, unknown>([["page:contact", { id: "doc" }]]);
    const out = relink({ button_link: link("page", "contact") }, created) as {
      button_link: () => unknown;
    };
    expect(out.button_link()).toEqual({ id: "doc" });
  });

  it("throws on a link to a document the seed does not create", () => {
    const out = relink([{ project: link("project", "nope") }], new Map()) as Array<{
      project: () => unknown;
    }>;
    expect(() => out[0].project()).toThrow(/project:nope, which the seed does not create/);
  });

  it("leaves web and media links alone", () => {
    const web = { link_type: "Web", url: "mailto:x@y.z" };
    expect(relink({ web }, new Map())).toEqual({ web });
  });
});

describe("the fixture's links", () => {
  it("all point at documents the fixture creates", () => {
    const plan = documents((key: string) => ({ key })) as Array<{ type: string; uid: string }>;
    const planned = new Set(plan.map((doc) => `${doc.type}:${doc.uid}`));
    const targets = [...linkTargets(plan)];
    expect(targets.length).toBeGreaterThan(0);
    expect(targets.filter((t) => !planned.has(t))).toEqual([]);
  });

  it("finds a dangling link when one is planted", () => {
    expect([...linkTargets({ a: [{ b: link("page", "ghost") }] })]).toEqual(["page:ghost"]);
  });
});
