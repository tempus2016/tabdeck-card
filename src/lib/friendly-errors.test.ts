import { describe, it, expect } from "vitest";
import { explainCardError, findErrorCards, setErrorCardHidden } from "./friendly-errors";

describe("friendly_errors", () => {
  it("explains a missing custom card, an unknown type and a missing type", () => {
    expect(explainCardError({ error: "Custom element doesn't exist: weather-radar-card.", origConfig: { type: "custom:weather-radar-card" } })).toEqual({
      key: "card.error_not_installed",
      vars: { type: "custom:weather-radar-card" },
    });
    expect(explainCardError({ error: "Unknown type encountered: tiles", origConfig: { type: "tiles" } })).toEqual({ key: "card.error_unknown_type", vars: { type: "tiles" } });
    expect(explainCardError({ error: "No card type configured" })).toEqual({ key: "card.error_no_type" });
    expect(explainCardError({ error: "Entity not available: light.x" })).toEqual({ text: "Entity not available: light.x" });
    expect(explainCardError(undefined)).toEqual({ text: "?" });
    // Newer Home Assistant: { type: "error", message }.
    expect(explainCardError({ type: "error", message: "Unknown type encountered: tiles" })).toEqual({ key: "card.error_unknown_type", vars: { type: "tiles" } });
  });

  it("finds error cards through shadow roots, skipping ones HA still hides", () => {
    const root = document.createElement("div");
    const stack = document.createElement("x-stack");
    const sr = stack.attachShadow({ mode: "open" });
    const shown = document.createElement("hui-error-card");
    const waiting = document.createElement("hui-error-card");
    waiting.style.display = "None";
    sr.append(shown, waiting);
    root.append(stack);
    expect(findErrorCards(root)).toEqual([shown]);
    expect(findErrorCards(shown)).toEqual([shown]);
    expect(findErrorCards(undefined)).toEqual([]);
  });

  it("hides HA's error card and brings it back, and still counts a hidden one", () => {
    const el = document.createElement("hui-error-card");
    setErrorCardHidden(el, true);
    expect(el.style.display).toBe("none");
    expect(findErrorCards(el)).toEqual([el]);
    setErrorCardHidden(el, false);
    expect(el.style.display).toBe("");
    expect(el.dataset.tabdeckError).toBeUndefined();
  });
});
