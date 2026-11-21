import { describe, it, expect, beforeAll, vi } from "vitest";
import "./tabdeck-tabbar";

const nextFrame = () =>
  new Promise<void>((r) => requestAnimationFrame(() => r()));

async function mount() {
  const el = document.createElement("tabdeck-tabbar") as any;
  el.items = [{ name: "A" }, { name: "B" }, { name: "C" }];
  el.selected = 0;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("tabdeck-tabbar", () => {
  beforeAll(() => {
    if (!customElements.get("ha-icon")) {
      customElements.define("ha-icon", class extends HTMLElement {});
    }
  });

  it("renders one tab per item with role=tablist", async () => {
    const el = await mount();
    expect(el.getAttribute("role")).toBe("tablist");
    expect(el.shadowRoot.querySelectorAll("tabdeck-tab")).toHaveLength(3);
  });

  it("sets an accessible name on the tablist (default + custom)", async () => {
    const el = await mount();
    expect(el.getAttribute("aria-label")).toBe("Tabs");
    el.barLabel = "Rooms";
    await el.updateComplete;
    expect(el.getAttribute("aria-label")).toBe("Rooms");
  });

  it("emits tabdeck-select on tab click", async () => {
    const el = await mount();
    const handler = vi.fn();
    el.addEventListener("tabdeck-select", handler);
    el.shadowRoot.querySelectorAll("tabdeck-tab")[2].click();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.index).toBe(2);
  });

  it("liquid indicator: stretches on a selection change only, not with reduced motion or when off", async () => {
    const proto = HTMLElement.prototype as any;
    const saved = ["offsetLeft", "offsetWidth", "offsetTop", "offsetHeight"].map((k) => [k, Object.getOwnPropertyDescriptor(proto, k)] as const);
    Object.defineProperty(proto, "offsetWidth", { configurable: true, get: () => 80 });
    Object.defineProperty(proto, "offsetHeight", { configurable: true, get: () => 48 });
    Object.defineProperty(proto, "offsetTop", { configurable: true, get: () => 0 });
    Object.defineProperty(proto, "offsetLeft", {
      configurable: true,
      get(this: HTMLElement) {
        return [...(this.parentNode?.children ?? [])].filter((c) => c.tagName === "TABDECK-TAB").indexOf(this) * 80;
      },
    });
    const calls: any[] = [];
    const hadAnimate = "animate" in Element.prototype;
    (Element.prototype as any).animate = function (k: any) {
      calls.push(k);
      return {} as any;
    };
    const mm = window.matchMedia;
    let reduce = false;
    (window as any).matchMedia = (q: string) => ({ matches: reduce && q.includes("reduce") });
    try {
      const el = await mount();
      el.liquid = true;
      await el.updateComplete;
      await nextFrame();
      await el.updateComplete;
      el.selected = 2;
      await el.updateComplete;
      expect(calls).toHaveLength(1);
      expect(calls[0][1]).toMatchObject({ left: "0px", width: "240px" });
      // The second measure after the tabs settle doesn't replay it.
      await new Promise((r) => setTimeout(r, 0));
      expect(calls).toHaveLength(1);
      reduce = true;
      el.selected = 0;
      await el.updateComplete;
      expect(calls).toHaveLength(1);
      reduce = false;
      el.liquid = false;
      el.selected = 1;
      await el.updateComplete;
      expect(calls).toHaveLength(1);
      expect(el.shadowRoot.querySelector(".indicator").classList.contains("animate")).toBe(true);
    } finally {
      for (const [k, d] of saved) if (d) Object.defineProperty(proto, k, d);
      if (!hadAnimate) delete (Element.prototype as any).animate;
      (window as any).matchMedia = mm;
    }
  });

  it("ArrowRight selects the next tab and wraps", async () => {
    const el = await mount();
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    el.selected = 2;
    await el.updateComplete;
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(events[events.length - 1]).toBe(0);
  });

  it("tooltip: a mouse hover shows the tab's summary after a pause; touch, press and leave don't", async () => {
    vi.useFakeTimers();
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A", tooltip: "2 lights on · hall off", holdAction: true }, { name: "B" }];
    el.selected = 1;
    document.body.appendChild(el);
    await el.updateComplete;
    const ptr = (type: string, pointerType = "mouse") => Object.assign(new Event(type), { pointerType });
    const tab = el.shadowRoot.querySelectorAll("tabdeck-tab")[0];
    const tip = () => el.shadowRoot.querySelector(".tip");
    expect(tab.getAttribute("aria-description")).toBe("2 lights on · hall off");
    tab.dispatchEvent(ptr("pointerenter"));
    vi.advanceTimersByTime(300);
    await el.updateComplete;
    expect(tip()).toBeNull();
    vi.advanceTimersByTime(300);
    await el.updateComplete;
    expect(tip()?.textContent).toContain("2 lights on · hall off");
    expect(tip()?.getAttribute("role")).toBe("tooltip");
    // Pressing (start of a long-press) hides it, and the hold still fires.
    const actions: number[] = [];
    el.addEventListener("tabdeck-action", (e: any) => actions.push(e.detail.index));
    tab.dispatchEvent(ptr("pointerdown"));
    await el.updateComplete;
    expect(tip()).toBeNull();
    vi.advanceTimersByTime(600);
    expect(actions).toEqual([0]);
    tab.dispatchEvent(ptr("pointerup"));
    // Leaving before the pause: nothing.
    tab.dispatchEvent(ptr("pointerenter"));
    tab.dispatchEvent(ptr("pointerleave"));
    vi.advanceTimersByTime(1000);
    await el.updateComplete;
    expect(tip()).toBeNull();
    // Touch never shows it; a tab without a tooltip neither.
    tab.dispatchEvent(ptr("pointerenter", "touch"));
    el.shadowRoot.querySelectorAll("tabdeck-tab")[1].dispatchEvent(ptr("pointerenter"));
    vi.advanceTimersByTime(1000);
    await el.updateComplete;
    expect(tip()).toBeNull();
    // Escape closes a shown tooltip.
    tab.dispatchEvent(ptr("pointerenter"));
    vi.advanceTimersByTime(600);
    await el.updateComplete;
    expect(tip()).toBeTruthy();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await el.updateComplete;
    expect(tip()).toBeNull();
    vi.useRealTimers();
    el.remove();
  });

  it("long-press fires tabdeck-action and suppresses the select click", async () => {
    vi.useFakeTimers();
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A", holdAction: true }, { name: "B" }];
    el.selected = 1;
    document.body.appendChild(el);
    await el.updateComplete;
    const actions: number[] = [];
    const selects: number[] = [];
    el.addEventListener("tabdeck-action", (e: any) => actions.push(e.detail.index));
    el.addEventListener("tabdeck-select", (e: any) => selects.push(e.detail.index));
    const tab = el.shadowRoot.querySelectorAll("tabdeck-tab")[0];
    tab.dispatchEvent(new Event("pointerdown"));
    vi.advanceTimersByTime(600);
    tab.dispatchEvent(new Event("pointerup"));
    tab.click();
    expect(actions).toEqual([0]);
    expect(selects).toEqual([]); // click suppressed after a hold
    vi.useRealTimers();
  });

  it("a quick tap (no hold) still selects when holdAction is set", async () => {
    vi.useFakeTimers();
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A", holdAction: true }, { name: "B" }];
    el.selected = 1;
    document.body.appendChild(el);
    await el.updateComplete;
    const selects: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => selects.push(e.detail.index));
    const tab = el.shadowRoot.querySelectorAll("tabdeck-tab")[0];
    tab.dispatchEvent(new Event("pointerdown"));
    vi.advanceTimersByTime(100);
    tab.dispatchEvent(new Event("pointerup"));
    tab.click();
    expect(selects).toEqual([0]);
    vi.useRealTimers();
  });

  it("keyboard navigation skips disabled tabs", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B", disabled: true }, { name: "C" }];
    el.selected = 0;
    document.body.appendChild(el);
    await el.updateComplete;
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(events[events.length - 1]).toBe(2); // skipped disabled B
  });

  it("reflects disabled onto the disabled tab element", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B", disabled: true }];
    el.selected = 0;
    document.body.appendChild(el);
    await el.updateComplete;
    const tabs = el.shadowRoot.querySelectorAll("tabdeck-tab");
    await tabs[1].updateComplete;
    expect(tabs[1].hasAttribute("disabled")).toBe(true);
  });

  it("Home selects the first, End the last", async () => {
    const el = await mount();
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
    expect(events[events.length - 1]).toBe(2);
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
    expect(events[events.length - 1]).toBe(0);
  });

  it("renders a single indicator element inside the bar", async () => {
    const el = await mount();
    const bar = el.shadowRoot.querySelector(".bar");
    expect(bar.querySelectorAll(".indicator")).toHaveLength(1);
  });

  it("hides the indicator (opacity 0) when offsets are unmeasurable in jsdom", async () => {
    const el = await mount();
    expect(el.shadowRoot.querySelector(".indicator").style.opacity).toBe("0");
  });

  it("positions the indicator by selected index, not the reflected [selected] attribute", async () => {
    const el = await mount();
    const tabs = el.shadowRoot.querySelectorAll("tabdeck-tab");
    tabs.forEach((t: HTMLElement, i: number) => {
      Object.defineProperty(t, "offsetLeft", { value: i * 100, configurable: true });
      Object.defineProperty(t, "offsetTop", { value: 0, configurable: true });
      Object.defineProperty(t, "offsetWidth", { value: 100, configurable: true });
      Object.defineProperty(t, "offsetHeight", { value: 48, configurable: true });
    });
    el.selected = 2;
    await el.updateComplete;
    // Simulate the child-reflection race: a child tab reflects `selected` to its
    // attribute in its own async update, which runs after the parent's updated().
    // So at position-time the stale attribute can sit on the wrong tab.
    tabs.forEach((t: HTMLElement) => t.removeAttribute("selected"));
    tabs[0].setAttribute("selected", "");
    el["_position"]();
    expect(el.shadowRoot.querySelector(".indicator").style.left).toBe("200px");
  });

  it("adopts the selected tab's accent as --tabdeck-accent when accentIndicator is on", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A", accent: "#ff0000" }, { name: "B", accent: "#00ff00" }];
    el.selected = 0;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("#ff0000");
    el.selected = 1;
    await el.updateComplete;
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("#00ff00");
  });

  it("does not set --tabdeck-accent when accentIndicator is off", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A", accent: "#ff0000" }];
    el.selected = 0;
    el.accentIndicator = false;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("");
  });

  it("sets --tabdeck-indicator-radius when indicatorRadius is provided", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }];
    el.selected = 0;
    el.indicatorRadius = 4;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.getPropertyValue("--tabdeck-indicator-radius")).toBe("4px");
  });

  it("applies elevation class and a custom bar background", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }];
    el.selected = 0;
    el.elevation = true;
    el.barBackground = "rgb(34, 34, 34)";
    document.body.appendChild(el);
    await el.updateComplete;
    const bar = el.shadowRoot.querySelector(".bar");
    expect(bar.classList.contains("elevated")).toBe(true);
    expect(bar.style.background).toBe("rgb(34, 34, 34)");
  });

  it("shows scroll buttons when a horizontal bar overflows and scroll_buttons is on", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B" }, { name: "C" }];
    el.selected = 0;
    el.scrollButtons = true;
    el.position = "top";
    document.body.appendChild(el);
    await el.updateComplete;
    const bar = el.shadowRoot.querySelector(".bar");
    Object.defineProperty(bar, "scrollWidth", { value: 500, configurable: true });
    Object.defineProperty(bar, "clientWidth", { value: 100, configurable: true });
    el._updateOverflow();
    await el.updateComplete;
    expect(el.shadowRoot.querySelectorAll(".scroll-btn")).toHaveLength(2);
  });

  it("shows no scroll buttons by default", async () => {
    const el = await mount();
    expect(el.shadowRoot.querySelector(".scroll-btn")).toBeNull();
  });

  it("opens an overflow menu listing all tabs and selects from it", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B" }, { name: "C" }];
    el.selected = 0;
    el.overflowMenu = true;
    el.position = "top";
    document.body.appendChild(el);
    await el.updateComplete;
    const bar = el.shadowRoot.querySelector(".bar");
    Object.defineProperty(bar, "scrollWidth", { value: 500, configurable: true });
    Object.defineProperty(bar, "clientWidth", { value: 100, configurable: true });
    el._updateOverflow();
    await el.updateComplete;
    el.shadowRoot.querySelector(".overflow-btn").click();
    await el.updateComplete;
    const items = el.shadowRoot.querySelectorAll(".overflow-item");
    expect(items).toHaveLength(3);
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    items[2].click();
    expect(events).toEqual([2]);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".overflow-menu")).toBeNull(); // closed after pick
  });

  it("applies the alignment class to the bar", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B" }];
    el.selected = 0;
    el.align = "center";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".bar").classList.contains("align-center")).toBe(true);
  });

  it("applies position:sticky to the host when sticky is on (top edge)", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }];
    el.selected = 0;
    el.sticky = true;
    el.position = "top";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.position).toBe("sticky");
    // Clears HA's fixed app header (--header-height), overridable.
    expect(el.style.getPropertyValue("top")).toBe(
      "var(--tabdeck-sticky-top, var(--header-height, 0px))",
    );
  });

  it("pins to the bottom edge for a bottom bar, and clears when sticky is off", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }];
    el.selected = 0;
    el.sticky = true;
    el.position = "bottom";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.bottom).toBe("0px");
    el.sticky = false;
    await el.updateComplete;
    expect(el.style.position).toBe("");
  });

  it("adds the animate class after first paint when animated (default)", async () => {
    const el = await mount();
    await nextFrame();
    await el.updateComplete;
    expect(
      el.shadowRoot.querySelector(".indicator").classList.contains("animate"),
    ).toBe(true);
  });

  it("never adds the animate class when animated is false", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B" }, { name: "C" }];
    el.selected = 0;
    el.animated = false;
    document.body.appendChild(el);
    await el.updateComplete;
    await nextFrame();
    await el.updateComplete;
    expect(
      el.shadowRoot.querySelector(".indicator").classList.contains("animate"),
    ).toBe(false);
  });
});

