import { describe, it, expect, beforeAll } from "vitest";
import "./tabdeck-tab";
import { isActiveBadge } from "./tabdeck-tab";

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

  it("draws a progress ring around the icon", async () => {
    const el = await mount({ label: "Washer", icon: "mdi:washing-machine", ring: 25, ringColor: "red" });
    const ring = el.shadowRoot.querySelector(".ring") as SVGElement;
    expect(ring).toBeTruthy();
    const bar = el.shadowRoot.querySelector(".ring-value") as SVGCircleElement;
    expect(bar.getAttribute("stroke-dasharray")).toBe("25 100");
    expect(bar.style.stroke).toBe("red");
    expect(el.shadowRoot.querySelector(".icon-wrap ha-icon")).toBeTruthy();
    expect(ring.getAttribute("aria-hidden")).toBe("true");
  });

  it("ring_style bar draws a progress bar under the tab instead of the ring", async () => {
    const el = await mount({ label: "Washer", ring: 65, ringStyle: "bar", ringColor: "green" });
    expect(el.shadowRoot.querySelector(".ring")).toBeNull();
    const bar = el.shadowRoot.querySelector(".progress") as HTMLElement;
    expect(bar.getAttribute("role")).toBe("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("65");
    const fill = bar.querySelector(".progress-value") as HTMLElement;
    expect(fill.style.width).toBe("65%");
    expect(fill.style.background).toBe("green");
    expect(el.getAttribute("ring-style")).toBe("bar");
    const none = await mount({ label: "Washer", ringStyle: "bar" });
    expect(none.shadowRoot.querySelector(".progress")).toBeNull();
  });

  it("draws a mini graph line when given points", async () => {
    const el = await mount({ label: "Temp", graph: "0,6 44,2", graphColor: "orange" });
    const line = el.shadowRoot.querySelector("svg.graph polyline");
    expect(line.getAttribute("points")).toBe("0,6 44,2");
    expect(line.style.stroke).toBe("orange");
    expect(el.shadowRoot.querySelector("svg.graph").getAttribute("aria-hidden")).toBe("true");
  });

  it("shows extra badges after the main one", async () => {
    const el = await mount({
      label: "Security",
      badge: "3",
      extraBadges: [
        { text: "!", color: "orange", label: "badge: !" },
        { icon: "mdi:lock", label: "badge: mdi:lock" },
      ],
    });
    const badges = [...el.shadowRoot.querySelectorAll(".badges > *")] as HTMLElement[];
    expect(badges.map((b) => b.textContent!.trim())).toEqual(["3", "!", ""]);
    expect(badges[1].style.background).toBe("orange");
    expect(badges[2].querySelector("ha-icon")!.getAttribute("icon")).toBe("mdi:lock");
    expect(badges[1].getAttribute("aria-label")).toBe("badge: !");
    const dots = await mount({ label: "S", badgeDisplay: "dot", extraBadges: [{ text: "on" }, { icon: "mdi:lock" }] });
    expect(dots.shadowRoot.querySelectorAll(".badges .badge-dot")).toHaveLength(2);
    const plain = await mount({ label: "S", badge: "3" });
    expect(plain.shadowRoot.querySelector(".badges")).toBeNull();
  });

  it("bounce animates the badge when its value changes, not on first show", async () => {
    const calls: any[] = [];
    const proto = HTMLElement.prototype as any;
    const real = proto.animate;
    proto.animate = function (this: HTMLElement) {
      calls.push(this.className);
      return { cancel() {} };
    };
    try {
      const el = await mount({ label: "Post", badge: "1", bounce: true });
      expect(calls).toHaveLength(0);
      el._bounceFrom = 0;
      el.badge = "2";
      await el.updateComplete;
      expect(calls).toEqual(["badge"]);
      el.badge = "2";
      el.label = "Mail";
      await el.updateComplete;
      expect(calls).toHaveLength(1);
      const off = await mount({ label: "Post", badge: "1" });
      off._bounceFrom = 0;
      off.badge = "5";
      await off.updateComplete;
      expect(calls).toHaveLength(1);
    } finally {
      proto.animate = real;
    }
  });

  it("bounce stays still under prefers-reduced-motion", async () => {
    const proto = HTMLElement.prototype as any;
    const real = proto.animate;
    const realMM = window.matchMedia;
    let n = 0;
    proto.animate = () => (n++, { cancel() {} });
    (window as any).matchMedia = (q: string) => ({ matches: q.includes("reduce"), addEventListener() {}, removeEventListener() {} });
    try {
      const el = await mount({ label: "Post", badge: "1", bounce: true });
      el._bounceFrom = 0;
      el.badge = "2";
      await el.updateComplete;
      expect(n).toBe(0);
    } finally {
      proto.animate = real;
      (window as any).matchMedia = realMM;
    }
  });

  it("no ring without a value", async () => {
    const el = await mount({ label: "A", icon: "mdi:a" });
    expect(el.shadowRoot.querySelector(".ring")).toBeNull();
  });

  it("badge_icon shows an icon badge while the badge is active (or always without a value)", async () => {
    const on = await mount({ label: "A", badge: "3", badgeIcon: "mdi:alert" });
    expect(on.shadowRoot.querySelector(".badge.icon-badge ha-icon")?.getAttribute("icon")).toBe("mdi:alert");
    const off = await mount({ label: "A", badge: "0", badgeIcon: "mdi:alert" });
    expect(off.shadowRoot.querySelector(".icon-badge")).toBeNull();
    const always = await mount({ label: "A", badgeIcon: "mdi:star" });
    expect(always.shadowRoot.querySelector(".icon-badge")).toBeTruthy();
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

  it("display=active shows only the icon on an unselected tab", async () => {
    const el = await mount({ label: "Lights", subtitle: "3 on", icon: "mdi:lightbulb", display: "active" });
    expect(el.shadowRoot.querySelector("ha-icon")).toBeTruthy();
    expect(el.shadowRoot.querySelector(".label")).toBeNull();
    expect(el.shadowRoot.querySelector(".subtitle")).toBeNull();
  });

  it("display=active shows icon, label and subtitle on the selected tab", async () => {
    const el = await mount({ label: "Lights", subtitle: "3 on", icon: "mdi:lightbulb", display: "active", selected: true });
    expect(el.shadowRoot.querySelector("ha-icon")).toBeTruthy();
    expect(el.shadowRoot.querySelector(".label")?.textContent).toBe("Lights");
    expect(el.shadowRoot.querySelector(".subtitle")?.textContent).toBe("3 on");
  });

  it("display=active keeps the label on an unselected tab with no icon", async () => {
    const el = await mount({ label: "Lights", display: "active" });
    expect(el.shadowRoot.querySelector(".label")?.textContent).toBe("Lights");
  });

  it("display=label hides the icon", async () => {
    const el = await mount({ label: "Lights", icon: "mdi:lightbulb", display: "label" });
    expect(el.shadowRoot.querySelector("ha-icon")).toBeNull();
    expect(el.shadowRoot.querySelector(".label")?.textContent).toContain("Lights");
  });

  it("isActiveBadge treats empty/zero/off-like values as inactive", () => {
    for (const v of ["", "0", "off", "false", "no", "none", "unavailable", "unknown", "OFF"])
      expect(isActiveBadge(v)).toBe(false);
    for (const v of ["1", "3", "on", "open", "hi"]) expect(isActiveBadge(v)).toBe(true);
    expect(isActiveBadge(undefined)).toBe(false);
  });

  it("emits badge-click (and stops propagation) when badgeAction is set", async () => {
    const el = await mount({ label: "A", badge: "3", badgeAction: true });
    let badgeClicks = 0;
    el.addEventListener("badge-click", () => badgeClicks++);
    const badge = el.shadowRoot.querySelector(".badge") as HTMLElement;
    expect(badge.classList.contains("clickable")).toBe(true);
    badge.click();
    expect(badgeClicks).toBe(1);
  });

  it("does not emit badge-click without badgeAction", async () => {
    const el = await mount({ label: "A", badge: "3" });
    let badgeClicks = 0;
    el.addEventListener("badge-click", () => badgeClicks++);
    (el.shadowRoot.querySelector(".badge") as HTMLElement).click();
    expect(badgeClicks).toBe(0);
  });

  it("applies a custom badge_color to the badge", async () => {
    const el = await mount({ label: "A", badge: "3", badgeColor: "rgb(200, 0, 0)" });
    expect((el.shadowRoot.querySelector(".badge") as HTMLElement).style.background).toBe("rgb(200, 0, 0)");
  });

  it("badgeDisplay=dot shows a dot for active values and nothing otherwise", async () => {
    const on = await mount({ label: "A", badge: "3", badgeDisplay: "dot" });
    expect(on.shadowRoot.querySelector(".badge-dot")).toBeTruthy();
    expect(on.shadowRoot.querySelector(".badge")).toBeNull();
    const off = await mount({ label: "B", badge: "0", badgeDisplay: "dot" });
    expect(off.shadowRoot.querySelector(".badge-dot")).toBeNull();
  });

  it("renders a subtitle under the label when set", async () => {
    const el = await mount({ label: "Climate", subtitle: "3 zones" });
    expect(el.shadowRoot.querySelector(".subtitle")?.textContent).toContain("3 zones");
    expect(el.shadowRoot.querySelector(".label")?.textContent).toContain("Climate");
  });

  it("renders no subtitle element when unset", async () => {
    const el = await mount({ label: "Climate" });
    expect(el.shadowRoot.querySelector(".subtitle")).toBeNull();
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

describe("isActiveBadge numeric zero", () => {
  it("treats any numeric zero as inactive", () => {
    expect(isActiveBadge("0.0")).toBe(false);
    expect(isActiveBadge("-0")).toBe(false);
    expect(isActiveBadge("0.5")).toBe(true);
  });
});

describe("tabdeck-tab alert", () => {
  it("reflects the alert attribute", async () => {
    const el = document.createElement("tabdeck-tab") as any;
    el.label = "Door";
    el.alert = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.hasAttribute("alert")).toBe(true);
    el.alert = false;
    await el.updateComplete;
    expect(el.hasAttribute("alert")).toBe(false);
  });
});

describe("tabdeck-tab ghost", () => {
  it("reflects ghost and renders a hidden marker", async () => {
    const el = document.createElement("tabdeck-tab") as any;
    el.label = "Guests";
    el.ghost = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.hasAttribute("ghost")).toBe(true);
    expect(el.shadowRoot.querySelector(".ghost-mark")).toBeTruthy();
    expect(el.title).toBeTruthy();
  });
});

describe("tabdeck-tab stacked & fab", () => {
  it("reflects stacked and fab", async () => {
    const el = document.createElement("tabdeck-tab") as any;
    el.label = "Add";
    el.icon = "mdi:plus";
    el.stacked = true;
    el.fab = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.hasAttribute("stacked")).toBe(true);
    expect(el.hasAttribute("fab")).toBe(true);
  });
});

describe("tabdeck-tab dots", () => {
  it("renders only a dot, labelled for screen readers", async () => {
    const el = document.createElement("tabdeck-tab") as any;
    el.label = "Kitchen";
    el.icon = "mdi:fridge";
    el.display = "dots";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".dot")).toBeTruthy();
    expect(el.shadowRoot.querySelector("ha-icon")).toBeNull();
    expect(el.shadowRoot.querySelector(".label")).toBeNull();
    expect(el.getAttribute("aria-label")).toBe("Kitchen");
  });
});

describe("changed dot", () => {
  it("shows on an unselected changed tab, not on the selected one", async () => {
    const el = document.createElement("tabdeck-tab") as any;
    el.label = "A";
    el.changed = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".changed-dot")).toBeTruthy();
    el.selected = true;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".changed-dot")).toBeNull();
    el.remove();
  });
});
