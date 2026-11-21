# Reuse: tab defaults and tab templates

Stop repeating yourself across tabs.

## `tab_defaults`

Keys applied to **every** tab, including tabs made by [`auto_tabs`](Feature-Dynamic-Tabs). A tab's own keys win; `styles` maps are merged.

```yaml
type: custom:tabdeck-card
tab_defaults:
  accent: "#e91e63"
  badge_format: { precision: 0, max: 99 }
  hold_action: { action: more-info }
  styles: { --tabdeck-tab-font-size: 15px }
tabs:
  - name: Lights
    badge: { count: light.*, state: "on" }
    card: { ... }
  - name: Climate
    accent: orange            # overrides the default
    card: { ... }
```

`tab_defaults` never sets a tab's `name` or `card`.

## `tab_templates` + `use`

Name a tab blueprint once, then fill it in per tab. Inside a blueprint, `{{ item.<var> }}` is replaced from the tab's `vars` (the same placeholders as `auto_tabs`; anything else in `{{ }}` is passed to Home Assistant as a normal template):

```yaml
type: custom:tabdeck-card
tab_templates:
  room:
    icon: mdi:sofa
    badge: { count: "light.{{ item.area }}_*", state: "on" }
    card:
      type: area
      area: "{{ item.area }}"
tabs:
  - name: Kitchen
    use: room
    vars: { area: kitchen }
  - name: Lounge
    use: room
    icon: mdi:television      # the tab's own keys win over the template
    vars: { area: lounge }
```

- A placeholder that is the whole value keeps its type (`show_camera: "{{ item.camera }}"` with `camera: true` gives `true`); a missing var becomes an empty string.
- Order: `tab_defaults`, then the template, then the tab's own keys.
- An unknown template name leaves the tab as written.

## Shared tabs (`tab_ref`)

Define a tab once on one dashboard and reuse it on others. **`tab_ref`** points at a tab of a Tabdeck card on another dashboard:

```yaml
type: custom:tabdeck-card
tabs:
  - tab_ref: family/weather          # dashboard / tab
  - tab_ref: family/outside/garden   # dashboard / view / tab
    name: Garden                     # keys here override the shared tab's
  - name: Lights
    card: { ... }
```

- The first part is the dashboard's URL path (`lovelace` for the default dashboard); with three parts the middle one is a view path, index or title. The tab is found by name (exact, then any case, then as a slug like `garden-lights`) in any Tabdeck card on that dashboard or view, inside stacks, sections and grouped `children` too.
- The shared tab comes with everything it has: icon, badge, alert, visibility, card. Its own deck's `tab_defaults` and `tab_templates` (`use`) are applied first, then this deck's keys written next to `tab_ref`, then this deck's `tab_defaults` for anything still unset.
- The other dashboard is read once per page load (read only, shared with [`view:`](Feature-Content-Shortcuts#reuse-a-dashboard-view-view) tabs). Change the shared tab and the copies follow on the next page load. Until it's loaded, the tab shows its name (or the last part of `tab_ref`) and no content.
- A shared tab can itself use `tab_ref` (up to five steps). A chain that leads back to where it started, also through a deck inside the shared tab, is stopped and the tab says so. A missing dashboard or tab, or a malformed `tab_ref`, shows a warning in the tab with the reason.
- In the editor, **Shared tab from another dashboard** sets it.

## In the visual editor

Both stay in your YAML as written. The editor shows each tab's own keys and keeps `use`, `vars`, `tab_defaults` and `tab_templates` untouched when you edit other fields. Tabs filled from a template show the template's card only on the dashboard.