describe("tabdeck-tabbar alert passthrough", () => {
  it("passes item.alert to the tab", async () => {
    await import("./tabdeck-tabbar");
    const bar = document.createElement("tabdeck-tabbar") as any;
    bar.items = [{ name: "A" }, { name: "B", alert: true }];
    document.body.appendChild(bar);
    await bar.updateComplete;
    const tabs = bar.shadowRoot.querySelectorAll("tabdeck-tab");
    expect(tabs[0].alert).toBe(false);
    expect(tabs[1].alert).toBe(true);
  });
});

describe("tabdeck-tabbar action tabs", () => {
  it("arrow keys and Home/End skip action tabs", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "Nav", action: true }, { name: "A" }, { name: "Link", action: true }, { name: "B" }];
    el.selected = 1;
    document.body.appendChild(el);
    await el.updateComplete;
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(events.at(-1)).toBe(3);
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
    expect(events.at(-1)).toBe(1);
  });

  it("action tabs stay focusable and activate on Enter", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "Nav", action: true }];
    el.selected = 0;
    document.body.appendChild(el);
    await el.updateComplete;
    const tab = el.shadowRoot.querySelectorAll("tabdeck-tab")[1];
    await tab.updateComplete;
    expect(tab.tabIndex).toBe(0);
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    tab.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(events).toEqual([1]);
  });
});

