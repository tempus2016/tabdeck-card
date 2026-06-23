# Sliding indicator animation polish — design

**Date:** 2026-06-23
**Feature:** #4 (final feature of the roadmap)

## Problem

Today there is no moving indicator. The active-tab highlight is static:

- `underline` — `box-shadow: inset 0 -3px 0 0 accent` on the selected `tabdeck-tab`.
- `pill` — static `background` (color-mix) on the selected tab.
- `segmented` — static `background` + `border-radius` on the selected tab.

Switching tabs swaps the highlight instantly. This feature introduces a real
indicator element that **slides and resizes** to the active tab.

## Approach

A single absolutely-positioned indicator element inside the tab bar, positioned
over the selected tab via that tab's `offset*` geometry, animated with a CSS
transition. This is the standard Material/MWC tab-bar pattern. Rejected
alternatives: FLIP animation on the per-tab highlight (more moving parts, awkward
with resize and the three shapes), and the View Transitions API (patchy support
in HA's webview, fiddly to scope through Shadow DOM).

## Config

Add `animated: boolean` to `TabdeckCardConfig`.

- Normalized in `normalizeConfig`: `raw?.animated === undefined ? true : Boolean(raw.animated)`.
- Default **true**.
- When `false`, the indicator still tracks the active tab but snaps instantly
  (no slide).
- `prefers-reduced-motion: reduce` always forces snapping, regardless of the
  `animated` value.

Threaded `tabdeck-card.ts` render → `tabdeck-tabbar` via a `.animated` property.

## Geometry helper — new `src/lib/indicator.ts` (pure, unit-tested)

```
computeIndicatorRect(
  tab: { offsetLeft: number; offsetTop: number; offsetWidth: number; offsetHeight: number },
  position: TabPosition,
  style: TabStyle,
): { left: number; top: number; width: number; height: number } | null
```

Rules:

- **underline**, `top`/`bottom` → 3px-tall bar spanning the tab width at the bar's
  inner edge (bottom edge for `top` position, top edge for `bottom` position).
- **underline**, `left`/`right` → 3px-wide bar spanning the tab height at the inner
  edge (right edge for `left` position, left edge for `right` position).
- **pill** / **segmented** → the full tab box (`left/top` = tab's `offsetLeft/offsetTop`,
  `width/height` = tab's `offsetWidth/offsetHeight`), for all positions. The
  indicator element carries the rounded background.

Keeping this pure means the math is unit-tested directly, independent of jsdom
(where `offset*` reports 0).

The 3px thickness reuses the current underline thickness; expressed via a
`--tabdeck-indicator-size` custom property defaulting to 3px.

## Tab bar component — `src/components/tabdeck-tabbar.ts`

- Render one `<div class="indicator" part="indicator">` as the **first** child of
  `.bar`.
- New `@property({ type: Boolean }) animated = true`.
- `@query(".indicator")` for the indicator; query the selected `tabdeck-tab` via
  `[selected]`.
- `_position(animate: boolean)`:
  - Read the selected tab's `offsetLeft/offsetTop/offsetWidth/offsetHeight`.
  - If there is no selected tab (or `offsetWidth` is 0, i.e. unmeasurable/jsdom),
    set the indicator `opacity: 0` and return — never throw.
  - Otherwise call `computeIndicatorRect` and write `left/top/width/height`
    inline, set `opacity: 1`.
- Reposition triggers:
  - `updated()` — covers `selected`, `items`, `tabStyle`, `position` changes.
  - `ResizeObserver` on `.bar` — covers container width and tab-width changes
    (font load, badge text). Connected in `connectedCallback`, disconnected in
    `disconnectedCallback`.
  - **Scroll needs no handling**: the indicator is a child of the scrolling
    `.bar`, so it scrolls in lockstep with the tabs.

## Animation gating

- The slide transition is on `left`/`top`/`width`/`height` (~200ms ease) —
  matching the inline properties `_position` writes — applied via an `.animate`
  class on the indicator, added only when `this.animated` is true.
- `@media (prefers-reduced-motion: reduce)` zeroes the transition regardless, so
  reduced-motion always snaps.
- **First paint:** the indicator starts `opacity: 0` with no transition.
  `firstUpdated` positions it, then a `requestAnimationFrame` sets `opacity: 1`
  and (if `animated`) adds `.animate`. The first placement never slides in from
  the corner; subsequent switches animate.

## Styling cleanup

Remove the three static `[selected]` highlight rules from `tabdeck-tabbar`:

- `.bar.style-underline tabdeck-tab[selected]` box-shadow
- `.bar.style-pill tabdeck-tab[selected]` background
- `.bar.style-segmented tabdeck-tab[selected]` background

Move that appearance onto the single `.indicator`, per-style:

- `.style-underline .indicator` — accent-coloured bar.
- `.style-pill .indicator` — color-mix pill background, `border-radius: 999px`.
- `.style-segmented .indicator` — card background, `border-radius: 7px`.

Selected-tab **text colour** stays on `tabdeck-tab` (unchanged). The indicator
sits **behind** tab content for pill/segmented via `z-index` (indicator `z-index: 0`,
tabs `position: relative; z-index: 1`).

The accent uses the existing `--tabdeck-accent` resolution. Note: per-tab `accent`
is set on the individual `tabdeck-tab` host, but the single shared indicator lives
on the bar — so the indicator reads the **bar-level** accent. Per-tab accent
colours continue to apply to the tab's own text/badge; the moving indicator uses
the default accent. (Matching the indicator colour to each tab's per-tab accent is
out of scope — see below.)

## Editor + README

- Editor (`tabdeck-card-editor.ts`): add an "Animate indicator" checkbox in the
  globals block, mirroring the existing `cfg.lazy` checkbox (`_patch({ animated })`).
- README: document `animated` (default `true`) in the options table.

## Tests

- `src/lib/indicator.test.ts` — `computeIndicatorRect` for all 3 styles × 4
  positions, plus the no-selection / unmeasurable null case.
- `src/components/tabdeck-tabbar.test.ts` — indicator element renders; `.animate`
  class present iff `animated` is true; `_position` is guarded when `offset*` is 0
  (no throw in jsdom).
- `src/lib/config.test.ts` — `animated` defaults to `true`, respects explicit
  `false`.
- `src/editor/tabdeck-card-editor.test.ts` — the checkbox toggles `animated`.

## Out of scope (YAGNI)

- Per-tab indicator colours beyond making the indicator read the default accent.
- Configurable transition duration / easing.
- Indicator following hover.
