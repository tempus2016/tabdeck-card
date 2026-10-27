// Stand-ins for Home Assistant's frontend pieces the card relies on: ha-icon
// (real MDI icons), loadCardHelpers().createCardElement, and simple versions
// of common Lovelace cards, enough to show Tabdeck working.
import { LitElement, html, css, svg, nothing } from "lit";
// The full MDI set is large, so it loads after first paint; icons fill in
// once it arrives (any mdi: icon typed into the YAML box works).
let ICONS: Record<string, string> = {};
const waiting = new Set<HaIcon>();
void import("@mdi/js").then((m) => {
  ICONS = m as unknown as Record<string, string>;
  for (const el of waiting) el.requestUpdate();
  waiting.clear();
});

// "mdi:garage-open" → mdiGarageOpen
function iconPath(icon?: string): string | undefined {
  if (!icon?.startsWith("mdi:")) return undefined;
  const name = "mdi" + icon.slice(4).split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  return ICONS[name];
}

class HaIcon extends LitElement {
  static properties = { icon: {} };
  // `declare` so the field doesn't shadow Lit's reactive accessor.
  declare icon?: string;
  render() {
    if (!ICONS.mdiHelpCircleOutline) {
      waiting.add(this);
      return html`<svg viewBox="0 0 24 24" aria-hidden="true"></svg>`;
    }
    const path = iconPath(this.icon) ?? ICONS.mdiHelpCircleOutline;
    return html`<svg viewBox="0 0 24 24" aria-hidden="true">${svg`<path d=${path}></path>`}</svg>`;
  }
  static styles = css`
    :host {
      display: inline-flex;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      fill: currentColor;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `;
}
customElements.define("ha-icon", HaIcon);

const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  climate: "mdi:thermostat",
  sensor: "mdi:eye",
  media_player: "mdi:speaker",
  person: "mdi:account",
  binary_sensor: "mdi:door",
  lock: "mdi:lock",
  alarm_control_panel: "mdi:shield-home",
  input_boolean: "mdi:toggle-switch",
  weather: "mdi:weather-partly-cloudy",
};

const fmtState = (st: any): string => {
  if (!st) return "unavailable";
  const unit = st.attributes?.unit_of_measurement;
  const num = Number(st.state);
  const v = Number.isFinite(num) && st.state.includes(".") ? num.toFixed(1) : st.state.replace(/_/g, " ");
  return unit ? `${v} ${unit}` : v;
};

class DemoCard extends LitElement {
  static properties = { config: { attribute: false }, hass: { attribute: false } };
  declare config: any;
  declare hass: any;

  getCardSize() {
    return 3;
  }

  private _st(id: string) {
    return this.hass?.states?.[id];
  }

  private _toggle(id: string) {
    const domain = id.split(".")[0];
    if (["light", "input_boolean", "switch"].includes(domain)) {
      this.hass?.callService(domain, "toggle", { entity_id: id });
    }
  }

  private _row(id: string) {
    const st = this._st(id);
    const domain = id.split(".")[0];
    const on = st?.state === "on";
    return html`<div class="row">
      <ha-icon class=${on ? "on" : ""} .icon=${st?.attributes?.icon ?? DOMAIN_ICONS[domain] ?? "mdi:circle-outline"}></ha-icon>
      <span class="name">${st?.attributes?.friendly_name ?? id}</span>
      ${["light", "input_boolean", "switch"].includes(domain)
        ? html`<button class="switch ${on ? "on" : ""}" @click=${() => this._toggle(id)} aria-label="toggle"></button>`
        : html`<span class="state">${fmtState(st)}</span>`}
    </div>`;
  }

