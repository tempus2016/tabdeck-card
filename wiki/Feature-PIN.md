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
- If the tab that would open first is locked, the deck opens on the first unlocked tab instead. That covers `default_tab`, `default_if`, a remembered tab (`remember`), a `#tab=` link and `learned_default`, so a reload never shows a locked tab without the code.
- **Automatic switches never open a locked tab.** A PIN keeps a tab from whoever is at the screen, so an automation putting it on screen would defeat it. [`remote_entity`, `remote_event`](Feature-Remote-Control) (also from Assist and the blueprints), the [companion](Feature-Remote-Control#companion-integration-companion) select, a [`takeover`](Feature-Remote-Control#doorbell-takeover-takeover), `follow_room`, [`auto_select`](Feature-Auto-Select), `remember: entity` changed on another device, a [linked deck](Feature-Linked-Decks), `auto_rotate` and `idle_return` leave the deck where it is. No prompt appears. The step words `next` and `previous` step past locked tabs; `back` and `default` to a locked tab do nothing. With [`debug`](Feature-Debug) on, the browser console says which switch was skipped and why.
- Once someone has entered the code, the tab counts as unlocked for these switches too, for `pin_timeout` minutes (or until the page reloads).
- `selectTab()`, `selectDefault()` and `window.tabdeck` [select](Feature-Developer-API) ask for the code and return `false`, as a tap would. Code you run on the page can still reach the tab's card in other ways: the PIN isn't security (see above).
- The [config check](Editor#config-check) warns when a `takeover`, a `follow_room` map or `remote_entity` points at a tab with a PIN.
- While editing the dashboard there's no prompt.

## Where locked content stays hidden

A locked tab's cards are never on screen until the code is entered, in any layout. Where its content would show, the deck draws a lock, the tab's name and an **Enter PIN** button instead; the button opens the same prompt as tapping the tab, and the right code shows the content in place. When a `pin_timeout` unlock runs out, the content goes back behind the lock straight away, even if the tab is on screen.

- [`scroll_spy`](Feature-Scroll-Spy): the locked tab's section shows the lock.
- Wide [`split`](Feature-Responsive) layout: the locked tab's column shows the lock.
- The open tab: if its unlock runs out while it's open, or every tab is locked, or a [`tab_ref`](Feature-Reuse#shared-tabs-tab_ref) shared tab with a PIN arrives on the open tab, it shows the lock.
- [`compare`](Feature-Hold-Action) and [`hold_peek`](Feature-Hold-Action#preview-a-tab-by-holding-it-hold_peek): holding a locked tab asks for the code and shows nothing; hold it again afterwards. A compared tab closes when its unlock runs out.
- [`pip`](Feature-Content-Layout#picture-in-picture-pip): the floating window closes when its unlock runs out.
- [Popups](Feature-Popup): a locked tab asks for the code, then opens. An open popup whose unlock runs out shows the lock.
- [Overview](Feature-Overview): a locked tab's tile shows a lock instead of a live thumbnail.
- Not affected, since they show no content: the [group menu](Feature-Grouped-Tabs) and [entity search](Feature-Search-Hotkeys#dashboard-search-entity_search) list names only and ask for the code when picked. Cards of other tabs that are built ahead of time (`preload`, or without `unmount_hidden`) stay hidden.
- [Export as a dashboard view](Feature-Convert#export-as-a-dashboard-view) can't keep a PIN: the editor notes that locked tabs become ordinary sections.
- Style: `--tabdeck-pin-z` sets the prompt's stacking order (default `10`).
