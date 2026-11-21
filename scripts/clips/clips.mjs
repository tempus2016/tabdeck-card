// The clips record-clips.mjs makes. Each opens a demo page (site/demo/), waits,
// then `play(ctx)` drives it while frames are recorded. `target` is the
// element the clip is cropped to; `css` is added to the page first. Helpers on ctx:
//   tab(i)           centre of the deck's i-th tab, { x, y }
//   click(point)     real mouse click
//   drag(from, to)   real mouse drag (swipe_mouse)
//   hover(point)     move the mouse there
//   check(selector)  click a checkbox in the page
//   wait(ms)
export const CLIPS = [
  {
    name: "switch-tabs",
    title: "Switching tabs",
    page: "index.html#basics",
    target: "#stage",
    async play({ tab, click, wait }) {
      await wait(600);
      for (const i of [1, 2, 0]) {
        await click(await tab(i));
        await wait(900);
      }
    },
  },
  {
    name: "alerts",
    title: "Alerts and live icons",
    page: "index.html#alerts",
    target: "#stage",
    async play({ tab, click, check, wait }) {
      await wait(600);
      await check('[data-entity="binary_sensor.garage_door"]');
      await wait(1200);
      await click(await tab(1));
      await wait(1000);
      await check('[data-entity="binary_sensor.garage_door"]');
      await wait(1000);
    },
  },
  {
    name: "swipe",
    title: "Swipe between tabs",
    page: "index.html#phone",
    setup: '[data-width="390px"]',
    // A mouse drag would also select text in the stand-in cards.
    css: "#stage { user-select: none; -webkit-user-select: none; }",
    target: "#stage",
    async play({ drag, box, wait }) {
      await wait(600);
      const b = await box();
      const y = b.y + b.height * 0.7;
      for (let i = 0; i < 2; i++) {
        await drag({ x: b.x + b.width * 0.8, y }, { x: b.x + b.width * 0.15, y });
        await wait(900);
      }
      await drag({ x: b.x + b.width * 0.15, y }, { x: b.x + b.width * 0.8, y });
      await wait(900);
    },
  },
  {
    name: "side-rail",
    title: "Side rail that opens on hover",
    page: "index.html#rail",
    target: "#stage",
    async play({ tab, hover, click, wait }) {
      await wait(600);
      await hover(await tab(1));
      await wait(1000);
      await click(await tab(2));
      await wait(900);
      await hover({ x: 1100, y: 700 });
      await wait(900);
    },
  },
];
