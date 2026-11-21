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
  it("fades an overflowing bar unless bar_fade is false", async () => {
    const tabs = [{ name: "A", card: { type: "tile" } }, { name: "B", card: { type: "tile" } }];
    const on = await mount({ tabs });
    expect(on._config.bar_fade).toBe(true);
    expect(on.shadowRoot.querySelector("tabdeck-tabbar").fade).toBe(true);
    const off = await mount({ tabs, bar_fade: false });
    expect(off.shadowRoot.querySelector("tabdeck-tabbar").fade).toBe(false);
  });

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

  it("unmount_hidden renders only the active panel's card", async () => {
    const el = await mount({
      unmount_hidden: true,
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", card: { type: "light" } },
      ],
    });
    // only one card element in the DOM (the active one)
    expect(el.shadowRoot.querySelectorAll("[data-type]")).toHaveLength(1);
    expect(el.shadowRoot.querySelector("[data-type]").getAttribute("data-type")).toBe("markdown");
  });

  it("renders a content header with the active tab title when header is on", async () => {
    const el = await mount({
      header: true,
      tabs: [
        { name: "Climate", subtitle: "3 zones", card: { type: "markdown" } },
        { name: "Lights", card: { type: "light" } },
      ],
    });
    expect(el.shadowRoot.querySelector(".content-title")?.textContent).toContain("Climate");
    expect(el.shadowRoot.querySelector(".content-subtitle")?.textContent).toContain("3 zones");
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".content-title")?.textContent).toContain("Lights");
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

  it("starts on the tab whose default_if conditions are met", async () => {
    const hass = { states: { "input_boolean.guest": { state: "on" } } };
    const el = await mountWith(
      {
        tabs: [
          { name: "Home", card: { type: "markdown" } },
          {
            name: "Guest",
            card: { type: "light" },
            default_if: [{ condition: "state", entity: "input_boolean.guest", state: "on" }],
          },
        ],
      },
      hass,
    );
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(1);
  });

  it("falls back to default_tab when no default_if matches", async () => {
    const hass = { states: { "input_boolean.guest": { state: "off" } } };
    const el = await mountWith(
      {
        default_tab: 0,
        tabs: [
          { name: "Home", card: { type: "markdown" } },
          {
            name: "Guest",
            card: { type: "light" },
            default_if: [{ condition: "state", entity: "input_boolean.guest", state: "on" }],
          },
        ],
      },
      hass,
    );
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(0);
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

  it("getCardSize uses a per-tab card_size hint when set", async () => {
    const el = await mount({ tabs: [{ name: "A", card_size: 8, card: { type: "markdown" } }] });
    expect(el.getCardSize()).toBe(8);
  });

  it("auto-selects a tab when its entity enters the target state", async () => {
    const el = await mount({
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", card: { type: "light" }, auto_select: { entity: "input_boolean.x", state: "on" } },
      ],
    });
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(0);
    el.hass = { states: { "input_boolean.x": { state: "on" } } };
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(1);
  });

  it("does not auto-select on initial load (seed only)", async () => {
    const el = await mountWith(
      {
        tabs: [
          { name: "A", card: { type: "markdown" } },
          { name: "B", card: { type: "light" }, auto_select: { entity: "input_boolean.x", state: "on" } },
        ],
      },
      { states: { "input_boolean.x": { state: "on" } } },
    );
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(0);
  });

  it("remember:entity writes the selected index via a service call", async () => {
    const calls: any[] = [];
    const hass = {
      states: { "input_number.tab": { state: "0" } },
      callService: (d: string, s: string, data: any) => calls.push({ d, s, data }),
    };
    const el = await mountWith(
      {
        remember: "entity",
        remember_entity: "input_number.tab",
        tabs: [{ name: "A", card: { type: "markdown" } }, { name: "B", card: { type: "light" } }],
      },
      hass,
    );
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    await el.updateComplete;
    expect(calls.at(-1)).toEqual({ d: "input_number", s: "set_value", data: { entity_id: "input_number.tab", value: 1 } });
  });

  it("remember:entity restores the initial tab from the entity state", async () => {
    const hass = { states: { "input_number.tab": { state: "1" } }, callService: () => {} };
    const el = await mountWith(
      {
        remember: "entity",
        remember_entity: "input_number.tab",
        tabs: [{ name: "A", card: { type: "markdown" } }, { name: "B", card: { type: "light" } }],
      },
      hass,
    );
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(1);
  });

  it("fires badge_action (not select) when a badge is clicked", async () => {
    const events: any[] = [];
    const hass = { states: { "sun.sun": { state: "above_horizon" } } };
    const el = await mountWith(
      {
        tabs: [
          { name: "A", badge: "3", badge_action: { action: "more-info", entity: "sun.sun" }, card: { type: "markdown" } },
          { name: "B", card: { type: "light" } },
        ],
      },
      hass,
    );
    document.addEventListener("hass-more-info", (e: any) => events.push(e.detail?.entityId), true);
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    bar.dispatchEvent(new CustomEvent("tabdeck-action", { detail: { index: 0, kind: "badge" }, bubbles: true, composed: true }));
    expect(events.at(-1)).toBe("sun.sun");
  });

  it("fires double_tap_action on a double tap of the tab", async () => {
    const events: any[] = [];
    const hass = { states: { "sun.sun": { state: "above_horizon" } } };
    const el = await mountWith(
      {
        tabs: [
          { name: "A", double_tap_action: { action: "more-info", entity: "sun.sun" }, card: { type: "markdown" } },
          { name: "B", card: { type: "light" } },
        ],
      },
      hass,
    );
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[0].doubleTap).toBe(true);
    document.addEventListener("hass-more-info", (e: any) => events.push(e.detail?.entityId), true);
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    bar.dispatchEvent(new CustomEvent("tabdeck-action", { detail: { index: 0, kind: "double_tap" }, bubbles: true, composed: true }));
    expect(events.at(-1)).toBe("sun.sun");
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

  it("renders a tab's tooltip from a template", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        tabs: [
          { name: "A", tooltip: "{{ states('sensor.lights') }} lights on", card: { type: "markdown" } },
          { name: "B", tooltip: "Plain words", card: { type: "markdown" } },
        ],
      },
      hass,
    );
    const bar = () => el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar().items[1].tooltip).toBe("Plain words");
    push("sensor.lights", { result: "2 lights on" });
    await el.updateComplete;
    expect(bar().items[0].tooltip).toBe("2 lights on");
  });

  it("resubscribes when moved in the DOM, without waiting for a new hass", async () => {
    const { hass, subs } = hassWithTemplates();
    const el = await mountWith(
      { tabs: [{ name: "A", badge: "{{ 2 + 3 }}", card: { type: "markdown" } }] },
      hass,
    );
    el.remove();
    document.body.appendChild(el);
    expect(subs).toHaveLength(2);
    subs[1].cb({ result: 5 });
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[0].badge).toBe("5");
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

  it("appends generated tabs after static ones once the template resolves", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        tabs: [{ name: "Overview", card: { type: "markdown" } }],
        auto_tabs: {
          template: "{{ states.camera | map(attribute='entity_id') | list }}",
          tab_template: { name: "{{ item }}", card: { type: "picture-entity", entity: "{{ item }}" } },
        },
      },
      hass,
    );
    const bar = () => el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar().items).toHaveLength(1);
    push("states.camera", { result: ["camera.a", "camera.b"] });
    await el.updateComplete;
    expect(bar().items.map((i: any) => i.name)).toEqual(["Overview", "camera.a", "camera.b"]);
    expect(el.shadowRoot.querySelectorAll("[data-type]")).toHaveLength(3);
  });

  it("renders generated-only decks (no static tabs) with a placeholder until ready", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        auto_tabs: {
          template: "{{ ['light.a','light.b'] }}",
          tab_template: { name: "{{ item }}", card: { type: "light", entity: "{{ item }}" } },
        },
      },
      hass,
    );
    expect(el.shadowRoot.querySelector(".empty")).toBeTruthy();
    push("light.a", { result: ["light.a", "light.b"] });
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".empty")).toBeFalsy();
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items).toHaveLength(2);
  });

  it("preserves the selected generated tab by name across a live re-render", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        auto_tabs: {
          template: "{{ x }}",
          tab_template: { name: "{{ item }}", card: { type: "light", entity: "{{ item }}" } },
        },
      },
      hass,
    );
    push("x", { result: ["a", "b", "c"] });
    await el.updateComplete;
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 2 }, bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(2);
    push("x", { result: ["z", "a", "b", "c"] });
    await el.updateComplete;
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar.items.map((i: any) => i.name)).toEqual(["z", "a", "b", "c"]);
    expect(bar.items[bar.selected].name).toBe("c");
  });

  it("ignores a non-list template result (stays empty)", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        auto_tabs: { template: "{{ x }}", tab_template: { name: "{{ item }}", card: {} } },
      },
      hass,
    );
    push("x", { result: "not-a-list" });
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".empty")).toBeTruthy();
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

  it("wraps from first to last on a rightward swipe when swipe_wrap is on", async () => {
    const el = await mount({ ...three(), swipe_wrap: true });
    expect(selected(el)).toBe(0);
    swipe(el, 120); // rightward at first -> prev -> wraps to last
    await el.updateComplete;
    expect(selected(el)).toBe(2);
    swipe(el, -120); // leftward at last -> next -> wraps to first
    await el.updateComplete;
    expect(selected(el)).toBe(0);
  });

  it("changes tabs on a mouse drag when swipe_mouse is on", async () => {
    const el = await mount({ ...three(), swipe: false, swipe_mouse: true });
    const content = el.shadowRoot.querySelector(".content");
    const down = new Event("pointerdown", { bubbles: true }) as any;
    Object.assign(down, { clientX: 200, clientY: 100, pointerType: "mouse" });
    Object.defineProperty(down, "timeStamp", { value: 1000 });
    content.dispatchEvent(down);
    const up = new Event("pointerup", { bubbles: true }) as any;
    Object.assign(up, { clientX: 80, clientY: 105, pointerType: "mouse" });
    Object.defineProperty(up, "timeStamp", { value: 1200 });
    content.dispatchEvent(up);
    await el.updateComplete;
    expect(selected(el)).toBe(1);
  });

  it("ignores a touch pointer for mouse swipe (no double-handling)", async () => {
    const el = await mount({ ...three(), swipe: false, swipe_mouse: true });
    const content = el.shadowRoot.querySelector(".content");
    const down = new Event("pointerdown", { bubbles: true }) as any;
    Object.assign(down, { clientX: 200, clientY: 100, pointerType: "touch" });
    Object.defineProperty(down, "timeStamp", { value: 1000 });
    content.dispatchEvent(down);
    const up = new Event("pointerup", { bubbles: true }) as any;
    Object.assign(up, { clientX: 80, clientY: 105, pointerType: "touch" });
    Object.defineProperty(up, "timeStamp", { value: 1200 });
    content.dispatchEvent(up);
    await el.updateComplete;
    expect(selected(el)).toBe(0);
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

describe("remember:entity live sync", () => {
  const cfg = {
    remember: "entity",
    remember_entity: "input_number.tab",
    tabs: [
      { name: "A", card: { type: "markdown" } },
      { name: "B", card: { type: "light" } },
      { name: "C", card: { type: "light" } },
    ],
  };

  it("switches tab when the entity changes externally", async () => {
    const calls: any[] = [];
    const callService = (d: string, s: string, data: any) => calls.push({ d, s, data });
    const el = await mountWith(cfg, { states: { "input_number.tab": { state: "0" } }, callService });
    el.hass = { states: { "input_number.tab": { state: "2.0" } }, callService };
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(2);
    // An externally-driven switch must not echo a write back to the entity.
    expect(calls).toHaveLength(0);
  });

  it("ignores hass updates where the entity value is unchanged", async () => {
    const callService = () => {};
    const el = await mountWith(cfg, { states: { "input_number.tab": { state: "0" } }, callService });
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    await el.updateComplete;
    // Entity hasn't caught up yet (still 0) — a routine hass tick must not yank
    // the user back to tab 0.
    el.hass = { states: { "input_number.tab": { state: "0" } }, callService };
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(1);
  });

  it("ignores out-of-range entity values", async () => {
    const callService = () => {};
    const el = await mountWith(cfg, { states: { "input_number.tab": { state: "1" } }, callService });
    el.hass = { states: { "input_number.tab": { state: "9" } }, callService };
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(1);
  });
});

describe("remember:entity echo guard", () => {
  it("does not bounce back on an echo of an earlier write", async () => {
    const callService = () => {};
    const el = await mountWith(
      {
        remember: "entity",
        remember_entity: "input_number.tab",
        tabs: [
          { name: "A", card: { type: "markdown" } },
          { name: "B", card: { type: "light" } },
          { name: "C", card: { type: "light" } },
        ],
      },
      { states: { "input_number.tab": { state: "0" } }, callService },
    );
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    bar.dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    bar.dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 2 }, bubbles: true, composed: true }));
    // The first write (1) lands after the user has already moved to 2.
    el.hass = { states: { "input_number.tab": { state: "1" } }, callService };
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(2);
  });
});

