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

## Smaller download: the editor is a separate file

The card ships as two files: **`tabdeck-card.js`**, the card itself (about 41 KB gzipped), and **`tabdeck-card-editor-<hash>.js`**, the visual editor with its helpers and translations (about 65 KB gzipped). Dashboards only download the editor when someone opens the card editor, so they load faster for everyone, on every device.

- The Marketplace (and HACS) installs both files. Only `tabdeck-card.js` is a dashboard resource; it loads the editor itself.
- The hash in the editor's name changes with every release, so a browser can't pair a cached old editor with a new card.
- Without the editor file (an incomplete manual install), the card still works and Home Assistant offers its YAML editor.

## Under the hood

The tab bar's resize handling is debounced to one reposition per animation frame, so the indicator stays smooth during window/layout changes.

All three are available in the visual editor (**Unmount hidden tabs**, **Free unused tabs after**, **Swipe wraps around ends**).
