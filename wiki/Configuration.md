# Configuration

All options live on the top-level card config (`type: custom:tabdeck-card`) except per-tab options, which live on each entry of `tabs`.

## Top-level options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | list | **required**\* | The tabs to show. See [Per-tab options](#per-tab-options). \*Optional when `auto_tabs` is set. |
| `auto_tabs` | map | — | Generate a tab per item from a Jinja list (`template` + optional `tab_template`). See [Dynamic tabs](Feature-Dynamic-Tabs). |
| `default_tab` | number \| string | `0` | Tab shown first. A number is a 0-based index; a string matches a tab `name`. |
| `position` | `top` \| `bottom` \| `left` \| `right` | `top` | Where the tab bar sits relative to the content. |
| `style` | `underline` \| `pill` \| `segmented` \| `boxed` \| `text` | `underline` | Visual style of the tab bar. See [Extra bar styles](Feature-Bar-Styles). |
| `tab_display` | `both` \| `icon` \| `label` | `both` | Show icons, labels, or both. See [Tab display mode](Feature-Tab-Display). |
| `align` | `start` \| `center` \| `end` \| `justify` | `start` | How tabs are distributed along the bar. See [Tab alignment](Feature-Tab-Alignment). |
| `badge_display` | `text` \| `dot` | `text` | Render badges as text or a dot. See [Badge display mode](Feature-Badge-Display). |
| `badge_format` | `{precision, unit, max}` | — | Default numeric badge formatting for every tab. See [Badges](Badges#numeric-formatting-badge_format). |
| `transition` | `none` \| `fade` \| `slide` | `none` | Animate content on tab switch. See [Panel transitions](Feature-Panel-Transition). |
| `indicator_size` | number (1–16) | `3` | Underline indicator thickness in px. See [Indicator thickness](Feature-Indicator-Size). |
| `accent_indicator` | boolean | `true` | Colour the indicator by the selected tab's `accent`. See [Accent indicator](Feature-Accent-Indicator). |
| `scrollable` | `auto` \| `true` \| `false` | `auto` | Whether the bar scrolls horizontally when tabs overflow. `auto` scrolls only when needed. |
| `sticky` | boolean | `false` | Pin the bar while content scrolls. See [Sticky tab bar](Feature-Sticky-Bar). |
| `collapsible` / `start_collapsed` | boolean | `false` | Tap the active tab to fold the content away / start folded. See [Collapsible deck](Feature-Collapsible). |
| `scroll_spy` | boolean | `false` | Stack all tabs as sections; the bar scrolls to and tracks them. See [Scroll-spy](Feature-Scroll-Spy). |
| `scroll_buttons` / `overflow_menu` | boolean | `false` | Scroll arrows / ⋯ jump-menu when the bar overflows. See [Scroll buttons](Feature-Scroll-Buttons). |
| `swipe_mouse` | boolean | `false` | Change tabs by mouse drag (desktop). |
| `unmount_hidden` | boolean | `false` | Keep only the active tab's card mounted. See [Performance](Feature-Performance). |
| `header` | boolean | `false` | Show the active tab's title above the content. See [Content header](Feature-Header). |
| `transition` | `none` \| `fade` \| `slide` | `none` | Panel switch animation. See [Panel transitions](Feature-Panel-Transition). |
| `aria_label` | string | `Tabs` | Accessible name for the tab bar (screen readers). |
| `remember` | `none` \| `browser` \| `url` \| `entity` | `none` | How the selected tab is remembered. See [Navigation & Persistence](Navigation-and-Persistence). |
| `lazy` | boolean | `false` | When `true`, a tab's card is only built the first time it becomes visible. |
| `animated` | boolean | `true` | Animate the selection indicator as it moves between tabs. |
| `swipe` | boolean | `false` | Allow left/right swipe gestures to change tabs (mobile). |
| `auto_rotate` | number \| `{interval, resume_after}` | — | Cycle tabs every N seconds; pauses after interaction. See [Auto-rotate & idle return](Feature-Kiosk). |
| `idle_return` | number (seconds) | — | Return to the default tab after inactivity. See [Auto-rotate & idle return](Feature-Kiosk). |
| `styles` | map | — | CSS variables/properties applied to the card. See [Theming](Feature-Theming). |

> **Legacy:** `options.defaultTabIndex` is still accepted as a fallback for `default_tab`.

## Per-tab options

Each item in `tabs`:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `card` | card config | **required**\* | Any Lovelace card configuration. (\*Not needed for a `tap_action` tab.) |
| `cards` | list of card configs | — | Multiple cards, auto-stacked. See [Multiple cards per tab](Feature-Multiple-Cards). \*Either `card` or `cards`. |
| `name` | string | — | Tab label. Falls back to `Tab N` when omitted. |
| `subtitle` | string | — | Secondary text under the label. See [Tab subtitles](Feature-Subtitle). |
| `icon` | string (mdi) | — | Tab icon, e.g. `mdi:lightbulb`. |
| `accent` | string (CSS colour) | — | Accent colour for the tab (indicator + selected state). |
| `color` | string (CSS colour) | — | Fixed label/icon colour for the tab. See [Per-tab colour](Feature-Tab-Color). |
| `badge` | string | — | An entity id (shows its state) or a Jinja template. See [Badges](Badges). |
| `badge_format` | `{precision, unit, max}` | — | Numeric badge formatting (overrides the top-level default). See [Badges](Badges#numeric-formatting-badge_format). |
| `disabled` | boolean | `false` | Show the tab greyed-out and non-selectable. See [Disabled tabs](Feature-Disabled-Tabs). |
| `card_size` | number | — | `getCardSize()` hint (rows) for this tab, so masonry sizing is stable across tab switches. |
| `tap_action` | action | — | Tap runs this action *instead of* opening the tab (navigation tabs; no `card` needed). See [Navigation & action tabs](Feature-Navigation-Tabs). |
| `enter_action` / `leave_action` | action | — | HA action when the tab becomes / stops being active. See [Tab-change actions](Feature-Enter-Leave-Actions). |
| `hold_action` / `badge_action` | action | — | HA action on tab long-press / badge click. See [Tab & badge actions](Feature-Hold-Action). |
| `visibility` | list of conditions | — | Conditions for showing the tab (supports and/or/not). See [Tab Visibility](Tab-Visibility). |
| `alert` | list of conditions | — | While all are met, the tab pulses in the alert colour. See [Alert pulse](Feature-Alert). |

> `name`, `subtitle`, `icon`, `accent` and `color` also accept a **Jinja template** that renders live. See [State-driven icons, names & colours](Feature-Templated-Fields).

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
