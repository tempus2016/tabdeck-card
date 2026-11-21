// companion: the card side of the Tabdeck Companion integration (a separate
// HA custom integration). Each browser + deck registers over HA's websocket
// and gets a select entity; selecting an option there switches the deck.
// Without the integration the register call fails once and the card stays
// quiet.

import { deviceId } from "./smart";

export const COMPANION_KEY = "tabdeck-companion-id";

// What the integration accepts as a browser / deck id.
export function companionSafeId(value: unknown): string | undefined {
  const text = String(value ?? "")
    .trim()
    .replace(/[^A-Za-z0-9_.-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
  return text || undefined;
}

// This browser's id: companion_id from the config, else the Tabdeck device
// name (?tabdeck_device=…) or browser_mod's id, else a random id kept in
// localStorage. Without storage the id lasts until the page reloads.
let sessionId: string | undefined;
export function companionBrowserId(configured?: string, device: string | undefined = deviceId()): string {
  const fixed = companionSafeId(configured) ?? companionSafeId(device);
  if (fixed) return fixed;
  try {
    const stored = companionSafeId(localStorage.getItem(COMPANION_KEY));
    if (stored) return stored;
    const made = randomId();
    localStorage.setItem(COMPANION_KEY, made);
    return made;
  } catch {
    return (sessionId ??= randomId());
  }
}

function randomId(): string {
  const bytes = new Uint8Array(4);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  return "browser_" + [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// A command sent down the subscription: { command: "select", tab }.
export function companionTab(msg: unknown): string | undefined {
  const m = msg as any;
  return m && m.command === "select" && typeof m.tab === "string" ? m.tab : undefined;
}
