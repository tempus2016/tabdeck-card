# Configuration

All options live on the top-level card config (`type: custom:tabdeck-card`) except per-tab options, which live on each entry of `tabs`.

## Top-level options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | list | **required**\* | The tabs to show. See [Per-tab options](#per-tab-options). \*Optional when `auto_tabs` is set. |
| `auto_tabs` | map | — | Generate a tab per item from a Jinja list (`template` + optional `tab_template`), or from a built-in `source` (`areas`, `labels`, `floors`, `domains`, `devices`, `todo`, `calendars`, `cameras`, `zones`, `updates`, `repairs`, `notifications`; with `domains`, `exclude`, `content: tiles`). See [Dynamic tabs](Feature-Dynamic-Tabs). |
| `default_tab` | number \| string | `0` | Tab shown first. A number is a 0-based index; a string matches a tab `name`. |
| `preset` | `default` \| `ios` \| `material` \| `glass` \| `minimal` \| `rail` \| `neumorphic` \| `ha-tile` \| `mushroom` \| `bubble` \| `fluent` \| `material-you` \| `material-expressive` \| `liquid-glass` \| `accessible` | — | A bundle of styling options; explicit keys override it. See [Style presets](Feature-Presets). |
| `position` | `top` \| `bottom` \| `left` \| `right` | `top` | Where the tab bar sits relative to the content. |
| `orientation_layout` | boolean \| `{portrait, landscape}` | — | The bar's side follows the screen: bottom when upright, left when sideways (or your own). Overrides `position`. See [Responsive layouts](Feature-Responsive#follow-the-screens-orientation-orientation_layout). |
| `style` | `underline` \| `pill` \| `segmented` \| `boxed` \| `text` | `underline` | Visual style of the tab bar. See [Extra bar styles](Feature-Bar-Styles). |
| `tab_display` | `both` \| `icon` \| `label` \| `active` \| `dots` | `both` | Show icons, labels, both — or icons with only the selected tab expanded. See [Tab display mode](Feature-Tab-Display). |
| `tab_display_narrow` / `narrow_width` | `both` \| `icon` \| `label` \| `active` \| `dots` / px | — / `450` | Display mode when the card is narrower than `narrow_width`. See [Responsive layouts](Feature-Responsive). |
| `split` | number \| `{min_width, columns}` | — | At or above this card width, show all tabs side by side (no bar). See [Responsive layouts](Feature-Responsive). |
| `align` | `start` \| `center` \| `end` \| `justify` | `start` | How tabs are distributed along the bar. See [Tab alignment](Feature-Tab-Alignment). |
| `badge_display` | `text` \| `dot` | `text` | Render badges as text or a dot. See [Badge display mode](Feature-Badge-Display). |
| `badge_bounce` | boolean | `false` | A tab's badge jumps briefly when its value changes. See [Badges](Badges#bounce-on-change-badge_bounce). |
| `badge_format` | `{precision, unit, max}` | — | Default numeric badge formatting for every tab. See [Badges](Badges#numeric-formatting-badge_format). |
| `health_dim` | boolean \| number 0–1 | `false` | A tab fades and shows a warning when half (or this share) of its entities are unavailable. See [Badges](Badges#unavailable-devices-health_dim). |
| `changed_dot` | boolean | `false` | A dot on tabs whose entities changed since this browser last showed them. See [Badges](Badges#changed-since-you-last-looked-changed_dot). |
| `transition` | `none` \| `fade` \| `slide` \| `scale` \| `flip` \| `rise` | `none` | Animate content on tab switch. See [Panel transitions](Feature-Panel-Transition). |
| `transition_narrow` | as `transition` | — | Transition used instead on cards narrower than `narrow_width` (e.g. `none` on phones). See [Panel transitions](Feature-Panel-Transition). |
| `transition_duration` / `transition_easing` | ms / CSS easing | `180` / `ease` | Length and curve of the panel animation. See [Panel transitions](Feature-Panel-Transition). |
| `indicator_size` | number (1–16) | `3` | Underline indicator thickness in px. See [Indicator thickness](Feature-Indicator-Size). |
| `accent_indicator` | boolean | `true` | Colour the indicator by the selected tab's `accent`. See [Accent indicator](Feature-Accent-Indicator). |
| `scrollable` | `auto` \| `true` \| `false` | `auto` | Whether the bar scrolls horizontally when tabs overflow. `auto` scrolls only when needed. |
| `sticky` | boolean | `false` | Pin the bar while content scrolls. See [Sticky tab bar](Feature-Sticky-Bar). |
| `bar_autohide` | boolean | `false` | A pinned bar slides away while you scroll down and comes back when you scroll up. See [Sticky tab bar](Feature-Sticky-Bar#hide-while-scrolling-down-bar_autohide). |
| `collapsible` / `start_collapsed` | boolean | `false` | Tap the active tab to fold the content away / start folded. See [Collapsible deck](Feature-Collapsible). |
| `scroll_spy` | boolean | `false` | Stack all tabs as sections; the bar scrolls to and tracks them. See [Scroll-spy](Feature-Scroll-Spy). |
| `bar_fade` | boolean | `true` | Fade the bar's edge(s) that have more tabs when it scrolls sideways; `false` turns it off. See [Bar fade](Feature-Bar-Fade). |
| `scroll_buttons` / `overflow_menu` | boolean | `false` | Scroll arrows / ⋯ jump-menu when the bar overflows. See [Scroll buttons](Feature-Scroll-Buttons). |
| `hidden_alerts` | boolean | `false` | The ⋯ button counts alerts and badges on tabs that don't fit on the bar; the list shows each tab's badge. See [Scroll buttons](Feature-Scroll-Buttons#alerts-on-tabs-that-dont-fit-hidden_alerts). |
| `swipe_mouse` | boolean | `false` | Change tabs by mouse drag (desktop). |
| `wheel_switch` | boolean | `false` | Scroll the mouse wheel over the tab bar to change tab (desktop). See [Gestures](Feature-Gestures#mouse-wheel-wheel_switch). |
| `swipe_edge` | boolean \| number (px) | — | Swipes only count when they start near the left or right edge (`true` = 40 px). See [Gestures](Feature-Gestures#edge-swipe-only-swipe_edge). |
| `swipe_lock` | boolean | `false` | A swipe that starts on a slider or a map moves that control and never changes tab. See [Gestures](Feature-Gestures#swipe-lock-swipe_lock). |
| `unmount_hidden` | boolean | `false` | Keep only the active tab's card mounted. See [Performance](Feature-Performance). |
| `friendly_errors` | boolean | `false` | A broken card shows a plain-words message and its tab a warning badge. See [Content layout](Feature-Content-Layout#friendly-errors-friendly_errors). |
| `bar_limit` | number | — | Big decks: draw at most this many tabs in the bar (a page around the open one); ⋯ lists all. See [Performance](Feature-Performance#big-decks-bar_limit). |
| `loading_placeholder` | boolean | `false` | Grey boxes in a tab until its card has drawn. See [Performance](Feature-Performance#loading-placeholder-loading_placeholder). |
| `unload_after` | number (minutes) | — | Free a tab's card when it hasn't been opened for this long; it's rebuilt when opened again. See [Performance](Feature-Performance#unload_after). |
| `header_cards` / `footer_cards` | list of card configs | — | Cards shown above the bar / below the content on every tab. See [Content layout](Feature-Content-Layout#header-and-footer-cards-header_cards-footer_cards). |
| `content_height` | `auto` \| `tallest` \| length | `auto` | Keep the tallest tab's height, or a fixed height that scrolls inside. See [Content layout](Feature-Content-Layout#content-height-content_height-content_max_height). |
| `content_max_height` | length | — | Content taller than this scrolls inside the card. |
| `fullscreen` | boolean | `false` | Full-screen button in the bar: opens the active tab over the whole window. See [Content layout](Feature-Content-Layout#full-screen-fullscreen). |
| `overview` | boolean | `false` | Grid button in the bar (and a pinch-in) that shows every tab as a live thumbnail. See [Overview grid](Feature-Overview). |
| `last_tab_button` | boolean | `false` | Swap button in the bar that flips back to the tab open before. See [Navigation & persistence](Navigation-and-Persistence#last-tab-toggle-last_tab_button). |
| `swipe_peek` | boolean | `false` | While swiping, the content follows the finger and the next tab slides in. See [Content layout](Feature-Content-Layout#swipe-peek-swipe_peek). |
| `hold_peek` | boolean | `false` | Hold a tab to preview its content without switching. See [Tab & badge actions](Feature-Hold-Action#preview-a-tab-by-holding-it-hold_peek). |
| `compare` | boolean | `false` | Long-press a tab to show it side by side with the open one. See [Tab & badge actions](Feature-Hold-Action#compare-two-tabs-side-by-side-compare). |
| `header` | boolean | `false` | Show the active tab's title above the content. See [Content header](Feature-Header). |
| `aria_label` | string | `Tabs` | Accessible name for the tab bar (screen readers). |
| `remember` | `none` \| `browser` \| `url` \| `entity` | `none` | How the selected tab is remembered. See [Navigation & Persistence](Navigation-and-Persistence). |
| `share_button` | boolean \| `qr` | — | Bar button that copies a `#tab=` link to the open tab; `qr` shows a QR code too. See [Navigation & Persistence](Navigation-and-Persistence#share-button-share_button). |
| `lazy` | boolean | `false` | When `true`, a tab's card is only built the first time it becomes visible. See [Performance](Feature-Performance#lazy-and-preload). |
| `preload` | `idle` \| `all` | — | With `lazy`, build the neighbouring tabs (`idle`) or every tab (`all`) in the background while the browser is idle. See [Performance](Feature-Performance#lazy-and-preload). |
| `animated` | boolean | `true` | Animate the selection indicator as it moves between tabs. |
| `liquid_indicator` | boolean | `false` | The indicator stretches to the new tab like a drop, then settles. See [Indicator](Feature-Indicator-Size#liquid-indicator-liquid_indicator). |
| `swipe` | boolean | `false` | Allow left/right swipe gestures to change tabs (mobile). |
| `auto_rotate` | number \| `{interval, resume_after}` | — | Cycle tabs every N seconds; pauses after interaction. See [Auto-rotate & idle return](Feature-Kiosk). |
| `idle_return` | number (seconds) | — | Return to the default tab after inactivity. See [Auto-rotate & idle return](Feature-Kiosk). |
| `quiet_hours` | `"HH:MM-HH:MM"` \| `{from, to, entity}` | — | No automatic switching, alert pulses, badge bounces or click sounds in this window or while the entity is on. See [Wall panels](Feature-Kiosk#quiet-hours-quiet_hours). |
| `idle_dim` | number (minutes) \| `{after, mode, opacity}` | — | Dim the screen, turn it black or show a clock after inactivity. See [Wall panels](Feature-Kiosk#screensaver-idle_dim). |
| `alert_first` | boolean | `false` | Alerting tabs move to the front. See [Alert pulse](Feature-Alert#alerting-tabs-first-alert_first). |
| `summary_chip` | boolean \| string \| `{text, icon, color}` | — | A chip at the end of the bar: "3 alerts", or your own text (`{n}` = alert count). Click opens the next alerting tab. See [Alert pulse](Feature-Alert#alert-count-on-the-bar-summary_chip). |
| `alert_snooze` | number (minutes) | — | Long-press an alerting tab to silence its pulse. See [Alert pulse](Feature-Alert#snooze-alert_snooze). |
| `default_by_time` / `default_by_device` | map | — | Starting tab by time of day / by browser. See [Remote control & events](Feature-Remote-Control#default-tab-by-time-of-day-default_by_time). |
| `learned_default` | boolean \| map | — | On load, open the tab this browser picks most around this hour (`min_uses`, `notice`). See [Remote control & events](Feature-Remote-Control#learned-default-tab-learned_default). |
| `remote_entity` | entity id | — | Switch to the tab named by this entity's state when it changes. See [Remote control & events](Feature-Remote-Control). |
| `remote_event` / `fire_event` / `event_id` | boolean / boolean / string | `false` / `false` / — | Switch on `tabdeck_select` events; fire `tabdeck_tab_changed` (admin users). See [Remote control & events](Feature-Remote-Control#events-remote_event-fire_event). |
| `companion` / `companion_id` | boolean / string | `false` / — | A select entity per browser + deck through the Tabdeck Companion integration; `companion_id` names this browser. See [Remote control](Feature-Remote-Control#companion-integration-companion). |
| `usage_stats` | boolean \| number | — | Report minutes per tab every 10 minutes (or N): a usage sensor through the companion integration, else a `tabdeck_usage` event. See [Remote control](Feature-Remote-Control#usage-stats-usage_stats). |
| `offline_banner` | boolean | `false` | A "Connection lost · reconnecting…" bar over the content while the connection to HA is down. See [Wall panels](Feature-Kiosk#offline-banner-offline_banner). |
| `follow_room` | entity \| map | — | Show the tab for the room a presence entity reports (`entity`, `map`; tab `area` or name). See [Remote control & events](Feature-Remote-Control#follow-the-room-follow_room). |
| `takeover` | map \| list | — | Jump to a tab when an entity fires (a doorbell), with a banner and countdown, then go back (`entity`, `state`, `tab`, `duration`, `message`, `icon`). See [Remote control & events](Feature-Remote-Control#doorbell-takeover-takeover). |
| `edit_mode_reveal` | boolean | `true` | Show hidden tabs (faded) and pause rotation while editing the dashboard. See [Edit mode helpers](Feature-Edit-Mode). |
| `dock` | boolean | `false` | Pin the bar to the bottom of the screen as phone-style navigation. See [Dock](Feature-Dock). |
| `content_arrows` | boolean | `false` | ‹ › buttons beside the content to step between tabs. See [Dots & arrows](Feature-Dots-Arrows). |
| `breadcrumbs` | boolean \| `{root}` | `false` | A trail of the open tab at every level of grouped tabs, above the content. See [Grouped tabs](Feature-Grouped-Tabs#breadcrumbs-breadcrumbs). |
| `hide_bar` | boolean | `false` | Render only the content, no tab bar. See [Grouped tabs](Feature-Grouped-Tabs#related-hide_bar-and-the-public-api). |
| `search` | boolean | `false` | 🔍 quick-switch filter over the tabs. See [Search & shortcuts](Feature-Search-Hotkeys). |
| `hotkeys` | boolean | `false` | Keyboard shortcuts: 1–9, [ ], /. See [Search & shortcuts](Feature-Search-Hotkeys#keyboard-shortcuts). |
| `sync_group` | string | — | Decks on the page with the same group switch tabs together, matched by tab name. See [Linked decks](Feature-Linked-Decks). |
| `popup` | boolean \| `hidden` | — | A `fire-dom-event` button on another card opens one tab in a dialog (`tabdeck_popup: <tab>`); `hidden` shows only the popups. See [Tab as popup](Feature-Popup). |
| `wizard` | boolean \| `{finish_action}` | — | Step-by-step guide: step counter, progress bar and Back / Next buttons instead of the tab bar. See [Wizard mode](Feature-Wizard). |
| `entity_search` | boolean | `false` | Ctrl+K (and a bar button) finds the tab that shows an entity. See [Search & shortcuts](Feature-Search-Hotkeys#dashboard-search-entity_search). |
| `history` | boolean | `false` | Back button returns to the previous tab. See [Back button](Navigation-and-Persistence#back-button-history). |
| `scroll_memory` | boolean | `false` | Each tab remembers how far down you scrolled. See [Navigation & Persistence](Navigation-and-Persistence#scroll-memory-scroll_memory). |
| `customize` | boolean | `false` | Each person can reorder/hide tabs, saved per browser. See [Arrange tabs](Feature-Customize). |
| `drag_reorder` | boolean | `false` | Drag tabs on the bar to reorder them, saved per browser (shares the `customize` order). See [Arrange tabs](Feature-Customize#drag-to-reorder-drag_reorder). |
| `sort_by_usage` | boolean | `false` | Each browser puts the tabs it opens most first. See [Arrange tabs](Feature-Customize#most-used-tabs-first-sort_by_usage). |
| `rail_expand` | boolean | `false` | Left/right bars: icons until hovered or focused, then labels, over the content. See [Expanding side rail](Feature-Bar-Styles#expanding-side-rail-rail_expand). |
| `styles` | map | — | CSS variables/properties applied to the card. See [Theming](Feature-Theming). |
| `tab_defaults` | map | — | Keys applied to every tab (a tab's own keys win; `styles` merge). See [Reuse](Feature-Reuse#tab_defaults). |
| `tab_templates` | map | — | Named tab blueprints; a tab uses one with `use` + `vars`. See [Reuse](Feature-Reuse#tab_templates--use). |
| `direction` | `ltr` \| `rtl` | HA's language | Force left-to-right or right-to-left layout. See [Languages](Feature-Languages#right-to-left-languages). |
| `seasons` | list | — | Date ranges (built-in `winter`, `autumn`, or your own) that change the accent, bar background and styles. See [Theming](Feature-Theming#seasonal-looks-seasons). |
| `picture_accent` | boolean | `false` | A tab with a `picture` takes its accent colour from it. See [Tab look](Feature-Tab-Look#accent-from-the-picture-picture_accent). |
| `bar_text` | `auto` \| `light` \| `dark` | — | Tab text colour over `bar_background` (also a picture): worked out, or set. See [Bar background](Feature-Bar-Surface#readable-text-bar_text). |
| `glass` | boolean \| number (px) | — | Frosted-glass bar, menus and dock; a number sets the blur. See [Bar background](Feature-Bar-Surface#frosted-glass-glass). |
| `density` | `default` \| `compact` \| `comfortable` | `default` | Tab bar size. See [Theming](Feature-Theming#density). |
| `haptic` | `selection` \| `light` \| `medium` \| `heavy` \| … | — | Companion-app vibration on tab switches. See [Tab look](Feature-Tab-Look#haptic-feedback-haptic). |
| `click_sound` | boolean \| number (0–1) | — | A soft synthesised tick on tab switches the person makes; a number is the volume. See [Wall panels](Feature-Kiosk#click-sound-click_sound). |
| `debug` | boolean \| `speed` | `false` | A panel under the card with conditions, templates, start reason and timings; `speed` also puts each tab's draw time on the bar. See [Debug panel](Feature-Debug). |

> **Legacy:** `options.defaultTabIndex` is still accepted as a fallback for `default_tab`.

## Per-tab options

Each item in `tabs`:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `card` | card config | **required**\* | Any Lovelace card configuration. (\*Not needed for a `tap_action` tab.) |
| `cards` | list of card configs | — | Multiple cards, auto-stacked. See [Multiple cards per tab](Feature-Multiple-Cards). \*Either `card` or `cards`. |
| `layout` / `columns` / `min_column_width` | `masonry` / number / px | — / `2` / — | Balance `cards` into columns like HA's masonry view. See [Content layout](Feature-Content-Layout#masonry-inside-a-tab-layout-masonry). |
| `layout: sections` / `sections` / `max_columns` | list / number | — / `4` | Titled groups of cards like HA's sections view (`title`, `icon`, `badges`, `column_span`, `cards`). See [Content layout](Feature-Content-Layout#sections-inside-a-tab-layout-sections). |
| `view` | `/dashboard/view` \| `{dashboard, view}` | — | Show another dashboard view's cards instead of a `card`. See [One-line tab content](Feature-Content-Shortcuts#reuse-a-dashboard-view-view). |
| `tab_ref` | `dashboard/tab` \| `dashboard/view/tab` | — | Reuse a tab from another dashboard's Tabdeck card; keys next to it override. See [Shared tabs](Feature-Reuse#shared-tabs-tab_ref). |
| `url` / `aspect_ratio` | URL / `75%` \| `16:9` | — | Show a web page (HA's iframe card) instead of a `card`. See [One-line tab content](Feature-Content-Shortcuts#web-page-tab-url). |
| `markdown` | string | — | Show Markdown text (HA's markdown card, templates work) instead of a `card`. See [One-line tab content](Feature-Content-Shortcuts#text-tab-markdown). |
| `empty_message` | boolean \| string \| `{title, text, icon}` | — | A message shown when every card in the tab is hidden. See [Content layout](Feature-Content-Layout#empty-message-empty_message). |
| `auto_refresh` | minutes | — | Rebuild the tab's card this often (stale cameras, web pages). See [Content layout](Feature-Content-Layout#auto-refresh-auto_refresh). |
| `zoom` / `padding` / `spacing` | number / CSS length / CSS length | — | Zoom the tab's content, pad it, and set the gap between its cards. See [Content layout](Feature-Content-Layout#size-controls-zoom-padding-spacing). |
| `background` | string | — | Content background while the tab is open: colour, gradient or image path / URL (may be a template). See [Content layout](Feature-Content-Layout#tab-background-background). |
| `page_background` | string | — | The whole dashboard view's background while the tab is open (same values as `background`, may be a template). See [Content layout](Feature-Content-Layout#page-background-page_background). |
| `name` | string | — | Tab label. Falls back to `Tab N` when omitted. |
| `subtitle` | string | — | Secondary text under the label. See [Tab subtitles](Feature-Subtitle). |
| `tooltip` | string | — | A short summary shown when the mouse rests on the tab (template allowed). See [Tab subtitles](Feature-Subtitle#hover-summary-tooltip). |
| `icon` | string (mdi) | — | Tab icon, e.g. `mdi:lightbulb`. |
| `accent` | string (CSS colour) | — | Accent colour for the tab (indicator + selected state). |
| `color` | string (CSS colour) | — | Fixed label/icon colour for the tab. See [Per-tab colour](Feature-Tab-Color). |
| `badge` | string | — | An entity id (shows its state) or a Jinja template. See [Badges](Badges). |
| `badge_format` | `{precision, unit, max}` | — | Numeric badge formatting (overrides the top-level default). See [Badges](Badges#numeric-formatting-badge_format). |
| `watch` | list | entities in the tab's card | The entities `changed_dot` watches for this tab. See [Badges](Badges#changed-since-you-last-looked-changed_dot). |
| `badge` (count form) | `{count, state, area}` | — | Count matching entities without Jinja. See [Badges](Badges#count-badge-no-jinja). |
| `badge_icon` | icon | — | An icon as the badge. See [Badges](Badges#badge-icon-badge_icon). |
| `badges` | list of `{badge, icon, color}` | — | More badges after the main one (count, alert icon, …). See [Badges](Badges#more-than-one-badge-badges). |
| `countdown` | entity | — | A timer (or timestamp entity): the badge counts down the time left while it runs. See [Badges](Badges#countdown-badge-countdown). |
| `ring` / `ring_max` / `ring_color` | entity / template / number, number, colour | — / `100` / — | Progress ring around the icon. See [Badges](Badges#progress-ring-ring). |
| `ring_style` | `ring` \| `bar` | `ring` | `bar` shows the ring's value as a progress bar under the tab (no icon needed). See [Badges](Badges#progress-bar-ring_style-bar). |
| `graph` | entity \| `{entity, hours, color}` | — | A tiny history line of one entity on the tab (default 24 hours). See [Badges](Badges#mini-graph-graph). |
| `area` / `floor` / `label` / `domains` | id / list | — | No card needed: tiles of the entities there. See [Dynamic tabs](Feature-Dynamic-Tabs#area-floor-and-label-tabs-without-a-card-auto-content). |
| `picture` | entity id / URL / template | — | A round picture instead of the icon. See [Tab look](Feature-Tab-Look#pictures-instead-of-icons-picture). |
| `icon_animation` | `spin` \| `pulse` \| `bounce` \| `shake` \| `beat` (or template) | — | Animate the icon. See [Tab look](Feature-Tab-Look#icon-animations-icon_animation). |
| `font_size` / `font_weight` / `font_family` | CSS | — | This tab's label font. See [Tab look](Feature-Tab-Look#fonts-per-tab-font_size-font_weight-font_family). |
| `use` / `vars` | string / map | — | Fill this tab from a `tab_templates` blueprint. See [Reuse](Feature-Reuse#tab_templates--use). |
| `pin` / `pin_timeout` | string / minutes | — | Ask for a code before the tab opens (not security). See [PIN-locked tabs](Feature-PIN). |
| `disabled` | boolean | `false` | Show the tab greyed-out and non-selectable. See [Disabled tabs](Feature-Disabled-Tabs). |
| `pip` | boolean | `false` | After you switch away, the tab's card stays in a floating corner window. See [Content layout](Feature-Content-Layout#picture-in-picture-pip). |
| `keep_awake` | boolean | `false` | Keep the screen on while this tab is open (https only). See [Wall panels](Feature-Kiosk#keep-the-screen-on-keep_awake). |
| `separator` | `line` \| `space` | — | Drawn in the bar before this tab. See [Bar styles](Feature-Bar-Styles#separators-separator). |
| `fab` | boolean | `false` | Render the tab as a raised round action button. See [Floating action tabs](Feature-Dock#floating-action-tabs). |
| `children` / `children_display` / `children_options` | list / string / object | — / `row` / — | Sub-tabs as a second row or a ▾ menu. See [Grouped tabs](Feature-Grouped-Tabs). |
| `card_size` | number | — | `getCardSize()` hint (rows) for this tab, so masonry sizing is stable across tab switches. |
| `tap_action` | action | — | Tap runs this action *instead of* opening the tab (navigation tabs; no `card` needed). See [Navigation & action tabs](Feature-Navigation-Tabs). |
| `enter_action` / `leave_action` | action | — | HA action when the tab becomes / stops being active. See [Tab-change actions](Feature-Enter-Leave-Actions). |
| `hold_action` / `badge_action` | action | — | HA action on tab long-press / badge click. See [Tab & badge actions](Feature-Hold-Action). |
| `double_tap_action` | action | — | HA action on a double tap of the tab. See [Tab & badge actions](Feature-Hold-Action#double-tap-double_tap_action). |
| `visibility` | list of conditions | — | Conditions for showing the tab (supports and/or/not). See [Tab Visibility](Tab-Visibility). |
| `styles` | map | — | CSS properties applied to the card while this tab is active (over the top-level `styles`). See [Theming](Feature-Theming#per-tab-styles). |
| `alert` | list of conditions | — | While all are met, the tab pulses in the alert colour. See [Alert pulse](Feature-Alert). |

> `name`, `subtitle`, `tooltip`, `icon`, `accent`, `color`, `background` and `page_background` also accept a **Jinja template** that renders live. See [State-driven icons, names & colours](Feature-Templated-Fields).

## Full example

```yaml
type: custom:tabdeck-card
position: top
style: pill
default_tab: Climate
remember: url
animated: true
swipe: true
lazy: true
tabs:
  - name: Climate
    icon: mdi:thermostat
    accent: "#e8743b"
    card:
      type: thermostat
      entity: climate.living_room

  - name: Cameras
    icon: mdi:cctv
    badge: binary_sensor.motion_any   # shows on/off
    card:
      type: picture-glance
      entities: []
      camera_image: camera.driveway

  - name: Guests
    icon: mdi:account-group
    visibility:
      - condition: state
        entity: input_boolean.guest_mode
        state: "on"
    card:
      type: entities
      entities:
        - input_boolean.guest_wifi
```

## See also

- **[The Visual Editor](Editor)** — set all of the above without YAML.
- **[Features](Features)** — index of every optional feature and its config key.
