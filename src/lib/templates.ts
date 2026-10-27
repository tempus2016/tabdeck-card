// Server-side Jinja template rendering for badges and visibility conditions.
// Home Assistant renders templates over the websocket (`render_template`), so
// results arrive asynchronously. This module owns the subscription bookkeeping
// and caches the latest rendered value per template, fail-closed until rendered.

export type SubscribeFn = (
  template: string,
  onResult: (result: any) => void,
  onError: () => void,
) => () => void;

// A SubscribeFn over Home Assistant's `render_template` websocket command.
// `getHass` is read per call so a replaced connection is picked up.
export function makeHassSubscribe(getHass: () => any): SubscribeFn {
  return (template, onResult, onError) => {
    const conn = getHass()?.connection;
    if (!conn?.subscribeMessage) {
      onError();
      return () => {};
    }
    let unsubbed = false;
    let realUnsub: (() => void) | undefined;
    Promise.resolve(
      conn.subscribeMessage(
        (msg: any) => {
          if (msg && msg.error !== undefined) onError();
          else onResult(msg?.result);
        },
        { type: "render_template", template, report_errors: true },
      ),
    )
      .then((u: any) => {
        realUnsub = u;
        if (unsubbed) u?.();
      })
      .catch(() => onError());
    return () => {
      unsubbed = true;
      realUnsub?.();
    };
  };
}

export function isTemplate(s: unknown): s is string {
  return typeof s === "string" && (s.includes("{{") || s.includes("{%"));
}

// Mirrors Home Assistant's `result_as_boolean`: booleans pass through, numbers
// are truthy when non-zero, strings match HA's truthy token set.
function asBool(value: any): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    return ["1", "true", "yes", "on", "enable"].includes(value.trim().toLowerCase());
  }
  return false;
}

interface Entry {
  unsub: () => void;
  result?: any;
  hasResult: boolean;
  error: boolean;
}

export class TemplateRenderer extends EventTarget {
  private _subscribe: SubscribeFn;
  private _entries = new Map<string, Entry>();

  constructor(subscribe: SubscribeFn) {
    super();
    this._subscribe = subscribe;
  }

  // Reconcile live subscriptions with the desired set of template strings.
  track(templates: string[]): void {
    const desired = new Set(templates.filter((t) => !!t));

    for (const [tpl, entry] of this._entries) {
      if (!desired.has(tpl)) {
        entry.unsub();
        this._entries.delete(tpl);
      }
    }

    for (const tpl of desired) {
      if (this._entries.has(tpl)) continue;
      const entry: Entry = { unsub: () => {}, hasResult: false, error: false };
      this._entries.set(tpl, entry);
      entry.unsub = this._subscribe(
        tpl,
        (result) => {
          entry.result = result;
          entry.hasResult = true;
          entry.error = false;
          this.dispatchEvent(new CustomEvent("change", { detail: { template: tpl } }));
        },
        () => {
          entry.error = true;
          entry.hasResult = false;
          entry.result = undefined;
          this.dispatchEvent(new CustomEvent("change", { detail: { template: tpl } }));
        },
      );
    }
  }

  // Latest rendered value, or undefined while pending or errored.
  result(tpl: string): any {
    const e = this._entries.get(tpl);
    if (!e || e.error || !e.hasResult) return undefined;
    return e.result;
  }

  // Fail-closed boolean: false until a truthy value has rendered.
  boolean(tpl: string): boolean {
    const e = this._entries.get(tpl);
    if (!e || e.error || !e.hasResult) return false;
    return asBool(e.result);
  }

  destroy(): void {
    for (const e of this._entries.values()) e.unsub();
    this._entries.clear();
  }
}
