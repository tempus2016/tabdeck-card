# Panel transitions

Animate the content when you switch tabs — a subtle fade or slide makes the card feel more polished.

**Config key:** `transition` (top-level) · **Values:** `none` (default) · `fade` · `slide`

```yaml
type: custom:tabdeck-card
transition: slide      # none | fade | slide
tabs: [ ... ]
```

## Behaviour

| Value | Effect on tab switch |
| --- | --- |
| `none` | No animation (default). |
| `fade` | The new panel fades in (opacity 0 → 1). |
| `slide` | The new panel slides in from the right while fading. |

- The animation runs for ~180 ms via the Web Animations API, replaying on every switch.
- It is automatically **skipped** when the user has *Reduce motion* enabled (`prefers-reduced-motion`).
- No effect on the very first render — only when changing tabs.
- Pick it from the **Panel transition** dropdown in the [visual editor](Editor).
