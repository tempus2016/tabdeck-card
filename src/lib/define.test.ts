import { describe, it, expect } from "vitest";
import { defineOnce } from "./define";

describe("defineOnce", () => {
  it("defines a new element and ignores a second definition", () => {
    class First extends HTMLElement {}
    class Second extends HTMLElement {}
    defineOnce("tabdeck-define-test")(First);
    expect(() => defineOnce("tabdeck-define-test")(Second)).not.toThrow();
    expect(customElements.get("tabdeck-define-test")).toBe(First);
  });
});
