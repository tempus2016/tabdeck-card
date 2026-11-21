# Overview grid

**`overview: true`** adds a grid button at the end of the tab bar. It shows every tab at once as a live thumbnail, and tapping one opens it.

```yaml
type: custom:tabdeck-card
overview: true
tabs:
  - name: Home
    icon: mdi:home
    card: { type: tile, entity: light.kitchen }
  - name: Cameras
    icon: mdi:cctv
    card: { type: picture-entity, entity: camera.front_door }
```

- The thumbnails are the tabs' real cards, drawn smaller, so they keep updating while the grid is open.
- The open tab has an outline. **Esc** or × closes the grid without switching.
- A **two-finger pinch-in** over the content also opens it, which suits tablets and phones.
- With `hotkeys: true`, **o** opens and closes it.
- Disabled tabs and action tabs (`tap_action`) aren't in the grid. A PIN-locked tab shows a lock instead of its content and asks for the code when tapped.
- With `lazy: true`, opening the grid builds every tab's card, since each one is shown.
- `--tabdeck-overview-min` in `styles` sets the smallest tile width (default `140px`).

It works with `hide_bar: true` too: there's no button then, but the pinch, the **o** key and the `openOverview()` method still open it.

In the visual editor: **Overview button: every tab as a live thumbnail**.
