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
