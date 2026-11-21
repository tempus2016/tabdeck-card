import { describe, it, expect } from "vitest";
import { normalizeConfig } from "./config";
import { summarizeConfig } from "./summary";

const keys = (cfg: any) => summarizeConfig(normalizeConfig(cfg, { expand: false })).map((l) => l.key);
const tab = (name: string, extra: any = {}) => ({ name, card: { type: "tile" }, ...extra });

describe("summarizeConfig", () => {
  it("a plain deck: just its tabs", () => {
    expect(summarizeConfig(normalizeConfig({ tabs: [tab("Home"), tab("Lights")] }, { expand: false }))).toEqual([
      { key: "summary.tabs", n: 2, names: ["Home", "Lights"] },
    ]);
    expect(summarizeConfig(null)).toEqual([]);
  });

  it("start, tabs, movement and remote control", () => {
    const lines = summarizeConfig(
      normalizeConfig(
        {
          default_tab: "Lights",
          remember: "browser",
          swipe: true,
          lazy: true,
          auto_rotate: 20,
          idle_return: 120,
          follow_room: "sensor.room",
          remote_entity: "input_select.tab",
          quiet_hours: "22:00-07:00",
          takeover: { entity: "binary_sensor.doorbell", tab: "Cameras" },
          tab_defaults: { badge_color: "red" },
          tabs: [
            tab("Home", { default_if: [{ condition: "state", entity: "sun.sun", state: "below_horizon" }] }),
            tab("Lights", { badge: "sensor.lights_on" }),
            tab("Cameras", { alert: [{ condition: "state", entity: "binary_sensor.doorbell", state: "on" }] }),
            tab("Garage", { visibility: [{ condition: "user", users: ["x"] }], pin: "1234" }),
            { name: "Settings", tap_action: { action: "navigate", navigation_path: "/config" } },
          ],
        },
        { expand: false },
      ),
    );
    const get = (k: string) => lines.find((l) => l.key === `summary.${k}`);
    expect(lines.map((l) => l.key)).toEqual([
      "summary.tabs",
      "summary.opens_on",
      "summary.default_if",
      "summary.remember_browser",
      "summary.visibility",
      "summary.alerts",
      "summary.badges",
      "summary.pin",
      "summary.actions",
      "summary.swipe",
      "summary.rotate",
      "summary.idle_return",
      "summary.remote_entity",
      "summary.follow_room",
      "summary.takeover",
      "summary.quiet_time",
      "summary.lazy",
    ]);
    expect(get("opens_on")!.vars).toEqual({ tab: "Lights" });
    expect(get("default_if")).toEqual({ key: "summary.default_if", names: ["Home"], n: 1 });
    expect(get("pin")!.names).toEqual(["Garage"]);
    expect(get("actions")!.names).toEqual(["Settings"]);
    expect(get("rotate")!.n).toBe(20);
    expect(get("idle_return")).toEqual({ key: "summary.idle_return", n: 120, vars: { tab: "Lights" } });
    expect(get("takeover")).toEqual({ key: "summary.takeover", n: 30, vars: { tab: "Cameras", entity: "binary_sensor.doorbell" } });
    expect(get("quiet_time")!.vars).toEqual({ from: "22:00", to: "07:00" });
  });

  it("long name lists are clipped; templated names show as numbers", () => {
    const many = Array.from({ length: 9 }, (_, i) => tab(`T${i}`));
    many[1].name = "{{ 'x' }}";
    expect(summarizeConfig({ tabs: many })[0].names).toEqual(["T0", "#2", "T2", "T3", "T4", "…"]);
  });

  it("auto_tabs, mouse swipe, entity memory, events and quiet entity", () => {
    expect(
      keys({
        auto_tabs: { source: "areas" },
        swipe: true,
        swipe_mouse: true,
        remember: "entity",
        remember_entity: "input_text.t",
        remote_event: true,
        quiet_hours: { entity: "input_boolean.q" },
        tabs: [tab("A")],
      }),
    ).toEqual(["summary.tabs", "summary.auto_source", "summary.remember_entity", "summary.swipe_mouse", "summary.remote_event", "summary.quiet_entity"]);
  });
});
