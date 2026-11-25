import { describe, it, expect, beforeAll, vi } from "vitest";
import { normalizeConfig } from "./lib/config";

// Pictures "load" with these colours (jsdom has no canvas).
const pictureColors: Record<string, [number, number, number]> = {
  "/local/cream.jpg": [250, 240, 215],
  "/local/navy.jpg": [20, 33, 61],
  "/local/garden.jpg": [46, 125, 50],
  "/api/image/serve/alex/512x512": [230, 81, 0],
};
vi.mock("./lib/image-color", async (orig) => ({
  ...(await orig<typeof import("./lib/image-color")>()),
  imageColor: vi.fn(async (url: string) => pictureColors[url]),
}));

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
const one = { tabs: [{ name: "A", card: { type: "a" } }, { name: "B", card: { type: "b" } }] };

describe("glass", () => {
  it("normalises true / a blur in px / off", () => {
    expect(normalizeConfig(one).glass).toBeUndefined();
    expect(normalizeConfig({ ...one, glass: true }).glass).toBe(true);
    expect(normalizeConfig({ ...one, glass: 20 }).glass).toBe(20);
    expect(normalizeConfig({ ...one, glass: 500 }).glass).toBe(60);
    expect(normalizeConfig({ ...one, glass: false }).glass).toBeUndefined();
    expect(normalizeConfig({ ...one, glass: "x" }).glass).toBeUndefined();
  });

  it("frosts the bar: attribute + blur variable; a sticky glass bar stays see-through", async () => {
    const el = await mount({ ...one, glass: 20, sticky: true });
    const b = bar(el);
    expect(b.hasAttribute("glass")).toBe(true);
    expect(b.style.getPropertyValue("--tabdeck-glass-blur")).toBe("20px");
    expect(b.style.backgroundColor).toBe("transparent");
  });

  it("is off by default", async () => {
    const el = await mount(one);
    expect(bar(el).hasAttribute("glass")).toBe(false);
    expect(bar(el).style.getPropertyValue("--tabdeck-glass-blur")).toBe("");
  });
});

describe("liquid_indicator", () => {
  it("is off by default and reaches the bar", async () => {
    expect(normalizeConfig(one).liquid_indicator).toBe(false);
    expect(bar(await mount({ ...one, liquid_indicator: true })).liquid).toBe(true);
  });
});

describe("bar_text", () => {
  const tabVar = (el: any) => bar(el).style.getPropertyValue("--tabdeck-tab-color");

  it("normalises auto / light / dark", () => {
    expect(normalizeConfig(one).bar_text).toBeUndefined();
    expect(normalizeConfig({ ...one, bar_text: true }).bar_text).toBe("auto");
    expect(normalizeConfig({ ...one, bar_text: "light" }).bar_text).toBe("light");
    expect(normalizeConfig({ ...one, bar_text: "pink" }).bar_text).toBeUndefined();
  });

  it("an explicit hint sets the tab text colour", async () => {
    expect(tabVar(await mount({ ...one, bar_text: "light" }))).toContain("255, 255, 255");
    expect(tabVar(await mount({ ...one, bar_text: "dark" }))).toContain("0, 0, 0");
    expect(tabVar(await mount(one))).toBe("");
  });

  it("auto reads a colour bar_background", async () => {
    expect(tabVar(await mount({ ...one, bar_text: "auto", bar_background: "rgb(20, 33, 61)" }))).toContain("255, 255, 255");
    expect(tabVar(await mount({ ...one, bar_text: "auto", bar_background: "rgb(250, 240, 215)" }))).toContain("0, 0, 0");
  });

  it("auto samples a bar_background picture, without blocking the first render", async () => {
    const el = await mount({ ...one, bar_text: "auto", bar_background: "center / cover url('/local/navy.jpg')" });
    await new Promise((r) => setTimeout(r, 0));
    await settle(bar(el));
    expect(tabVar(el)).toContain("255, 255, 255");
    const cream = await mount({ ...one, bar_text: "auto", bar_background: "url(/local/cream.jpg)" });
    await new Promise((r) => setTimeout(r, 0));
    await settle(bar(cream));
    expect(tabVar(cream)).toContain("0, 0, 0");
    // A picture that can't be read leaves the theme's colours.
    const unknown = await mount({ ...one, bar_text: "auto", bar_background: "url(/local/other.jpg)" });
    await new Promise((r) => setTimeout(r, 0));
    expect(tabVar(unknown)).toBe("");
  });
});

describe("seasons", () => {
  it("changes accent, bar background and bar text while the dates last", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    try {
      vi.setSystemTime(new Date(2026, 11, 10, 12));
      const cfg = {
        ...one,
        styles: { "--tabdeck-accent": "blue", "--x": "1" },
        bar_background: "#fff",
        seasons: ["autumn", { theme: "winter", styles: { "--x": "2" } }],
      };
      const el = await mount(cfg);
      expect(el.getAttribute("season")).toBe("winter");
      expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("#ff5d5d");
      expect(el.style.getPropertyValue("--x")).toBe("2");
      expect(bar(el).barBackground).toBe("#14361f");
      expect(bar(el).barText).toBe("light");
      vi.setSystemTime(new Date(2026, 6, 1, 12));
      const summer = await mount(cfg);
      expect(summer.hasAttribute("season")).toBe(false);
      expect(summer.style.getPropertyValue("--tabdeck-accent")).toBe("blue");
      expect(bar(summer).barBackground).toBe("#fff");
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("picture_accent", () => {
  const tabs = [
    { name: "Garden", picture: "/local/garden.jpg", card: { type: "a" } },
    { name: "Alex", picture: "person.alex", card: { type: "b" } },
    { name: "Own", picture: "/local/garden.jpg", accent: "red", card: { type: "c" } },
    { name: "Unreadable", picture: "/local/cors.jpg", card: { type: "d" } },
    { name: "Icon", icon: "mdi:home", card: { type: "e" } },
  ];
  const hass = { states: { "person.alex": { state: "home", attributes: { entity_picture: "/api/image/serve/alex/512x512" } } } };

  it("takes each tab's accent from its picture; own accent and unreadable pictures keep theirs", async () => {
    const el = await mount({ picture_accent: true, tabs }, hass);
    await new Promise((r) => setTimeout(r, 0));
    await settle(el);
    const items = bar(el).items;
    expect(items[0].accent).toBe("rgb(46, 125, 50)");
    expect(items[1].accent).toBe("rgb(230, 81, 0)");
    expect(items[2].accent).toBe("var(--red-color, red)");
    expect(items[3].accent).toBeUndefined();
    expect(items[4].accent).toBeUndefined();
  });

  it("is off by default", async () => {
    const el = await mount({ tabs }, hass);
    await new Promise((r) => setTimeout(r, 0));
    await settle(el);
    expect(bar(el).items[0].accent).toBeUndefined();
  });
});
