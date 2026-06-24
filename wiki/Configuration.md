# Configuration

All options live on the top-level card config (`type: custom:tabdeck-card`) except per-tab options, which live on each entry of `tabs`.

## Top-level options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | list | **required** | The tabs to show (at least one). See [Per-tab options](#per-tab-options). |
| `default_tab` | number \| string | `0` | Tab shown first. A number is a 0-based index; a string matches a tab `name`. |
| `position` | `top` \| `bottom` \| `left` \| `right` | `top` | Where the tab bar sits relative to the content. |
| `style` | `underline` \| `pill` \| `segmented` | `underline` | Visual style of the tab bar. |
| `scrollable` | `auto` \| `true` \| `false` | `auto` | Whether the bar scrolls horizontally when tabs overflow. `auto` scrolls only when needed. |
| `remember` | `none` \| `browser` \| `url` | `none` | How the selected tab is remembered. See [Navigation & Persistence](Navigation-and-Persistence). |
| `lazy` | boolean | `false` | When `true`, a tab's card is only built the first time it becomes visible. |
| `animated` | boolean | `true` | Animate the selection indicator as it moves between tabs. |
| `swipe` | boolean | `false` | Allow left/right swipe gestures to change tabs (mobile). |

> **Legacy:** `options.defaultTabIndex` is still accepted as a fallback for `default_tab`.

## Per-tab options

Each item in `tabs`:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `card` | card config | **required** | Any Lovelace card configuration. |
| `name` | string | — | Tab label. Falls back to `Tab N` when omitted. |
| `icon` | string (mdi) | — | Tab icon, e.g. `mdi:lightbulb`. |
| `accent` | string (CSS colour) | — | Accent colour associated with the tab. |
| `badge` | string | — | An entity id (shows its state) or a Jinja template. See [Badges](Badges). |
| `visibility` | list of conditions | — | Conditions that must **all** pass for the tab to show. See [Tab Visibility](Tab-Visibility). |

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
