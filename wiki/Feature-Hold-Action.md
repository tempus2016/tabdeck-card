# Long-press tab action

Give a tab a **`hold_action`** to run a Home Assistant action when the tab is long-pressed (~0.5 s). A normal tap still just selects the tab.

**Per-tab key:** `hold_action` (standard HA action object)

```yaml
type: custom:tabdeck-card
tabs:
  - name: Sun
    icon: mdi:weather-sunny
    hold_action:
      action: more-info
      entity: sun.sun
    card: { ... }
  - name: Scenes
    icon: mdi:palette
    hold_action:
      action: navigate
      navigation_path: /lovelace/scenes
    card: { ... }
```

## Supported actions

All the usual HA actions: `more-info`, `navigate`, `url`, `toggle`, `call-service`, `fire-dom-event`, `none`.

## Behaviour

- **Tap** = select the tab (unchanged). **Long-press** = run `hold_action`.
- A long-press suppresses the follow-up select, so holding doesn't also switch tabs.
- For `more-info`/`toggle`, set the action's `entity`.
- Configurable in the visual editor via the native action picker (**Long-press action**).
