// Round 5 "home and kiosk" behaviour: learned default, follow the room,
// doorbell takeover, quiet hours, keep the screen on, click sound.
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

beforeAll(() => {
  (window as any).loadCardHelpers = async () => ({
    createCardElement: (config: any) => {
      const el = document.createElement("div") as any;
      el.setAttribute("data-type", config.type ?? "");
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

afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
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
const select = async (el: any, index: number) => {
  bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index }, bubbles: true, composed: true }));
  await settle(el);
};
const tabs = [
  { name: "Home", card: { type: "x" } },
  { name: "Kitchen", card: { type: "x" } },
  { name: "Bedroom", card: { type: "x" } },
];

describe("learned_default", () => {
  const seed = (counts: Record<string, number>) =>
    localStorage.setItem("tabdeck-learned:d", JSON.stringify({ [new Date().getHours()]: counts }));

  it("opens the tab picked most at this hour, with a dismissible notice", async () => {
    seed({ Kitchen: 4, Home: 1 });
    const el = await mount({ tabs, storage_key: "d", learned_default: true });
    expect(el._selected).toBe(1);
    const note = el.shadowRoot.querySelector(".deck-notice");
    expect(note.textContent).toContain("Opened Kitchen");
    note.querySelector(".notice-close").click();
    await settle(el);
    expect(el.shadowRoot.querySelector(".deck-notice")).toBeNull();
    // Dismissed for good in this browser: the next load opens it quietly.
    el.remove();
    const again = await mount({ tabs, storage_key: "d", learned_default: true });
    expect(again._selected).toBe(1);
    expect(again.shadowRoot.querySelector(".deck-notice")).toBeNull();
  });

  it("learns from the person's picks, not from automatic switches", async () => {
    const el = await mount({ tabs, storage_key: "d", learned_default: { notice: false } });
    expect(el._selected).toBe(0);
    for (let i = 0; i < 3; i++) {
      await select(el, 2);
      await select(el, 0);
    }
    await select(el, 2);
    el._selectIndex(1, false);
    const saved = JSON.parse(localStorage.getItem("tabdeck-learned:d")!)[new Date().getHours()];
    expect(saved).toEqual({ Bedroom: 4, Home: 3 });
    el.remove();
    const again = await mount({ tabs, storage_key: "d", learned_default: { notice: false } });
    expect(again._selected).toBe(2);
    expect(again.shadowRoot.querySelector(".deck-notice")).toBeNull();
  });

  it("gives way to remember, links, default_if and the time / device defaults", async () => {
    seed({ Kitchen: 9 });
    localStorage.setItem("tabdeck-card:d", "name:Bedroom");
    expect((await mount({ tabs, storage_key: "d", learned_default: true, remember: "browser" }))._selected).toBe(2);
    expect((await mount({ tabs, storage_key: "d", learned_default: true, default_by_time: { "00:00": "Bedroom" } }))._selected).toBe(2);
    const cond = [{ ...tabs[0] }, tabs[1], { ...tabs[2], default_if: [{ condition: "state", entity: "sun.sun", state: "up" }] }];
    expect((await mount({ tabs: cond, storage_key: "d", learned_default: true }, { states: { "sun.sun": { state: "up" } } }))._selected).toBe(2);
    const pinned = [tabs[0], { ...tabs[1], pin: "1" }, tabs[2]];
    expect((await mount({ tabs: pinned, storage_key: "d", learned_default: true }))._selected).toBe(0);
    // Off by default.
    expect((await mount({ tabs, storage_key: "d" }))._selected).toBe(0);
  });
});

describe("follow_room", () => {
  const roomTabs = [
    { name: "Home", card: { type: "x" } },
    { name: "Kitchen", area: "kitchen", card: { type: "x" } },
    { name: "Lounge", area: "living_room", card: { type: "x" } },
    { name: "Office", pin: "1", card: { type: "x" } },
    { name: "Bedroom", card: { type: "x" } },
  ];
  const hassWith = (room: string) => ({
    states: { "sensor.room": { state: room, attributes: {} } },
    areas: { kitchen: { area_id: "kitchen", name: "Kitchen" }, living_room: { area_id: "living_room", name: "Living Room" } },
  });
  const move = async (el: any, room: string) => {
    el.hass = hassWith(room);
    await settle(el);
  };

  it("follows the room by area id, area name, tab name and map; only on changes", async () => {
    const el = await mount({ tabs: roomTabs, follow_room: "sensor.room" }, hassWith("kitchen"));
    expect(el._selected).toBe(0); // the first state is only a baseline
    await move(el, "living_room");
    expect(el._selected).toBe(2);
    await move(el, "Kitchen");
    expect(el._selected).toBe(1);
    await move(el, "Living Room");
    expect(el._selected).toBe(2);
    await move(el, "bedroom");
    expect(el._selected).toBe(4);
    // Leaving every room, an unknown room or a PIN-locked tab: stay put.
    await move(el, "not_home");
    await move(el, "garage");
    await move(el, "office");
    expect(el._selected).toBe(4);
    // The person can still pick another tab; the same room doesn't pull back.
    await select(el, 0);
    el.hass = { ...hassWith("office"), states: { "sensor.room": { state: "office", attributes: {} } } };
    await settle(el);
    expect(el._selected).toBe(0);
  });

  it("uses the map first, and waits while the card is in use", async () => {
    const el = await mount({ tabs: roomTabs, follow_room: { entity: "sensor.room", map: { kitchen: "Bedroom" } } }, hassWith("hall"));
    await move(el, "kitchen");
    expect(el._selected).toBe(4);
    el._pointerHeld = true;
    await move(el, "living_room");
    expect(el._selected).toBe(4);
    el._pointerHeld = false;
    el._flushPending();
    await settle(el);
    expect(el._selected).toBe(2);
  });

  it("is off by default", async () => {
    const el = await mount({ tabs: roomTabs }, hassWith("hall"));
    await move(el, "kitchen");
    expect(el._selected).toBe(0);
  });
});

describe("takeover", () => {
  const camTabs = [...tabs, { name: "Cameras", card: { type: "x" } }];
  const bell = (state: string) => ({ states: { "binary_sensor.bell": { state, attributes: {} } } });
  const ring = async (el: any, state: string) => {
    el.hass = bell(state);
    await settle(el);
  };
  const banner = (el: any) => el.shadowRoot.querySelector(".deck-notice.takeover");

  it("shows the tab with a banner and countdown, then goes back", async () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    const el = await mount({ tabs: camTabs, takeover: { entity: "binary_sensor.bell", tab: "Cameras", duration: 10, message: "Doorbell" } }, bell("off"));
    await select(el, 1);
    await ring(el, "on");
    expect(el._selected).toBe(3);
    expect(banner(el).textContent).toContain("Doorbell");
    expect(banner(el).textContent).toContain("Back to Kitchen in 0:10");
    vi.advanceTimersByTime(3000);
    await settle(el);
    expect(el._selected).toBe(3);
    el._takeover.until = Date.now() - 1;
    vi.advanceTimersByTime(1000);
    await settle(el);
    expect(el._selected).toBe(1);
    expect(banner(el)).toBeNull();
  });

  it("x goes back now; opening another tab ends it there", async () => {
    const el = await mount({ tabs: camTabs, takeover: { entity: "binary_sensor.bell", tab: "Cameras" } }, bell("off"));
    await ring(el, "on");
    expect(el._selected).toBe(3);
    banner(el).querySelector(".notice-close").click();
    await settle(el);
    expect(el._selected).toBe(0);
    await ring(el, "off");
    await ring(el, "on");
    expect(el._selected).toBe(3);
    await select(el, 2);
    expect(el._selected).toBe(2);
    expect(banner(el)).toBeNull();
    expect(el._takeover).toBeUndefined();
  });

  it("a tabdeck_select event with takeover starts one; the first state is a baseline", async () => {
    let handler: any;
    const hass: any = { ...bell("on"), connection: { subscribeEvents: (cb: any) => ((handler = cb), Promise.resolve(() => {})) } };
    const el = await mount({ tabs: camTabs, remote_event: true, takeover: { entity: "binary_sensor.bell", tab: "Cameras" } }, hass);
    expect(el._selected).toBe(0);
    handler({ data: { tab: "Bedroom", takeover: 20, message: "Motion" } });
    await settle(el);
    expect(el._selected).toBe(2);
    expect(banner(el).textContent).toContain("Motion");
    expect(Math.round((el._takeover.until - Date.now()) / 1000)).toBe(20);
    // A second ring while one runs keeps the way back to the first tab.
    handler({ data: { tab: "Cameras", takeover: true } });
    await settle(el);
    expect(el._selected).toBe(3);
    el._endTakeover(true);
    await settle(el);
    expect(el._selected).toBe(0);
  });
});

