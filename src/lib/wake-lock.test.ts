import { describe, it, expect, vi, afterEach } from "vitest";
import { WakeLock } from "./wake-lock";

const flush = () => new Promise((r) => setTimeout(r, 0));

function fakeApi() {
  const sentinels: any[] = [];
  const api = {
    request: vi.fn(async () => {
      const listeners: any[] = [];
      const s = {
        released: false,
        release: vi.fn(async () => {
          s.released = true;
          listeners.forEach((l) => l());
        }),
        addEventListener: (_: string, l: any) => listeners.push(l),
      };
      sentinels.push(s);
      return s;
    }),
  };
  Object.defineProperty(navigator, "wakeLock", { value: api, configurable: true });
  return { api, sentinels };
}

afterEach(() => {
  delete (navigator as any).wakeLock;
  vi.restoreAllMocks();
});

describe("WakeLock", () => {
  it("takes the lock once, lets it go, and takes it again after the browser drops it", async () => {
    const { api, sentinels } = fakeApi();
    const w = new WakeLock();
    w.set(true);
    w.set(true);
    await flush();
    expect(api.request).toHaveBeenCalledTimes(1);
    expect(w.held).toBe(true);
    w.set(false);
    expect(sentinels[0].released).toBe(true);
    expect(w.held).toBe(false);
    w.set(true);
    await flush();
    // The page was hidden: the browser releases it; visible again -> set(true).
    await sentinels[1].release();
    expect(w.held).toBe(false);
    w.set(true);
    await flush();
    expect(api.request).toHaveBeenCalledTimes(3);
    expect(w.held).toBe(true);
  });

  it("a release asked for while the request runs wins", async () => {
    const { sentinels } = fakeApi();
    const w = new WakeLock();
    w.set(true);
    w.set(false);
    await flush();
    expect(w.held).toBe(false);
    expect(sentinels[0].release).toHaveBeenCalled();
  });

  it("is silent without the API (plain http) or when refused", async () => {
    const debug = vi.spyOn(console, "debug").mockImplementation(() => {});
    const w = new WakeLock();
    w.set(true);
    expect(w.held).toBe(false);
    expect(debug).toHaveBeenCalledWith(expect.stringContaining("https"));
    Object.defineProperty(navigator, "wakeLock", { value: { request: () => Promise.reject(new Error("NotAllowedError")) }, configurable: true });
    w.set(true);
    await flush();
    expect(w.held).toBe(false);
    expect(debug).toHaveBeenLastCalledWith("tabdeck-card: keep_awake refused:", "NotAllowedError");
  });
});
