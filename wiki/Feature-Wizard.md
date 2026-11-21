# Wizard mode

**`wizard: true`** turns a deck into a step-by-step guide. The tab bar is replaced by the step's title, a **Step 2 of 4** counter and a progress bar, and **Back** and **Next** buttons sit under the content. On the last step **Next** becomes **Finish**.

```yaml
type: custom:tabdeck-card
wizard:
  finish_action:
    action: navigate
    navigation_path: /lovelace/home
tabs:
  - name: Welcome
    subtitle: A quick tour of the house
    card: { type: markdown, content: "Hello! Tap **Next** to start." }
  - name: Wi-Fi
    card: { type: markdown, content: "Network **Guest-Home**, password on the fridge." }
  - name: Heating
    card: { type: thermostat, entity: climate.lounge }
  - name: Done
    card: { type: markdown, content: "Enjoy your stay." }
```

- Each tab is a step, in order. Disabled tabs, action tabs and tabs hidden by their visibility conditions are skipped, so steps can depend on state.
- A tab's `subtitle` shows under the step title.
- **Finish** runs `finish_action` (any Home Assistant action, optional) and returns to the first step.
- Swipe, `content_arrows`, `hotkeys`, `remember` and the other navigation options still work.
- `wizard: true` ignores `position`, `dock` and `hide_bar`, since there's no bar. The progress bar and **Next** use the accent colour (`--tabdeck-accent`, or the theme's primary colour).

In the visual editor: **Wizard: Back and Next buttons with a progress bar instead of the tab bar** (a `finish_action` set in YAML is kept).
