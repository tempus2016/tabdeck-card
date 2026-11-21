import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { normalizeConfig } from "./lib/config";

beforeAll(() => {
  (window as any).loadCardHelpers = async () => ({
    createCardElement: (config: any) => {
      const el = document.createElement("div") as any;
      el.setAttribute("data-type", config.type ?? "");
      return el;
    },
  });
  if (!customElements.get("ha-icon")) customElements.define("ha-icon", class extends HTMLElement {});
});

afterEach(() => {
  document.documentElement.dir = "";
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
const arabic = { states: {}, language: "ar", translationMetadata: { translations: { ar: { isRTL: true } } } };
const three = (extra: any = {}) => ({
  ...extra,
  tabs: [
    { name: "A", card: { type: "a" } },
    { name: "B", card: { type: "b" } },
    { name: "C", card: { type: "c" } },
  ],
});

function swipe(el: any, dx: number) {
  const content = el.shadowRoot.querySelector(".content");
  const start = new Event("touchstart", { bubbles: true }) as any;
  start.touches = [{ clientX: 200, clientY: 100 }];
  Object.defineProperty(start, "timeStamp", { value: 1000 });
  content.dispatchEvent(start);
  const end = new Event("touchend", { bubbles: true }) as any;
  end.changedTouches = [{ clientX: 200 + dx, clientY: 105 }];
  Object.defineProperty(end, "timeStamp", { value: 1200 });
  content.dispatchEvent(end);
}

describe("right-to-left", () => {
  it("direction option", () => {
    expect(normalizeConfig(three()).direction).toBeUndefined();
    expect(normalizeConfig(three({ direction: "rtl" })).direction).toBe("rtl");
    expect(normalizeConfig(three({ direction: "up" })).direction).toBeUndefined();
  });

  it("follows HA's language: dir on the card, mirrored bar", async () => {
    const el = await mount(three(), arabic);
    expect(el.getAttribute("dir")).toBe("rtl");
    expect(bar(el).rtl).toBe(true);
    expect(bar(el).hasAttribute("rtl")).toBe(true);
    const ltr = await mount(three());
    expect(ltr.hasAttribute("dir")).toBe(false);
    expect(bar(ltr).rtl).toBe(false);
  });

  it("follows the page's dir; direction: ltr wins over it", async () => {
    document.documentElement.dir = "rtl";
    expect(bar(await mount(three())).rtl).toBe(true);
    const forced = await mount(three({ direction: "ltr" }));
    expect(forced.getAttribute("dir")).toBe("ltr");
    expect(bar(forced).rtl).toBe(false);
  });

  it("a swipe to the right opens the next tab", async () => {
    const el = await mount(three({ swipe: true, direction: "rtl" }));
    swipe(el, 120);
    await settle(el);
    expect(bar(el).selected).toBe(1);
    swipe(el, -120);
    await settle(el);
    expect(bar(el).selected).toBe(0);
  });

  it("scroll buttons are named for the way they scroll", async () => {
    const el = await mount(three({ direction: "rtl" }));
    const b = bar(el);
    b._updateOverflow = () => {};
    b.scrollButtons = true;
    b._overflow = true;
    await b.updateComplete;
    const [start, end] = [...b.shadowRoot.querySelectorAll(".scroll-btn")];
    // The start of the bar is on the right.
    expect(start.getAttribute("aria-label")).toBe("Scroll right");
    expect(end.getAttribute("aria-label")).toBe("Scroll left");
    expect([start.textContent.trim(), end.textContent.trim()]).toEqual(["›", "‹"]);
  });

  it("content arrows point the way they go", async () => {
    const el = await mount(three({ content_arrows: true, direction: "rtl", default_tab: 1 }));
    expect(el.shadowRoot.querySelector(".nav-arrow.prev").textContent.trim()).toBe("›");
    expect(el.shadowRoot.querySelector(".nav-arrow.next").textContent.trim()).toBe("‹");
  });

  it("ArrowLeft is the next tab on the bar", async () => {
    const el = await mount(three({ direction: "rtl" }));
    const events: number[] = [];
    bar(el).addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    bar(el).dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    bar(el).dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(events).toEqual([1, 2]);
  });
});
