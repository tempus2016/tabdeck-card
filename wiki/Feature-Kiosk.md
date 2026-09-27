# Wall-panel options: auto-rotate & idle return

Two options for wall tablets and kiosk dashboards. **`auto_rotate`** cycles through the tabs on a timer, and **`idle_return`** snaps back to the default tab after a period of inactivity.

## `auto_rotate`

```yaml
type: custom:tabdeck-card
auto_rotate: 15          # advance every 15 s
tabs: [ ... ]
```

or with an explicit pause:

```yaml
auto_rotate:
  interval: 15           # seconds between advances (minimum 2)
  resume_after: 60       # after a touch, hold for 60 s before rotating again (default 60)
```

- Visits every **visible, enabled** tab in order and wraps around. Disabled tabs are skipped.
- **Any touch, click, key press or scroll** on the card pauses rotation for `resume_after` seconds, so someone using the panel isn't moved on mid-read.
- Rotated selections are **not remembered**: they never overwrite `remember: browser/url/entity`, so they won't flood an `input_number` with writes or move other devices along.

## `idle_return`

```yaml
type: custom:tabdeck-card
default_tab: Home
idle_return: 120         # back to Home after 2 min without interaction (minimum 5)
tabs: [ ... ]
```

- After `idle_return` seconds with no touch, click, key press or scroll on the card, it returns to the **default tab**. That's the first tab whose [`default_if`](Feature-Conditional-Default) matches, otherwise `default_tab`.
- The return isn't remembered either, so the user's last explicit choice is still what `remember` restores.
- Ignored when `auto_rotate` is set (rotation already brings the panel back to life).

## Editor

Both are in the visual editor as **Auto-rotate tabs every (seconds)** and **Return to default tab after idle (seconds)**, where `0` means off. A `resume_after` set in YAML is kept when you change the interval in the editor.
