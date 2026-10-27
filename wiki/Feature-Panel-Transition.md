# Panel transitions

Animate the content when you switch tabs. A short fade, slide or zoom makes the card feel more polished.

**Config keys:** `transition`, `transition_duration`, `transition_easing` (top-level)

```yaml
type: custom:tabdeck-card
transition: slide              # none | fade | slide | scale | flip | rise
transition_duration: 250       # ms, default 180
transition_easing: ease-out    # any CSS easing, default ease
tabs: [ ... ]
```

## Behaviour

| Value | Effect on tab switch |
| --- | --- |
| `none` | No animation (default). |
| `fade` | The new panel fades in. |
| `slide` | The new panel slides in from the side you're moving towards: from the right for a later tab, from the left for an earlier one. |
| `scale` | The new panel grows slightly into place while fading in. |
| `flip` | The new panel turns in around its vertical axis, from the direction of travel. |
| `rise` | The new panel rises a little while fading in. |

- Runs via the Web Animations API on every switch, but not on the first render.
- Automatically **skipped** when the user has *Reduce motion* turned on (`prefers-reduced-motion`).
- `transition_duration: 0` turns the animation off without changing `transition`.
- After a [swipe peek](Feature-Content-Layout#swipe-peek-swipe_peek) drag, the released panel finishes sliding into place instead of playing the transition.
- Pick them in the [visual editor](Editor) under **Panel transition**, **Transition duration** and **Transition easing**.
