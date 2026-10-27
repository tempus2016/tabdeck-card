import { describe, it, expect, beforeAll, vi } from "vitest";
import { normalizeConfig, normalizeTab } from "./lib/config";
import { PRESET_NAMES, presetValues } from "./lib/presets";

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

describe("section 5 config", () => {
  it("keeps the per-tab keys", () => {
    const t = normalizeTab({
      icon_animation: "spin",
      picture: "person.alex",
      font_size: 16,
      font_weight: 600,
      font_family: "Georgia, serif",
      card: { type: "x" },
    });
    expect(t.icon_animation).toBe("spin");
    expect(t.picture).toBe("person.alex");
    expect(t.font_size).toBe("16px");
    expect(t.font_weight).toBe("600");
    expect(t.font_family).toBe("Georgia, serif");
  });

  it("rejects font values that could break out of CSS", () => {
    const t = normalizeTab({ font_family: "x; color: red", font_size: "12px}", card: {} });
    expect(t.font_family).toBeUndefined();
    expect(t.font_size).toBeUndefined();
  });

  it("haptic and density", () => {
    const one = { tabs: [{ card: {} }] };
    expect(normalizeConfig(one).haptic).toBeUndefined();
    expect(normalizeConfig({ ...one, haptic: "light" }).haptic).toBe("light");
    expect(normalizeConfig({ ...one, haptic: true }).haptic).toBe("selection");
    expect(normalizeConfig({ ...one, haptic: "boom" }).haptic).toBeUndefined();
    expect(normalizeConfig(one).density).toBe("default");
    expect(normalizeConfig({ ...one, density: "compact" }).density).toBe("compact");
  });
});

describe("presets", () => {
  it("has the new looks", () => {
    for (const p of ["neumorphic", "ha-tile", "mushroom", "bubble", "fluent", "material-you"]) {
      expect(PRESET_NAMES).toContain(p);
      expect(normalizeConfig({ preset: p, tabs: [{ card: {} }] }).preset).toBe(p);
    }
  });

  it("bubble fills the selected tab solidly", () => {
    expect(presetValues("bubble" as any).styles["--tabdeck-indicator-color"]).toContain("--tabdeck-accent");
  });
});

describe("card wiring", () => {
  it("theme colour names resolve like HA's", async () => {
    const el = await mount({ tabs: [{ name: "A", accent: "red", color: "light-blue", badge_color: "#123456", card: { type: "a" } }] });
    const item = bar(el).items[0];
    expect(item.accent).toBe("var(--red-color, red)");
    expect(item.color).toBe("var(--light-blue-color)");
    expect(item.badgeColor).toBe("#123456");
  });

  it("passes picture, icon animation and fonts to the bar", async () => {
    const el = await mount(
      {
        tabs: [
          { name: "Alex", picture: "person.alex", icon_animation: "pulse", font_size: 16, font_weight: 600, card: { type: "a" } },
          { name: "Url", picture: "/local/x.png", card: { type: "b" } },
        ],
      },
      { states: { "person.alex": { state: "home", attributes: { entity_picture: "/api/image/alex.jpg" } } } },
    );
    const [a, b] = bar(el).items;
    expect(a.picture).toBe("/api/image/alex.jpg");
    expect(a.iconAnimation).toBe("pulse");
    expect(a.font).toEqual({ size: "16px", weight: "600", family: undefined });
    expect(b.picture).toBe("/local/x.png");
  });

  it("density reaches the bar", async () => {
    const el = await mount({ density: "compact", tabs: [{ name: "A", card: { type: "a" } }] });
    expect(bar(el).getAttribute("density")).toBe("compact");
  });

  it("haptic fires on a tab switch the person makes, not on automatic ones", async () => {
    const events: string[] = [];
    const listener = (e: Event) => events.push((e as CustomEvent).detail);
    window.addEventListener("haptic", listener);
    try {
      const el = await mount({ haptic: "light", tabs: [{ name: "A", card: { type: "a" } }, { name: "B", card: { type: "b" } }] });
      bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
      await settle(el);
      expect(events).toEqual(["light"]);
      el._selectIndex(0, false);
      expect(events).toEqual(["light"]);
    } finally {
      window.removeEventListener("haptic", listener);
    }
  });
});

describe("tab component", () => {
  async function tab(props: Record<string, any>) {
    await import("./components/tabdeck-tab");
    const el = document.createElement("tabdeck-tab") as any;
    Object.assign(el, props);
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it("shows a round picture instead of the icon", async () => {
    const el = await tab({ label: "Alex", icon: "mdi:account", picture: "/api/image/alex.jpg" });
    const img = el.shadowRoot.querySelector("img.picture") as HTMLImageElement;
    expect(img.getAttribute("src")).toBe("/api/image/alex.jpg");
    expect(img.getAttribute("alt")).toBe("");
    expect(el.shadowRoot.querySelector("ha-icon")).toBeNull();
  });

  it("reflects the icon animation", async () => {
    const el = await tab({ label: "Fan", icon: "mdi:fan", iconAnimation: "spin" });
    expect(el.getAttribute("icon-animation")).toBe("spin");
  });

  it("applies per-tab fonts as variables", async () => {
    const el = await tab({ label: "A", font: { size: "16px", weight: "600", family: "Georgia" } });
    expect(el.style.getPropertyValue("--tabdeck-tab-font-size")).toBe("16px");
    expect(el.style.getPropertyValue("--tabdeck-tab-font-weight")).toBe("600");
    expect(el.style.getPropertyValue("--tabdeck-tab-font-family")).toBe("Georgia");
  });

  it("picks readable badge text on a solid badge colour", async () => {
    const spy = vi.spyOn(window, "getComputedStyle").mockImplementation(
      () => ({ backgroundColor: "rgb(255, 235, 59)" }) as any,
    );
    try {
      const el = await tab({ label: "A", badge: "3", badgeColor: "#ffeb3b" });
      await el.updateComplete;
      expect((el.shadowRoot.querySelector(".badge") as HTMLElement).style.color).toBe("rgb(0, 0, 0)");
    } finally {
      spy.mockRestore();
    }
  });
});
