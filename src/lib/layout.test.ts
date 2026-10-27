import { describe, it, expect } from "vitest";
import { normalizeConfig, normalizeTab } from "./config";
import { cardGridColumns, cssBackground, cssLength, distributeMasonry, peekCommit, sectionColumns, transitionFrames } from "./layout";

const one = { tabs: [{ card: { type: "markdown" } }] };

describe("transitions", () => {
  it("accepts scale, flip and rise; unknown falls back to none", () => {
    for (const t of ["scale", "flip", "rise"]) {
      expect(normalizeConfig({ ...one, transition: t }).transition).toBe(t);
    }
    expect(normalizeConfig({ ...one, transition: "zoom" }).transition).toBe("none");
  });

  it("transition_duration defaults to 180 ms and clamps to [0, 2000]", () => {
    expect(normalizeConfig(one).transition_duration).toBe(180);
    expect(normalizeConfig({ ...one, transition_duration: 400 }).transition_duration).toBe(400);
    expect(normalizeConfig({ ...one, transition_duration: 9999 }).transition_duration).toBe(2000);
    expect(normalizeConfig({ ...one, transition_duration: -5 }).transition_duration).toBe(0);
  });

  it("transition_easing defaults to ease and keeps a string", () => {
    expect(normalizeConfig(one).transition_easing).toBe("ease");
    expect(normalizeConfig({ ...one, transition_easing: "cubic-bezier(.2,0,0,1)" }).transition_easing).toBe(
      "cubic-bezier(.2,0,0,1)",
    );
  });

  it("slide comes in from the side of travel", () => {
    expect(transitionFrames("slide", 1)[0].transform).toBe("translateX(12px)");
    expect(transitionFrames("slide", -1)[0].transform).toBe("translateX(-12px)");
  });

  it("has keyframes for every animated mode and none for none", () => {
    expect(transitionFrames("none", 1)).toEqual([]);
    for (const m of ["fade", "scale", "flip", "rise"] as const) {
      const f = transitionFrames(m, 1);
      expect(f.length).toBe(2);
      expect(f[1].opacity).toBe(1);
    }
    expect(transitionFrames("scale", 1)[0].transform).toContain("scale");
    expect(transitionFrames("flip", -1)[0].transform).toContain("rotateY(-");
    expect(transitionFrames("rise", 1)[0].transform).toContain("translateY");
  });
});

describe("cssLength", () => {
  it("numbers are px, CSS lengths pass through, junk is undefined", () => {
    expect(cssLength(300)).toBe("300px");
    expect(cssLength("40vh")).toBe("40vh");
    expect(cssLength("calc(100vh - 200px)")).toBe("calc(100vh - 200px)");
    expect(cssLength("")).toBeUndefined();
    expect(cssLength(0)).toBeUndefined();
    expect(cssLength("x; color: red")).toBeUndefined();
    expect(cssLength(undefined)).toBeUndefined();
  });
});

describe("content height", () => {
  it("content_height: auto by default, tallest, or a length", () => {
    expect(normalizeConfig(one).content_height).toBe("auto");
    expect(normalizeConfig({ ...one, content_height: "tallest" }).content_height).toBe("tallest");
    expect(normalizeConfig({ ...one, content_height: 320 }).content_height).toBe("320px");
    expect(normalizeConfig({ ...one, content_height: "50vh" }).content_height).toBe("50vh");
    expect(normalizeConfig({ ...one, content_height: "bogus;" }).content_height).toBe("auto");
  });

  it("content_max_height is an optional length", () => {
    expect(normalizeConfig(one).content_max_height).toBeUndefined();
    expect(normalizeConfig({ ...one, content_max_height: 500 }).content_max_height).toBe("500px");
  });
});

describe("cssBackground", () => {
  it("wraps image paths and URLs in url(), passes other CSS through", () => {
    expect(cssBackground("/local/bg.jpg")).toBe('center / cover no-repeat url("/local/bg.jpg")');
    expect(cssBackground("https://x.test/a.png")).toBe('center / cover no-repeat url("https://x.test/a.png")');
    expect(cssBackground("linear-gradient(#000, #fff)")).toBe("linear-gradient(#000, #fff)");
    expect(cssBackground("var(--card-background-color)")).toBe("var(--card-background-color)");
    expect(cssBackground("  ")).toBeUndefined();
    expect(cssBackground(undefined)).toBeUndefined();
  });

  it("refuses values that would break out of the declaration", () => {
    expect(cssBackground("red; position: fixed")).toBeUndefined();
    expect(cssBackground('/local/a".jpg')).toBeUndefined();
  });

  it("is a per-tab key kept by normalizeTab", () => {
    expect(normalizeTab({ background: "#123", card: {} }).background).toBe("#123");
    expect(normalizeTab({ card: {} }).background).toBeUndefined();
  });
});

