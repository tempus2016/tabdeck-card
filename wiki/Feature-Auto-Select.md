# Auto-select a tab

Automatically switch to a tab when something happens — e.g. jump to the **Cameras** tab when the doorbell rings, or to **Alarm** when it's triggered.

**Per-tab key:** `auto_select` — an entity id, or `{ entity, state }`

```yaml
type: custom:tabdeck-card
tabs:
  - name: Home
    card: { ... }
  - name: Cameras
    icon: mdi:cctv
    auto_select: binary_sensor.doorbell      # switch here when it becomes active
    card: { ... }
  - name: Alarm
    icon: mdi:shield-alert
    auto_select:
      entity: alarm_control_panel.home
      state: triggered                        # switch here on this exact state
    card: { ... }
```

## Behaviour

- **Edge-triggered:** the switch happens only when the entity *enters* the target state (a fresh transition). You can navigate away afterwards and it won't yank you back until the next transition.
- **No jump on load:** the first state read only seeds the baseline, so opening the dashboard never force-switches.
- **String form** (`auto_select: <entity>`) fires when the entity becomes *active* — anything except `off`/`0`/`false`/`unavailable`/… (same rule as [dot badges](Feature-Badge-Display)).
- **Object form** (`{ entity, state }`) fires on an exact state match.
- If the target tab is currently hidden by [visibility](Tab-Visibility), the switch is skipped.

> `auto_select` is configured in YAML (not the visual editor).
