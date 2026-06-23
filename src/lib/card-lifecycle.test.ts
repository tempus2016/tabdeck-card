import { describe, it, expect, vi } from "vitest";
import { CardManager } from "./card-lifecycle";

function fakeCreate() {
  return (config: any) => {
    const el = document.createElement("div") as any;
    el._config = config;
    el.setAttribute("data-type", config.type ?? "");
    return el;
  };
}

describe("CardManager", () => {
  it("builds one element per config", async () => {
    const m = new CardManager(fakeCreate());
    await m.build([{ type: "a" }, { type: "b" }]);
    expect(m.all()).toHaveLength(2);
    expect(m.get(0).getAttribute("data-type")).toBe("a");
  });

  it("fans hass out to every element", async () => {
    const m = new CardManager(fakeCreate());
    await m.build([{ type: "a" }, { type: "b" }]);
    const hass = { states: {} } as any;
    m.setHass(hass);
    expect(m.get(0).hass).toBe(hass);
    expect(m.get(1).hass).toBe(hass);
  });

  it("dispatches resize on notifyVisible", async () => {
    const m = new CardManager(fakeCreate());
    await m.build([{ type: "a" }]);
    const spy = vi.fn();
    m.get(0).addEventListener("resize", spy);
    m.notifyVisible(0);
    expect(spy).toHaveBeenCalled();
  });

  it("rebuilds the element on ll-rebuild and keeps hass", async () => {
    const m = new CardManager(fakeCreate());
    await m.build([{ type: "a" }]);
    m.setHass({ states: {} } as any);
    const before = m.get(0);
    before.dispatchEvent(new CustomEvent("ll-rebuild", { bubbles: true, composed: true }));
    await Promise.resolve();
    await Promise.resolve();
    expect(m.get(0)).not.toBe(before);
    expect(m.get(0).hass).toBeTruthy();
    expect(m.get(0).getAttribute("data-type")).toBe("a");
  });
});
