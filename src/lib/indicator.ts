// Computes the inline style for the sliding active-tab indicator from the
// selected tab's offset box. Kept pure so it is testable without real layout
// (jsdom reports zero offsets); the on-screen positioning is verified on the
// dev-HA instance. The indicator is a full tab-sized box translated over the
// active tab; per-style appearance (underline bar vs filled thumb) is CSS.

export interface IndicatorBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function indicatorStyle(box: IndicatorBox | null, accent?: string): string {
  if (!box || (box.width === 0 && box.height === 0)) return "opacity:0;";
  let css =
    `transform: translate(${box.left}px, ${box.top}px);` +
    `width:${box.width}px;height:${box.height}px;opacity:1;`;
  if (accent) css += `--tabdeck-accent:${accent};`;
  return css;
}
