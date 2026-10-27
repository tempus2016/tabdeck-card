import { describe, it, expect, beforeAll, vi } from "vitest";

let created = 0;

beforeAll(() => {
  (window as any).loadCardHelpers = async () => ({
    createCardElement: (config: any) => {
      created++;
      const el = document.createElement("div") as any;
      el.setAttribute("data-type", config.type ?? "");
      el._cfg = config;
      el.getCardSize = () => config.size ?? 3;
      if (config.default_columns) el.getGridOptions = () => ({ columns: config.default_columns });
      return el;
    },
  });
  if (!customElements.get("ha-icon")) {
    customElements.define("ha-icon", class extends HTMLElement {});
  }
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

const tabs = [
  { name: "A", card: { type: "a" } },
  { name: "B", card: { type: "b" } },
  { name: "C", card: { type: "c" } },
];

const content = (el: any) => el.shadowRoot.querySelector(".content") as HTMLElement;

describe("transitions", () => {
  it("animates with the configured duration, easing and direction", async () => {
    const el = await mount({ tabs, transition: "slide", transition_duration: 300, transition_easing: "linear" });
    const calls: any[] = [];
    (HTMLElement.prototype as any).animate = function (frames: any, opts: any) {
      calls.push({ frames, opts });
      return {};
    };
    try {
      el.selectTab(2);
      await settle(el);
      el.selectTab(0);
      await settle(el);
    } finally {
      delete (HTMLElement.prototype as any).animate;
    }
    expect(calls).toHaveLength(2);
    expect(calls[0].opts).toEqual({ duration: 300, easing: "linear" });
    expect(calls[0].frames[0].transform).toBe("translateX(12px)");
    expect(calls[1].frames[0].transform).toBe("translateX(-12px)");
  });
});

describe("transition_narrow", () => {
  async function switchAnimations(raw: any, width: number) {
    const el = await mount({ tabs, ...raw });
    el._width = width;
    await settle(el);
    const calls: any[] = [];
    (HTMLElement.prototype as any).animate = function (frames: any, opts: any) {
      calls.push({ frames, opts });
      return {};
    };
    try {
      el.selectTab(1);
      await settle(el);
    } finally {
      delete (HTMLElement.prototype as any).animate;
    }
    return calls;
  }

  it("uses the narrow transition below narrow_width", async () => {
    expect(await switchAnimations({ transition: "slide", transition_narrow: "none" }, 380)).toHaveLength(0);
    const fade = await switchAnimations({ transition: "slide", transition_narrow: "fade" }, 380);
    expect(fade[0].frames[0].transform).toBeUndefined();
  });

  it("keeps the normal transition on wide cards and before the width is known", async () => {
    expect(await switchAnimations({ transition: "slide", transition_narrow: "none" }, 900)).toHaveLength(1);
    expect(await switchAnimations({ transition: "slide", transition_narrow: "none" }, 0)).toHaveLength(1);
  });

  it("respects narrow_width", async () => {
    expect(await switchAnimations({ transition: "slide", transition_narrow: "none", narrow_width: 1000 }, 900)).toHaveLength(0);
  });
});

describe("content height", () => {
  it("tallest stacks the panels so the content keeps the tallest height", async () => {
    const el = await mount({ tabs, content_height: "tallest" });
    expect(content(el).classList.contains("tallest")).toBe(true);
  });

  it("a fixed or max height scrolls inside", async () => {
    const el = await mount({ tabs, content_height: 300, content_max_height: "60vh" });
    expect(content(el).style.height).toBe("300px");
    expect(content(el).style.maxHeight).toBe("60vh");
    expect(content(el).classList.contains("scrolls")).toBe(true);
  });

  it("auto sets nothing", async () => {
    const el = await mount({ tabs });
    expect(content(el).style.height).toBe("");
    expect(content(el).classList.contains("scrolls")).toBe(false);
  });
});

describe("tab background", () => {
  it("applies the active tab's background to the content", async () => {
    const el = await mount({
      tabs: [
        { name: "A", background: "/local/a.jpg", card: { type: "a" } },
        { name: "B", card: { type: "b" } },
      ],
    });
    expect(content(el).style.background).toContain("a.jpg");
    expect(content(el).classList.contains("has-bg")).toBe(true);
    el.selectTab(1);
    await settle(el);
    expect(content(el).style.background).toBe("");
    // The padding stays, so the content doesn't change size between tabs.
    expect(content(el).classList.contains("has-bg")).toBe(true);
  });
});

describe("header and footer cards", () => {
  it("renders them around the deck on every tab, with hass", async () => {
    const hass = { states: {} };
    const el = await mount(
      { tabs, header_cards: [{ type: "head" }], footer_cards: [{ type: "foot1" }, { type: "foot2" }] },
      hass,
    );
    const root = el.shadowRoot;
    const head = root.querySelector(".deck-header [data-type='head']");
    expect(head).toBeTruthy();
    expect(root.querySelectorAll(".deck-footer [data-type^='foot']")).toHaveLength(2);
    expect((head as any).hass).toBe(hass);
    el.selectTab(2);
    await settle(el);
    expect(root.querySelector(".deck-header [data-type='head']")).toBe(head);
  });
});

describe("fullscreen", () => {
  const barButton = (el: any) =>
    el.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelector(".fs-btn") as HTMLButtonElement | null;

  it("the bar's button opens the content full screen; Esc and the close button leave", async () => {
    const el = await mount({ tabs, fullscreen: true });
    await el.shadowRoot.querySelector("tabdeck-tabbar").updateComplete;
    expect(el.shadowRoot.querySelector(".fs-toggle")).toBeNull();
    barButton(el)!.click();
    await settle(el);
    expect(content(el).classList.contains("fullscreen")).toBe(true);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await settle(el);
    expect(content(el).classList.contains("fullscreen")).toBe(false);
    barButton(el)!.click();
    await settle(el);
    (el.shadowRoot.querySelector(".fs-toggle") as HTMLButtonElement).click();
    await settle(el);
    expect(content(el).classList.contains("fullscreen")).toBe(false);
  });

  it("without a bar the button floats over the content", async () => {
    const el = await mount({ tabs, fullscreen: true, hide_bar: true });
    expect(el.shadowRoot.querySelector(".fs-toggle")).toBeTruthy();
  });

  it("is off by default", async () => {
    const el = await mount({ tabs });
    await el.shadowRoot.querySelector("tabdeck-tabbar").updateComplete;
    expect(barButton(el)).toBeNull();
    expect(el.shadowRoot.querySelector(".fs-toggle")).toBeNull();
  });
});

describe("swipe peek", () => {
  function touch(type: string, x: number, y = 0) {
    const t = { clientX: x, clientY: y } as any;
    const ev = new Event(type, { bubbles: true }) as any;
    ev.touches = type === "touchend" ? [] : [t];
    ev.changedTouches = [t];
    return ev;
  }

  it("moves the active panel with the finger and shows the neighbour", async () => {
    const el = await mount({ tabs, swipe: true, swipe_peek: true });
    const c = content(el);
    Object.defineProperty(c, "clientWidth", { value: 400, configurable: true });
    c.dispatchEvent(touch("touchstart", 300));
    c.dispatchEvent(touch("touchmove", 200));
    const active = el.shadowRoot.querySelector('.panel[data-index="0"]') as HTMLElement;
    const next = el.shadowRoot.querySelector('.panel[data-index="1"]') as HTMLElement;
    expect(active.style.transform).toBe("translateX(-100px)");
    expect(next.classList.contains("peek")).toBe(true);
    expect(next.style.transform).toBe("translateX(calc(100% + -100px))");
  });

  it("past a third of the width it changes tab and clears the drag styles", async () => {
    const el = await mount({ tabs, swipe: true, swipe_peek: true });
    const c = content(el);
    Object.defineProperty(c, "clientWidth", { value: 400, configurable: true });
    c.dispatchEvent(touch("touchstart", 300));
    c.dispatchEvent(touch("touchmove", 100));
    c.dispatchEvent(touch("touchend", 100));
    await settle(el);
    expect(el.selectedTab).toBe("B");
    expect(el.shadowRoot.querySelector(".panel.peek")).toBeNull();
    expect((el.shadowRoot.querySelector('.panel[data-index="0"]') as HTMLElement).style.transform).toBe("");
  });

  it("a short slow drag snaps back", async () => {
    const el = await mount({ tabs, swipe: true, swipe_peek: true });
    const c = content(el);
    Object.defineProperty(c, "clientWidth", { value: 400, configurable: true });
    const now = vi.spyOn(performance, "now");
    now.mockReturnValue(0);
    c.dispatchEvent(touch("touchstart", 300));
    now.mockReturnValue(1000);
    c.dispatchEvent(touch("touchmove", 260));
    c.dispatchEvent(touch("touchend", 260));
    now.mockRestore();
    await settle(el);
    expect(el.selectedTab).toBe("A");
  });

  it("vertical movement is left to the page", async () => {
    const el = await mount({ tabs, swipe: true, swipe_peek: true });
    const c = content(el);
    c.dispatchEvent(touch("touchstart", 300, 0));
    c.dispatchEvent(touch("touchmove", 290, 120));
    expect((el.shadowRoot.querySelector('.panel[data-index="0"]') as HTMLElement).style.transform).toBe("");
  });
});

describe("unload_after", () => {
  it("frees tabs not opened for that long and rebuilds them on return", async () => {
    const el = await mount({ tabs, unload_after: 5 });
    const start = Date.now();
    el.selectTab(1);
    await settle(el);
    const before = created;
    el._sweepUnloaded(start + 6 * 60_000);
    await settle(el);
    // A and C were last seen at mount; B is active so it stays.
    expect(el.shadowRoot.querySelector("[data-type='a']")).toBeNull();
    expect(el.shadowRoot.querySelector("[data-type='c']")).toBeNull();
    expect(el.shadowRoot.querySelector("[data-type='b']")).toBeTruthy();
    el.selectTab(0);
    await settle(el);
    expect(el.shadowRoot.querySelector("[data-type='a']")).toBeTruthy();
    expect(created).toBe(before + 1);
  });

  it("keeps everything without the option", async () => {
    const el = await mount({ tabs });
    el._sweepUnloaded(Date.now() + 999 * 60_000);
    await settle(el);
    expect(el.shadowRoot.querySelectorAll("[data-type]")).toHaveLength(3);
  });
});

describe("masonry card", () => {
  it("balances cards into columns by size", async () => {
    await import("./components/tabdeck-masonry-card");
    const m = document.createElement("tabdeck-masonry-card") as any;
    m.setConfig({ columns: 2, cards: [{ type: "x", size: 6 }, { type: "y", size: 1 }, { type: "z", size: 1 }] });
    document.body.appendChild(m);
    m.hass = { states: {} };
    await settle(m);
    const cols = m.shadowRoot.querySelectorAll(".column");
    expect(cols).toHaveLength(2);
    expect([...cols[0].children].map((c: any) => c.dataset.type)).toEqual(["x"]);
    expect([...cols[1].children].map((c: any) => c.dataset.type)).toEqual(["y", "z"]);
    expect(m.getCardSize()).toBe(6);
  });

  it("waits for async getCardSize (HA's cards return a promise)", async () => {
    await import("./components/tabdeck-masonry-card");
    const m = document.createElement("tabdeck-masonry-card") as any;
    m.setConfig({ columns: 2, cards: [{ type: "small", size: 1 }, { type: "big", size: 8 }, { type: "c", size: 1 }, { type: "d", size: 1 }] });
    document.body.appendChild(m);
    await settle(m);
    for (const c of m._cards) {
      const n = c.getCardSize();
      c.getCardSize = () => Promise.resolve(n);
    }
    await m._measure();
    await settle(m);
    const cols = m.shadowRoot.querySelectorAll(".column");
    expect([...cols[0].children].map((c: any) => c.dataset.type)).toEqual(["small", "c", "d"]);
    expect([...cols[1].children].map((c: any) => c.dataset.type)).toEqual(["big"]);
  });

  it("works out the column count from min_column_width", async () => {
    await import("./components/tabdeck-masonry-card");
    const m = document.createElement("tabdeck-masonry-card") as any;
    m.setConfig({ min_column_width: 300, cards: [{ type: "x" }, { type: "y" }, { type: "z" }] });
    document.body.appendChild(m);
    await settle(m);
    m._setWidth(950);
    await settle(m);
    expect(m.shadowRoot.querySelectorAll(".column")).toHaveLength(3);
    m._setWidth(500);
    await settle(m);
    expect(m.shadowRoot.querySelectorAll(".column")).toHaveLength(1);
  });

  it("is registered by the deck for layout: masonry tabs", async () => {
    await import("./tabdeck-card");
    expect(customElements.get("tabdeck-masonry-card")).toBeTruthy();
  });
});

describe("sections card", () => {
  async function sectionsCard(cfg: any) {
    await import("./components/tabdeck-sections-card");
    const s = document.createElement("tabdeck-sections-card") as any;
    s.setConfig(cfg);
    document.body.appendChild(s);
    s.hass = { states: {} };
    await settle(s);
    return s;
  }

  const config = {
    max_columns: 3,
    sections: [
      {
        title: "Living room",
        icon: "mdi:sofa",
        badges: [{ entity: "light.lounge" }],
        cards: [
          { type: "tile", grid_options: { columns: 6 } },
          { type: "lamp", default_columns: 6 },
          { type: "media" },
        ],
      },
      { title: "Outside", column_span: 2, cards: [{ type: "cam" }] },
      { cards: [{ type: "untitled" }] },
    ],
  };

  it("renders an HA heading card per titled section, then its cards", async () => {
    const s = await sectionsCard(config);
    const secs = s.shadowRoot.querySelectorAll(".section");
    expect(secs).toHaveLength(3);
    const heading = secs[0].querySelector("[data-type='heading']") as any;
    expect(heading._cfg).toEqual({
      type: "heading",
      heading: "Living room",
      icon: "mdi:sofa",
      heading_style: "title",
      badges: [{ entity: "light.lounge" }],
    });
    expect(secs[2].querySelector("[data-type='heading']")).toBeNull();
    expect(s.hass).toBeTruthy();
    expect(heading.hass).toBe(s.hass);
  });

  it("sizes cards on the 12-column grid: grid_options, then the card's default, then full", async () => {
    const s = await sectionsCard(config);
    const spans = [...s.shadowRoot.querySelectorAll(".section")[0].querySelectorAll(".cell")].map(
      (c: any) => c.style.gridColumn,
    );
    expect(spans).toEqual(["span 6", "span 6", "span 12"]);
  });

  it("fits columns to the width, capped by max_columns; spans shrink to fit", async () => {
    const s = await sectionsCard(config);
    s._setWidth(1400);
    await settle(s);
    const grid = s.shadowRoot.querySelector(".sections") as HTMLElement;
    expect(grid.style.getPropertyValue("--tabdeck-section-columns")).toBe("3");
    expect((s.shadowRoot.querySelectorAll(".section")[1] as HTMLElement).style.gridColumn).toBe("span 2");
    s._setWidth(500);
    await settle(s);
    expect(grid.style.getPropertyValue("--tabdeck-section-columns")).toBe("1");
    expect((s.shadowRoot.querySelectorAll(".section")[1] as HTMLElement).style.gridColumn).toBe("span 1");
  });

  it("rejects a config without sections", async () => {
    await import("./components/tabdeck-sections-card");
    const s = document.createElement("tabdeck-sections-card") as any;
    expect(() => s.setConfig({})).toThrow();
  });

  it("is registered by the deck for layout: sections tabs", async () => {
    await import("./tabdeck-card");
    expect(customElements.get("tabdeck-sections-card")).toBeTruthy();
  });
});
