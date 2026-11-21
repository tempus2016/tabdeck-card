// The published JSON schema (docs-site/public/schema) must know every option
// the card reads, and accept the shipped examples.
/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import { parse } from "yaml";
import schemaText from "../../docs-site/public/schema/tabdeck-card.schema.json?raw";
import demoYaml from "../../examples/demo.yaml?raw";
import { normalizeConfig } from "./config";
import { EXAMPLES } from "../../demo/examples";

const schema = JSON.parse(schemaText);
const topKeys = Object.keys(schema.properties);
const tabKeys = Object.keys(schema.definitions.tab.properties);

// Keys normalizeConfig adds for its own use, never written in YAML.
const INTERNAL_TAB = ["group"];

// Every tabdeck card config in a parsed value (cards nest anywhere).
function decks(node: any, out: any[] = []): any[] {
  if (Array.isArray(node)) node.forEach((n) => decks(n, out));
  else if (node && typeof node === "object") {
    if (node.type === "custom:tabdeck-card") out.push(node);
    Object.values(node).forEach((v) => decks(v, out));
  }
  return out;
}

function unknownKeys(deck: any): string[] {
  const bad = Object.keys(deck).filter((k) => !topKeys.includes(k));
  const walkTabs = (tabs: any[]) =>
    (tabs ?? []).forEach((t) => {
      bad.push(...Object.keys(t ?? {}).filter((k) => !tabKeys.includes(k)).map((k) => `tab.${k}`));
      if (Array.isArray(t?.children)) walkTabs(t.children);
    });
  walkTabs(deck.tabs);
  return bad;
}

describe("JSON schema", () => {
  it("covers every top-level option", () => {
    const keys = Object.keys(normalizeConfig({ tabs: [{ name: "a" }] }));
    expect(keys.filter((k) => !topKeys.includes(k))).toEqual([]);
  });

  it("covers every tab option", () => {
    const keys = Object.keys(normalizeConfig({ tabs: [{ name: "a" }] }).tabs[0]).filter((k) => !INTERNAL_TAB.includes(k));
    expect(keys.filter((k) => !tabKeys.includes(k))).toEqual([]);
  });

  it("knows every option used in the examples", () => {
    const found = [
      ...decks(parse(demoYaml)),
      ...EXAMPLES.flatMap((ex) => decks(parse(ex.yaml))),
    ];
    expect(found.length).toBeGreaterThan(5);
    for (const deck of found) expect(unknownKeys(deck)).toEqual([]);
  });

  it("lists every auto_tabs source and preset the card accepts", async () => {
    const { SOURCES } = await import("./sources");
    const { PRESET_NAMES } = await import("./presets");
    expect(schema.properties.auto_tabs.properties.source.enum).toEqual(SOURCES);
    expect(schema.properties.preset.enum).toEqual([...PRESET_NAMES]);
  });
});