describe("tabdeck-tabbar search", () => {
  async function mountBar() {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [
      { name: "Kitchen" },
      { name: "Living Room", subtitle: "lounge" },
      { name: "Garage", disabled: true },
      { name: "Café" },
    ];
    el.searchable = true;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it("filters by name/subtitle, ignoring case and accents, skipping disabled", async () => {
    const el = await mountBar();
    el.shadowRoot.querySelector(".search-btn").click();
    await el.updateComplete;
    expect(el._matches("LOUNGE").map((m: any) => m.index)).toEqual([1]);
    expect(el._matches("cafe").map((m: any) => m.index)).toEqual([3]);
    expect(el._matches("ga").map((m: any) => m.index)).toEqual([]);
    expect(el._matches("").map((m: any) => m.index)).toEqual([0, 1, 3]);
  });

  it("Enter picks the first match and closes", async () => {
    const el = await mountBar();
    const picks: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => picks.push(e.detail.index));
    el.openSearch();
    await el.updateComplete;
    const input = el.shadowRoot.querySelector(".search-input");
    input.value = "liv";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, composed: true }));
    await el.updateComplete;
    expect(picks).toEqual([1]);
    expect(el.shadowRoot.querySelector(".search-panel")).toBeNull();
  });
});

describe("tabdeck-tabbar customize panel", () => {
  it("moves and hides tabs, never hiding the last one", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B" }];
    el.customizable = true;
    el.customItems = [{ name: "A", key: "A" }, { name: "B", key: "B", hidden: true }];
    document.body.appendChild(el);
    await el.updateComplete;
    const seen: any[] = [];
    el.addEventListener("tabdeck-customize", (e: any) => seen.push(e.detail));
    el.shadowRoot.querySelector(".custom-btn").click();
    await el.updateComplete;
    el.shadowRoot.querySelectorAll(".custom-down")[0].click();
    el.shadowRoot.querySelectorAll(".custom-eye")[0].click();
    el.shadowRoot.querySelector(".custom-reset").click();
    expect(seen).toEqual([{ order: ["B", "A"], hidden: ["B"] }, { reset: true }]);
  });
});

