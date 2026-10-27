// Like Lit's @customElement, but a no-op when the name is already taken.
// The visual editor is a separate, self-contained file that bundles its own
// copy of the tab bar (for its preview); when it loads, the card's copy is
// already registered and is the one that gets used.
export const defineOnce =
  (name: string) =>
  (cls: CustomElementConstructor): void => {
    if (!customElements.get(name)) customElements.define(name, cls);
  };
