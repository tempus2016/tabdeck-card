// The docs clips (scripts/clips/clips.mjs) point at demo examples that exist,
// and the gallery page shows every clip.
/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
// @ts-ignore: plain .mjs used by the recording script
import { CLIPS } from "../../scripts/clips/clips.mjs";
import { EXAMPLES } from "../../demo/examples";
import gallery from "../../wiki/Gallery.md?raw";

const webp = Object.keys(import.meta.glob("../../wiki/images/clips/*.webp")).map((p) => p.split("/").pop());

describe("docs clips", () => {
  it("each clip opens a demo example and the gallery shows it", () => {
    expect(CLIPS.length).toBeGreaterThanOrEqual(4);
    const names = new Set<string>();
    for (const c of CLIPS as any[]) {
      expect(c.name).toMatch(/^[a-z0-9-]+$/);
      expect(names.has(c.name)).toBe(false);
      names.add(c.name);
      const [page, hash] = c.page.split("#");
      expect(page).toBe("index.html");
      expect(EXAMPLES.some((e) => e.id === hash), c.page).toBe(true);
      expect(typeof c.play).toBe("function");
      expect(gallery).toContain(`images/clips/${c.name}.webp`);
      expect(webp, `wiki/images/clips/${c.name}.webp: run scripts/clips/record-clips.mjs`).toContain(`${c.name}.webp`);
      expect(gallery).toContain(`demo/#${hash})`);
    }
  });
});
