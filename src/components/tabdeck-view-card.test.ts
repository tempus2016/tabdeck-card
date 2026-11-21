import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { clearDashboardCache } from "../lib/view-source";

beforeAll(() => {
  (window as any).loadCardHelpers = async () => ({
    createCardElement: (config: any) => {
      const el = document.createElement("div") as any;
      el.setAttribute("data-type", config.type ?? "");
      el.config = config;
      return el;
    },
  });
});

const flush = () => new Promise((r) => setTimeout(r, 0));

async function mount(view: any, callWS: any) {
  await import("./tabdeck-view-card");
  const el = document.createElement("tabdeck-view-card") as any;
  el.setConfig({ type: "custom:tabdeck-view-card", view });
  document.body.appendChild(el);
  el.hass = { callWS, language: "en" };
  for (let i = 0; i < 4; i++) await flush();
  await el.updateComplete;
  return el;
}

const dashboards: Record<string, any> = {
  energy: { views: [{ title: "Overview", path: "overview", cards: [{ type: "tile" }, { type: "gauge" }] }] },
  auto: { strategy: { type: "original-states" } },
};

describe("tabdeck-view-card", () => {
  let callWS: any;
  beforeEach(() => {
    clearDashboardCache();
    callWS = vi.fn(async (msg: any) => {
      const d = dashboards[msg.url_path];
      if (!d) throw { code: "config_not_found" };
      return d;
    });
  });

  it("shows the view's cards, reading the dashboard once for two tabs", async () => {
    const a = await mount("/energy/overview", callWS);
    const b = await mount("/energy/overview", callWS);
    const card = a.shadowRoot.querySelector("[data-type]");
    expect(card.getAttribute("data-type")).toBe("custom:tabdeck-masonry-card");
    expect(card.config.cards).toHaveLength(2);
    expect(b.shadowRoot.querySelector("[data-type]")).toBeTruthy();
    expect(callWS).toHaveBeenCalledTimes(1);
    a.remove();
    b.remove();
  });

  it("says when the dashboard or view is missing, or the dashboard is generated", async () => {
    const gone = await mount("/nope/x", callWS);
    expect(gone.shadowRoot.querySelector(".msg").textContent).toContain("There's no dashboard “nope”");
    const noView = await mount("/energy/missing", callWS);
    expect(noView.shadowRoot.querySelector(".msg").textContent).toContain("has no view “missing”");
    const gen = await mount("/auto", callWS);
    expect(gen.shadowRoot.querySelector(".msg").textContent).toContain("generated automatically");
    [gone, noView, gen].forEach((e) => e.remove());
  });

  it("refuses to show itself inside the same view", async () => {
    await import("./tabdeck-view-card");
    const outer = document.createElement("tabdeck-view-card") as any;
    outer.setConfig({ view: "/energy/overview" });
    document.body.appendChild(outer);
    const inner = document.createElement("tabdeck-view-card") as any;
    inner.setConfig({ view: "/energy/overview" });
    outer.appendChild(inner);
    inner.hass = { callWS, language: "en" };
    await flush();
    await inner.updateComplete;
    expect(inner.shadowRoot.querySelector(".msg").textContent).toContain("can't show it");
    outer.remove();
  });
});
