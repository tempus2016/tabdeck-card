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

## `unload_after`

Keep-alive is great until a wall tablet has had twenty camera and map tabs open all day. **`unload_after: <minutes>`** frees the card of any tab that hasn't been on screen for that long. Opening the tab again rebuilds it, which takes a moment, the same as a first visit.

```yaml
type: custom:tabdeck-card
unload_after: 10    # minutes
tabs: [ ... ]
```

- The open tab is never freed; the clock for a tab starts when you leave it.
- Checked every 30 seconds.
- `scroll_spy` and a wide `split` layout show every tab at once, so nothing is freed while they're in use.
- Unlike `unmount_hidden`, recently used tabs stay warm, so quick back-and-forth switching is still instant.

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

All three are available in the visual editor (**Unmount hidden tabs**, **Free unused tabs after**, **Swipe wraps around ends**).
