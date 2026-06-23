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
  it("renders one row per tab", async () => {
    const el = await mount({ tabs: [{ name: "A", card: {} }, { name: "B", card: {} }] });
    expect(el.shadowRoot.querySelectorAll(".tab-row")).toHaveLength(2);
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
});
