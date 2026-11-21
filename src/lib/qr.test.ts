import { describe, it, expect } from "vitest";
import { encodeQr, formatBits, qrSvgPath, rsDivisor, rsRemainder } from "./qr";

describe("QR encoder", () => {
  it("computes Reed-Solomon ECC (the HELLO WORLD 1-M example)", () => {
    const data = [32, 91, 11, 120, 209, 114, 220, 77, 67, 64, 236, 17, 236, 17, 236, 17];
    expect(rsRemainder(data, rsDivisor(10))).toEqual([196, 35, 39, 119, 235, 215, 231, 226, 93, 23]);
  });

  it("computes the BCH-protected format bits", () => {
    expect(formatBits("M", 0).toString(2).padStart(15, "0")).toBe("101010000010010");
    expect(formatBits("L", 4).toString(2).padStart(15, "0")).toBe("110011000101111");
    expect(formatBits("H", 7).toString(2).padStart(15, "0")).toBe("000100000111011");
  });

  it("picks the smallest version that fits", () => {
    expect(encodeQr("A").version).toBe(1);
    expect(encodeQr("A").size).toBe(21);
    const url = "http://192.168.1.20:8123/dashboard-home/0#tab=living-room";
    expect(encodeQr(url).version).toBe(4);
    expect(encodeQr("x".repeat(400)).version).toBe(15);
    expect(() => encodeQr("x".repeat(3000), "H")).toThrow();
  });

  it("draws the three finder patterns and the timing lines", () => {
    const { modules, size } = encodeQr("tabdeck");
    const finder = (x0: number, y0: number) =>
      [0, 1, 2, 3, 4, 5, 6].map((y) => [0, 1, 2, 3, 4, 5, 6].map((x) => (modules[y0 + y][x0 + x] ? 1 : 0)).join("")).join("/");
    const expected = "1111111/1000001/1011101/1011101/1011101/1000001/1111111";
    expect(finder(0, 0)).toBe(expected);
    expect(finder(size - 7, 0)).toBe(expected);
    expect(finder(0, size - 7)).toBe(expected);
    for (let i = 8; i < size - 8; i++) {
      expect(modules[6][i]).toBe(i % 2 === 0);
      expect(modules[i][6]).toBe(i % 2 === 0);
    }
    // The always-dark module.
    expect(modules[size - 8][8]).toBe(true);
  });

  it("draws an SVG path with a quiet zone", () => {
    const qr = encodeQr("A");
    const path = qrSvgPath(qr, 4);
    expect(path.startsWith("M4 4h1v1h-1z")).toBe(true);
    expect(path.match(/M/g)!.length).toBe(qr.modules.flat().filter(Boolean).length);
  });
});
