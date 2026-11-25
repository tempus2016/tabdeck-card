import { describe, it, expect, afterEach } from "vitest";
import { claimsSideways, detectSwipe, startsAtEdge, startsOnControl } from "./swipe";

const p = (x: number, y: number, t: number) => ({ x, y, t });

describe("detectSwipe", () => {
  it("detects a leftward swipe as 'next'", () => {
    expect(detectSwipe(p(200, 100, 0), p(100, 110, 200))).toBe("next");
  });

  it("detects a rightward swipe as 'prev'", () => {
    expect(detectSwipe(p(100, 100, 0), p(220, 105, 200))).toBe("prev");
  });

  it("returns null when the horizontal distance is below threshold", () => {
    expect(detectSwipe(p(100, 100, 0), p(130, 100, 100))).toBeNull();
  });

  it("returns null when the gesture is mostly vertical", () => {
    expect(detectSwipe(p(100, 100, 0), p(160, 300, 200))).toBeNull();
  });

  it("returns null when the gesture is too slow", () => {
    expect(detectSwipe(p(200, 100, 0), p(100, 100, 2000))).toBeNull();
  });

  it("respects custom options", () => {
    expect(detectSwipe(p(200, 100, 0), p(170, 100, 100), { minDistance: 20 })).toBe("next");
  });
});

describe("startsAtEdge (swipe_edge)", () => {
  const rect = { left: 100, right: 500 };
  it("allows starts within the edge strip on either side", () => {
    expect(startsAtEdge(110, rect, 40)).toBe(true);
    expect(startsAtEdge(140, rect, 40)).toBe(true);
    expect(startsAtEdge(470, rect, 40)).toBe(true);
  });
  it("refuses starts in the middle", () => {
    expect(startsAtEdge(141, rect, 40)).toBe(false);
    expect(startsAtEdge(300, rect, 40)).toBe(false);
  });
  it("counts a start just outside the content (a finger on the margin) as an edge", () => {
    expect(startsAtEdge(95, rect, 40)).toBe(true);
    expect(startsAtEdge(505, rect, 40)).toBe(true);
  });
});

describe("startsOnControl (swipe_lock)", () => {
  const el = (tag: string, attrs: Record<string, string> = {}) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  };
  it("spots sliders by tag, role or a range input anywhere in the path", () => {
    expect(startsOnControl([el("div"), el("ha-control-slider"), el("hui-tile-card")])).toBe(true);
    expect(startsOnControl([el("span"), el("mushroom-slider")])).toBe(true);
    expect(startsOnControl([el("div", { role: "slider" })])).toBe(true);
    expect(startsOnControl([el("input", { type: "range" })])).toBe(true);
    expect(startsOnControl([el("round-slider")])).toBe(true);
  });
  it("spots maps", () => {
    expect(startsOnControl([el("div", { class: "leaflet-container" }), el("ha-map")])).toBe(true);
  });
  it("lets everything else swipe", () => {
    expect(startsOnControl([el("div"), el("hui-entities-card"), el("input", { type: "checkbox" }), document, window])).toBe(false);
    expect(startsOnControl([])).toBe(false);
  });
});

describe("claimsSideways", () => {
  // Attached, because jsdom only computes styles for elements in the document.
  const el = (touchAction: string) => {
    const e = document.createElement("div");
    e.style.touchAction = touchAction;
    document.body.appendChild(e);
    return e;
  };
  afterEach(() => document.body.replaceChildren());
  it("an element that keeps sideways pans from the browser claims the touch", () => {
    expect(claimsSideways([el("none")], null)).toBe(true);
    expect(claimsSideways([el("pan-y")], null)).toBe(true);
    expect(claimsSideways([document.createElement("span"), el("pinch-zoom")], null)).toBe(true);
  });
  it("auto, manipulation and pan-x leave the touch to the deck", () => {
    expect(claimsSideways([el(""), el("auto"), el("manipulation"), el("pan-x pan-y"), el("pan-left")], null)).toBe(false);
    expect(claimsSideways([document, window], null)).toBe(false);
    expect(claimsSideways([], null)).toBe(false);
  });
  it("stops at the deck's content", () => {
    const content = el("auto");
    expect(claimsSideways([el(""), content, el("pan-y")], content)).toBe(false);
  });
  it("reads touch-action through the given lookup", () => {
    const a = document.createElement("div");
    expect(claimsSideways([a], null, () => "pan-y")).toBe(true);
  });
});
