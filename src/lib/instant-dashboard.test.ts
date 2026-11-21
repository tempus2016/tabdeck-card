import { describe, it, expect, vi } from "vitest";
import { createInstantDashboard, freeUrlPath, instantDashboardConfig, InstantDashboardError } from "./instant-dashboard";

const tabs = [{ name: "Kitchen", icon: "mdi:stove", area: "kitchen", card: { type: "entities", entities: ["light.k"] } }];

// A fake HA WebSocket: a list of dashboards and their saved configs.
function fakeWs(dashboards: any[] = [], configs: Record<string, any> = {}, fail: Record<string, any> = {}) {
  const calls: any[] = [];
  const callWS = vi.fn(async (msg: any) => {
    calls.push(msg);
    if (fail[msg.type]) throw fail[msg.type];
    switch (msg.type) {
      case "lovelace/dashboards/list":
        return dashboards;
      case "lovelace/dashboards/create": {
        const d = { id: msg.url_path.replace(/-/g, "_"), ...msg };
        dashboards.push(d);
        return d;
      }
      case "lovelace/config":
        if (configs[msg.url_path]) return configs[msg.url_path];
        throw { code: "config_not_found", message: "No config found." };
      case "lovelace/config/save":
        configs[msg.url_path] = msg.config;
        return null;
      case "lovelace/dashboards/delete":
        return null;
    }
    throw new Error(`unexpected ${msg.type}`);
  });
  return { callWS, calls, configs };
}

describe("instant dashboard", () => {
  it("picks a url path no dashboard uses", () => {
    expect(freeUrlPath([])).toBe("tabdeck-rooms");
    expect(freeUrlPath(["tabdeck-rooms", "tabdeck-rooms-2", "lovelace"])).toBe("tabdeck-rooms-3");
  });

  it("builds a one-view panel dashboard holding a deck", () => {
    expect(instantDashboardConfig(tabs, "Rooms")).toEqual({
      title: "Rooms",
      views: [{ title: "Rooms", path: "rooms", type: "panel", cards: [{ type: "custom:tabdeck-card", tabs }] }],
    });
  });

  it("creates a new dashboard and saves the deck only on it", async () => {
    const ws = fakeWs([{ id: "a", url_path: "tabdeck-rooms", title: "Mine" }], { "tabdeck-rooms": { views: [{ title: "x" }] } });
    const r = await createInstantDashboard(ws.callWS, tabs, "Rooms");
    expect(r).toEqual({ url_path: "tabdeck-rooms-2", title: "Rooms" });
    expect(ws.calls.map((c) => c.type)).toEqual([
      "lovelace/dashboards/list",
      "lovelace/dashboards/create",
      "lovelace/config",
      "lovelace/config/save",
    ]);
    expect(ws.calls[1]).toMatchObject({ url_path: "tabdeck-rooms-2", title: "Rooms", mode: "storage", show_in_sidebar: true });
    expect(ws.calls[3].url_path).toBe("tabdeck-rooms-2");
    expect(ws.configs["tabdeck-rooms"]).toEqual({ views: [{ title: "x" }] });
    expect(ws.configs["tabdeck-rooms-2"].views[0].cards[0].tabs).toEqual(tabs);
  });

  it("says when the user isn't an admin and saves nothing", async () => {
    const ws = fakeWs([], {}, { "lovelace/dashboards/create": { code: "unauthorized", message: "Unauthorized" } });
    const err = await createInstantDashboard(ws.callWS, tabs, "Rooms").catch((e) => e);
    expect(err).toBeInstanceOf(InstantDashboardError);
    expect(err.reason).toBe("admin");
    expect(ws.calls.some((c) => c.type === "lovelace/config/save")).toBe(false);
  });

  it("never saves over a dashboard that already has a config", async () => {
    // The new dashboard somehow already has views (a race with another tab): leave it alone.
    const ws = fakeWs([], { "tabdeck-rooms": { views: [{ title: "theirs" }] } });
    const err = await createInstantDashboard(ws.callWS, tabs, "Rooms").catch((e) => e);
    expect(err.reason).toBe("failed");
    expect(ws.calls.some((c) => c.type === "lovelace/config/save")).toBe(false);
    expect(ws.configs["tabdeck-rooms"]).toEqual({ views: [{ title: "theirs" }] });
  });

  it("removes the dashboard it just created when saving fails", async () => {
    const ws = fakeWs([], {}, { "lovelace/config/save": { code: "home_assistant_error", message: "disk full" } });
    const err = await createInstantDashboard(ws.callWS, tabs, "Rooms").catch((e) => e);
    expect(err.reason).toBe("failed");
    expect(err.message).toBe("disk full");
    const del = ws.calls.find((c) => c.type === "lovelace/dashboards/delete");
    expect(del).toEqual({ type: "lovelace/dashboards/delete", dashboard_id: "tabdeck_rooms" });
  });
});
