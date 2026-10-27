// A small fake Home Assistant for the demo page: entity states, service calls
// that change them, and a render_template stand-in for the few templates the
// demo examples use.

export interface MockState {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

type Listener = (hass: any) => void;

const s = (entity_id: string, state: string, attributes: Record<string, any> = {}): MockState => ({
  entity_id,
  state,
  attributes,
});

export function initialStates(): Record<string, MockState> {
  const list = [
    s("light.kitchen", "on", { friendly_name: "Kitchen", brightness: 200 }),
    s("light.living_room", "off", { friendly_name: "Living room" }),
    s("light.bedroom", "on", { friendly_name: "Bedroom", brightness: 90 }),
    s("light.porch", "off", { friendly_name: "Porch" }),
    s("climate.hall", "heat", { friendly_name: "Hall", current_temperature: 19.4, temperature: 21 }),
    s("climate.loft", "off", { friendly_name: "Loft", current_temperature: 16.8, temperature: 18 }),
    s("sensor.living_room_temperature", "21.46", { friendly_name: "Living room temperature", unit_of_measurement: "°C" }),
    s("sensor.outdoor_temperature", "8.2", { friendly_name: "Outdoor", unit_of_measurement: "°C" }),
    s("sensor.power", "1460", { friendly_name: "House power", unit_of_measurement: "W" }),
    s("sensor.unread_mail", "3", { friendly_name: "Unread mail" }),
    s("media_player.lounge_tv", "playing", { friendly_name: "Lounge TV", media_title: "Planet Earth", device_class: "tv" }),
    s("media_player.kitchen_speaker", "paused", { friendly_name: "Kitchen speaker", media_title: "Morning Mix" }),
    s("person.alex", "home", { friendly_name: "Alex" }),
    s("person.sam", "not_home", { friendly_name: "Sam" }),
    s("binary_sensor.front_door", "off", { friendly_name: "Front door", device_class: "door" }),
    s("binary_sensor.garage_door", "off", { friendly_name: "Garage door", device_class: "garage_door" }),
    s("lock.front_door", "locked", { friendly_name: "Front door lock" }),
    s("alarm_control_panel.home", "disarmed", { friendly_name: "Home alarm" }),
    s("input_boolean.guest_mode", "off", { friendly_name: "Guest mode" }),
    s("weather.home", "partlycloudy", { friendly_name: "Home", temperature: 8, humidity: 71 }),
  ];
  return Object.fromEntries(list.map((x) => [x.entity_id, x]));
}

// Templates used by the demo examples, evaluated against the mock states.
const TEMPLATES: Record<string, (st: Record<string, MockState>) => any> = {
  "{{ states.light | selectattr('state','eq','on') | list | count }}": (st) =>
    Object.values(st).filter((x) => x.entity_id.startsWith("light.") && x.state === "on").length,
  "{{ is_state('binary_sensor.garage_door', 'on') }}": (st) => st["binary_sensor.garage_door"]?.state === "on",
  "{{ 'mdi:garage-open' if is_state('binary_sensor.garage_door', 'on') else 'mdi:garage' }}": (st) =>
    st["binary_sensor.garage_door"]?.state === "on" ? "mdi:garage-open" : "mdi:garage",
  "{{ 'red' if is_state('binary_sensor.garage_door', 'on') else '' }}": (st) =>
    st["binary_sensor.garage_door"]?.state === "on" ? "red" : "",
};

export class MockHass {
  states = initialStates();
  private _listeners: Listener[] = [];
  private _templateSubs = new Set<{ template: string; cb: (msg: any) => void }>();
  // Lets the demo page flip between dark and light.
  themes = { darkMode: true };

  subscribe(fn: Listener): void {
    this._listeners.push(fn);
    fn(this.snapshot());
  }

  set(entity: string, state: string, attrs: Record<string, any> = {}): void {
    const cur = this.states[entity];
    if (!cur) return;
    this.states = { ...this.states, [entity]: { ...cur, state, attributes: { ...cur.attributes, ...attrs } } };
    this._publish();
  }

  toggle(entity: string): void {
    const cur = this.states[entity]?.state;
    this.set(entity, cur === "on" ? "off" : "on");
  }

  private _publish(): void {
    const h = this.snapshot();
    for (const l of this._listeners) l(h);
    for (const sub of this._templateSubs) this._render(sub);
  }

  private _render(sub: { template: string; cb: (msg: any) => void }): void {
    const fn = TEMPLATES[sub.template.trim()];
    if (fn) sub.cb({ result: fn(this.states) });
    else sub.cb({ error: "template not supported in the demo" });
  }

  // A fresh object each time, like HA's hass (cards compare by identity).
  snapshot(): any {
    return {
      states: this.states,
      language: "en",
      locale: { language: "en" },
      themes: this.themes,
      user: { id: "demo", name: "Demo", is_admin: true },
      areas: {},
      callService: (domain: string, service: string, data: any) => this._callService(domain, service, data),
      connection: {
        subscribeMessage: (cb: (msg: any) => void, msg: any) => {
          if (msg?.type !== "render_template") return Promise.resolve(() => {});
          const sub = { template: String(msg.template), cb };
          this._templateSubs.add(sub);
          queueMicrotask(() => this._render(sub));
          return Promise.resolve(() => this._templateSubs.delete(sub));
        },
      },
    };
  }

  private _callService(domain: string, service: string, data: any): void {
    const ids: string[] = [].concat(data?.entity_id ?? []);
    for (const id of ids) {
      if (service === "toggle") this.toggle(id);
      else if (service === "turn_on") this.set(id, "on");
      else if (service === "turn_off") this.set(id, "off");
      else if (domain === "lock") this.set(id, service === "unlock" ? "unlocked" : "locked");
    }
  }
}
