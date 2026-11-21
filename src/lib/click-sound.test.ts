import { describe, it, expect, vi, afterEach } from "vitest";

// A minimal AudioContext that records what was made.
function fakeAudio() {
  const made: any[] = [];
  const param = () => ({ setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() });
  class AC {
    state = "running";
    currentTime = 1;
    destination = {};
    constructor() {
      made.push({ ctx: this });
    }
    resume = vi.fn();
    createOscillator() {
      const o = { type: "", frequency: param(), connect: vi.fn(), start: vi.fn(), stop: vi.fn() };
      made.push({ osc: o });
      return o;
    }
    createGain() {
      const g = { gain: param(), connect: vi.fn() };
      made.push({ gain: g });
      return g;
    }
  }
  (window as any).AudioContext = AC;
  return made;
}

afterEach(() => {
  delete (window as any).AudioContext;
  vi.resetModules();
});

describe("click sound", () => {
  it("normalises true / a volume", async () => {
    const { normalizeClickSound } = await import("./click-sound");
    expect(normalizeClickSound(true)).toBe(0.3);
    expect(normalizeClickSound(0.555)).toBe(0.56);
    expect(normalizeClickSound(4)).toBe(1);
    expect(normalizeClickSound(0)).toBeUndefined();
    expect(normalizeClickSound("loud")).toBeUndefined();
    expect(normalizeClickSound(undefined)).toBeUndefined();
  });

  it("plays a short synthesised tick at the volume, reusing one audio context", async () => {
    const made = fakeAudio();
    const { playClick } = await import("./click-sound");
    expect(playClick(0.5)).toBe(true);
    expect(playClick(0.5)).toBe(true);
    expect(made.filter((m) => m.ctx).length).toBe(1);
    const osc = made.find((m) => m.osc).osc;
    expect(osc.start).toHaveBeenCalledWith(1);
    expect(osc.stop).toHaveBeenCalledWith(1.06);
    const gain = made.find((m) => m.gain).gain;
    expect(gain.gain.exponentialRampToValueAtTime).toHaveBeenCalledWith(0.5, 1.003);
  });

  it("does nothing without Web Audio", async () => {
    const { playClick } = await import("./click-sound");
    expect(playClick(0.5)).toBe(false);
  });
});
