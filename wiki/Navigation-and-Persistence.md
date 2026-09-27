# Navigation & Persistence

## Selecting tabs

- **Click / tap** a tab.
- **Keyboard** (when the bar is focused): <kbd>←</kbd>/<kbd>→</kbd> (or <kbd>↑</kbd>/<kbd>↓</kbd> for left/right bars) move between tabs and wrap around; <kbd>Home</kbd>/<kbd>End</kbd> jump to first/last.
- **Swipe** (optional): set `swipe: true` to change tabs with a left/right swipe on touch devices, or `swipe_mouse: true` to do the same with a left/right **mouse drag** on desktop. Both honour [`swipe_wrap`](Feature-Performance).

## Remembering the selected tab

The `remember` option controls what happens when you leave and return:

| Mode | Behaviour |
| --- | --- |
| `none` (default) | Always start on `default_tab`. |
| `browser` | The selected tab is saved in `localStorage`, per dashboard + tab set, on that browser. |
| `url` | The selected tab is written to the URL hash (`#tab=<name>`), so links and reloads keep it and it can be deep-linked/shared. |
| `entity` | The selected **index** is stored in a Home Assistant helper entity, so the active tab syncs across **all devices**. Set `remember_entity` to an `input_number` or `input_text`. |

### Cross-device with `remember: entity`

```yaml
type: custom:tabdeck-card
remember: entity
remember_entity: input_number.kitchen_deck_tab
tabs: [ ... ]
```

On load the tab is restored from the entity's value; on every switch the card writes the new index back (`input_number.set_value` / `input_text.set_value`). Because it's a real entity, the choice follows you to every dashboard and device.

**Live two-way sync.** The card also *watches* the entity. When anything else changes it (another device, an automation, a Node-RED flow, a voice command), every open card switches to that tab straight away, with no reload. That makes the helper a remote control for your wall panels:

```yaml
# automation: show the Cameras tab (index 2) when the doorbell rings
triggers:
  - trigger: state
    entity_id: binary_sensor.doorbell
    to: "on"
actions:
  - action: input_number.set_value
    target: { entity_id: input_number.kitchen_deck_tab }
    data: { value: 2 }
```

- Only a real change of the entity's value switches tabs, so a routine state update never pulls you off the tab you picked.
- Out-of-range values (e.g. `9` on a 3-tab deck) are ignored.
- Echoes of the card's own recent writes are ignored, so tapping quickly through several tabs never bounces back.

### `storage_key` (browser mode)

By default `browser` mode keys storage by dashboard path + tab names. Set `storage_key: my-deck` to give a deck its own slot — useful when two identical decks would otherwise share state.

```yaml
type: custom:tabdeck-card
remember: url
default_tab: Climate
tabs: [ ... ]
```

### Deep links (`#tab=`)

With `remember: url` (or any mode, on first load), a `#tab=` hash selects a tab. It can be:

- the tab's **index**: `#tab=2`
- the tab's **name**: `#tab=Living%20Room`
- a **case-insensitive slug** of the name: `#tab=living-room`, `#tab=LIGHTS`

An exact name match wins over a slug match.

### Notes

- With `remember: url`, give your tabs **unique names** so the hash maps unambiguously.
- `default_tab` still applies as the fallback when no remembered value is found.
- Lazy-mounted tabs (`lazy: true`) keep state once built; switching away does not destroy them.
