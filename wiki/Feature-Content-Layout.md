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

## Page background (`page_background`)

`background` colours the deck's content area. `page_background` goes further: while the tab is
open, the whole dashboard view behind the deck takes that background.

```yaml
tabs:
  - name: Night
    icon: mdi:weather-night
    page_background: linear-gradient(160deg, #0d3b66, #145c8a 60%, #1e88a8)
    card: { ... }
  - name: Garden
    page_background: /local/garden.jpg
    card: { ... }
```

- It takes the same values as `background`: a colour, gradient, `var()`, or an image path / URL
  (which covers the view), and may be a template.
- Switching to a tab without one, leaving the view, or removing the deck puts the view's own
  background back. Other views and dashboards are never touched.
- A dark page under a light theme can make the tab bar hard to read; pair it with the tab's
  `styles` (for example `--secondary-text-color`) or `bar_background`.
- The visual editor has a field for it on each tab.

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

## Picture-in-picture (`pip`)

A tab with `pip: true` keeps its card on screen after you switch to another tab. The card moves to a small floating window in the bottom-right corner, so the doorbell camera keeps playing while you turn the lights off.

```yaml
type: custom:tabdeck-card
tabs:
  - name: Doorbell
    icon: mdi:doorbell-video
    pip: true
    card:
      type: picture-entity
      entity: camera.doorbell
      camera_view: live
  - name: Lights
    card: { ... }
```

- Tap the window to go back to its tab, or × to close it. Opening the tab again resets it, so the window comes back the next time you leave.
- One window at a time: leaving another `pip` tab replaces it.
- The window is for watching. Buttons inside the card don't respond there, and a tap anywhere on it opens the tab.
- It's the same card, not a copy, so a live camera stream isn't opened twice.
- It sits above the [dock](Feature-Dock) when there is one, and it isn't shown while the dashboard is being edited, in `scroll_spy`, `split` or full screen.
- Size and place it with `--tabdeck-pip-width` (default `min(320px, 45vw)`), `--tabdeck-pip-max-height` (`40vh`), `--tabdeck-pip-right` and `--tabdeck-pip-bottom` (`16px`) in `styles`.
- In the visual editor, it's the **Keep in a floating window after switching away** switch on each tab.

## Empty message (`empty_message`)

When every card in a tab is hidden (their visibility conditions aren't met, or a conditional card
is off), the tab would be blank. `empty_message` shows a short message there instead:

```yaml
tabs:
  - name: Alerts
    icon: mdi:alert
    empty_message: All alerts are clear
    cards:
      - type: tile
        entity: binary_sensor.leak
        visibility: [{ condition: state, entity: binary_sensor.leak, state: "on" }]
```

- `true` shows "Nothing to show right now"; a string adds a line under it; an object sets
  everything: `{ title, text, icon }` (`title` and `text` may be templates).
- The message appears once the tab's cards have been hidden for a moment (so it doesn't flash
  while they load) and goes as soon as one of them shows again.
- For every tab at once, put it in `tab_defaults`.
- Its height is `--tabdeck-empty-height` (140px).
- The visual editor has a text box for the line under the title; `true` and the object form are YAML.

## Friendly errors (`friendly_errors`)

A card that can't load (a custom card that isn't installed, a typo in a card type) normally shows
Home Assistant's "Configuration error" box. With `friendly_errors: true` the deck says what's wrong
in plain words instead, and puts a red warning badge on the tab, so you can spot it without opening
every tab:

```yaml
type: custom:tabdeck-card
friendly_errors: true
tabs:
  - name: Weather
    cards:
      - type: custom:weather-radar-card   # not installed
      - type: tile
        entity: sensor.outside_temperature
```

The Weather tab then shows "Part of this tab couldn't load · custom:weather-radar-card isn't
installed · Edit the dashboard to fix it" above the cards that did load.

- It finds error cards anywhere in the tab, inside stacks and grids too.
- Outside edit mode the message replaces HA's error box. While you edit the dashboard, HA's own
  box stays visible as well, with its full details, so nothing is hidden from you.
- A tab that sets its own `badge` or `badge_icon` keeps it; the warning badge is only added to tabs without one.
- Tabs whose cards aren't built yet (`lazy`, `unmount_hidden`) get their badge once they've been opened.

## Auto refresh (`auto_refresh`)

Some cards go stale when a wall tablet shows them for days: a camera stream that froze, a web page
that logged out, a third-party card that stopped updating. `auto_refresh` rebuilds a tab's card
every so many minutes:

```yaml
tabs:
  - name: Driveway
    auto_refresh: 5          # minutes
    card: { type: picture-entity, entity: camera.driveway, camera_view: live }
  - name: Reports
    url: http://192.168.1.50:8080
    auto_refresh: 30
```

- The open tab's card is rebuilt in place (checked every 10 seconds). It waits while someone is
  using the card (a finger on it, typing in it).
- A tab that's due while you're on another tab is freed and built fresh when you open it.
- Nothing is refreshed while you edit the dashboard.
- At least 0.1 minutes (6 seconds). The visual editor has a minutes box on each tab.

## Size controls (`zoom`, `padding`, `spacing`)

Per tab, for crowded wall tablets or screens read from across the room:

```yaml
tabs:
  - name: Lights
    zoom: 0.8      # smaller, so more fits; 1.2 is bigger
    padding: 4     # around the cards (CSS length; a number is px)
    spacing: 2     # between the cards
    cards: [...]
```

- `zoom` scales the tab's whole content, text included (0.25 to 3).
- `padding` goes around the tab's content; `spacing` sets the gap between its cards in HA's
  vertical/horizontal stacks and grid, and in Tabdeck's `cards:` masonry and sections layouts.
- `0` is allowed for both. For every tab at once, put them in `tab_defaults`.
- The visual editor has fields for all three on each tab.
