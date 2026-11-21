// "What's new" note in the visual editor: shown once per release, newest
// note first, until dismissed (remembered per browser). Each note is a
// translation key (editor: whatsnew.<version with _>). Add a line here and
// the strings when releasing; the version is the one the note describes.
import { version } from "../../package.json";

export const CURRENT_VERSION: string = version;

export const WHATS_NEW: string[] = ["1.6.0", "1.5.0"];

const STORE = "tabdeck-whats-new";

// Compare dotted versions numerically ("1.10.0" > "1.9.2").
export function cmpVersion(a: string, b: string): number {
  const pa = a.split(/[.-]/).map((x) => parseInt(x, 10) || 0);
  const pb = b.split(/[.-]/).map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d < 0 ? -1 : 1;
  }
  return 0;
}

// The note to show: the newest one for a version up to the running one that
// is newer than the last one dismissed.
export function pendingNote(current: string, dismissed: string | null, notes = WHATS_NEW): string | undefined {
  return notes
    .filter((v) => cmpVersion(v, current) <= 0 && (!dismissed || cmpVersion(v, dismissed) > 0))
    .sort((a, b) => cmpVersion(b, a))[0];
}

export function dismissedNote(): string | null {
  try {
    return localStorage.getItem(STORE);
  } catch {
    return null;
  }
}

export function dismissNote(v: string): void {
  try {
    localStorage.setItem(STORE, v);
  } catch {
    // Private mode / blocked storage: it shows again next time.
  }
}

export const noteKey = (v: string) => `whatsnew.${v.replace(/\./g, "_")}`;
