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
- A top-pinned bar sits **just below Home Assistant's app header** (HA's `--header-height`, 56 px), so the header doesn't cover it. On a kiosk dashboard with the header hidden, set `styles: { --tabdeck-sticky-top: 0px }`. You can also use the same variable to leave room for anything else pinned above the card.
- Toggle it with the **Sticky tab bar** switch in the [visual editor](Editor).

## Hide while scrolling down (`bar_autohide`)

A pinned bar takes space on a phone. With `bar_autohide: true` it slides out of view while you scroll down the page and comes back as soon as you scroll up, or when you get back near the top.

```yaml
type: custom:tabdeck-card
sticky: true
bar_autohide: true
tabs: [ ... ]
```

- It works on any bar that stays on screen: `sticky`, `dock` and `scroll_spy`. A bar that isn't pinned scrolls away with the page anyway, so the option does nothing there.
- A top bar slides up behind HA's header, and a bottom bar or the dock slides down off the screen.
- It needs about 24 px of scrolling in one direction before it moves, so small jitters don't flicker it.
- The bar stays put while its search, customize or group menu is open, and while the dashboard is being edited.
- With "reduce motion" turned on in the system settings, it disappears and reappears without sliding.
- Toggle it with the **Hide the pinned bar while scrolling down** switch in the [visual editor](Editor).
