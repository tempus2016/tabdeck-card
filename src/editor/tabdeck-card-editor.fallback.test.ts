import { describe, it, expect, vi } from "vitest";
import "./tabdeck-card-editor";

// In this file NEITHER hui-card-element-editor NOR ha-yaml-editor is registered,
// so the editor must fall back to the raw JSON textarea for nested card editing.

async function mount(config: any) {
  const el = document.createElement("tabdeck-card-editor") as any;
  el.hass = { states: {} };
  el.setConfig(config);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("tabdeck-card-editor JSON fallback", () => {
  it("edits a tab's card via the JSON editor when valid", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    el.shadowRoot.querySelector(".tab-header").click();
    await el.updateComplete;
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const ta = el.shadowRoot.querySelector(".tab-card-json");
    expect(ta).toBeTruthy();
    ta.value = '{"type":"light","entity":"light.kitchen"}';
    ta.dispatchEvent(new Event("change"));
    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls.at(-1)![0].detail.config.tabs[0].card).toEqual({
      type: "light",
      entity: "light.kitchen",
    });
  });

  it("does not emit when the card JSON is invalid", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    el.shadowRoot.querySelector(".tab-header").click();
    await el.updateComplete;
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const ta = el.shadowRoot.querySelector(".tab-card-json");
    ta.value = "{ not valid json";
    ta.dispatchEvent(new Event("change"));
    await el.updateComplete;
    expect(handler).not.toHaveBeenCalled();
    expect(el.shadowRoot.querySelector(".tab-card-error")).toBeTruthy();
  });
});

describe("conditions fallback", () => {
  it("falls back to a YAML/JSON editor when HA's conditions editor is missing", async () => {
    const el = document.createElement("tabdeck-card-editor") as any;
    el.hass = { states: {} };
    el.setConfig({ tabs: [{ name: "A", card: {}, visibility: [{ condition: "user", users: ["x"] }] }] });
    document.body.appendChild(el);
    await el.updateComplete;
    el.shadowRoot.querySelector(".tab-header").click();
    await el.updateComplete;
    const section = el.shadowRoot.querySelector('.conditions-section[data-key="visibility"]');
    expect(section.querySelector("ha-card-conditions-editor")).toBeNull();
    const ta = section.querySelector("textarea.conditions-json");
    expect(JSON.parse(ta.value)).toEqual([{ condition: "user", users: ["x"] }]);
  });
});

describe("convert from another card (JSON fallback)", () => {
  it("previews and replaces tabs from a pasted tabbed-card", async () => {
    const el = document.createElement("tabdeck-card-editor") as any;
    el.hass = { states: {} };
    el.setConfig({ tabs: [{ name: "Old", card: { type: "markdown" } }] });
    document.body.appendChild(el);
    await el.updateComplete;
    const fired: any[] = [];
    el.addEventListener("config-changed", (e: any) => fired.push(e.detail.config));
    el.shadowRoot.querySelector(".convert-tab").click();
    await el.updateComplete;
    const ta = el.shadowRoot.querySelector(".convert-json");
    ta.value = JSON.stringify({
      type: "custom:tabbed-card",
      options: { defaultTabIndex: 1 },
      tabs: [
        { card: { type: "markdown" }, attributes: { label: "One" } },
        { card: { type: "map" }, attributes: { label: "Two" } },
      ],
    });
    ta.dispatchEvent(new Event("input"));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".convert-summary").textContent).toContain("tabbed-card");
    el.shadowRoot.querySelector(".convert-replace").click();
    const out = fired.at(-1)!;
    expect(out.tabs.map((t: any) => t.name)).toEqual(["One", "Two"]);
    expect(out.default_tab).toBe(1);
  });

  it("shows an error for input that isn't a card", async () => {
    const el = document.createElement("tabdeck-card-editor") as any;
    el.hass = { states: {} };
    el.setConfig({ tabs: [{ name: "Old", card: { type: "markdown" } }] });
    document.body.appendChild(el);
    await el.updateComplete;
    el.shadowRoot.querySelector(".convert-tab").click();
    await el.updateComplete;
    const ta = el.shadowRoot.querySelector(".convert-json");
    ta.value = '"just text"';
    ta.dispatchEvent(new Event("input"));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".import-error").textContent).toContain("doesn't look like a card");
  });
});
