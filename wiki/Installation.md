# Installation

## HACS (recommended)

1. In Home Assistant, open **HACS → Frontend**.
2. Use the menu (⋮) → **Custom repositories**, add `https://github.com/tempus2016/tabdeck-card` with category **Lovelace**.
3. Search for **Tabdeck Card** and install it.
4. HACS adds the resource automatically. If not, add it under **Settings → Dashboards → ⋮ → Resources**:
   - URL: `/hacsfiles/tabdeck-card/tabdeck-card.js`
   - Type: **JavaScript Module**

## Manual

1. Download `tabdeck-card.js` from the [latest release](https://github.com/tempus2016/tabdeck-card/releases).
2. Copy it to `<config>/www/tabdeck-card.js`.
3. Add the resource under **Settings → Dashboards → ⋮ → Resources**:
   - URL: `/local/tabdeck-card.js`
   - Type: **JavaScript Module**
4. Hard-refresh your browser (the card is cached by the browser).

## Verify

Add a card in YAML mode:

```yaml
type: custom:tabdeck-card
tabs:
  - name: Hello
    card:
      type: markdown
      content: It works!
```

If the card renders with a single "Hello" tab, you're set. Continue to **[Getting Started](Getting-Started)**.