describe("tabdeck-tabbar rail expand", () => {
  it("shows icons until hovered or focused, then labels", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "Home", icon: "mdi:home" }, { name: "Lights", icon: "mdi:lightbulb" }];
    el.position = "left";
    el.display = "both";
    el.railExpand = true;
    document.body.appendChild(el);
    await el.updateComplete;
    const tab = () => el.shadowRoot.querySelector("tabdeck-tab");
    expect(tab().display).toBe("icon");
    expect(el.hasAttribute("rail-expand")).toBe(true);
    el.dispatchEvent(new Event("mouseenter"));
    await el.updateComplete;
    expect(tab().display).toBe("both");
    expect(el.hasAttribute("expanded")).toBe(true);
    el.dispatchEvent(new Event("mouseleave"));
    await el.updateComplete;
    expect(tab().display).toBe("icon");
  });

  it("does nothing on horizontal bars", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "Home", icon: "mdi:home" }];
    el.position = "top";
    el.railExpand = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tab").display).toBe("both");
    expect(el.hasAttribute("rail-expand")).toBe(false);
  });
});

describe("tab separators", () => {
  it("draws a line or a space before a tab, not as a tab", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B", separator: "line" }, { name: "C", separator: "space" }];
    document.body.appendChild(el);
    await el.updateComplete;
    const bar = el.shadowRoot.querySelector(".bar");
    expect(el.shadowRoot.querySelectorAll("tabdeck-tab")).toHaveLength(3);
    const order = [...bar.children].map((c: any) => (c.classList.contains("sep") ? c.className : c.tagName === "TABDECK-TAB" ? c.label : "x"));
    expect(order).toEqual(["x", "A", "sep sep-line", "B", "sep sep-space", "C"]);
    expect(bar.querySelector(".sep").getAttribute("aria-hidden")).toBe("true");
    el.remove();
  });

  it("leaves separators out of a dots bar", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B", separator: "line" }];
    el.display = "dots";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".sep")).toBeNull();
    el.remove();
  });
});

