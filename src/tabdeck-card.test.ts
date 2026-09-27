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
      color: "red",
      accent: "orange",
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
