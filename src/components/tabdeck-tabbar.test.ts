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
