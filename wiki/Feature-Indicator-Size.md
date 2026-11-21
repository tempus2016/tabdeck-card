# Indicator thickness

Control how thick the `underline` indicator bar is.

**Config key:** `indicator_size` (top-level number, px) · **Default:** `3` · **Range:** `1`–`16`

```yaml
type: custom:tabdeck-card
style: underline
indicator_size: 6      # thicker underline
tabs: [ ... ]
```

![6px underline indicator](images/feature-indicator-size.png)

## Notes

- Applies to the `underline` [style](Feature-Bar-Styles). For `pill` / `segmented` / `boxed` the indicator fills the whole tab, so thickness has no effect; `text` has no indicator.
- Values are clamped to `1`–`16`; invalid values fall back to `3`.
- Set it with the **Indicator thickness (px)** slider in the [visual editor](Editor).
- The indicator colour follows [`accent_indicator`](Feature-Accent-Indicator) / per-tab `accent`, or the theme `--primary-color`.

## Liquid indicator (`liquid_indicator`)

`liquid_indicator: true` changes how the indicator moves. Instead of sliding, its front edge runs ahead to the new tab while the back edge follows, so for a moment it stretches over both tabs and thins a little, like a drop, then settles on the new tab.

```yaml
type: custom:tabdeck-card
liquid_indicator: true
tabs: [ ... ]
```

- Works with every style that has an indicator, and with side bars (it stretches downwards or upwards there). An `underline` thins more than a `pill`.
- It plays when you change tab, not when the bar is resized.
- `animated: false` turns it off, and so does the device's **reduce motion** setting: the indicator just jumps.
- In the visual editor: **Liquid indicator (stretches as it moves)**.
