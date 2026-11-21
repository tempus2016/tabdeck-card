// A PIN-locked tab's content is never on screen until its code is entered,
// in any layout: scroll_spy sections, split columns, compare, hold_peek,
// pip, popup, overview, a tab_ref swap and an unlock that runs out
// (pin_timeout). A placeholder (lock, name, "Enter PIN") stands in.
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { rememberPin } from "./lib/smart";

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
  vi.restoreAllMocks();
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

// Home, Cameras (PIN), Office (PIN, 5 min).
const tabs = [
  { name: "Home", card: { type: "home" } },
  { name: "Cameras", pin: "1234", card: { type: "cameras" } },
  { name: "Office", pin: "9", pin_timeout: 5, card: { type: "office" } },
];
const root = (el: any) => el.shadowRoot as ShadowRoot;
const card = (el: any, type: string) => root(el).querySelector(`[data-type="${type}"]`) as HTMLElement | null;
// Shown: in the DOM and not inside a hidden panel.
const shown = (el: any, type: string) => {
  const c = card(el, type);
  return !!c && !c.closest("[hidden]");
};
const placeholders = (el: any) => [...root(el).querySelectorAll(".locked-tab")].map((p) => p.querySelector(".locked-name")!.textContent);
// Unlocked `ms` before its 5-minute pin_timeout runs out. The margin has to
// outlast mounting the card under full-suite load, so expire() waits for the
// real expiry time rather than a fixed delay.
let officeExpiresAt = 0;
const unlockOffice = (ms: number) => {
  officeExpiresAt = Date.now() + ms;
  rememberPin("d", "Office", officeExpiresAt - 5 * 60_000);
};
const expire = async (el: any) => {
  await new Promise((r) => setTimeout(r, Math.max(0, officeExpiresAt - Date.now()) + 150));
  await settle(el);
};
const enterPin = async (el: any, code: string) => {
  const input = root(el).querySelector(".pin-dialog input") as HTMLInputElement;
  input.value = code;
  root(el).querySelector(".pin-dialog form")!.dispatchEvent(new Event("submit", { cancelable: true }));
  await settle(el);
};
const hold = async (el: any, index: number) => {
  root(el)
    .querySelector("tabdeck-tabbar")!
    .dispatchEvent(new CustomEvent("tabdeck-action", { detail: { index, kind: "hold" }, bubbles: true, composed: true }));
  await settle(el);
};

describe("scroll_spy", () => {
  it("shows a placeholder for a locked section; Enter PIN unlocks it in place", async () => {
    const el = await mount({ tabs, scroll_spy: true });
    expect(shown(el, "home")).toBe(true);
    expect(card(el, "cameras")).toBeNull();
    expect(card(el, "office")).toBeNull();
    expect(placeholders(el)).toEqual(["Cameras", "Office"]);
    (root(el).querySelector(".locked-tab .locked-unlock") as HTMLElement).click();
    await settle(el);
    expect(root(el).querySelector(".pin-title")!.textContent).toContain("Cameras");
    await enterPin(el, "0000");
    expect(card(el, "cameras")).toBeNull();
    await enterPin(el, "1234");
    expect(root(el).querySelector(".pin-dialog")).toBeNull();
    expect(shown(el, "cameras")).toBe(true);
    expect(placeholders(el)).toEqual(["Office"]);
    expect(el._selected).toBe(0); // unlocked in place, no jump
  });
});

describe("split", () => {
  it("shows a placeholder column for a locked tab, and the prompt works there", async () => {
    const el = await mount({ tabs, split: { min_width: 800, columns: 3 } });
    el._width = 1200;
    await settle(el);
    expect(root(el).querySelectorAll(".split-col")).toHaveLength(3);
    expect(shown(el, "home")).toBe(true);
    expect(card(el, "cameras")).toBeNull();
    expect(placeholders(el)).toEqual(["Cameras", "Office"]);
    (root(el).querySelector(".locked-tab .locked-unlock") as HTMLElement).click();
    await settle(el);
    expect(root(el).querySelector(".pin-dialog")).not.toBeNull();
    await enterPin(el, "1234");
    expect(shown(el, "cameras")).toBe(true);
    expect(placeholders(el)).toEqual(["Office"]);
  });

  it("locks a column again when its pin_timeout runs out", async () => {
    unlockOffice(1500);
    const el = await mount({ tabs, split: { min_width: 800, columns: 3 } });
    el._width = 1200;
    await settle(el);
    expect(shown(el, "office")).toBe(true);
    await expire(el);
    expect(card(el, "office")).toBeNull();
    expect(placeholders(el)).toEqual(["Cameras", "Office"]);
  });
});

