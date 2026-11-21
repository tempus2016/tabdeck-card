// Reduced motion audit: every animation and transition in the card must
// stop when the device asks for less motion. The static checks read the
// sources, so a new animation without a reduced-motion path fails here.
/// <reference types="vite/client" />
import { describe, it, expect, beforeAll, vi } from "vitest";

// Every component and the editor (tests excluded).
const SOURCES = Object.entries(
  import.meta.glob(["./tabdeck-card.ts", "./components/*.ts", "./editor/*.ts", "!./**/*.test.ts"], { query: "?raw", import: "default", eager: true }) as Record<string, string>,
);
const FILES = SOURCES.map(([f]) => f);
const source = (f: string) => SOURCES.find(([k]) => k === f)![1];

describe("reduced motion: sources", () => {
  it("reads the card, its components and the editor", () => {
    expect(FILES).toEqual(expect.arrayContaining(["./tabdeck-card.ts", "./components/tabdeck-tab.ts", "./components/tabdeck-tabbar.ts", "./editor/tabdeck-card-editor.ts"]));
  });

  it("every stylesheet with a transition or animation includes the reduced-motion rule", () => {
    for (const f of FILES) {
      const s = source(f);
      if (/^\s+(transition|animation):/m.test(s)) expect(s, f).toContain("${reducedMotionCss}");
    }
  });

  it("every WAAPI animation checks reduced motion first", () => {
    for (const f of FILES) {
      const lines = source(f).split("\n");
      lines.forEach((line, i) => {
        if (!/\.animate\(/.test(line)) return;
        const before = lines.slice(Math.max(0, i - 14), i + 1).join("\n");
        expect(before, `${f}:${i + 1}`).toMatch(/reducedMotion\(\)/);
      });
    }
  });

  it("no smooth scrolling without a reduced-motion fallback", () => {
    for (const f of FILES) {
      for (const m of source(f).matchAll(/behavior:\s*([^,}\n]+)/g)) {
        if (m[1].includes("smooth")) expect(m[1], f).toMatch(/reducedMotion\(\) \? "auto" : "smooth"/);
      }
    }
  });
});

describe("reduced motion: behaviour", () => {
  let reduce = true;
  beforeAll(() => {
    (window as any).matchMedia = (q: string) => ({ matches: reduce && q.includes("prefers-reduced-motion"), addEventListener() {}, removeEventListener() {} });
    (window as any).loadCardHelpers = async () => ({
      createCardElement: (config: any) => {
        const el = document.createElement("div") as any;
        el.setAttribute("data-type", config.type ?? "");
        return el;
      },
    });
    if (!customElements.get("ha-icon")) customElements.define("ha-icon", class extends HTMLElement {});
  });

  it("the reduced-motion rule is in the card, tab and bar styles", async () => {
    const { reducedMotionCss } = await import("./lib/motion");
    expect(reducedMotionCss.cssText).toContain("prefers-reduced-motion: reduce");
    expect(reducedMotionCss.cssText).toContain("animation-duration");
    expect(reducedMotionCss.cssText).toContain("transition-duration");
    await import("./tabdeck-card");
    for (const tag of ["tabdeck-card", "tabdeck-tab", "tabdeck-tabbar"]) {
      const styles = (customElements.get(tag) as any).styles;
      const text = [styles].flat(Infinity).map((s: any) => s.cssText).join("");
      expect(text, tag).toContain("transition-duration: 0.01ms");
    }
  });

  it("no panel transition and an instant bar scroll", async () => {
    await import("./tabdeck-card");
    const el = document.createElement("tabdeck-card") as any;
    el.setConfig({ transition: "slide", tabs: [{ name: "A", card: { type: "a" } }, { name: "B", card: { type: "b" } }] });
    document.body.appendChild(el);
    el.hass = { states: {} };
    const settle = async () => {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));
      await el.updateComplete;
    };
    await settle();
    const animate = vi.fn();
    (Element.prototype as any).animate = animate;
    try {
      el.selectTab(1);
      await settle();
      expect(animate).not.toHaveBeenCalled();
      reduce = false;
      el.selectTab(0);
      await settle();
      expect(animate).toHaveBeenCalled();
      reduce = true;
      const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
      const scrollBy = vi.fn();
      bar.shadowRoot.querySelector(".bar").scrollBy = scrollBy;
      bar._scrollBy(1);
      expect(scrollBy.mock.calls[0][0].behavior).toBe("auto");
    } finally {
      delete (Element.prototype as any).animate;
      reduce = true;
    }
  });
});
