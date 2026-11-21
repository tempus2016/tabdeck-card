import { describe, expect, it, beforeEach } from "vitest";
import { COMPANION_KEY, companionBrowserId, companionSafeId, companionTab } from "./companion";

beforeEach(() => localStorage.clear());

describe("companion ids", () => {
  it("keeps only what the integration accepts", () => {
    expect(companionSafeId(" Kitchen tablet! ")).toBe("Kitchen_tablet");
    expect(companionSafeId("a".repeat(80))).toHaveLength(64);
    expect(companionSafeId("***")).toBeUndefined();
    expect(companionSafeId(undefined)).toBeUndefined();
  });

  it("prefers companion_id, then the device name, then a stored random id", () => {
    expect(companionBrowserId("hall panel", "dev")).toBe("hall_panel");
    expect(companionBrowserId(undefined, "kitchen-tablet")).toBe("kitchen-tablet");
    const made = companionBrowserId(undefined, undefined);
    expect(made).toMatch(/^browser_[0-9a-f]{8}$/);
    expect(localStorage.getItem(COMPANION_KEY)).toBe(made);
    expect(companionBrowserId(undefined, undefined)).toBe(made);
  });

  it("reads select commands only", () => {
    expect(companionTab({ command: "select", tab: "Cameras" })).toBe("Cameras");
    expect(companionTab({ command: "other", tab: "Cameras" })).toBeUndefined();
    expect(companionTab({ command: "select", tab: 3 })).toBeUndefined();
    expect(companionTab(null)).toBeUndefined();
  });
});
