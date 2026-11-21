import { describe, it, expect, afterEach, vi } from "vitest";
import pkg from "../../package.json";
import { CURRENT_VERSION, WHATS_NEW, cmpVersion, dismissNote, dismissedNote, noteKey, pendingNote } from "./whats-new";
import en from "../translations/editor/en";

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("what's new", () => {
  it("reads the version from package.json and has a string for every note", () => {
    expect(CURRENT_VERSION).toBe(pkg.version);
    for (const v of WHATS_NEW) expect(en[noteKey(v)], v).toBeTruthy();
  });

  it("compares versions numerically", () => {
    expect(cmpVersion("1.10.0", "1.9.2")).toBe(1);
    expect(cmpVersion("1.5.0", "1.5")).toBe(0);
    expect(cmpVersion("1.5.0", "1.6.0-beta.1")).toBe(-1);
  });

  it("shows the newest note up to this version, once", () => {
    const notes = ["2.0.0", "1.6.0", "1.5.0"];
    expect(pendingNote("1.6.0", null, notes)).toBe("1.6.0");
    expect(pendingNote("1.7.1", null, notes)).toBe("1.6.0");
    expect(pendingNote("1.6.0", "1.6.0", notes)).toBeUndefined();
    expect(pendingNote("2.0.0", "1.6.0", notes)).toBe("2.0.0");
    expect(pendingNote("1.4.0", null, notes)).toBeUndefined();
  });

  it("remembers the dismissal; blocked storage doesn't throw", () => {
    dismissNote("1.5.0");
    expect(dismissedNote()).toBe("1.5.0");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(dismissedNote()).toBeNull();
    expect(() => dismissNote("1.6.0")).not.toThrow();
  });
});
