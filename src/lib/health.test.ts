import { describe, it, expect } from "vitest";
import { healthThreshold, isUnhealthy, unavailableShare } from "./health";

const states = {
  "light.a": { state: "unavailable" },
  "light.b": { state: "on" },
  "sensor.c": { state: "unknown" },
};

describe("health", () => {
  it("counts unavailable and missing entities", () => {
    expect(unavailableShare(["light.a", "light.b"], states)).toBe(0.5);
    expect(unavailableShare(["light.a", "light.gone"], states)).toBe(1);
    expect(unavailableShare(["sensor.c"], states)).toBe(0);
  });

  it("has nothing to judge without entities or states", () => {
    expect(unavailableShare([], states)).toBeUndefined();
    expect(unavailableShare(["light.a"], {})).toBeUndefined();
    expect(unavailableShare(["light.a"], undefined)).toBeUndefined();
  });

  it("reads the threshold", () => {
    expect(healthThreshold(true)).toBe(0.5);
    expect(healthThreshold(0.8)).toBe(0.8);
    expect(healthThreshold(false)).toBeUndefined();
    expect(healthThreshold(2)).toBeUndefined();
    expect(healthThreshold("0.5")).toBeUndefined();
  });

  it("is unhealthy at or above the threshold", () => {
    expect(isUnhealthy(["light.a", "light.b"], states, 0.5)).toBe(true);
    expect(isUnhealthy(["light.a", "light.b"], states, 0.75)).toBe(false);
    expect(isUnhealthy(["light.a"], states, undefined)).toBe(false);
  });
});
