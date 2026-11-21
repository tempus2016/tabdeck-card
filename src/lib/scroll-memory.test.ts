import { describe, it, expect, vi } from "vitest";
import { saveScroll, savedScroll, clearScrollMemory, scrollWithRetry } from "./scroll-memory";

describe("scroll_memory", () => {
  it("keeps one position per deck and tab", () => {
    clearScrollMemory();
    saveScroll("deck-a", "Lights", { page: 600, inner: 0 });
    saveScroll("deck-b", "Lights", { page: 50, inner: 10 });
    expect(savedScroll("deck-a", "Lights")).toEqual({ page: 600, inner: 0 });
    expect(savedScroll("deck-b", "Lights")).toEqual({ page: 50, inner: 10 });
    expect(savedScroll("deck-a", "Climate")).toBeUndefined();
  });

  it("tries again while the page is too short to reach the spot", () => {
    vi.useFakeTimers();
    try {
      let max = 300;
      let y = 0;
      const set = vi.fn((t: number) => (y = Math.min(t, max)));
      scrollWithRetry(() => y, set, 600);
      expect(y).toBe(300);
      max = 1000;
      vi.advanceTimersByTime(250);
      expect(y).toBe(600);
      vi.advanceTimersByTime(1000);
      expect(set).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });
});
