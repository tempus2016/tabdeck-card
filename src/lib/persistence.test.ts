import { describe, it, expect } from "vitest";
import {
  storageKey,
  loadInitialIndex,
  persistIndex,
  parseHashIndex,
} from "./persistence";

function memStorage(seed: Record<string, string> = {}): Storage {
  const m = new Map(Object.entries(seed));
  return {
    getItem: (k) => (m.has(k) ? m.get(k)! : null),
    setItem: (k, v) => void m.set(k, v),
    removeItem: (k) => void m.delete(k),
    clear: () => m.clear(),
    key: (i) => Array.from(m.keys())[i] ?? null,
    get length() {
      return m.size;
    },
  } as Storage;
}

describe("loadInitialIndex entity mode", () => {
  it("reads the index from the entity value, clamped", () => {
    expect(loadInitialIndex({ mode: "entity", cardKey: "k", defaultIndex: 0, tabCount: 3, entityValue: "2" })).toBe(2);
    expect(loadInitialIndex({ mode: "entity", cardKey: "k", defaultIndex: 1, tabCount: 3, entityValue: "9" })).toBe(1);
    expect(loadInitialIndex({ mode: "entity", cardKey: "k", defaultIndex: 1, tabCount: 3, entityValue: undefined })).toBe(1);
    expect(loadInitialIndex({ mode: "entity", cardKey: "k", defaultIndex: 0, tabCount: 3, entityValue: "x" })).toBe(0);
  });
});

describe("parseHashIndex", () => {
  it("matches a tab name", () => {
    expect(parseHashIndex("#tab=Lights", ["Lights", "Climate"])).toBe(0);
  });
  it("matches a numeric index", () => {
    expect(parseHashIndex("#tab=1", ["Lights", "Climate"])).toBe(1);
  });
  it("returns null for no/unknown hash", () => {
    expect(parseHashIndex("", ["A"])).toBeNull();
    expect(parseHashIndex("#tab=ZZ", ["A"])).toBeNull();
  });
});

describe("loadInitialIndex", () => {
  it("uses the default when mode is none", () => {
    expect(loadInitialIndex({ mode: "none", cardKey: "k", defaultIndex: 1, tabCount: 3 })).toBe(1);
  });
  it("reads localStorage when mode is browser", () => {
    const storage = memStorage({ [storageKey("k")]: "2" });
    expect(loadInitialIndex({ mode: "browser", cardKey: "k", defaultIndex: 0, tabCount: 3, storage })).toBe(2);
  });
  it("prefers the URL hash when mode is url", () => {
    expect(loadInitialIndex({ mode: "url", cardKey: "k", defaultIndex: 0, tabCount: 3, hash: "#tab=2" })).toBe(2);
  });
  it("clamps an out-of-range stored value to the default", () => {
    const storage = memStorage({ [storageKey("k")]: "9" });
    expect(loadInitialIndex({ mode: "browser", cardKey: "k", defaultIndex: 1, tabCount: 3, storage })).toBe(1);
  });
});

describe("persistIndex", () => {
  it("writes localStorage in browser mode", () => {
    const storage = memStorage();
    persistIndex({ mode: "browser", cardKey: "k", index: 2, storage });
    expect(storage.getItem(storageKey("k"))).toBe("2");
  });
  it("returns a hash in url mode using the tab name", () => {
    const r = persistIndex({ mode: "url", cardKey: "k", index: 1, tabName: "Climate" });
    expect(r.hash).toBe("#tab=Climate");
  });
  it("is a no-op in none mode", () => {
    const storage = memStorage();
    const r = persistIndex({ mode: "none", cardKey: "k", index: 1, storage });
    expect(r.hash).toBeUndefined();
    expect(storage.length).toBe(0);
  });
});
