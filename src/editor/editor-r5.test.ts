// Round 5 editor features: click to edit, undo/redo, config check, bulk edit,
// icon suggestions, room wizard, summary, what's new.
import { describe, it, expect, afterEach, vi } from "vitest";
import "./tabdeck-card-editor";
import { CURRENT_VERSION, pendingNote } from "./whats-new";

async function mount(config: any, parent: Element = document.body, hass: any = { states: {} }) {
  const el = document.createElement("tabdeck-card-editor") as any;
  el.hass = hass;
  el.setConfig(config);
  parent.appendChild(el);
  await el.updateComplete;
  return el;
}

const sr = (el: any) => el.shadowRoot as ShadowRoot;
const tabs3 = [
  { name: "Home", card: { type: "tile" } },
  { name: "Lights", card: { type: "tile" } },
  { name: "Cameras", card: { type: "tile" } },
];

afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});

describe("click to edit", () => {
  const fire = (from: EventTarget, index: number, names = tabs3.map((t) => t.name)) =>
    from.dispatchEvent(new CustomEvent("tabdeck-edit-tab", { detail: { index, names }, bubbles: true, composed: true }));
  const expanded = (el: any) =>
    [...sr(el).querySelectorAll(".tabs > .tab")].map((t) => t.classList.contains("expanded"));

  it("a tab clicked in the preview of the same dialog opens its settings", async () => {
    const dialog = document.createElement("hui-dialog-edit-card");
    document.body.appendChild(dialog);
    const el = await mount({ tabs: tabs3 }, dialog);
    const card = document.createElement("div");
    dialog.appendChild(card);
    fire(card, 2);
    await el.updateComplete;
    await el.updateComplete;
    expect(expanded(el)).toEqual([false, false, true]);
    expect(sr(el).querySelector(".tab.flash")).toBeTruthy();
    expect(sr(el).querySelector<any>(".preview tabdeck-tabbar").selected).toBe(2);
  });

  it("ignores decks outside its dialog and decks with other tabs", async () => {
    const dialog = document.createElement("hui-dialog-edit-card");
    document.body.appendChild(dialog);
    const el = await mount({ tabs: tabs3 }, dialog);
    const outside = document.createElement("div");
    document.body.appendChild(outside);
    fire(outside, 1);
    const inside = document.createElement("div");
    dialog.appendChild(inside);
    fire(inside, 1, ["Home", "Lights", "Garage"]);
    fire(inside, 1, ["Home", "Lights"]);
    fire(inside, 7);
    await el.updateComplete;
    expect(expanded(el)).toEqual([false, false, false]);
  });

  it("leaves the card view and works without a dialog; the editor's own preview is clickable", async () => {
    const el = await mount({ tabs: tabs3 });
    el._openCard(0);
    await el.updateComplete;
    fire(document.body, 1);
    await el.updateComplete;
    await el.updateComplete;
    expect(el._editingTab).toBeNull();
    expect(expanded(el)).toEqual([false, true, false]);
    sr(el)
      .querySelector(".preview tabdeck-tabbar")!
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 0 }, bubbles: true, composed: true }));
    await el.updateComplete;
    await el.updateComplete;
    expect(expanded(el)).toEqual([true, false, false]);
  });
});

