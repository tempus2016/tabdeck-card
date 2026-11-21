import { describe, it, expect } from "vitest";
import { normalizeTakeovers, takeoverFires, takeoverSeconds } from "./takeover";

describe("takeover", () => {
  it("normalises one or a list, dropping incomplete ones", () => {
    expect(normalizeTakeovers(undefined)).toBeUndefined();
    expect(normalizeTakeovers({ entity: "binary_sensor.door", tab: "Cameras" })).toEqual([{ entity: "binary_sensor.door", tab: "Cameras", duration: 30 }]);
    expect(
      normalizeTakeovers([
        { entity: "event.bell", tab: 2, duration: 1, message: "Doorbell", icon: "mdi:doorbell", state: "on" },
        { entity: "x" },
        { tab: "A" },
      ]),
    ).toEqual([{ entity: "event.bell", tab: 2, duration: 5, message: "Doorbell", icon: "mdi:doorbell", state: "on" }]);
    expect(takeoverSeconds(99999)).toBe(3600);
    expect(takeoverSeconds("x", 12)).toBe(12);
  });

  it("fires on entering the state, or on any press of event / button entities", () => {
    const bs = { entity: "binary_sensor.door", tab: "C", duration: 30 };
    expect(takeoverFires(bs, undefined, "on")).toBe(false); // first value: baseline
    expect(takeoverFires(bs, "off", "on")).toBe(true);
    expect(takeoverFires(bs, "on", "on")).toBe(false);
    expect(takeoverFires(bs, "on", "off")).toBe(false);
    expect(takeoverFires({ ...bs, state: "ringing" }, "idle", "ringing")).toBe(true);
    const ev = { entity: "event.doorbell", tab: "C", duration: 30 };
    expect(takeoverFires(ev, "2026-11-21T07:00:00.000+00:00", "2026-11-21T07:05:00.000+00:00")).toBe(true);
    expect(takeoverFires(ev, "unknown", "2026-11-21T07:05:00.000+00:00")).toBe(true);
    expect(takeoverFires(ev, "unavailable", "2026-11-21T07:05:00.000+00:00")).toBe(false);
    expect(takeoverFires(ev, "2026-11-21T07:05:00.000+00:00", "unavailable")).toBe(false);
  });
});
