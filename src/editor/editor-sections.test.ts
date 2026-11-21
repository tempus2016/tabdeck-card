import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import "./tabdeck-card-editor";
import { EDITOR_SECTIONS } from "../lib/editor-sections";

// A stand-in for HA's ha-expansion-panel: an `expanded` property and the
// expanded-will-change / expanded-changed events it fires when toggled.
beforeAll(() => {
  customElements.define(
    "ha-expansion-panel",
    class extends HTMLElement {
      expanded = false;
      header = "";
      secondary = "";
      toggle() {
        const expanded = !this.expanded;
        this.dispatchEvent(new CustomEvent("expanded-will-change", { detail: { expanded }, bubbles: true, composed: true }));
        this.expanded = expanded;
        this.dispatchEvent(new CustomEvent("expanded-changed", { detail: { expanded }, bubbles: true, composed: true }));
      }
    },
  );
});

beforeEach(() => localStorage.clear());

const tabs = [
  { name: "Home", icon: "mdi:home", card: { type: "tile" } },
  { name: "Lights", icon: "mdi:lightbulb", badge: "3", card: { type: "tile" } },
  { name: "Garage", pin: "1234", card: { type: "tile" } },
];

async function mount(config: any) {
  const el = document.createElement("tabdeck-card-editor") as any;
  el.hass = { states: {} };
  el.setConfig({ type: "custom:tabdeck-card", ...config });
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
const sr = (el: any) => el.shadowRoot as ShadowRoot;
const panel = (el: any, id: string) => sr(el).querySelector<any>(`.section[data-section="${id}"]`);
const fields = (el: any) => [...sr(el).querySelectorAll<HTMLElement>(".row")].map((r) => r.dataset.field);
async function search(el: any, q: string) {
  const input = sr(el).querySelector<HTMLInputElement>(".search-input")!;
  input.value = q;
  input.dispatchEvent(new Event("input"));
  await el.updateComplete;
}

describe("editor sections", () => {
  it("puts every editor field in exactly one section", async () => {
    const el = await mount({ tabs });
    const names = el._globalSchema().map((s: any) => s.name).sort();
    const placed = EDITOR_SECTIONS.flatMap((s) => s.fields);
    expect([...placed].sort()).toEqual(names);
    expect(new Set(placed).size).toBe(placed.length);
  });

  it("opens Tabs only, in order, and remembers toggles per browser", async () => {
    const el = await mount({ tabs });
    const ids = [...sr(el).querySelectorAll<HTMLElement>(".section")].map((s) => s.dataset.section);
    expect(ids).toEqual(["tabs", "look", "bar", "badges", "move", "start", "auto", "kiosk", "perf", "adv"]);
    expect(panel(el, "tabs").expanded).toBe(true);
    expect(panel(el, "look").expanded).toBe(false);
    expect(fields(el)).toEqual([]);
    panel(el, "move").toggle();
    await el.updateComplete;
    expect(fields(el)).toContain("swipe");
    expect(JSON.parse(localStorage.getItem("tabdeck-editor-sections")!)).toEqual({ tabs: true, move: true });
    const again = await mount({ tabs });
    expect(panel(again, "move").expanded).toBe(true);
  });

  it("ignores panel events from inside a tab's card editor", async () => {
    const el = await mount({ tabs });
    const inner = document.createElement("div");
    panel(el, "look").appendChild(inner);
    inner.dispatchEvent(new CustomEvent("expanded-will-change", { detail: { expanded: true }, bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el._open.look).toBeUndefined();
  });

  it("summarises a section and marks changed ones", async () => {
    const el = await mount({ tabs, swipe: true, glass: true });
    expect(panel(el, "move").secondary).toContain("Swipe between tabs");
    expect(panel(el, "move").querySelector(".dot")).toBeTruthy();
    expect(panel(el, "look").secondary).toContain("Frosted glass bar");
    expect(panel(el, "kiosk").secondary).toBe("Defaults");
    expect(panel(el, "kiosk").querySelector(".dot")).toBeNull();
    expect(panel(el, "badges").querySelector(".dot")).toBeNull();
  });

  it("each row's form edits the full data, so the saved config is as before", async () => {
    localStorage.setItem("tabdeck-editor-sections", JSON.stringify({ move: true }));
    const el = await mount({ tabs });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const row = sr(el).querySelector<any>('.row[data-field="swipe"] ha-form');
    expect(row.data).toEqual(el._dataFor(el._config));
    expect(row.schema).toEqual([el._globalSchema().find((s: any) => s.name === "swipe")]);
    row.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...row.data, swipe: true } }, bubbles: true }));
    const out = handler.mock.calls.at(-1)![0].detail.config;
    const ref = await mount({ tabs });
    const refHandler = vi.fn();
    ref.addEventListener("config-changed", refHandler);
    ref._onGlobalChanged(new CustomEvent("value-changed", { detail: { value: { ...ref._dataFor(ref._config), swipe: true } } }));
    expect(JSON.stringify(out)).toBe(JSON.stringify(refHandler.mock.calls.at(-1)![0].detail.config));
  });
});

