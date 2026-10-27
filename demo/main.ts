import "./mock-cards";
import "../src/tabdeck-card";
import { parse } from "yaml";
import { MockHass } from "./mock-hass";
import { EXAMPLES } from "./examples";

const hass = new MockHass();
const $ = <T extends HTMLElement>(sel: string) => document.querySelector(sel) as T;

const stage = $("#stage");
const yamlBox = $<HTMLTextAreaElement>("#yaml");
const errorBox = $("#error");
const picker = $("#examples");

let card: any;
let latest: any;

function mount(config: any): void {
  card?.remove();
  card = document.createElement("tabdeck-card");
  card.setConfig(config);
  if (latest) card.hass = latest;
  stage.appendChild(card);
}

function apply(text: string): void {
  try {
    const config = parse(text);
    if (!config || typeof config !== "object") throw new Error("Paste a card config (YAML).");
    mount(config);
    errorBox.textContent = "";
    errorBox.hidden = true;
  } catch (e: any) {
    errorBox.textContent = String(e?.message ?? e);
    errorBox.hidden = false;
  }
}

function load(id: string): void {
  const ex = EXAMPLES.find((x) => x.id === id) ?? EXAMPLES[0];
  yamlBox.value = ex.yaml;
  for (const b of picker.querySelectorAll("button")) b.classList.toggle("active", b.dataset.id === ex.id);
  history.replaceState(null, "", `#${ex.id}`);
  apply(ex.yaml);
}

for (const ex of EXAMPLES) {
  const b = document.createElement("button");
  b.textContent = ex.title;
  b.dataset.id = ex.id;
  b.addEventListener("click", () => load(ex.id));
  picker.appendChild(b);
}

let timer: ReturnType<typeof setTimeout> | undefined;
yamlBox.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => apply(yamlBox.value), 350);
});

hass.subscribe((h) => {
  latest = h;
  if (card) card.hass = h;
  for (const input of document.querySelectorAll<HTMLInputElement>("[data-entity]")) {
    input.checked = h.states[input.dataset.entity!]?.state === "on";
  }
});

for (const input of document.querySelectorAll<HTMLInputElement>("[data-entity]")) {
  input.addEventListener("change", () => hass.set(input.dataset.entity!, input.checked ? "on" : "off"));
}

$<HTMLInputElement>("#dark").addEventListener("change", (e) => {
  document.documentElement.classList.toggle("light", !(e.target as HTMLInputElement).checked);
});

for (const b of document.querySelectorAll<HTMLButtonElement>("[data-width]")) {
  b.addEventListener("click", () => {
    stage.style.maxWidth = b.dataset.width!;
    for (const o of document.querySelectorAll("[data-width]")) o.classList.toggle("active", o === b);
  });
}

load(location.hash.slice(1));
