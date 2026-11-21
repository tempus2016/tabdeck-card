import { describe, it, expect, beforeAll } from "vitest";

// Big decks (auto_tabs with 100+ tabs) must stay fast. Timings are printed
// so a change can be compared before / after; the budgets are loose enough
// for a busy CI machine but catch a return to per-tab work on every update.
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

const N = 140;
const tabs = Array.from({ length: N }, (_, i) => ({
  name: `Tab ${i + 1}`,
  icon: "mdi:numeric",
  badge: i % 3 === 0 ? `sensor.s${i}` : undefined,
  card: { type: "entities", entities: [`sensor.s${i}`] },
}));
const states: Record<string, any> = {};
for (let i = 0; i < N; i++) states[`sensor.s${i}`] = { entity_id: `sensor.s${i}`, state: String(i), attributes: {} };

async function settle(el: any) {
  await el.updateComplete;
  const bar = el.shadowRoot?.querySelector("tabdeck-tabbar");
  if (bar) await bar.updateComplete;
}

async function run(extra: Record<string, any>) {
  await import("./tabdeck-card");
  const el = document.createElement("tabdeck-card") as any;
  let t = performance.now();
  el.setConfig({ tabs, ...extra });
  document.body.appendChild(el);
  el.hass = { states };
  await settle(el);
  await new Promise((r) => setTimeout(r, 0));
  await settle(el);
  const mount = performance.now() - t;

  t = performance.now();
  for (let i = 1; i <= 20; i++) {
    el.selectTab(i * 5);
    await settle(el);
  }
  const perSwitch = (performance.now() - t) / 20;

  t = performance.now();
  for (let i = 0; i < 20; i++) {
    el.hass = { states: { ...states, [`sensor.s${i * 3}`]: { ...states[`sensor.s${i * 3}`], state: `x${i}` } } };
    await settle(el);
  }
  const perHass = (performance.now() - t) / 20;
  const tabEls = el.shadowRoot.querySelector("tabdeck-tabbar").shadowRoot.querySelectorAll("tabdeck-tab").length;
  const cards = el.shadowRoot.querySelectorAll(".panel > [data-type]").length;
  el.remove();
  return { mount, perSwitch, perHass, tabEls, cards };
}

const fmt = (name: string, r: Awaited<ReturnType<typeof run>>) =>
  `[big-deck] ${name}: tabs=${N} mount=${r.mount.toFixed(1)}ms switch=${r.perSwitch.toFixed(2)}ms hass=${r.perHass.toFixed(2)}ms tab elements=${r.tabEls} cards in DOM=${r.cards}`;

describe("big deck speed (140 tabs)", () => {
  it("default deck: every tab drawn, every card built", async () => {
    const r = await run({ scrollable: true });
    console.log(fmt("default", r));
    expect(r.tabEls).toBe(N);
    expect(r.mount).toBeLessThan(5000);
    expect(r.perSwitch).toBeLessThan(400);
    expect(r.perHass).toBeLessThan(400);
  }, 30000);

  it("big-deck setup (bar_limit + lazy): a page of tabs and only opened cards", async () => {
    const r = await run({ bar_limit: 8, lazy: true });
    console.log(fmt("bar_limit 8 + lazy", r));
    expect(r.tabEls).toBe(8);
    // The open tab plus the 20 visited.
    expect(r.cards).toBeLessThanOrEqual(21);
    expect(r.mount).toBeLessThan(2500);
    expect(r.perSwitch).toBeLessThan(200);
    expect(r.perHass).toBeLessThan(200);
  }, 30000);
});
