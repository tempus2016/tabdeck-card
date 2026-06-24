# Performance & swipe options

## `unmount_hidden`

By default Tabdeck keeps every tab's card mounted (so state and scroll position survive switching). For memory-heavy dashboards (lots of cameras/maps), set **`unmount_hidden: true`** to keep only the **active** tab's card in the DOM.

```yaml
type: custom:tabdeck-card
unmount_hidden: true
tabs: [ ... ]
```

- Only the active panel renders its card; switching re-attaches the target card.
- Trade-off: hidden cards aren't kept warm, so re-showing rebuilds the DOM. Combine with [`lazy`](Configuration) to also defer the first build.

## `swipe_wrap`

With [`swipe`](Navigation-and-Persistence) enabled, **`swipe_wrap: true`** makes swiping past the last tab wrap to the first (and vice-versa) instead of stopping at the ends.

```yaml
type: custom:tabdeck-card
swipe: true
swipe_wrap: true
tabs: [ ... ]
```

## Under the hood

The tab bar's resize handling is debounced to one reposition per animation frame, so the indicator stays smooth during window/layout changes.

Both options are available in the visual editor (**Unmount hidden tabs**, **Swipe wraps around ends**).
