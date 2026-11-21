// "Export as a dashboard view": turn a deck into a Home Assistant sections
// view, one section per tab (a heading, then the tab's cards), for people
// who'd rather have the tabs as a plain dashboard page.

import type { TabdeckCardConfig, TabdeckTabConfig } from "./config";
import { autoContentCard } from "./smart";

export interface ExportResult {
  view: Record<string, any>;
  // Tabs left out (action tabs) and things that don't carry over exactly
  // (translation keys).
  skipped: string[];
  notes: string[];
}

const plainText = (v?: string) => (v && !/\{[{%]/.test(v) ? v : undefined);

// The cards a tab shows, unwrapped from the stack Tabdeck builds for `cards:`.
function tabCards(tab: TabdeckTabConfig, hass: any): any[] {
  const card = tab.card;
  if (!card?.type) {
    const auto = autoContentCard(tab, hass);
    return auto ? (auto.type === "grid" ? auto.cards : [auto]) : [];
  }
  if (card.type === "vertical-stack" || card.type === "custom:tabdeck-masonry-card") return card.cards ?? [];
  return [card];
}

function hasTemplates(conds: any[] | undefined): boolean {
  return (conds ?? []).some(
    (c) => c?.condition === "template" || c?.condition === "time" || hasTemplates(c?.conditions),
  );
}

export function deckToSectionsView(cfg: TabdeckCardConfig, hass?: any, title = "Tabdeck"): ExportResult {
  const sections: any[] = [];
  const skipped: string[] = [];
  const notes = new Set<string>();
  cfg.tabs.forEach((tab, i) => {
    const name = plainText(tab.name) ?? `Tab ${i + 1}`;
    if (tab.tap_action && !tab.card?.type) {
      skipped.push(name);
      return;
    }
    if (tab.name && !plainText(tab.name)) notes.add("export.note.templates");
    if (tab.pin) notes.add("export.note.pin");
    const heading = { type: "heading", heading: name, heading_style: "title", ...(plainText(tab.icon) ? { icon: tab.icon } : {}) };
    const visibility = tab.visibility?.length ? { visibility: tab.visibility } : {};
    if (hasTemplates(tab.visibility)) notes.add("export.note.conditions");
    if (tab.card?.type === "custom:tabdeck-sections-card") {
      // A tab that's already laid out in sections: keep its sections, the
      // first one headed by the tab name.
      (tab.card.sections ?? []).forEach((s: any, k: number) => {
        sections.push({ type: "grid", ...s, cards: k === 0 ? [heading, ...(s.cards ?? [])] : s.cards ?? [], ...visibility });
      });
      return;
    }
    if (tab.card?.type === "custom:tabdeck-card") notes.add("export.note.groups");
    sections.push({ type: "grid", cards: [heading, ...tabCards(tab, hass)], ...visibility });
  });
  if (cfg.auto_tabs) notes.add("export.note.auto_tabs");
  return {
    view: { title, type: "sections", max_columns: 4, sections },
    skipped,
    notes: [...notes],
  };
}
