import { describe, it, expect, vi, afterEach } from "vitest";
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

  it("evaluates or/and/not logical groups", () => {
    const hass = hassWith({
      "input_boolean.a": { state: "on" },
      "input_boolean.b": { state: "off" },
    });
    const a = { condition: "state", entity: "input_boolean.a", state: "on" };
    const b = { condition: "state", entity: "input_boolean.b", state: "on" };
    // or: a passes -> true
    expect(isTabVisible([{ condition: "or", conditions: [a, b] }], hass)).toBe(true);
    // and: b fails -> false
    expect(isTabVisible([{ condition: "and", conditions: [a, b] }], hass)).toBe(false);
    // not: neither b nor (b) passes -> not(false)=true
    expect(isTabVisible([{ condition: "not", conditions: [b] }], hass)).toBe(true);
    // not with a passing inner -> false
    expect(isTabVisible([{ condition: "not", conditions: [a] }], hass)).toBe(false);
  });

  it("nests logical groups", () => {
    const hass = hassWith({
      "input_boolean.a": { state: "on" },
      "input_boolean.b": { state: "off" },
      "input_boolean.c": { state: "on" },
    });
    const a = { condition: "state", entity: "input_boolean.a", state: "on" };
    const b = { condition: "state", entity: "input_boolean.b", state: "on" };
    const c = { condition: "state", entity: "input_boolean.c", state: "on" };
    // a AND (b OR c) -> on AND (off? no OR on? yes) -> true
    expect(
      isTabVisible([{ condition: "and", conditions: [a, { condition: "or", conditions: [b, c] }] }], hass),
    ).toBe(true);
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

  describe("time conditions", () => {
    afterEach(() => vi.useRealTimers());
    // 2026-06-24 is a Wednesday.
    const at = (iso: string) => vi.useFakeTimers({ now: new Date(iso) });

    it("after/before daytime range", () => {
      at("2026-06-24T10:00:00");
      expect(isTabVisible([{ condition: "time", after: "08:00", before: "18:00" }], hassWith({}))).toBe(true);
      at("2026-06-24T20:00:00");
      expect(isTabVisible([{ condition: "time", after: "08:00", before: "18:00" }], hassWith({}))).toBe(false);
    });

    it("overnight range wraps midnight", () => {
      at("2026-06-24T23:30:00");
      expect(isTabVisible([{ condition: "time", after: "22:00", before: "06:00" }], hassWith({}))).toBe(true);
      at("2026-06-24T12:00:00");
      expect(isTabVisible([{ condition: "time", after: "22:00", before: "06:00" }], hassWith({}))).toBe(false);
    });

    it("weekday filter", () => {
      at("2026-06-24T10:00:00"); // Wednesday
      expect(isTabVisible([{ condition: "time", weekday: ["wed"] }], hassWith({}))).toBe(true);
      expect(isTabVisible([{ condition: "time", weekday: ["sat", "sun"] }], hassWith({}))).toBe(false);
    });

    it("fails closed with no constraints", () => {
      at("2026-06-24T10:00:00");
      expect(isTabVisible([{ condition: "time" }], hassWith({}))).toBe(false);
    });
  });

  describe("user condition", () => {
    it("matches the current user id", () => {
      const hass = { states: {}, user: { id: "abc" } } as any;
      expect(isTabVisible([{ condition: "user", users: ["abc", "def"] }], hass)).toBe(true);
      expect(isTabVisible([{ condition: "user", users: ["def"] }], hass)).toBe(false);
      expect(isTabVisible([{ condition: "user", users: ["abc"] }], hassWith({}))).toBe(false);
    });
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