describe("undo and redo", () => {
  const wait = () => new Promise((r) => setTimeout(r, 0));
  it("undoes a deleted tab and redoes it, with buttons and a note", async () => {
    const el = await mount({ tabs: tabs3 });
    const fired: any[] = [];
    el.addEventListener("config-changed", (e: any) => fired.push(e.detail.config));
    const undoBtn = () => sr(el).querySelector<any>(".history .undo");
    const redoBtn = () => sr(el).querySelector<any>(".history .redo");
    expect(undoBtn()).toBeNull();
    el._deleteTab(2);
    await el.updateComplete;
    expect(sr(el).querySelector(".history-note")!.textContent).toBe('Removed tab "Cameras"');
    expect(undoBtn().disabled).toBe(false);
    undoBtn().click();
    await el.updateComplete;
    expect(fired.at(-1)!.tabs.map((t: any) => t.name)).toEqual(["Home", "Lights", "Cameras"]);
    expect(sr(el).querySelector(".editor-status")!.textContent).toBe('Undone: Removed tab "Cameras"');
    expect(redoBtn().disabled).toBe(false);
    redoBtn().click();
    await el.updateComplete;
    expect(fired.at(-1)!.tabs.map((t: any) => t.name)).toEqual(["Home", "Lights"]);
  });

  it("HA echoing the config back is not a step; a YAML edit is", async () => {
    const el = await mount({ tabs: tabs3 });
    let last: any;
    el.addEventListener("config-changed", (e: any) => (last = e.detail.config));
    el._patch({ style: "pill" });
    el.setConfig(JSON.parse(JSON.stringify(last)));
    expect(el._history.size).toBe(1);
    await new Promise((r) => setTimeout(r, 900));
    el.setConfig({ tabs: tabs3.slice(0, 1) });
    expect(el._history.size).toBe(2);
    el.undo();
    expect(last.tabs).toHaveLength(3);
    expect(last.style).toBe("pill");
    el.undo();
    expect(last.style).toBe("underline");
  });

  it("Ctrl+Z / Ctrl+Shift+Z in the editor, but not inside a text box", async () => {
    const el = await mount({ tabs: tabs3 });
    el._deleteTab(0);
    await el.updateComplete;
    const key = (target: EventTarget, init: KeyboardEventInit) => {
      const e = new KeyboardEvent("keydown", { bubbles: true, composed: true, cancelable: true, ctrlKey: true, ...init });
      target.dispatchEvent(e);
      return e.defaultPrevented;
    };
    const input = document.createElement("input");
    sr(el).appendChild(input);
    expect(key(input, { key: "z" })).toBe(false);
    expect(el._config.tabs).toHaveLength(2);
    const btn = sr(el).querySelector(".history .undo")!;
    expect(key(btn, { key: "z" })).toBe(true);
    expect(el._config.tabs).toHaveLength(3);
    expect(key(btn, { key: "Z", shiftKey: true })).toBe(true);
    expect(el._config.tabs).toHaveLength(2);
    expect(key(btn, { key: "y" })).toBe(false);
    await wait();
  });
});

describe("config check", () => {
  it("lists notes from the config as written and updates after edits", async () => {
    const el = await mount({ type: "custom:tabdeck-card", tabs: [{ name: "A", colour: "red", card: { type: "tile" } }], swipe_lock: true, bar_colour: "red" });
    const notes = () => [...sr(el).querySelectorAll(".lint-note span")].map((n) => n.parentElement!.className.replace("lint-note ", "") + ": " + n.textContent!.trim());
    sr(el).querySelector<HTMLElement>(".status-line")!.click();
    await el.updateComplete;
    expect(sr(el).querySelector(".lint .status-head")!.textContent!.trim()).toBe("Config check · 3 notes");
    expect(notes()).toEqual([
      "info: swipe_lock does nothing without swipe / swipe_mouse.",
      "warn: Unknown option bar_colour: a typo? The visual editor drops it when you save.",
      'warn: Tab "A": unknown option colour: a typo? The visual editor drops it when you save.',
    ]);
    el._patch({ swipe: true });
    await el.updateComplete;
    expect(sr(el).querySelector(".lint")).toBeNull();
  });
});

