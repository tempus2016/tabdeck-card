// Undo / redo for the visual editor: a bounded stack of whole config states.
// Changes that arrive close together (typing in a field) become one step.

export const UNDO_LIMIT = 50;

export class UndoStack<T> {
  private _past: T[] = [];
  private _future: T[] = [];
  private _at = 0;

  constructor(
    private _limit = UNDO_LIMIT,
    // Changes within this many ms of the last one join its step.
    private _mergeMs = 800,
  ) {}

  get canUndo(): boolean {
    return this._past.length > 0;
  }
  get canRedo(): boolean {
    return this._future.length > 0;
  }
  get size(): number {
    return this._past.length;
  }

  // `before` is the state the change replaces.
  record(before: T, now = Date.now()): void {
    this._future = [];
    if (this._past.length && now - this._at < this._mergeMs) {
      this._at = now;
      return;
    }
    this._at = now;
    this._past.push(before);
    if (this._past.length > this._limit) this._past.shift();
  }

  // The state to go back to (current goes on the redo stack), if any.
  undo(current: T): T | undefined {
    const prev = this._past.pop();
    if (prev === undefined) return undefined;
    this._future.push(current);
    this._at = 0;
    return prev;
  }

  redo(current: T): T | undefined {
    const next = this._future.pop();
    if (next === undefined) return undefined;
    this._past.push(current);
    this._at = 0;
    return next;
  }

  clear(): void {
    this._past = [];
    this._future = [];
    this._at = 0;
  }
}

// A short description of what changed between two configs, for the editor's
// undo line: { key, vars } (editor.undo.*).
export function changeLabel(before: any, after: any): { key: string; vars?: Record<string, string> } {
  const a: any[] = Array.isArray(before?.tabs) ? before.tabs : [];
  const b: any[] = Array.isArray(after?.tabs) ? after.tabs : [];
  const name = (t: any, i: number) => (typeof t?.name === "string" && t.name ? t.name : `#${i + 1}`);
  // Compared by value: HA hands the config back as new objects.
  const key = (t: any) => JSON.stringify(t ?? null);
  const ak = a.map(key);
  const bk = b.map(key);
  if (b.length > a.length) {
    const i = bk.findIndex((k, j) => k !== ak[j]);
    const at = i < 0 ? b.length - 1 : i;
    return { key: "editor.undo.added", vars: { name: name(b[at], at) } };
  }
  if (b.length < a.length) {
    const i = ak.findIndex((k, j) => k !== bk[j]);
    const at = i < 0 ? a.length - 1 : i;
    return { key: "editor.undo.removed", vars: { name: name(a[at], at) } };
  }
  const changed = bk.map((k, i) => (k !== ak[i] ? i : -1)).filter((i) => i >= 0);
  if (changed.length > 1 && changed.every((i) => ak.includes(bk[i]))) return { key: "editor.undo.moved" };
  if (changed.length === 1) return { key: "editor.undo.tab", vars: { name: name(b[changed[0]], changed[0]) } };
  if (changed.length > 1) return { key: "editor.undo.tabs" };
  return { key: "editor.undo.options" };
}
