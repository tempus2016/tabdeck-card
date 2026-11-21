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

## Clickable badge: `badge_action`

Give the tab's [badge](Badges) its own action — tapping the badge runs it **without** selecting the tab.

```yaml
tabs:
  - name: Inbox
    icon: mdi:email
    badge: sensor.unread
    badge_action:
      action: navigate
      navigation_path: /lovelace/inbox
    card: { ... }
```

The badge shows a pointer cursor when it has an action. Configured via the **Badge tap action** picker in the editor.

> To make a tab's **tap** run an action (e.g. navigate) instead of opening it, see [Navigation & action tabs](Feature-Navigation-Tabs).

## Double tap (`double_tap_action`)

A third gesture on a tab. A single tap still opens the tab, and a double tap runs the action.

```yaml
tabs:
  - name: Lights
    icon: mdi:lightbulb-group
    double_tap_action:
      action: perform-action
      perform_action: light.turn_off
      target: { area_id: living_room }
    card: { ... }
```

- On a tab with a double-tap action, a single tap waits a quarter of a second for a second tap before it opens the tab. Tabs without one open at once.
- A double tap doesn't open the tab.
- In the visual editor, it's the **Double-tap action** picker on each tab.

## Preview a tab by holding it (`hold_peek`)

With `hold_peek: true`, holding a tab shows its content in a floating preview over the open tab. Let go and the preview closes, and you stay on the tab you were on.

```yaml
type: custom:tabdeck-card
hold_peek: true
tabs: [ ... ]
```

- A useful glance on a wall panel or phone: check the cameras or the heating without leaving the tab you're on.
- The preview is only for looking. Taps go through to nothing until you let go.
- A tab with its own `hold_action` runs that action instead.
- A PIN-locked tab isn't previewed, so the lock can't be bypassed: holding it asks for the code instead. Hold it again after the code to preview it.
- It's off with `scroll_spy`, where every tab is already on the page.
- In the visual editor, it's the **Hold a tab to preview it** switch.

## Compare two tabs side by side (`compare`)

With `compare: true`, holding a tab shows it **beside** the open tab instead of switching to it, so you can watch the cameras while you work the lights, or check two rooms' heating at once.

```yaml
type: custom:tabdeck-card
compare: true
tabs: [ ... ]
```

- The open tab stays on the left with its name in a coloured label; the compared tab is on the right with an **×** to close it. On a narrow card (under about 420 px, such as a phone) the two stack instead.
- Both tabs are live: you can use the cards in either.
- The compared tab stays while you switch the main one. Opening the compared tab itself, tapping **×**, pressing **Esc** or holding the compared tab again ends the comparison.
- A tab with its own `hold_action` runs that action instead, and `compare` takes the hold over `hold_peek`.
- Disabled and action tabs can't be compared. Holding a PIN-locked tab asks for its code; hold it again afterwards to compare it. When the unlock runs out (`pin_timeout`), the compared tab closes. It's off with `scroll_spy`, `wizard` and a wide `split` layout, which already show tabs their own way.
- Automations or other cards can call `compareTab("Cameras")` and `closeCompare()` on the deck.
- CSS variables: `--tabdeck-compare-min` (the narrowest a column may get before they stack, default `200px`) and `--tabdeck-compare-gap` (`12px`).
- In the visual editor, it's the **Compare mode** switch.

## Supported actions

All the usual HA actions: `perform-action`, `more-info`, `navigate`, `url`, `toggle`, `call-service`, `fire-dom-event`, `none`.

## Behaviour

- **Tap** = select the tab (unchanged). **Long-press** = run `hold_action`. **Double tap** = run `double_tap_action`.
- A long-press suppresses the follow-up select, so holding doesn't also switch tabs.
- For `more-info`/`toggle`, set the action's `entity`.
- Configurable in the visual editor via the native action picker (**Long-press action**).