describe("masonry", () => {
  it("layout: masonry wraps cards in the masonry card", () => {
    const t = normalizeTab({ layout: "masonry", columns: 3, cards: [{ type: "a" }, { type: "b" }] });
    expect(t.card).toEqual({
      type: "custom:tabdeck-masonry-card",
      columns: 3,
      cards: [{ type: "a" }, { type: "b" }],
    });
    expect(t.layout).toBe("masonry");
  });

  it("min_column_width is passed through instead of a fixed count", () => {
    const t = normalizeTab({ layout: "masonry", min_column_width: 280, cards: [{ type: "a" }] });
    expect(t.card).toEqual({ type: "custom:tabdeck-masonry-card", min_column_width: 280, cards: [{ type: "a" }] });
  });

  it("without layout, cards still become a stack or grid", () => {
    expect(normalizeTab({ cards: [{ type: "a" }] }).card.type).toBe("vertical-stack");
    expect(normalizeTab({ columns: 2, cards: [{ type: "a" }] }).card.type).toBe("grid");
  });

  it("distributes cards into the shortest column, keeping order inside columns", () => {
    expect(distributeMasonry([3, 1, 1, 1], 2)).toEqual([[0], [1, 2, 3]]);
    expect(distributeMasonry([1, 1, 1, 1], 2)).toEqual([[0, 2], [1, 3]]);
    expect(distributeMasonry([2, 2], 4)).toEqual([[0], [1], [], []]);
    expect(distributeMasonry([], 3)).toEqual([[], [], []]);
  });
});

describe("header and footer cards", () => {
  it("are optional card lists", () => {
    const c = normalizeConfig({ ...one, header_cards: [{ type: "a" }], footer_cards: [{ type: "b" }] });
    expect(c.header_cards).toEqual([{ type: "a" }]);
    expect(c.footer_cards).toEqual([{ type: "b" }]);
    expect(normalizeConfig(one).header_cards).toBeUndefined();
    expect(normalizeConfig({ ...one, header_cards: [] }).header_cards).toBeUndefined();
    expect(normalizeConfig({ ...one, header_cards: "x" }).header_cards).toBeUndefined();
  });
});

describe("fullscreen, swipe_peek, unload_after", () => {
  it("fullscreen and swipe_peek default off", () => {
    expect(normalizeConfig(one).fullscreen).toBe(false);
    expect(normalizeConfig({ ...one, fullscreen: true }).fullscreen).toBe(true);
    expect(normalizeConfig(one).swipe_peek).toBe(false);
    expect(normalizeConfig({ ...one, swipe_peek: true }).swipe_peek).toBe(true);
  });

  it("unload_after is minutes (>= 1), absent or 0 = off", () => {
    expect(normalizeConfig(one).unload_after).toBeUndefined();
    expect(normalizeConfig({ ...one, unload_after: 0 }).unload_after).toBeUndefined();
    expect(normalizeConfig({ ...one, unload_after: 10 }).unload_after).toBe(10);
    expect(normalizeConfig({ ...one, unload_after: 0.1 }).unload_after).toBe(1);
  });
});

describe("peekCommit", () => {
  it("commits past a third of the width, or on a quick flick", () => {
    expect(peekCommit(-150, 400, 0.1)).toBe("next");
    expect(peekCommit(150, 400, 0.1)).toBe("prev");
    expect(peekCommit(-60, 400, 0.1)).toBe(null);
    expect(peekCommit(-60, 400, 0.8)).toBe("next");
    expect(peekCommit(-10, 400, 2)).toBe(null);
  });
});

describe("sections", () => {
  const sections = [
    { title: "Living room", icon: "mdi:sofa", cards: [{ type: "tile" }] },
    { title: "Outside", column_span: 2, cards: [{ type: "picture" }] },
  ];

  it("layout: sections wraps the sections in the sections card", () => {
    const t = normalizeTab({ name: "Home", layout: "sections", max_columns: 3, sections });
    expect(t.layout).toBe("sections");
    expect(t.card).toEqual({ type: "custom:tabdeck-sections-card", max_columns: 3, sections });
  });

  it("max_columns defaults to 4, like HA's sections view", () => {
    expect(normalizeTab({ layout: "sections", sections }).card).toEqual({
      type: "custom:tabdeck-sections-card",
      max_columns: 4,
      sections,
    });
  });

  it("needs a sections list", () => {
    const t = normalizeTab({ layout: "sections", card: { type: "x" } });
    expect(t.layout).toBeUndefined();
    expect(t.card).toEqual({ type: "x" });
  });

  it("works out section columns from the width, capped by max_columns", () => {
    expect(sectionColumns(1400, 4)).toBe(4);
    expect(sectionColumns(1000, 4)).toBe(3);
    expect(sectionColumns(1000, 2)).toBe(2);
    expect(sectionColumns(500, 4)).toBe(1);
    expect(sectionColumns(0, 4)).toBe(1);
  });

  it("reads a card's width on the 12-column grid", () => {
    expect(cardGridColumns({ grid_options: { columns: 6 } })).toBe(6);
    expect(cardGridColumns({ grid_options: { columns: "full" } })).toBe(12);
    expect(cardGridColumns({ grid_options: { columns: 40 } })).toBe(12);
    expect(cardGridColumns({ layout_options: { grid_columns: 2 } })).toBe(6);
    expect(cardGridColumns({}, { columns: 6 })).toBe(6);
    expect(cardGridColumns({}, { columns: "full" })).toBe(12);
    expect(cardGridColumns({})).toBe(12);
  });
});

describe("transition_narrow", () => {
  it("is an optional transition for narrow cards", () => {
    expect(normalizeConfig(one).transition_narrow).toBeUndefined();
    expect(normalizeConfig({ ...one, transition_narrow: "none" }).transition_narrow).toBe("none");
    expect(normalizeConfig({ ...one, transition_narrow: "fade" }).transition_narrow).toBe("fade");
    expect(normalizeConfig({ ...one, transition_narrow: "zoom" }).transition_narrow).toBeUndefined();
  });
});
