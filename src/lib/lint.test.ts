/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import schemaText from "../../docs-site/public/schema/tabdeck-card.schema.json?raw";
import { TAB_KEYS, TOP_KEYS } from "./schema-keys";
import { lintConfig, MANY_TABS } from "./lint";

const rules = (raw: any) => lintConfig(raw).map((n) => n.rule + (n.vars?.key ? `:${n.vars.key}` : ""));
const tab = (name: string, extra: any = {}) => ({ name, card: { type: "tile" }, ...extra });

describe("schema-keys.ts", () => {
  it("matches the JSON schema (run `node scripts/schema-keys.mjs` if not)", () => {
    const schema = JSON.parse(schemaText);
    expect([...TOP_KEYS].sort()).toEqual(Object.keys(schema.properties).sort());
    expect([...TAB_KEYS].sort()).toEqual(Object.keys(schema.definitions.tab.properties).sort());
  });
});

describe("lintConfig", () => {
  it("a plain config has no notes", () => {
    expect(lintConfig({ type: "custom:tabdeck-card", grid_options: { columns: 12 }, tabs: [tab("A"), tab("B")] })).toEqual([]);
    expect(lintConfig(null)).toEqual([]);
  });

  it("finds clashing settings", () => {
    expect(rules({ tabs: [tab("A")], dock: true, wizard: true })).toEqual(["dock_wizard"]);
    expect(rules({ tabs: [tab("A")], dock: true, hide_bar: true })).toEqual(["dock_hide_bar"]);
    expect(rules({ tabs: [tab("A")], remember: "entity" })).toEqual(["remember_entity"]);
    expect(lintConfig({ tabs: [tab("A")], default_tab: "Kitchen" })).toEqual([
      { level: "warn", rule: "default_tab", vars: { value: "Kitchen" } },
    ]);
    expect(rules({ tabs: [tab("A")], default_tab: 3 })).toEqual(["default_tab"]);
    expect(rules({ tabs: [tab("A"), tab("B")], default_tab: 1 })).toEqual([]);
    expect(rules({ tabs: [tab("A")], default_tab: "x", auto_tabs: { source: "areas" } })).toEqual([]);
  });

  it("finds options that do nothing without another", () => {
    expect(rules({ tabs: [tab("A")], swipe_lock: true, swipe_peek: true, preload: "idle", start_collapsed: true, event_id: "x" })).toEqual([
      "needs:swipe_lock",
      "needs:swipe_peek",
      "needs:preload",
      "needs:start_collapsed",
      "needs:event_id",
    ]);
    expect(rules({ tabs: [tab("A")], swipe: true, swipe_lock: true, swipe_peek: true, lazy: true, preload: "idle" })).toEqual([]);
    expect(rules({ tabs: [tab("A")], swipe_mouse: true, swipe_peek: true })).toEqual(["needs:swipe_peek"]);
    expect(rules({ tabs: [tab("A")], swipe_wrap: true })).toEqual(["needs:swipe_wrap"]);
    expect(rules({ tabs: [tab("A")], swipe_wrap: true, hotkeys: true })).toEqual([]);
    expect(rules({ tabs: [tab("A")], transition_duration: 300 })).toEqual(["needs:transition_duration"]);
    expect(rules({ tabs: [tab("A")], transition: "fade", transition_duration: 300 })).toEqual([]);
    expect(rules({ tabs: [tab("A")], alert_first: true })).toEqual(["needs_tab:alert_first"]);
    expect(rules({ tabs: [tab("A", { alert: [{ condition: "state" }] })], alert_first: true })).toEqual([]);
    expect(
      lintConfig({ tabs: [tab("A", { badge_color: "red", ring_max: 5, pin_timeout: 3 }), tab("B", { badge_color: "red", badge: "sensor.x" })] }),
    ).toEqual([
      { level: "info", rule: "tab_needs", vars: { tab: "A", key: "badge_color", other: "badge" } },
      { level: "info", rule: "tab_needs", vars: { tab: "A", key: "ring_max", other: "ring" } },
      { level: "info", rule: "tab_needs", vars: { tab: "A", key: "pin_timeout", other: "pin" } },
    ]);
    // tab_defaults count for every tab.
    expect(rules({ tabs: [tab("A", { badge_color: "red" })], tab_defaults: { badge: "{{ 1 }}" } })).toEqual([]);
  });

  it("warns when an automatic switch points at a PIN-locked tab", () => {
    const pinTabs = [tab("Home"), tab("Cameras", { pin: "1" }), tab("Office", { pin: "2" })];
    const pin = (raw: any) => lintConfig({ tabs: pinTabs, ...raw }).filter((n) => n.rule === "pin_auto");
    expect(pin({})).toEqual([]);
    // takeover by name, slug or index; a list too.
    expect(pin({ takeover: { entity: "binary_sensor.bell", tab: "Cameras" } })).toEqual([
      { level: "warn", rule: "pin_auto", vars: { tab: "Cameras", key: "takeover" } },
    ]);
    expect(pin({ takeover: [{ entity: "a", tab: "cameras" }, { entity: "b", tab: 2 }, { entity: "c", tab: "Home" }] }).map((n) => n.vars!.tab)).toEqual([
      "Cameras",
      "Office",
    ]);
    // follow_room: only the map's targets.
    expect(pin({ follow_room: "sensor.room" })).toEqual([]);
    expect(pin({ follow_room: { entity: "sensor.room", map: { garage: "Office", hall: "Home" } } })).toEqual([
      { level: "warn", rule: "pin_auto", vars: { tab: "Office", key: "follow_room" } },
    ]);
    // remote_entity can send any tab: every PIN tab is named.
    expect(pin({ remote_entity: "input_text.tab" }).map((n) => n.vars)).toEqual([
      { tab: "Cameras", key: "remote_entity" },
      { tab: "Office", key: "remote_entity" },
    ]);
    // A pin from tab_defaults counts.
    expect(pin({ tabs: [tab("A"), tab("B")], tab_defaults: { pin: "1" }, takeover: { entity: "x", tab: "B" } })).toHaveLength(1);
  });

  it("finds unknown keys, also in children", () => {
    expect(lintConfig({ tabs: [tab("A", { colour: "red", children: [tab("C", { iconn: "x" })] })], bar_colour: "red" })).toEqual([
      { level: "warn", rule: "unknown", vars: { key: "bar_colour" } },
      { level: "warn", rule: "unknown_tab", vars: { tab: "A", key: "colour" } },
      { level: "warn", rule: "unknown_tab", vars: { tab: "C", key: "iconn" } },
    ]);
  });

  it("finds slow setups", () => {
    const many = Array.from({ length: MANY_TABS }, (_, i) => tab(`T${i}`));
    expect(rules({ tabs: many })).toEqual(["many_tabs"]);
    expect(rules({ tabs: many, lazy: true })).toEqual([]);
    expect(rules({ tabs: many, lazy: true, preload: "all" })).toEqual(["preload_all"]);
    expect(rules({ tabs: [tab("A", { auto_refresh: 0.5 })] })).toEqual(["fast_refresh"]);
    const templated = Array.from({ length: 11 }, (_, i) => tab(`T${i}`, { badge: "{{ 1 }}", subtitle: "{{ 2 }}", icon: "{% if 1 %}mdi:a{% endif %}", card: { type: "markdown", content: "{{ x }}" } }));
    expect(lintConfig({ tabs: templated, lazy: true })).toEqual([{ level: "perf", rule: "templates", vars: { count: 33 } }]);
  });
});

describe("lintConfig on the visual editor's output", () => {
  it("ignores the defaults normalizeConfig writes out", async () => {
    const { normalizeConfig } = await import("./config");
    expect(lintConfig(normalizeConfig({ type: "custom:tabdeck-card", tabs: [tab("A")] }, { expand: false }))).toEqual([]);
  });
});
