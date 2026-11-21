# Performance & swipe options

## `unmount_hidden`

By default Tabdeck keeps every tab's card mounted (so state and scroll position survive switching). For memory-heavy dashboards (lots of cameras/maps), set **`unmount_hidden: true`** to keep only the **active** tab's card in the DOM.

```yaml
type: custom:tabdeck-card
unmount_hidden: true
tabs: [ ... ]
```

- Only the active panel renders its card; switching re-attaches the target card.
- Trade-off: hidden cards aren't kept warm, so re-showing rebuilds the DOM. Combine with [`lazy`](#lazy-and-preload) to also defer the first build.

## `lazy` and `preload`

**`lazy: true`** builds a tab's card the first time the tab is opened, instead of building every tab's card when the dashboard loads. A deck with ten heavy tabs then loads as fast as one with a single tab.

The catch is the first visit: the card is built while you wait. **`preload`** builds tabs in the background while the browser has nothing else to do, so most switches are instant anyway:

```yaml
type: custom:tabdeck-card
lazy: true
preload: idle     # the tabs either side of the open one
# preload: all    # every tab, one at a time
tabs: [ ... ]
```

- `idle` follows you. After each switch, the tabs either side of the new one are built next, which is where a swipe or arrow key goes.
- `all` works through every tab, one card per idle moment, so the page stays responsive while it does.
- Without `lazy`, every card is built up front anyway, so `preload` has nothing to do.
- PIN-locked tabs aren't preloaded.
- `scroll_spy` and `split` show every tab at once, so they build every card even with `lazy`.

## Loading placeholder (`loading_placeholder`)

With `loading_placeholder: true`, a tab whose card hasn't drawn anything yet shows three grey boxes
until it has. It helps most with `lazy`, with cards whose code loads slowly (big custom cards), and
with `view:` tabs, which fetch their view first.

```yaml
type: custom:tabdeck-card
lazy: true
loading_placeholder: true
```

- The boxes go as soon as the card has a height, and a card that has loaded once never shows them again.
- If a card still has no height after 4 seconds (all of its cards are hidden, say), the boxes go,
  and the tab's `empty_message` shows if it has one.
- Colour `--tabdeck-placeholder-color`, gap `--tabdeck-placeholder-gap`. The boxes pulse gently,
  except with reduced motion.

## Big decks (`bar_limit`)

A deck with 100+ tabs (an `auto_tabs` list of every device, say) spends most of its time building
140 cards and drawing 140 tabs. Two options keep it fast:

```yaml
type: custom:tabdeck-card
auto_tabs: { ... }      # 140 tabs
lazy: true              # build a tab's card when it's first opened
bar_limit: 8            # draw 8 tabs in the bar; ⋯ lists them all
```

- `bar_limit: N` draws at most N tabs in the bar: the page of N tabs that holds the open one
  (tabs 1–8, 9–16, …). The ⋯ button lists every tab and opens scrolled to the current one.
  Arrow keys step past the end of a page as usual.
- `lazy` is what saves the most: without it every tab's card is built when the dashboard loads.

Measured on a test Home Assistant (headless Chrome, 1 + 140 generated tabs, each an entities card):

| | Build the deck | Tab switch | State update |
| --- | --- | --- | --- |
| default | ~1,600–2,000 ms | ~5 ms | ~6 ms |
| `lazy` | ~180–200 ms | | |
| `bar_limit: 8` + `lazy` | ~40–55 ms | ~8 ms (builds the new tab's card) | ~2 ms |

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