describe("search", () => {
  it("opens the sections with matching settings and only shows those", async () => {
    const el = await mount({ tabs });
    await search(el, "swipe");
    expect(panel(el, "move").expanded).toBe(true);
    expect(fields(el)).toEqual(["swipe", "swipe_mouse", "swipe_wrap", "swipe_edge", "swipe_lock", "swipe_peek"]);
    expect(panel(el, "look")).toBeNull();
    // No tab is called "swipe": the tab list is hidden too.
    expect(panel(el, "tabs")).toBeNull();
  });

  it("matches key names, hints and tab names and tags", async () => {
    const el = await mount({ tabs });
    await search(el, "idle_dim");
    expect(fields(el)).toEqual(["idle_dim", "idle_dim_mode"]);
    await search(el, "pin");
    const shown = [...sr(el).querySelectorAll(".tabs > .tab:not([hidden]) .tab-title")].map((t) => t.textContent);
    expect(shown).toEqual(["Garage"]);
    await search(el, "lights");
    expect([...sr(el).querySelectorAll(".tabs > .tab:not([hidden]) .tab-title")].map((t) => t.textContent)).toEqual(["Lights"]);
  });

  it("matches in the HA language and says when nothing matches", async () => {
    const el = await mount({ tabs });
    // German loads on demand.
    await (await import("../lib/i18n")).ensureLanguage("de");
    el.hass = { states: {}, language: "de", locale: { language: "de" } };
    await el.updateComplete;
    await search(el, "wischen");
    expect(fields(el)).toContain("swipe");
    await search(el, "zzzz");
    expect(sr(el).querySelector(".search-none")).toBeTruthy();
    sr(el).querySelector<HTMLElement>(".search-clear")!.click();
    await el.updateComplete;
    expect(sr(el).querySelector(".search-none")).toBeNull();
    expect(panel(el, "look").expanded).toBe(false);
  });
});

describe("status line", () => {
  it("shows chips and expands the summary and config check", async () => {
    const el = await mount({ tabs, swipe_lock: true });
    const chips = [...sr(el).querySelectorAll(".status-line .schip")].map((c) => c.textContent!.trim());
    expect(chips.slice(0, 2)).toEqual(["3 tabs", "1 note"]);
    expect(sr(el).querySelector(".lint")).toBeNull();
    sr(el).querySelector<HTMLElement>(".status-line")!.click();
    await el.updateComplete;
    expect(sr(el).querySelector(".summary-box")).toBeTruthy();
    expect(sr(el).querySelector(".lint-note")!.textContent).toContain("swipe_lock");
  });

  it("a config-check link opens the setting's section and highlights it", async () => {
    const el = await mount({ tabs, swipe_lock: true });
    sr(el).querySelector<HTMLElement>(".status-line")!.click();
    await el.updateComplete;
    sr(el).querySelector<HTMLElement>(".lint-go")!.click();
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;
    expect(panel(el, "move").expanded).toBe(true);
    expect(sr(el).querySelector('.row.flash[data-field="swipe_lock"]')).toBeTruthy();
  });

  it("a tab note's link opens that tab", async () => {
    const el = await mount({ tabs: [...tabs, { name: "Cam", badge_color: "red", card: { type: "tile" } }] });
    panel(el, "tabs").toggle();
    await el.updateComplete;
    sr(el).querySelector<HTMLElement>(".status-line")!.click();
    await el.updateComplete;
    sr(el).querySelector<HTMLElement>(".lint-go")!.click();
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;
    expect(panel(el, "tabs").expanded).toBe(true);
    expect([...el._expanded]).toEqual([3]);
  });
});

describe("tab rows and preview strip", () => {
  it("tags tabs and keeps the tools under the list and in Advanced", async () => {
    localStorage.setItem("tabdeck-editor-sections", JSON.stringify({ tabs: true, adv: true }));
    const el = await mount({ tabs });
    const tags = [...sr(el).querySelectorAll(".tabs > .tab")].map((t) => [...t.querySelectorAll(".tag")].map((x) => x.textContent));
    expect(tags).toEqual([[], ["badge"], ["PIN", "no icon"]]);
    const tabsBody = panel(el, "tabs");
    for (const c of [".add-tab", ".rooms-tab", ".select-tabs"]) expect(tabsBody.querySelector(c)).toBeTruthy();
    const adv = panel(el, "adv");
    for (const c of [".import-tab", ".starter-tab", ".convert-tab", ".style-import-tab", ".export-view"]) expect(adv.querySelector(c)).toBeTruthy();
  });

  it("hides its own preview strip while HA's preview is beside the editor", async () => {
    const el = await mount({ tabs });
    expect(sr(el).querySelector(".preview")).toBeTruthy();
    const preview = { getBoundingClientRect: () => ({ left: 600, right: 1000, top: 0, width: 400 }) };
    // HA's dialog shadow root, two levels up.
    const dialogRoot = { querySelector: (q: string) => (q === ".element-preview" ? preview : null) };
    const inner = { querySelector: () => null, host: { getRootNode: () => dialogRoot } };
    el.getRootNode = () => inner;
    el.getBoundingClientRect = () => ({ left: 0, right: 590, top: 0, bottom: 800, width: 590 });
    el._checkHaPreview();
    await el.updateComplete;
    expect(sr(el).querySelector(".preview")).toBeNull();
    // Narrow dialog: HA puts its preview under the editor.
    preview.getBoundingClientRect = () => ({ left: 0, right: 590, top: 900, width: 590 });
    el._checkHaPreview();
    await el.updateComplete;
    expect(sr(el).querySelector(".preview")).toBeTruthy();
  });
});
