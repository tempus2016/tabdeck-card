# Sliding Indicator Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static per-tab active highlight with a single indicator element that slides and resizes to the active tab across all three styles and four positions.

**Architecture:** One absolutely-positioned `<div class="indicator">` lives inside the scrolling `.bar` of `tabdeck-tabbar`. Its geometry is computed by a pure helper (`lib/indicator.ts`) from the selected tab's `offset*` box, written as inline `left/top/width/height`, and animated by a CSS transition gated behind an `.animate` class. A new `animated` config option (default `true`) and `prefers-reduced-motion` both control whether the slide animates or snaps.

**Tech Stack:** TypeScript, Lit 3, Vite, Vitest (jsdom).

## Global Constraints

- **No Claude co-author attribution** anywhere in commits or files — no `Co-Authored-By`, no "Generated with Claude" footers.
- Git identity: `tempus2016` / `john_mackinnon@live.co.uk`.
- Complete files / complete code — no snippets-as-placeholders.
- TDD: failing test first, then minimal implementation.
- jsdom has **no** `ResizeObserver` and reports `offset*` as `0`; all DOM-geometry code must guard for both and never throw.
- Default for `animated` is `true`. `prefers-reduced-motion: reduce` always snaps regardless of `animated`.
- Indicator thickness for the `underline` style is a constant `3px` (matches today's underline).

---

### Task 1: Add `animated` config option

**Files:**
- Modify: `src/lib/config.ts` (interface `TabdeckCardConfig`, `normalizeConfig`)
- Test: `src/lib/config.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `TabdeckCardConfig.animated: boolean`, defaulted in `normalizeConfig` to `true` unless explicitly `false`.

- [ ] **Step 1: Write the failing test**

Add to `src/lib/config.test.ts` inside the `describe("normalizeConfig", ...)` block:

```ts
it("defaults animated to true and respects explicit false", () => {
  expect(normalizeConfig({ tabs: [{ card: {} }] }).animated).toBe(true);
  expect(normalizeConfig({ animated: false, tabs: [{ card: {} }] }).animated).toBe(false);
  expect(normalizeConfig({ animated: true, tabs: [{ card: {} }] }).animated).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/config.test.ts`
Expected: FAIL — `animated` is `undefined`, not `true`.

- [ ] **Step 3: Write minimal implementation**

In `src/lib/config.ts`, add the field to the interface (after `lazy: boolean;`):

```ts
  lazy: boolean;
  animated: boolean;
  styles: Record<string, string>;
```

And in `normalizeConfig`'s returned object (after the `lazy:` line):

```ts
    lazy: Boolean(raw?.lazy),
    animated: raw?.animated === undefined ? true : Boolean(raw.animated),
    styles: raw?.styles ?? {},
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/config.test.ts`
Expected: PASS (all tests in file).

- [ ] **Step 5: Commit**

```bash
git add src/lib/config.ts src/lib/config.test.ts
git commit -m "feat: add animated config option (default true)"
```

---

### Task 2: Pure indicator-geometry helper

**Files:**
- Create: `src/lib/indicator.ts`
- Test: `src/lib/indicator.test.ts`

**Interfaces:**
- Consumes: `TabPosition`, `TabStyle` from `./config`.
- Produces:
  - `interface TabGeometry { offsetLeft: number; offsetTop: number; offsetWidth: number; offsetHeight: number }`
  - `interface IndicatorRect { left: number; top: number; width: number; height: number }`
  - `function computeIndicatorRect(tab: TabGeometry, position: TabPosition, style: TabStyle): IndicatorRect | null` — returns `null` when `tab.offsetWidth <= 0` (unmeasurable / jsdom).

- [ ] **Step 1: Write the failing test**

Create `src/lib/indicator.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { computeIndicatorRect } from "./indicator";

const tab = { offsetLeft: 10, offsetTop: 20, offsetWidth: 100, offsetHeight: 48 };

describe("computeIndicatorRect", () => {
  it("returns null when the tab is unmeasurable", () => {
    const zero = { offsetLeft: 0, offsetTop: 0, offsetWidth: 0, offsetHeight: 0 };
    expect(computeIndicatorRect(zero, "top", "underline")).toBeNull();
  });

  it("underline top: 3px bar at the bottom edge", () => {
    expect(computeIndicatorRect(tab, "top", "underline")).toEqual({
      left: 10, top: 65, width: 100, height: 3,
    });
  });

  it("underline bottom: 3px bar at the top edge", () => {
    expect(computeIndicatorRect(tab, "bottom", "underline")).toEqual({
      left: 10, top: 20, width: 100, height: 3,
    });
  });

  it("underline left: 3px bar at the right edge", () => {
    expect(computeIndicatorRect(tab, "left", "underline")).toEqual({
      left: 107, top: 20, width: 3, height: 48,
    });
  });

  it("underline right: 3px bar at the left edge", () => {
    expect(computeIndicatorRect(tab, "right", "underline")).toEqual({
      left: 10, top: 20, width: 3, height: 48,
    });
  });

  it("pill: full tab box", () => {
    expect(computeIndicatorRect(tab, "top", "pill")).toEqual({
      left: 10, top: 20, width: 100, height: 48,
    });
  });

  it("segmented: full tab box regardless of position", () => {
    expect(computeIndicatorRect(tab, "left", "segmented")).toEqual({
      left: 10, top: 20, width: 100, height: 48,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/indicator.test.ts`
Expected: FAIL — cannot resolve `./indicator`.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/indicator.ts`:

```ts
import type { TabPosition, TabStyle } from "./config";

export interface TabGeometry {
  offsetLeft: number;
  offsetTop: number;
  offsetWidth: number;
  offsetHeight: number;
}

export interface IndicatorRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

// Matches the original static underline thickness.
const THICKNESS = 3;

// Geometry of the moving indicator over the selected tab. Pure so the math is
// testable without a DOM (jsdom reports offset* as 0 → null, never throws).
export function computeIndicatorRect(
  tab: TabGeometry,
  position: TabPosition,
  style: TabStyle,
): IndicatorRect | null {
  if (!tab || tab.offsetWidth <= 0) return null;

  if (style === "pill" || style === "segmented") {
    return {
      left: tab.offsetLeft,
      top: tab.offsetTop,
      width: tab.offsetWidth,
      height: tab.offsetHeight,
    };
  }

  // underline: a THICKNESS-thin bar on the bar's inner edge.
  switch (position) {
    case "top":
      return {
        left: tab.offsetLeft,
        top: tab.offsetTop + tab.offsetHeight - THICKNESS,
        width: tab.offsetWidth,
        height: THICKNESS,
      };
    case "bottom":
      return {
        left: tab.offsetLeft,
        top: tab.offsetTop,
        width: tab.offsetWidth,
        height: THICKNESS,
      };
    case "left":
      return {
        left: tab.offsetLeft + tab.offsetWidth - THICKNESS,
        top: tab.offsetTop,
        width: THICKNESS,
        height: tab.offsetHeight,
      };
    case "right":
      return {
        left: tab.offsetLeft,
        top: tab.offsetTop,
        width: THICKNESS,
        height: tab.offsetHeight,
      };
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/indicator.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/indicator.ts src/lib/indicator.test.ts
git commit -m "feat: pure indicator-geometry helper"
```

---

### Task 3: Render, position, and animate the indicator in the tab bar

**Files:**
- Modify: `src/components/tabdeck-tabbar.ts` (add `animated` property, indicator element, positioning, ResizeObserver, styling cleanup)
- Modify: `src/tabdeck-card.ts` (pass `.animated=${cfg.animated}` to `<tabdeck-tabbar>`)
- Test: `src/components/tabdeck-tabbar.test.ts`

**Interfaces:**
- Consumes: `computeIndicatorRect`, `TabGeometry` from `../lib/indicator`; `TabdeckCardConfig.animated` from Task 1.
- Produces: `<tabdeck-tabbar>` renders exactly one `.indicator` child of `.bar`; `.indicator` gains the `animate` class iff `animated` is true and the first paint has completed.

- [ ] **Step 1: Write the failing tests**

Add to `src/components/tabdeck-tabbar.test.ts`. First add a helper that waits one animation frame, near the top after the imports:

```ts
const nextFrame = () =>
  new Promise<void>((r) => requestAnimationFrame(() => r()));
```

Then add these tests inside the `describe("tabdeck-tabbar", ...)` block:

```ts
it("renders a single indicator element inside the bar", async () => {
  const el = await mount();
  const bar = el.shadowRoot.querySelector(".bar");
  expect(bar.querySelectorAll(".indicator")).toHaveLength(1);
});

it("hides the indicator (opacity 0) when offsets are unmeasurable in jsdom", async () => {
  const el = await mount();
  expect(el.shadowRoot.querySelector(".indicator").style.opacity).toBe("0");
});

it("adds the animate class after first paint when animated (default)", async () => {
  const el = await mount();
  await nextFrame();
  await el.updateComplete;
  expect(
    el.shadowRoot.querySelector(".indicator").classList.contains("animate"),
  ).toBe(true);
});

it("never adds the animate class when animated is false", async () => {
  const el = document.createElement("tabdeck-tabbar") as any;
  el.items = [{ name: "A" }, { name: "B" }, { name: "C" }];
  el.selected = 0;
  el.animated = false;
  document.body.appendChild(el);
  await el.updateComplete;
  await nextFrame();
  await el.updateComplete;
  expect(
    el.shadowRoot.querySelector(".indicator").classList.contains("animate"),
  ).toBe(false);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/tabdeck-tabbar.test.ts`
Expected: FAIL — no `.indicator` element exists.

- [ ] **Step 3: Write the implementation**

Replace the entire contents of `src/components/tabdeck-tabbar.ts` with:

```ts
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { TabPosition, TabStyle } from "../lib/config";
import { computeIndicatorRect } from "../lib/indicator";
import "./tabdeck-tab";

interface TabItem {
  name?: string;
  icon?: string;
  accent?: string;
  badge?: string;
}

@customElement("tabdeck-tabbar")
export class TabdeckTabbar extends LitElement {
  @property({ attribute: false }) items: TabItem[] = [];
  @property({ type: Number }) selected = 0;
  @property() position: TabPosition = "top";
  @property() tabStyle: TabStyle = "underline";
  @property() scrollable: "auto" | boolean = "auto";
  @property({ type: Boolean }) animated = true;

  // Becomes true one frame after the first paint, so the indicator's initial
  // placement never slides in from the corner; only later moves animate.
  @state() private _ready = false;

  private _resizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.addEventListener("keydown", this._onKeydown);
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver(() => this._position());
    }
  }

  disconnectedCallback(): void {
    this.removeEventListener("keydown", this._onKeydown);
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  private _select(index: number): void {
    this.dispatchEvent(
      new CustomEvent("tabdeck-select", {
        detail: { index },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onKeydown = (e: KeyboardEvent): void => {
    const last = this.items.length - 1;
    const vertical = this.position === "left" || this.position === "right";
    const next = vertical ? "ArrowDown" : "ArrowRight";
    const prev = vertical ? "ArrowUp" : "ArrowLeft";
    let target: number | null = null;
    if (e.key === next) target = this.selected >= last ? 0 : this.selected + 1;
    else if (e.key === prev) target = this.selected <= 0 ? last : this.selected - 1;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = last;
    if (target !== null) {
      e.preventDefault();
      this._select(target);
    }
  };

  // Measure the selected tab and write the indicator's box inline. Guards for
  // jsdom / pre-layout (offset* == 0) by hiding the indicator instead of moving
  // it to (0,0).
  private _position(): void {
    const root = this.renderRoot as ParentNode | undefined;
    const indicator = root?.querySelector(".indicator") as HTMLElement | null;
    if (!indicator) return;
    const tab = root?.querySelector("tabdeck-tab[selected]") as HTMLElement | null;
    const rect = tab
      ? computeIndicatorRect(
          {
            offsetLeft: tab.offsetLeft,
            offsetTop: tab.offsetTop,
            offsetWidth: tab.offsetWidth,
            offsetHeight: tab.offsetHeight,
          },
          this.position,
          this.tabStyle,
        )
      : null;
    if (!rect) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.left = `${rect.left}px`;
    indicator.style.top = `${rect.top}px`;
    indicator.style.width = `${rect.width}px`;
    indicator.style.height = `${rect.height}px`;
    indicator.style.opacity = "1";
  }

  protected firstUpdated(): void {
    const bar = (this.renderRoot as ParentNode).querySelector(".bar");
    if (bar && this._resizeObserver) this._resizeObserver.observe(bar);
  }

  protected updated(): void {
    this._position();
    if (!this._ready) {
      requestAnimationFrame(() => {
        this._ready = true;
      });
    }
  }

  render() {
    const animateClass = this._ready && this.animated ? " animate" : "";
    return html`
      <div class="bar ${this.position} style-${this.tabStyle}" part="bar">
        <div class="indicator${animateClass}" part="indicator"></div>
        ${this.items.map(
          (item, index) => html`
            <tabdeck-tab
              .label=${item.name}
              .icon=${item.icon}
              .badge=${item.badge}
              .accent=${item.accent}
              .selected=${index === this.selected}
              aria-controls="tabdeck-panel"
              @click=${() => this._select(index)}
            ></tabdeck-tab>
          `,
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .bar {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color);
      position: relative;
    }
    .bar.top,
    .bar.bottom {
      flex-direction: row;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .bar::-webkit-scrollbar {
      display: none;
    }
    .bar.bottom {
      border-bottom: none;
      border-top: 1px solid var(--divider-color);
    }
    .bar.left,
    .bar.right {
      flex-direction: column;
      border-bottom: none;
    }
    .bar.left {
      border-right: 1px solid var(--divider-color);
    }
    .bar.right {
      border-left: 1px solid var(--divider-color);
    }
    .bar.style-pill {
      gap: 6px;
      border: none;
      padding: 6px;
    }
    .bar.style-pill tabdeck-tab {
      border-radius: 999px;
    }
    .bar.style-segmented {
      gap: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 4px;
    }

    /* The single moving indicator. Sits behind tab content. */
    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
      z-index: 0;
    }
    .indicator.animate {
      transition: left 200ms ease, top 200ms ease, width 200ms ease,
        height 200ms ease;
    }
    @media (prefers-reduced-motion: reduce) {
      .indicator.animate {
        transition: none;
      }
    }
    tabdeck-tab {
      position: relative;
      z-index: 1;
    }
    .bar.style-underline .indicator {
      background: var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-pill .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
      border-radius: 999px;
    }
    .bar.style-segmented .indicator {
      background: var(--card-background-color);
      border-radius: 7px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-tabbar": TabdeckTabbar;
  }
}
```

- [ ] **Step 4: Wire `animated` through the card**

In `src/tabdeck-card.ts`, in `render()`, add the `.animated` binding to the `<tabdeck-tabbar>` element (alongside `.scrollable`):

```ts
        .scrollable=${cfg.scrollable}
        .animated=${cfg.animated}
        @tabdeck-select=${this._onSelect}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- src/components/tabdeck-tabbar.test.ts`
Expected: PASS — including the original 4 tablist tests and the 4 new indicator tests.

- [ ] **Step 6: Commit**

```bash
git add src/components/tabdeck-tabbar.ts src/tabdeck-card.ts src/components/tabdeck-tabbar.test.ts
git commit -m "feat: sliding indicator element in the tab bar"
```

---

### Task 4: Editor checkbox for `animated`

**Files:**
- Modify: `src/editor/tabdeck-card-editor.ts` (globals block)
- Test: `src/editor/tabdeck-card-editor.test.ts`

**Interfaces:**
- Consumes: `_patch({ animated })`, `cfg.animated` from Task 1.
- Produces: a `.global-animated` checkbox bound to `cfg.animated`.

- [ ] **Step 1: Write the failing test**

Add to `src/editor/tabdeck-card-editor.test.ts` inside `describe("tabdeck-card-editor", ...)`:

```ts
it("toggles the global animated option", async () => {
  const el = await mount({ tabs: [{ name: "A", card: {} }] });
  const handler = vi.fn();
  el.addEventListener("config-changed", handler);
  const cb = el.shadowRoot.querySelector(".global-animated");
  expect(cb.checked).toBe(true);
  cb.checked = false;
  cb.dispatchEvent(new Event("change"));
  expect(handler.mock.calls.at(-1)[0].detail.config.animated).toBe(false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/editor/tabdeck-card-editor.test.ts`
Expected: FAIL — `.global-animated` is `null`.

- [ ] **Step 3: Write minimal implementation**

In `src/editor/tabdeck-card-editor.ts`, in `_renderListView`, add a checkbox immediately after the existing lazy checkbox `</label>` (the one containing `.global-lazy`):

```ts
          <label class="checkbox"
            ><input
              class="global-animated"
              type="checkbox"
              .checked=${cfg.animated}
              @change=${(e: any) => this._patch({ animated: e.target.checked })}
            />
            Animate indicator
          </label>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/editor/tabdeck-card-editor.test.ts`
Expected: PASS (all editor tests).

- [ ] **Step 5: Commit**

```bash
git add src/editor/tabdeck-card-editor.ts src/editor/tabdeck-card-editor.test.ts
git commit -m "feat: editor toggle for the animated indicator"
```

---

### Task 5: Document `animated` and verify the full build

**Files:**
- Modify: `README.md` (card options table)

**Interfaces:**
- Consumes: everything above.
- Produces: documentation; no code.

- [ ] **Step 1: Add the README row**

In `README.md`, in the card options table, add a row immediately after the `lazy` row (line ~93):

```markdown
| `animated`    | boolean           | `true`       | Slide the active-tab indicator between tabs. Snaps instantly when `false` or under reduced-motion. |
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: PASS — all suites green.

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds, `dist/` updated.

- [ ] **Step 5: Commit**

```bash
git add README.md dist
git commit -m "docs: document the animated option; rebuild dist"
```

---

## Notes for the implementer

- **Why the indicator is a child of `.bar` (not `:host`):** `.bar` is the scroll
  container and `position: relative`. The tab's `offsetLeft/offsetTop` are measured
  relative to `.bar`'s padding box, which is exactly the containing block for the
  absolutely-positioned `.indicator`. So the numbers line up and the indicator
  scrolls in lockstep with the tabs — no scroll listener needed.
- **First-paint suppression:** the `.animate` class is withheld until one frame
  after first paint (`_ready`), so the initial placement is instant. After that,
  selection/resize moves animate (when `animated` and not reduced-motion).
- **Per-tab `accent`:** the single shared indicator reads the default
  `--tabdeck-accent`; per-tab accent still colours each tab's own text/badge. This
  is intentional and matches the approved spec (matching the moving indicator to
  each tab's accent is out of scope).
- **Removed in Task 3:** the three old `tabdeck-tab[selected]` highlight rules
  (underline `box-shadow`, pill `background`, segmented `background`) and the dead
  `@media (prefers-reduced-motion: no-preference) tabdeck-tab { transition: background, box-shadow }`
  block — those properties no longer change on the tab. The selected-tab **text
  colour** rule stays on `tabdeck-tab` (in `tabdeck-tab.ts`, untouched).