describe("templated tab fields", () => {
  it("renders icon, name, subtitle, color and accent from templates", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        header: true,
        tabs: [
          {
            name: "{{ 'Garage ' ~ states('cover.g') }}",
            subtitle: "{{ 'sub:' ~ states('cover.g') }}",
            icon: "{{ 'mdi:garage-open' if is_state('cover.g','open') else 'mdi:garage' }}",
            color: "{{ 'red' if is_state('cover.g','open') else '' }}",
            accent: "{{ 'orange' }}",
            card: { type: "markdown" },
          },
        ],
      },
      hass,
    );
    const item = () => el.shadowRoot.querySelector("tabdeck-tabbar").items[0];
    expect(item().icon).toBeUndefined();
    push("'Garage '", { result: "Garage open" });
    push("'sub:'", { result: "sub:open" });
    push("mdi:garage-open", { result: "mdi:garage-open" });
    push("'red'", { result: "red" });
    push("'orange'", { result: "orange" });
    await el.updateComplete;
    expect(item()).toMatchObject({
      name: "Garage open",
      subtitle: "sub:open",
      icon: "mdi:garage-open",
      // Theme colour names resolve as HA's own cards do.
      color: "var(--red-color, red)",
      accent: "var(--orange-color, orange)",
    });
    expect(el.shadowRoot.querySelector(".content-title").textContent).toContain("Garage open");
  });

  it("treats an empty template result as unset", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      { tabs: [{ name: "A", color: "{{ '' }}", card: { type: "markdown" } }] },
      hass,
    );
    push("''", { result: "" });
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[0].color).toBeUndefined();
  });

  it("leaves plain strings untouched and subscribes nothing", async () => {
    const { hass, subs } = hassWithTemplates();
    const el = await mountWith(
      { tabs: [{ name: "A", icon: "mdi:home", card: { type: "markdown" } }] },
      hass,
    );
    expect(subs).toHaveLength(0);
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[0].icon).toBe("mdi:home");
  });
});

describe("badge_format", () => {
  const hass = { states: { "sensor.t": { state: "21.456" }, "sensor.n": { state: "150" }, "sensor.z": { state: "0.0" } } };
  it("formats per tab, with a global default", async () => {
    const el = await mountWith(
      {
        badge_format: { max: 99 },
        tabs: [
          { name: "T", badge: "sensor.t", badge_format: { precision: 1, unit: "°" }, card: { type: "markdown" } },
          { name: "N", badge: "sensor.n", card: { type: "markdown" } },
        ],
      },
      hass,
    );
    const items = el.shadowRoot.querySelector("tabdeck-tabbar").items;
    expect(items[0].badge).toBe("21.5°");
    expect(items[1].badge).toBe("99+");
  });

  it("hide_inactive_badge treats numeric zero (0.0) as inactive", async () => {
    const el = await mountWith(
      {
        hide_inactive_badge: true,
        tabs: [{ name: "Z", badge: "sensor.z", badge_format: { unit: " W" }, card: { type: "markdown" } }],
      },
      hass,
    );
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[0].badge).toBeUndefined();
  });
});

describe("alert pulse", () => {
  const cfg = {
    tabs: [
      { name: "A", card: { type: "markdown" } },
      {
        name: "Door",
        alert: [{ condition: "state", entity: "binary_sensor.door", state: "on" }],
        card: { type: "light" },
      },
    ],
  };
  it("flags a tab as alerting while its conditions are met", async () => {
    const el = await mountWith(cfg, { states: { "binary_sensor.door": { state: "off" } } });
    const items = () => el.shadowRoot.querySelector("tabdeck-tabbar").items;
    expect(items()[1].alert).toBe(false);
    el.hass = { states: { "binary_sensor.door": { state: "on" } } };
    await el.updateComplete;
    expect(items()[1].alert).toBe(true);
    expect(items()[0].alert).toBe(false);
  });

  it("supports template conditions (e.g. open for 5 minutes)", async () => {
    const { hass, push } = hassWithTemplates();
    const el = await mountWith(
      {
        tabs: [
          {
            name: "Door",
            alert: [{ condition: "template", value_template: "{{ door_open_5min }}" }],
            card: { type: "light" },
          },
        ],
      },
      hass,
    );
    push("door_open_5min", { result: true });
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[0].alert).toBe(true);
  });
});

describe("auto_rotate & idle_return", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" }, disabled: true },
    { name: "C", card: { type: "light" } },
  ];
  const sel = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar").selected;

  it("rotates through enabled tabs every interval", async () => {
    const el = await mount({ auto_rotate: 10, tabs });
    const t0 = el._lastInteraction;
    el._tick(t0 + 9_000);
    expect(el._selected).toBe(0);
    el._tick(t0 + 10_000);
    await el.updateComplete;
    expect(sel(el)).toBe(2); // skips disabled B
    el._tick(t0 + 20_000);
    await el.updateComplete;
    expect(sel(el)).toBe(0); // wraps
  });

  it("pauses rotation after interaction until resume_after", async () => {
    const el = await mount({ auto_rotate: { interval: 10, resume_after: 60 }, tabs });
    const t0 = Date.now();
    el._noteInteraction(t0);
    el._tick(t0 + 30_000);
    expect(el._selected).toBe(0);
    el._tick(t0 + 60_000);
    expect(el._selected).toBe(2);
  });

  it("does not persist rotated selections", async () => {
    const store: Record<string, string> = {};
    const orig = globalThis.localStorage.setItem;
    globalThis.localStorage.setItem = (k: string, v: string) => void (store[k] = v);
    try {
      const el = await mount({ auto_rotate: 10, remember: "browser", tabs });
      el._tick(el._lastInteraction + 10_000);
      expect(el._selected).toBe(2);
      expect(Object.keys(store)).toHaveLength(0);
    } finally {
      globalThis.localStorage.setItem = orig;
    }
  });

  it("idle_return goes back to the default tab after inactivity", async () => {
    const el = await mount({ idle_return: 30, default_tab: 0, tabs });
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 2 }, bubbles: true, composed: true }));
    const t0 = Date.now();
    el._noteInteraction(t0);
    el._tick(t0 + 29_000);
    expect(el._selected).toBe(2);
    el._tick(t0 + 30_000);
    await el.updateComplete;
    expect(sel(el)).toBe(0);
  });

  it("records interaction from pointer events on the card", async () => {
    const el = await mount({ idle_return: 30, tabs });
    el._lastInteraction = 0;
    el.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    expect(el._lastInteraction).toBeGreaterThan(0);
  });

  it("clears its timer when disconnected", async () => {
    const el = await mount({ auto_rotate: 10, tabs });
    expect(el._timer).toBeDefined();
    el.remove();
    expect(el._timer).toBeUndefined();
  });
});

describe("tap_action (navigation tabs)", () => {
  const cfg = () => ({
    swipe: true,
    tabs: [
      { name: "A", card: { type: "markdown" } },
      { name: "Energy", tap_action: { action: "navigate", navigation_path: "/energy" } },
      { name: "B", card: { type: "light" } },
    ],
  });

  it("runs the action instead of selecting the tab", async () => {
    const el = await mount(cfg());
    const nav: string[] = [];
    const onNav = () => nav.push(location.pathname);
    window.addEventListener("location-changed", onNav);
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    await el.updateComplete;
    window.removeEventListener("location-changed", onNav);
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(0);
    expect(nav).toEqual(["/energy"]);
    history.replaceState(null, "", "/");
  });

  it("builds no card for an action tab without a card", async () => {
    const el = await mount(cfg());
    expect(el.shadowRoot.querySelectorAll("[data-type]")).toHaveLength(2);
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[1].action).toBe(true);
  });

  it("swipe skips action tabs", async () => {
    const el = await mount(cfg());
    swipe(el, -120);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(2);
  });

  it("never starts on an action tab", async () => {
    const el = await mount({ ...cfg(), default_tab: 1 });
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(0);
  });

  it("auto_rotate skips action tabs", async () => {
    const el = await mount({ ...cfg(), auto_rotate: 10 });
    el._tick(el._lastInteraction + 10_000);
    expect(el._selected).toBe(2);
  });
});

describe("scroll_spy", () => {
  const cfg = () => ({
    scroll_spy: true,
    remember: "browser",
    storage_key: "spy-test",
    tabs: [
      { name: "A", card: { type: "markdown" } },
      { name: "B", card: { type: "light" } },
      { name: "C", card: { type: "markdown" } },
    ],
  });

  it("renders every panel (none hidden) and pins the bar", async () => {
    const el = await mount(cfg());
    const panels = el.shadowRoot.querySelectorAll(".panel");
    expect(panels).toHaveLength(3);
    for (const p of panels) expect(p.hasAttribute("hidden")).toBe(false);
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").sticky).toBe(true);
  });

  it("scrolls the chosen section into view on select", async () => {
    const el = await mount(cfg());
    const calls: any[] = [];
    const orig = (Element.prototype as any).scrollIntoView;
    (Element.prototype as any).scrollIntoView = function (opts: any) {
      calls.push({ index: this.dataset?.index, opts });
    };
    try {
      el.shadowRoot
        .querySelector("tabdeck-tabbar")
        .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 2 }, bubbles: true, composed: true }));
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));
      expect(calls.at(-1).index).toBe("2");
      expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(2);
    } finally {
      (Element.prototype as any).scrollIntoView = orig;
    }
  });

  it("follows the topmost section in view, without persisting", async () => {
    localStorage.removeItem("tabdeck-card:spy-test");
    const el = await mount(cfg());
    const panels = el.shadowRoot.querySelectorAll(".panel");
    el._onSpyEntries([
      { target: panels[1], isIntersecting: true },
      { target: panels[2], isIntersecting: true },
    ]);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(1);
    expect(localStorage.getItem("tabdeck-card:spy-test")).toBeNull();
  });

  it("ignores spy updates while a programmatic scroll is in flight", async () => {
    const el = await mount(cfg());
    (Element.prototype as any).scrollIntoView ??= () => {};
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 2 }, bubbles: true, composed: true }));
    await el.updateComplete;
    const panels = el.shadowRoot.querySelectorAll(".panel");
    el._onSpyEntries([{ target: panels[0], isIntersecting: true }]);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(2);
  });

  it("shows a title per section when header is on", async () => {
    const el = await mount({ ...cfg(), header: true });
    const titles = [...el.shadowRoot.querySelectorAll(".section-title")].map((t: any) => t.textContent.trim());
    expect(titles).toEqual(["A", "B", "C"]);
    expect(el.shadowRoot.querySelector(".content-header")).toBeNull();
  });
});

describe("scroll_spy with swipe", () => {
  it("scrolls to the section a swipe selects", async () => {
    const el = await mount({
      scroll_spy: true,
      swipe: true,
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", card: { type: "light" } },
      ],
    });
    const calls: string[] = [];
    const orig = (Element.prototype as any).scrollIntoView;
    (Element.prototype as any).scrollIntoView = function () {
      calls.push(this.dataset?.index);
    };
    try {
      swipe(el, -120);
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));
      expect(calls).toEqual(["1"]);
    } finally {
      (Element.prototype as any).scrollIntoView = orig;
    }
  });
});

describe("scroll_spy reconnect", () => {
  it("rebuilds its observer after the card is moved in the DOM", async () => {
    const observed: Element[] = [];
    const Orig = (globalThis as any).IntersectionObserver;
    (globalThis as any).IntersectionObserver = class {
      observe(e: Element) { observed.push(e); }
      disconnect() {}
    };
    try {
      const el = await mount({
        scroll_spy: true,
        tabs: [{ name: "A", card: { type: "markdown" } }, { name: "B", card: { type: "light" } }],
      });
      expect(observed).toHaveLength(2);
      const parent = el.parentNode;
      el.remove();
      parent.appendChild(el);
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));
      expect(observed).toHaveLength(4);
      expect(el._spyObserver).toBeDefined();
    } finally {
      (globalThis as any).IntersectionObserver = Orig;
    }
  });
});

describe("enter_action / leave_action", () => {
  it("fires leave on the old tab and enter on the new one", async () => {
    const fired: string[] = [];
    const hass = {
      states: {},
      callService: (d: string, s: string, data: any) => fired.push(`${d}.${s}:${data.entity_id}`),
    };
    const el = await mountWith(
      {
        tabs: [
          {
            name: "A",
            leave_action: { action: "call-service", service: "script.turn_on", service_data: { entity_id: "script.leave_a" } },
            card: { type: "markdown" },
          },
          {
            name: "Cams",
            enter_action: { action: "call-service", service: "script.turn_on", service_data: { entity_id: "script.start_stream" } },
            card: { type: "light" },
          },
        ],
      },
      hass,
    );
    expect(fired).toEqual([]); // nothing on initial load
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    bar.dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    expect(fired).toEqual(["script.turn_on:script.leave_a", "script.turn_on:script.start_stream"]);
    // Re-selecting the same tab fires nothing.
    bar.dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    expect(fired).toHaveLength(2);
  });
});

describe("perform-action support", () => {
  it("runs modern perform-action actions (as produced by HA's action picker)", async () => {
    const calls: any[] = [];
    const hass = { states: {}, callService: (...a: any[]) => calls.push(a) };
    const el = await mountWith(
      {
        tabs: [
          { name: "A", card: { type: "markdown" } },
          {
            name: "B",
            enter_action: {
              action: "perform-action",
              perform_action: "light.turn_on",
              target: { entity_id: "light.kitchen" },
              data: { brightness_pct: 50 },
            },
            card: { type: "light" },
          },
        ],
      },
      hass,
    );
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    expect(calls).toEqual([["light", "turn_on", { brightness_pct: 50 }, { entity_id: "light.kitchen" }]]);
  });
});

describe("collapsible", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
  ];
  const select = (el: any, index: number) =>
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index }, bubbles: true, composed: true }));
  const contentHidden = (el: any) => el.shadowRoot.querySelector(".content").hasAttribute("hidden");

  it("tapping the active tab collapses and re-expands the content", async () => {
    const el = await mount({ collapsible: true, tabs });
    expect(contentHidden(el)).toBe(false);
    select(el, 0);
    await el.updateComplete;
    expect(contentHidden(el)).toBe(true);
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").collapsed).toBe(true);
    expect(el.getCardSize()).toBe(1);
    select(el, 0);
    await el.updateComplete;
    expect(contentHidden(el)).toBe(false);
  });

  it("choosing another tab while collapsed expands it", async () => {
    const el = await mount({ collapsible: true, start_collapsed: true, tabs });
    expect(contentHidden(el)).toBe(true);
    select(el, 1);
    await el.updateComplete;
    expect(contentHidden(el)).toBe(false);
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").selected).toBe(1);
  });

  it("does nothing special when collapsible is off", async () => {
    const el = await mount({ tabs });
    select(el, 0);
    await el.updateComplete;
    expect(contentHidden(el)).toBe(false);
  });
});

