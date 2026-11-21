# Developer access (`window.tabdeck`)

Every Tabdeck deck on the page registers itself with one object, **`window.tabdeck`**. Use it from the browser console while you build a dashboard, or from another custom card, browser_mod or your own JavaScript. Nothing else is added to `window`, and there is nothing to turn on.

```js
> tabdeck.list()
[ { id: "main", tab: "Home", index: 0, tabs: 5, names: ["Home", "Lights", …] },
  { id: "kitchen", tab: "Recipes", index: 0, tabs: 3, names: [ … ] } ]
> tabdeck.get("main").select("Cameras")
true
```

## Deck ids

A deck's id is its **`event_id`**, else its **`storage_key`**, else a hash of its config (shown in the [debug panel](Feature-Debug) as `deck …`). Give the decks you want to drive an `event_id` so the id doesn't change when you edit them. When two decks share an id (the same card on two views), `get()` returns the one on screen.

## Methods

| Call | Returns |
|---|---|
| `tabdeck.list()` | every connected deck: `{ id, tab, index, tabs, names }` (`tab` is the open tab's name, `tabs` the number of visible tabs) |
| `tabdeck.get(id?)` | a handle for one deck (without an id: the first one on screen), or `undefined` |
| `tabdeck.select(id, target)` | `true` when the deck switched (or was already there) |
| `tabdeck.on(type, fn)` | a function that stops listening |
| `tabdeck.version` | the card's version |

A handle from `get()` has the same fields as a `list()` entry (read when you called `get`), plus `element` (the `tabdeck-card` element) and `select(target)`, `next()`, `previous()`, `back()` and `default()`.

`target` is a tab name, an index (0 = first visible tab), a slug (`living-room`), or one of the step words `next`, `previous`, `back` (the tab open before) and `default` (the deck's starting tab). A PIN-locked tab asks for its PIN and returns `false`, as a tap would (the same goes for `selectTab()` and `selectDefault()` on the element). `next` and `previous` step past locked tabs. Page code isn't held to the PIN in other ways (it can reach the tab's card directly), so the PIN is no protection against code you install.

## Events

`tabdeck.on(type, fn)` calls `fn(detail)`; `window.tabdeck` is also an `EventTarget`, so `addEventListener(type, e => e.detail)` works too.

| Event | Detail |
|---|---|
| `tab-changed` | `{ id, index, name, previous }`, for every switch (taps, swipes, automations, `select`) |
| `added` | `{ id }`: a deck connected to the page |
| `removed` | `{ id }`: a deck left the page (another view opened) |

```js
const stop = tabdeck.on("tab-changed", (d) => console.log(d.id, d.previous, "→", d.name));
```

## On the element

Each `tabdeck-card` element keeps its own API: **`selectTab(nameOrIndex)`**, **`selectedTab`**, **`selectDefault()`**, **`breadcrumbPath()`** and the bubbling, composed **`tabdeck-tab-changed`** event (`detail: { index, name, deck }`). See [Grouped tabs](Feature-Grouped-Tabs#related-hide_bar-and-the-public-api).
