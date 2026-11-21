// Icon suggestions from a tab's name, for the visual editor: a small keyword
// table in the editor's languages (en de es fr it nl pl pt). Keywords are
// lower case without accents, "_" for a space; ones of 4+ letters also match
// inside a word (German compounds: "Wohnzimmer", "Kinderzimmer"), shorter
// ones and ones marked "=" only as whole words.

const TABLE: [keywords: string, icons: string][] = [
  // Rooms
  ["kitchen kuche cocina cuisine cucina keuken kuchnia cozinha", "silverware-fork-knife stove fridge pot-steam coffee"],
  ["living lounge wohnzimmer salon soggiorno woonkamer salotto pokoj_dzienny sala_de_estar", "sofa television floor-lamp fireplace"],
  ["bedroom schlafzimmer dormitorio chambre camera_da_letto slaapkamer sypialnia quarto", "bed bed-king lamp alarm"],
  ["bath badezimmer bano salle_de_bain bagno badkamer lazienka banheiro toilet wc", "shower bathtub toilet water-boiler"],
  ["garage cochera garaz garagem", "garage car garage-open"],
  ["garden garten jardin giardino tuin ogrod jardim yard outdoor", "flower tree sprout watering-can"],
  ["office buro oficina bureau ufficio kantoor biuro escritorio study arbeit", "desk laptop printer briefcase"],
  ["kids kinder children ninos enfants bambini kinderen dzieci criancas nursery", "teddy-bear toy-brick human-child"],
  ["baby bebe neonato dziecko", "baby-carriage baby-bottle"],
  ["hall flur entrance entrada entree ingresso gang korytarz corredor hallway", "door coat-rack shoe-formal"],
  ["laundry waschkuche lavanderia buanderie wasruimte pralnia", "washing-machine tumble-dryer hanger"],
  ["dining esszimmer comedor salle_a_manger sala_da_pranzo eetkamer jadalnia sala_de_jantar", "silverware table-chair glass-wine"],
  ["basement keller sotano sous-sol cantina kelder piwnica cave", "stairs-down home-floor-negative-1"],
  ["attic dachboden atico grenier soffitta zolder strych sotao", "home-roof stairs-up"],
  ["guest gast invitado invite ospite gasten gosc hospede", "account-plus bed-single"],
  ["pool piscina zwembad basen", "pool"],
  ["gym fitness sport palestra silownia academia", "dumbbell run"],
  // Topics
  ["light licht luz lumiere luce verlichting swiatlo iluminacao lamp", "lightbulb lightbulb-group ceiling-light floor-lamp"],
  ["climate klima clima climat heating heizung calefaccion chauffage riscaldamento verwarming ogrzewanie aquecimento thermostat", "thermostat radiator heat-wave snowflake"],
  ["temperature temperatur temperatura temperatuur", "thermometer"],
  ["cooling aircon kuhlung refrigeracion klimatyzacja", "air-conditioner snowflake"],
  ["camera kamera camara cctv telecamer kamery", "cctv camera video"],
  ["security sicherheit seguridad securite sicurezza beveiliging bezpieczenstwo seguranca", "shield-home cctv lock alarm-light"],
  ["alarm allarme", "alarm-light shield-alert"],
  ["=door tur puerta =porte =porta deur drzwi", "door door-open lock"],
  ["lock schloss cerradura serrure serratura slot zamek fechadura", "lock lock-open"],
  ["window fenster ventana fenetre finestra raam okno janela", "window-closed-variant window-open-variant"],
  ["blind shutter cover rollladen jalousie persiana volet tapparella rolluik roleta estore", "window-shutter blinds"],
  ["energy energie energia power strom puissance stroom solar pv", "lightning-bolt solar-power flash home-battery"],
  ["water wasser agua eau acqua woda", "water water-pump water-boiler"],
  ["weather wetter tiempo meteo weer pogoda =tempo", "weather-partly-cloudy weather-sunny umbrella"],
  ["media tv fernseher television televisione telewizor televisao", "television speaker remote-tv"],
  ["music musik musica musique muziek muzyka", "music speaker spotify"],
  ["vacuum robot staubsauger aspiradora aspirateur aspirapolvere stofzuiger odkurzacz aspirador", "robot-vacuum vacuum"],
  ["calendar kalender calendario calendrier agenda kalendarz", "calendar calendar-month"],
  ["family familie familia famille famiglia rodzina people personen persone", "account-group human-male-female-child"],
  ["plant pflanze planta plante pianta plant roslin", "flower-tulip sprout leaf"],
  ["pet haustier mascota animal animale huisdier zwierze dog hund perro chien =cane hond =pies cachorro cat katze gato =chat gatto kat kot", "paw dog cat"],
  ["car =auto coche voiture macchina samochod carro", "car car-electric ev-station"],
  ["home overview zuhause ubersicht inicio accueil casa thuis overzicht dom przeglad", "home home-outline view-dashboard"],
  ["setting einstellung ajustes reglages parametres impostazioni instellingen ustawienia definicoes", "cog tune"],
  ["network netzwerk red reseau =rete netwerk siec =rede wifi internet", "wifi router-wireless lan"],
  ["battery batterie bateria batteria batterij akumulator", "battery battery-charging"],
  ["chore task aufgabe tarea tache compito taak zadanie tarefa =todo", "clipboard-check-outline broom format-list-checks"],
  ["shopping einkauf compras courses spesa boodschappen zakupy", "cart basket"],
  ["bin trash mull basura poubelle rifiuti afval smieci lixo", "trash-can delete-empty recycle"],
  ["fan ventilator ventilador ventilateur ventilatore wentylator", "fan"],
  ["air luft =aire =aria lucht powietrze ar", "air-filter weather-windy"],
  ["printer drucker impresora imprimante stampante drukarka impressora 3d", "printer printer-3d"],
  ["update aktualisierung actualizacion mise_a_jour aggiornamento aktualizacja atualizacao", "update package-up"],
  ["notification benachrichtigung notificacion notifica melding powiadomienie notificacao", "bell"],
];

const norm = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0142/g, "l");

const ENTRIES = TABLE.map(([keys, icons]) => ({
  keys: keys.split(" ").map((k) => {
    const exact = k.startsWith("=") || k.length < 4;
    return { k: k.replace(/^=/, "").replace(/_/g, " "), exact };
  }),
  icons: icons.split(" ").map((i) => `mdi:${i}`),
}));

// Up to `max` icons for a tab name, best guesses first ([] when none fit).
export function suggestIcons(name: unknown, max = 6): string[] {
  if (typeof name !== "string" || !name.trim() || name.includes("{")) return [];
  const text = norm(name);
  const words = text.split(/[^a-z0-9]+/).filter(Boolean);
  const spaced = ` ${words.join(" ")} `;
  const out: string[] = [];
  // Earlier words count first ("Kitchen lights" → kitchen icons, then lights).
  const hits = ENTRIES.map((e) => {
    let at = Infinity;
    for (const { k, exact } of e.keys) {
      const i = exact ? spaced.indexOf(` ${k} `) : spaced.indexOf(k);
      if (i >= 0 && i < at) at = i;
    }
    return { e, at };
  })
    .filter((h) => h.at !== Infinity)
    .sort((a, b) => a.at - b.at);
  for (const { e } of hits) for (const icon of e.icons) if (!out.includes(icon)) out.push(icon);
  return out.slice(0, max);
}

// Every icon the table can suggest (for tests).
export const ALL_SUGGESTED_ICONS = [...new Set(ENTRIES.flatMap((e) => e.icons))];
