# Tab as popup

**`popup: true`** lets a button on any other card open one of the deck's tabs in a dialog over the dashboard. The button uses Home Assistant's `fire-dom-event` action with `tabdeck_popup` set to the tab's name:

```yaml
# The deck
type: custom:tabdeck-card
popup: true
tabs:
  - name: Home
    card: { type: tile, entity: light.kitchen }
  - name: Cameras
    icon: mdi:cctv
    card: { type: picture-entity, entity: camera.front_door }
```

```yaml
# A button anywhere on the same dashboard
type: button
name: Cameras
icon: mdi:cctv
tap_action:
  action: fire-dom-event
  tabdeck_popup: Cameras
```

- The tab can be its name, its slug (`living-room`) or its position (`0` is the first).
- With several decks on the view, the first one that has the tab opens it. To pick one, give the deck an `event_id` and send `tabdeck_popup: { tab: Cameras, deck: hall }`.
- The dialog shows the tab's own card, so it stays live. The deck doesn't change tab. × , **Esc** or a tap outside closes it.
- **`popup: hidden`** hides the deck itself, so it's only a source of popups. It's shown as usual while you edit the dashboard, so you can still set it up.
- A PIN-locked tab asks for its code first; the popup opens after the right code. If the unlock runs out (`pin_timeout`) while the popup is open, its content is replaced by a lock and an **Enter PIN** button.
- `--tabdeck-popup-width` in `styles` sets the dialog's width (default `640px`).
- `openPopup(tab)` and `closePopup()` do the same from code.

In the visual editor: **Open tabs in a popup from other cards**.
