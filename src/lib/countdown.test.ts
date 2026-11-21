import { describe, it, expect } from "vitest";
import { countdownSeconds, formatCountdown } from "./countdown";

const now = Date.parse("2026-11-21T10:00:00Z");

describe("countdownSeconds", () => {
  it("counts down an active timer to finishes_at", () => {
    const s = { entity_id: "timer.t", state: "active", attributes: { finishes_at: "2026-11-21T10:12:34Z", remaining: "0:15:00" } };
    expect(countdownSeconds(s, now)).toEqual({ seconds: 754, ticking: true });
  });
  it("uses remaining when an active timer has no finishes_at, and while paused", () => {
    expect(countdownSeconds({ entity_id: "timer.t", state: "active", attributes: { remaining: "0:01:05" } }, now)).toEqual({ seconds: 65, ticking: false });
    expect(countdownSeconds({ entity_id: "timer.t", state: "paused", attributes: { remaining: "1:00:00" } }, now)).toEqual({ seconds: 3600, ticking: false });
  });
  it("shows nothing for an idle timer or a missing entity", () => {
    expect(countdownSeconds({ entity_id: "timer.t", state: "idle", attributes: { remaining: "0:15:00" } }, now)).toBeUndefined();
    expect(countdownSeconds(undefined, now)).toBeUndefined();
  });
  it("counts down to a future timestamp state (e.g. a washer's end time)", () => {
    expect(countdownSeconds({ entity_id: "sensor.end", state: "2026-11-21T10:00:30+00:00", attributes: {} }, now)).toEqual({ seconds: 30, ticking: true });
    expect(countdownSeconds({ entity_id: "sensor.end", state: "2026-11-21T09:00:00+00:00", attributes: {} }, now)).toBeUndefined();
    expect(countdownSeconds({ entity_id: "sensor.n", state: "42", attributes: {} }, now)).toBeUndefined();
  });
});

describe("formatCountdown", () => {
  it("m:ss under an hour, h:mm:ss above", () => {
    expect(formatCountdown(754)).toBe("12:34");
    expect(formatCountdown(5)).toBe("0:05");
    expect(formatCountdown(3725)).toBe("1:02:05");
    expect(formatCountdown(0.2)).toBe("0:01");
  });
});
