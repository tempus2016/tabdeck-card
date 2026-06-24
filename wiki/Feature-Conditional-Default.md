# Conditional default tab

Pick which tab opens **first** based on the current state — e.g. open the **Guest** tab when guest mode is on, otherwise the normal home tab.

**Per-tab key:** `default_if` — a list of [conditions](Tab-Visibility) (same format as `visibility`)

```yaml
type: custom:tabdeck-card
default_tab: Home          # fallback when nothing matches
tabs:
  - name: Home
    card: { ... }
  - name: Guest
    default_if:
      - condition: state
        entity: input_boolean.guest_mode
        state: "on"
    card: { ... }
```

## Behaviour

- On load, the **first** tab (in order) whose `default_if` conditions all pass becomes the starting tab.
- If none match, the normal [`default_tab`](Configuration) is used.
- A **remembered** selection ([`remember`](Navigation-and-Persistence)) still wins over `default_if`.
- `default_if` is evaluated at first paint, so use **synchronous** conditions: `state`, `numeric_state`, `screen`, `time`, `user`, and `and`/`or`/`not` groups. Template conditions may not have resolved yet on the very first render and aren't reliable here.
- Configured in YAML.