describe("quiet_hours", () => {
  const st = (s: string) => ({ state: s, attributes: {} });
  const hassQ = (night: string, extra: Record<string, any> = {}) => ({
    states: { "input_boolean.night": st(night), "input_text.tab": st(""), "sensor.room": st("hall"), "binary_sensor.bell": st("off"), "binary_sensor.motion": st("off"), ...extra },
  });
  const cfg = {
    tabs: [...tabs.slice(0, 2), { ...tabs[2], auto_select: { entity: "binary_sensor.motion" } }, { name: "Cameras", badge: "sensor.n", card: { type: "x" } }],
    quiet_hours: { entity: "input_boolean.night" },
    remote_entity: "input_text.tab",
    follow_room: "sensor.room",
    takeover: { entity: "binary_sensor.bell", tab: "Cameras" },
    auto_rotate: 10,
    badge_bounce: true,
  };

  it("stops every automatic switch, the pulse and the bounce, but not taps", async () => {
    const el = await mount(cfg, hassQ("on"));
    expect(el.hasAttribute("quiet")).toBe(true);
    expect(bar(el).items[3].bounce).toBe(false);
    el.hass = hassQ("on", { "input_text.tab": st("Kitchen") });
    await settle(el);
    el.hass = hassQ("on", { "input_text.tab": st("Kitchen"), "sensor.room": st("kitchen") });
    await settle(el);
    el.hass = hassQ("on", { "input_text.tab": st("Kitchen"), "sensor.room": st("kitchen"), "binary_sensor.bell": st("on"), "binary_sensor.motion": st("on") });
    await settle(el);
    el._tick(Date.now() + 60_000);
    await settle(el);
    expect(el._selected).toBe(0);
    expect(el._takeover).toBeUndefined();
    await select(el, 1);
    expect(el._selected).toBe(1);
    // Quiet ends: switching works again, the pulse and bounce come back.
    el.hass = hassQ("off", { "input_text.tab": st("Bedroom") });
    await settle(el);
    expect(el._selected).toBe(2);
    expect(el.hasAttribute("quiet")).toBe(false);
    expect(bar(el).items[3].bounce).toBe(true);
  });

  it("follows the time window", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 10, 21, 23, 30));
    const el = await mount({ tabs, quiet_hours: "22:00-07:00", remote_entity: "input_text.tab" }, { states: { "input_text.tab": st("") } });
    expect(el._isQuiet()).toBe(true);
    el.hass = { states: { "input_text.tab": st("Kitchen") } };
    await settle(el);
    expect(el._selected).toBe(0);
    vi.setSystemTime(new Date(2026, 10, 22, 7, 0));
    el.hass = { states: { "input_text.tab": st("Bedroom") } };
    await settle(el);
    expect(el._selected).toBe(2);
  });
});

