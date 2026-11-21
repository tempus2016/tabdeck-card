import { describe, it, expect } from "vitest";
import { normalizePopup, popupRequest } from "./popup";

describe("normalizePopup", () => {
  it("is true, hidden or off", () => {
    expect(normalizePopup(true)).toBe(true);
    expect(normalizePopup("on")).toBe(true);
    expect(normalizePopup("hidden")).toBe("hidden");
    expect(normalizePopup(false)).toBeUndefined();
    expect(normalizePopup("yes")).toBeUndefined();
  });
});

describe("popupRequest", () => {
  it("reads a tab name, or a tab and a deck, from a fire-dom-event action", () => {
    expect(popupRequest({ action: "fire-dom-event", tabdeck_popup: "Cameras" })).toEqual({ tab: "Cameras" });
    expect(popupRequest({ tabdeck_popup: 2 })).toEqual({ tab: "2" });
    expect(popupRequest({ tabdeck_popup: { tab: " Cameras ", deck: "hall" } })).toEqual({ tab: "Cameras", deck: "hall" });
    expect(popupRequest({ tabdeck_popup: { tab: "Cameras", deck: "" } })).toEqual({ tab: "Cameras" });
  });

  it("ignores other fire-dom-event actions", () => {
    expect(popupRequest({ action: "fire-dom-event", browser_mod: {} })).toBeUndefined();
    expect(popupRequest({ tabdeck_popup: "" })).toBeUndefined();
    expect(popupRequest({ tabdeck_popup: { deck: "hall" } })).toBeUndefined();
    expect(popupRequest(undefined)).toBeUndefined();
  });
});
