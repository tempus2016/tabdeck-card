# YAML autocomplete (JSON schema)

Tabdeck publishes a JSON schema of every option, so a code editor can suggest option names, show what each one does and underline typos as you write a deck in YAML.

**Schema URL:** `https://tempus2016.github.io/tabdeck-card/schema/tabdeck-card.schema.json`

It works in VS Code with the **YAML** extension (by Red Hat), and in the **Studio Code Server** add-on, which is VS Code in Home Assistant.

## A file with one deck

If your dashboard is in YAML mode and you keep a deck in its own file (pulled in with `!include`), put this line at the top of that file:

```yaml
# yaml-language-server: $schema=https://tempus2016.github.io/tabdeck-card/schema/tabdeck-card.schema.json
type: custom:tabdeck-card
tabs:
  - name: Lights
    separator: line    # suggested, with its description
    card: { ... }
```

## Several files at once

To use the schema for every file in a folder without adding the line to each, map it in VS Code's settings (`settings.json`):

```json
{
  "yaml.schemas": {
    "https://tempus2016.github.io/tabdeck-card/schema/tabdeck-card.schema.json": "dashboards/tabdeck/*.yaml"
  }
}
```

## Notes

- The schema describes one Tabdeck card. A whole dashboard file has views and other cards in it, so the schema can't be applied to it as a whole.
- Unknown keys are flagged, which catches typos such as `sparator:`. Options that also accept a template (tab `name`, `icon`, `badge` and others) accept any text.
- The cards inside tabs are only checked for having a `type`. The schema doesn't know other cards' options.
- The visual editor in Home Assistant doesn't use the schema. It has its own fields.
