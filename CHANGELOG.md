# Changelog

All notable changes are documented here. Each GitHub release uses the matching
section below as its release notes (see `.github/workflows/release.yml`).

## v1.2.1 — 2026-10-28

### Fixed
- **Template badges and conditions after a layout change** — when Home Assistant moved the card in the page (it does this while laying out a dashboard), template badges and template visibility stayed empty until some entity changed. They now come back straight away.

## v1.2.0 — 2026-10-28

### Added
- **Masonry inside a tab** — `layout: masonry` balances a tab's `cards` into columns like HA's masonry view (`columns`, or `min_column_width` to fit the width).
- **Sections inside a tab** — `layout: sections` lays out titled groups of cards like HA's sections view: HA heading cards (with `badges`), a 12-column card grid that honours `grid_options.columns` and each card's default width, sections auto-fitting up to `max_columns` (default 4) with `column_span`, stacking to one column on phones.
- **Header and footer cards** — `header_cards` / `footer_cards` stay on screen on every tab (a summary row above the tabs, controls below).
- **Tab backgrounds** — a tab's `background` (colour, gradient, CSS variable or image path / URL; may be a template) fills the content area while it's open.
- **Content height** — `content_height: tallest` keeps the tallest tab's height so the page doesn't jump; a fixed `content_height` or `content_max_height` scrolls inside the card.
- **Full screen** — `fullscreen: true` adds a button to the bar that opens the active tab over the whole window (Esc or the corner button closes it).
- **Swipe peek** — `swipe_peek: true`: while swiping, the content follows the finger and the neighbouring tab slides in; release past a third (or flick) to change tab.
- **More transitions** — `scale`, `flip` and `rise`, plus `transition_duration` and `transition_easing`; `slide` and `flip` now come in from the direction of travel. `transition_narrow` picks a different transition (e.g. `none`) on cards narrower than `narrow_width`.
- **Visual regression tests** — CI screenshots every demo example (desktop, phone, light theme) and compares it pixel by pixel with saved baselines (`npm run test:visual`).
- **Home Assistant compatibility check** — a monthly workflow runs the card in fresh Home Assistant `stable` and `beta` containers (dashboard, HA cards inside the deck, visual editor) and keeps a "works with Home Assistant" badge in the README up to date (`npm run test:ha` runs it against your own instance).
- **Free unused tabs** — `unload_after: <minutes>` releases the card of a tab that hasn't been on screen for that long and rebuilds it when it's opened again.

## v1.1.0 — 2026-10-27

The biggest Tabdeck release yet: **nearly 40 new features**. Tabs can now **react to your home** (live icons, alerts, formatted badges), the card can **run a wall panel** by itself, the deck can be a **phone-style dock**, a **dropdown menu** or a **side-by-side split view**, and the editor can **build a deck for you** from your own entities or **convert one from another card**. It also speaks **eight languages**, and there's a **[live demo](https://tempus2016.github.io/tabdeck-card/)** to try everything in the browser before you install it.

Every new feature is opt-in. **Nothing needs migrating** and existing dashboards look and behave exactly as before.

---

