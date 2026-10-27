# Debug panel (`debug`)

When a tab doesn't show up, a badge looks wrong, or the deck opens on an unexpected tab, turn on **`debug: true`**. A panel under the card then shows what the card is working with:

```yaml
type: custom:tabdeck-card
debug: true
tabs: [ ... ]
```

- **Facts:** the selected tab, **why the deck started there** (`remembered`, `default_if of …`, `default_by_device`, `default_by_time` or `default_tab`), the deck id used for storage and events, this browser's device name, and how long the last build and render took.
- **One row per tab:** visible or hidden, each visibility condition with ✓ / ✗ against the current state, the alert (on / off), the badge and ring values, `locked` for PIN tabs, and `card not built` for tabs freed by `unload_after`.
- **Templates:** every Jinja template the card is subscribed to, with its latest result.

The panel is in English, updates live, and is meant for setting up a dashboard: turn it off again afterwards. It's also in the visual editor (**Debug panel**). For condition checks while editing, the editor's [Why is this tab hidden?](Feature-Condition-Check) view goes into more detail.
