import { css } from "lit";

// Reduced motion: the device's "reduce motion" setting.
export function reducedMotion(): boolean {
  return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Included in every stylesheet with a transition or animation (a test
// checks): under reduced motion they finish at once. Rules that need a
// still replacement (the alert pulse's steady tint) keep their own block.
export const reducedMotionCss = css`
  @media (prefers-reduced-motion: reduce) {
    :host,
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
