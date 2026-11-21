// Automatic tab switches never open a PIN-locked tab: remote_entity,
// remote_event (and its step words), the companion select, takeover,
// follow_room, auto_select, remember: entity, sync_group and idle_return.
// After the code is entered (within pin_timeout) they work again.
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { rememberPin } from "./lib/smart";
import { resetSync } from "./lib/sync";

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
  resetSync();
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  history.replaceState(null, "", location.pathname);
});

async function settle(el: any) {
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
}

async function mount(raw: any, hass: any = { states: {} }) {
  await import("./tabdeck-card");
  const el = document.createElement("tabdeck-card") as any;
  el.setConfig({ storage_key: "d", ...raw });
  document.body.appendChild(el);
  el.hass = hass;
  await settle(el);
  return el;
}

const st = (state: string) => ({ state, attributes: {} });
// Home, Cameras (PIN), Kitchen, Office (PIN, 5 min), Bedroom.
const tabs = [
  { name: "Home", card: { type: "x" } },
  { name: "Cameras", pin: "1234", card: { type: "x" } },
  { name: "Kitchen", card: { type: "x" } },
  { name: "Office", pin: "9", pin_timeout: 5, card: { type: "x" } },
  { name: "Bedroom", card: { type: "x" } },
];
const unlock = (name: string, at = Date.now()) => rememberPin("d", name, at);
const tabbarSelect = async (el: any, index: number) => {
  el.shadowRoot
    .querySelector("tabdeck-tabbar")
    .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index }, bubbles: true, composed: true }));
  await settle(el);
};

describe("remote_entity", () => {
  const set = async (el: any, value: string) => {
    el.hass = { states: { "input_text.tab": st(value) } };
    await settle(el);
  };

  it("doesn't open a locked tab; does once it's unlocked", async () => {
    const el = await mount({ tabs, remote_entity: "input_text.tab" }, { states: { "input_text.tab": st("") } });
    await set(el, "Cameras");
    expect(el._selected).toBe(0);
    expect(el._pinFor).toBeUndefined(); // no prompt for whoever is at the screen
    await set(el, "Kitchen");
    expect(el._selected).toBe(2);
    unlock("Cameras");
    await set(el, "");
    await set(el, "Cameras");
    expect(el._selected).toBe(1);
  });

  it("respects pin_timeout: an old unlock doesn't count", async () => {
    unlock("Office", Date.now() - 6 * 60_000);
    const el = await mount({ tabs, remote_entity: "input_text.tab" }, { states: { "input_text.tab": st("") } });
    await set(el, "Office");
    expect(el._selected).toBe(0);
    unlock("Office");
    await set(el, "3");
    expect(el._selected).toBe(3);
  });

  it("step words skip locked tabs; back and default to a locked tab stay", async () => {
    const el = await mount({ tabs, remote_entity: "input_text.tab", default_tab: "Home" }, { states: { "input_text.tab": st("") } });
    await set(el, "next");
    expect(el._selected).toBe(2); // past Cameras
    await set(el, "");
    await set(el, "next");
    expect(el._selected).toBe(4); // past Office
    await set(el, "previous");
    expect(el._selected).toBe(2);
    await set(el, "");
    await set(el, "previous");
    expect(el._selected).toBe(0);
    // Back to a tab that was opened with the code, after the unlock ran out.
    unlock("Office");
    await set(el, "Office");
    expect(el._selected).toBe(3);
    await set(el, "Bedroom");
    sessionStorage.clear();
    await set(el, "back");
    expect(el._selected).toBe(4);
  });

  it("default to a locked default tab stays where it is", async () => {
    const el = await mount({ tabs, remote_entity: "input_text.tab", default_tab: "Cameras" }, { states: { "input_text.tab": st("") } });
    expect(el._selected).toBe(0); // the locked default isn't shown on load
    await set(el, "Kitchen");
    await set(el, "default");
    expect(el._selected).toBe(2);
  });

  it("with debug on, logs why it stayed", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const el = await mount({ tabs, remote_entity: "input_text.tab", debug: true }, { states: { "input_text.tab": st("") } });
    await set(el, "Cameras");
    expect(info.mock.calls.map((c) => c[0]).filter((m) => /PIN/.test(m))).toEqual([
      'tabdeck-card: remote_entity didn\'t open "Cameras": it has a PIN and isn\'t unlocked',
    ]);
    info.mockClear();
    const quiet = await mount({ tabs, storage_key: "e", remote_entity: "input_text.tab" }, { states: { "input_text.tab": st("") } });
    quiet.hass = { states: { "input_text.tab": st("Cameras") } };
    await settle(quiet);
    expect(info).not.toHaveBeenCalled();
  });

  it("a switch waiting for the person to stop typing is dropped if the tab locks meanwhile", async () => {
    unlock("Office");
    const el = await mount({ tabs, remote_entity: "input_text.tab" }, { states: { "input_text.tab": st("") } });
    el._pointerHeld = true;
    await set(el, "Office");
    expect(el._selected).toBe(0);
    sessionStorage.clear();
    el._pointerHeld = false;
    el._flushPending();
    await settle(el);
    expect(el._selected).toBe(0);
  });
});

