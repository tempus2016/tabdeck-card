# Content layout

Options for the content area under the tab bar: how a tab's cards are laid out (masonry or sections), what stays on screen on every tab, how tall the content is, its background, and full screen.

## Masonry inside a tab (`layout: masonry`)

A tab with several `cards` normally stacks them (or puts them in a `columns` grid). With **`layout: masonry`** they're balanced into columns like Home Assistant's masonry view: each card goes into the currently shortest column, based on the card's own size.

```yaml
tabs:
  - name: Overview
    icon: mdi:view-dashboard
    layout: masonry
    columns: 3            # fixed number of columns (default 2)
    cards:
      - type: entities
        entities: [light.kitchen, light.lounge, light.hall]
      - type: weather-forecast
        entity: weather.home
      - type: tile
        entity: lock.front_door
```

Use **`min_column_width`** instead of `columns` to fit as many columns as the width allows, so the same tab has one column on a phone and three on a tablet:

```yaml
    layout: masonry
    min_column_width: 300   # px
```

- Gap between cards: the `--tabdeck-masonry-gap` variable (default `8px`).
- The tab's content is a `custom:tabdeck-masonry-card` with `columns` / `min_column_width` and `cards`, which you can also use on its own.

## Sections inside a tab (`layout: sections`)

Titled groups of cards laid out like Home Assistant's **sections view**, inside one tab. Each section has a heading (HA's own heading card, so it looks the same as on a sections dashboard) and its cards sit on a 12-column grid.

```yaml
tabs:
  - name: Home
    icon: mdi:home
    layout: sections
    max_columns: 3            # default 4, like HA
    sections:
      - title: Living room
        icon: mdi:sofa
        badges:               # HA heading badges, optional
          - type: entity
            entity: light.lounge
        cards:
          - { type: tile, entity: light.lounge }    # tiles are half width by default
          - { type: tile, entity: light.lamp }
          - { type: media-control, entity: media_player.tv }
      - title: Outside
        icon: mdi:cctv
        column_span: 2        # a wide section
        cards:
          - { type: picture-entity, entity: camera.driveway, grid_options: { columns: 6 } }
          - { type: picture-entity, entity: camera.garden, grid_options: { columns: 6 } }
```

- **Columns:** sections flow into as many columns as fit (each at least 320 px wide), up to `max_columns`. On a phone or a narrow card they stack into one column in the order written.
- **`column_span`:** a section can span several columns; it shrinks to fit when fewer columns are available.
- **Card widths** follow HA's rules: the card's `grid_options.columns` (1–12 or `full`; the older `layout_options.grid_columns` also works), else the card's own default (a tile is half width), else full width. Cards copied from a sections dashboard keep their sizes.
- A section without a `title` has no heading.
- `grid_options.rows` (fixed card heights) isn't used; cards are as tall as their content.
- Gap between sections: `--tabdeck-section-gap` (default `16px`).

## Header and footer cards (`header_cards`, `footer_cards`)

Cards that stay on screen whichever tab is open: a summary row above the tabs, or controls below the content.

```yaml
type: custom:tabdeck-card
header_cards:
  - type: markdown
    content: "**{{ states('sensor.people_home') }}** people home"
footer_cards:
  - type: tile
    entity: alarm_control_panel.home
tabs: [ ... ]
```

- Header cards sit above the tab bar, footer cards below the content (and below a `bottom` bar).
- They're built once and kept for the life of the card; switching tabs doesn't rebuild them.
- Spacing: `--tabdeck-extras-gap` (default `8px`).

## Tab background (`background`)

A tab's **`background`** fills the content area while that tab is open. It can be a colour, a gradient, a CSS variable, or an image path / URL (images cover the area):

```yaml
tabs:
  - name: Garden
    background: /local/backgrounds/garden.jpg
    card: { ... }
  - name: Night
    background: "linear-gradient(160deg, #0f2027, #203a43, #2c5364)"
    card: { ... }
```

It can also be a **template**, rendered live by Home Assistant. Here's a weather-driven background:

```yaml
    background: >
      {{ '/local/bg/rain.jpg' if is_state('weather.home', 'rainy') else '/local/bg/sun.jpg' }}
```

- When any tab has a background, the content area gets rounded corners and a little padding on every tab, so the size doesn't change as you switch.
- Corner radius: `--tabdeck-content-radius` (defaults to the card radius).

## Content height (`content_height`, `content_max_height`)

By default the content is as tall as the open tab, so the page can jump when tabs differ in height.

| Value | Effect |
| --- | --- |
| `content_height: auto` | Default: each tab its own height. |
| `content_height: tallest` | The content keeps the height of the tallest tab, so switching never moves what's below the card. |
| `content_height: 400` or `"50vh"` | A fixed height; taller tabs scroll inside the card. Numbers are px. |
| `content_max_height: 600` | Grows with the tab up to this height, then scrolls inside. |

```yaml
type: custom:tabdeck-card
content_height: tallest
tabs: [ ... ]
```

`tallest` keeps every tab laid out (invisible), so it works best with the default keep-alive behaviour rather than `unmount_hidden`.

## Full screen (`fullscreen`)

**`fullscreen: true`** adds a full-screen button at the end of the tab bar. It opens the active tab over the whole window, which is handy for cameras, maps and floor plans. Close it with the button in the corner or **Esc**. Swiping and arrows keep working inside.

```yaml
type: custom:tabdeck-card
fullscreen: true
tabs: [ ... ]
```

- With `hide_bar`, the button floats over the top-right corner of the content instead.
- Overlay background: `--tabdeck-fullscreen-background` (defaults to the page background). Stacking order: `--tabdeck-fullscreen-z` (default `9`).

## Swipe peek (`swipe_peek`)

With [`swipe`](Navigation-and-Persistence) on, **`swipe_peek: true`** makes the content follow your finger, and the next (or previous) tab slides in beside it, like a carousel. Let go past a third of the width, or flick, to change tab; otherwise it springs back.

```yaml
type: custom:tabdeck-card
swipe: true
swipe_peek: true
tabs: [ ... ]
```

- Vertical scrolling is left alone: the drag only starts once the finger moves sideways.
- At the ends (without `swipe_wrap`) the content resists instead of following.
- With `unmount_hidden`, the neighbour's card isn't in the page, so only the open tab moves.
