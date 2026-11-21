// popup: one tab of a deck opened in a dialog by a button on another card.
// The button uses HA's `fire-dom-event` action, which sends an `ll-custom`
// event carrying the action config:
//   tap_action: { action: fire-dom-event, tabdeck_popup: Cameras }
//   tap_action: { action: fire-dom-event, tabdeck_popup: { tab: Cameras, deck: hall } }
export type PopupMode = true | "hidden";

export function normalizePopup(raw: unknown): PopupMode | undefined {
  if (raw === "hidden") return "hidden";
  return raw === true || raw === "on" ? true : undefined;
}

export interface PopupRequest {
  tab: string;
  deck?: string;
}

export function popupRequest(detail: unknown): PopupRequest | undefined {
  const raw = (detail as any)?.tabdeck_popup;
  if (typeof raw === "string" || typeof raw === "number") {
    const tab = String(raw).trim();
    return tab ? { tab } : undefined;
  }
  if (raw && typeof raw === "object" && (typeof raw.tab === "string" || typeof raw.tab === "number")) {
    const tab = String(raw.tab).trim();
    if (!tab) return undefined;
    const deck = typeof raw.deck === "string" && raw.deck.trim() ? raw.deck.trim() : undefined;
    return deck ? { tab, deck } : { tab };
  }
  return undefined;
}
