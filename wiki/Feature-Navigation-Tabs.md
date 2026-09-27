# Navigation & action tabs (`tap_action`)

Give a tab a **`tap_action`** and tapping it **runs that action instead of opening a panel**. This turns the tab bar into a navigation strip: some tabs show content, others jump to another dashboard, open a URL, toggle something, or show a more-info dialog.

**Per-tab key:** `tap_action` (standard HA action object). A tab with a `tap_action` doesn't need a `card`.

```yaml
type: custom:tabdeck-card
tabs:
  - name: Rooms
    icon: mdi:sofa
    card: { ... }                    # a normal content tab
  - name: Energy
    icon: mdi:lightning-bolt
    tap_action:
      action: navigate
      navigation_path: /energy       # jumps to the Energy dashboard
  - name: Docs
    icon: mdi:book-open-variant
    tap_action:
      action: url
      url_path: https://www.home-assistant.io
  - name: Alarm
    icon: mdi:shield-home
    tap_action:
      action: more-info
      entity: alarm_control_panel.home
```

Supported actions: `navigate`, `url`, `more-info`, `toggle`, `call-service`, `fire-dom-event`. (`action: none` is treated as no `tap_action`.)

## Behaviour

- The current selection doesn't change when an action tab is tapped.
- Action tabs are **skipped** by arrow keys, Home/End, swipe and [`auto_rotate`](Feature-Kiosk), so you can never land on one by accident. The card also never *starts* on one: if `default_tab` points at an action tab, the first content tab is used instead.
- Action tabs are always keyboard-focusable. <kbd>Enter</kbd> or <kbd>Space</kbd> activates them.
- If an action tab also has a `card`, the card is built but can't be reached through the bar. Leave `card` out.
- In the visual editor, set it with the **Tap action** picker on the tab.

## Site-wide nav strip recipe

Put the same deck at the top of each view with `sticky: true`, `style: segmented`, and one `navigate` tab per view. Use a content tab with the view's own cards for the current page.