describe("double tap", () => {
  async function mountDT() {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B", doubleTap: true }];
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it("a double tap fires the action and doesn't select", async () => {
    vi.useFakeTimers();
    const el = await mountDT();
    const select = vi.fn();
    const action = vi.fn();
    el.addEventListener("tabdeck-select", select);
    el.addEventListener("tabdeck-action", (e: any) => action(e.detail));
    const tab = el.shadowRoot.querySelectorAll("tabdeck-tab")[1];
    tab.click();
    vi.advanceTimersByTime(100);
    tab.click();
    vi.advanceTimersByTime(500);
    expect(action).toHaveBeenCalledWith({ index: 1, kind: "double_tap" });
    expect(select).not.toHaveBeenCalled();
    vi.useRealTimers();
    el.remove();
  });

  it("a single tap still selects, after the double-tap window", async () => {
    vi.useFakeTimers();
    const el = await mountDT();
    const select = vi.fn();
    el.addEventListener("tabdeck-select", select);
    el.shadowRoot.querySelectorAll("tabdeck-tab")[1].click();
    expect(select).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(select).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
    el.remove();
  });

  it("tabs without a double-tap action select at once", async () => {
    const el = await mountDT();
    const select = vi.fn();
    el.addEventListener("tabdeck-select", select);
    el.shadowRoot.querySelectorAll("tabdeck-tab")[0].click();
    expect(select).toHaveBeenCalledTimes(1);
    el.remove();
  });
});

describe("tabdeck-tabbar drag to reorder", () => {
  // Three 100 px wide tabs side by side.
  const setup = async () => {
    const el = await mount();
    el.reorderable = true;
    await el.updateComplete;
    const tabs = [...el.shadowRoot.querySelectorAll("tabdeck-tab")] as HTMLElement[];
    tabs.forEach((t, i) => {
      t.getBoundingClientRect = () => ({ left: i * 100, right: i * 100 + 100, top: 0, bottom: 48, width: 100, height: 48 }) as DOMRect;
    });
    return { el, tabs };
  };
  const ptr = (type: string, x: number, pointerType = "mouse") => {
    const e = new Event(type, { bubbles: true, composed: true }) as any;
    Object.assign(e, { clientX: x, clientY: 20, pointerId: 1, pointerType, button: 0 });
    return e;
  };

  it("a mouse drag past another tab fires tabdeck-reorder and eats the click", async () => {
    const { el, tabs } = await setup();
    const reorder = vi.fn();
    const select = vi.fn();
    el.addEventListener("tabdeck-reorder", reorder);
    el.addEventListener("tabdeck-select", select);
    tabs[0].dispatchEvent(ptr("pointerdown", 50));
    window.dispatchEvent(ptr("pointermove", 120));
    window.dispatchEvent(ptr("pointermove", 260));
    await el.updateComplete;
    expect(tabs[2].dataset.drop).toBe("after");
    window.dispatchEvent(ptr("pointerup", 260));
    tabs[0].click();
    expect(reorder).toHaveBeenCalledTimes(1);
    expect(reorder.mock.calls[0][0].detail).toEqual({ from: 0, to: 2, after: true });
    expect(select).not.toHaveBeenCalled();
  });

  it("a short wiggle is still a click, and a quick touch slide scrolls instead of dragging", async () => {
    const { el, tabs } = await setup();
    const reorder = vi.fn();
    el.addEventListener("tabdeck-reorder", reorder);
    tabs[1].dispatchEvent(ptr("pointerdown", 150));
    window.dispatchEvent(ptr("pointermove", 154));
    window.dispatchEvent(ptr("pointerup", 154));
    tabs[0].dispatchEvent(ptr("pointerdown", 50, "touch"));
    window.dispatchEvent(ptr("pointermove", 250, "touch"));
    window.dispatchEvent(ptr("pointerup", 250, "touch"));
    expect(reorder).not.toHaveBeenCalled();
  });

  it("a touch drag starts after holding the tab still", async () => {
    vi.useFakeTimers();
    try {
      const { el, tabs } = await setup();
      const reorder = vi.fn();
      el.addEventListener("tabdeck-reorder", reorder);
      tabs[2].dispatchEvent(ptr("pointerdown", 250, "touch"));
      vi.advanceTimersByTime(350);
      window.dispatchEvent(ptr("pointermove", 30, "touch"));
      window.dispatchEvent(ptr("pointerup", 30, "touch"));
      expect(reorder.mock.calls[0][0].detail).toEqual({ from: 2, to: 0, after: false });
    } finally {
      vi.useRealTimers();
    }
  });

  it("does nothing unless reorderable", async () => {
    const el = await mount();
    const reorder = vi.fn();
    el.addEventListener("tabdeck-reorder", reorder);
    const tabs = el.shadowRoot.querySelectorAll("tabdeck-tab");
    tabs[0].dispatchEvent(ptr("pointerdown", 50));
    window.dispatchEvent(ptr("pointermove", 260));
    window.dispatchEvent(ptr("pointerup", 260));
    expect(reorder).not.toHaveBeenCalled();
  });
});

describe("bar_limit (limit)", () => {
  const many = Array.from({ length: 40 }, (_, i) => ({ name: `Tab ${i + 1}` }));
  async function bar(props: Record<string, any>) {
    const el = document.createElement("tabdeck-tabbar") as any;
    Object.assign(el, { items: many, ...props });
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }
  const labels = (el: any) => [...el.shadowRoot.querySelectorAll("tabdeck-tab")].map((t: any) => t.label);

  it("draws only the page of tabs around the selected one, with the ⋯ menu listing all", async () => {
    const el = await bar({ limit: 6, selected: 8 });
    expect(labels(el)).toEqual(["Tab 7", "Tab 8", "Tab 9", "Tab 10", "Tab 11", "Tab 12"]);
    expect(el.shadowRoot.querySelectorAll("tabdeck-tab")[2].selected).toBe(true);
    el.shadowRoot.querySelector(".overflow-btn").click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelectorAll(".overflow-item")).toHaveLength(40);
    const picked: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => picked.push(e.detail.index));
    el.shadowRoot.querySelectorAll(".overflow-item")[33].click();
    expect(picked).toEqual([33]);
    el.remove();
  });

  it("a click on a drawn tab selects its real index; keys step past the page", async () => {
    const el = await bar({ limit: 6, selected: 8 });
    const picked: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => picked.push(e.detail.index));
    el.shadowRoot.querySelectorAll("tabdeck-tab")[0].click();
    expect(picked).toEqual([6]);
    el.selected = 11;
    await el.updateComplete;
    el.shadowRoot.querySelectorAll("tabdeck-tab")[5].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, composed: true }));
    expect(picked.at(-1)).toBe(12);
    el.selected = 12;
    await el.updateComplete;
    expect(labels(el)[0]).toBe("Tab 13");
    el.remove();
  });

  it("hiddenAlerts counts alerts and badges on tabs off the bar, and the list shows them", async () => {
    const items = many.slice(0, 10).map((t, i) => ({ ...t, ...(i === 1 ? { badge: "4" } : i === 7 ? { alert: true } : i === 8 ? { badge: "1" } : i === 9 ? { badge: "0" } : {}) }));
    const el = await bar({ items, limit: 4, selected: 0, hiddenAlerts: true });
    const btn = el.shadowRoot.querySelector(".overflow-btn");
    expect(btn.querySelector(".ov-count")?.textContent).toBe("2");
    expect(btn.getAttribute("aria-label")).toContain("2");
    btn.click();
    await el.updateComplete;
    const rows = [...el.shadowRoot.querySelectorAll(".overflow-item")] as HTMLElement[];
    expect(rows[1].querySelector(".ov-badge")?.textContent).toBe("4");
    expect(rows[7].querySelector(".ov-badge.alert")?.textContent).toBe("!");
    expect(rows[8].querySelector(".ov-badge")?.textContent).toBe("1");
    expect(rows[9].querySelector(".ov-badge")).toBeNull();
    // On the last page (tabs 7–10): only the badge on tab 2 is hidden now.
    el.selected = 9;
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".ov-count")?.textContent).toBe("1");
    el.remove();
    const off = await bar({ items, limit: 4, selected: 0 });
    expect(off.shadowRoot.querySelector(".ov-count")).toBeNull();
    off.remove();
  });

  it("off (or a deck that fits) draws every tab without a menu", async () => {
    const el = await bar({ limit: 0, selected: 3 });
    expect(labels(el)).toHaveLength(40);
    expect(el.shadowRoot.querySelector(".overflow-btn")).toBeNull();
    el.remove();
  });
});

