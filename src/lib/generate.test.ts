import { describe, it, expect } from "vitest";
import { expandGeneratedTabs, substituteTokens } from "./generate";

describe("substituteTokens", () => {
  it("replaces a whole-string {{ item }} preserving type for objects", () => {
    expect(substituteTokens("{{ item }}", "camera.a", 0)).toBe("camera.a");
    const obj = { entity: "x" };
    expect(substituteTokens("{{ item }}", obj, 0)).toBe(obj);
  });

  it("resolves dotted item paths", () => {
    expect(substituteTokens("{{ item.entity }}", { entity: "light.k" }, 0)).toBe("light.k");
    expect(substituteTokens("{{ item.a.b }}", { a: { b: 7 } }, 0)).toBe(7);
  });

  it("interpolates tokens inside a larger string", () => {
    expect(substituteTokens("Cam {{ item }} #{{ index }}", "a", 2)).toBe("Cam a #2");
  });

  it("returns the index token as a number when whole-string", () => {
    expect(substituteTokens("{{ index }}", "x", 3)).toBe(3);
  });

  it("leaves foreign HA templates untouched", () => {
    expect(substituteTokens("{{ states('sensor.x') }}", "a", 0)).toBe("{{ states('sensor.x') }}");
    expect(substituteTokens("{{ states('sensor.' + item) }}", "a", 0)).toBe(
      "{{ states('sensor.' + item) }}",
    );
  });

  it("resolves a missing prop to empty string in interpolation", () => {
    expect(substituteTokens("v={{ item.nope }}", { x: 1 }, 0)).toBe("v=");
  });

  it("recurses through objects and arrays, preserving non-strings", () => {
    const out = substituteTokens(
      { name: "{{ item }}", n: 5, on: true, cards: [{ entity: "{{ item }}" }] },
      "light.k",
      0,
    );
    expect(out).toEqual({ name: "light.k", n: 5, on: true, cards: [{ entity: "light.k" }] });
  });
});

describe("expandGeneratedTabs", () => {
  const auto = {
    template: "x",
    tab_template: { name: "{{ item }}", card: { type: "picture-entity", entity: "{{ item }}" } },
  };

  it("returns [] for a non-list", () => {
    expect(expandGeneratedTabs(undefined, auto)).toEqual([]);
    expect(expandGeneratedTabs("nope", auto)).toEqual([]);
    expect(expandGeneratedTabs({ a: 1 }, auto)).toEqual([]);
  });

  it("fills tab_template once per string item", () => {
    const out = expandGeneratedTabs(["camera.a", "camera.b"], auto);
    expect(out).toHaveLength(2);
    expect(out[0]).toEqual({ name: "camera.a", card: { type: "picture-entity", entity: "camera.a" } });
    expect(out[1].card.entity).toBe("camera.b");
  });

  it("fills tab_template from object items with dotted paths", () => {
    const a = {
      template: "x",
      tab_template: { name: "{{ item.label }}", card: { type: "p", entity: "{{ item.id }}" } },
    };
    const out = expandGeneratedTabs([{ label: "Front", id: "camera.front" }], a);
    expect(out[0]).toEqual({ name: "Front", card: { type: "p", entity: "camera.front" } });
  });

  it("uses list elements as full tabs when tab_template is absent", () => {
    const a = { template: "x" };
    const tabs = [{ name: "A", card: { type: "markdown" } }];
    expect(expandGeneratedTabs(tabs, a)).toEqual(tabs);
  });

  it("skips non-object elements when tab_template is absent", () => {
    const a = { template: "x" };
    expect(expandGeneratedTabs(["nope", { name: "B", card: {} }], a)).toEqual([{ name: "B", card: {} }]);
  });
});
