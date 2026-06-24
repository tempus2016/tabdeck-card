# Tab Visibility

Give any tab a `visibility` list to show or hide it dynamically. **All** conditions in the list must pass for the tab to appear (logical AND). A tab with no `visibility` is always shown.

```yaml
tabs:
  - name: Guests
    visibility:
      - condition: state
        entity: input_boolean.guest_mode
        state: "on"
    card: { ... }
```

## Condition types

### `state`

```yaml
- condition: state
  entity: input_boolean.guest_mode
  state: "on"            # or a list: ["on", "home"]
  # state_not: "off"     # inverse; also accepts a list
```

### `numeric_state`

```yaml
- condition: numeric_state
  entity: sensor.temperature
  above: 18              # value > above
  below: 25             # value < below   (at least one of above/below required)
```

### `screen`

```yaml
- condition: screen
  media_query: "(max-width: 600px)"
```

Matches a CSS media query — handy for mobile-only or desktop-only tabs.

### `template`

```yaml
- condition: template
  value_template: "{{ is_state('sun.sun', 'above_horizon') }}"
```

The template is rendered live over the HA websocket. While a template is still pending it is treated as **not met** (fail-closed), so tabs never flicker on.

## Logical groups: `and` / `or` / `not`

The top-level `visibility` list is an implicit **AND**. For richer logic, use group conditions — they can be nested to any depth (this matches Home Assistant's own condition system):

```yaml
visibility:
  - condition: or            # show if EITHER inner condition passes
    conditions:
      - condition: state
        entity: input_boolean.guest_mode
        state: "on"
      - condition: state
        entity: person.john
        state: home
```

```yaml
visibility:
  - condition: and
    conditions:
      - condition: state
        entity: alarm_control_panel.home
        state: disarmed
      - condition: not       # NONE of the inner conditions may pass
        conditions:
          - condition: numeric_state
            entity: sensor.temperature
            below: 5
```

| Group | Passes when |
| --- | --- |
| `and` | **all** inner `conditions` pass |
| `or` | **any** inner condition passes |
| `not` | **no** inner condition passes |

## Behaviour notes

- If the currently-selected tab becomes hidden, selection falls back to the first visible tab.
- Hidden tabs are removed from the bar entirely (not greyed out).
