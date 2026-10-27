import { describe, it, expect } from "vitest";
import { hassLanguage, localize, registerLanguage, resolveLanguage } from "./i18n";

describe("i18n", () => {
  it("reads the language from hass", () => {
    expect(hassLanguage({ locale: { language: "de" } })).toBe("de");
    expect(hassLanguage({ language: "fr" })).toBe("fr");
    expect(hassLanguage(undefined)).toBe("en");
  });

  it("falls back from region to base language, then English", () => {
    registerLanguage("xx", { "check.now_met": "XX met" });
    expect(resolveLanguage("xx-YY")).toBe("xx");
    expect(resolveLanguage("zz")).toBe("en");
    expect(localize("xx-YY", "check.now_met")).toBe("XX met");
    expect(localize("xx", "check.now_unmet")).toBe("Not met right now");
    expect(localize("en", "no.such.key")).toBe("no.such.key");
  });

  it("fills placeholders", () => {
    expect(localize("en", "check.now", { value: "on" })).toBe("now: on");
  });
});