describe("remote_event (tabdeck_select)", () => {
  async function withEvents(raw: any) {
    let handler: any;
    const hass: any = { states: {}, connection: { subscribeEvents: (cb: any) => ((handler = cb), Promise.resolve(() => {})) } };
    const el = await mount({ tabs, remote_event: true, ...raw }, hass);
    const send = async (data: any) => {
      handler({ data });
      await settle(el);
    };
    return { el, send };
  }

  it("doesn't open a locked tab by name, slug or index", async () => {
    const { el, send } = await withEvents({});
    await send({ tab: "Cameras" });
    await send({ tab: "cameras" });
    await send({ tab: 1 });
    expect(el._selected).toBe(0);
    await send({ tab: "next" });
    expect(el._selected).toBe(2);
    unlock("Cameras");
    await send({ tab: "Cameras" });
    expect(el._selected).toBe(1);
  });

  it("a takeover aimed at a locked tab doesn't start; a running one carries on", async () => {
    const { el, send } = await withEvents({});
    await send({ tab: "Cameras", takeover: 20, message: "Doorbell" });
    expect(el._selected).toBe(0);
    expect(el._takeover).toBeUndefined();
    await send({ tab: "Kitchen", takeover: 20 });
    expect(el._selected).toBe(2);
    await send({ tab: "Office", takeover: 20 });
    expect(el._selected).toBe(2);
    expect(el._takeover.tab.name).toBe("Kitchen");
    unlock("Cameras");
    await send({ tab: "Cameras", takeover: 20 });
    expect(el._selected).toBe(1);
    expect(el._takeover.tab.name).toBe("Cameras");
  });
});

describe("takeover entity", () => {
  const bell = (state: string) => ({ states: { "binary_sensor.bell": st(state) } });

  it("a doorbell ring doesn't open a locked tab until it's unlocked", async () => {
    const el = await mount({ tabs, takeover: { entity: "binary_sensor.bell", tab: "Cameras" } }, bell("off"));
    el.hass = bell("on");
    await settle(el);
    expect(el._selected).toBe(0);
    expect(el._takeover).toBeUndefined();
    expect(el.shadowRoot.querySelector(".deck-notice.takeover")).toBeNull();
    unlock("Cameras");
    el.hass = bell("off");
    await settle(el);
    el.hass = bell("on");
    await settle(el);
    expect(el._selected).toBe(1);
    expect(el._takeover).toBeDefined();
  });
});

describe("companion select", () => {
  it("picking a locked tab's option leaves the deck (and the entity) where they are", async () => {
    const subs: any[] = [];
    const sent: any[] = [];
    const conn: any = {
      subscribeMessage: (cb: any, msg: any) => (subs.push({ cb, msg }), Promise.resolve(() => {})),
      sendMessagePromise: (msg: any) => (sent.push(msg), Promise.resolve()),
      addEventListener() {},
      removeEventListener() {},
    };
    const el = await mount({ tabs, event_id: "d", companion: true, companion_id: "hall" }, { states: {}, connection: conn });
    expect(subs).toHaveLength(1);
    subs[0].cb({ command: "select", tab: "Cameras" });
    await settle(el);
    expect(el._selected).toBe(0);
    expect(sent.filter((m) => m.tab === "Cameras")).toEqual([]);
    unlock("Cameras");
    subs[0].cb({ command: "select", tab: "Cameras" });
    await settle(el);
    expect(el.selectedTab).toBe("Cameras");
    expect(sent.at(-1).tab).toBe("Cameras");
  });
});