describe("bulk edit", () => {
  it("sets icon and colour on the picked tabs as one undo step", async () => {
    const el = await mount({ tabs: [...tabs3, { name: "Garage", icon: "mdi:garage", card: { type: "tile" } }] });
    const fired: any[] = [];
    el.addEventListener("config-changed", (e: any) => fired.push(e.detail.config));
    sr(el).querySelector<HTMLElement>(".select-tabs")!.click();
    await el.updateComplete;
    const picks = () => [...sr(el).querySelectorAll<HTMLInputElement>("input.pick")];
    expect(picks()).toHaveLength(4);
    picks()[0].click();
    picks()[2].click();
    picks()[3].click();
    picks()[3].click();
    await el.updateComplete;
    expect(sr(el).querySelector(".bulk-count")!.textContent).toBe("Selected: 2");
    expect(sr(el).querySelectorAll(".tab.picked")).toHaveLength(2);
    // Ticking doesn't expand the tab.
    expect(sr(el).querySelectorAll(".tab.expanded")).toHaveLength(0);
    sr(el)
      .querySelector(".bulk-form")!
      .dispatchEvent(new CustomEvent("value-changed", { detail: { value: { icon: "mdi:star", accent: "red", color: "" } } }));
    await el.updateComplete;
    sr(el).querySelector<HTMLElement>(".bulk-apply")!.click();
    await el.updateComplete;
    const out = fired.at(-1)!.tabs;
    expect(out.map((t: any) => [t.icon, t.accent])).toEqual([
      ["mdi:star", "red"],
      [undefined, undefined],
      ["mdi:star", "red"],
      ["mdi:garage", undefined],
    ]);
    expect(out[0].color).toBeUndefined();
    expect(sr(el).querySelector(".editor-status")!.textContent).toBe("Updated 2 tabs.");
    el.undo();
    expect(fired.at(-1)!.tabs[0].icon).toBeUndefined();
    sr(el).querySelector<HTMLElement>(".bulk-all")!.click();
    await el.updateComplete;
    expect(sr(el).querySelector(".bulk-count")!.textContent).toBe("Selected: 4");
    el._deleteTab(0);
    await el.updateComplete;
    expect(sr(el).querySelector(".bulk-count")!.textContent).toBe("Selected: 0");
    sr(el).querySelector<HTMLElement>(".bulk-done")!.click();
    await el.updateComplete;
    expect(sr(el).querySelector("input.pick")).toBeNull();
  });
});

describe("icon suggestions", () => {
  it("offers icons for the tab name and a click sets one", async () => {
    const el = await mount({ tabs: [{ name: "Küche", card: { type: "tile" } }, { name: "Zxq", card: { type: "tile" } }] });
    el._expanded = new Set([0, 1]);
    await el.updateComplete;
    const rows = sr(el).querySelectorAll(".icon-suggest");
    expect(rows).toHaveLength(1);
    const buttons = [...rows[0].querySelectorAll<HTMLButtonElement>(".icon-choice")];
    expect(buttons[0].title).toBe("mdi:silverware-fork-knife");
    buttons[1].click();
    await el.updateComplete;
    expect(el._config.tabs[0].icon).toBe("mdi:stove");
    expect(sr(el).querySelector(".icon-choice.on")!.getAttribute("title")).toBe("mdi:stove");
  });
});

describe("room wizard", () => {
  it("lists rooms with counts, ticks new ones and appends a tab per ticked room", async () => {
    const hass = {
      states: { "light.k": { state: "on" }, "light.l": { state: "on" }, "sensor.l": { state: "1" } },
      areas: { kitchen: { area_id: "kitchen", name: "Kitchen", icon: "mdi:stove" }, lounge: { area_id: "lounge", name: "Lounge" }, attic: { area_id: "attic", name: "Attic" } },
      devices: {},
      entities: {
        "light.k": { entity_id: "light.k", area_id: "kitchen" },
        "light.l": { entity_id: "light.l", area_id: "lounge" },
        "sensor.l": { entity_id: "sensor.l", area_id: "lounge" },
      },
    };
    const el = await mount({ tabs: [{ name: "Kitchen", area: "kitchen", card: { type: "tile" } }] }, document.body, hass);
    await el._toggleRooms();
    await el.updateComplete;
    const rows = [...sr(el).querySelectorAll(".room")].map((r) => r.textContent!.replace(/\s+/g, " ").trim());
    expect(rows).toEqual(["Attic 0 entities", "Kitchen 1 entity · has a tab", "Lounge 2 entities"]);
    expect([...sr(el).querySelectorAll<HTMLInputElement>(".room-pick")].map((c) => c.checked)).toEqual([false, false, true]);
    const create = sr(el).querySelector<HTMLElement>(".rooms-create")!;
    expect(create.textContent!.trim()).toBe("Create 1 tab");
    sr(el).querySelectorAll<HTMLInputElement>(".room-pick")[1].click();
    await el.updateComplete;
    expect(create.textContent!.trim()).toBe("Create 2 tabs");
    create.click();
    await el.updateComplete;
    expect(el._config.tabs.map((t: any) => [t.name, t.area, t.card?.entities])).toEqual([
      ["Kitchen", "kitchen", undefined],
      ["Kitchen", "kitchen", ["light.k"]],
      ["Lounge", "lounge", ["light.l", "sensor.l"]],
    ]);
    expect(sr(el).querySelector(".rooms-panel")).toBeNull();
    expect(sr(el).querySelector(".editor-status")!.textContent).toBe("Added 2 room tabs.");
  });

  it("says so when there are no rooms", async () => {
    const el = await mount({ tabs: tabs3 }, document.body, { states: {}, callWS: async () => [] });
    await el._toggleRooms();
    await el.updateComplete;
    expect(sr(el).querySelector(".rooms-panel .import-error")!.textContent).toContain("No rooms found");
    expect(sr(el).querySelector<any>(".rooms-create").disabled).toBe(true);
  });
});

