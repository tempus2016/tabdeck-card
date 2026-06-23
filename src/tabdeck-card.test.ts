import { describe, it, expect, beforeAll } from "vitest";

beforeAll(() => {
  (window as any).loadCardHelpers = async () => ({
    createCardElement: (config: any) => {
      const el = document.createElement("div") as any;
      el.setAttribute("data-type", config.type ?? "");
      el.getCardSize = () => 3;
      return el;
    },
  });
  if (!customElements.get("ha-icon")) {
    customElements.define("ha-icon", class extends HTMLElement {});
  }
});

async function mount(raw: any) {
  await import("./tabdeck-card");
  const el = document.createElement("tabdeck-card") as any;
  el.setConfig(raw);
  document.body.appendChild(el);
  el.hass = { states: {} };
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return el;
}

describe("tabdeck-card", () => {
  it("throws on a config with no tabs", async () => {
    await import("./tabdeck-card");
    const el = document.createElement("tabdeck-card") as any;
    expect(() => el.setConfig({ tabs: [] })).toThrow();
  });

  it("renders a tab bar and mounts every tab card (keep-alive)", async () => {
    const el = await mount({
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", card: { type: "light" } },
      ],
    });
    expect(el.shadowRoot.querySelector("tabdeck-tabbar")).toBeTruthy();
    const cards = el.shadowRoot.querySelectorAll("[data-type]");
    expect(cards).toHaveLength(2);
  });

  it("switches the active panel on tabdeck-select", async () => {
    const el = await mount({
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", card: { type: "light" } },
      ],
    });
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(
        new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }),
      );
    await el.updateComplete;
    const panels = el.shadowRoot.querySelectorAll(".panel");
    expect(panels[0].hasAttribute("hidden")).toBe(true);
    expect(panels[1].hasAttribute("hidden")).toBe(false);
  });

  it("hides a tab whose visibility conditions are unmet", async () => {
    const el = await mount({
      tabs: [
        { name: "A", card: { type: "markdown" } },
        {
          name: "B",
          card: { type: "light" },
          visibility: [{ condition: "state", entity: "input_boolean.x", state: "on" }],
        },
      ],
    });
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar.items).toHaveLength(1);
    expect(bar.items[0].name).toBe("A");
  });

  it("getCardSize delegates to the active card", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    expect(el.getCardSize()).toBe(3);
  });

  it("getStubConfig returns a valid one-tab config", async () => {
    const mod: any = await import("./tabdeck-card");
    const stub = mod.TabdeckCard.getStubConfig();
    expect(stub.tabs.length).toBeGreaterThanOrEqual(1);
  });
});
