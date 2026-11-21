import { describe, it, expect, vi } from "vitest";
import "../translations/card";
import "../translations/editor";
import {
  ensureLanguage,
  hassLanguage,
  LANGUAGE_LOADED_EVENT,
  languages,
  localize,
  plural,
  registerLanguage,
  registerLoaders,
  resolveLanguage,
} from "./i18n";

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

  it("picks the plural form for the language", async () => {
    await ensureLanguage("pl");
    expect(plural("en", "card.n_alerts", 1)).toBe("1 alert");
    expect(plural("en", "card.n_alerts", 3)).toBe("3 alerts");
    expect(plural("pl", "card.n_alerts", 2)).toBe("2 alerty");
    expect(plural("pl", "card.n_alerts", 5)).toBe("5 alertów");
    registerLanguage("yy", { "x.k": "plain {n}" });
    expect(plural("yy", "x.k", 4)).toBe("plain 4");
  });

  it("offers every bundled language", () => {
    // Other tests register made-up "xx"/"yy" languages.
    expect(languages().filter((l) => !["xx", "yy"].includes(l)).sort()).toEqual(["ar", "bn", "de", "en", "es", "fr", "hi", "id", "it", "ja", "ko", "nl", "pl", "pt", "ru", "tr", "uk", "vi", "zh-HK", "zh-Hans", "zh-Hant"]);
  });
});

describe("lazy languages", () => {
  it("reads English until a language's chunk arrives, then announces it", async () => {
    let release!: (d: Record<string, string>) => void;
    const loader = vi.fn(() => new Promise<Record<string, string>>((r) => (release = r)));
    registerLoaders({ qq: loader });
    const heard = vi.fn();
    window.addEventListener(LANGUAGE_LOADED_EVENT, heard);

    expect(localize("qq-ZZ", "card.tabs")).toBe("Tabs");
    expect(localize("qq", "card.tabs")).toBe("Tabs");
    expect(loader).toHaveBeenCalledTimes(1);

    release({ "card.tabs": "QQ tabs" });
    await ensureLanguage("qq");
    expect(heard).toHaveBeenCalled();
    expect(localize("qq-ZZ", "card.tabs")).toBe("QQ tabs");
    expect(localize("qq", "card.next_tab")).toBe("Next tab");
    await ensureLanguage("qq");
    expect(loader).toHaveBeenCalledTimes(1);
    window.removeEventListener(LANGUAGE_LOADED_EVENT, heard);
  });

  it("asks again after a failed fetch", async () => {
    const loader = vi.fn().mockRejectedValueOnce(new Error("offline")).mockResolvedValue({ "card.tabs": "RR" });
    registerLoaders({ rr: loader });
    await ensureLanguage("rr");
    expect(localize("rr", "card.tabs")).toBe("Tabs");
    await ensureLanguage("rr");
    expect(localize("rr", "card.tabs")).toBe("RR");
  });

  it("fetches again when a later loader brings more strings", async () => {
    registerLoaders({ ss: async () => ({ "card.tabs": "SS tabs" }) });
    await ensureLanguage("ss");
    registerLoaders({ ss: async () => ({ "card.tabs": "SS tabs", "editor.tab.name": "SS name" }) });
    expect(localize("ss", "card.tabs")).toBe("SS tabs");
    await ensureLanguage("ss");
    expect(localize("ss", "editor.tab.name")).toBe("SS name");
  });

  it("loads the real chunks", async () => {
    await ensureLanguage("de");
    expect(localize("de", "card.next_tab")).toBe("Nächster Tab");
    expect(localize("de-AT", "editor.tab.name")).toBe("Tab-Name");
  });
});
