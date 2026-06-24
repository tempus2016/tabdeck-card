# Nested decks

A tab's card can be **another Tabdeck card**, giving you sub-tabs (a tab group inside a tab).

```yaml
type: custom:tabdeck-card
tabs:
  - name: Downstairs
    icon: mdi:home-floor-0
    card:
      type: custom:tabdeck-card      # a nested deck
      style: pill
      tabs:
        - name: Living
          card: { type: thermostat, entity: climate.living }
        - name: Kitchen
          card: { type: light, entity: light.kitchen }
  - name: Upstairs
    icon: mdi:home-floor-1
    card:
      type: custom:tabdeck-card
      tabs:
        - name: Bed 1
          card: { ... }
        - name: Bed 2
          card: { ... }
```

## Notes

- Each deck keeps its own state, styling and persistence. Give the inner deck a distinct [`storage_key`](Navigation-and-Persistence) (or `remember: url` with unique names) if you persist both.
- The inner deck's keep-alive means its sub-tab cards (maps, cameras) render correctly too.
- There's no hard nesting limit, but two levels is usually plenty.
