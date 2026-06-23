import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fireEvent } from "custom-card-helpers";
import type { HomeAssistant } from "../types";
import { normalizeConfig, type TabdeckCardConfig } from "../lib/config";

@customElement("tabdeck-card-editor")
export class TabdeckCardEditor extends LitElement {
  @state() private _config?: TabdeckCardConfig;
  public hass?: HomeAssistant;

  setConfig(config: any): void {
    this._config = normalizeConfig(config);
  }

  private _emit(next: TabdeckCardConfig): void {
    this._config = next;
    fireEvent(this, "config-changed", { config: next } as any);
    this.requestUpdate();
  }

  private _patch(partial: Partial<TabdeckCardConfig>): void {
    if (!this._config) return;
    this._emit({ ...this._config, ...partial });
  }

  private _patchTab(index: number, partial: Record<string, any>): void {
    if (!this._config) return;
    const tabs = this._config.tabs.map((t, i) =>
      i === index ? { ...t, ...partial } : t,
    );
    this._emit({ ...this._config, tabs });
  }

  private _addTab(): void {
    if (!this._config) return;
    const tabs = [
      ...this._config.tabs,
      { name: `Tab ${this._config.tabs.length + 1}`, card: { type: "markdown", content: "" } },
    ];
    this._emit({ ...this._config, tabs });
  }

  private _deleteTab(index: number): void {
    if (!this._config) return;
    const tabs = this._config.tabs.filter((_, i) => i !== index);
    this._emit({ ...this._config, tabs });
  }

  private _move(index: number, delta: number): void {
    if (!this._config) return;
    const target = index + delta;
    if (target < 0 || target >= this._config.tabs.length) return;
    const tabs = this._config.tabs.slice();
    [tabs[index], tabs[target]] = [tabs[target], tabs[index]];
    this._emit({ ...this._config, tabs });
  }

  render() {
    if (!this._config) return html``;
    const cfg = this._config;
    return html`
      <div class="editor">
        <div class="globals">
          <label
            >Position
            <select
              .value=${cfg.position}
              @change=${(e: any) => this._patch({ position: e.target.value })}
            >
              ${["top", "bottom", "left", "right"].map(
                (p) => html`<option value=${p} ?selected=${p === cfg.position}>${p}</option>`,
              )}
            </select>
          </label>
          <label
            >Style
            <select
              .value=${cfg.style}
              @change=${(e: any) => this._patch({ style: e.target.value })}
            >
              ${["underline", "pill", "segmented"].map(
                (s) => html`<option value=${s} ?selected=${s === cfg.style}>${s}</option>`,
              )}
            </select>
          </label>
          <label
            >Remember
            <select
              .value=${cfg.remember}
              @change=${(e: any) => this._patch({ remember: e.target.value })}
            >
              ${["none", "browser", "url"].map(
                (r) => html`<option value=${r} ?selected=${r === cfg.remember}>${r}</option>`,
              )}
            </select>
          </label>
        </div>

        <div class="tabs">
          ${cfg.tabs.map(
            (tab, index) => html`
              <div class="tab-row">
                <input
                  class="tab-name"
                  type="text"
                  .value=${tab.name ?? ""}
                  placeholder="Tab name"
                  @input=${(e: any) => this._patchTab(index, { name: e.target.value })}
                />
                <input
                  class="tab-icon"
                  type="text"
                  .value=${tab.icon ?? ""}
                  placeholder="mdi:icon"
                  @input=${(e: any) => this._patchTab(index, { icon: e.target.value })}
                />
                <button class="move-up" @click=${() => this._move(index, -1)}>↑</button>
                <button class="move-down" @click=${() => this._move(index, 1)}>↓</button>
                <button class="delete-tab" @click=${() => this._deleteTab(index)}>✕</button>
              </div>
            `,
          )}
          <button class="add-tab" @click=${this._addTab}>+ Add tab</button>
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .globals {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    label {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      gap: 4px;
    }
    .tab-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tab-name {
      flex: 1;
    }
    button {
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-card-editor": TabdeckCardEditor;
  }
}
