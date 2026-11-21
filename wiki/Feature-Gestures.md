# Gestures: mouse wheel, edge swipe & swipe lock

Options that change how the deck reacts to a mouse wheel, a trackpad and a finger. [`swipe`, `swipe_mouse` and `swipe_wrap`](Navigation-and-Persistence) turn swiping on in the first place.

## Mouse wheel (`wheel_switch`)

**`wheel_switch: true`** lets you change tabs on a desktop by scrolling over the tab bar: scroll down (or right) for the next tab, up (or left) for the previous one.

```yaml
type: custom:tabdeck-card
wheel_switch: true
tabs: [ ... ]
```

- Only scrolling over the **tab bar** changes tab. Scrolling over the content scrolls the page as usual.
- One scroll gesture moves one tab. A trackpad fling, which keeps sending scroll events after you lift your fingers, still moves only one tab. Pause briefly before the next scroll.
- Disabled and action tabs are skipped, and a PIN-locked tab asks for its PIN.
- At the first or last tab the page scrolls as usual, unless [`swipe_wrap`](Feature-Performance#swipe_wrap) wraps round to the other end.
- Ctrl + wheel (browser zoom) is left alone, and nothing happens while you edit the dashboard.

## Edge swipe only (`swipe_edge`)

A swipe that starts on a brightness slider or a map moves that control **and** changes tab. **`swipe_edge: true`** makes a swipe count only when it starts near the left or right side of the deck's content, so the middle is left to your cards.

```yaml
type: custom:tabdeck-card
swipe: true
swipe_edge: true     # 40 px strips on each side
# swipe_edge: 64     # or your own width in px (8–400)
tabs: [ ... ]
```

- The strips are measured from the edges of the deck's content, not the screen. A swipe that starts just outside the content (on the card's margin) counts too.
- It applies to touch swipes, [`swipe_peek`](Feature-Content-Layout#swipe-peek-swipe_peek) and [`swipe_mouse`](Navigation-and-Persistence) drags. Two-finger pinch for the [overview](Feature-Overview) still works anywhere.
- In the visual editor it's the **Edge swipe only** box: 0 means anywhere.

## Swipe lock (`swipe_lock`)

With `swipe` on, dragging a slider sideways can also change tab. **`swipe_lock: true`** leaves a swipe that starts on a slider or a map to that control: the slider moves and the tab stays put. Swipes that start anywhere else still change tab.

```yaml
type: custom:tabdeck-card
swipe: true
swipe_lock: true
tabs: [ ... ]
```

What counts as a slider or a map:

- any element whose tag name contains `slider`, such as the tile card's brightness and position bars (`ha-control-slider`), HA's thermostat dial, `ha-slider`, Mushroom's sliders and `round-slider`
- anything with `role="slider"`, and range inputs (`<input type="range">`)
- HA's map card and other Leaflet maps

It covers touch swipes, [`swipe_peek`](Feature-Content-Layout#swipe-peek-swipe_peek) and [`swipe_mouse`](Navigation-and-Persistence) drags. To keep the middle of the deck free for every kind of control, use [`swipe_edge`](#edge-swipe-only-swipe_edge) instead (or both).

Some cards, such as the rows of an entities card, already keep their touches to themselves, so they never changed tab even without `swipe_lock`.
