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
