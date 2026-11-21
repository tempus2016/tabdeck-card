# One-line tab content

Some tabs only need one thing. These keys fill a tab without writing a `card:`.
A tab's own `card`, `cards`, `sections` or `children` wins over them.

## Reuse a dashboard view (`view`)

A tab can show the cards of a view you already have, on this dashboard or another one,
without copying them. Change the view and the tab follows on the next page load.

```yaml
type: custom:tabdeck-card
tabs:
  - name: Home
    card: { type: markdown, content: Welcome home }
  - name: Energy
    icon: mdi:flash
    view: /energy-dash/energy
  - name: Rooms
    view: /lovelace/rooms
```

- `view: /<dashboard>/<view>` names the dashboard by its URL (`lovelace` is the default
  dashboard) and the view by its path, its number (from `0`) or its title. Leave the view out
  (`view: /energy-dash`) for the first view.
- The object form does the same: `view: { dashboard: energy-dash, view: energy }`.
- A sections view keeps its sections; a masonry view's cards are balanced into columns;
  a panel view shows its one card. View badges aren't shown.
- The dashboard is read once per page load (read only), however many tabs use it.
- If the dashboard or view doesn't exist, or the dashboard is generated automatically
  (the default Overview before you take control of it, the Energy and Map dashboards),
  the tab says so instead.
- A tab can't show the view it sits on.
- In the visual editor, type the view into a tab's **Show a dashboard view** field.

## Web page tab (`url`)

A tab can show a website, such as a router page or a self-hosted app, with one line:

```yaml
tabs:
  - name: Reports
    icon: mdi:web
    url: http://192.168.1.50:8080
    aspect_ratio: 75%   # optional
```

- `url` becomes Home Assistant's own [iframe card](https://www.home-assistant.io/dashboards/iframe/),
  so it behaves exactly like one. `aspect_ratio` is passed on to it (`75%`, `16:9`; HA's default is `50%`).
- The same limits as the iframe card apply: many websites refuse to be shown inside another page,
  and a dashboard opened over `https` can't show an `http` page.
- Need more of the iframe card's options? Write a `card: { type: iframe, ... }` instead.
- In the visual editor, use a tab's **Show a web page (URL)** field.

## Text tab (`markdown`)

A tab of notes, instructions or a status summary, without writing a card:

```yaml
tabs:
  - name: Notes
    icon: mdi:note-text
    markdown: |
      ## House notes
      - Bins out on **Tuesday**
      - The boiler is {{ states('climate.boiler') }}
```

- `markdown` becomes Home Assistant's own [markdown card](https://www.home-assistant.io/dashboards/markdown/)
  with that text as its `content`, so Markdown and templates work as they do there.
- For the markdown card's other options (`title`, `text_only`, …) write a `card: { type: markdown, ... }` instead.
- In the visual editor, use a tab's **Show text** box.
