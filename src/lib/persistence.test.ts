import { describe, it, expect } from "vitest";
import {
  storageKey,
  loadInitialIndex,
  persistIndex,
  parseHashIndex,
  rememberedIndex,
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
  it("matches a tab name case-insensitively and by slug", () => {
    expect(parseHashIndex("#tab=lights", ["Lights", "Climate"])).toBe(0);
    expect(parseHashIndex("#tab=living-room", ["Kitchen", "Living Room"])).toBe(1);
    expect(parseHashIndex("#tab=Living%20Room", ["Kitchen", "Living Room"])).toBe(1);
  });
  it("prefers an exact name over a slug match", () => {
    expect(parseHashIndex("#tab=a-b", ["A B", "a-b"])).toBe(1);
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

describe("remember: browser by name", () => {
  const mem = () => {
    const m = new Map<string, string>();
    return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) } as any;
  };
  it("stores the tab name and finds it after the order changes", () => {
    const storage = mem();
    persistIndex({ mode: "browser", cardKey: "k", index: 2, tabName: "Lights", storage });
    expect(storage.getItem(storageKey("k"))).toBe("name:Lights");
    const idx = loadInitialIndex({ mode: "browser", cardKey: "k", defaultIndex: 0, tabCount: 3, tabNames: ["Lights", "A", "B"], storage });
    expect(idx).toBe(0);
  });
  it("still reads an older saved index", () => {
    const storage = mem();
    storage.setItem(storageKey("k"), "1");
    expect(loadInitialIndex({ mode: "browser", cardKey: "k", defaultIndex: 0, tabCount: 3, tabNames: ["A", "B", "C"], storage })).toBe(1);
  });
  it("falls back to the default when the named tab is gone", () => {
    const storage = mem();
    storage.setItem(storageKey("k"), "name:Gone");
    expect(loadInitialIndex({ mode: "browser", cardKey: "k", defaultIndex: 2, tabCount: 3, tabNames: ["A", "B", "C"], storage })).toBe(2);
  });
});

describe("rememberedIndex", () => {
  const base = { cardKey: "k", tabCount: 3, tabNames: ["A", "B", "C"] };
  it("is null when nothing is remembered", () => {
    expect(rememberedIndex({ ...base, mode: "none" })).toBeNull();
    expect(rememberedIndex({ ...base, mode: "browser", storage: memStorage() })).toBeNull();
    expect(rememberedIndex({ ...base, mode: "browser", storage: memStorage({ [storageKey("k")]: "name:Gone" }) })).toBeNull();
    expect(rememberedIndex({ ...base, mode: "url", hash: "" })).toBeNull();
    expect(rememberedIndex({ ...base, mode: "entity", entityValue: "unknown" })).toBeNull();
    expect(rememberedIndex({ ...base, mode: "entity", entityValue: "" })).toBeNull();
  });
  it("finds a remembered tab", () => {
    expect(rememberedIndex({ ...base, mode: "browser", storage: memStorage({ [storageKey("k")]: "name:C" }) })).toBe(2);
    expect(rememberedIndex({ ...base, mode: "browser", storage: memStorage({ [storageKey("k")]: "1" }) })).toBe(1);
    expect(rememberedIndex({ ...base, mode: "url", hash: "#tab=b" })).toBe(1);
    expect(rememberedIndex({ ...base, mode: "entity", entityValue: "2.0" })).toBe(2);
    expect(rememberedIndex({ ...base, mode: "entity", entityValue: "7" })).toBeNull();
  });
});