describe("plain-language summary", () => {
  it("describes the deck in the HA language and follows edits", async () => {
    const el = await mount({
      default_tab: "Lights",
      swipe: true,
      auto_rotate: 2,
      tabs: [...tabs3, { name: "Garage", pin: "1234", card: { type: "tile" } }],
    });
    // German loads on demand.
    await (await import("../lib/i18n")).ensureLanguage("de");
    const text = () => sr(el).querySelector(".summary-box p")!.textContent;
    sr(el).querySelector<HTMLElement>(".status-line")!.click();
    await el.updateComplete;
    expect(sr(el).querySelector(".summary-box .status-head")!.textContent!.trim()).toBe("What this card does");
    expect(text()).toBe(
      "This deck has 4 tabs: Home, Lights, Cameras, and Garage. It opens on Lights. Garage needs a PIN. Swipe left or right to move between tabs. It moves to the next tab every 2 seconds.",
    );
    el.hass = { states: {}, language: "de", locale: { language: "de" } };
    el._patch({ swipe: false });
    await el.updateComplete;
    expect(text()).toBe(
      "Dieses Deck hat 4 Tabs: Home, Lights, Cameras und Garage. Es öffnet mit Lights. Garage braucht eine PIN. Es wechselt alle 2 Sekunden zum nächsten Tab.",
    );
  });
});

describe("what's new", () => {
  it("shows the note for this version once; dismissing remembers it", async () => {
    localStorage.removeItem("tabdeck-whats-new");
    const el = await mount({ tabs: tabs3 });
    const note = () => sr(el).querySelector(".whats-new");
    const v = pendingNote(CURRENT_VERSION, null)!;
    expect(sr(el).querySelector(".schip.new")!.textContent).toContain(v);
    sr(el).querySelector<HTMLElement>(".status-line")!.click();
    await el.updateComplete;
    expect(note()!.textContent).toContain(`New in Tabdeck ${v}`);
    expect(note()!.querySelector("a")!.getAttribute("href")).toBe(`https://github.com/tempus2016/tabdeck-card/releases/tag/v${v}`);
    note()!.querySelector<HTMLElement>(".whats-new-close")!.click();
    await el.updateComplete;
    expect(note()).toBeNull();
    expect(localStorage.getItem("tabdeck-whats-new")).toBe(v);
    expect(sr(el).querySelector(".schip.new")).toBeNull();
    const again = await mount({ tabs: tabs3 });
    sr(again).querySelector<HTMLElement>(".status-line")!.click();
    await again.updateComplete;
    expect(sr(again).querySelector(".whats-new")).toBeNull();
  });
});

