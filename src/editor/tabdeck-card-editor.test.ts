import { describe, it, expect, vi, beforeAll } from "vitest";
import "./tabdeck-card-editor";
import { pickCardEditorTag } from "./tabdeck-card-editor";

// In this file the native HA editor element IS available, so the editor should
// prefer hui-card-element-editor for nested card editing.
beforeAll(() => {
  if (!customElements.get("hui-card-element-editor")) {
    customElements.define(
      "hui-card-element-editor",
      class extends HTMLElement {
        _value: any;
        _hass: any;
        _lovelace: any;
        set value(v: any) {
          this._value = v;
        }
        get value() {
          return this._value;
        }
        set hass(h: any) {
          this._hass = h;
        }
        set lovelace(l: any) {
          this._lovelace = l;
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

// ha-form is not registered in jsdom, so we drive it the way HA does: by firing
// a value-changed carrying the full (merged) data object.
function formChange(form: any, value: any) {
  form.dispatchEvent(
    new CustomEvent("value-changed", { detail: { value }, bubbles: true, composed: true }),
  );
}

// The globals ha-form's current data for a default single-tab config; spread and
// override one field to simulate editing just that field.
function globalsData() {
  return {
    position: "top",
    style: "underline",
    remember: "none",
    default_tab: "A",
    scrollable: "auto",
    lazy: false,
    animated: true,
    swipe: false,
  };
}

describe("pickCardEditorTag", () => {
  it("prefers hui-card-element-editor when available", () => {
    expect(pickCardEditorTag((t) => t === "hui-card-element-editor")).toBe(
      "hui-card-element-editor",
    );
  });

  it("falls back to ha-yaml-editor when the native editor is missing", () => {
    expect(pickCardEditorTag((t) => t === "ha-yaml-editor")).toBe("ha-yaml-editor");
  });

  it("falls back to a JSON textarea when neither element exists", () => {
    expect(pickCardEditorTag(() => false)).toBe("textarea-json");
  });
});

describe("tabdeck-card-editor", () => {
  it("renders one block per tab", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }, { name: "B", card: {} }] });
    expect(el.shadowRoot.querySelectorAll(".tab")).toHaveLength(2);
  });

  it("fires config-changed when adding a tab", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    el.shadowRoot.querySelector(".add-tab").click();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.config.tabs).toHaveLength(2);
  });

  it("fires config-changed when deleting a tab", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }, { name: "B", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    el.shadowRoot.querySelectorAll(".delete-tab")[0].click();
    expect(handler.mock.calls[0][0].detail.config.tabs).toHaveLength(1);
    expect(handler.mock.calls[0][0].detail.config.tabs[0].name).toBe("B");
  });

  it("moves a tab down", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }, { name: "B", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    el.shadowRoot.querySelectorAll(".move-down")[0].click();
    expect(handler.mock.calls[0][0].detail.config.tabs[0].name).toBe("B");
  });

  it("edits a tab's accent and badge via its ha-form", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);

    const form = el.shadowRoot.querySelector(".tab-form");
    formChange(form, { name: "A", icon: "", accent: "#ff0000", badge: "" });
    expect(handler.mock.calls.at(-1)![0].detail.config.tabs[0].accent).toBe("#ff0000");

    formChange(form, { name: "A", icon: "", accent: "#ff0000", badge: "sensor.unread" });
    expect(handler.mock.calls.at(-1)![0].detail.config.tabs[0].badge).toBe("sensor.unread");
  });

  it("shows an 'Edit card' button per tab and no raw JSON textarea in list view", async () => {
    const el = await mount({
      tabs: [{ name: "A", card: { type: "markdown" } }, { name: "B", card: { type: "light" } }],
    });
    expect(el.shadowRoot.querySelectorAll(".edit-card")).toHaveLength(2);
    expect(el.shadowRoot.querySelector(".tab-card-json")).toBeNull();
    expect(el.shadowRoot.querySelector("hui-card-element-editor")).toBeNull();
  });

  it("drills into the native card editor with the tab's card as its value", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown", content: "hi" } }] });
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    // tab list is hidden while editing a card
    expect(el.shadowRoot.querySelector(".tabs")).toBeNull();
    const inner = el.shadowRoot.querySelector("hui-card-element-editor") as any;
    expect(inner).toBeTruthy();
    expect(inner.value).toEqual({ type: "markdown", content: "hi" });
    expect(inner._hass).toEqual({ states: {} });
    expect(inner._lovelace).toBeTruthy();
  });

  it("patches the tab card and re-emits the full config on the inner editor's config-changed", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const inner = el.shadowRoot.querySelector("hui-card-element-editor") as any;
    inner.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { type: "light", entity: "light.kitchen" } },
        bubbles: true,
        composed: true,
      }),
    );
    expect(handler).toHaveBeenCalledTimes(1);
    const cfg = handler.mock.calls.at(-1)![0].detail.config;
    // full tabdeck config is emitted, not the bare card config
    expect(cfg.tabs).toHaveLength(1);
    expect(cfg.tabs[0].card).toEqual({ type: "light", entity: "light.kitchen" });
  });

  it("adds a tab with no card type so the picker can choose one", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    el.shadowRoot.querySelector(".add-tab").click();
    const cfg = handler.mock.calls.at(-1)![0].detail.config;
    expect(cfg.tabs[1].card.type).toBeUndefined();
  });

  it("shows a card-type chooser for a typeless card and sets the chosen type", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }] });
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    const chooser = el.shadowRoot.querySelector(".card-type-form");
    expect(chooser).toBeTruthy();
    expect(el.shadowRoot.querySelector("hui-card-element-editor")).toBeNull();

    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    chooser.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: { type: "light" } },
        bubbles: true,
        composed: true,
      }),
    );
    expect(handler.mock.calls.at(-1)![0].detail.config.tabs[0].card).toEqual({ type: "light" });
  });

  it("'Change card type' resets the card so the chooser reappears", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown", content: "hi" } }] });
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("hui-card-element-editor")).toBeTruthy();
    const btn = el.shadowRoot.querySelector(".change-card-type") as HTMLButtonElement;
    expect(btn).toBeTruthy();

    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    btn.click();
    expect(handler.mock.calls.at(-1)![0].detail.config.tabs[0].card).toEqual({});
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".card-type-form")).toBeTruthy();
    expect(el.shadowRoot.querySelector("hui-card-element-editor")).toBeNull();
  });

  it("returns to the tab list when Back is pressed", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    el.shadowRoot.querySelector(".edit-card").click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".back-to-list")).toBeTruthy();
    el.shadowRoot.querySelector(".back-to-list").click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".tabs")).toBeTruthy();
    expect(el.shadowRoot.querySelector("hui-card-element-editor")).toBeNull();
  });

  it("changes the global default_tab via the globals ha-form", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }, { name: "B", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const form = el.shadowRoot.querySelector(".globals-form");
    formChange(form, { ...globalsData(), default_tab: "B" });
    expect(handler.mock.calls.at(-1)![0].detail.config.default_tab).toBe("B");
  });

  it("toggles the global animated option via the globals ha-form", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const form = el.shadowRoot.querySelector(".globals-form");
    formChange(form, { ...globalsData(), animated: false });
    expect(handler.mock.calls.at(-1)![0].detail.config.animated).toBe(false);
  });

  it("toggles the global lazy option via the globals ha-form", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const form = el.shadowRoot.querySelector(".globals-form");
    formChange(form, { ...globalsData(), lazy: true });
    expect(handler.mock.calls.at(-1)![0].detail.config.lazy).toBe(true);
  });

  it("maps the scrollable string back to a boolean/auto", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const form = el.shadowRoot.querySelector(".globals-form");
    formChange(form, { ...globalsData(), scrollable: "false" });
    expect(handler.mock.calls.at(-1)![0].detail.config.scrollable).toBe(false);
    formChange(form, { ...globalsData(), scrollable: "auto" });
    expect(handler.mock.calls.at(-1)![0].detail.config.scrollable).toBe("auto");
  });
});
