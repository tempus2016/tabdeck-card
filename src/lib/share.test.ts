import { describe, it, expect, vi } from "vitest";
import { copyText, normalizeShare, shareUrl } from "./share";

describe("share_button", () => {
  const loc = { origin: "http://ha.local:8123", pathname: "/lovelace/home", search: "?edit=0", hash: "#tab=old&x=1" };

  it("links to the tab by its slug, replacing any hash", () => {
    expect(shareUrl(loc, "Living Room", 3)).toBe("http://ha.local:8123/lovelace/home?edit=0#tab=living-room");
    expect(shareUrl(loc, "Cameras", 0)).toBe("http://ha.local:8123/lovelace/home?edit=0#tab=cameras");
  });

  it("falls back to the index when the name has no slug", () => {
    expect(shareUrl(loc, undefined, 2)).toBe("http://ha.local:8123/lovelace/home?edit=0#tab=2");
    expect(shareUrl(loc, "🔥", 1)).toBe("http://ha.local:8123/lovelace/home?edit=0#tab=1");
  });

  it("normalises the option", () => {
    expect(normalizeShare(undefined)).toBeUndefined();
    expect(normalizeShare(false)).toBeUndefined();
    expect(normalizeShare(true)).toBe("link");
    expect(normalizeShare("qr")).toBe("qr");
    expect(normalizeShare({ qr: true })).toBe("qr");
  });

  it("copies with the clipboard API, else with a hidden text area", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    expect(await copyText("a", { clipboard: { writeText } as any, secure: true })).toBe(true);
    expect(writeText).toHaveBeenCalledWith("a");
    const exec = vi.fn().mockReturnValue(true);
    (document as any).execCommand = exec;
    expect(await copyText("b", { secure: false })).toBe(true);
    expect(exec).toHaveBeenCalledWith("copy");
    exec.mockReturnValue(false);
    expect(await copyText("c", { secure: false })).toBe(false);
    expect(document.querySelector("textarea")).toBeNull();
  });
});