### 🎮 New: try it in your browser
- **[Live demo](https://tempus2016.github.io/tabdeck-card/)**: a playground with example decks, a YAML box you can edit, and pretend devices (guest mode, a garage door, lights) that switch visibility, badges and alerts live. No Home Assistant needed.
- **[Showcase](https://github.com/tempus2016/tabdeck-card/wiki/Showcase)**: a wiki page of community decks and starter ideas. Share yours with the new *Show and tell* discussion form (screenshot, YAML and a tick-box to agree to it being featured).

### ✨ New: the editor builds decks for you
- **[Starter templates](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Starter-Templates)**: *Start from a template* builds a working deck from **your own entities**: Rooms, Lights, Security, Media, Climate, Energy or Family. Replace the current tabs or add to them.
- **[Convert from another card](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Convert)**: paste a `tabbed-card`, `swipe-card`, `state-switch`, Bubble Card pop-ups, a stack or grid (split at `heading` cards), `conditional` cards, a sections view or a whole dashboard, and get Tabdeck tabs back. Options are mapped across, and anything that couldn't be carried over is explained.
- **[Why is this tab hidden?](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Condition-Check)**: the editor checks each tab's conditions against live state. *Hidden now* and *Alerting* chips show on the tab list, and each condition gets a ✅ or ❌ with the current value, any missing entity and live template results.
- **Condition builders**: Visibility, Alert and Default-when conditions use Home Assistant's own condition editor. Tabdeck-only types such as `template` edit as YAML in place. (#110)
- **Copy and import tabs**: copy a tab's config to the clipboard (works over plain http too) and paste one or several tabs back in. (#111)

### 🏠 New: tabs that react to your home
- **[Live icons, names and colours](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Templated-Fields)**: a tab's `icon`, `name`, `subtitle`, `color` and `accent` can be Jinja templates, so the Garage tab can turn red with an open-door icon while it's open. (#100)
- **[Alert pulse](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Alert)**: per-tab `alert` conditions make a tab pulse in `--tabdeck-alert-color` while they're met. With reduced motion on, it's a steady tint instead. (#102)
- **[Badge formatting](https://github.com/tempus2016/tabdeck-card/wiki/Badges)**: `badge_format: { precision, unit, max }` turns `21.456` into `21.5°` and `150` into `99+`. Set it per tab or once for the whole card. (#101)
- **[A tab per area or label](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Dynamic-Tabs)**: `auto_tabs: { source: areas | labels }` builds a tab for every area (with its icon) or label, listing its entities. No Jinja needed. (#112)
- **[Tab-change actions](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Enter-Leave-Actions)**: `enter_action` / `leave_action` run any HA action when a tab opens or closes, for example turning a camera stream on only while its tab is showing. (#106)

  ```yaml
  - name: Garage
    icon: "{{ 'mdi:garage-open' if is_state('cover.garage', 'open') else 'mdi:garage' }}"
    color: "{{ 'var(--error-color)' if is_state('cover.garage', 'open') else '' }}"
    alert:
      - condition: state
        entity: cover.garage
        state: open
  ```

### 🖥️ New: wall panels and kiosks
- **[Auto-rotate](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Kiosk)**: `auto_rotate: 15` cycles through the tabs and pauses whenever someone touches the screen. (#103)
- **Idle return**: `idle_return: 120` goes back to the default tab after two minutes with nobody using it. (#103)
- **[Remote control from HA](https://github.com/tempus2016/tabdeck-card/wiki/Navigation-and-Persistence)**: with `remember: entity`, the card now follows its helper entity live, so an automation or Node-RED flow can change the tab on every panel at once. (#99)
- **[Edit mode helpers](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Edit-Mode)**: while you edit the dashboard, hidden tabs appear faded with an eye-off marker so you can still reach them, and rotation and idle return pause.

### 🧭 New: more ways to lay out a deck
- **[Dock](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Dock)**: `dock: true` pins the bar to the bottom of the screen like a phone app's navigation, with the icon over the label, badges on the icon, and room left for the home bar and HA's sidebar.
- **Floating action tabs**: `fab: true` makes a tab a raised round button that floats above the dock. Pair it with `tap_action`.
- **[Grouped tabs](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Grouped-Tabs)**: a tab with `children:` holds sub-tabs, shown as a second row or, with `children_display: menu`, as a ▾ dropdown on the tab.
- **[Split view](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Responsive)**: `split: 900` shows every tab side by side as columns once the card is at least 900 px wide. (#108)
- **Narrow screens**: `tab_display_narrow` switches to, say, icon-only tabs when the card is narrow. (#108)
- **Expand the selected tab**: `tab_display: active` shows icons only, except the selected tab, which also shows its name. Suggested by the community in discussion #93.
- **[Pagination dots and content arrows](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Dots-Arrows)**: `tab_display: dots` swaps the tabs for a row of dots, and `content_arrows: true` adds ‹ › buttons beside the content.
- **Expanding side rail**: `rail_expand: true` keeps a left or right bar as an icon rail that slides its labels out on hover or keyboard focus.
- **[Scroll-spy](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Scroll-Spy)**: `scroll_spy: true` stacks every tab as one long page. The bar jumps to each section and highlights the one you're reading. (#105)
- **[Collapsible](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Collapsible)**: `collapsible: true` folds the content away when you tap the open tab again. `start_collapsed` starts folded. (#107)
- **`hide_bar`**: content only, no tab bar.

### 🎨 New: styling
- **[Style presets](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Presets)**: `preset: ios | material | glass | minimal | rail` applies a whole look in one line. Anything you set yourself still wins, and the editor's preset picker fills the values into the form so you can tweak from there. A new `--tabdeck-bar-backdrop` variable gives frosted bars. (#109)
- **Per-tab styles**: a tab's own `styles` apply while it's open, for example a different accent colour per room. (#113)

### ⌨️ New: getting around faster
- **[Quick-switch search](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Search-Hotkeys)**: `search: true` adds a 🔍 filter that ignores case and accents and searches names and subtitles. Use ↑ ↓ and Enter to pick a tab.
- **Keyboard shortcuts**: `hotkeys: true` gives 1 to 9 for tabs, `[` `]` to step and `/` to search. They're ignored while you're typing.
- **Back button**: `history: true` makes the browser's Back button, or the phone's back gesture, return to the previous tab.
- **[Arrange your own tabs](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Customize)**: `customize: true` lets each person reorder and hide tabs for themselves. It's saved in their browser and never changes the dashboard config.
- **[Navigation tabs](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Navigation-Tabs)**: a tab with `tap_action` runs an action, such as `navigate` to another view, instead of opening. (#104)
- **Friendlier deep links**: `#tab=living-room` now matches the *Living Room* tab, ignoring case. (#99)

### 🌍 New: eight languages
The editor and the card's own text follow your Home Assistant language: **English, Deutsch, Español, Français, Italiano, Nederlands, Polski and Português**. Regional variants use the base language, and anything not yet translated shows in English. See [Languages](https://github.com/tempus2016/tabdeck-card/wiki/Feature-Languages) if you'd like to help translate.

### 🔌 New: for scripts and other cards
- `selectTab(nameOrIndex)`, `selectedTab`, and a `tabdeck-tab-changed` event on every tab change, for browser_mod, scripts and other cards.

---

### 🐛 Fixed
- **Sticky bars no longer hide under Home Assistant's header.** They now pin just below it. Override the position with `--tabdeck-sticky-top`. (#105)
- **Actions picked in HA's action editor now run.** `perform-action` (what the picker writes) works for `hold_action`, `badge_action` and `tap_action`; before, only the older `call-service` did. (#106)
- **Content beside a left or right tab bar fills the card** instead of shrinking to fit its content.
- **The editor's Add tab icon shows** on current Home Assistant builds.
- **Swiping skips disabled tabs** instead of landing on them.
- **A `0.0` badge counts as zero**, so `hide_inactive_badge` hides it and dot mode shows no dot.

---

### Upgrading
Update via **HACS**, then **hard-refresh your browser** (Ctrl/Cmd + Shift + R) so the new card loads. Nothing needs changing in your config.

Full details for each feature are on the [Wiki](https://github.com/tempus2016/tabdeck-card/wiki).

**Full changelog:** https://github.com/tempus2016/tabdeck-card/compare/v1.0.0...v1.1.0

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