describe("responsive: split & tab_display_narrow", () => {
  const tabs = [
    { name: "A", icon: "mdi:a", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
    { name: "Nav", tap_action: { action: "navigate", navigation_path: "/x" } },
  ];

  it("shows every content tab side by side when wide enough", async () => {
    const el = await mount({ split: { min_width: 800, columns: 2 }, tabs });
    expect(el.shadowRoot.querySelector(".split")).toBeNull();
    el._width = 1000;
    await el.updateComplete;
    const split = el.shadowRoot.querySelector(".split");
    expect(split).toBeTruthy();
    expect(el.shadowRoot.querySelector("tabdeck-tabbar")).toBeNull();
    const cols = split.querySelectorAll(".split-col");
    expect(cols).toHaveLength(2); // action tab excluded
    expect(cols[0].querySelector(".split-title").textContent).toContain("A");
    expect(split.querySelectorAll("[data-type]")).toHaveLength(2);
    expect(split.style.getPropertyValue("--tabdeck-split-columns")).toBe("2");
  });

  it("falls back to tabs below min_width", async () => {
    const el = await mount({ split: 800, tabs });
    el._width = 600;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".split")).toBeNull();
    expect(el.shadowRoot.querySelector("tabdeck-tabbar")).toBeTruthy();
  });

  it("switches tab_display on narrow cards", async () => {
    const el = await mount({ tab_display: "both", tab_display_narrow: "icon", narrow_width: 400, tabs });
    const bar = () => el.shadowRoot.querySelector("tabdeck-tabbar");
    el._width = 700;
    await el.updateComplete;
    expect(bar().display).toBe("both");
    el._width = 350;
    await el.updateComplete;
    expect(bar().display).toBe("icon");
  });

  it("uses the normal display before the width is known", async () => {
    const el = await mount({ tab_display_narrow: "icon", tabs });
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").display).toBe("both");
  });
});

describe("auto_tabs source: areas", () => {
  it("builds a tab per area with the registry icon", async () => {
    const { hass, push } = hassWithTemplates();
    (hass as any).areas = { kitchen: { area_id: "kitchen", name: "Kitchen", icon: "mdi:stove" } };
    const el = await mountWith({ auto_tabs: { source: "areas" } }, hass);
    push("areas()", {
      result: [
        { id: "kitchen", name: "Kitchen", icon: "mdi:texture-box", entities: ["light.k", "sensor.t"] },
        { id: "den", name: "Den", icon: "mdi:texture-box", entities: ["light.d"] },
      ],
    });
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    const items = el.shadowRoot.querySelector("tabdeck-tabbar").items;
    expect(items.map((i: any) => [i.name, i.icon])).toEqual([
      ["Kitchen", "mdi:stove"],
      ["Den", "mdi:texture-box"],
    ]);
    expect(el.shadowRoot.querySelectorAll('[data-type="entities"]')).toHaveLength(2);
  });
});

describe("per-tab styles", () => {
  it("applies the active tab's styles over the global ones and removes them on switch", async () => {
    const el = await mount({
      styles: { "--tabdeck-accent": "blue", "--x": "1" },
      tabs: [
        { name: "A", styles: { "--tabdeck-accent": "red", "--only-a": "yes" }, card: { type: "markdown" } },
        { name: "B", card: { type: "light" } },
      ],
    });
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("red");
    expect(el.style.getPropertyValue("--only-a")).toBe("yes");
    expect(el.style.getPropertyValue("--x")).toBe("1");
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 }, bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("blue");
    expect(el.style.getPropertyValue("--only-a")).toBe("");
  });
});

describe("edit mode helpers", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    {
      name: "Hidden",
      card: { type: "light" },
      visibility: [{ condition: "state", entity: "input_boolean.guest", state: "on" }],
    },
    { name: "C", card: { type: "light" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");

  it("shows hidden tabs ghosted while the dashboard is in edit mode", async () => {
    const el = await mount({ tabs });
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["A", "C"]);
    el.editMode = true;
    await el.updateComplete;
    const items = bar(el).items;
    expect(items.map((i: any) => i.name)).toEqual(["A", "Hidden", "C"]);
    expect(items.map((i: any) => !!i.ghost)).toEqual([false, true, false]);
    el.editMode = false;
    await el.updateComplete;
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["A", "C"]);
  });

  it("also reveals in the card editor preview", async () => {
    const el = await mount({ tabs });
    el.preview = true;
    await el.updateComplete;
    expect(bar(el).items).toHaveLength(3);
  });

  it("keeps the same tab selected when edit mode toggles", async () => {
    const el = await mount({ tabs });
    bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 } }));
    await el.updateComplete;
    expect(bar(el).items[el._selected].name).toBe("C");
    el.editMode = true;
    await el.updateComplete;
    expect(bar(el).items[el._selected].name).toBe("C");
    el.editMode = false;
    await el.updateComplete;
    expect(bar(el).items[el._selected].name).toBe("C");
  });

  it("can be turned off with edit_mode_reveal: false", async () => {
    const el = await mount({ tabs, edit_mode_reveal: false });
    el.editMode = true;
    await el.updateComplete;
    expect(bar(el).items).toHaveLength(2);
  });

  it("pauses auto_rotate and idle_return while editing", async () => {
    const el = await mount({ tabs, auto_rotate: 10 });
    el.editMode = true;
    const t0 = el._lastInteraction;
    el._tick(t0 + 30_000);
    expect(el._selected).toBe(0);
    const el2 = await mount({ tabs, idle_return: 10 });
    bar(el2).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 } }));
    el2.editMode = true;
    el2._tick(el2._lastInteraction + 60_000);
    await el2.updateComplete;
    expect(bar(el2).items[el2._selected].name).toBe("C");
  });

  it("does not persist selections made while editing", async () => {
    const store: Record<string, string> = {};
    const orig = globalThis.localStorage.setItem;
    globalThis.localStorage.setItem = (k: string, v: string) => void (store[k] = v);
    try {
      const el = await mount({ tabs, remember: "browser" });
      el.editMode = true;
      await el.updateComplete;
      bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 } }));
      expect(Object.keys(store)).toHaveLength(0);
    } finally {
      globalThis.localStorage.setItem = orig;
    }
  });
});

describe("dock & fab", () => {
  const tabs = [
    { name: "Home", icon: "mdi:home", card: { type: "markdown" } },
    { name: "Add", icon: "mdi:plus", fab: true, tap_action: { action: "navigate", navigation_path: "/x" } },
    { name: "Lights", icon: "mdi:lightbulb", card: { type: "light" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");

  it("dock pins a stacked bottom bar after the content", async () => {
    const el = await mount({ dock: true, tabs });
    const root = el.shadowRoot.querySelector(".root");
    expect(root.classList.contains("docked")).toBe(true);
    expect(root.lastElementChild.tagName).toBe("TABDECK-TABBAR");
    expect(bar(el).dock).toBe(true);
    expect(bar(el).position).toBe("bottom");
  });

  it("dock falls back to a normal bar while editing", async () => {
    const el = await mount({ dock: true, tabs });
    el.editMode = true;
    await el.updateComplete;
    expect(bar(el).dock).toBe(false);
    expect(el.shadowRoot.querySelector(".root").classList.contains("docked")).toBe(false);
  });

  it("passes fab through to the tab item", async () => {
    const el = await mount({ tabs });
    expect(bar(el).items.map((i: any) => !!i.fab)).toEqual([false, true, false]);
  });
});

describe("dock reconnect", () => {
  it("re-attaches its panel observer after HA moves the card", async () => {
    const el = await mount({ dock: true, tabs: [{ name: "A", card: { type: "markdown" } }] });
    const calls: string[] = [];
    el._syncDock = () => calls.push("sync");
    el.remove();
    document.body.appendChild(el);
    await el.updateComplete;
    await Promise.resolve();
    expect(calls).toContain("sync");
  });
});

describe("content arrows", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" }, disabled: true },
    { name: "C", card: { type: "light" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");

  it("steps over disabled tabs and hides at the ends without wrap", async () => {
    const el = await mount({ content_arrows: true, tabs });
    const prev = () => el.shadowRoot.querySelector(".nav-arrow.prev");
    const next = () => el.shadowRoot.querySelector(".nav-arrow.next");
    expect(prev()).toBeNull();
    next().click();
    await el.updateComplete;
    expect(bar(el).selected).toBe(2);
    expect(next()).toBeNull();
    prev().click();
    await el.updateComplete;
    expect(bar(el).selected).toBe(0);
  });

  it("wraps with swipe_wrap", async () => {
    const el = await mount({ content_arrows: true, swipe_wrap: true, tabs });
    el.shadowRoot.querySelector(".nav-arrow.prev").click();
    await el.updateComplete;
    expect(bar(el).selected).toBe(2);
  });
});

describe("selectTab API & tab-changed event", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "Living Room", card: { type: "light" } },
  ];
  it("selects by name, slug or index and fires tabdeck-tab-changed", async () => {
    const el = await mount({ tabs });
    const seen: any[] = [];
    el.addEventListener("tabdeck-tab-changed", (e: any) => seen.push(e.detail));
    expect(el.selectTab("living-room")).toBe(true);
    expect(el.selectedTab).toBe("Living Room");
    expect(el.selectTab(0)).toBe(true);
    expect(el.selectTab("nope")).toBe(false);
    expect(seen.map((d) => d.name)).toEqual(["Living Room", "A"]);
    expect(seen[0].index).toBe(1);
  });

  it("hide_bar renders only the content", async () => {
    const el = await mount({ hide_bar: true, tabs });
    expect(el.shadowRoot.querySelector("tabdeck-tabbar")).toBeNull();
    expect(el.shadowRoot.querySelector(".content")).toBeTruthy();
  });
});

describe("grouped tab menu", () => {
  it("picking a child from the menu selects the parent and the child", async () => {
    const el = await mount({
      tabs: [
        { name: "Home", card: { type: "markdown" } },
        {
          name: "Rooms",
          children_display: "menu",
          children: [
            { name: "Kitchen", card: { type: "light" } },
            { name: "Lounge", card: { type: "markdown" } },
          ],
        },
      ],
    });
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar.items[1].menu).toEqual([{ name: "Kitchen", icon: undefined }, { name: "Lounge", icon: undefined }]);
    const nested = el._manager.get(1);
    const picks: any[] = [];
    nested.selectTab = (t: any) => picks.push(t);
    bar.dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1, child: "Lounge" } }));
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(bar.selected).toBe(1);
    expect(picks).toEqual(["Lounge"]);
  });
});

describe("hotkeys", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
    { name: "C", card: { type: "light" } },
  ];
  const press = (key: string, target: EventTarget = document.body, extra: any = {}) =>
    target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, composed: true, ...extra }));
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");

  it("1–9 jump to tabs and [ ] step, when enabled", async () => {
    const el = await mount({ hotkeys: true, tabs });
    press("3");
    await el.updateComplete;
    expect(bar(el).selected).toBe(2);
    press("[");
    await el.updateComplete;
    expect(bar(el).selected).toBe(1);
    press("]");
    await el.updateComplete;
    expect(bar(el).selected).toBe(2);
    el.remove();
  });

  it("ignores keys typed into inputs, modified keys, and decks without hotkeys", async () => {
    const el = await mount({ hotkeys: true, tabs });
    const input = document.createElement("input");
    document.body.appendChild(input);
    press("2", input);
    press("2", document.body, { ctrlKey: true });
    await el.updateComplete;
    expect(bar(el).selected).toBe(0);
    el.remove();
    input.remove();
    const plain = await mount({ tabs });
    press("2");
    await plain.updateComplete;
    expect(bar(plain).selected).toBe(0);
    plain.remove();
  });

  it("/ opens search when search is on", async () => {
    const el = await mount({ hotkeys: true, search: true, tabs });
    let opened = false;
    bar(el).openSearch = () => (opened = true);
    press("/");
    expect(opened).toBe(true);
    el.remove();
  });
});

describe("history (back button)", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
    { name: "C", card: { type: "light" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
  const pick = (el: any, i: number) =>
    bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: i } }));

  it("pushes an entry per user switch and follows popstate", async () => {
    history.replaceState(null, "", "/lovelace/0");
    const before = history.length;
    const el = await mount({ history: true, storage_key: "h1", tabs });
    pick(el, 1);
    pick(el, 2);
    expect(history.length).toBe(before + 2);
    expect(history.state.tabdeck.h1).toBe(2);
    // Simulate Back to the entry for B.
    window.dispatchEvent(new PopStateEvent("popstate", { state: { tabdeck: { h1: 1 } } }));
    await el.updateComplete;
    expect(bar(el).selected).toBe(1);
    // A state that isn't ours (e.g. an HA dialog) is ignored.
    window.dispatchEvent(new PopStateEvent("popstate", { state: { dialog: "more-info" } }));
    await el.updateComplete;
    expect(bar(el).selected).toBe(1);
    el.remove();
  });

  it("doesn't push for automatic switches or without the option", async () => {
    const el = await mount({ history: true, storage_key: "h2", auto_rotate: 10, tabs });
    const before = history.length;
    el._tick(el._lastInteraction + 10_000);
    expect(history.length).toBe(before);
    el.remove();
    const plain = await mount({ storage_key: "h3", tabs });
    const b2 = history.length;
    pick(plain, 1);
    expect(history.length).toBe(b2);
    plain.remove();
  });

  it("with remember: url the pushed entry carries the #tab= hash", async () => {
    const el = await mount({ history: true, remember: "url", storage_key: "h4", tabs });
    pick(el, 2);
    expect(location.hash).toBe("#tab=C");
    expect(history.state.tabdeck.h4).toBe(2);
    el.remove();
  });
});

