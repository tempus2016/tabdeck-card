import { describe, it, expect, beforeEach } from "vitest";
import { lastSynced, matchTabName, normalizeSyncGroup, onSync, publishSync, resetSync } from "./sync";

beforeEach(() => resetSync());

describe("normalizeSyncGroup", () => {
  it("takes a non-empty name or a number", () => {
    expect(normalizeSyncGroup(" house ")).toBe("house");
    expect(normalizeSyncGroup(2)).toBe("2");
    expect(normalizeSyncGroup("")).toBeUndefined();
    expect(normalizeSyncGroup(true)).toBeUndefined();
  });
});

describe("sync bus", () => {
  it("delivers a switch to the other decks of the same group only", () => {
    const a = {}, b = {}, c = {};
    const got: string[] = [];
    const offB = onSync("house", b, (n) => got.push(`b:${n}`));
    const offC = onSync("garden", c, (n) => got.push(`c:${n}`));
    const offA = onSync("house", a, (n) => got.push(`a:${n}`));
    publishSync("house", "Climate", a);
    expect(got).toEqual(["b:Climate"]);
    offA();
    offB();
    offC();
    publishSync("house", "Lights", a);
    expect(got).toEqual(["b:Climate"]);
  });

  it("remembers each group's last tab", () => {
    publishSync("house", "Climate", {});
    publishSync("garden", "Water", {});
    expect(lastSynced("house")).toBe("Climate");
    expect(lastSynced("garden")).toBe("Water");
    expect(lastSynced("other")).toBeUndefined();
  });
});

describe("matchTabName", () => {
  it("matches the exact name first, then the slug", () => {
    expect(matchTabName(["Home", "Living room", "living-room"], "living-room")).toBe(2);
    expect(matchTabName(["Home", "Living room"], "LIVING ROOM")).toBe(1);
    expect(matchTabName(["Home", undefined, "Küche"], "küche")).toBe(2);
  });

  it("never treats a number as a position", () => {
    expect(matchTabName(["A", "B"], "1")).toBe(-1);
    expect(matchTabName(["A", "B"], "")).toBe(-1);
  });
});
