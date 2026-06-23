import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("tabdeck-card-editor")
export class TabdeckCardEditor extends LitElement {
  setConfig(_config: any): void {}
  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-card-editor": TabdeckCardEditor;
  }
}
