/// <reference types="vite/client" />
// The automation blueprints in blueprints/ parse as YAML (with HA's !input
// tag) and send the event the card listens for.
import { describe, it, expect } from "vitest";
import { parse } from "yaml";
import { remoteStep } from "./remote-keywords";

const files = import.meta.glob("../../blueprints/automation/tabdeck/*.yaml", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const input = { tag: "!input", resolve: (v: string) => ({ input: v }) };

describe("blueprints", () => {
  const entries = Object.entries(files).map(([path, text]) => [path.split("/").pop()!, text] as const);

  it("there are blueprints", () => {
    expect(entries.length).toBeGreaterThanOrEqual(2);
  });

  for (const [name, text] of entries) {
    it(`${name} is a valid automation blueprint that fires tabdeck_select`, () => {
      const bp = parse(text, { customTags: [input] });
      expect(bp.blueprint.domain).toBe("automation");
      expect(bp.blueprint.source_url).toBe(`https://github.com/tempus2016/tabdeck-card/blob/main/blueprints/automation/tabdeck/${name}`);
      // Every !input used is declared.
      const used = JSON.stringify(bp).match(/"input":"(\w+)"/g)?.map((m) => m.slice(9, -1)) ?? [];
      for (const key of used) expect(Object.keys(bp.blueprint.input)).toContain(key);
      expect(JSON.stringify(bp.actions)).toContain('"event":"tabdeck_select"');
      expect(bp.triggers?.length).toBeGreaterThan(0);
    });
  }

  it("the knob blueprint only sends step words the card understands", () => {
    const text = files["../../blueprints/automation/tabdeck/knob_step_tabs.yaml"];
    const bp = parse(text, { customTags: [input] });
    const words = [...String(bp.variables.step).matchAll(/'(\w+)' if/g)].map((m) => m[1]);
    expect(words).toEqual(["next", "previous", "back", "default"]);
    for (const w of words) expect(remoteStep(w)).toBe(w);
    // Every list it reads is an input with defaults.
    for (const k of ["next_actions", "previous_actions", "back_actions", "default_actions"]) {
      expect(bp.blueprint.input[k].default.length).toBeGreaterThan(0);
    }
  });
});