  render() {
    const c = this.config ?? {};
    const type = String(c.type ?? "");
    const title = c.title ? html`<div class="title">${c.title}</div>` : nothing;
    const ent = (c.entity ?? (Array.isArray(c.entities) ? c.entities[0] : undefined)) as string | undefined;
    const st = ent ? this._st(typeof ent === "string" ? ent : (ent as any).entity) : undefined;
    switch (type) {
      case "markdown":
        return html`<div class="card">${title}<div class="md">${String(c.content ?? "").trim()}</div></div>`;
      case "entities":
      case "glance":
        return html`<div class="card">
          ${title}${(c.entities ?? []).map((e: any) => this._row(typeof e === "string" ? e : e.entity))}
        </div>`;
      case "tile":
      case "light":
      case "button":
        return html`<div class="card">${this._row(c.entity)}</div>`;
      case "thermostat":
        return html`<div class="card center">
          <div class="dial">
            <div class="big">${st?.attributes?.current_temperature ?? "–"}°</div>
            <div class="sub">${st?.attributes?.friendly_name ?? c.entity} · target ${st?.attributes?.temperature ?? "–"}° · ${st?.state}</div>
          </div>
        </div>`;
      case "media-control":
        return html`<div class="card media">
          <ha-icon .icon=${st?.attributes?.device_class === "tv" ? "mdi:television" : "mdi:speaker"}></ha-icon>
          <div>
            <div class="name">${st?.attributes?.friendly_name ?? c.entity}</div>
            <div class="sub">${st?.attributes?.media_title ?? ""} · ${st?.state ?? ""}</div>
          </div>
        </div>`;
      case "weather-forecast":
        return html`<div class="card media">
          <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>
          <div>
            <div class="big">${st?.attributes?.temperature ?? "–"}°</div>
            <div class="sub">Partly cloudy · humidity ${st?.attributes?.humidity ?? "–"}%</div>
          </div>
        </div>`;
      case "sensor":
      case "history-graph":
      case "statistics-graph":
        return html`<div class="card">
          ${title}<div class="name">${st?.attributes?.friendly_name ?? ent ?? "History"}</div>
          <div class="big">${fmtState(st)}</div>
          <svg class="spark" viewBox="0 0 100 24" preserveAspectRatio="none">
            ${svg`<polyline points="0,18 10,14 20,16 30,9 40,12 50,6 60,10 70,8 80,13 90,7 100,9"></polyline>`}
          </svg>
        </div>`;
      case "map":
        return html`<div class="card map"><ha-icon icon="mdi:map-marker"></ha-icon><span>Map</span></div>`;
      case "picture-entity":
      case "picture-glance":
      case "picture":
        return html`<div class="card picture"><ha-icon icon="mdi:cctv"></ha-icon><span>${st?.attributes?.friendly_name ?? ent ?? "Camera"}</span></div>`;
      case "alarm-panel":
        return html`<div class="card center"><ha-icon class="huge" icon="mdi:shield-home"></ha-icon><div class="sub">${st?.state ?? "disarmed"}</div></div>`;
      case "vertical-stack":
      case "horizontal-stack":
      case "grid": {
        const cols = type === "horizontal-stack" ? (c.cards ?? []).length : type === "grid" ? (c.columns ?? 2) : 1;
        return html`<div class="stack" style="grid-template-columns:repeat(${cols}, minmax(0, 1fr))">
          ${(c.cards ?? []).map((cc: any) => html`<demo-card .config=${cc} .hass=${this.hass}></demo-card>`)}
        </div>`;
      }
      case "custom:tabdeck-card": {
        const el = document.createElement("tabdeck-card") as any;
        el.setConfig(c);
        el.hass = this.hass;
        return html`${el}`;
      }
      default:
        return html`<div class="card center"><div class="sub">${type || "card"}</div></div>`;
    }
  }

  static styles = css`
    :host {
      display: block;
    }
    .card {
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 12px 16px;
      color: var(--primary-text-color);
    }
    .title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 16px;
      min-height: 40px;
    }
    .row ha-icon {
      color: var(--state-icon-color, #44739e);
    }
    .row ha-icon.on {
      color: #ffc107;
    }
    .name {
      flex: 1;
    }
    .state,
    .sub {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .switch {
      width: 36px;
      height: 20px;
      border-radius: 10px;
      border: none;
      background: var(--divider-color);
      position: relative;
      cursor: pointer;
    }
    .switch::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #fff;
      transition: left 0.15s;
    }
    .switch.on {
      background: var(--primary-color);
    }
    .switch.on::after {
      left: 19px;
    }
    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 120px;
      gap: 6px;
    }
    .big {
      font-size: 34px;
      font-weight: 300;
      text-align: center;
    }
    .dial {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 8px solid var(--primary-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 12px;
      box-sizing: border-box;
    }
    .media {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .media ha-icon {
      --mdc-icon-size: 40px;
      color: var(--primary-color);
    }
    .huge {
      --mdc-icon-size: 56px;
      color: var(--primary-color);
    }
    .spark {
      width: 100%;
      height: 40px;
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 1.5;
    }
    .map,
    .picture {
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--secondary-text-color);
      background: repeating-linear-gradient(45deg, transparent 0 12px, color-mix(in srgb, var(--divider-color) 50%, transparent) 12px 13px),
        var(--card-background-color);
    }
    .stack {
      display: grid;
      gap: 8px;
    }
  `;
}
customElements.define("demo-card", DemoCard);

(window as any).loadCardHelpers = async () => ({
  createCardElement: (config: any) => {
    const el = document.createElement("demo-card") as any;
    el.config = config;
    return el;
  },
});
