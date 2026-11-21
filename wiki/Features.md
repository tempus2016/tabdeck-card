# Features

Every Tabdeck feature is **opt-in / configurable** — turn things on or off to taste. This page indexes the optional features and links to a dedicated page for each.

> This list grows over time. Each feature below has its own page with a description, config key, examples, and screenshots.

## Tab bar appearance
- **[Expanding side rail](Feature-Bar-Styles#expanding-side-rail-rail_expand)** — icons-only side bar that shows labels on hover/focus, over the content (`rail_expand`).
- **[Pagination dots & content arrows](Feature-Dots-Arrows)** — `tab_display: dots`; ‹ › arrows beside the content (`content_arrows`).
- **[Dock & floating action tabs](Feature-Dock)** — phone-style bottom navigation pinned to the screen (`dock`); raised round action buttons (`fab`).
- **[Tab display mode](Feature-Tab-Display)** — show icons, labels, both, or icons with the selected tab expanded (`tab_display`).
- **[Responsive layouts](Feature-Responsive)** — side-by-side `split` view on wide cards; `tab_display_narrow` on narrow ones; `orientation_layout` moves the bar to the bottom upright and the side when the screen is turned.
- **[Accent-coloured indicator](Feature-Accent-Indicator)** — indicator adopts the selected tab's accent (`accent_indicator`).
- **[Extra bar styles](Feature-Bar-Styles)** — `boxed`, `text`, `rail` styles + `indicator_radius`.
- **[Indicator thickness](Feature-Indicator-Size)** — set the underline bar thickness (`indicator_size`).
- **[Liquid indicator](Feature-Indicator-Size#liquid-indicator-liquid_indicator)** — the indicator stretches and settles as it moves (`liquid_indicator`).
- **[Sticky tab bar](Feature-Sticky-Bar)** — keep the bar pinned while content scrolls (`sticky`), and hide it while you scroll down (`bar_autohide`).
- **[Tab alignment](Feature-Tab-Alignment)** — start / center / end / justify the tabs (`align`).
- **[Bar background & elevation](Feature-Bar-Surface)** — custom bar colour + shadow (`bar_background`, `elevation`).
- **[Readable text](Feature-Bar-Surface#readable-text-bar_text)** — black or white tab text to suit the bar background or picture (`bar_text`).
- **[Frosted glass](Feature-Bar-Surface#frosted-glass-glass)** — a blurred, see-through bar, menus and dock (`glass`).
- **[Bar fade](Feature-Bar-Fade)** — the edge of an overflowing bar that has more tabs fades out (on by default; `bar_fade: false`).
- **[Scroll buttons & overflow menu](Feature-Scroll-Buttons)** — arrows (`scroll_buttons`) or a ⋯ jump-to-tab menu (`overflow_menu`).
- **[Hidden alerts](Feature-Scroll-Buttons#alerts-on-tabs-that-dont-fit-hidden_alerts)** — the ⋯ button counts alerts and badges on tabs that don't fit (`hidden_alerts`).

## Per-tab content
- **[State-driven icons, names & colours](Feature-Templated-Fields)** — `icon`/`name`/`subtitle`/`color`/`accent` as live Jinja templates.
- **[Per-tab text/icon colour](Feature-Tab-Color)** — fixed label/icon colour for a tab (`color`).
- **[Badge display mode](Feature-Badge-Display)** — text or dot badges (`badge_display`).
- **[Numeric badge formatting](Badges#numeric-formatting-badge_format)** — precision, unit and `99+` caps (`badge_format`).
- **[Hide inactive badges](Feature-Hide-Inactive-Badge)** — hide 0/off badges (`hide_inactive_badge`).
- **[Per-tab badge colour](Feature-Badge-Color)** — colour a tab's badge (`badge_color`).
- **[Multiple cards per tab](Feature-Multiple-Cards)** — stack several cards in one tab (`cards`).
- **[Reuse a view](Feature-Content-Shortcuts#reuse-a-dashboard-view-view)** — a tab shows an existing dashboard view's cards without copying them (`view`).
- **[Web page tab](Feature-Content-Shortcuts#web-page-tab-url)** — a website in a tab with one line (`url`).
- **[Text tab](Feature-Content-Shortcuts#text-tab-markdown)** — a Markdown-only tab with one line, templates included (`markdown`).
- **[Nested decks](Feature-Nested)** — a tab's card can be another Tabdeck card (sub-tabs).
- **[Disabled tabs](Feature-Disabled-Tabs)** — show a tab greyed-out and non-selectable (`disabled`).
- **[Tab subtitles](Feature-Subtitle)** — secondary text under a tab label (`subtitle`).
- **[Hover summary](Feature-Subtitle#hover-summary-tooltip)** — a short, templatable summary when the mouse rests on a tab (`tooltip`).
- **[Content header](Feature-Header)** — show the active tab's title above the content (`header`); icon-rail recipe.
- **[Masonry inside a tab](Feature-Content-Layout#masonry-inside-a-tab-layout-masonry)** — balance a tab's cards into columns (`layout: masonry`).
- **[Sections inside a tab](Feature-Content-Layout#sections-inside-a-tab-layout-sections)** — titled groups of cards like HA's sections view (`layout: sections`).
- **[Header & footer cards](Feature-Content-Layout#header-and-footer-cards-header_cards-footer_cards)** — cards shown on every tab (`header_cards`, `footer_cards`).
- **[Tab backgrounds](Feature-Content-Layout#tab-background-background)** — colour, gradient or image behind a tab's content, may be a template (`background`).
- **[Empty message](Feature-Content-Layout#empty-message-empty_message)** — "Nothing to show right now" instead of a blank tab when all its cards are hidden (`empty_message`).
- **[Big decks](Feature-Performance#big-decks-bar_limit)** — 100+ generated tabs stay fast: the bar draws a page of tabs and ⋯ lists the rest (`bar_limit`, with `lazy`).
- **[Loading placeholder](Feature-Performance#loading-placeholder-loading_placeholder)** — grey boxes while a tab's cards load (`loading_placeholder`).
- **[Friendly errors](Feature-Content-Layout#friendly-errors-friendly_errors)** — a broken card explains itself in plain words and badges its tab (`friendly_errors`).
- **[Auto refresh](Feature-Content-Layout#auto-refresh-auto_refresh)** — rebuild a tab's card every few minutes, for cameras and web pages that go stale (`auto_refresh`).
- **[Size controls](Feature-Content-Layout#size-controls-zoom-padding-spacing)** — per-tab zoom, padding and spacing for crowded wall tablets (`zoom`, `padding`, `spacing`).
- **[Page background](Feature-Content-Layout#page-background-page_background)** — the whole dashboard background changes with the open tab (`page_background`).
- **[Content height](Feature-Content-Layout#content-height-content_height-content_max_height)** — keep the tallest tab's height or scroll inside (`content_height`, `content_max_height`).
- **[Full screen](Feature-Content-Layout#full-screen-fullscreen)** — open the active tab over the whole window (`fullscreen`).

## Navigation & interaction
- **[Arrange tabs](Feature-Customize)** — each person reorders and hides tabs for themselves, saved per browser (`customize`), drags tabs on the bar into a new order (`drag_reorder`), or lets the deck learn their most-used tabs (`sort_by_usage`).
- **[Last-tab toggle](Navigation-and-Persistence#last-tab-toggle-last_tab_button)** — a swap button flips between the current tab and the one before it (`last_tab_button`).
- **[Share button](Navigation-and-Persistence#share-button-share_button)** — copy a direct link to the open tab, with an optional QR code for setting up tablets (`share_button`).
- **[Scroll memory](Navigation-and-Persistence#scroll-memory-scroll_memory)** — switching back to a tab returns you to where you left it (`scroll_memory`).
- **[Back button](Navigation-and-Persistence#back-button-history)** — tab switches become history entries; Back returns to the previous tab (`history`).
- **[Linked decks](Feature-Linked-Decks)** — decks on one dashboard switch tabs together, matched by tab name (`sync_group`).
- **[Tab as popup](Feature-Popup)** — a button on another card opens one tab in a dialog (`popup`, `tabdeck_popup`).
- **[Wizard mode](Feature-Wizard)** — Back / Next buttons and a progress bar for step-by-step guides (`wizard`).
- **[Overview grid](Feature-Overview)** — every tab at once as a live thumbnail; tap one to open it (`overview`).
- **[Search & keyboard shortcuts](Feature-Search-Hotkeys)** — 🔍 quick-switch filter (`search`); Ctrl+K dashboard search that finds the tab showing an entity (`entity_search`); 1–9, [ ], / shortcuts (`hotkeys`).
- **[Grouped tabs](Feature-Grouped-Tabs)** — `children:` as a second-level row or a ▾ dropdown menu (`children_display`); `breadcrumbs`; `hide_bar`; `selectTab()` API and `tabdeck-tab-changed` event.
- **[Collapsible deck](Feature-Collapsible)** — tap the active tab to fold the content away (`collapsible`, `start_collapsed`).
- **[Scroll-spy (anchor mode)](Feature-Scroll-Spy)** — stack every tab as a section; the bar scrolls to and tracks sections (`scroll_spy`).
- **[Panel transitions](Feature-Panel-Transition)** — fade, slide, scale, flip or rise when switching tabs, with your own duration and easing (`transition`).
- **[Reduced motion](Feature-Panel-Transition#reduced-motion)** — every animation stops when the device asks for less motion.
- **[Picture-in-picture](Feature-Content-Layout#picture-in-picture-pip)** — a camera (or any card) keeps playing in a corner window while you use other tabs (`pip`).
- **[Mouse wheel](Feature-Gestures#mouse-wheel-wheel_switch)** — scroll over the tab bar to change tabs on a desktop (`wheel_switch`).
- **[Edge swipe only](Feature-Gestures#edge-swipe-only-swipe_edge)** — swipes count only from the sides of the deck, so they don't clash with sliders (`swipe_edge`).
- **[Swipe lock](Feature-Gestures#swipe-lock-swipe_lock)** — a swipe that starts on a slider or a map moves that control, not the tab (`swipe_lock`).
- **[Swipe peek](Feature-Content-Layout#swipe-peek-swipe_peek)** — the content follows the finger and the next tab slides in (`swipe_peek`).
- **[Compare mode](Feature-Hold-Action#compare-two-tabs-side-by-side-compare)** — long-press a tab to show it side by side with the open one (`compare`).
- **[Hold to preview](Feature-Hold-Action#preview-a-tab-by-holding-it-hold_peek)** — hold a tab to see its content without switching to it (`hold_peek`).
- **[Navigation & action tabs](Feature-Navigation-Tabs)** — a tab that navigates / runs an action instead of opening a panel (`tap_action`).
- **[Tab-change actions](Feature-Enter-Leave-Actions)** — run an action when a tab opens or closes (`enter_action`, `leave_action`).
- **[Tab & badge actions](Feature-Hold-Action)** — long-press tab (`hold_action`), double-tap tab (`double_tap_action`) and clickable badge (`badge_action`).
- **[Auto-rotate & idle return](Feature-Kiosk)** — cycle tabs on a timer (`auto_rotate`) or return to the default when idle (`idle_return`), and dim the screen or show a clock (`idle_dim`).
- **[Quiet hours](Feature-Kiosk#quiet-hours-quiet_hours)** — no automatic tab switching, flashing or sounds at night (`quiet_hours`).
- **[Keep the screen on](Feature-Kiosk#keep-the-screen-on-keep_awake)** — chosen tabs, such as cameras or recipes, stop the tablet from sleeping (`keep_awake`).
- **[Click sound](Feature-Kiosk#click-sound-click_sound)** — a soft tick when switching tabs on a kiosk, with a volume (`click_sound`).
- **[Offline banner](Feature-Kiosk#offline-banner-offline_banner)** — a warning over the deck while the connection to Home Assistant is down (`offline_banner`).
- **[Performance & swipe options](Feature-Performance)** — `unmount_hidden`, `unload_after` (free tabs unused for N minutes), `swipe_wrap`, `swipe_mouse` (desktop drag).

## Dynamic behaviour
- **[Dynamic tabs](Feature-Dynamic-Tabs)** — generate a tab per item from a live Jinja list (`auto_tabs`).
- **[A tab per area / floor / label / domain / device / list / calendar / camera / zone](Feature-Dynamic-Tabs#built-in-sources-a-tab-per-area-floor-label-domain-device-list-calendar-camera-or-zone)** — `auto_tabs: { source: areas }`, no Jinja needed, with fitting default cards.
- **[TaskMate and Z2M Device Tracker tabs](Feature-Dynamic-Tabs#taskmate-and-z2m-device-tracker)** — a tab per TaskMate child with chores left, or per kind of Zigbee issue (`source: taskmate`, `source: z2m_tracker`).
- **[Auto content](Feature-Dynamic-Tabs#area-floor-and-label-tabs-without-a-card-auto-content)** — a tab with `area` / `floor` / `label` and no card shows tiles of its entities.
- **[Unavailable devices](Badges#unavailable-devices-health_dim)** — tabs whose devices are mostly offline fade and show a warning (`health_dim`).
- **[Changed since you last looked](Badges#changed-since-you-last-looked-changed_dot)** — a dot on tabs whose entities changed while you were elsewhere (`changed_dot`, `watch`).
- **[Count badges, badge icons & progress rings](Badges#count-badge-no-jinja)** — `badge: { count: light.*, state: on }`, `badge_icon`, `ring`.
- **[Progress bar](Badges#progress-bar-ring_style-bar)** — the ring's value as a bar along the bottom of the tab, for a washer cycle or a print (`ring_style: bar`).
- **[More than one badge](Badges#more-than-one-badge-badges)** — a count, an alert icon and a lock side by side on one tab (`badges`).
- **[Badge bounce](Badges#bounce-on-change-badge_bounce)** — a badge jumps when its value changes (`badge_bounce`).
- **[Countdown badge](Badges#countdown-badge-countdown)** — a timer's time left, ticking live on the tab (`countdown`).
- **[Mini graph](Badges#mini-graph-graph)** — a tiny history line of one entity next to the tab's label (`graph`).
- **[Alerting tabs first & snooze](Feature-Alert#alerting-tabs-first-alert_first)** — `alert_first`, long-press to snooze (`alert_snooze`).
- **[Remote control & events](Feature-Remote-Control)** — automations switch tabs (`remote_entity`, `remote_event`), HA hears tab changes (`fire_event`), defaults by time and device.
- **[PIN-locked tabs](Feature-PIN)** — ask for a code before a tab opens (`pin`; a convenience lock, not security).
- **[Visibility and/or/not groups](Tab-Visibility#logical-groups-and--or--not)** — nestable logical conditions for tab visibility.
- **[Alert pulse](Feature-Alert)** — a tab pulses while its conditions are met (`alert`).
- **[Alert count chip](Feature-Alert#alert-count-on-the-bar-summary_chip)** — "⚠ 3 alerts" at the end of the bar; click to visit each (`summary_chip`).
- **[Auto-select a tab](Feature-Auto-Select)** — switch tab when an entity becomes active (`auto_select`).
- **[Time & user visibility](Tab-Visibility#time)** — show tabs by time-of-day/weekday or HA user.
- **[Conditional default tab](Feature-Conditional-Default)** — pick the starting tab by state (`default_if`).
- **[Follow the room](Feature-Remote-Control#follow-the-room-follow_room)** — the deck shows the tab for the room you're in, from a room-presence sensor (`follow_room`).
- **[Doorbell takeover](Feature-Remote-Control#doorbell-takeover-takeover)** — a doorbell press shows the camera tab with a banner and countdown, then goes back (`takeover`).
- **[Learned default tab](Feature-Remote-Control#learned-default-tab-learned_default)** — opens the tab you use most at this time of day (`learned_default`).
- **[Companion integration](Feature-Remote-Control#companion-integration-companion)** — each browser's deck becomes a select entity that automations can read and set (`companion`).
- **[Usage stats](Feature-Remote-Control#usage-stats-usage_stats)** — minutes per tab, reported to a Home Assistant sensor or event (`usage_stats`).

## Editor
- **[Languages](Feature-Languages)** — editor and card text in English, German, Spanish, French, Italian, Dutch, Polish and Portuguese, following your HA language.
- **[Help translate](Feature-Languages#help-translate)** — check or fix texts in your language on Weblate; no coding needed.
- **[Right-to-left](Feature-Languages#right-to-left-languages)** — mirrored layout, arrow keys and swipes for Arabic, Hebrew and similar (`direction` to force it).
- **[Convert from another card](Feature-Convert)** — paste a tabbed-card, swipe-card, state-switch, stack, Bubble pop-ups (stacked or stand-alone), Mushroom chips, sections view or dashboard and get tabs.
- **[Automation blueprints](Feature-Remote-Control#blueprints)** — show a tab when something happens, take over the deck when the doorbell rings, "show <tab>" with Assist, "next tab", "previous tab" and "go back", or step through tabs with a Zigbee knob or remote, without writing the automation.
- **[Voice commands](Feature-Remote-Control#voice-commands-as-assist-intents)** — ready-made Assist sentences and intents for showing and stepping through tabs (`voice/`).
- **[Gallery](Gallery)** — short animated clips of the card in action, made automatically from the demo.
- **[Playground](https://tempus2016.github.io/tabdeck-card/demo/)** — edit a config in the browser, watch the card change, and share it with *Copy a link to this config*.
- **[Theme builder](https://tempus2016.github.io/tabdeck-card/demo/theme.html)** — style a sample deck live in the browser and copy the YAML.
- **[Preset gallery](Feature-Theming#preset-gallery-and-import-a-style)** — ready-made looks; paste one into *Import a style* in the editor, which takes only the look options.
- **[YAML autocomplete](Feature-YAML-Schema)** — a JSON schema for option suggestions, descriptions and typo checks in VS Code and Studio Code Server.
- **[Export as a dashboard view](Feature-Convert#export-as-a-dashboard-view)** — turn a deck into an HA sections view, one section per tab.
- **[Starter templates](Feature-Starter-Templates)** — one-click Rooms / Lights / Security / Media / Climate / Energy / Family decks built from your entities.
- **[Make tabs from rooms](Feature-Starter-Templates#make-tabs-from-rooms)** — tick areas and get one editable tab per room.
- **[Instant dashboard](Feature-Starter-Templates#a-whole-new-dashboard-from-your-rooms)** — one click makes a new dashboard with a tab per room; existing dashboards are never touched.
- **[Why is this tab hidden?](Feature-Condition-Check)** — live ✅/❌ check of every visibility / alert / default condition, with current values.
- **[Edit mode helpers](Feature-Edit-Mode)** — hidden tabs appear faded while editing the dashboard; rotation pauses (`edit_mode_reveal`).
- **[Copy & import tabs](Editor#copy--import-tabs)** — copy a tab to the clipboard and import tabs into another deck.
- **[Duplicate tab](Feature-Duplicate-Tab)** — one-click deep copy of a tab in the editor.
- **[Expand all / Collapse all](Feature-Editor-Expand-Collapse)** — bulk-toggle tab blocks; new tabs auto-expand.
- **[Drag-to-reorder & warnings](Editor#reordering-deleting-adding)** — drag tabs to reorder; duplicate-name warnings.
- **[Condition builders](Editor#condition-builders)** — edit Visibility / Alert / Default-when conditions with HA's native builder.
- **[Live preview](Editor#live-preview)** — the editor previews the bar as you edit.
- **[What's new](Editor#whats-new)** — a short note in the editor after each update.
- **[Click to edit](Editor#click-to-edit)** — click a tab in the preview to open its settings.
- **[What this card does](Editor#what-this-card-does)** — a plain-language summary of the deck, in your language.
- **[Undo and redo](Editor#undo-and-redo)** — buttons and Ctrl+Z / Ctrl+Shift+Z, last 50 changes.
- **[Config check](Editor#config-check)** — notes on clashing, useless, unknown and slow settings.
- **[Bulk edit](Editor#bulk-edit)** — tick several tabs and set an icon or colour on all of them.
- **[Icon suggestions](Editor#icon-suggestions)** — fitting icons from the tab name, in eight languages.

## Power users
- **[Tab defaults](Feature-Reuse#tab_defaults)** — keys applied to every tab (`tab_defaults`).
- **[Tab templates](Feature-Reuse#tab_templates--use)** — named blueprints filled per tab (`tab_templates`, `use`, `vars`).
- **[Shared tabs](Feature-Reuse#shared-tabs-tab_ref)** — reuse a tab defined on another dashboard (`tab_ref`).
- **[Debug panel](Feature-Debug)** — conditions, templates, start reason and timings under the card (`debug`).
- **[Speed overlay](Feature-Debug#speed-overlay-debug-speed)** — how long each tab takes to draw, as a chip on the tab (`debug: speed`).
- **[Public API](Feature-Grouped-Tabs#related-hide_bar-and-the-public-api)** — `selectTab()`, `selectedTab`, `tabdeck-tab-changed`.
- **[Developer access](Feature-Developer-API)** — `window.tabdeck` lists every deck on the page, switches them and reports tab changes.

## Theming
- **[Style presets](Feature-Presets)** — one-line looks: `ios`, `material`, `glass`, `minimal`, `rail`, `neumorphic`, `ha-tile`, `mushroom`, `bubble`, `fluent`, `material-you`, `material-expressive`, `liquid-glass`, `accessible` (`preset`).
- **[Theme colours & colour picker](Feature-Theming#theme-colour-names)** — HA theme colour names, HA's colour picker in the editor.
- **[Readable text & contrast warnings](Feature-Theming#readable-text-and-contrast)** — automatic black/white on solid fills; the editor flags low contrast.
- **[Seasonal looks](Feature-Theming#seasonal-looks-seasons)** — colours that change by date, e.g. for winter (`seasons`).
- **[Density](Feature-Theming#density)** — `compact` or `comfortable` tab bar.
- **[Pictures, icon animations, fonts, haptics](Feature-Tab-Look)** — `picture`, `icon_animation`, `font_*`, `haptic`.
- **[Picture colours](Feature-Tab-Look#accent-from-the-picture-picture_accent)** — a tab's accent comes from its picture (`picture_accent`).
- **[Theming & styles passthrough](Feature-Theming)** — set CSS variables from config (`styles`).
- **[Per-tab styles](Feature-Theming#per-tab-styles)** — `styles` on a tab, applied while it's active.

---

See **[Configuration](Configuration)** for the complete option reference.

## Persistence
- **[Remember across devices](Navigation-and-Persistence#cross-device-with-remember-entity)** — store the active tab in an entity (`remember: entity`).
- **[Custom storage key](Navigation-and-Persistence#storage_key-browser-mode)** — independent browser persistence (`storage_key`).
