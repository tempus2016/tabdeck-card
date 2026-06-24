# Sticky tab bar

Keep the tab bar pinned in view while the active tab's card scrolls.

**Config key:** `sticky` (top-level boolean) · **Default:** `false`

```yaml
type: custom:tabdeck-card
sticky: true
tabs:
  - name: Long list
    card:
      type: entities
      entities: [ ...many entities... ]
  - name: Other
    card: { ... }
```

## Behaviour

- When `sticky: true`, the bar uses `position: sticky` and pins to the **inner edge**: the top for `top`/`left`/`right` bars, the bottom for a `bottom` bar.
- It paints a card background while pinned so scrolling content doesn't show through, and sits above the content (`z-index`).
- Stickiness is relative to the nearest scrolling ancestor (your dashboard view), so it shines on tabs with tall content.
- Toggle it with the **Sticky tab bar** switch in the [visual editor](Editor).