describe("customize (per-browser order & hidden tabs)", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
    { name: "C", card: { type: "light" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
  const customize = (el: any, detail: any) =>
    bar(el).dispatchEvent(new CustomEvent("tabdeck-customize", { detail }));

  it("applies and saves the person's order and hidden tabs, keeping the selection", async () => {
    localStorage.clear();
    const el = await mount({ customize: true, storage_key: "c1", tabs });
    bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 } }));
    customize(el, { order: ["C", "B", "A"], hidden: ["A"] });
    await el.updateComplete;
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["C", "B"]);
    expect(bar(el).items[bar(el).selected].name).toBe("B");
    expect(bar(el).customItems.map((i: any) => `${i.name}${i.hidden ? "-" : ""}`)).toEqual(["C", "B", "A-"]);
    expect(JSON.parse(localStorage.getItem("tabdeck-layout:c1")!)).toEqual({ order: ["C", "B", "A"], hidden: ["A"] });
    el.remove();
    const again = await mount({ customize: true, storage_key: "c1", tabs });
    expect(bar(again).items.map((i: any) => i.name)).toEqual(["C", "B"]);
    customize(again, { reset: true });
    await again.updateComplete;
    expect(bar(again).items.map((i: any) => i.name)).toEqual(["A", "B", "C"]);
    expect(localStorage.getItem("tabdeck-layout:c1")).toBeNull();
    again.remove();
  });

  it("is ignored without the option", async () => {
    localStorage.setItem("tabdeck-layout:c2", JSON.stringify({ order: ["C"], hidden: ["A"] }));
    const el = await mount({ storage_key: "c2", tabs });
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["A", "B", "C"]);
    expect(bar(el).customizable).toBe(false);
    el.remove();
  });
});

describe("bar_autohide", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");

  it("hides a sticky bar while scrolling down and shows it scrolling up", async () => {
    const el = await mount({ sticky: true, bar_autohide: true, tabs });
    expect(bar(el).autohide).toBe(true);
    el._applyScroll(100);
    el._applyScroll(200);
    await el.updateComplete;
    await bar(el).updateComplete;
    expect(bar(el).hasAttribute("autohidden")).toBe(true);
    el._applyScroll(150);
    await el.updateComplete;
    await bar(el).updateComplete;
    expect(bar(el).hasAttribute("autohidden")).toBe(false);
  });

  it("does nothing for a bar that isn't pinned", async () => {
    const el = await mount({ bar_autohide: true, tabs });
    expect(bar(el).autohide).toBe(false);
    window.dispatchEvent(new Event("scroll"));
    expect(el._barHidden).toBe(false);
  });

  it("never hides while the dashboard is being edited", async () => {
    const el = await mount({ sticky: true, bar_autohide: true, tabs });
    el.editMode = true;
    el._applyScroll(100);
    el._applyScroll(300);
    expect(el._barHidden).toBe(false);
  });
});

describe("hold_peek", () => {
  const hold = (el: any, index: number) =>
    el.shadowRoot
      .querySelector("tabdeck-tabbar")
      .dispatchEvent(new CustomEvent("tabdeck-action", { detail: { index, kind: "hold" }, bubbles: true, composed: true }));

  it("holding a tab shows its panel as a preview until release", async () => {
    const el = await mount({
      hold_peek: true,
      unmount_hidden: true,
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", card: { type: "light" } },
      ],
    });
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[1].holdAction).toBe(true);
    hold(el, 1);
    await el.updateComplete;
    const preview = el.shadowRoot.querySelector(".panel.preview");
    expect(preview).toBeTruthy();
    expect(preview.hasAttribute("hidden")).toBe(false);
    expect(preview.querySelector('[data-type="light"]')).toBeTruthy();
    expect(preview.querySelector(".preview-title").textContent).toContain("B");
    expect(el.selectedTab).toBe("A");
    window.dispatchEvent(new Event("pointerup"));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".panel.preview")).toBeNull();
    expect(el.selectedTab).toBe("A");
  });

  it("a tab's own hold_action wins over the preview", async () => {
    const el = await mount({
      hold_peek: true,
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", hold_action: { action: "navigate", navigation_path: "/x" }, card: { type: "light" } },
      ],
    });
    el._runAction = () => {};
    hold(el, 1);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".panel.preview")).toBeNull();
  });

  it("PIN-locked tabs aren't previewed", async () => {
    const el = await mount({
      hold_peek: true,
      tabs: [
        { name: "A", card: { type: "markdown" } },
        { name: "B", pin: "1234", card: { type: "light" } },
      ],
    });
    // A hold asks for the code instead of previewing.
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[1].holdAction).toBe(true);
    hold(el, 1);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".panel.preview")).toBeNull();
    expect(el._pinFor).toEqual({ index: 1, error: false, then: "stay" });
  });

  it("is off by default", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }, { name: "B", card: { type: "light" } }] });
    expect(el.shadowRoot.querySelector("tabdeck-tabbar").items[1].holdAction).toBe(false);
  });
});

describe("changed_dot", () => {
  const tabs = [
    { name: "A", card: { type: "tile", entity: "light.a" } },
    { name: "B", card: { type: "entities", entities: ["light.b"] } },
    { name: "C", watch: ["sensor.c"], card: { type: "markdown" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
  const at = (ms: number) => new Date(ms).toISOString();

  it("dots a background tab whose entity changed after it was last seen", async () => {
    localStorage.clear();
    const el = await mount({ changed_dot: true, storage_key: "cd1", tabs });
    const t0 = Date.now();
    el.hass = {
      states: {
        "light.a": { state: "on", last_changed: at(t0 + 1000) },
        "light.b": { state: "on", last_changed: at(t0 + 1000) },
        "sensor.c": { state: "1", last_changed: at(t0 - 60_000) },
      },
    };
    await el.updateComplete;
    expect(bar(el).items.map((i: any) => !!i.changed)).toEqual([false, true, false]);
    // Opening B clears it.
    bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 1 } }));
    el._seen.B = t0 + 5000;
    await el.updateComplete;
    expect(bar(el).items[1].changed).toBe(false);
  });

  it("follows a tab's own watch list", async () => {
    localStorage.clear();
    const el = await mount({ changed_dot: true, storage_key: "cd2", tabs });
    el.hass = { states: { "sensor.c": { state: "2", last_changed: at(Date.now() + 1000) } } };
    await el.updateComplete;
    expect(bar(el).items[2].changed).toBe(true);
  });

  it("remembers when tabs were seen across reloads", async () => {
    localStorage.clear();
    localStorage.setItem("tabdeck-seen:cd3", JSON.stringify({ B: Date.now() + 10_000 }));
    const el = await mount({ changed_dot: true, storage_key: "cd3", tabs });
    el.hass = { states: { "light.b": { state: "on", last_changed: at(Date.now() + 1000) } } };
    await el.updateComplete;
    expect(bar(el).items[1].changed).toBe(false);
    // The tab on screen was recorded as seen.
    expect(JSON.parse(localStorage.getItem("tabdeck-seen:cd3")!).A).toBeGreaterThan(0);
  });

  it("shows changes made while the page was closed", async () => {
    localStorage.clear();
    const first = await mount({ changed_dot: true, storage_key: "cd4", tabs });
    const stored = JSON.parse(localStorage.getItem("tabdeck-seen:cd4")!);
    expect(stored.B).toBeGreaterThan(0);
    first.remove();
    // Later, a reload after light.b changed (never opened B).
    const el = await mount({ changed_dot: true, storage_key: "cd4", tabs });
    el.hass = { states: { "light.b": { state: "on", last_changed: at(stored.B + 1000) } } };
    await el.updateComplete;
    expect(bar(el).items[1].changed).toBe(true);
  });

  it("is off by default", async () => {
    const el = await mount({ tabs });
    el.hass = { states: { "light.b": { state: "on", last_changed: at(Date.now() + 1000) } } };
    await el.updateComplete;
    expect(bar(el).items[1].changed).toBe(false);
  });
});

describe("sort_by_usage", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
    { name: "C", card: { type: "tile" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");

  it("puts the most-opened tabs first, from the counts at load", async () => {
    localStorage.clear();
    localStorage.setItem("tabdeck-usage:u1", JSON.stringify({ C: 5, B: 1 }));
    const el = await mount({ sort_by_usage: true, storage_key: "u1", tabs });
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["C", "B", "A"]);
  });

  it("counts opens without reordering during the visit", async () => {
    localStorage.clear();
    const el = await mount({ sort_by_usage: true, storage_key: "u2", tabs });
    bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 2 } }));
    await el.updateComplete;
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["A", "B", "C"]);
    expect(JSON.parse(localStorage.getItem("tabdeck-usage:u2")!)).toEqual({ C: 1 });
    const again = await mount({ sort_by_usage: true, storage_key: "u2", tabs });
    expect(bar(again).items.map((i: any) => i.name)).toEqual(["C", "A", "B"]);
  });

  it("an order set with customize wins", async () => {
    localStorage.clear();
    localStorage.setItem("tabdeck-usage:u3", JSON.stringify({ C: 5 }));
    localStorage.setItem("tabdeck-layout:u3", JSON.stringify({ order: ["B", "A", "C"], hidden: [] }));
    const el = await mount({ sort_by_usage: true, customize: true, storage_key: "u3", tabs });
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["B", "A", "C"]);
  });
});

describe("health_dim", () => {
  const tabs = [
    { name: "A", card: { type: "entities", entities: ["light.a1", "light.a2"] } },
    { name: "B", card: { type: "tile", entity: "light.b" } },
    { name: "C", card: { type: "markdown" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
  const states = {
    "light.a1": { state: "unavailable" },
    "light.a2": { state: "on" },
    "light.b": { state: "on" },
  };

  it("flags tabs with half or more of their entities unavailable", async () => {
    const el = await mount({ health_dim: true, tabs });
    el.hass = { states };
    await el.updateComplete;
    expect(bar(el).items.map((i: any) => i.unhealthy)).toEqual([true, false, false]);
  });

  it("takes a share as the threshold", async () => {
    const el = await mount({ health_dim: 0.75, tabs });
    el.hass = { states };
    await el.updateComplete;
    expect(bar(el).items[0].unhealthy).toBe(false);
  });

  it("is off by default", async () => {
    const el = await mount({ tabs });
    el.hass = { states };
    await el.updateComplete;
    expect(bar(el).items[0].unhealthy).toBe(false);
  });
});

describe("client-side auto_tabs sources", () => {
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");

  it("notifications: a tab per notification, following the subscription", async () => {
    await import("./tabdeck-card");
    let push: (msg: any) => void = () => {};
    const hass: any = {
      states: {},
      language: "en",
      connection: {
        subscribeMessage: (cb: any, msg: any) => {
          expect(msg.type).toBe("persistent_notification/subscribe");
          push = cb;
          return Promise.resolve(() => {});
        },
      },
    };
    const el = document.createElement("tabdeck-card") as any;
    el.setConfig({ tabs: [{ name: "Home", card: { type: "markdown" } }], auto_tabs: { source: "notifications" } });
    document.body.appendChild(el);
    el.hass = hass;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    push({
      type: "current",
      notifications: { n1: { notification_id: "n1", title: "Backup done", message: "All good", created_at: "2026-11-10T08:00:00Z" } },
    });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["Home", "Backup done"]);
    const card = el._allTabs()[1].card;
    expect(card.cards[0].content).toBe("All good");
    expect(card.cards[1].entities[0].tap_action.data).toEqual({ notification_id: "n1" });
    push({ type: "removed", notifications: { n1: {} } });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["Home"]);
    el.remove();
  });

  it("repairs: a tab per open issue with its translated title", async () => {
    await import("./tabdeck-card");
    const hass: any = {
      states: {},
      language: "en",
      connection: { subscribeMessage: () => Promise.resolve(() => {}) },
      callWS: async () => ({ issues: [{ issue_id: "i1", domain: "zha", translation_key: "stick", severity: "error" }] }),
      loadBackendTranslation: async () => undefined,
      localize: (key: string) => (key === "component.zha.issues.stick.title" ? "Zigbee stick missing" : ""),
    };
    const el = document.createElement("tabdeck-card") as any;
    el.setConfig({ tabs: [{ name: "Home", card: { type: "markdown" } }], auto_tabs: { source: "repairs" } });
    document.body.appendChild(el);
    el.hass = hass;
    await new Promise((r) => setTimeout(r, 10));
    await el.updateComplete;
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["Home", "Zigbee stick missing"]);
    el.remove();
  });
});

describe("pip", () => {
  const tabs = [
    { name: "Cam", pip: true, card: { type: "picture-entity" } },
    { name: "B", card: { type: "light" } },
    { name: "C", card: { type: "tile" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
  const select = (el: any, index: number) =>
    bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index }, bubbles: true, composed: true }));

  it("floats a pip tab's card after switching away, until closed", async () => {
    const el = await mount({ unmount_hidden: true, tabs });
    select(el, 1);
    await el.updateComplete;
    const pip = el.shadowRoot.querySelector(".panel.pip");
    expect(pip).toBeTruthy();
    expect(pip.hasAttribute("hidden")).toBe(false);
    expect(pip.querySelector('[data-type="picture-entity"]')).toBeTruthy();
    select(el, 2);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".panel.pip")).toBeTruthy();
    pip.querySelector(".pip-close").click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".panel.pip")).toBeNull();
  });

  it("tapping the window opens its tab", async () => {
    const el = await mount({ tabs });
    select(el, 1);
    await el.updateComplete;
    el.shadowRoot.querySelector(".panel.pip").click();
    await el.updateComplete;
    expect(el.selectedTab).toBe("Cam");
    expect(el.shadowRoot.querySelector(".panel.pip")).toBeNull();
  });

  it("tabs without pip don't float", async () => {
    const el = await mount({ default_tab: "B", tabs });
    select(el, 2);
    await el.updateComplete;
    select(el, 1);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".panel.pip")).toBeNull();
  });
});

