import { describe, it, expect } from "vitest";
import { isRtl } from "./rtl";

const hass = (language: string, isRTL: boolean) => ({ language, translationMetadata: { translations: { [language]: { isRTL } } } });

describe("isRtl", () => {
  it("follows HA's language, then the page's dir", () => {
    expect(isRtl(undefined, hass("ar", true), "ltr")).toBe(true);
    expect(isRtl(undefined, hass("en", false), "ltr")).toBe(false);
    expect(isRtl(undefined, undefined, "rtl")).toBe(true);
    expect(isRtl(undefined, { language: "he" }, "")).toBe(false);
  });

  it("direction in the config wins", () => {
    expect(isRtl("ltr", hass("ar", true), "rtl")).toBe(false);
    expect(isRtl("rtl", hass("en", false), "ltr")).toBe(true);
  });
});
