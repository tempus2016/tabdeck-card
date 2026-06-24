# Features

Every Tabdeck feature is **opt-in / configurable** — turn things on or off to taste. This page indexes the optional features and links to a dedicated page for each.

> This list grows over time. Each feature below has its own page with a description, config key, examples, and screenshots.

## Tab bar appearance
- **[Tab display mode](Feature-Tab-Display)** — show icons, labels, or both (`tab_display`).
- **[Accent-coloured indicator](Feature-Accent-Indicator)** — indicator adopts the selected tab's accent (`accent_indicator`).
- **[Extra bar styles](Feature-Bar-Styles)** — `boxed`, `text`, `rail` styles + `indicator_radius`.
- **[Indicator thickness](Feature-Indicator-Size)** — set the underline bar thickness (`indicator_size`).
- **[Sticky tab bar](Feature-Sticky-Bar)** — keep the bar pinned while content scrolls (`sticky`).
- **[Tab alignment](Feature-Tab-Alignment)** — start / center / end / justify the tabs (`align`).
- **[Bar background & elevation](Feature-Bar-Surface)** — custom bar colour + shadow (`bar_background`, `elevation`).
- **[Scroll buttons](Feature-Scroll-Buttons)** — arrows to scroll an overflowing bar (`scroll_buttons`).

## Per-tab content
- **[Per-tab text/icon colour](Feature-Tab-Color)** — fixed label/icon colour for a tab (`color`).
- **[Badge display mode](Feature-Badge-Display)** — text or dot badges (`badge_display`).
- **[Hide inactive badges](Feature-Hide-Inactive-Badge)** — hide 0/off badges (`hide_inactive_badge`).
- **[Per-tab badge colour](Feature-Badge-Color)** — colour a tab's badge (`badge_color`).
- **[Multiple cards per tab](Feature-Multiple-Cards)** — stack several cards in one tab (`cards`).
- **[Disabled tabs](Feature-Disabled-Tabs)** — show a tab greyed-out and non-selectable (`disabled`).
- **[Tab subtitles](Feature-Subtitle)** — secondary text under a tab label (`subtitle`).
- **[Content header](Feature-Header)** — show the active tab's title above the content (`header`); icon-rail recipe.

## Navigation & interaction
- **[Panel transitions](Feature-Panel-Transition)** — fade or slide when switching tabs (`transition`).
- **[Tab & badge actions](Feature-Hold-Action)** — long-press tab (`hold_action`) and clickable badge (`badge_action`).
- **[Performance & swipe options](Feature-Performance)** — `unmount_hidden`, `swipe_wrap`.

## Dynamic behaviour
- **[Visibility and/or/not groups](Tab-Visibility#logical-groups-and--or--not)** — nestable logical conditions for tab visibility.
- **[Auto-select a tab](Feature-Auto-Select)** — switch tab when an entity becomes active (`auto_select`).
- **[Time & user visibility](Tab-Visibility#time)** — show tabs by time-of-day/weekday or HA user.
- **[Conditional default tab](Feature-Conditional-Default)** — pick the starting tab by state (`default_if`).

## Editor
- **[Duplicate tab](Feature-Duplicate-Tab)** — one-click deep copy of a tab in the editor.
- **[Expand all / Collapse all](Feature-Editor-Expand-Collapse)** — bulk-toggle tab blocks; new tabs auto-expand.
- **[Drag-to-reorder & warnings](Editor#reordering-deleting-adding)** — drag tabs to reorder; duplicate-name warnings.

## Theming
- **[Theming & styles passthrough](Feature-Theming)** — set CSS variables from config (`styles`).

---

See **[Configuration](Configuration)** for the complete option reference.

## Persistence
- **[Remember across devices](Navigation-and-Persistence#cross-device-with-remember-entity)** — store the active tab in an entity (`remember: entity`).
- **[Custom storage key](Navigation-and-Persistence#storage_key-browser-mode)** — independent browser persistence (`storage_key`).