describe("other automatic switches", () => {
  it("auto_select doesn't open a locked tab", async () => {
    const t = tabs.map((x) => (x.name === "Cameras" ? { ...x, auto_select: { entity: "binary_sensor.motion" } } : x));
    const el = await mount({ tabs: t }, { states: { "binary_sensor.motion": st("off") } });
    el.hass = { states: { "binary_sensor.motion": st("on") } };
    await settle(el);
    expect(el._selected).toBe(0);
    unlock("Cameras");
    el.hass = { states: { "binary_sensor.motion": st("off") } };
    await settle(el);
    el.hass = { states: { "binary_sensor.motion": st("on") } };
    await settle(el);
    expect(el._selected).toBe(1);
  });

  it("remember: entity changed on another device doesn't open a locked tab", async () => {
    const hass = (v: string) => ({ states: { "input_number.tab": st(v) }, callService: () => {} });
    const el = await mount({ tabs, remember: "entity", remember_entity: "input_number.tab" }, hass("0"));
    el.hass = hass("1");
    await settle(el);
    expect(el._selected).toBe(0);
    el.hass = hass("2");
    await settle(el);
    expect(el._selected).toBe(2);
  });

  it("remember: entity pointing at a locked tab on load opens the first unlocked tab", async () => {
    const el = await mount({ tabs, remember: "entity", remember_entity: "input_number.tab" }, { states: { "input_number.tab": st("1") }, callService: () => {} });
    expect(el._selected).toBe(0);
  });

  it("sync_group doesn't follow another deck into a locked tab", async () => {
    const a = await mount({ storage_key: "a", sync_group: "house", tabs: tabs.map(({ pin: _p, pin_timeout: _t, ...x }) => x) });
    const b = await mount({ sync_group: "house", tabs });
    a.selectTab("Cameras");
    await settle(b);
    expect(b.selectedTab).toBe("Home");
    a.selectTab("Kitchen");
    await settle(b);
    expect(b.selectedTab).toBe("Kitchen");
    unlock("Cameras");
    a.selectTab("Cameras");
    await settle(b);
    expect(b.selectedTab).toBe("Cameras");
  });

  it("idle_return doesn't go back to a locked default tab", async () => {
    unlock("Cameras");
    const el = await mount({ tabs, idle_return: 30, default_tab: "Cameras" });
    expect(el._selected).toBe(1);
    await tabbarSelect(el, 2);
    sessionStorage.clear();
    const t0 = Date.now();
    el._noteInteraction(t0);
    el._tick(t0 + 31_000);
    await settle(el);
    expect(el._selected).toBe(2);
  });
});

describe("loading and the page API", () => {
  it("a remembered locked tab isn't shown after a reload (new session)", async () => {
    unlock("Cameras");
    const el = await mount({ tabs, remember: "browser" });
    await tabbarSelect(el, 1);
    expect(el._selected).toBe(1);
    el.remove();
    sessionStorage.clear();
    const again = await mount({ tabs, remember: "browser" });
    expect(again._selected).toBe(0);
  });

  it("a #tab= link to a locked tab opens the first unlocked tab", async () => {
    history.replaceState(null, "", "#tab=cameras");
    const el = await mount({ tabs, remember: "url" });
    expect(el._selected).toBe(0);
    history.replaceState(null, "", "#tab=cameras");
    const shared = await mount({ tabs, storage_key: "s", share_button: true });
    expect(shared._selected).toBe(0);
  });

  it("selectTab() and selectDefault() ask for the code instead of opening a locked tab", async () => {
    const el = await mount({ tabs, default_tab: "Cameras" });
    expect(el.selectTab("Cameras")).toBe(false);
    expect(el._pinFor).toEqual({ index: 1, error: false });
    el._pinFor = undefined;
    await tabbarSelect(el, 2);
    expect(el.selectDefault()).toBe(false);
    expect(el._selected).toBe(2);
    expect(el._pinFor).toEqual({ index: 1, error: false });
  });
});
