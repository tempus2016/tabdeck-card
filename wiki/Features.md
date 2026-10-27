# Features

Every Tabdeck feature is **opt-in / configurable** — turn things on or off to taste. This page indexes the optional features and links to a dedicated page for each.

> This list grows over time. Each feature below has its own page with a description, config key, examples, and screenshots.

## Tab bar appearance
- **[Expanding side rail](Feature-Bar-Styles#expanding-side-rail-rail_expand)** — icons-only side bar that shows labels on hover/focus, over the content (`rail_expand`).
- **[Pagination dots & content arrows](Feature-Dots-Arrows)** — `tab_display: dots`; ‹ › arrows beside the content (`content_arrows`).
- **[Dock & floating action tabs](Feature-Dock)** — phone-style bottom navigation pinned to the screen (`dock`); raised round action buttons (`fab`).
- **[Tab display mode](Feature-Tab-Display)** — show icons, labels, both, or icons with the selected tab expanded (`tab_display`).
- **[Responsive layouts](Feature-Responsive)** — side-by-side `split` view on wide cards; `tab_display_narrow` on narrow ones.
- **[Accent-coloured indicator](Feature-Accent-Indicator)** — indicator adopts the selected tab's accent (`accent_indicator`).
- **[Extra bar styles](Feature-Bar-Styles)** — `boxed`, `text`, `rail` styles + `indicator_radius`.
- **[Indicator thickness](Feature-Indicator-Size)** — set the underline bar thickness (`indicator_size`).
- **[Sticky tab bar](Feature-Sticky-Bar)** — keep the bar pinned while content scrolls (`sticky`).
- **[Tab alignment](Feature-Tab-Alignment)** — start / center / end / justify the tabs (`align`).
- **[Bar background & elevation](Feature-Bar-Surface)** — custom bar colour + shadow (`bar_background`, `elevation`).
- **[Scroll buttons & overflow menu](Feature-Scroll-Buttons)** — arrows (`scroll_buttons`) or a ⋯ jump-to-tab menu (`overflow_menu`).

## Per-tab content
- **[State-driven icons, names & colours](Feature-Templated-Fields)** — `icon`/`name`/`subtitle`/`color`/`accent` as live Jinja templates.
- **[Per-tab text/icon colour](Feature-Tab-Color)** — fixed label/icon colour for a tab (`color`).
- **[Badge display mode](Feature-Badge-Display)** — text or dot badges (`badge_display`).
- **[Numeric badge formatting](Badges#numeric-formatting-badge_format)** — precision, unit and `99+` caps (`badge_format`).
- **[Hide inactive badges](Feature-Hide-Inactive-Badge)** — hide 0/off badges (`hide_inactive_badge`).
- **[Per-tab badge colour](Feature-Badge-Color)** — colour a tab's badge (`badge_color`).
- **[Multiple cards per tab](Feature-Multiple-Cards)** — stack several cards in one tab (`cards`).
- **[Nested decks](Feature-Nested)** — a tab's card can be another Tabdeck card (sub-tabs).
- **[Disabled tabs](Feature-Disabled-Tabs)** — show a tab greyed-out and non-selectable (`disabled`).
- **[Tab subtitles](Feature-Subtitle)** — secondary text under a tab label (`subtitle`).
- **[Content header](Feature-Header)** — show the active tab's title above the content (`header`); icon-rail recipe.
- **[Masonry inside a tab](Feature-Content-Layout#masonry-inside-a-tab-layout-masonry)** — balance a tab's cards into columns (`layout: masonry`).
- **[Sections inside a tab](Feature-Content-Layout#sections-inside-a-tab-layout-sections)** — titled groups of cards like HA's sections view (`layout: sections`).
- **[Header & footer cards](Feature-Content-Layout#header-and-footer-cards-header_cards-footer_cards)** — cards shown on every tab (`header_cards`, `footer_cards`).
- **[Tab backgrounds](Feature-Content-Layout#tab-background-background)** — colour, gradient or image behind a tab's content, may be a template (`background`).
- **[Content height](Feature-Content-Layout#content-height-content_height-content_max_height)** — keep the tallest tab's height or scroll inside (`content_height`, `content_max_height`).
- **[Full screen](Feature-Content-Layout#full-screen-fullscreen)** — open the active tab over the whole window (`fullscreen`).

## Navigation & interaction
- **[Arrange tabs](Feature-Customize)** — each person reorders and hides tabs for themselves, saved per browser (`customize`).
- **[Back button](Navigation-and-Persistence#back-button-history)** — tab switches become history entries; Back returns to the previous tab (`history`).
- **[Search & keyboard shortcuts](Feature-Search-Hotkeys)** — 🔍 quick-switch filter (`search`); 1–9, [ ], / shortcuts (`hotkeys`).
- **[Grouped tabs](Feature-Grouped-Tabs)** — `children:` as a second-level row or a ▾ dropdown menu (`children_display`); `hide_bar`; `selectTab()` API and `tabdeck-tab-changed` event.
- **[Collapsible deck](Feature-Collapsible)** — tap the active tab to fold the content away (`collapsible`, `start_collapsed`).
- **[Scroll-spy (anchor mode)](Feature-Scroll-Spy)** — stack every tab as a section; the bar scrolls to and tracks sections (`scroll_spy`).
- **[Panel transitions](Feature-Panel-Transition)** — fade, slide, scale, flip or rise when switching tabs, with your own duration and easing (`transition`).
- **[Swipe peek](Feature-Content-Layout#swipe-peek-swipe_peek)** — the content follows the finger and the next tab slides in (`swipe_peek`).
- **[Navigation & action tabs](Feature-Navigation-Tabs)** — a tab that navigates / runs an action instead of opening a panel (`tap_action`).
- **[Tab-change actions](Feature-Enter-Leave-Actions)** — run an action when a tab opens or closes (`enter_action`, `leave_action`).
- **[Tab & badge actions](Feature-Hold-Action)** — long-press tab (`hold_action`) and clickable badge (`badge_action`).
- **[Auto-rotate & idle return](Feature-Kiosk)** — cycle tabs on a timer (`auto_rotate`) or return to the default when idle (`idle_return`).
- **[Performance & swipe options](Feature-Performance)** — `unmount_hidden`, `unload_after` (free tabs unused for N minutes), `swipe_wrap`, `swipe_mouse` (desktop drag).

## Dynamic behaviour
- **[Dynamic tabs](Feature-Dynamic-Tabs)** — generate a tab per item from a live Jinja list (`auto_tabs`).
- **[A tab per area / floor / label / domain / device / list / calendar / camera / zone](Feature-Dynamic-Tabs#built-in-sources-a-tab-per-area-floor-label-domain-device-list-calendar-camera-or-zone)** — `auto_tabs: { source: areas }`, no Jinja needed, with fitting default cards.
- **[Auto content](Feature-Dynamic-Tabs#area-floor-and-label-tabs-without-a-card-auto-content)** — a tab with `area` / `floor` / `label` and no card shows tiles of its entities.
- **[Count badges, badge icons & progress rings](Badges#count-badge-no-jinja)** — `badge: { count: light.*, state: on }`, `badge_icon`, `ring`.
- **[Alerting tabs first & snooze](Feature-Alert#alerting-tabs-first-alert_first)** — `alert_first`, long-press to snooze (`alert_snooze`).
- **[Remote control & events](Feature-Remote-Control)** — automations switch tabs (`remote_entity`, `remote_event`), HA hears tab changes (`fire_event`), defaults by time and device.
- **[PIN-locked tabs](Feature-PIN)** — ask for a code before a tab opens (`pin`; a convenience lock, not security).
- **[Visibility and/or/not groups](Tab-Visibility#logical-groups-and--or--not)** — nestable logical conditions for tab visibility.
- **[Alert pulse](Feature-Alert)** — a tab pulses while its conditions are met (`alert`).
- **[Auto-select a tab](Feature-Auto-Select)** — switch tab when an entity becomes active (`auto_select`).
- **[Time & user visibility](Tab-Visibility#time)** — show tabs by time-of-day/weekday or HA user.
- **[Conditional default tab](Feature-Conditional-Default)** — pick the starting tab by state (`default_if`).

## Editor
- **[Languages](Feature-Languages)** — editor and card text in English, German, Spanish, French, Italian, Dutch, Polish and Portuguese, following your HA language.
- **[Convert from another card](Feature-Convert)** — paste a tabbed-card, swipe-card, state-switch, stack, Bubble pop-ups, sections view or dashboard and get tabs.
- **[Starter templates](Feature-Starter-Templates)** — one-click Rooms / Lights / Security / Media / Climate / Energy / Family decks built from your entities.
- **[Why is this tab hidden?](Feature-Condition-Check)** — live ✅/❌ check of every visibility / alert / default condition, with current values.
- **[Edit mode helpers](Feature-Edit-Mode)** — hidden tabs appear faded while editing the dashboard; rotation pauses (`edit_mode_reveal`).
- **[Copy & import tabs](Editor#copy--import-tabs)** — copy a tab to the clipboard and import tabs into another deck.
- **[Duplicate tab](Feature-Duplicate-Tab)** — one-click deep copy of a tab in the editor.
- **[Expand all / Collapse all](Feature-Editor-Expand-Collapse)** — bulk-toggle tab blocks; new tabs auto-expand.
- **[Drag-to-reorder & warnings](Editor#reordering-deleting-adding)** — drag tabs to reorder; duplicate-name warnings.
- **[Condition builders](Editor#condition-builders)** — edit Visibility / Alert / Default-when conditions with HA's native builder.
- **[Live preview](Editor#live-preview)** — the editor previews the bar as you edit.

## Theming
- **[Style presets](Feature-Presets)** — one-line looks: `ios`, `material`, `glass`, `minimal`, `rail` (`preset`).
- **[Theming & styles passthrough](Feature-Theming)** — set CSS variables from config (`styles`).
- **[Per-tab styles](Feature-Theming#per-tab-styles)** — `styles` on a tab, applied while it's active.

---

See **[Configuration](Configuration)** for the complete option reference.

## Persistence
- **[Remember across devices](Navigation-and-Persistence#cross-device-with-remember-entity)** — store the active tab in an entity (`remember: entity`).
- **[Custom storage key](Navigation-and-Persistence#storage_key-browser-mode)** — independent browser persistence (`storage_key`).
