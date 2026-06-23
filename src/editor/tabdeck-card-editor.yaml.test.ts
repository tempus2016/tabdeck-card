import { describe, it, expect, vi, beforeAll } from "vitest";
import "./tabdeck-card-editor";

// In this file ha-yaml-editor IS registered but hui-card-element-editor is NOT,
// so the editor must fall back to ha-yaml-editor for nested card editing.
beforeAll(() => {
  if (!customElements.get("ha-yaml-editor")) {
    customElements.define(
      "ha-yaml-editor",
      class extends HTMLElement {
        _defaultValue: any;
        set defaultValue(v: any) {
          this._defaultValue = v;
        }
        get defaultValue() {
          return this._defaultValue;
        }
      },
    );
  }
});

async function mount(config: any) {
  const el = document.createElement("tabdeck-card-editor") as any;
  el.hass = { states: {} };
  el.setConfig(config);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("tabdeck-card-editor ha-yaml-editor fallback", () => {
  it("drills into ha-yaml-editor seeded with the tab's card", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown", content: "hi" } }] });
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    const yaml = el.shadowRoot.querySelector("ha-yaml-editor") as any;
    expect(yaml).toBeTruthy();
    expect(yaml.defaultValue).toEqual({ type: "markdown", content: "hi" });
    expect(el.shadowRoot.querySelector("hui-card-element-editor")).toBeNull();
  });

  it("patches the tab card on ha-yaml-editor value-changed (valid yaml)", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const yaml = el.shadowRoot.querySelector("ha-yaml-editor") as any;
    yaml.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: { type: "light", entity: "light.kitchen" }, isValid: true },
        bubbles: true,
        composed: true,
      }),
    );
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls.at(-1)![0].detail.config.tabs[0].card).toEqual({
      type: "light",
      entity: "light.kitchen",
    });
  });

  it("ignores ha-yaml-editor value-changed when invalid", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const yaml = el.shadowRoot.querySelector("ha-yaml-editor") as any;
    yaml.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: undefined, isValid: false },
        bubbles: true,
        composed: true,
      }),
    );
    expect(handler).not.toHaveBeenCalled();
  });
});