describe("idle_dim", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
  ];

  it("shows the screensaver after the idle time and wakes on a tap", async () => {
    const el = await mount({ idle_dim: { after: 1, mode: "clock" }, tabs });
    const t0 = el._lastActivity;
    el._tick(t0 + 30_000);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".screensaver")).toBeNull();
    el._tick(t0 + 61_000);
    await el.updateComplete;
    const saver = el.shadowRoot.querySelector(".screensaver");
    expect(saver).toBeTruthy();
    expect(saver.querySelector(".saver-time")).toBeTruthy();
    // Activity while dark doesn't un-dim on its own.
    window.dispatchEvent(new Event("pointerdown"));
    el._tick(t0 + 62_000);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".screensaver")).toBeTruthy();
    saver.click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".screensaver")).toBeNull();
    el.remove();
  });

  it("counts touches anywhere on the page", async () => {
    const el = await mount({ idle_dim: 1, tabs });
    const before = el._lastActivity;
    await new Promise((r) => setTimeout(r, 5));
    document.body.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    expect(el._lastActivity).toBeGreaterThan(before);
    el.remove();
  });

  it("never dims while the dashboard is being edited", async () => {
    const el = await mount({ idle_dim: 1, tabs });
    el.editMode = true;
    el._tick(el._lastActivity + 10 * 60_000);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".screensaver")).toBeNull();
    el.remove();
  });

  it("a key wakes it", async () => {
    const el = await mount({ idle_dim: { after: 1, mode: "black" }, tabs });
    el._tick(el._lastActivity + 61_000);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".screensaver.mode-black")).toBeTruthy();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".screensaver")).toBeNull();
    el.remove();
  });
});

describe("lazy and preload", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
    { name: "C", card: { type: "tile" } },
    { name: "D", card: { type: "gauge" } },
  ];
  const built = (el: any) => [0, 1, 2, 3].map((i) => el._manager.isLoaded(i));

  it("lazy builds only the open tab, and each tab on its first visit", async () => {
    const el = await mount({ lazy: true, tabs });
    expect(built(el)).toEqual([true, false, false, false]);
    el.shadowRoot.querySelector("tabdeck-tabbar").dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index: 2 } }));
    await el.updateComplete;
    expect(built(el)).toEqual([true, false, true, false]);
    expect(el.shadowRoot.querySelector('[data-type="tile"]')).toBeTruthy();
  });

  it("without lazy every card is built up front", async () => {
    const el = await mount({ tabs });
    expect(built(el)).toEqual([true, true, true, true]);
  });

  it("preload: idle builds the neighbours of the open tab", async () => {
    const el = await mount({ lazy: true, preload: "idle", default_tab: 1, tabs });
    while (el._preloadStep()) {}
    expect(built(el)).toEqual([true, true, true, false]);
  });

  it("preload: all builds every tab", async () => {
    const el = await mount({ lazy: true, preload: "all", tabs });
    while (el._preloadStep()) {}
    expect(built(el)).toEqual([true, true, true, true]);
  });
});

describe("breadcrumbs", () => {
  const config = (extra: any = {}) => ({
    ...extra,
    tabs: [
      { name: "Home", card: { type: "markdown" } },
      {
        name: "Downstairs",
        children_display: "menu",
        children: [
          { name: "Kitchen", card: { type: "light" } },
          { name: "Lounge", card: { type: "markdown" } },
        ],
      },
    ],
  });
  const select = (el: any, index: number) =>
    el.shadowRoot.querySelector("tabdeck-tabbar").dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index } }));
  const crumbs = (el: any) => [...el.shadowRoot.querySelectorAll(".breadcrumbs li")].map((li: any) => li.textContent.replace("›", "").trim());

  it("shows the open tab at each level and steps back up", async () => {
    const el = await mount(config({ breadcrumbs: true }));
    const nested = el._manager.get(1);
    const resets: number[] = [];
    nested.breadcrumbPath = () => [{ name: "Lounge", deck: nested }];
    nested.selectDefault = () => resets.push(1);
    expect(el.shadowRoot.querySelector(".breadcrumbs")).toBeNull();
    select(el, 1);
    await el.updateComplete;
    expect(crumbs(el)).toEqual(["Downstairs", "Lounge"]);
    expect(el.shadowRoot.querySelector('.breadcrumbs [aria-current="page"]').textContent).toBe("Lounge");
    el.shadowRoot.querySelector(".breadcrumbs button").click();
    expect(resets).toEqual([1]);
  });

  it("a root crumb returns to the default tab", async () => {
    const el = await mount(config({ breadcrumbs: { root: "House" } }));
    select(el, 1);
    await el.updateComplete;
    expect(crumbs(el)[0]).toBe("House");
    el.shadowRoot.querySelector(".breadcrumbs button").click();
    await el.updateComplete;
    expect(el.selectedTab).toBe("Home");
  });

  it("is off by default", async () => {
    const el = await mount(config());
    select(el, 1);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".breadcrumbs")).toBeNull();
  });
});

describe("overview", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "light" } },
    { name: "Docs", tap_action: { action: "navigate", navigation_path: "/x" } },
    { name: "Safe", pin: "12", card: { type: "entities" } },
  ];

  it("adds a bar button that opens a grid of live thumbnails", async () => {
    const el = await mount({ overview: true, tabs });
    const tabbar = el.shadowRoot.querySelector("tabdeck-tabbar");
    await tabbar.updateComplete;
    tabbar.shadowRoot.querySelector(".ov-btn").click();
    await el.updateComplete;
    const tiles = el.shadowRoot.querySelectorAll(".ov-tile");
    expect(tiles).toHaveLength(3);
    // The tabs' own cards, not copies; the locked tab shows a lock.
    expect(tiles[1].querySelector(".ov-live [data-type='light']")).toBeTruthy();
    expect(tiles[2].querySelector(".ov-lock")).toBeTruthy();
    expect(tiles[2].querySelector("[data-type]")).toBeNull();
    expect(el.shadowRoot.querySelector("tabdeck-tabbar")).toBeNull();
    tiles[1].click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".overview")).toBeNull();
    expect(el.selectedTab).toBe("B");
    expect(el.shadowRoot.querySelectorAll("[data-type]").length).toBe(3);
    el.remove();
  });

  it("is off by default and Escape closes it", async () => {
    const off = await mount({ tabs });
    expect(off.openOverview()).toBe(false);
    off.remove();
    const el = await mount({ overview: true, tabs });
    expect(el.openOverview()).toBe(true);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".overview")).toBeTruthy();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".overview")).toBeNull();
    el.remove();
  });

  it("opens on a two-finger pinch-in over the content", async () => {
    const el = await mount({ overview: true, tabs });
    const content = el.shadowRoot.querySelector(".content");
    const touch = (x: number) => ({ clientX: x, clientY: 0 });
    const ev = (type: string, xs: number[]) => {
      const e = new Event(type, { bubbles: true }) as any;
      e.touches = xs.map(touch);
      e.changedTouches = e.touches;
      return e;
    };
    content.dispatchEvent(ev("touchstart", [0, 200]));
    content.dispatchEvent(ev("touchmove", [20, 180]));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".overview")).toBeNull();
    content.dispatchEvent(ev("touchmove", [60, 120]));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".overview")).toBeTruthy();
    el.remove();
  });
});

describe("entity_search", () => {
  const tabs = [
    { name: "Lights", card: { type: "entities", entities: ["light.kitchen"] } },
    { name: "Climate", card: { type: "thermostat", entity: "climate.lounge" } },
    {
      name: "Rooms",
      children: [
        { name: "Hall", card: { type: "tile", entity: "light.hall" } },
        { name: "Kitchen", card: { type: "tile", entity: "sensor.kitchen_temp" } },
      ],
    },
  ];
  const states = {
    "light.kitchen": { state: "on", attributes: { friendly_name: "Kitchen light" } },
    "climate.lounge": { state: "heat", attributes: { friendly_name: "Lounge" } },
    "light.hall": { state: "off", attributes: { friendly_name: "Hall light" } },
    "sensor.kitchen_temp": { state: "21", attributes: { friendly_name: "Kitchen temperature" } },
  };

  async function mountWith(cfg: any) {
    const el = await mount(cfg);
    el.hass = { states };
    await el.updateComplete;
    return el;
  }

  it("Ctrl+K opens a search that jumps to the tab showing the entity", async () => {
    const el = await mountWith({ entity_search: true, tabs });
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, cancelable: true }));
    await el.updateComplete;
    const input = el.shadowRoot.querySelector(".es-input");
    expect(input).toBeTruthy();
    input.value = "lounge";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;
    const items = el.shadowRoot.querySelectorAll(".es-item");
    expect(items).toHaveLength(1);
    expect(items[0].querySelector(".es-tab").textContent).toBe("Climate");
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".es-panel")).toBeNull();
    expect(el.selectedTab).toBe("Climate");
    el.remove();
  });

  it("opens a grouped tab's child", async () => {
    const el = await mountWith({ entity_search: true, tabs });
    el.openEntitySearch();
    await el.updateComplete;
    const input = el.shadowRoot.querySelector(".es-input");
    input.value = "kitchen temp";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".es-tab").textContent).toBe("Rooms › Kitchen");
    // The test card helpers build a stub for the nested deck.
    const picked: string[] = [];
    el._manager.ensure(2).selectTab = (name: string) => picked.push(name);
    el.shadowRoot.querySelector(".es-item").click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(el.selectedTab).toBe("Rooms");
    expect(picked).toEqual(["Kitchen"]);
    el.remove();
  });

  it("leaves Ctrl+K alone without the option, and has a bar button with it", async () => {
    const off = await mountWith({ tabs });
    const ev = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, cancelable: true });
    window.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(false);
    off.remove();
    const el = await mountWith({ entity_search: true, tabs });
    const tabbar = el.shadowRoot.querySelector("tabdeck-tabbar");
    await tabbar.updateComplete;
    tabbar.shadowRoot.querySelector(".es-btn").click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".es-panel")).toBeTruthy();
    el.remove();
  });
});

describe("sync_group", () => {
  const house = (extra: any = {}) => ({
    sync_group: "house",
    ...extra,
    tabs: [
      { name: "Home", card: { type: "markdown" } },
      { name: "Climate", card: { type: "markdown" } },
      { name: "Lights", card: { type: "markdown" } },
    ],
  });

  it("switches the other decks of the group to the tab with the same name", async () => {
    const a = await mount(house());
    const b = await mount({ sync_group: "house", tabs: [{ name: "climate", card: { type: "x" } }, { name: "Water", card: { type: "x" } }, { name: "Home", card: { type: "x" } }] });
    const c = await mount({ sync_group: "garden", tabs: [{ name: "Home", card: { type: "x" } }, { name: "Climate", card: { type: "x" } }] });
    const d = await mount({ tabs: [{ name: "Home", card: { type: "x" } }, { name: "Climate", card: { type: "x" } }] });
    a.selectTab("Climate");
    await a.updateComplete;
    expect(b.selectedTab).toBe("climate");
    expect(c.selectedTab).toBe("Home");
    expect(d.selectedTab).toBe("Home");
    // A tab the other deck doesn't have leaves it where it is.
    a.selectTab("Lights");
    expect(b.selectedTab).toBe("climate");
    // Either deck leads.
    b.selectTab("Home");
    expect(a.selectedTab).toBe("Home");
    for (const el of [a, b, c, d]) el.remove();
  });

  it("a deck that appears later starts on the group's last tab", async () => {
    const a = await mount(house());
    a.selectTab("Lights");
    const late = await mount(house());
    expect(late.selectedTab).toBe("Lights");
    a.remove();
    late.remove();
  });

  it("stops following once removed from the page", async () => {
    const a = await mount(house());
    const b = await mount(house());
    a.selectTab("Home");
    b.remove();
    a.selectTab("Climate");
    expect(b.selectedTab).toBe("Home");
    a.remove();
  });
});

describe("popup", () => {
  const tabs = [
    { name: "Home", card: { type: "markdown" } },
    { name: "Cameras", icon: "mdi:cctv", card: { type: "picture" } },
    { name: "Safe", pin: "1", card: { type: "entities" } },
  ];
  const fire = (detail: any) => {
    const ev = new CustomEvent("ll-custom", { detail, bubbles: true, composed: true });
    document.body.dispatchEvent(ev);
    return ev;
  };

  it("opens a tab in a dialog from a fire-dom-event action, and closes it", async () => {
    const el = await mount({ popup: true, event_id: "hall", tabs });
    fire({ action: "fire-dom-event", tabdeck_popup: { tab: "cameras", deck: "other" } });
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".popup-dialog")).toBeNull();
    fire({ action: "fire-dom-event", tabdeck_popup: "cameras" });
    await el.updateComplete;
    const dialog = el.shadowRoot.querySelector(".popup-dialog");
    expect(dialog.querySelector(".popup-title").textContent).toBe("Cameras");
    expect(dialog.querySelector("[data-type='picture']")).toBeTruthy();
    // The deck doesn't switch, and the card isn't in two places.
    expect(el.selectedTab).toBe("Home");
    expect(el.shadowRoot.querySelectorAll("[data-type='picture']")).toHaveLength(1);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".popup-dialog")).toBeNull();
    el.remove();
  });

  it("does nothing without the option, and never opens a locked tab", async () => {
    const off = await mount({ tabs });
    fire({ tabdeck_popup: "Cameras" });
    await off.updateComplete;
    expect(off.shadowRoot.querySelector(".popup-dialog")).toBeNull();
    off.remove();
    const el = await mount({ popup: true, tabs });
    expect(el.openPopup("Safe")).toBe(false);
    el.remove();
  });

  it("only one deck answers, and hidden shows nothing but the popup", async () => {
    const a = await mount({ popup: "hidden", tabs });
    const b = await mount({ popup: true, tabs });
    expect(a.shadowRoot.querySelector("tabdeck-tabbar")).toBeNull();
    expect(a.getCardSize()).toBe(0);
    fire({ tabdeck_popup: "Cameras" });
    await a.updateComplete;
    await b.updateComplete;
    expect(a.shadowRoot.querySelector(".popup-dialog")).toBeTruthy();
    expect(b.shadowRoot.querySelector(".popup-dialog")).toBeNull();
    a.shadowRoot.querySelector(".popup-close").click();
    await a.updateComplete;
    expect(a.shadowRoot.querySelector(".popup-dialog")).toBeNull();
    a.remove();
    b.remove();
  });
});

