import { describe, it, expect, beforeAll, vi } from "vitest";
import "./tabdeck-tabbar";

const nextFrame = () =>
  new Promise<void>((r) => requestAnimationFrame(() => r()));

async function mount() {
  const el = document.createElement("tabdeck-tabbar") as any;
  el.items = [{ name: "A" }, { name: "B" }, { name: "C" }];
  el.selected = 0;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("tabdeck-tabbar", () => {
  beforeAll(() => {
    if (!customElements.get("ha-icon")) {
      customElements.define("ha-icon", class extends HTMLElement {});
    }
  });

  it("renders one tab per item with role=tablist", async () => {
    const el = await mount();
    expect(el.getAttribute("role")).toBe("tablist");
    expect(el.shadowRoot.querySelectorAll("tabdeck-tab")).toHaveLength(3);
  });

  it("emits tabdeck-select on tab click", async () => {
    const el = await mount();
    const handler = vi.fn();
    el.addEventListener("tabdeck-select", handler);
    el.shadowRoot.querySelectorAll("tabdeck-tab")[2].click();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.index).toBe(2);
  });

  it("ArrowRight selects the next tab and wraps", async () => {
    const el = await mount();
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    el.selected = 2;
    await el.updateComplete;
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(events[events.length - 1]).toBe(0);
  });

  it("keyboard navigation skips disabled tabs", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B", disabled: true }, { name: "C" }];
    el.selected = 0;
    document.body.appendChild(el);
    await el.updateComplete;
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(events[events.length - 1]).toBe(2); // skipped disabled B
  });

  it("reflects disabled onto the disabled tab element", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B", disabled: true }];
    el.selected = 0;
    document.body.appendChild(el);
    await el.updateComplete;
    const tabs = el.shadowRoot.querySelectorAll("tabdeck-tab");
    await tabs[1].updateComplete;
    expect(tabs[1].hasAttribute("disabled")).toBe(true);
  });

  it("Home selects the first, End the last", async () => {
    const el = await mount();
    const events: number[] = [];
    el.addEventListener("tabdeck-select", (e: any) => events.push(e.detail.index));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
    expect(events[events.length - 1]).toBe(2);
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
    expect(events[events.length - 1]).toBe(0);
  });

  it("renders a single indicator element inside the bar", async () => {
    const el = await mount();
    const bar = el.shadowRoot.querySelector(".bar");
    expect(bar.querySelectorAll(".indicator")).toHaveLength(1);
  });

  it("hides the indicator (opacity 0) when offsets are unmeasurable in jsdom", async () => {
    const el = await mount();
    expect(el.shadowRoot.querySelector(".indicator").style.opacity).toBe("0");
  });

  it("positions the indicator by selected index, not the reflected [selected] attribute", async () => {
    const el = await mount();
    const tabs = el.shadowRoot.querySelectorAll("tabdeck-tab");
    tabs.forEach((t: HTMLElement, i: number) => {
      Object.defineProperty(t, "offsetLeft", { value: i * 100, configurable: true });
      Object.defineProperty(t, "offsetTop", { value: 0, configurable: true });
      Object.defineProperty(t, "offsetWidth", { value: 100, configurable: true });
      Object.defineProperty(t, "offsetHeight", { value: 48, configurable: true });
    });
    el.selected = 2;
    await el.updateComplete;
    // Simulate the child-reflection race: a child tab reflects `selected` to its
    // attribute in its own async update, which runs after the parent's updated().
    // So at position-time the stale attribute can sit on the wrong tab.
    tabs.forEach((t: HTMLElement) => t.removeAttribute("selected"));
    tabs[0].setAttribute("selected", "");
    el["_position"]();
    expect(el.shadowRoot.querySelector(".indicator").style.left).toBe("200px");
  });

  it("adopts the selected tab's accent as --tabdeck-accent when accentIndicator is on", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A", accent: "#ff0000" }, { name: "B", accent: "#00ff00" }];
    el.selected = 0;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("#ff0000");
    el.selected = 1;
    await el.updateComplete;
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("#00ff00");
  });

  it("does not set --tabdeck-accent when accentIndicator is off", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A", accent: "#ff0000" }];
    el.selected = 0;
    el.accentIndicator = false;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.getPropertyValue("--tabdeck-accent")).toBe("");
  });

  it("applies elevation class and a custom bar background", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }];
    el.selected = 0;
    el.elevation = true;
    el.barBackground = "rgb(34, 34, 34)";
    document.body.appendChild(el);
    await el.updateComplete;
    const bar = el.shadowRoot.querySelector(".bar");
    expect(bar.classList.contains("elevated")).toBe(true);
    expect(bar.style.background).toBe("rgb(34, 34, 34)");
  });

  it("applies the alignment class to the bar", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B" }];
    el.selected = 0;
    el.align = "center";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".bar").classList.contains("align-center")).toBe(true);
  });

  it("applies position:sticky to the host when sticky is on (top edge)", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }];
    el.selected = 0;
    el.sticky = true;
    el.position = "top";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.position).toBe("sticky");
    expect(el.style.top).toBe("0px");
  });

  it("pins to the bottom edge for a bottom bar, and clears when sticky is off", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }];
    el.selected = 0;
    el.sticky = true;
    el.position = "bottom";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.style.bottom).toBe("0px");
    el.sticky = false;
    await el.updateComplete;
    expect(el.style.position).toBe("");
  });

  it("adds the animate class after first paint when animated (default)", async () => {
    const el = await mount();
    await nextFrame();
    await el.updateComplete;
    expect(
      el.shadowRoot.querySelector(".indicator").classList.contains("animate"),
    ).toBe(true);
  });

  it("never adds the animate class when animated is false", async () => {
    const el = document.createElement("tabdeck-tabbar") as any;
    el.items = [{ name: "A" }, { name: "B" }, { name: "C" }];
    el.selected = 0;
    el.animated = false;
    document.body.appendChild(el);
    await el.updateComplete;
    await nextFrame();
    await el.updateComplete;
    expect(
      el.shadowRoot.querySelector(".indicator").classList.contains("animate"),
    ).toBe(false);
  });
});
