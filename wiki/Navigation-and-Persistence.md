# Navigation & Persistence

## Selecting tabs

- **Click / tap** a tab.
- **Keyboard** (when the bar is focused): <kbd>←</kbd>/<kbd>→</kbd> (or <kbd>↑</kbd>/<kbd>↓</kbd> for left/right bars) move between tabs and wrap around; <kbd>Home</kbd>/<kbd>End</kbd> jump to first/last.
- **Swipe** (optional): set `swipe: true` to change tabs with a left/right swipe on touch devices.

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

### `storage_key` (browser mode)

By default `browser` mode keys storage by dashboard path + tab names. Set `storage_key: my-deck` to give a deck its own slot — useful when two identical decks would otherwise share state.

```yaml
type: custom:tabdeck-card
remember: url
default_tab: Climate
tabs: [ ... ]
```

### Notes

- With `remember: url`, give your tabs **unique names** so the hash maps unambiguously.
- `default_tab` still applies as the fallback when no remembered value is found.
- Lazy-mounted tabs (`lazy: true`) keep state once built; switching away does not destroy them.
