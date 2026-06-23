import { describe, it, expect, beforeAll } from "vitest";
import "./tabdeck-tab";

async function mount(props: Record<string, any>) {
  const el = document.createElement("tabdeck-tab") as any;
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("tabdeck-tab", () => {
  beforeAll(() => {
    if (!customElements.get("ha-icon")) {
      customElements.define("ha-icon", class extends HTMLElement {});
    }
  });

  it("renders the label and role=tab", async () => {
    const el = await mount({ label: "Lights" });
    expect(el.shadowRoot.textContent).toContain("Lights");
    expect(el.getAttribute("role")).toBe("tab");
  });

  it("reflects selected to aria-selected", async () => {
    const el = await mount({ label: "A", selected: true });
    expect(el.getAttribute("aria-selected")).toBe("true");
  });

  it("renders an icon element when icon is set", async () => {
    const el = await mount({ icon: "mdi:lightbulb", label: "L" });
    expect(el.shadowRoot.querySelector("ha-icon")).toBeTruthy();
  });

  it("renders a badge when badge is non-empty", async () => {
    const el = await mount({ label: "A", badge: "3" });
    const badge = el.shadowRoot.querySelector(".badge");
    expect(badge?.textContent).toContain("3");
  });
});