describe("wizard", () => {
  const tabs = [
    { name: "Welcome", subtitle: "Start here", card: { type: "markdown" } },
    { name: "Wi-Fi", card: { type: "markdown" } },
    { name: "Skipped", disabled: true, card: { type: "markdown" } },
    { name: "Heating", card: { type: "markdown" } },
  ];
  const $ = (el: any, sel: string) => el.shadowRoot.querySelector(sel);

  it("replaces the bar with a step counter, progress bar and Back / Next", async () => {
    const el = await mount({ wizard: true, tabs });
    expect($(el, "tabdeck-tabbar")).toBeNull();
    expect($(el, ".wizard-title").textContent).toBe("Welcome");
    expect($(el, ".wizard-subtitle").textContent).toBe("Start here");
    expect($(el, ".wizard-count").textContent).toBe("Step 1 of 3");
    expect($(el, ".wizard-back").disabled).toBe(true);
    $(el, ".wizard-next").click();
    await el.updateComplete;
    expect(el.selectedTab).toBe("Wi-Fi");
    expect($(el, ".wizard-progress > div").style.width).toBe("67%");
    // The disabled tab isn't a step.
    $(el, ".wizard-next").click();
    await el.updateComplete;
    expect(el.selectedTab).toBe("Heating");
    expect($(el, ".wizard-count").textContent).toBe("Step 3 of 3");
    expect($(el, ".wizard-finish")).toBeTruthy();
    $(el, ".wizard-back").click();
    await el.updateComplete;
    expect(el.selectedTab).toBe("Wi-Fi");
    el.remove();
  });

  it("Finish runs finish_action and goes back to the first step", async () => {
    const el = await mount({ wizard: { finish_action: { action: "fire-dom-event", done: 1 } }, default_tab: "Heating", tabs });
    const seen: any[] = [];
    el.addEventListener("ll-custom", (e: any) => seen.push(e.detail));
    $(el, ".wizard-finish").click();
    await el.updateComplete;
    expect(seen).toHaveLength(1);
    expect(el.selectedTab).toBe("Welcome");
    el.remove();
  });
});

describe("last_tab_button", () => {
  const tabs = [
    { name: "Home", card: { type: "markdown" } },
    { name: "Lights", card: { type: "markdown" } },
    { name: "Climate", card: { type: "markdown" } },
  ];
  const lastBtn = async (el: any) => {
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    await bar.updateComplete;
    return bar.shadowRoot.querySelector(".last-btn");
  };

  it("shows a swap button once there's a tab to go back to, and flips between two tabs", async () => {
    const el = await mount({ last_tab_button: true, tabs });
    expect(await lastBtn(el)).toBeNull();
    el.selectTab("Lights");
    el.selectTab("Climate");
    await el.updateComplete;
    const btn = await lastBtn(el);
    expect(btn.querySelector(".last-name").textContent).toBe("Lights");
    btn.click();
    await el.updateComplete;
    expect(el.selectedTab).toBe("Lights");
    (await lastBtn(el)).click();
    await el.updateComplete;
    expect(el.selectedTab).toBe("Climate");
    el.remove();
  });

  it("is off by default; with hotkeys, l flips too", async () => {
    const off = await mount({ tabs });
    off.selectTab("Lights");
    await off.updateComplete;
    expect(await lastBtn(off)).toBeNull();
    off.remove();
    const el = await mount({ last_tab_button: true, hotkeys: true, tabs });
    expect(el.selectLast()).toBe(false);
    el.selectTab("Climate");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "l" }));
    await el.updateComplete;
    expect(el.selectedTab).toBe("Home");
    el.remove();
  });
});

describe("wheel_switch", () => {
  const tabs = [
    { name: "Home", card: { type: "markdown" } },
    { name: "Lights", card: { type: "markdown" }, disabled: true },
    { name: "Climate", card: { type: "markdown" } },
  ];
  const wheel = (el: any, deltaY: number) => {
    const ev = new WheelEvent("wheel", { deltaY, bubbles: true, composed: true, cancelable: true });
    el.shadowRoot.querySelector("tabdeck-tabbar").dispatchEvent(ev);
    return ev;
  };

  it("scrolling over the bar steps tabs, skipping disabled ones, and keeps the page still", async () => {
    const el = await mount({ wheel_switch: true, tabs });
    const ev = wheel(el, 100);
    await el.updateComplete;
    expect(el.selectedTab).toBe("Climate");
    expect(ev.defaultPrevented).toBe(true);
    el.remove();
  });

  it("is off by default, and doesn't wrap without swipe_wrap", async () => {
    const off = await mount({ tabs });
    const ev = wheel(off, 100);
    await off.updateComplete;
    expect(off.selectedTab).toBe("Home");
    expect(ev.defaultPrevented).toBe(false);
    off.remove();
    const el = await mount({ wheel_switch: true, tabs });
    const up = wheel(el, -100);
    await el.updateComplete;
    expect(el.selectedTab).toBe("Home");
    // Nothing to move to: the page scrolls as usual.
    expect(up.defaultPrevented).toBe(false);
    el.remove();
  });
});

describe("swipe_edge", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "markdown" } },
  ];
  // Content spans x 0–400; touch from startX, 120 px to the left.
  const swipeFrom = (el: any, startX: number) => {
    const content = el.shadowRoot.querySelector(".content");
    content.getBoundingClientRect = () => ({ left: 0, right: 400, top: 0, bottom: 300, width: 400, height: 300 });
    const start = new Event("touchstart", { bubbles: true }) as any;
    start.touches = [{ clientX: startX, clientY: 100 }];
    Object.defineProperty(start, "timeStamp", { value: 1000 });
    content.dispatchEvent(start);
    const end = new Event("touchend", { bubbles: true }) as any;
    end.changedTouches = [{ clientX: startX - 120, clientY: 100 }];
    Object.defineProperty(end, "timeStamp", { value: 1200 });
    content.dispatchEvent(end);
  };

  it("only counts swipes that start near the left or right edge", async () => {
    const el = await mount({ swipe: true, swipe_edge: true, tabs });
    swipeFrom(el, 200);
    await el.updateComplete;
    expect(el.selectedTab).toBe("A");
    swipeFrom(el, 390);
    await el.updateComplete;
    expect(el.selectedTab).toBe("B");
    el.remove();
  });

  it("takes a width in px; without it a swipe from the middle still works", async () => {
    const el = await mount({ swipe: true, swipe_edge: 100, tabs });
    swipeFrom(el, 320);
    await el.updateComplete;
    expect(el.selectedTab).toBe("B");
    el.remove();
    const off = await mount({ swipe: true, tabs });
    swipeFrom(off, 200);
    await off.updateComplete;
    expect(off.selectedTab).toBe("B");
    off.remove();
  });
});

describe("swipe_lock", () => {
  const tabs = [
    { name: "A", card: { type: "tile" } },
    { name: "B", card: { type: "markdown" } },
  ];
  // A touch drag 120 px to the left that starts on `target`.
  const dragOn = (el: any, target: Element) => {
    const content = el.shadowRoot.querySelector(".content");
    const start = new Event("touchstart", { bubbles: true, composed: true }) as any;
    start.touches = [{ clientX: 300, clientY: 100 }];
    Object.defineProperty(start, "timeStamp", { value: 1000 });
    target.dispatchEvent(start);
    const end = new Event("touchend", { bubbles: true, composed: true }) as any;
    end.changedTouches = [{ clientX: 180, clientY: 100 }];
    Object.defineProperty(end, "timeStamp", { value: 1200 });
    content.dispatchEvent(end);
  };
  const slider = (el: any) => {
    const card = el.shadowRoot.querySelector('[data-type="tile"]');
    const s = document.createElement("ha-control-slider");
    card.appendChild(s);
    return { card, s };
  };

  it("a drag that starts on a slider moves the slider, not the tab", async () => {
    const el = await mount({ swipe: true, swipe_lock: true, tabs });
    const { card, s } = slider(el);
    dragOn(el, s);
    await el.updateComplete;
    expect(el.selectedTab).toBe("A");
    // Elsewhere on the same card it still swipes.
    dragOn(el, card);
    await el.updateComplete;
    expect(el.selectedTab).toBe("B");
    el.remove();
  });

  it("is off by default, so swipe keeps working everywhere", async () => {
    const el = await mount({ swipe: true, tabs });
    dragOn(el, slider(el).s);
    await el.updateComplete;
    expect(el.selectedTab).toBe("B");
    el.remove();
  });
});

describe("drag_reorder", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "markdown" } },
    { name: "C", card: { type: "markdown" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
  const names = (el: any) => bar(el).items.map((i: any) => i.name);
  const drop = (el: any, from: number, to: number, after: boolean) =>
    bar(el).dispatchEvent(new CustomEvent("tabdeck-reorder", { detail: { from, to, after } }));

  it("a drop moves the tab, keeps the open tab and saves the order in the customize layout", async () => {
    localStorage.clear();
    const el = await mount({ drag_reorder: true, storage_key: "dr1", tabs });
    expect(bar(el).reorderable).toBe(true);
    el.selectTab("B");
    drop(el, 0, 2, true);
    await el.updateComplete;
    expect(names(el)).toEqual(["B", "C", "A"]);
    expect(el.selectedTab).toBe("B");
    expect(JSON.parse(localStorage.getItem("tabdeck-layout:dr1")!)).toEqual({ order: ["B", "C", "A"], hidden: [] });
    el.remove();
    // The same browser gets it back; customize shares (and can reset) it.
    const again = await mount({ drag_reorder: true, customize: true, storage_key: "dr1", tabs });
    expect(names(again)).toEqual(["B", "C", "A"]);
    expect(bar(again).customItems.map((i: any) => i.name)).toEqual(["B", "C", "A"]);
    again.remove();
  });

  it("keeps the hidden list customize saved", async () => {
    localStorage.setItem("tabdeck-layout:dr2", JSON.stringify({ order: [], hidden: ["C"] }));
    const el = await mount({ drag_reorder: true, customize: true, storage_key: "dr2", tabs });
    drop(el, 1, 0, false);
    await el.updateComplete;
    expect(names(el)).toEqual(["B", "A"]);
    expect(JSON.parse(localStorage.getItem("tabdeck-layout:dr2")!).hidden).toEqual(["C"]);
    el.remove();
  });

  it("is off by default (a saved order is ignored too)", async () => {
    localStorage.setItem("tabdeck-layout:dr3", JSON.stringify({ order: ["C"], hidden: [] }));
    const el = await mount({ storage_key: "dr3", tabs });
    expect(bar(el).reorderable).toBe(false);
    drop(el, 0, 2, true);
    await el.updateComplete;
    expect(names(el)).toEqual(["A", "B", "C"]);
    el.remove();
  });
});

describe("compare", () => {
  const tabs = [
    { name: "Lights", card: { type: "markdown" } },
    { name: "Cameras", card: { type: "picture" } },
    { name: "Climate", card: { type: "light" } },
  ];
  const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
  const hold = (el: any, index: number) =>
    bar(el).dispatchEvent(new CustomEvent("tabdeck-action", { detail: { index, kind: "hold" } }));
  const shown = (el: any) =>
    [...el.shadowRoot.querySelectorAll(".panel:not([hidden])")].map((p: any) => p.querySelector("[data-type]")?.getAttribute("data-type"));

  it("holding a tab shows it beside the open one; the close button and Esc end it", async () => {
    const el = await mount({ compare: true, tabs });
    expect(bar(el).items[1].holdAction).toBe(true);
    hold(el, 1);
    await el.updateComplete;
    expect(el.selectedTab).toBe("Lights");
    expect(el.shadowRoot.querySelector(".content").classList.contains("comparing")).toBe(true);
    expect(shown(el)).toEqual(["markdown", "picture"]);
    expect([...el.shadowRoot.querySelectorAll(".compare-title")].map((t: any) => t.textContent.trim())).toEqual(["Lights", "Cameras"]);
    el.shadowRoot.querySelector(".compare-close").click();
    await el.updateComplete;
    expect(shown(el)).toEqual(["markdown"]);
    el.compareTab("Climate");
    await el.updateComplete;
    expect(shown(el)).toEqual(["markdown", "light"]);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await el.updateComplete;
    expect(shown(el)).toEqual(["markdown"]);
    el.remove();
  });

  it("the compared tab stays while you switch the main one, and ends when you open it", async () => {
    const el = await mount({ compare: true, tabs });
    el.compareTab("Cameras");
    el.selectTab("Climate");
    await el.updateComplete;
    expect(shown(el)).toEqual(["picture", "light"]);
    // The open tab is on the left.
    const panels = [...el.shadowRoot.querySelectorAll(".panel:not([hidden])")] as HTMLElement[];
    expect(panels.find((p) => p.classList.contains("compare"))?.querySelector("[data-type]")?.getAttribute("data-type")).toBe("picture");
    el.selectTab("Cameras");
    await el.updateComplete;
    expect(shown(el)).toEqual(["picture"]);
    expect(el.shadowRoot.querySelector(".content").classList.contains("comparing")).toBe(false);
    el.remove();
  });

  it("is off by default; a tab's own hold_action wins", async () => {
    const off = await mount({ tabs });
    expect(off.compareTab("Cameras")).toBe(false);
    expect(bar(off).items[1].holdAction).toBe(false);
    off.remove();
    const el = await mount({
      compare: true,
      tabs: [tabs[0], { ...tabs[1], hold_action: { action: "none" } }],
    });
    hold(el, 1);
    await el.updateComplete;
    expect(shown(el)).toEqual(["markdown"]);
    el.remove();
  });
});

