import { describe, it, expect } from "vitest";
import type { TabdeckSelectEvent } from "./types";

describe("scaffolding", () => {
  it("constructs a typed select event", () => {
    const e: TabdeckSelectEvent = new CustomEvent("tabdeck-select", {
      detail: { index: 2 },
    });
    expect(e.detail.index).toBe(2);
  });
});