describe("the open tab", () => {
  it("goes back to the placeholder when its unlock runs out", async () => {
    unlockOffice(1500);
    const el = await mount({ tabs, default_tab: "Office" });
    expect(el._selected).toBe(2);
    expect(shown(el, "office")).toBe(true);
    await expire(el);
    expect(shown(el, "office")).toBe(false);
    expect(placeholders(el)).toEqual(["Office"]);
    (root(el).querySelector(".locked-unlock") as HTMLElement).click();
    await settle(el);
    await enterPin(el, "9");
    expect(shown(el, "office")).toBe(true);
  });

  it("shows the placeholder when every tab is locked", async () => {
    const el = await mount({ tabs: tabs.slice(1) });
    expect(card(el, "cameras")).toBeNull();
    expect(placeholders(el)).toEqual(["Cameras"]);
  });

  it("after a tab_ref swap onto a shared tab with a PIN", async () => {
    const { clearDashboardCache } = await import("./lib/view-source");
    clearDashboardCache();
    const shared = { views: [{ cards: [{ type: "custom:tabdeck-card", tabs: [{ name: "Safe", pin: "5", card: { type: "safe" } }] }] }] };
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const hass = { states: {}, callWS: async () => (await gate, shared) };
    const el = await mount({ tabs: [{ tab_ref: "fam/safe", name: "Safe" }, { name: "Home", card: { type: "home" } }] }, hass);
    expect(el._selected).toBe(0); // the stand-in, no PIN yet
    release();
    await new Promise((r) => setTimeout(r, 20));
    await settle(el);
    expect(el._config.tabs[0].pin).toBe("5");
    expect(card(el, "safe")).toBeNull();
    expect(placeholders(el)).toEqual(["Safe"]);
  });
});

describe("compare", () => {
  it("holding a locked tab asks for the code and shows nothing beside", async () => {
    const el = await mount({ tabs, compare: true });
    // The bar treats the press as a hold (not a tap that opens the tab).
    expect((root(el).querySelector("tabdeck-tabbar") as any).items[1].holdAction).toBe(true);
    await hold(el, 1);
    expect(el._compareTab).toBeUndefined();
    expect(shown(el, "cameras")).toBe(false);
    expect(root(el).querySelector(".pin-title")!.textContent).toContain("Cameras");
    await enterPin(el, "1234");
    expect(el._selected).toBe(0); // unlocked, not opened
    await hold(el, 1);
    expect(shown(el, "cameras")).toBe(true);
  });

  it("closes the compared tab when its unlock runs out", async () => {
    unlockOffice(1500);
    const el = await mount({ tabs, compare: true });
    expect(el.compareTab("Office")).toBe(true);
    await settle(el);
    expect(shown(el, "office")).toBe(true);
    await expire(el);
    expect(shown(el, "office")).toBe(false);
    expect(el.compareTab("Office")).toBe(false);
  });
});

describe("hold_peek", () => {
  it("holding a locked tab asks for the code instead of previewing it", async () => {
    const el = await mount({ tabs, hold_peek: true });
    await hold(el, 1);
    expect(el._previewIndex).toBe(-1);
    expect(shown(el, "cameras")).toBe(false);
    expect(root(el).querySelector(".pin-dialog")).not.toBeNull();
  });
});

describe("pip", () => {
  it("drops the floating window when its unlock runs out", async () => {
    unlockOffice(1500);
    const pipTabs = tabs.map((t) => (t.name === "Office" ? { ...t, pip: true } : t));
    const el = await mount({ tabs: pipTabs, default_tab: "Office" });
    el.selectTab("Home");
    await settle(el);
    expect(root(el).querySelector(".panel.pip")).not.toBeNull();
    expect(shown(el, "office")).toBe(true);
    await expire(el);
    expect(root(el).querySelector(".panel.pip")).toBeNull();
    expect(shown(el, "office")).toBe(false);
  });
});

describe("popup", () => {
  it("asks for the code first, then opens the popup", async () => {
    const el = await mount({ tabs, popup: true });
    expect(el.openPopup("Cameras")).toBe(false);
    await settle(el);
    expect(root(el).querySelector(".popup-dialog")).toBeNull();
    expect(root(el).querySelector(".pin-title")!.textContent).toContain("Cameras");
    await enterPin(el, "1234");
    expect(root(el).querySelector(".popup-dialog")).not.toBeNull();
    expect(root(el).querySelector(".popup-body [data-type='cameras']")).not.toBeNull();
    expect(el._selected).toBe(0);
  });

  it("popup: hidden shows the prompt too", async () => {
    const el = await mount({ tabs, popup: "hidden" });
    el.openPopup("Cameras");
    await settle(el);
    expect(root(el).querySelector(".pin-dialog")).not.toBeNull();
  });

  it("shows the placeholder in an open popup once the unlock runs out", async () => {
    unlockOffice(1500);
    const el = await mount({ tabs, popup: true });
    expect(el.openPopup("Office")).toBe(true);
    await settle(el);
    expect(root(el).querySelector(".popup-body [data-type='office']")).not.toBeNull();
    await expire(el);
    expect(root(el).querySelector(".popup-body [data-type='office']")).toBeNull();
    expect(root(el).querySelector(".popup-body .locked-tab")).not.toBeNull();
    // The prompt sits above the popup.
    (root(el).querySelector(".popup-body .locked-unlock") as HTMLElement).click();
    await settle(el);
    expect(root(el).querySelector(".pin-backdrop.over-popup")).not.toBeNull();
  });
});

describe("overview", () => {
  it("shows a lock, not a live thumbnail, for a locked tab", async () => {
    const el = await mount({ tabs, overview: true });
    el.openOverview();
    await settle(el);
    expect(root(el).querySelectorAll(".ov-tile")).toHaveLength(3);
    expect(root(el).querySelectorAll(".ov-lock")).toHaveLength(2);
    expect(card(el, "cameras")).toBeNull();
    expect(card(el, "home")).not.toBeNull();
  });
});
