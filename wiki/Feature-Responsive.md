# Responsive layouts: split view & narrow display

The deck can change its layout based on **its own width** (not the screen's), so it adapts to where it sits in a dashboard.

## Split view (`split`)

On a wide card, show **every tab side by side** as titled columns and hide the tab bar. Below the threshold it's a normal tabbed deck again. You get tabs on a phone and columns on a desktop.

```yaml
type: custom:tabdeck-card
split: 900                  # side by side when the card is ≥ 900 px wide
tabs: [ ... ]
```

or with a column count:

```yaml
split:
  min_width: 700
  columns: 3                # 2–4, default 2
```

![Split view: three tabs as columns](images/feature-split.png)

- Each column gets a title (the tab's icon and name) above its card.
- With more tabs than columns, the extra ones wrap onto further rows.
- [Navigation/action tabs](Feature-Navigation-Tabs) have no content, so they're left out.
- A [PIN-locked](Feature-PIN) tab's column shows a lock, the tab's name and an **Enter PIN** button until its code is entered.
- Column spacing is set by `--tabdeck-split-gap` (default `16px`).

## Narrow display (`tab_display_narrow`)

Use a different [tab display mode](Feature-Tab-Display) when the card is narrow. A typical setup is icon-only tabs on phones with icon and label everywhere else.

```yaml
type: custom:tabdeck-card
tab_display: both
tab_display_narrow: icon    # both | icon | label | active
narrow_width: 450           # "narrow" = card width below this (default 450)
tabs: [ ... ]
```

![Narrow card: icon-only tabs](images/feature-narrow.png)

## Follow the screen's orientation (`orientation_layout`)

A wall tablet that gets turned round can move its bar to suit: **`orientation_layout: true`** puts the bar along the **bottom** while the screen is upright (portrait) and **down the left side** while it's sideways (landscape).

```yaml
type: custom:tabdeck-card
orientation_layout: true
tabs: [ ... ]
```

Pick your own sides with an object. A side you leave out keeps its default:

```yaml
orientation_layout:
  portrait: top
  landscape: right
```

- It follows the **screen**, not the card: a phone or tablet switches as it's turned, and a desktop window counts as portrait when it's taller than it is wide.
- It replaces `position` while it's on; everything that works with a side bar (`rail_expand`, `tab_display_narrow`, sticky bars) works the same.
- `dock` still puts the bar at the bottom of the screen and `wizard` still uses the top.
- In the visual editor it's the **Follow the screen** switch under **Position**. Turning it on writes `true`; positions you set in YAML are kept.

## Notes

- The width is measured live with a `ResizeObserver`, so layouts switch as you resize the window or change dashboard columns. It's only observed when one of these options is set. The orientation is watched with a media query, only when `orientation_layout` is set.
- All options are in the visual editor. The split column count is YAML-only, and it's kept when you change the width in the editor.
