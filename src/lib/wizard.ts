// wizard: the deck as a step-by-step guide. No tab bar; a step counter and
// progress bar above the content, Back and Next (Finish on the last step)
// below it. The steps are the visible tabs that can be opened.
export interface WizardConfig {
  // HA action run by Finish (then the guide returns to the first step).
  finish_action?: any;
}

export function normalizeWizard(raw: unknown): WizardConfig | undefined {
  if (raw === true) return {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const fa = (raw as any).finish_action;
  return fa && typeof fa === "object" && fa.action && fa.action !== "none" ? { finish_action: fa } : {};
}

export interface WizardStep {
  // 1-based step number and step count.
  step: number;
  total: number;
  // Visible indexes of the previous / next step (-1 at the ends).
  prev: number;
  next: number;
  last: boolean;
  // 0–100, the share of steps reached.
  percent: number;
}

// `steps`: visible indexes of the step tabs, in order; `selected`: the open one.
export function wizardStep(steps: number[], selected: number): WizardStep {
  const total = steps.length;
  const at = Math.max(0, steps.indexOf(selected));
  return {
    step: total ? at + 1 : 0,
    total,
    prev: at > 0 ? steps[at - 1] : -1,
    next: at < total - 1 ? steps[at + 1] : -1,
    last: at >= total - 1,
    percent: total ? Math.round(((at + 1) / total) * 100) : 0,
  };
}
