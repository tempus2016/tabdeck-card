import { describe, it, expect } from "vitest";
import { indicatorStyle } from "./indicator";

describe("indicatorStyle", () => {
  it("translates and sizes the indicator to the tab box", () => {
    const css = indicatorStyle({ left: 40, top: 0, width: 80, height: 48 });
    expect(css).toContain("translate(40px, 0px)");
    expect(css).toContain("width:80px");
    expect(css).toContain("height:48px");
    expect(css).toContain("opacity:1");
  });

  it("positions vertically for left/right bars", () => {
    const css = indicatorStyle({ left: 0, top: 96, width: 120, height: 48 });
    expect(css).toContain("translate(0px, 96px)");
  });

  it("includes a per-tab accent override when given", () => {
    const css = indicatorStyle({ left: 0, top: 0, width: 10, height: 10 }, "#ff0000");
    expect(css).toContain("--tabdeck-accent:#ff0000");
  });

  it("omits the accent override when not given", () => {
    const css = indicatorStyle({ left: 0, top: 0, width: 10, height: 10 });
    expect(css).not.toContain("--tabdeck-accent");
  });

  it("hides the indicator when unmeasured (zero box) or null", () => {
    expect(indicatorStyle({ left: 0, top: 0, width: 0, height: 0 })).toBe("opacity:0;");
    expect(indicatorStyle(null)).toBe("opacity:0;");
  });
});
