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
