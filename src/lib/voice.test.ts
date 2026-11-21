/// <reference types="vite/client" />
// The ready-made Assist intents in voice/: every intent the sentences define
// has an intent_script that fires tabdeck_select with a slot the sentences fill.
import { describe, it, expect } from "vitest";
import { parse } from "yaml";
import sentencesText from "../../voice/custom_sentences/en/tabdeck.yaml?raw";
import scriptText from "../../voice/intent_script.yaml?raw";
import { remoteStep } from "./remote-keywords";

const sentences = parse(sentencesText);
const scripts = parse(scriptText).intent_script;

describe("voice intents", () => {
  it("is English and defines intents", () => {
    expect(sentences.language).toBe("en");
    expect(Object.keys(sentences.intents).sort()).toEqual(["TabdeckShowTab", "TabdeckStep"]);
  });

  it("each intent has a script that fires tabdeck_select", () => {
    for (const intent of Object.keys(sentences.intents)) {
      const action = scripts[intent]?.action?.[0];
      expect(action?.event, intent).toBe("tabdeck_select");
      expect(typeof action.event_data.tab).toBe("string");
    }
  });

  it("every slot a script uses is a list the sentences declare", () => {
    for (const intent of Object.keys(scripts)) {
      const used = JSON.stringify(scripts[intent]).match(/\{\{\s*(\w+)/g)?.map((m) => m.replace(/\W/g, "")) ?? [];
      for (const slot of used) expect(Object.keys(sentences.lists), `${intent} ${slot}`).toContain(slot);
    }
  });

  it("every step the sentences produce is a word the card understands", () => {
    const outs = sentences.lists.tabdeck_step.values.map((v: any) => v.out);
    const fixed = sentences.intents.TabdeckStep.data.flatMap((d: any) => (d.slots?.tabdeck_step ? [d.slots.tabdeck_step] : []));
    for (const step of [...outs, ...fixed]) expect(remoteStep(step), step).toBeDefined();
  });
});
