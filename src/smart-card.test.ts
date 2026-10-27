import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

beforeAll(() => {
  (window as any).loadCardHelpers = async () => ({
    createCardElement: (config: any) => {
      const el = document.createElement("div") as any;
      el.setAttribute("data-type", config.type ?? "");
      el._cfg = config;
      el.getCardSize = () => 3;
      return el;
    },
  });
  if (!customElements.get("ha-icon")) customElements.define("ha-icon", class extends HTMLElement {});
});

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

async function settle(el: any) {
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
}

async function mount(raw: any, hass: any = { states: {} }) {
  await import("./tabdeck-card");
  const el = document.createElement("tabdeck-card") as any;
  el.setConfig(raw);
  document.body.appendChild(el);
  el.hass = hass;
  await settle(el);
  return el;
}

const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
const names = (el: any) => bar(el).items.map((i: any) => i.name);
const st = (state: string) => ({ state, attributes: {} });
const select = async (el: any, index: number) => {
  bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index }, bubbles: true, composed: true }));
  await settle(el);
};

describe("count badge", () => {
  it("counts matching entities without Jinja", async () => {
    const el = await mount(
      { tabs: [{ name: "Lights", badge: { count: "light.*", state: "on" }, card: { type: "x" } }] },
      { states: { "light.a": st("on"), "light.b": st("on"), "light.c": st("off"), "switch.d": st("on") } },
    );
    expect(bar(el).items[0].badge).toBe("2");
  });
});

describe("auto content", () => {
  const hass = (extra: Record<string, any> = {}) => ({
    states: { "light.kitchen": st("on"), "switch.kettle": st("off"), ...extra },
    entities: {
      "light.kitchen": { entity_id: "light.kitchen", area_id: "kitchen" },
      "switch.kettle": { entity_id: "switch.kettle", area_id: "kitchen" },
      ...Object.fromEntries(Object.keys(extra).map((id) => [id, { entity_id: id, area_id: "kitchen" }])),
    },
    devices: {},
    areas: { kitchen: { area_id: "kitchen" } },
  });

  it("an area tab without a card shows tiles of its entities, and follows the registry", async () => {
    const el = await mount({ tabs: [{ name: "Kitchen", area: "kitchen" }, { name: "B", card: { type: "x" } }] }, hass());
    const grid = el.shadowRoot.querySelector("[data-type='grid']") as any;
    expect(grid._cfg.cards.map((c: any) => c.entity)).toEqual(["light.kitchen", "switch.kettle"]);
    el.hass = hass({ "fan.extractor": st("off") });
    await settle(el);
    const again = el.shadowRoot.querySelector("[data-type='grid']") as any;
    expect(again._cfg.cards.map((c: any) => c.entity)).toEqual(["fan.extractor", "light.kitchen", "switch.kettle"]);
  });
});

describe("alert_first and alert_snooze", () => {
  const cfg = {
    alert_first: true,
    alert_snooze: 15,
    tabs: [
      { name: "Home", card: { type: "x" } },
      { name: "Garage", alert: [{ condition: "state", entity: "binary_sensor.garage", state: "on" }], card: { type: "y" } },
    ],
  };

  it("moves an alerting tab to the front and keeps the selection on the same tab", async () => {
    const el = await mount(cfg, { states: { "binary_sensor.garage": st("off") } });
    expect(names(el)).toEqual(["Home", "Garage"]);
    el.hass = { states: { "binary_sensor.garage": st("on") } };
    await settle(el);
    expect(names(el)).toEqual(["Garage", "Home"]);
    expect(el.selectedTab).toBe("Home");
  });

  it("a long-press snoozes the pulse; it comes back after the alert clears", async () => {
    const el = await mount(cfg, { states: { "binary_sensor.garage": st("on") } });
    expect(bar(el).items[0].alert).toBe(true);
    expect(bar(el).items[0].holdAction).toBe(true);
    bar(el).dispatchEvent(new CustomEvent("tabdeck-action", { detail: { index: 0, kind: "hold" }, bubbles: true, composed: true }));
    await settle(el);
    expect(bar(el).items.find((i: any) => i.name === "Garage").alert).toBe(false);
    el.hass = { states: { "binary_sensor.garage": st("off") } };
    await settle(el);
    el.hass = { states: { "binary_sensor.garage": st("on") } };
    await settle(el);
    expect(bar(el).items.find((i: any) => i.name === "Garage").alert).toBe(true);
  });
});

describe("default by time and device", () => {
  afterEach(() => vi.useRealTimers());
  const tabs = [
    { name: "Morning", card: { type: "a" } },
    { name: "Evening", card: { type: "b" } },
    { name: "Cameras", card: { type: "c" } },
  ];

  it("opens the tab for the time of day", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 27, 19, 0));
    const el = await mount({ tabs, default_by_time: { "06:00": "Morning", "18:00": "Evening" } });
    expect(el.selectedTab).toBe("Evening");
  });

  it("this browser's tab wins over the time", async () => {
    localStorage.setItem("tabdeck-device", "hall-panel");
    const el = await mount({ tabs, default_by_time: { "00:00": "Evening" }, default_by_device: { "hall-panel": "Cameras" } });
    expect(el.selectedTab).toBe("Cameras");
  });
});