describe("instant dashboard", () => {
  const hass = (callWS: any) => ({
    states: { "light.k": { state: "on" } },
    areas: { kitchen: { area_id: "kitchen", name: "Kitchen" } },
    devices: {},
    entities: { "light.k": { entity_id: "light.k", area_id: "kitchen" } },
    callWS,
  });

  it("creates a new dashboard from the ticked rooms and links to it, leaving the deck alone", async () => {
    const calls: any[] = [];
    const callWS = async (msg: any) => {
      calls.push(msg);
      if (msg.type === "lovelace/dashboards/list") return [{ id: "x", url_path: "tabdeck-rooms" }];
      if (msg.type === "lovelace/dashboards/create") return { id: "tabdeck_rooms_2", url_path: msg.url_path };
      if (msg.type === "lovelace/config") throw { code: "config_not_found" };
      return null;
    };
    const el = await mount({ tabs: tabs3 }, document.body, hass(callWS));
    await el._toggleRooms();
    await el.updateComplete;
    const btn = sr(el).querySelector<HTMLElement>(".rooms-dashboard")!;
    expect(btn.textContent!.trim()).toBe("New dashboard with these rooms");
    await el._createDashboard();
    await el.updateComplete;
    const save = calls.find((c) => c.type === "lovelace/config/save");
    expect(save.url_path).toBe("tabdeck-rooms-2");
    expect(save.config.views[0].cards[0].tabs.map((t: any) => t.name)).toEqual(["Kitchen"]);
    expect(el._config.tabs.length).toBe(3);
    const done = sr(el).querySelector(".instant-done")!;
    expect(done.textContent).toContain("Created the dashboard “Rooms”.");
    expect(done.querySelector("a")!.getAttribute("href")).toBe("/tabdeck-rooms-2/rooms");
  });

  it("explains that only admins can create dashboards", async () => {
    const callWS = async (msg: any) => {
      if (msg.type === "lovelace/dashboards/create") throw { code: "unauthorized", message: "Unauthorized" };
      return [];
    };
    const el = await mount({ tabs: tabs3 }, document.body, hass(callWS));
    await el._toggleRooms();
    await el._createDashboard();
    await el.updateComplete;
    expect(sr(el).querySelector(".rooms-panel .import-error")!.textContent).toContain("Only administrators");
  });
});

describe("import a style", () => {
  it("merges a pasted preset's style options and keeps the tabs", async () => {
    const el = await mount({ swipe: true, styles: { "--tabdeck-tab-height": "40px" }, tabs: tabs3 });
    sr(el).querySelector<HTMLElement>(".style-import-tab")!.click();
    await el.updateComplete;
    const box = sr(el).querySelector<HTMLTextAreaElement>(".style-import-panel textarea")!;
    box.value = JSON.stringify({ name: "Forest", author: "x", config: { style: "segmented", styles: { "--tabdeck-accent": "#8bc34a" } } });
    box.dispatchEvent(new Event("input"));
    sr(el).querySelector<HTMLElement>(".style-import-apply")!.click();
    await el.updateComplete;
    expect(el._config.style).toBe("segmented");
    expect(el._config.swipe).toBe(true);
    expect(el._config.styles).toEqual({ "--tabdeck-tab-height": "40px", "--tabdeck-accent": "#8bc34a" });
    expect(el._config.tabs.map((t: any) => t.name)).toEqual(["Home", "Lights", "Cameras"]);
    expect(sr(el).querySelector(".style-import-panel")).toBeNull();
    expect(sr(el).querySelector(".editor-status")!.textContent).toBe("Applied the style “Forest”.");
  });

  it("lists what's wrong and imports nothing", async () => {
    const el = await mount({ tabs: tabs3 });
    sr(el).querySelector<HTMLElement>(".style-import-tab")!.click();
    await el.updateComplete;
    const box = sr(el).querySelector<HTMLTextAreaElement>(".style-import-panel textarea")!;
    box.value = JSON.stringify({ tabs: [], style: "pill", bar_background: "url(http://x/y.png)" });
    box.dispatchEvent(new Event("input"));
    sr(el).querySelector<HTMLElement>(".style-import-apply")!.click();
    await el.updateComplete;
    const errors = [...sr(el).querySelectorAll(".style-import-panel .import-error li")].map((e) => e.textContent);
    expect(errors).toEqual([
      "“tabs” isn't a style option.",
      "“bar_background” has a value Tabdeck can't use.",
    ]);
    expect(el._config.style).toBe("underline");
  });
});