describe("keep_awake", () => {
  afterEach(() => {
    delete (navigator as any).wakeLock;
  });

  it("holds a wake lock only while a keep_awake tab is open and the card is on the page", async () => {
    const live: any[] = [];
    const request = vi.fn(async () => {
      const s: any = { release: vi.fn(async () => void live.splice(live.indexOf(s), 1)), addEventListener: () => {} };
      live.push(s);
      return s;
    });
    Object.defineProperty(navigator, "wakeLock", { value: { request }, configurable: true });
    const el = await mount({ tabs: [tabs[0], { ...tabs[1], keep_awake: true }, tabs[2]] });
    expect(request).not.toHaveBeenCalled();
    await select(el, 1);
    expect(live.length).toBe(1);
    await select(el, 2);
    expect(live.length).toBe(0);
    await select(el, 1);
    expect(live.length).toBe(1);
    el.remove();
    expect(live.length).toBe(0);
    document.body.appendChild(el);
    await settle(el);
    expect(live.length).toBe(1);
    el.editMode = true;
    await settle(el);
    expect(live.length).toBe(0);
  });

  it("does nothing on plain http (no API)", async () => {
    const debug = vi.spyOn(console, "debug").mockImplementation(() => {});
    const el = await mount({ tabs: [{ ...tabs[0], keep_awake: true }, tabs[1]] });
    expect(el._selected).toBe(0);
    expect(debug).toHaveBeenCalledWith(expect.stringContaining("keep_awake"));
    debug.mockRestore();
  });
});

describe("click_sound", () => {
  it("ticks on the person's switches only, not automatic ones or in quiet hours", async () => {
    const ticks: number[] = [];
    const param = () => ({ setValueAtTime: () => {}, exponentialRampToValueAtTime: (v: number) => void (v > 0.001 && ticks.push(v)) });
    (window as any).AudioContext = class {
      state = "running";
      currentTime = 0;
      destination = {};
      resume() {}
      createOscillator() {
        return { frequency: param(), connect() {}, start() {}, stop() {} };
      }
      createGain() {
        return { gain: param(), connect() {} };
      }
    };
    const volumes = () => ticks.filter((v) => v < 900); // the gain peaks (frequencies are 900+)
    const night = (s: string) => ({ states: { "input_boolean.night": { state: s, attributes: {} } } });
    const el = await mount({ tabs, click_sound: 0.6, quiet_hours: { entity: "input_boolean.night" } }, night("off"));
    await select(el, 1);
    expect(volumes()).toEqual([0.6]);
    el._selectIndex(2, false);
    expect(volumes()).toEqual([0.6]);
    el.hass = night("on");
    await settle(el);
    await select(el, 0);
    expect(el._selected).toBe(0);
    expect(volumes()).toEqual([0.6]);
    // Off by default.
    const plain = await mount({ tabs });
    await select(plain, 1);
    expect(volumes()).toEqual([0.6]);
    delete (window as any).AudioContext;
  });
});

describe("click to edit (tabdeck-edit-tab)", () => {
  it("fires with the config index and names only in edit mode or the editor preview", async () => {
    const el = await mount({ tabs });
    const got: any[] = [];
    document.addEventListener("tabdeck-edit-tab", (e: any) => got.push(e.detail));
    await select(el, 1);
    expect(got).toEqual([]);
    el.preview = true;
    await settle(el);
    await select(el, 2);
    expect(got).toEqual([{ index: 2, names: ["Home", "Kitchen", "Bedroom"] }]);
    el.preview = false;
    el.editMode = true;
    await settle(el);
    await select(el, 0);
    expect(got.at(-1)!.index).toBe(0);
  });
});
