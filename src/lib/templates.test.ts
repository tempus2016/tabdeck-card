import { describe, it, expect, vi } from "vitest";
import { isTemplate, TemplateRenderer, type SubscribeFn } from "./templates";

describe("isTemplate", () => {
  it("detects {{ }} and {% %} markers", () => {
    expect(isTemplate("{{ states('sensor.x') }}")).toBe(true);
    expect(isTemplate("{% if true %}1{% endif %}")).toBe(true);
  });
  it("treats plain strings and entity ids as non-templates", () => {
    expect(isTemplate("sensor.unread")).toBe(false);
    expect(isTemplate("5")).toBe(false);
    expect(isTemplate(undefined as any)).toBe(false);
  });
});

// A controllable fake subscribe adapter: records subscriptions and lets the
// test push results/errors and observe unsubscribes.
function fakeSubscribe() {
  const subs = new Map<string, any>();
  const subscribe: SubscribeFn = (template, onResult, onError) => {
    const unsub = vi.fn();
    subs.set(template, { onResult, onError, unsub });
    return unsub;
  };
  return { subscribe, subs };
}

describe("TemplateRenderer", () => {
  it("subscribes to each tracked template once", () => {
    const { subscribe, subs } = fakeSubscribe();
    const r = new TemplateRenderer(subscribe);
    r.track(["{{ a }}", "{{ b }}", "{{ a }}"]);
    expect([...subs.keys()].sort()).toEqual(["{{ a }}", "{{ b }}"]);
  });

  it("caches results and reports them via result()", () => {
    const { subscribe, subs } = fakeSubscribe();
    const r = new TemplateRenderer(subscribe);
    r.track(["{{ a }}"]);
    expect(r.result("{{ a }}")).toBeUndefined();
    subs.get("{{ a }}")!.onResult("42");
    expect(r.result("{{ a }}")).toBe("42");
  });

  it("emits a change event when a result arrives", () => {
    const { subscribe, subs } = fakeSubscribe();
    const r = new TemplateRenderer(subscribe);
    const onChange = vi.fn();
    r.addEventListener("change", onChange);
    r.track(["{{ a }}"]);
    subs.get("{{ a }}")!.onResult("x");
    expect(onChange).toHaveBeenCalled();
  });

  it("boolean() is fail-closed until a truthy result renders", () => {
    const { subscribe, subs } = fakeSubscribe();
    const r = new TemplateRenderer(subscribe);
    r.track(["{{ a }}"]);
    expect(r.boolean("{{ a }}")).toBe(false); // pending
    subs.get("{{ a }}")!.onResult(true);
    expect(r.boolean("{{ a }}")).toBe(true);
    subs.get("{{ a }}")!.onResult("off");
    expect(r.boolean("{{ a }}")).toBe(false); // HA renders booleans as "off"/"on" strings
    subs.get("{{ a }}")!.onResult("on");
    expect(r.boolean("{{ a }}")).toBe(true);
  });

  it("treats errors as fail-closed", () => {
    const { subscribe, subs } = fakeSubscribe();
    const r = new TemplateRenderer(subscribe);
    r.track(["{{ bad }}"]);
    subs.get("{{ bad }}")!.onResult(true);
    expect(r.boolean("{{ bad }}")).toBe(true);
    subs.get("{{ bad }}")!.onError();
    expect(r.boolean("{{ bad }}")).toBe(false);
    expect(r.result("{{ bad }}")).toBeUndefined();
  });

  it("unsubscribes templates dropped from the tracked set", () => {
    const { subscribe, subs } = fakeSubscribe();
    const r = new TemplateRenderer(subscribe);
    r.track(["{{ a }}", "{{ b }}"]);
    const aUnsub = subs.get("{{ a }}")!.unsub;
    r.track(["{{ b }}"]);
    expect(aUnsub).toHaveBeenCalledTimes(1);
    expect(r.result("{{ a }}")).toBeUndefined();
  });

  it("destroy() unsubscribes everything", () => {
    const { subscribe, subs } = fakeSubscribe();
    const r = new TemplateRenderer(subscribe);
    r.track(["{{ a }}", "{{ b }}"]);
    const unsubs = [...subs.values()].map((s) => s.unsub);
    r.destroy();
    for (const u of unsubs) expect(u).toHaveBeenCalledTimes(1);
  });
});
