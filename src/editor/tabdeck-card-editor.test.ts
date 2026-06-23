import { describe, it, expect, vi } from "vitest";
import "./tabdeck-card-editor";

async function mount(config: any) {
  const el = document.createElement("tabdeck-card-editor") as any;
  el.hass = { states: {} };
  el.setConfig(config);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

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

  it("edits a tab's accent and badge", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);

    const accent = el.shadowRoot.querySelector(".tab-accent");
    accent.value = "#ff0000";
    accent.dispatchEvent(new Event("input"));
    expect(handler.mock.calls.at(-1)![0].detail.config.tabs[0].accent).toBe("#ff0000");

    const badge = el.shadowRoot.querySelector(".tab-badge");
    badge.value = "sensor.unread";
    badge.dispatchEvent(new Event("input"));
    expect(handler.mock.calls.at(-1)![0].detail.config.tabs[0].badge).toBe("sensor.unread");
  });

  it("edits a tab's card via the JSON editor when valid", async () => {
    const el = await mount({ tabs: [{ name: "A", card: { type: "markdown" } }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const ta = el.shadowRoot.querySelector(".tab-card-json");
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
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const ta = el.shadowRoot.querySelector(".tab-card-json");
    ta.value = "{ not valid json";
    ta.dispatchEvent(new Event("change"));
    await el.updateComplete;
    expect(handler).not.toHaveBeenCalled();
    expect(el.shadowRoot.querySelector(".tab-card-error")).toBeTruthy();
  });

  it("changes the global default_tab", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }, { name: "B", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const sel = el.shadowRoot.querySelector(".global-default-tab");
    sel.value = "B";
    sel.dispatchEvent(new Event("change"));
    expect(handler.mock.calls.at(-1)![0].detail.config.default_tab).toBe("B");
  });

  it("toggles the global lazy option", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }] });
    const handler = vi.fn();
    el.addEventListener("config-changed", handler);
    const cb = el.shadowRoot.querySelector(".global-lazy");
    cb.checked = true;
    cb.dispatchEvent(new Event("change"));
    expect(handler.mock.calls.at(-1)![0].detail.config.lazy).toBe(true);
  });
});
