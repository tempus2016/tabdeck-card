import { describe, expect, it, vi } from "vitest";
import { findRefTab, hasTabRefs, parseTabRef, placeholderTabs, resolveTabRef, resolveTabRefs } from "./tab-ref";

const family = {
  views: [
    { path: "home", cards: [{ type: "markdown", content: "hi" }] },
    {
      path: "outside",
      title: "Outside",
      sections: [
        {
          cards: [
            {
              type: "vertical-stack",
              cards: [
                {
                  type: "custom:tabdeck-card",
                  tab_defaults: { accent: "blue", name: "never" },
                  tab_templates: { wx: { icon: "mdi:weather-{{ item.kind }}", card: { type: "weather-forecast", entity: "weather.home" } } },
                  tabs: [
                    { name: "Weather", use: "wx", vars: { kind: "rainy" } },
                    { name: "Garden Lights", card: { type: "entities", entities: ["light.garden"] }, children: [{ name: "Shed", card: { type: "markdown" } }] },
                    { name: "Loop", tab_ref: "family/loop" },
                    { name: "Hop", tab_ref: "family/weather", badge: "1" },
                    { name: "Nest", card: { type: "custom:tabdeck-card", tabs: [{ tab_ref: "family/nest" }] } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const load = vi.fn(async (d: string) => {
  if (d === "family") return family;
  throw new Error("not found");
});

describe("tab_ref", () => {
  it("parses dashboard/tab and dashboard/view/tab", () => {
    expect(parseTabRef("family/weather")).toEqual({ dashboard: "family", tab: "weather" });
    expect(parseTabRef("/family/outside/Weather/")).toEqual({ dashboard: "family", view: "outside", tab: "Weather" });
    for (const bad of ["family", "a/b/c/d", "a//b", 3, undefined]) expect(parseTabRef(bad)).toBeUndefined();
    expect(hasTabRefs({ tabs: [{ name: "a" }, { tab_ref: "x/y" }] })).toBe(true);
    expect(hasTabRefs({ tabs: [{ name: "a" }] })).toBe(false);
  });

  it("finds a tab anywhere in the dashboard by name, case or slug, children too", () => {
    expect(findRefTab(family, parseTabRef("family/Weather")!)!.tab.name).toBe("Weather");
    expect(findRefTab(family, parseTabRef("family/garden-lights")!)!.tab.name).toBe("Garden Lights");
    expect(findRefTab(family, parseTabRef("family/outside/shed")!)!.tab.name).toBe("Shed");
    expect(findRefTab(family, parseTabRef("family/home/weather")!)).toBeUndefined();
  });

  it("applies the source deck's templates and defaults, and follows a chained ref", async () => {
    expect(await resolveTabRef("family/weather", load)).toEqual({
      tab: { name: "Weather", accent: "blue", icon: "mdi:weather-rainy", card: { type: "weather-forecast", entity: "weather.home" }, use: "wx", vars: { kind: "rainy" } },
    });
    const hop = await resolveTabRef("family/hop", load);
    expect(hop.tab).toMatchObject({ name: "Hop", badge: "1", icon: "mdi:weather-rainy" });
    expect(hop.tab!.tab_ref).toBeUndefined();
  });

  it("reports errors and stops loops", async () => {
    expect(await resolveTabRef("nope", load)).toEqual({ error: "bad_ref" });
    expect(await resolveTabRef("other/weather", load)).toEqual({ error: "missing_dashboard" });
    expect(await resolveTabRef("family/nothing", load)).toEqual({ error: "missing_tab" });
    expect(await resolveTabRef("family/loop", load)).toEqual({ error: "loop" });
    expect(await resolveTabRef("family/nest", load)).toEqual({ error: "loop" });
  });

  it("swaps every ref in a deck, local keys on top, errors as a message tab", async () => {
    const raw = { tabs: [{ tab_ref: "family/weather", name: "Rain" }, { tab_ref: "family/<b>", icon: "mdi:x" }, { name: "Lights", card: { type: "x" } }] };
    const ph = placeholderTabs(raw);
    expect(ph.tabs[0]).toMatchObject({ name: "Rain", icon: "mdi:link-variant", card: { type: "vertical-stack", cards: [] } });
    expect(ph.tabs[1].name).toBe("<b>");
    const out = await resolveTabRefs(raw, load, (e, v) => `${e} ${v.tab} on ${v.dashboard}`);
    expect(out.tabs[0]).toMatchObject({ name: "Rain", tab_ref: "family/weather", card: { type: "weather-forecast" } });
    expect(out.tabs[1]).toMatchObject({ name: "<b>", icon: "mdi:x", card: { type: "markdown" } });
    expect(out.tabs[1].card.content).toBe('<ha-alert alert-type="warning">missing_tab &lt;b&gt; on family</ha-alert>');
    expect(out.tabs[2]).toBe(raw.tabs[2]);
  });
});
