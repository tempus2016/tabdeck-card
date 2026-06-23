import { describe, it, expect, vi } from "vitest";
import { isTabVisible } from "./conditions";

function hassWith(states: Record<string, any>) {
  return { states } as any;
}

describe("isTabVisible", () => {
  it("is visible when no conditions are given", () => {
    expect(isTabVisible(undefined, hassWith({}))).toBe(true);
    expect(isTabVisible([], hassWith({}))).toBe(true);
  });

  it("evaluates a state condition", () => {
    const hass = hassWith({ "input_boolean.guest": { state: "on" } });
    expect(
      isTabVisible(
        [{ condition: "state", entity: "input_boolean.guest", state: "on" }],
        hass,
      ),
    ).toBe(true);
    expect(
      isTabVisible(
        [{ condition: "state", entity: "input_boolean.guest", state: "off" }],
        hass,
      ),
    ).toBe(false);
  });

  it("supports state arrays", () => {
    const hass = hassWith({ "sensor.mode": { state: "home" } });
    expect(
      isTabVisible(
        [{ condition: "state", entity: "sensor.mode", state: ["home", "away"] }],
        hass,
      ),
    ).toBe(true);
  });

  it("evaluates a numeric_state condition with above/below", () => {
    const hass = hassWith({ "sensor.temp": { state: "21" } });
    expect(
      isTabVisible(
        [{ condition: "numeric_state", entity: "sensor.temp", above: 20, below: 25 }],
        hass,
      ),
    ).toBe(true);
    expect(
      isTabVisible(
        [{ condition: "numeric_state", entity: "sensor.temp", above: 22 }],
        hass,
      ),
    ).toBe(false);
  });

  it("requires ALL conditions to pass", () => {
    const hass = hassWith({
      "input_boolean.a": { state: "on" },
      "input_boolean.b": { state: "off" },
    });
    expect(
      isTabVisible(
        [
          { condition: "state", entity: "input_boolean.a", state: "on" },
          { condition: "state", entity: "input_boolean.b", state: "on" },
        ],
        hass,
      ),
    ).toBe(false);
  });

  it("fails closed on unknown condition types and missing entities", () => {
    const hass = hassWith({});
    expect(isTabVisible([{ condition: "weird" }], hass)).toBe(false);
    expect(
      isTabVisible([{ condition: "state", entity: "x.y", state: "on" }], hass),
    ).toBe(false);
  });

  it("evaluates a screen condition via matchMedia", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q.includes("min-width: 700px") }) as any);
    const hass = hassWith({});
    expect(
      isTabVisible([{ condition: "screen", media_query: "(min-width: 700px)" }], hass),
    ).toBe(true);
    expect(
      isTabVisible([{ condition: "screen", media_query: "(min-width: 9999px)" }], hass),
    ).toBe(false);
    vi.unstubAllGlobals();
  });

  describe("template conditions", () => {
    const tpl = { condition: "template", value_template: "{{ true }}" };

    it("consults the resolver for a template condition", () => {
      const hass = hassWith({});
      expect(isTabVisible([tpl], hass, () => true)).toBe(true);
      expect(isTabVisible([tpl], hass, () => false)).toBe(false);
    });

    it("fails closed when the resolver returns undefined (pending)", () => {
      const hass = hassWith({});
      expect(isTabVisible([tpl], hass, () => undefined)).toBe(false);
    });

    it("fails closed when a template condition has no resolver", () => {
      const hass = hassWith({});
      expect(isTabVisible([tpl], hass)).toBe(false);
    });

    it("combines template and state conditions (ALL must pass)", () => {
      const hass = hassWith({ "input_boolean.a": { state: "on" } });
      const conds = [
        { condition: "state", entity: "input_boolean.a", state: "on" },
        tpl,
      ];
      expect(isTabVisible(conds, hass, () => true)).toBe(true);
      expect(isTabVisible(conds, hass, () => false)).toBe(false);
    });
  });
});
