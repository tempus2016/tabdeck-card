// share_button: a direct link to the open tab, using the `#tab=<slug>` deep
// links, copied to the clipboard (and shown as a QR code with "qr").
import { slugify } from "./persistence";

export type ShareMode = "link" | "qr";

export function normalizeShare(raw: any): ShareMode | undefined {
  if (raw === true) return "link";
  if (raw === "qr" || (raw && typeof raw === "object" && raw.qr)) return "qr";
  return undefined;
}

// This page's address with the hash replaced by #tab=<slug> (or the tab's
// index when its name has nothing to slug).
export function shareUrl(
  loc: { origin: string; pathname: string; search: string },
  name: string | undefined,
  index: number,
): string {
  const slug = name ? slugify(name) : "";
  return `${loc.origin}${loc.pathname}${loc.search}#tab=${slug || index}`;
}

// The async clipboard API only exists on https (or localhost); on plain
// http a selected, off-screen text area and execCommand("copy") still work.
export async function copyText(
  text: string,
  env: { clipboard?: Clipboard; secure?: boolean } = {
    clipboard: typeof navigator !== "undefined" ? navigator.clipboard : undefined,
    secure: typeof window !== "undefined" && window.isSecureContext,
  },
): Promise<boolean> {
  if (env.secure && env.clipboard?.writeText) {
    try {
      await env.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to the text area */
    }
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}
