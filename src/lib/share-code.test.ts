import { describe, it, expect } from "vitest";
import { decodeShare, encodeShare, fromBase64Url, toBase64Url } from "./share-code";

const yaml = "tabs:\n  - name: Küche ☕\n    icon: mdi:stove\n" + "  - name: Garden\n    icon: mdi:flower\n".repeat(20);

describe("playground share links", () => {
  it("base64url round-trips bytes without + / =", () => {
    const bytes = new Uint8Array([0, 251, 255, 62, 63, 1, 2]);
    const s = toBase64Url(bytes);
    expect(s).not.toMatch(/[+/=]/);
    expect([...fromBase64Url(s)]).toEqual([...bytes]);
  });

  it("packs the YAML compressed and gets it back", async () => {
    const hash = await encodeShare(yaml);
    expect(hash.startsWith("code=")).toBe(true);
    expect(hash.length).toBeLessThan(yaml.length);
    expect(await decodeShare(`#${hash}`)).toBe(yaml);
  });

  it("falls back to plain base64 without CompressionStream", async () => {
    const hash = await encodeShare(yaml, false);
    expect(hash.startsWith("yaml=")).toBe(true);
    expect(await decodeShare(hash)).toBe(yaml);
  });

  it("ignores other hashes and broken codes", async () => {
    expect(await decodeShare("#groups")).toBeUndefined();
    expect(await decodeShare("")).toBeUndefined();
    expect(await decodeShare("#code=!!!notbase64")).toBeUndefined();
    expect(await decodeShare("#code=AAAA")).toBeUndefined();
  });
});
