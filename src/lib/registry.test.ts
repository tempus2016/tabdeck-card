import { describe, expect, it, vi } from "vitest";
import { TabdeckRegistry, tabdeckRegistry, type RegisteredDeck } from "./registry";

function fakeDeck(id: string, names: string[]): RegisteredDeck & { at: number } {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const deck = {
    deckId: id,
    element,
    at: 0,
    names: () => names,
    current: () => ({ index: deck.at, name: names[deck.at] }),
    select: (t: number | string) => {
      const i = t === "next" ? (deck.at + 1) % names.length : typeof t === "number" ? t : names.indexOf(t);
      if (i < 0 || i >= names.length) return false;
      deck.at = i;
      return true;
    },
  };
  return deck;
}

describe("TabdeckRegistry", () => {
  it("lists, gets and selects registered decks", () => {
    const reg = new TabdeckRegistry("1.0.0");
    const a = fakeDeck("main", ["Home", "Lights", "Cameras"]);
    const b = fakeDeck("kitchen", ["Recipes", "Timers"]);
    reg._register(a);
    reg._register(b);
    reg._register(a);
    expect(reg.list()).toEqual([
      { id: "main", tab: "Home", index: 0, tabs: 3, names: ["Home", "Lights", "Cameras"] },
      { id: "kitchen", tab: "Recipes", index: 0, tabs: 2, names: ["Recipes", "Timers"] },
    ]);
    expect(reg.get("main")!.select("Cameras")).toBe(true);
    expect(a.at).toBe(2);
    expect(reg.get("main")!.tab).toBe("Cameras");
    expect(reg.select("kitchen", "next")).toBe(true);
    expect(b.at).toBe(1);
    expect(reg.get("kitchen")!.next()).toBe(true);
    expect(b.at).toBe(0);
    expect(reg.select("nope", 0)).toBe(false);
    expect(reg.get("nope")).toBeUndefined();
    // No id: the first deck.
    expect(reg.get()!.id).toBe("main");
  });

  it("drops disconnected decks and fires added / removed / tab-changed", () => {
    const reg = new TabdeckRegistry("1.0.0");
    const seen: string[] = [];
    reg.addEventListener("added", (e) => seen.push("added " + (e as CustomEvent).detail.id));
    const off = reg.on("tab-changed", (d) => seen.push(`changed ${d.id} ${d.name} from ${d.previous}`));
    reg.on("removed", (d) => seen.push("removed " + d.id));
    const a = fakeDeck("main", ["Home", "Lights"]);
    const unregister = reg._register(a);
    reg._changed(a, 1, "Lights", "Home");
    off();
    reg._changed(a, 0, "Home", "Lights");
    a.element.remove();
    expect(reg.list()).toEqual([]);
    unregister();
    unregister();
    reg._changed(a, 1, "Lights", "Home");
    expect(seen).toEqual(["added main", "changed main Lights from Home", "removed main"]);
  });

  it("prefers the deck on screen when two share an id", () => {
    const reg = new TabdeckRegistry("1.0.0");
    const a = fakeDeck("same", ["A"]);
    const b = fakeDeck("same", ["B"]);
    (a.element as any).checkVisibility = () => false;
    (b.element as any).checkVisibility = () => true;
    reg._register(a);
    reg._register(b);
    expect(reg.get("same")!.names).toEqual(["B"]);
  });
});

describe("tabdeckRegistry", () => {
  it("puts one registry on window and reuses it", () => {
    const win: any = {};
    const r1 = tabdeckRegistry("1.0.0", win);
    expect(win.tabdeck).toBe(r1);
    expect(Object.keys(win)).toEqual([]);
    expect(tabdeckRegistry("2.0.0", win)).toBe(r1);
    expect(r1.version).toBe("1.0.0");
  });

  it("leaves someone else's window.tabdeck alone", () => {
    const theirs = { mine: true };
    const win: any = { tabdeck: theirs };
    const spy = vi.fn();
    const reg = tabdeckRegistry("1.0.0", win);
    reg.on("added", spy);
    expect(win.tabdeck).toBe(theirs);
    expect(reg).toBeInstanceOf(TabdeckRegistry);
  });
});
