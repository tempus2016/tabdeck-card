import { describe, it, expect } from "vitest";
import { findBackgroundTarget, applyPageBackground, restorePageBackground } from "./page-background";

function view(withBackground = true) {
  const container = document.createElement("hui-view-container");
  const bg = document.createElement("hui-view-background");
  if (withBackground) container.append(bg);
  const host = document.createElement("hui-view");
  const deck = document.createElement("div");
  host.attachShadow({ mode: "open" }).append(deck);
  container.append(host);
  return { container, bg, deck };
}

describe("page_background", () => {
  it("finds the view's background element up through shadow roots", () => {
    const { bg, deck } = view();
    expect(findBackgroundTarget(deck)).toEqual({ el: bg, prop: "--view-background" });
    const old = view(false);
    expect(findBackgroundTarget(old.deck)).toEqual({ el: old.container, prop: "--lovelace-background" });
    expect(findBackgroundTarget(document.createElement("div"))).toBeUndefined();
  });

  it("sets the background and puts the view's own value back", () => {
    const { bg, deck } = view();
    bg.style.setProperty("--view-background", "red");
    const t = findBackgroundTarget(deck)!;
    const owner = {};
    applyPageBackground(t, owner, "linear-gradient(#000, #123)");
    expect(bg.style.getPropertyValue("--view-background")).toBe("linear-gradient(#000, #123)");
    applyPageBackground(t, owner, "blue");
    restorePageBackground(t, owner);
    expect(bg.style.getPropertyValue("--view-background")).toBe("red");
    applyPageBackground(t, owner, "blue");
    restorePageBackground(t, owner);
    restorePageBackground(t, owner);
    expect(bg.style.getPropertyValue("--view-background")).toBe("red");
  });

  it("a second deck taking over is not undone by the first", () => {
    const { deck, bg } = view();
    const t = findBackgroundTarget(deck)!;
    const a = {};
    const b = {};
    applyPageBackground(t, a, "blue");
    applyPageBackground(t, b, "green");
    restorePageBackground(t, a);
    expect(bg.style.getPropertyValue("--view-background")).toBe("green");
    restorePageBackground(t, b);
    expect(bg.style.getPropertyValue("--view-background")).toBe("");
  });
});
