# Changelog

All notable changes are documented here. Each GitHub release uses the matching
section below as its release notes (see `.github/workflows/release.yml`).

## v1.0.0 — 2026-06-24

First stable release of **Tabdeck Card** — a dependency-free, themeable tabbed Lovelace card with a full visual editor and keep-alive content (maps, cameras and graphs render correctly without the "navigate away and back" workaround). Every capability below is an opt-in option, unit-tested, verified on a real Home Assistant instance, and documented on the [Wiki](https://github.com/tempus2016/tabdeck-card/wiki).

### Added — Tab bar & styling
- **Five bar styles** — `style: underline | pill | segmented | boxed | text | rail`. `boxed` renders each tab as a bordered chip, `text` drops the indicator entirely, and `rail` is a compact icon rail for `position: left/right`.
- **Display modes** — `tab_display: both | icon | label` to show icons, labels, or both; icon-only falls back to the label for tabs without an icon so a tab is never empty.
- **Indicator controls** — `accent_indicator` colours the moving indicator by the selected tab's `accent`; `indicator_size` sets the underline thickness; `indicator_radius` overrides the pill/segmented/boxed/rail corner radius.
- **Alignment** — `align: start | center | end | justify` distributes the tabs along the bar.
- **Bar surface** — `sticky` pins the bar while content scrolls; `elevation` adds a shadow; `bar_background` sets a custom bar colour.
- **Overflow handling** — `scroll_buttons` adds ‹ › arrows and `overflow_menu` adds a ⋯ jump-to-tab menu, both appearing only when the bar overflows.

### Added — Per-tab options
- **Labelling** — per-tab `name`, `subtitle` (secondary line), `icon`, `accent`, and `color` (fixed label/icon colour independent of selection).
- **Badges** — `badge` from an entity state or Jinja template, with `badge_display: text | dot`, per-tab `badge_color`, and a global `hide_inactive_badge` to drop 0/off badges.
- **Actions** — `hold_action` (long-press a tab) and `badge_action` (click a badge) fire any Home Assistant action without disrupting tab selection.
- **Disabled & sizing** — `disabled` greys out a tab and skips it in keyboard nav; `card_size` provides a `getCardSize()` hint for stable masonry sizing.
- **Multiple cards** — `cards: [...]` stacks several cards in one tab, with optional `columns: N` for a grid; tabs can also nest another Tabdeck card for sub-tabs.

### Added — Dynamic behaviour
- **Rich visibility** — `visibility` conditions support `state`, `numeric_state`, `screen`, `time` (with overnight ranges + weekday), `user`, `template`, and nestable `and` / `or` / `not` groups.
- **Auto-select** — `auto_select` switches to a tab (edge-triggered) when an entity becomes active or enters a given state.
- **Conditional default** — `default_if` picks the starting tab based on current state.
- **Transitions** — `transition: fade | slide` animates the panel on tab switch (respects reduced-motion).

### Added — Navigation & persistence
- **Selection memory** — `remember: none | browser | url | entity`; `entity` mode syncs the active tab across devices via an `input_number`/`input_text`, and `storage_key` isolates browser-mode persistence.
- **Gestures & keyboard** — touch `swipe` and desktop `swipe_mouse` (with optional `swipe_wrap`), plus full keyboard navigation (arrows / Home / End, skipping disabled tabs).
- **Performance** — `lazy` mounting and `unmount_hidden` for memory-heavy dashboards; tab-bar resize handling is debounced.

### Added — Visual editor
- Collapsible per-tab blocks (with expand-all / collapse-all and auto-expand on add), **drag-to-reorder**, duplicate-tab, and duplicate-name warnings.
- A live tab-bar **preview**, a card-type chooser with common built-in **and** popular custom (HACS) card presets, and Home Assistant's native card editor on drill-in.

### Added — Theming, accessibility & docs
- `styles` passthrough for CSS variables (no card-mod needed) and an optional content `header` showing the active tab's title.
- Proper `tablist` semantics: `aria-selected`, roving `tabindex`, focus rings, badge labels, and a configurable `aria_label`.
- A complete GitHub **Wiki**, refreshed README with status badges, and `examples/demo.yaml`.

### Upgrading
Install or update via **HACS** (or copy `tabdeck-card.js` to `config/www/` and add it as a dashboard resource), then refresh your browser. Existing `kinghat/tabbed-card` configs keep working — `options.defaultTabIndex` maps to `default_tab` and per-tab `attributes.label`/`attributes.icon` map to `name`/`icon`.
