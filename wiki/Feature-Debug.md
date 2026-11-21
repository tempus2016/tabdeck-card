# Debug panel (`debug`)

When a tab doesn't show up, a badge looks wrong, or the deck opens on an unexpected tab, turn on **`debug: true`**. A panel under the card then shows what the card is working with:

```yaml
type: custom:tabdeck-card
debug: true
tabs: [ ... ]
```

- **Facts:** the selected tab, **why the deck started there** (`remembered`, `default_if of …`, `default_by_device`, `default_by_time` or `default_tab`), the deck id used for storage and events, this browser's device name, and how long the last build and render took.
- **One row per tab:** visible or hidden, each visibility condition with ✓ / ✗ against the current state, the alert (on / off), the badge and ring values, `locked` for PIN tabs, `card not built` for tabs freed by `unload_after`, and two timings: `card … ms` (creating the tab's card) and `drawn … ms` (from opening the tab until its card finished rendering and the browser painted; measured each time the tab opens).
- **Skipped switches:** when an automatic switch (`remote_entity`, `remote_event`, the companion, `takeover`, `follow_room`, `auto_select`, a linked deck, `idle_return`) doesn't open a [PIN-locked tab](Feature-PIN), the browser console logs `tabdeck-card: <source> didn't open "<tab>": it has a PIN and isn't unlocked`.
- **Templates:** every Jinja template the card is subscribed to, with its latest result.

The panel is in English, updates live, and is meant for setting up a dashboard: turn it off again afterwards. It's also in the visual editor (**Debug panel**: off, panel, or panel + draw times). For condition checks while editing, the editor's [Why is this tab hidden?](Feature-Condition-Check) view goes into more detail.

## Speed overlay (`debug: speed`)

To find the tab that makes a dashboard feel slow, use **`debug: speed`**. Besides the panel, each tab that has been opened gets a small chip on the bar with its last draw time: green under 100 ms, amber under 300 ms, red above.

```yaml
type: custom:tabdeck-card
debug: speed
tabs: [ ... ]
```

The time runs from the tap (or the deck's first build) until the tab's card has finished rendering and the browser has painted the next frame. Cards that load more after their first render (camera streams, iframes, some custom cards) can keep working after that. Open each tab once to fill in its chip. Slow tabs often get faster with [`lazy` and `preload`](Feature-Performance#lazy-and-preload).