describe("share_button", () => {
  const tabs = [
    { name: "Home", card: { type: "markdown" } },
    { name: "Living Room", card: { type: "markdown" } },
  ];
  const sr = async (el: any) => {
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    await bar.updateComplete;
    return bar.shadowRoot;
  };

  it("copies a #tab= link to the open tab and shows it (with a QR code for qr)", async () => {
    (document as any).execCommand = () => true;
    const el = await mount({ share_button: "qr", tabs });
    el.selectTab("Living Room");
    await el.updateComplete;
    (await sr(el)).querySelector(".share-btn").click();
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    const root = await sr(el);
    const url = root.querySelector(".share-url").value;
    expect(url).toBe(`${location.origin}${location.pathname}${location.search}#tab=living-room`);
    expect(root.querySelector(".share-status").textContent.trim()).toBe("Link copied");
    expect(root.querySelector(".share-qr path").getAttribute("d")).toMatch(/^M4 4h1v1h-1z/);
    // Switching tab closes it.
    el.selectTab("Home");
    await el.updateComplete;
    expect((await sr(el)).querySelector(".share-panel")).toBeNull();
    el.remove();
  });

  it("without qr there's no code; off by default there's no button", async () => {
    (document as any).execCommand = () => false;
    const el = await mount({ share_button: true, tabs });
    (await sr(el)).querySelector(".share-btn").click();
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    const root = await sr(el);
    expect(root.querySelector(".share-qr")).toBeNull();
    expect(root.querySelector(".share-status").textContent.trim()).toBe("Copy this link");
    el.remove();
    const off = await mount({ tabs });
    expect((await sr(off)).querySelector(".share-btn")).toBeNull();
    off.remove();
  });

  it("opens the tab a shared link names, whatever remember is set to", async () => {
    history.replaceState(null, "", "#tab=living-room");
    try {
      const el = await mount({ share_button: true, tabs });
      expect(el.selectedTab).toBe("Living Room");
      el.remove();
      const off = await mount({ tabs });
      expect(off.selectedTab).toBe("Home");
      off.remove();
    } finally {
      history.replaceState(null, "", location.pathname);
    }
  });
});

describe("orientation_layout", () => {
  const tabs = [
    { name: "A", card: { type: "markdown" } },
    { name: "B", card: { type: "markdown" } },
  ];
  // A fake screen whose orientation the test can turn.
  const screen = (portrait: boolean) => {
    const listeners = new Set<(e: any) => void>();
    const mql = {
      matches: portrait,
      addEventListener: (_: string, fn: any) => listeners.add(fn),
      removeEventListener: (_: string, fn: any) => listeners.delete(fn),
    };
    (window as any).matchMedia = (q: string) =>
      q === "(orientation: portrait)" ? mql : { matches: false, addEventListener() {}, removeEventListener() {} };
    return {
      turn(p: boolean) {
        mql.matches = p;
        listeners.forEach((fn) => fn({ matches: p }));
      },
      listeners,
    };
  };
  const pos = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar").position;
  const root = (el: any) => el.shadowRoot.querySelector(".root").className;

  it("puts the bar at the bottom in portrait and on the left in landscape, following turns", async () => {
    const s = screen(true);
    try {
      const el = await mount({ orientation_layout: true, tabs });
      expect(pos(el)).toBe("bottom");
      expect(root(el)).toContain("pos-bottom");
      s.turn(false);
      await el.updateComplete;
      expect(pos(el)).toBe("left");
      expect(root(el)).toContain("pos-left");
      el.remove();
      expect(s.listeners.size).toBe(0);
    } finally {
      delete (window as any).matchMedia;
    }
  });

  it("takes its own positions; without it position stays as set", async () => {
    screen(false);
    try {
      const el = await mount({ orientation_layout: { portrait: "top", landscape: "right" }, tabs });
      expect(pos(el)).toBe("right");
      el.remove();
      const off = await mount({ position: "bottom", tabs });
      expect(pos(off)).toBe("bottom");
      off.remove();
    } finally {
      delete (window as any).matchMedia;
    }
  });
});

describe("view tabs", () => {
  it("a view: tab shows a tabdeck-view-card for that view", async () => {
    const el = await mount({ tabs: [{ name: "Energy", view: "/energy/use" }, { name: "B", card: { type: "markdown" } }] });
    const card = el.shadowRoot.querySelector('[data-type="custom:tabdeck-view-card"]');
    expect(card).toBeTruthy();
    el.remove();
  });
});

describe("url tabs", () => {
  it("a url: tab shows HA's iframe card for that page", async () => {
    const el = await mount({ tabs: [{ name: "Web", url: "http://x/y", aspect_ratio: "75%" }] });
    expect(el.shadowRoot.querySelector('[data-type="iframe"]')).toBeTruthy();
    el.remove();
  });
});

describe("markdown tabs", () => {
  it("a markdown: tab shows HA's markdown card with that content", async () => {
    const el = await mount({ tabs: [{ name: "Notes", markdown: "- Bins out on **Tuesday**" }] });
    expect(el.shadowRoot.querySelector('[data-type="markdown"]')).toBeTruthy();
    expect(el._config.tabs[0].card.content).toBe("- Bins out on **Tuesday**");
    el.remove();
  });
});

describe("empty_message", () => {
  // A fake ResizeObserver the test drives; cards report their height through
  // getBoundingClientRect.
  const observers: { cb: () => void; el: Element; off: boolean }[] = [];
  class FakeRO {
    private o: { cb: () => void; el: Element; off: boolean } | undefined;
    constructor(private cb: () => void) {}
    observe(el: Element) {
      this.o = { cb: this.cb, el, off: false };
      observers.push(this.o);
    }
    disconnect() {
      if (this.o) this.o.off = true;
    }
  }
  const fire = () => observers.filter((o) => !o.off).forEach((o) => o.cb());
  const setHeight = (el: any, h: number) => (el.getBoundingClientRect = () => ({ height: h }) as DOMRect);

  it("shows the message once the open tab's card has stayed 0 px tall, and hides it when the card has a height", async () => {
    const real = (window as any).ResizeObserver;
    (window as any).ResizeObserver = FakeRO;
    try {
      const el = await mount({
        tabs: [
          { name: "Alerts", empty_message: { text: "All alerts are clear" }, card: { type: "vertical-stack" } },
          { name: "B", card: { type: "markdown" } },
        ],
      });
      await el.updateComplete;
      const card = el.shadowRoot.querySelector('[data-type="vertical-stack"]');
      setHeight(card, 0);
      fire();
      expect(el.shadowRoot.querySelector(".empty-msg")).toBeNull();
      await new Promise((r) => setTimeout(r, 850));
      await el.updateComplete;
      const msg = el.shadowRoot.querySelector(".panel:not([hidden]) .empty-msg");
      expect(msg?.textContent).toContain("Nothing to show right now");
      expect(msg?.textContent).toContain("All alerts are clear");
      setHeight(card, 80);
      fire();
      await el.updateComplete;
      expect(el.shadowRoot.querySelector(".empty-msg")).toBeNull();
      el.remove();
    } finally {
      (window as any).ResizeObserver = real;
    }
  });

  it("watches again after Home Assistant moves the card (disconnect + reconnect)", async () => {
    const real = (window as any).ResizeObserver;
    (window as any).ResizeObserver = FakeRO;
    try {
      const el = await mount({ tabs: [{ name: "A", empty_message: true, card: { type: "vertical-stack" } }] });
      await el.updateComplete;
      const card = el.shadowRoot.querySelector('[data-type="vertical-stack"]');
      setHeight(card, 0);
      el.remove();
      document.body.appendChild(el);
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));
      fire();
      await new Promise((r) => setTimeout(r, 850));
      await el.updateComplete;
      expect(el.shadowRoot.querySelector(".empty-msg")).toBeTruthy();
      el.remove();
    } finally {
      (window as any).ResizeObserver = real;
    }
  });

  it("loading_placeholder shows grey boxes until the card has a height, and not again for it", async () => {
    const real = (window as any).ResizeObserver;
    (window as any).ResizeObserver = FakeRO;
    try {
      const el = await mount({
        loading_placeholder: true,
        tabs: [
          { name: "A", card: { type: "vertical-stack" } },
          { name: "B", card: { type: "markdown" } },
        ],
      });
      await el.updateComplete;
      const card = el.shadowRoot.querySelector('[data-type="vertical-stack"]');
      setHeight(card, 0);
      fire();
      await el.updateComplete;
      expect(el.shadowRoot.querySelectorAll(".panel:not([hidden]) .loading-boxes span")).toHaveLength(3);
      setHeight(card, 200);
      fire();
      await el.updateComplete;
      expect(el.shadowRoot.querySelector(".loading-boxes")).toBeNull();
      // Away and back: the card has loaded, so no boxes even at 0 px.
      el.selectTab(1);
      await el.updateComplete;
      el.selectTab(0);
      await el.updateComplete;
      setHeight(card, 0);
      fire();
      await el.updateComplete;
      expect(el.shadowRoot.querySelector(".loading-boxes")).toBeNull();
      el.remove();
    } finally {
      (window as any).ResizeObserver = real;
    }
  });

  it("watches nothing on tabs without it", async () => {
    const real = (window as any).ResizeObserver;
    (window as any).ResizeObserver = FakeRO;
    observers.length = 0;
    try {
      const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
      await el.updateComplete;
      expect(observers.filter((o) => (o.el as HTMLElement).classList?.contains("panel"))).toHaveLength(0);
      el.remove();
    } finally {
      (window as any).ResizeObserver = real;
    }
  });
});

describe("friendly_errors", () => {
  // Cards whose type starts with "broken" come back as HA's error card.
  const errorCards = (cfg: any) => {
    const el = document.createElement("hui-error-card") as any;
    el._config = { type: "error", error: "Custom element doesn't exist: weather-radar-card.", origConfig: cfg };
    return el;
  };
  async function mountErr(raw: any, flags: { editMode?: boolean } = {}) {
    const prev = (window as any).loadCardHelpers;
    (window as any).loadCardHelpers = async () => ({
      createCardElement: (config: any) => {
        if (String(config.type).startsWith("custom:weather")) return errorCards(config);
        const el = document.createElement("div") as any;
        el.setAttribute("data-type", config.type ?? "");
        return el;
      },
    });
    try {
      await import("./tabdeck-card");
      const el = document.createElement("tabdeck-card") as any;
      el.setConfig(raw);
      if (flags.editMode) el.editMode = true;
      document.body.appendChild(el);
      el.hass = { states: {} };
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));
      await el.updateComplete;
      return el;
    } finally {
      (window as any).loadCardHelpers = prev;
    }
  }
  const tabs = [
    { name: "Home", card: { type: "markdown" } },
    { name: "Weather", card: { type: "custom:weather-radar-card" } },
  ];

  it("badges the broken tab, explains it in plain words and hides HA's error card", async () => {
    const el = await mountErr({ friendly_errors: true, tabs });
    el._scanErrors();
    await el.updateComplete;
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar.items[1].badgeIcon).toBe("mdi:alert-circle");
    expect(bar.items[0].badgeIcon).toBeUndefined();
    el.selectTab(1);
    await el.updateComplete;
    const box = el.shadowRoot.querySelector(".panel:not([hidden]) .card-errors");
    expect(box.textContent).toContain("custom:weather-radar-card isn't installed");
    expect(box.textContent).toContain("Edit the dashboard to fix it");
    expect(el.shadowRoot.querySelector("hui-error-card").style.display).toBe("none");
    el.remove();
  });

  it("keeps HA's error card visible in edit mode, and does nothing without the option", async () => {
    const edit = await mountErr({ friendly_errors: true, tabs }, { editMode: true });
    edit._scanErrors();
    await edit.updateComplete;
    expect(edit.shadowRoot.querySelector("hui-error-card").style.display).toBe("");
    expect(edit.shadowRoot.querySelector("tabdeck-tabbar").items[1].badgeIcon).toBe("mdi:alert-circle");
    edit.remove();
    const off = await mountErr({ tabs });
    off._scanErrors();
    await off.updateComplete;
    expect(off.shadowRoot.querySelector("tabdeck-tabbar").items[1].badgeIcon).toBeUndefined();
    expect(off.shadowRoot.querySelector(".card-errors")).toBeNull();
    off.remove();
  });
});

