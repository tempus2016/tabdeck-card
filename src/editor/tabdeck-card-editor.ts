import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fireEvent } from "custom-card-helpers";
import type { HomeAssistant } from "../types";
import { normalizeConfig, type TabdeckCardConfig } from "../lib/config";

@customElement("tabdeck-card-editor")
export class TabdeckCardEditor extends LitElement {
  @state() private _config?: TabdeckCardConfig;
  // Index of the tab whose card JSON failed to parse, so we can show an error
  // without discarding what the user is typing.
  @state() private _cardError: number | null = null;
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

  private _editCardJson(index: number, raw: string): void {
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      this._cardError = index;
      return;
    }
    this._cardError = null;
    this._patchTab(index, { card: parsed });
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
          <label
            >Default tab
            <select
              class="global-default-tab"
              @change=${(e: any) => this._patch({ default_tab: e.target.value })}
            >
              ${cfg.tabs.map((t, i) => {
                const value = t.name ?? String(i);
                return html`<option
                  value=${value}
                  ?selected=${String(cfg.default_tab) === value || cfg.default_tab === i}
                >
                  ${t.name || `Tab ${i + 1}`}
                </option>`;
              })}
            </select>
          </label>
          <label
            >Scrollable
            <select
              @change=${(e: any) =>
                this._patch({
                  scrollable:
                    e.target.value === "auto" ? "auto" : e.target.value === "true",
                })}
            >
              ${["auto", "true", "false"].map(
                (s) => html`<option value=${s} ?selected=${String(cfg.scrollable) === s}>${s}</option>`,
              )}
            </select>
          </label>
          <label class="checkbox"
            ><input
              class="global-lazy"
              type="checkbox"
              .checked=${cfg.lazy}
              @change=${(e: any) => this._patch({ lazy: e.target.checked })}
            />
            Lazy-mount inactive tabs
          </label>
        </div>

        <div class="tabs">
          ${cfg.tabs.map(
            (tab, index) => html`
              <div class="tab">
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
                <div class="tab-row">
                  <input
                    class="tab-accent"
                    type="text"
                    .value=${tab.accent ?? ""}
                    placeholder="Accent colour (e.g. #ff9800)"
                    @input=${(e: any) =>
                      this._patchTab(index, { accent: e.target.value || undefined })}
                  />
                  <input
                    class="tab-badge"
                    type="text"
                    .value=${tab.badge ?? ""}
                    placeholder="Badge entity (e.g. sensor.unread)"
                    @input=${(e: any) =>
                      this._patchTab(index, { badge: e.target.value || undefined })}
                  />
                </div>
                <label class="card-label"
                  >Card (JSON)
                  <textarea
                    class="tab-card-json"
                    rows="6"
                    .value=${JSON.stringify(tab.card ?? {}, null, 2)}
                    @change=${(e: any) => this._editCardJson(index, e.target.value)}
                  ></textarea>
                </label>
                ${this._cardError === index
                  ? html`<div class="tab-card-error">Invalid JSON — not saved.</div>`
                  : ""}
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
    label.checkbox {
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }
    .tab {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      margin-bottom: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
    }
    .tab-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tab-name,
    .tab-accent,
    .tab-badge {
      flex: 1;
    }
    .card-label {
      font-size: 12px;
      gap: 4px;
    }
    .tab-card-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-card-error {
      color: var(--error-color, #b00020);
      font-size: 12px;
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
