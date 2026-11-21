import { describe, it, expect, vi } from "vitest";
import { GraphStore, normalizeGraph, sparkline, thin } from "./mini-graph";

describe("normalizeGraph", () => {
  it("takes an entity id or { entity, hours, color }", () => {
    expect(normalizeGraph("sensor.temp")).toEqual({ entity: "sensor.temp", hours: 24 });
    expect(normalizeGraph({ entity: "sensor.power", hours: 3, color: "red" })).toEqual({ entity: "sensor.power", hours: 3, color: "red" });
    expect(normalizeGraph({ entity: "sensor.power", hours: -1 })).toEqual({ entity: "sensor.power", hours: 24 });
    expect(normalizeGraph("not an entity")).toBeUndefined();
    expect(normalizeGraph({ hours: 3 })).toBeUndefined();
    expect(normalizeGraph(undefined)).toBeUndefined();
  });
});

describe("sparkline", () => {
  const now = 10_000;
  it("scales points to the box and carries the last value to now", () => {
    const pts = sparkline(
      [
        [now - 3600, 10],
        [now - 1800, 20],
      ],
      now,
      1,
      40,
      10,
    );
    expect(pts).toBe("0,9 20,9 20,1 40,1");
  });
  it("draws a flat line through the middle and nothing for no data", () => {
    expect(sparkline([[now - 7200, 5]], now, 1, 40, 10)).toBe("0,5 40,5");
    expect(sparkline([], now, 1, 40, 10)).toBeUndefined();
  });
  it("starts from the last value before the window", () => {
    const pts = sparkline(
      [
        [now - 7200, 0],
        [now - 1800, 10],
      ],
      now,
      1,
      40,
      10,
    );
    expect(pts).toBe("0,9 20,9 20,1 40,1");
  });
});

describe("thin", () => {
  it("keeps the last value per time slice for very long histories", () => {
    const pts: [number, number][] = Array.from({ length: 3600 }, (_, i) => [i, i]);
    const out = thin(pts, 1);
    expect(out.length).toBeLessThanOrEqual(240);
    expect(out.at(-1)).toEqual([3599, 3599]);
    expect(thin(pts.slice(0, 10), 1)).toHaveLength(10);
  });
  it("sparkline collapses changes at the same x", () => {
    const line = sparkline([[0, 1], [1, 5], [2, 3], [3600, 5]], 3600, 1, 40, 10)!;
    expect(line.split(" ").filter((p) => p.startsWith("0,"))).toHaveLength(1);
  });
});

describe("GraphStore", () => {
  it("fetches an entity's history once, then adds new states from hass", async () => {
    const callWS = vi.fn(async () => ({
      "sensor.t": [
        { s: "20", lu: 1000 },
        { s: "unavailable", lu: 1100 },
        { s: "21.5", lu: 1200 },
      ],
    }));
    const changed = vi.fn();
    const store = new GraphStore(changed);
    const hass: any = { callWS, states: { "sensor.t": { state: "21.5", last_updated: new Date(1200_000).toISOString() } } };
    store.sync(hass, [{ entity: "sensor.t", hours: 24 }], 2000_000);
    store.sync(hass, [{ entity: "sensor.t", hours: 24 }], 2000_000);
    expect(callWS).toHaveBeenCalledTimes(1);
    expect((callWS.mock.calls[0] as any[])[0]).toMatchObject({
      type: "history/history_during_period",
      entity_ids: ["sensor.t"],
      minimal_response: true,
      no_attributes: true,
    });
    await new Promise((r) => setTimeout(r, 0));
    expect(changed).toHaveBeenCalled();
    expect(store.points("sensor.t")).toEqual([
      [1000, 20],
      [1200, 21.5],
    ]);
    hass.states["sensor.t"] = { state: "23", last_updated: new Date(1500_000).toISOString() };
    store.sync(hass, [{ entity: "sensor.t", hours: 24 }], 2000_000);
    expect(store.points("sensor.t")!.at(-1)).toEqual([1500, 23]);
    expect(callWS).toHaveBeenCalledTimes(1);
  });

  it("fetches again after a while and drops entities no longer shown", async () => {
    const callWS = vi.fn(async () => ({ "sensor.t": [{ s: "1", lu: 1 }] }));
    const store = new GraphStore(() => {});
    const hass: any = { callWS, states: {} };
    store.sync(hass, [{ entity: "sensor.t", hours: 1 }], 0);
    await new Promise((r) => setTimeout(r, 0));
    store.sync(hass, [{ entity: "sensor.t", hours: 1 }], 20 * 60_000);
    expect(callWS).toHaveBeenCalledTimes(2);
    store.sync(hass, [], 20 * 60_000);
    expect(store.points("sensor.t")).toBeUndefined();
  });
});
