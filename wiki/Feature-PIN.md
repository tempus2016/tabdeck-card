# PIN-locked tabs (`pin`)

Ask for a code before a tab opens: handy for a *Settings* or *Alarm* tab on a shared wall panel, so children or guests don't wander in.

```yaml
tabs:
  - name: Security
    icon: mdi:shield-lock
    pin: "2468"
    pin_timeout: 5     # optional: minutes the unlock lasts (default: until the page reloads)
    card: { ... }
```

> **This is a convenience lock, not security.** The PIN is part of the dashboard config, which anyone who can edit the dashboard (or read its raw config) can see, and the cards on the tab can still be reached in other ways. To keep people out of controls, use Home Assistant users and permissions.

## Behaviour

- Tapping, swiping, the arrows, keyboard shortcuts, Back, and `selectTab()` all ask for the code first. A wrong code clears the field and says so; **Cancel**, **Esc** or a tap outside closes the prompt.
- After the right code, the tab stays unlocked in this browser for `pin_timeout` minutes, or until the page is reloaded.
- If the tab that would open first is locked, the deck opens on the first unlocked tab instead.
- `auto_rotate` and `idle_return` skip locked tabs. [Remote control](Feature-Remote-Control) opens them without the code.
- While editing the dashboard there's no prompt.
- Style: `--tabdeck-pin-z` sets the prompt's stacking order (default `10`).
