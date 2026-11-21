import { describe, it, expect } from "vitest";
import { remoteStep } from "./remote-keywords";

describe("remoteStep", () => {
  it("reads next / previous / back / default and their synonyms", () => {
    expect(remoteStep("next")).toBe("next");
    expect(remoteStep(" Forward ")).toBe("next");
    expect(remoteStep("prev")).toBe("previous");
    expect(remoteStep("PREVIOUS")).toBe("previous");
    expect(remoteStep("back")).toBe("back");
    expect(remoteStep("last")).toBe("back");
    expect(remoteStep("default")).toBe("default");
    expect(remoteStep("start")).toBe("default");
  });

  it("is undefined for tab names and non-strings", () => {
    expect(remoteStep("Cameras")).toBeUndefined();
    expect(remoteStep(2)).toBeUndefined();
    expect(remoteStep(undefined)).toBeUndefined();
  });
});
