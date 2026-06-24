# Getting Started

A Tabdeck card is a list of **tabs**, each wrapping one ordinary Lovelace **card**.

## Minimal example

```yaml
type: custom:tabdeck-card
tabs:
  - name: Climate
    icon: mdi:thermostat
    card:
      type: thermostat
      entity: climate.living_room
  - name: Lights
    icon: mdi:lightbulb-group
    card:
      type: entities
      entities:
        - light.kitchen
        - light.hall
```

This renders a two-tab card with an underline tab bar at the top.

## Adding a badge

```yaml
tabs:
  - name: Inbox
    icon: mdi:email
    badge: sensor.unread_count   # shows the entity's state
    card:
      type: markdown
      content: "..."
```

See **[Badges](Badges)** for template badges.

## Hiding a tab conditionally

```yaml
tabs:
  - name: Away mode
    icon: mdi:home-export-outline
    visibility:
      - condition: state
        entity: input_boolean.guest_mode
        state: "on"
    card:
      type: entities
      entities: [...]
```

See **[Tab Visibility](Tab-Visibility)** for all condition types.

## Using the editor instead

You don't have to write YAML — open the card's **[Visual Editor](Editor)** to add tabs, pick icons, choose card types, and reorder tabs with a GUI.

## Next steps

- **[Configuration](Configuration)** — the full option reference.
- **[Navigation & Persistence](Navigation-and-Persistence)** — swipe, keyboard, remembering the active tab.
