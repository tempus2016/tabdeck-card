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

  it("display=icon hides the label when an icon is present", async () => {
    const el = await mount({ label: "Lights", icon: "mdi:lightbulb", display: "icon" });
    expect(el.shadowRoot.querySelector("ha-icon")).toBeTruthy();
    expect(el.shadowRoot.querySelector(".label")).toBeNull();
  });

  it("display=icon still shows the label when the tab has no icon", async () => {
    const el = await mount({ label: "Lights", display: "icon" });
    expect(el.shadowRoot.querySelector(".label")?.textContent).toContain("Lights");
  });

  it("display=label hides the icon", async () => {
    const el = await mount({ label: "Lights", icon: "mdi:lightbulb", display: "label" });
    expect(el.shadowRoot.querySelector("ha-icon")).toBeNull();
    expect(el.shadowRoot.querySelector(".label")?.textContent).toContain("Lights");
  });

  it("applies a per-tab color to the host (overriding accent state)", async () => {
    const el = await mount({ label: "Danger", color: "rgb(200, 0, 0)", selected: true });
    expect(el.style.color).toBe("rgb(200, 0, 0)");
  });

  it("clears the host color when color is unset", async () => {
    const el = await mount({ label: "A" });
    expect(el.style.color).toBe("");
  });

  it("display=both shows icon and label", async () => {
    const el = await mount({ label: "Lights", icon: "mdi:lightbulb", display: "both" });
    expect(el.shadowRoot.querySelector("ha-icon")).toBeTruthy();
    expect(el.shadowRoot.querySelector(".label")).toBeTruthy();
  });
});
