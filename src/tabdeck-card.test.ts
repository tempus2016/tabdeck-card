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

  it("applies the styles map as custom properties on the host", async () => {
    const el = await mount({
      styles: { "--tabdeck-accent": "#9c27b0", "--tabdeck-tab-height": "60px" },
      tabs: [{ name: "A", card: { type: "markdown" } }],
    });
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("#9c27b0");
    expect(el.style.getPropertyValue("--tabdeck-tab-height")).toBe("60px");
  });

  it("hides inactive badges when hide_inactive_badge is on", async () => {
    const el = await mount({
      hide_inactive_badge: true,
      tabs: [
        { name: "A", badge: "0", card: { type: "markdown" } },
        { name: "B", badge: "3", card: { type: "light" } },
      ],
    });
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar.items[0].badge).toBeUndefined(); // "0" is inactive -> hidden
    expect(bar.items[1].badge).toBe("3");
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

  it("registers itself in window.customCards", async () => {
    await import("./tabdeck-card");
    const entry = (window as any).customCards.find((c: any) => c.type === "tabdeck-card");
    expect(entry).toBeTruthy();
    expect(entry.preview).toBe(true);
  });
});

// A hass with a controllable render_template subscription, so tests can push
// rendered values synchronously.
function hassWithTemplates() {
  const subs: any[] = [];
  const hass = {
    states: {},
    connection: {
      subscribeMessage: (cb: any, msg: any) => {
        subs.push({ cb, template: msg.template });
        return Promise.resolve(() => {});
      },
    },
  };
  const push = (match: string, message: any) => {
    for (const s of subs) if (s.template.includes(match)) s.cb(message);
  };
  return { hass, subs, push };
}

async function mountWith(raw: any, hass: any) {
  await import("./tabdeck-card");
  const el = document.createElement("tabdeck-card") as any;
  el.setConfig(raw);
  document.body.appendChild(el);
  el.hass = hass;
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return el;
}

describe("tabdeck-card templates", () => {
  it("renders a badge from a template once it resolves", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      { tabs: [{ name: "A", badge: "{{ states('sensor.x') }}", card: { type: "markdown" } }] },
      hass,
    );
    const bar = () => el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar().items[0].badge).toBeUndefined();
    push("sensor.x", { result: "7" });
    await el.updateComplete;
    expect(bar().items[0].badge).toBe("7");
  });

  it("hides a tab with a template condition until it renders true", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        tabs: [
          { name: "A", card: { type: "markdown" } },
          {
            name: "B",
            card: { type: "light" },
            visibility: [{ condition: "template", value_template: "{{ is_state('x.y','on') }}" }],
          },
        ],
      },
      hass,
    );
    const bar = () => el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar().items).toHaveLength(1);
    expect(bar().items[0].name).toBe("A");
    push("x.y", { result: "on" });
    await el.updateComplete;
    expect(bar().items).toHaveLength(2);
  });

  it("treats a template error as fail-closed for visibility", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        tabs: [
          { name: "A", card: { type: "markdown" } },
          {
            name: "B",
            card: { type: "light" },
            visibility: [{ condition: "template", value_template: "{{ broken " }],
          },
        ],
      },
      hass,
    );
    const bar = () => el.shadowRoot.querySelector("tabdeck-tabbar");
    push("broken", { result: "on" });
    await el.updateComplete;
    expect(bar().items).toHaveLength(2);
    push("broken", { error: "TemplateError: bad" });
    await el.updateComplete;
    expect(bar().items).toHaveLength(1);
  });
});

// Fire a synthetic swipe on the content host. dx<0 swipes left (=> next tab).
function swipe(el: any, dx: number, dy = 5, dt = 200) {
  const content = el.shadowRoot.querySelector(".content");
  const startX = 200;
  const start = new Event("touchstart", { bubbles: true }) as any;
  start.touches = [{ clientX: startX, clientY: 100 }];
  Object.defineProperty(start, "timeStamp", { value: 1000 });
  content.dispatchEvent(start);
  const end = new Event("touchend", { bubbles: true }) as any;
  end.changedTouches = [{ clientX: startX + dx, clientY: 100 + dy }];
  Object.defineProperty(end, "timeStamp", { value: 1000 + dt });
  content.dispatchEvent(end);
}

describe("tabdeck-card swipe", () => {
  const three = () => ({
    swipe: true,
    tabs: [
      { name: "A", card: { type: "markdown" } },
      { name: "B", card: { type: "light" } },
      { name: "C", card: { type: "markdown" } },
    ],
  });
  const selected = (el: any) =>
    el.shadowRoot.querySelector("tabdeck-tabbar").selected;

  it("advances to the next tab on a leftward swipe", async () => {
    const el = await mount(three());
    expect(selected(el)).toBe(0);
    swipe(el, -120);
    await el.updateComplete;
    expect(selected(el)).toBe(1);
  });

  it("goes to the previous tab on a rightward swipe", async () => {
    const el = await mount(three());
    swipe(el, -120);
    await el.updateComplete;
    expect(selected(el)).toBe(1);
    swipe(el, 120);
    await el.updateComplete;
    expect(selected(el)).toBe(0);
  });

  it("clamps at the first and last tabs (no wrap)", async () => {
    const el = await mount(three());
    swipe(el, 120); // already at first; rightward => prev
    await el.updateComplete;
    expect(selected(el)).toBe(0);
    swipe(el, -120);
    swipe(el, -120);
    swipe(el, -120); // try to go past the last
    await el.updateComplete;
    expect(selected(el)).toBe(2);
  });

  it("does nothing when swipe is disabled (default)", async () => {
    const el = await mount({
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", card: { type: "light" } },
      ],
    });
    swipe(el, -120);
    await el.updateComplete;
    expect(selected(el)).toBe(0);
  });

  it("ignores a mostly-vertical drag", async () => {
    const el = await mount(three());
    swipe(el, -120, 400);
    await el.updateComplete;
    expect(selected(el)).toBe(0);
  });
});