describe("bar fade", () => {
  // jsdom has no layout: give the bar a size and a scroll position.
  async function fadeBar(opts: { fade?: boolean; rtl?: boolean; position?: string; dock?: boolean; client?: number; scroll?: number } = {}) {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }];
    el.fade = opts.fade ?? true;
    el.rtl = !!opts.rtl;
    el.position = opts.position ?? "top";
    el.dock = !!opts.dock;
    document.body.appendChild(el);
    await el.updateComplete;
    const bar = el.shadowRoot.querySelector(".bar");
    let left = 0;
    Object.defineProperty(bar, "clientWidth", { configurable: true, get: () => opts.client ?? 300 });
    Object.defineProperty(bar, "scrollWidth", { configurable: true, get: () => opts.scroll ?? 800 });
    Object.defineProperty(bar, "scrollLeft", { configurable: true, get: () => left, set: (v) => (left = v) });
    const scrollTo = async (x: number) => {
      left = x;
      bar.dispatchEvent(new Event("scroll"));
      await el.updateComplete;
    };
    await scrollTo(0);
    return { el, bar, scrollTo };
  }

  it("fades the end at the start, both in the middle, the start at the end", async () => {
    const { bar, scrollTo } = await fadeBar();
    expect(bar.dataset.fade).toBe("end");
    await scrollTo(200);
    expect(bar.dataset.fade).toBe("start end");
    await scrollTo(500);
    expect(bar.dataset.fade).toBe("start");
  });

  it("does nothing when the tabs fit, when off, on a docked bar or a side bar", async () => {
    expect((await fadeBar({ scroll: 300 })).bar.dataset.fade).toBeUndefined();
    expect((await fadeBar({ fade: false })).bar.dataset.fade).toBeUndefined();
    expect((await fadeBar({ dock: true })).bar.dataset.fade).toBeUndefined();
    expect((await fadeBar({ position: "left" })).bar.dataset.fade).toBeUndefined();
  });

  it("reads RTL scroll positions", async () => {
    const { bar, scrollTo } = await fadeBar({ rtl: true });
    expect(bar.dataset.fade).toBe("end");
    await scrollTo(-500);
    expect(bar.dataset.fade).toBe("start");
  });

  it("turns off when the option is switched off", async () => {
    const { el, bar } = await fadeBar();
    expect(bar.dataset.fade).toBe("end");
    el.fade = false;
    await el.updateComplete;
    expect(bar.dataset.fade).toBeUndefined();
  });
});
