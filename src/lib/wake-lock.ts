// keep_awake: hold a Screen Wake Lock while a chosen tab is open. Browsers
// only offer it in a secure context (https or localhost); anywhere else, or
// when the request is refused, nothing happens apart from a debug log line.
// The browser drops the lock when the page is hidden; set(true) again on
// visibilitychange takes it back.
export class WakeLock {
  private _want = false;
  private _sentinel?: any;
  private _pending = false;

  get held(): boolean {
    return !!this._sentinel;
  }

  set(want: boolean): void {
    this._want = want;
    if (!want) {
      const s = this._sentinel;
      this._sentinel = undefined;
      void s?.release?.()?.catch?.(() => {});
      return;
    }
    if (this._sentinel || this._pending || (typeof document !== "undefined" && document.visibilityState === "hidden")) return;
    const api = typeof navigator !== "undefined" ? (navigator as any).wakeLock : undefined;
    if (!api?.request) {
      console.debug("tabdeck-card: keep_awake needs the Screen Wake Lock API (https or localhost)");
      return;
    }
    this._pending = true;
    Promise.resolve()
      .then(() => api.request("screen"))
      .then((s: any) => {
        if (!this._want) return void s.release?.();
        this._sentinel = s;
        s.addEventListener?.("release", () => {
          if (this._sentinel === s) this._sentinel = undefined;
        });
      })
      .catch((err: any) => console.debug("tabdeck-card: keep_awake refused:", err?.message ?? err))
      .finally(() => {
        this._pending = false;
      });
  }
}
