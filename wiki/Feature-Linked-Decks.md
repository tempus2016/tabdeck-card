# Linked decks

**`sync_group: <name>`** links decks on the same dashboard: when one switches tab, every other deck with the same `sync_group` switches to its tab of the same name.

```yaml
# A deck of controls and a deck of graphs that always show the same room
type: vertical-stack
cards:
  - type: custom:tabdeck-card
    sync_group: house
    tabs:
      - { name: Lounge, card: { type: entities, entities: [light.lounge, climate.lounge] } }
      - { name: Kitchen, card: { type: entities, entities: [light.kitchen] } }
  - type: custom:tabdeck-card
    sync_group: house
    tabs:
      - { name: Lounge, card: { type: history-graph, entities: [sensor.lounge_temperature] } }
      - { name: Kitchen, card: { type: history-graph, entities: [sensor.kitchen_temperature] } }
```

- Tabs are matched by name, ignoring case and spacing (`Living room` matches `living-room`). A deck without a tab of that name stays where it is.
- Any deck in the group can lead. Switches made by `auto_rotate`, `remote_event` and so on are followed too.
- A deck that appears later, for example on another view of the same dashboard, starts on the tab the group last switched to.
- A PIN-locked tab isn't opened by a linked switch: that deck stays where it is.
- Use different names for independent groups. Decks without `sync_group` are never linked.
- The link is within one browser tab. To switch decks on other devices, see [Remote control & events](Feature-Remote-Control).

In the visual editor: **Linked decks**.
