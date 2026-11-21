# Tab subtitles

Add a small line of secondary text under a tab's label — handy for a status, count, or hint.

**Per-tab key:** `subtitle` (string)

```yaml
type: custom:tabdeck-card
styles:
  --tabdeck-tab-height: 60px     # give the taller tabs a little room
tabs:
  - name: Climate
    subtitle: 3 zones
    icon: mdi:thermostat
    card: { ... }
  - name: Lights
    subtitle: 8 on
    icon: mdi:lightbulb-group
    card: { ... }
  - name: Energy
    subtitle: 1.2 kW
    icon: mdi:flash
    card: { ... }
```

![Tab subtitles](images/feature-subtitle.png)

## Notes

- The subtitle sits under the label in a muted, slightly smaller font.
- It works with any [display mode](Feature-Tab-Display) that shows the label (`both`/`label`); in `icon`-only mode the subtitle is hidden along with the label.
- Subtitles make tabs taller — bump [`--tabdeck-tab-height`](Feature-Theming) if they feel cramped.
- For a *dynamic* subtitle, set a [template](Badges) — or use a [badge](Badges) instead if you only need a count.
- Set it from the **Subtitle** field in the [visual editor](Editor).

## Hover summary (`tooltip`)

A tab's `tooltip` is a short summary that appears when the mouse rests on the tab for half a second, or as soon as keyboard focus lands on it. It can be a template:

```yaml
tabs:
  - name: Lights
    icon: mdi:lightbulb-group
    tooltip: >-
      {{ states.light | selectattr('state','eq','on') | list | count }} lights on ·
      hall {{ states('light.hall') }}
    card: { ... }
```

- It appears below the tab (above it on a bottom bar or the dock, beside it on a side bar) and goes away when the pointer leaves, on a press or click, on scroll and with Escape.
- Touch screens don't show it, and it never gets in the way of a long-press (`hold_action`, `hold_peek`, compare).
- Screen readers get it as the tab's description.
- Colours: `--tabdeck-tooltip-background`, `--tabdeck-tooltip-color`.
