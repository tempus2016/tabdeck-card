import { describe, it, expect } from "vitest";
import { normalizeWizard, wizardStep } from "./wizard";

describe("normalizeWizard", () => {
  it("takes true or an object with a finish_action", () => {
    expect(normalizeWizard(true)).toEqual({});
    expect(normalizeWizard({ finish_action: { action: "navigate", navigation_path: "/" } })).toEqual({
      finish_action: { action: "navigate", navigation_path: "/" },
    });
    expect(normalizeWizard({ finish_action: { action: "none" } })).toEqual({});
    expect(normalizeWizard(false)).toBeUndefined();
    expect(normalizeWizard([])).toBeUndefined();
  });
});

describe("wizardStep", () => {
  // Visible tabs 0..4, where 2 is disabled (not a step).
  const steps = [0, 1, 3, 4];

  it("counts steps and finds the neighbours", () => {
    expect(wizardStep(steps, 0)).toEqual({ step: 1, total: 4, prev: -1, next: 1, last: false, percent: 25 });
    expect(wizardStep(steps, 1)).toMatchObject({ step: 2, prev: 0, next: 3 });
    expect(wizardStep(steps, 4)).toEqual({ step: 4, total: 4, prev: 3, next: -1, last: true, percent: 100 });
  });

  it("copes with a selection that isn't a step, and with no steps", () => {
    expect(wizardStep(steps, 2).step).toBe(1);
    expect(wizardStep([], 0)).toMatchObject({ step: 0, total: 0, last: true, percent: 0 });
  });
});