describe("events", () => {
  it("fire_event fires tabdeck_tab_changed on a switch", async () => {
    const callApi = vi.fn(() => Promise.resolve());
    const el = await mount(
      { fire_event: true, event_id: "hall", tabs: [{ name: "A", card: { type: "a" } }, { name: "B", card: { type: "b" } }] },
      { states: {}, callApi },
    );
    await select(el, 1);
    expect(callApi).toHaveBeenCalledWith("POST", "events/tabdeck_tab_changed", expect.objectContaining({ deck: "hall", tab: "B", index: 1, previous: "A" }));
  });

  it("remote_event switches on a matching tabdeck_select event", async () => {
    let handler: any;
    const subscribeEvents = vi.fn((cb: any, type: string) => {
      handler = { cb, type };
      return Promise.resolve(() => {});
    });
    const el = await mount(
      { remote_event: true, event_id: "hall", tabs: [{ name: "A", card: { type: "a" } }, { name: "Cameras", card: { type: "b" } }] },
      { states: {}, connection: { subscribeEvents } },
    );
    expect(handler.type).toBe("tabdeck_select");
    handler.cb({ data: { tab: "cameras", deck: "other" } });
    await settle(el);
    expect(el.selectedTab).toBe("A");
    handler.cb({ data: { tab: "cameras", deck: "hall" } });
    await settle(el);
    expect(el.selectedTab).toBe("Cameras");
  });

  it("remote_entity follows changes of the entity (not its first value)", async () => {
    const tabs = [{ name: "A", card: { type: "a" } }, { name: "Cameras", card: { type: "b" } }];
    const el = await mount({ remote_entity: "input_text.panel", tabs }, { states: { "input_text.panel": st("Cameras") } });
    expect(el.selectedTab).toBe("A");
    el.hass = { states: { "input_text.panel": st("a") } };
    await settle(el);
    expect(el.selectedTab).toBe("A");
    el.hass = { states: { "input_text.panel": st("cameras") } };
    await settle(el);
    expect(el.selectedTab).toBe("Cameras");
  });

  it("an input_number's index works too", async () => {
    const tabs = [{ name: "A", card: { type: "a" } }, { name: "B", card: { type: "b" } }];
    const el = await mount({ remote_entity: "input_number.panel", tabs }, { states: { "input_number.panel": st("0.0") } });
    el.hass = { states: { "input_number.panel": st("1.0") } };
    await settle(el);
    expect(el.selectedTab).toBe("B");
  });
});

describe("pin", () => {
  const cfg = { tabs: [{ name: "Home", card: { type: "a" } }, { name: "Security", pin: "1234", card: { type: "b" } }] };
  const dialog = (el: any) => el.shadowRoot.querySelector(".pin-dialog");

  it("asks for the code before opening the tab", async () => {
    const el = await mount(cfg);
    await select(el, 1);
    expect(el.selectedTab).toBe("Home");
    expect(dialog(el)).toBeTruthy();
    const input = dialog(el).querySelector("input") as HTMLInputElement;
    input.value = "0000";
    dialog(el).querySelector("form").dispatchEvent(new Event("submit", { cancelable: true }));
    await settle(el);
    expect(el.selectedTab).toBe("Home");
    expect(dialog(el).querySelector(".pin-error")).toBeTruthy();
    (dialog(el).querySelector("input") as HTMLInputElement).value = "1234";
    dialog(el).querySelector("form").dispatchEvent(new Event("submit", { cancelable: true }));
    await settle(el);
    expect(el.selectedTab).toBe("Security");
    expect(dialog(el)).toBeNull();
    await select(el, 0);
    await select(el, 1);
    expect(el.selectedTab).toBe("Security");
  });

  it("cancel leaves the selection alone; a locked default opens the first unlocked tab", async () => {
    const el = await mount({ ...cfg, default_tab: "Security" });
    expect(el.selectedTab).toBe("Home");
    await select(el, 1);
    (dialog(el).querySelector(".pin-cancel") as HTMLButtonElement).click();
    await settle(el);
    expect(dialog(el)).toBeNull();
    expect(el.selectedTab).toBe("Home");
  });
});

describe("ring and badge icon", () => {
  it("passes the ring percentage and badge icon to the bar", async () => {
    const el = await mount(
      { tabs: [{ name: "Washer", icon: "mdi:washing-machine", ring: "sensor.washer", ring_max: 60, badge_icon: "mdi:alert", card: { type: "a" } }] },
      { states: { "sensor.washer": st("45") } },
    );
    expect(bar(el).items[0].ring).toBe(75);
    expect(bar(el).items[0].badgeIcon).toBe("mdi:alert");
  });
});