describe("auto_refresh", () => {
  const tabs = [
    { name: "Cam", auto_refresh: 5, card: { type: "picture-entity" } },
    { name: "Web", auto_refresh: 1, card: { type: "iframe" } },
    { name: "Plain", card: { type: "markdown" } },
  ];
  const cardOf = (el: any, type: string) => el.shadowRoot.querySelector(`[data-type="${type}"]`);

  it("rebuilds the open tab's card when it's due, frees due tabs off screen, leaves others alone", async () => {
    const el = await mount({ tabs });
    const t0 = el._builtAt;
    const cam = cardOf(el, "picture-entity");
    const web = cardOf(el, "iframe");
    const plain = cardOf(el, "markdown");
    el._refreshTick(t0 + 4 * 60_000);
    await el.updateComplete;
    expect(cardOf(el, "picture-entity")).toBe(cam);
    expect(el._manager.isLoaded(1)).toBe(false);
    el._refreshTick(t0 + 5 * 60_000);
    await el.updateComplete;
    const fresh = cardOf(el, "picture-entity");
    expect(fresh).toBeTruthy();
    expect(fresh).not.toBe(cam);
    expect(cardOf(el, "markdown")).toBe(plain);
    // The freed tab is built fresh when opened, and counts from then.
    el.selectTab(1);
    await el.updateComplete;
    const web2 = cardOf(el, "iframe");
    expect(web2).not.toBe(web);
    el.remove();
  });

  it("holds while someone is using the card, and normalises the minutes", async () => {
    const el = await mount({ tabs });
    const cam = cardOf(el, "picture-entity");
    el._isBusy = () => true;
    el._refreshTick(el._builtAt + 10 * 60_000);
    await el.updateComplete;
    expect(cardOf(el, "picture-entity")).toBe(cam);
    expect(el._config.tabs[0].auto_refresh).toBe(5);
    el.remove();
    const { normalizeTab } = await import("./lib/config");
    expect(normalizeTab({ auto_refresh: 0.01, card: {} }).auto_refresh).toBe(0.1);
    expect(normalizeTab({ auto_refresh: "x", card: {} }).auto_refresh).toBeUndefined();
  });
});

describe("size controls", () => {
  it("puts a tab's zoom, padding and spacing on its panel only", async () => {
    const el = await mount({
      tabs: [
        { name: "Wall", zoom: 0.8, padding: 4, spacing: "2px", cards: [{ type: "tile" }, { type: "tile" }] },
        { name: "B", card: { type: "markdown" } },
      ],
    });
    const [a, b] = el.shadowRoot.querySelectorAll(".panel");
    expect(a.style.zoom).toBe("0.8");
    expect(a.style.padding).toBe("4px");
    expect(a.style.getPropertyValue("--vertical-stack-card-gap")).toBe("2px");
    expect(b.getAttribute("style") ?? "").toBe("");
    el.remove();
  });
});

describe("scroll_memory", () => {
  it("returns to where each tab was left; a new tab keeps the page where it is", async () => {
    const realScrollTo = window.scrollTo;
    const realRaf = window.requestAnimationFrame;
    let y = 0;
    const realY = Object.getOwnPropertyDescriptor(window, "scrollY");
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => y });
    (window as any).scrollTo = (o: any) => (y = typeof o === "object" ? o.top : o);
    (window as any).requestAnimationFrame = (fn: any) => setTimeout(fn, 0);
    try {
      const el = await mount({
        scroll_memory: true,
        storage_key: "scroll-test",
        tabs: [
          { name: "Long", card: { type: "markdown" } },
          { name: "Other", card: { type: "markdown" } },
        ],
      });
      y = 640;
      el.selectTab(1);
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 5));
      expect(y).toBe(640);
      y = 120;
      el.selectTab(0);
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 5));
      expect(y).toBe(640);
      el.selectTab(1);
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 5));
      expect(y).toBe(120);
      el.remove();
      // Off: switching never scrolls.
      const off = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }, { name: "B", card: { type: "markdown" } }] });
      y = 300;
      off.selectTab(1);
      y = 10;
      off.selectTab(0);
      await off.updateComplete;
      await new Promise((r) => setTimeout(r, 5));
      expect(y).toBe(10);
      off.remove();
    } finally {
      window.scrollTo = realScrollTo;
      window.requestAnimationFrame = realRaf;
      if (realY) Object.defineProperty(window, "scrollY", realY);
      else delete (window as any).scrollY;
    }
  });
});

describe("page_background", () => {
  it("gives the view the open tab's background and puts the view's own back", async () => {
    await import("./tabdeck-card");
    const container = document.createElement("hui-view-container");
    const bg = document.createElement("hui-view-background");
    bg.style.setProperty("--view-background", "pink");
    container.append(bg);
    document.body.append(container);
    const el = document.createElement("tabdeck-card") as any;
    el.setConfig({
      tabs: [
        { name: "Night", page_background: "linear-gradient(160deg, #0d3b66, #1e88a8)", card: { type: "markdown" } },
        { name: "Day", card: { type: "markdown" } },
        { name: "Photo", page_background: "/local/sky.jpg", card: { type: "markdown" } },
      ],
    });
    container.append(el);
    el.hass = { states: {} };
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    const val = () => bg.style.getPropertyValue("--view-background");
    expect(val()).toBe("linear-gradient(160deg, #0d3b66, #1e88a8)");
    el.selectTab(1);
    await el.updateComplete;
    expect(val()).toBe("pink");
    el.selectTab(2);
    await el.updateComplete;
    expect(val()).toContain('url("/local/sky.jpg")');
    el.remove();
    expect(val()).toBe("pink");
    container.remove();
  });
});

describe("ring_style", () => {
  it("bar passes the tab's ring value to a progress bar", async () => {
    const el = await mountWith(
      {
        tabs: [
          { name: "Home", card: { type: "markdown" } },
          { name: "Washer", ring: "sensor.washer", ring_max: 200, ring_style: "bar", card: { type: "markdown" } },
          { name: "Dryer", ring: "40", ring_style: "nonsense", card: { type: "markdown" } },
        ],
      },
      { states: { "sensor.washer": { state: "130" } } },
    );
    expect(el._config.tabs[1].ring_style).toBe("bar");
    expect(el._config.tabs[2].ring_style).toBeUndefined();
    const tabs = el.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelectorAll("tabdeck-tab");
    expect(tabs[1].ringStyle).toBe("bar");
    expect(tabs[1].ring).toBe(65);
    expect(tabs[2].ringStyle).toBeUndefined();
  });
});

describe("graph", () => {
  const history = (calls: any[]) => async (msg: any) => {
    calls.push(msg);
    const now = Date.now() / 1000;
    return { "sensor.temp": [{ s: "19", lu: now - 7200 }, { s: "21.5", lu: now - 600 }] };
  };

  it("draws a tab's mini graph from one history fetch", async () => {
    const calls: any[] = [];
    const el = await mountWith(
      {
        tabs: [
          { name: "Home", card: { type: "markdown" } },
          { name: "Climate", graph: { entity: "sensor.temp", hours: 1, color: "red" }, card: { type: "markdown" } },
          { name: "Bad", graph: "nonsense", card: { type: "markdown" } },
        ],
      },
      { states: {}, callWS: history(calls) },
    );
    el.hass = { ...el.hass };
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({ type: "history/history_during_period", entity_ids: ["sensor.temp"] });
    expect(el._config.tabs[2].graph).toBeUndefined();
    const tabs = el.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelectorAll("tabdeck-tab");
    await tabs[1].updateComplete;
    const line = tabs[1].shadowRoot.querySelector(".graph polyline");
    expect(line.getAttribute("points")).toMatch(/^0,11 /);
    expect(line.style.stroke).toBe("var(--red-color, red)");
    expect(tabs[0].shadowRoot.querySelector(".graph")).toBeNull();
  });

  it("fetches nothing while the bar isn't shown", async () => {
    const calls: any[] = [];
    const el = await mountWith(
      { hide_bar: true, tabs: [{ name: "Climate", graph: "sensor.temp", card: { type: "markdown" } }] },
      { states: {}, callWS: history(calls) },
    );
    el.hass = { ...el.hass };
    await el.updateComplete;
    expect(calls).toHaveLength(0);
  });
});

describe("countdown", () => {
  it("shows a running timer's time left as the badge and ticks only while it runs", async () => {
    const end = new Date(Date.now() + 90_500).toISOString();
    const states: any = {
      "timer.pasta": { entity_id: "timer.pasta", state: "active", attributes: { finishes_at: end, remaining: "0:15:00" } },
    };
    const el = await mountWith(
      {
        tabs: [
          { name: "Home", card: { type: "markdown" } },
          { name: "Kitchen", countdown: "timer.pasta", badge: "2", card: { type: "markdown" } },
        ],
      },
      { states },
    );
    const tab = () => el.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelectorAll("tabdeck-tab")[1];
    expect(tab().badge).toMatch(/^1:3[01]$/);
    expect(el._countdownTimer).toBeDefined();
    // Paused: the remaining time, no tick.
    states["timer.pasta"] = { entity_id: "timer.pasta", state: "paused", attributes: { remaining: "0:01:05" } };
    el.hass = { states: { ...states } };
    await el.updateComplete;
    expect(tab().badge).toBe("1:05");
    expect(el._countdownTimer).toBeUndefined();
    // Idle: back to the tab's own badge.
    states["timer.pasta"] = { entity_id: "timer.pasta", state: "idle", attributes: {} };
    el.hass = { states: { ...states } };
    await el.updateComplete;
    expect(tab().badge).toBe("2");
    // Running again but removed from the page: no tick.
    states["timer.pasta"] = { entity_id: "timer.pasta", state: "active", attributes: { finishes_at: end } };
    el.hass = { states: { ...states } };
    expect(el._countdownTimer).toBeDefined();
    el.remove();
    expect(el._countdownTimer).toBeUndefined();
  });
});

describe("badges (extra)", () => {
  it("resolves each extra badge like the main one and hides inactive ones", async () => {
    const el = await mountWith(
      {
        hide_inactive_badge: true,
        tabs: [
          {
            name: "Security",
            badge: "sensor.open",
            badges: [
              { badge: "binary_sensor.alarm", icon: "mdi:alert", color: "orange" },
              { badge: "sensor.zero" },
              { icon: "mdi:lock", color: "green" },
              { badge: "sensor.temp", color: "nonsense;" },
              "junk",
            ],
            card: { type: "markdown" },
          },
        ],
      },
      {
        states: {
          "sensor.open": { state: "3" },
          "binary_sensor.alarm": { state: "on" },
          "sensor.zero": { state: "0" },
          "sensor.temp": { state: "21.46" },
        },
      },
    );
    expect(el._config.tabs[0].badges).toHaveLength(4);
    const tab = el.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelector("tabdeck-tab");
    expect(tab.badge).toBe("3");
    expect(tab.extraBadges.map((b: any) => b.icon ?? b.text)).toEqual(["mdi:alert", "mdi:lock", "21.46"]);
    expect(tab.extraBadges[0].color).toBe("var(--orange-color, orange)");
  });
});

describe("badge_bounce", () => {
  it("turns bounce on for tabs, except while a countdown ticks", async () => {
    const end = new Date(Date.now() + 60_000).toISOString();
    const el = await mountWith(
      {
        badge_bounce: true,
        tabs: [
          { name: "Post", badge: "2", card: { type: "markdown" } },
          { name: "Kitchen", countdown: "timer.t", card: { type: "markdown" } },
        ],
      },
      { states: { "timer.t": { entity_id: "timer.t", state: "active", attributes: { finishes_at: end } } } },
    );
    const tabs = el.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelectorAll("tabdeck-tab");
    expect(tabs[0].bounce).toBe(true);
    expect(tabs[1].bounce).toBe(false);
    const off = await mount({ tabs: [{ name: "Post", badge: "2", card: { type: "markdown" } }] });
    expect(off.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelector("tabdeck-tab").bounce).toBe(false);
  });
});

describe("hidden_alerts", () => {
  it("turns on the ⋯ menu with its attention count", async () => {
    const el = await mount({ hidden_alerts: true, tabs: [{ name: "A", card: { type: "markdown" } }] });
    const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
    expect(bar.overflowMenu).toBe(true);
    expect(bar.hiddenAlerts).toBe(true);
    const off = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    expect(off.shadowRoot.querySelector("tabdeck-tabbar").hiddenAlerts).toBe(false);
  });
});

describe("summary_chip", () => {
  const alertOn = (e: string) => [{ condition: "state", entity: e, state: "on" }];
  const tabs = [
    { name: "Home", card: { type: "markdown" } },
    { name: "Leak", alert: alertOn("binary_sensor.leak"), card: { type: "markdown" } },
    { name: "Doors", alert: alertOn("binary_sensor.door"), card: { type: "markdown" } },
  ];
  const chip = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelector(".summary-chip");

  it("counts alerting tabs and jumps to the next one on click", async () => {
    const states: any = { "binary_sensor.leak": { state: "on" }, "binary_sensor.door": { state: "on" } };
    const el = await mountWith({ summary_chip: true, tabs }, { states });
    await el.shadowRoot.querySelector("tabdeck-tabbar").updateComplete;
    expect(chip(el).textContent).toContain("2 alerts");
    chip(el).click();
    await el.updateComplete;
    expect(el._selected).toBe(1);
    chip(el).click();
    await el.updateComplete;
    expect(el._selected).toBe(2);
    chip(el).click();
    await el.updateComplete;
    expect(el._selected).toBe(1);
    el.hass = { states: { "binary_sensor.leak": { state: "off" }, "binary_sensor.door": { state: "off" } } };
    await el.updateComplete;
    await el.shadowRoot.querySelector("tabdeck-tabbar").updateComplete;
    expect(chip(el)).toBeNull();
  });

  it("shows custom text with {n}, an icon and a colour; nothing without the option", async () => {
    const states: any = { "binary_sensor.leak": { state: "on" }, "binary_sensor.door": { state: "off" } };
    const el = await mountWith({ summary_chip: { text: "{n} to check", icon: "mdi:bell", color: "red" }, tabs }, { states });
    await el.shadowRoot.querySelector("tabdeck-tabbar").updateComplete;
    expect(chip(el).textContent).toContain("1 to check");
    expect(chip(el).querySelector("ha-icon").getAttribute("icon")).toBe("mdi:bell");
    expect(chip(el).style.background).toBe("var(--red-color, red)");
    const off = await mountWith({ tabs }, { states });
    expect(chip(off)).toBeNull();
  });
});
