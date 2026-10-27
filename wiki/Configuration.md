# Configuration

All options live on the top-level card config (`type: custom:tabdeck-card`) except per-tab options, which live on each entry of `tabs`.

## Top-level options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | list | **required**\* | The tabs to show. See [Per-tab options](#per-tab-options). \*Optional when `auto_tabs` is set. |
| `auto_tabs` | map | — | Generate a tab per item from a Jinja list (`template` + optional `tab_template`), or from a built-in `source` (`areas`, `labels`, `floors`, `domains`, `devices`, `todo`, `calendars`, `cameras`, `zones`; with `domains`, `exclude`, `content: tiles`). See [Dynamic tabs](Feature-Dynamic-Tabs). |
| `default_tab` | number \| string | `0` | Tab shown first. A number is a 0-based index; a string matches a tab `name`. |
| `preset` | `default` \| `ios` \| `material` \| `glass` \| `minimal` \| `rail` | — | A bundle of styling options; explicit keys override it. See [Style presets](Feature-Presets). |
| `position` | `top` \| `bottom` \| `left` \| `right` | `top` | Where the tab bar sits relative to the content. |
| `style` | `underline` \| `pill` \| `segmented` \| `boxed` \| `text` | `underline` | Visual style of the tab bar. See [Extra bar styles](Feature-Bar-Styles). |
| `tab_display` | `both` \| `icon` \| `label` \| `active` \| `dots` | `both` | Show icons, labels, both — or icons with only the selected tab expanded. See [Tab display mode](Feature-Tab-Display). |
| `tab_display_narrow` / `narrow_width` | `both` \| `icon` \| `label` \| `active` \| `dots` / px | — / `450` | Display mode when the card is narrower than `narrow_width`. See [Responsive layouts](Feature-Responsive). |
| `split` | number \| `{min_width, columns}` | — | At or above this card width, show all tabs side by side (no bar). See [Responsive layouts](Feature-Responsive). |
| `align` | `start` \| `center` \| `end` \| `justify` | `start` | How tabs are distributed along the bar. See [Tab alignment](Feature-Tab-Alignment). |
| `badge_display` | `text` \| `dot` | `text` | Render badges as text or a dot. See [Badge display mode](Feature-Badge-Display). |
| `badge_format` | `{precision, unit, max}` | — | Default numeric badge formatting for every tab. See [Badges](Badges#numeric-formatting-badge_format). |
| `transition` | `none` \| `fade` \| `slide` \| `scale` \| `flip` \| `rise` | `none` | Animate content on tab switch. See [Panel transitions](Feature-Panel-Transition). |
| `transition_narrow` | as `transition` | — | Transition used instead on cards narrower than `narrow_width` (e.g. `none` on phones). See [Panel transitions](Feature-Panel-Transition). |
| `transition_duration` / `transition_easing` | ms / CSS easing | `180` / `ease` | Length and curve of the panel animation. See [Panel transitions](Feature-Panel-Transition). |
| `indicator_size` | number (1–16) | `3` | Underline indicator thickness in px. See [Indicator thickness](Feature-Indicator-Size). |
| `accent_indicator` | boolean | `true` | Colour the indicator by the selected tab's `accent`. See [Accent indicator](Feature-Accent-Indicator). |
| `scrollable` | `auto` \| `true` \| `false` | `auto` | Whether the bar scrolls horizontally when tabs overflow. `auto` scrolls only when needed. |
| `sticky` | boolean | `false` | Pin the bar while content scrolls. See [Sticky tab bar](Feature-Sticky-Bar). |
| `collapsible` / `start_collapsed` | boolean | `false` | Tap the active tab to fold the content away / start folded. See [Collapsible deck](Feature-Collapsible). |
| `scroll_spy` | boolean | `false` | Stack all tabs as sections; the bar scrolls to and tracks them. See [Scroll-spy](Feature-Scroll-Spy). |
| `scroll_buttons` / `overflow_menu` | boolean | `false` | Scroll arrows / ⋯ jump-menu when the bar overflows. See [Scroll buttons](Feature-Scroll-Buttons). |
| `swipe_mouse` | boolean | `false` | Change tabs by mouse drag (desktop). |
| `unmount_hidden` | boolean | `false` | Keep only the active tab's card mounted. See [Performance](Feature-Performance). |
| `unload_after` | number (minutes) | — | Free a tab's card when it hasn't been opened for this long; it's rebuilt when opened again. See [Performance](Feature-Performance#unload_after). |
| `header_cards` / `footer_cards` | list of card configs | — | Cards shown above the bar / below the content on every tab. See [Content layout](Feature-Content-Layout#header-and-footer-cards-header_cards-footer_cards). |
| `content_height` | `auto` \| `tallest` \| length | `auto` | Keep the tallest tab's height, or a fixed height that scrolls inside. See [Content layout](Feature-Content-Layout#content-height-content_height-content_max_height). |
| `content_max_height` | length | — | Content taller than this scrolls inside the card. |
| `fullscreen` | boolean | `false` | Full-screen button in the bar: opens the active tab over the whole window. See [Content layout](Feature-Content-Layout#full-screen-fullscreen). |
| `swipe_peek` | boolean | `false` | While swiping, the content follows the finger and the next tab slides in. See [Content layout](Feature-Content-Layout#swipe-peek-swipe_peek). |
| `header` | boolean | `false` | Show the active tab's title above the content. See [Content header](Feature-Header). |
| `aria_label` | string | `Tabs` | Accessible name for the tab bar (screen readers). |
| `remember` | `none` \| `browser` \| `url` \| `entity` | `none` | How the selected tab is remembered. See [Navigation & Persistence](Navigation-and-Persistence). |
| `lazy` | boolean | `false` | When `true`, a tab's card is only built the first time it becomes visible. |
| `animated` | boolean | `true` | Animate the selection indicator as it moves between tabs. |
| `swipe` | boolean | `false` | Allow left/right swipe gestures to change tabs (mobile). |
| `auto_rotate` | number \| `{interval, resume_after}` | — | Cycle tabs every N seconds; pauses after interaction. See [Auto-rotate & idle return](Feature-Kiosk). |
| `idle_return` | number (seconds) | — | Return to the default tab after inactivity. See [Auto-rotate & idle return](Feature-Kiosk). |
| `alert_first` | boolean | `false` | Alerting tabs move to the front. See [Alert pulse](Feature-Alert#alerting-tabs-first-alert_first). |
| `alert_snooze` | number (minutes) | — | Long-press an alerting tab to silence its pulse. See [Alert pulse](Feature-Alert#snooze-alert_snooze). |
| `default_by_time` / `default_by_device` | map | — | Starting tab by time of day / by browser. See [Remote control & events](Feature-Remote-Control#default-tab-by-time-of-day-default_by_time). |
| `remote_entity` | entity id | — | Switch to the tab named by this entity's state when it changes. See [Remote control & events](Feature-Remote-Control). |
| `remote_event` / `fire_event` / `event_id` | boolean / boolean / string | `false` / `false` / — | Switch on `tabdeck_select` events; fire `tabdeck_tab_changed` (admin users). See [Remote control & events](Feature-Remote-Control#events-remote_event-fire_event). |
| `edit_mode_reveal` | boolean | `true` | Show hidden tabs (faded) and pause rotation while editing the dashboard. See [Edit mode helpers](Feature-Edit-Mode). |
| `dock` | boolean | `false` | Pin the bar to the bottom of the screen as phone-style navigation. See [Dock](Feature-Dock). |
| `content_arrows` | boolean | `false` | ‹ › buttons beside the content to step between tabs. See [Dots & arrows](Feature-Dots-Arrows). |
| `hide_bar` | boolean | `false` | Render only the content, no tab bar. See [Grouped tabs](Feature-Grouped-Tabs#related-hide_bar-and-the-public-api). |
| `search` | boolean | `false` | 🔍 quick-switch filter over the tabs. See [Search & shortcuts](Feature-Search-Hotkeys). |
| `hotkeys` | boolean | `false` | Keyboard shortcuts: 1–9, [ ], /. See [Search & shortcuts](Feature-Search-Hotkeys#keyboard-shortcuts). |
| `history` | boolean | `false` | Back button returns to the previous tab. See [Back button](Navigation-and-Persistence#back-button-history). |
| `customize` | boolean | `false` | Each person can reorder/hide tabs, saved per browser. See [Arrange tabs](Feature-Customize). |
| `rail_expand` | boolean | `false` | Left/right bars: icons until hovered or focused, then labels, over the content. See [Expanding side rail](Feature-Bar-Styles#expanding-side-rail-rail_expand). |
| `styles` | map | — | CSS variables/properties applied to the card. See [Theming](Feature-Theming). |

> **Legacy:** `options.defaultTabIndex` is still accepted as a fallback for `default_tab`.

## Per-tab options

Each item in `tabs`:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `card` | card config | **required**\* | Any Lovelace card configuration. (\*Not needed for a `tap_action` tab.) |
| `cards` | list of card configs | — | Multiple cards, auto-stacked. See [Multiple cards per tab](Feature-Multiple-Cards). \*Either `card` or `cards`. |
| `layout` / `columns` / `min_column_width` | `masonry` / number / px | — / `2` / — | Balance `cards` into columns like HA's masonry view. See [Content layout](Feature-Content-Layout#masonry-inside-a-tab-layout-masonry). |
| `layout: sections` / `sections` / `max_columns` | list / number | — / `4` | Titled groups of cards like HA's sections view (`title`, `icon`, `badges`, `column_span`, `cards`). See [Content layout](Feature-Content-Layout#sections-inside-a-tab-layout-sections). |
| `background` | string | — | Content background while the tab is open: colour, gradient or image path / URL (may be a template). See [Content layout](Feature-Content-Layout#tab-background-background). |
| `name` | string | — | Tab label. Falls back to `Tab N` when omitted. |
| `subtitle` | string | — | Secondary text under the label. See [Tab subtitles](Feature-Subtitle). |
| `icon` | string (mdi) | — | Tab icon, e.g. `mdi:lightbulb`. |
| `accent` | string (CSS colour) | — | Accent colour for the tab (indicator + selected state). |
| `color` | string (CSS colour) | — | Fixed label/icon colour for the tab. See [Per-tab colour](Feature-Tab-Color). |
| `badge` | string | — | An entity id (shows its state) or a Jinja template. See [Badges](Badges). |
| `badge_format` | `{precision, unit, max}` | — | Numeric badge formatting (overrides the top-level default). See [Badges](Badges#numeric-formatting-badge_format). |
| `badge` (count form) | `{count, state, area}` | — | Count matching entities without Jinja. See [Badges](Badges#count-badge-no-jinja). |
| `badge_icon` | icon | — | An icon as the badge. See [Badges](Badges#badge-icon-badge_icon). |
| `ring` / `ring_max` / `ring_color` | entity / template / number, number, colour | — / `100` / — | Progress ring around the icon. See [Badges](Badges#progress-ring-ring). |
| `area` / `floor` / `label` / `domains` | id / list | — | No card needed: tiles of the entities there. See [Dynamic tabs](Feature-Dynamic-Tabs#area-floor-and-label-tabs-without-a-card-auto-content). |
| `pin` / `pin_timeout` | string / minutes | — | Ask for a code before the tab opens (not security). See [PIN-locked tabs](Feature-PIN). |
| `disabled` | boolean | `false` | Show the tab greyed-out and non-selectable. See [Disabled tabs](Feature-Disabled-Tabs). |
| `fab` | boolean | `false` | Render the tab as a raised round action button. See [Floating action tabs](Feature-Dock#floating-action-tabs). |
| `children` / `children_display` / `children_options` | list / string / object | — / `row` / — | Sub-tabs as a second row or a ▾ menu. See [Grouped tabs](Feature-Grouped-Tabs). |
| `card_size` | number | — | `getCardSize()` hint (rows) for this tab, so masonry sizing is stable across tab switches. |
| `tap_action` | action | — | Tap runs this action *instead of* opening the tab (navigation tabs; no `card` needed). See [Navigation & action tabs](Feature-Navigation-Tabs). |
| `enter_action` / `leave_action` | action | — | HA action when the tab becomes / stops being active. See [Tab-change actions](Feature-Enter-Leave-Actions). |
| `hold_action` / `badge_action` | action | — | HA action on tab long-press / badge click. See [Tab & badge actions](Feature-Hold-Action). |
| `visibility` | list of conditions | — | Conditions for showing the tab (supports and/or/not). See [Tab Visibility](Tab-Visibility). |
| `styles` | map | — | CSS properties applied to the card while this tab is active (over the top-level `styles`). See [Theming](Feature-Theming#per-tab-styles). |
| `alert` | list of conditions | — | While all are met, the tab pulses in the alert colour. See [Alert pulse](Feature-Alert). |

> `name`, `subtitle`, `icon`, `accent`, `color` and `background` also accept a **Jinja template** that renders live. See [State-driven icons, names & colours](Feature-Templated-Fields).

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
