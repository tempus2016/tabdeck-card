// One-line tab content: `view:` (another dashboard view), `url:` (a web
// page, HA's iframe card) and `markdown:` (HA's markdown card) expand into a
// full card config here, so the rest of the card never sees the shortcut.
// An explicit card / cards / sections / children wins.
import type { LovelaceCardConfig } from "../types";
import { parseViewRef } from "./view-source";

export function shortcutCard(raw: any): LovelaceCardConfig | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  if (parseViewRef(raw.view)) return { type: "custom:tabdeck-view-card", view: raw.view };
  if (typeof raw.url === "string" && raw.url.trim()) {
    const ratio = typeof raw.aspect_ratio === "string" || typeof raw.aspect_ratio === "number" ? String(raw.aspect_ratio).trim() : "";
    return { type: "iframe", url: raw.url.trim(), ...(ratio ? { aspect_ratio: ratio } : {}) };
  }
  if (typeof raw.markdown === "string" && raw.markdown.trim()) return { type: "markdown", content: raw.markdown };
  return undefined;
}

// True when the tab's card is just what its shortcut expands to (the editor
// then writes only the shortcut).
export function isShortcutCard(tab: any): boolean {
  const derived = shortcutCard(tab);
  return !!derived && JSON.stringify(derived) === JSON.stringify(tab?.card);
}
