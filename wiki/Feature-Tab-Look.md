# Tab look: pictures, icon animations, fonts, haptics

Small per-tab touches.

## Pictures instead of icons (`picture`)

```yaml
tabs:
  - name: Alex
    picture: person.alex          # the person's photo (entity_picture)
    card: { ... }
  - name: Garden
    picture: /local/garden.jpg    # or any image URL
    card: { ... }
```

- An entity id uses that entity's `entity_picture` (people, media players, some cameras); a path or URL is used as is. Templates work too.
- The picture is shown round, where the icon would be, and works with a [progress ring](Badges#progress-ring-ring).
- If the entity has no picture, the tab's `icon` is shown instead.

## Icon animations (`icon_animation`)

`spin`, `pulse`, `bounce`, `shake` or `beat`. Make it a template to animate only sometimes. A fan that spins while it's on:

```yaml
  - name: Fan
    icon: mdi:fan
    icon_animation: "{{ 'spin' if is_state('fan.bedroom', 'on') else '' }}"
```

Animations stop under *Reduce motion*.

## Fonts per tab (`font_size`, `font_weight`, `font_family`)

```yaml
  - name: Alarm
    font_weight: 700
    font_size: 16          # numbers are px
    font_family: "Georgia, serif"
```

For every tab at once, use `--tabdeck-tab-font-*` in [`styles`](Feature-Theming) or [`tab_defaults`](Feature-Reuse#tab_defaults). [`density`](Feature-Theming#density) changes the overall size of the bar.

## Haptic feedback (`haptic`)

```yaml
type: custom:tabdeck-card
haptic: light      # selection | light | medium | heavy | success | warning | failure (true = selection)
```

The Home Assistant companion app vibrates when the person switches tabs (taps, swipes, arrows, shortcuts). Automatic switches such as rotation, idle return and remote control don't vibrate. Browsers without the app ignore it.
