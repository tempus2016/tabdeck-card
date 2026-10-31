import { describe, it, expect } from "vitest";
import { explainConditions, conditionsSignature } from "./explain";

const hass: any = {
  states: {
    "input_boolean.guest": { state: "off" },
    "sensor.temp": { state: "21.5" },
  },
  user: { id: "u1" },
};

describe("explainConditions", () => {
  it("reports each condition with its result and current value", () => {
    const r = explainConditions(
      [
        { condition: "state", entity: "input_boolean.guest", state: "on" },
        { condition: "numeric_state", entity: "sensor.temp", above: 18, below: 26 },
      ],
      hass,
    );
    expect(r.met).toBe(false);
    expect(r.items[0]).toMatchObject({ type: "state", met: false, entity: "input_boolean.guest", current: "off", expected: ["on"], negate: false });
    expect(r.items[1]).toMatchObject({ type: "numeric_state", met: true, current: "21.5", above: 18, below: 26 });
  });

  it("handles state_not, missing entities and users", () => {
    const r = explainConditions(
      [
        { condition: "state", entity: "input_boolean.guest", state_not: ["on", "unavailable"] },
        { condition: "state", entity: "light.ghost", state: "on" },
        { condition: "user", users: ["u1", "u2"] },
      ],
      hass,
    );
    expect(r.items[0]).toMatchObject({ met: true, negate: true, expected: ["on", "unavailable"] });
    expect(r.items[1]).toMatchObject({ met: false, missing: true });
    expect(r.items[2]).toMatchObject({ type: "user", met: true, count: 2 });
  });

  it("nests and/or/not groups", () => {
    const r = explainConditions(
      [
        {
          condition: "or",
          conditions: [
            { condition: "state", entity: "input_boolean.guest", state: "on" },
            { condition: "not", conditions: [{ condition: "state", entity: "input_boolean.guest", state: "on" }] },
          ],
        },
      ],
      hass,
    );
    expect(r.met).toBe(true);
    expect(r.items[0].type).toBe("or");
    expect(r.items[0].children![1]).toMatchObject({ type: "not", met: true });
  });

  it("marks templates pending until resolved", () => {
    const tpl = "{{ true }}";
    const pending = explainConditions([{ condition: "template", value_template: tpl }], hass, () => undefined);
    expect(pending.items[0]).toMatchObject({ type: "template", met: false, pending: true });
    const done = explainConditions([{ condition: "template", value_template: tpl }], hass, () => true);
    expect(done.items[0]).toMatchObject({ met: true, pending: false });
  });

  it("an empty list is met", () => {
    expect(explainConditions(undefined, hass).met).toBe(true);
    expect(explainConditions([], hass).items).toEqual([]);
  });

  it("signature changes only when a result or current value changes", () => {
    const conds = [{ condition: "state", entity: "input_boolean.guest", state: "on" }];
    const a = conditionsSignature(explainConditions(conds, hass));
    const b = conditionsSignature(explainConditions(conds, { ...hass, states: { ...hass.states } }));
    expect(a).toBe(b);
    const c = conditionsSignature(
      explainConditions(conds, { ...hass, states: { ...hass.states, "input_boolean.guest": { state: "on" } } }),
    );
    expect(c).not.toBe(a);
  });

  it("reports the entity of a core-style entity_id condition", () => {
    const r = explainConditions([{ condition: "state", entity_id: "input_boolean.guest", state: "on" }], hass);
    expect(r.items[0]).toMatchObject({ met: false, entity: "input_boolean.guest", current: "off", missing: false });
  });
});
