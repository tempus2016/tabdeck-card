# Tab-change actions (`enter_action` / `leave_action`)

Run a Home Assistant action whenever a tab **becomes active** (`enter_action`) or **stops being active** (`leave_action`). For example, open the Cameras tab to wake the cameras and leave it to put them back to sleep, or turn on a light when a room's tab is opened.

**Per-tab keys:** `enter_action`, `leave_action` (standard HA action objects)

```yaml
type: custom:tabdeck-card
tabs:
  - name: Home
    card: { ... }
  - name: Cameras
    icon: mdi:cctv
    enter_action:
      action: perform-action
      perform_action: script.turn_on
      target: { entity_id: script.cameras_wake }
    leave_action:
      action: perform-action
      perform_action: script.turn_on
      target: { entity_id: script.cameras_sleep }
    card: { ... }
```

## When they fire

- On **every change** of the active tab, from any source: tap, keyboard, swipe, [`auto_select`](Feature-Auto-Select), [`auto_rotate`](Feature-Kiosk), [`idle_return`](Feature-Kiosk), live [`remember: entity`](Navigation-and-Persistence#cross-device-with-remember-entity) sync, or [scroll-spy](Feature-Scroll-Spy) tracking.
- The old tab's `leave_action` runs first, then the new tab's `enter_action`.
- **Not** on initial load, and not when the already-active tab is tapped again.
- Each open copy of the dashboard runs its own actions. If a wall panel and a phone both show the deck, both fire, so make the actions safe to repeat (turning something *on* is safer than *toggling* it).

## Supported actions

`perform-action` (what the editor's action picker writes), the legacy `call-service`, `navigate`, `url`, `more-info`, `toggle`, `fire-dom-event`. `action: none` counts as no action.

> `perform-action` also works for [`tap_action`](Feature-Navigation-Tabs), [`hold_action` and `badge_action`](Feature-Hold-Action). Before this release those silently ignored `perform-action`.

Both are available in the visual editor as **Action when this tab is opened** / **Action when leaving this tab**.
