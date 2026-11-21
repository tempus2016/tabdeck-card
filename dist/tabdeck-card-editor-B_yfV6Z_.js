var t="en",e={[t]:{"card.tab_n":"Tab {n}","card.tabs":"Tabs","card.scroll_left":"Scroll left","card.scroll_right":"Scroll right","card.all_tabs":"All tabs","card.badge":"badge: {value}","card.ghost":"Hidden: its visibility conditions aren't met (shown while editing)","card.prev_tab":"Previous tab","card.next_tab":"Next tab","card.search":"Find a tab","card.search_placeholder":"Type to filter…","card.search_none":"No matching tabs","card.customize":"Arrange tabs","card.move_up":"Move {name} up","card.move_down":"Move {name} down","card.hide_tab":"Hide {name}","card.show_tab":"Show {name}","card.reset":"Reset","card.done":"Done","card.fullscreen":"Full screen","card.exit_fullscreen":"Exit full screen","card.no_entities":"No entities here.","card.pin_title":"Enter the code for {tab}","card.pin_label":"Code","card.pin_wrong":"Wrong code","card.cancel":"Cancel","card.open":"Open","card.changed":"Changed since you last looked","card.unhealthy":"Most of this tab's devices are unavailable","card.notification":"Notification","card.dismiss":"Dismiss","card.open_repairs":"Open Repairs","card.close":"Close","card.wake":"Tap to wake","card.breadcrumbs":"Breadcrumb","card.overview":"Show all tabs","card.entity_search":"Search the dashboard","card.entity_search_placeholder":"Type an entity name…","card.entity_search_none":"No tab shows a matching entity","card.wizard_step":"Step {n} of {total}","card.back":"Back","card.next":"Next","card.finish":"Finish","card.last_tab":"Back to {name}","card.share":"Share a link to this tab","card.link_copied":"Link copied","card.copy_link":"Copy this link","card.scan_qr":"Scan to open this tab","card.view_missing_dashboard":"There's no dashboard “{dashboard}” to show here","card.view_missing_view":"The dashboard “{dashboard}” has no view “{view}”","card.view_generated":"“{dashboard}” is generated automatically, so its views can't be shown in a tab","card.view_empty":"The view “{view}” on “{dashboard}” has no cards","card.view_loop":"This tab is on the view it would show, so it can't show it","card.empty_title":"Nothing to show right now","card.loading":"Loading…","card.error_title":"Part of this tab couldn't load","card.error_not_installed":"{type} isn't installed","card.error_unknown_type":"There's no card type “{type}”","card.error_no_type":"A card has no type","card.error_hint":"Edit the dashboard to fix it","card.n_alerts":"one:{n} alert|other:{n} alerts","card.learned":"Opened {tab}: you often use it at this time","card.takeover_back":"Back to {tab} in {time}","card.tab_ref_bad_ref":"Shared tab: write {ref} as dashboard/tab.","card.tab_ref_missing_dashboard":"Shared tab: no dashboard {dashboard}.","card.tab_ref_missing_tab":"Shared tab: no tab {tab} on {dashboard}.","card.tab_ref_loop":"Shared tab: {ref} leads back to itself.","card.offline":"Connection lost · reconnecting…","card.pin_enter":"Enter PIN"}},o={},i=new Map,a=new Map,r="tabdeck-language-loaded";function n(t){const e=[t],o=t.split(/[-_]/)[0].toLowerCase();return o!==t&&e.push(o),e}function s(t){const s=n(t).find(t=>void 0!==o[t]);if(!s)return Promise.resolve();const d=o[s];if(i.get(s)===d)return Promise.resolve();let c=a.get(d);return c||(c=d().then(t=>{i.set(s,d),function(t,o){e[t]=o,"undefined"!=typeof window&&window.dispatchEvent(new Event(r))}(s,{...e[s]??{},...t})}).catch(()=>{}).finally(()=>a.delete(d)),a.set(d,c)),c}function d(e){return String(e?.locale?.language??e?.language??t)}function c(o){return s(o),n(o).find(t=>void 0!==e[t])??t}function l(o,i,a){let r=e[c(o)][i]??e[t][i]??i;if(a)for(const[t,e]of Object.entries(a))r=r.split(`{${t}}`).join(String(e));return r}function h(o){return o in e[t]}function p(t,e,o){const i=l(t,e,{n:o});if(!i.includes("|"))return i;const a=Object.fromEntries(i.split("|").map(t=>[t.slice(0,t.indexOf(":")),t.slice(t.indexOf(":")+1)]));let r="other";try{r=new Intl.PluralRules(c(t)).select(o)}catch{}return a[r]??a.other??i}var u,b=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){var t;this.stop=(t=()=>this.host.requestUpdate(),"undefined"==typeof window?()=>{}:(window.addEventListener(r,t),()=>window.removeEventListener(r,t)))}hostDisconnected(){this.stop?.(),this.stop=void 0}},m={},_=function(t,e,o){let i=Promise.resolve();if(e&&e.length>0){let t;const o=document.querySelector("meta[property=csp-nonce]"),r=o?.nonce||o?.getAttribute("nonce");a=e.map(e=>{e=function(t){return"/"+t}(e);const o=(i=e,import.meta.resolve?new URL(import.meta.resolve(i)):new URL(i,import.meta.url));var i;const a=o.pathname.endsWith(".css");return function(t,e,o){if(e in t)return t[e];const i=o();if(!i)return void(t[e]=void 0);const a=i.then(()=>{t[e]=void 0},o=>{throw t[e]=void 0,o});return t[e]=a,a}(m,o.href,()=>{if(void 0===t){t={all:new Set,styles:new Set};const e=document.getElementsByTagName("link");for(let o=e.length-1;o>=0;o--){const i=e[o];t.all.add(i.href),"stylesheet"===i.rel&&t.styles.add(i.href)}}if((a?t.styles:t.all).has(o.href))return;const e=document.createElement("link");return e.rel=a?"stylesheet":"modulepreload",a||(e.as="script"),e.crossOrigin="",e.href=o.href,r&&e.setAttribute("nonce",r),document.head.appendChild(e),a?new Promise((t,i)=>{const a=r=>{e.removeEventListener("load",a),e.removeEventListener("error",a),"error"===r.type?i(new Error(`Unable to preload CSS for ${o}`)):t(r)};e.addEventListener("load",a),e.addEventListener("error",a)}):void 0})}).filter(t=>void 0!==t),i=Promise.all(a.map(t=>Promise.resolve(t).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))}var a;function r(t){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}return i.then(e=>{for(const t of e||[])"rejected"===t.status&&r(t.reason);return t().catch(r)})},g=t=>()=>t().then(t=>t.default);!function(t){for(const[o,i]of Object.entries(t))e[o]={...e[o]??{},...i}}({en:{"editor.tab.name":"Tab name","editor.tab.subtitle":"Subtitle","editor.tab.icon":"Icon","editor.tab.accent":"Accent colour","editor.tab.color":"Text/icon colour","editor.tab.badge":"Badge (entity id or template)","editor.tab.badge_color":"Badge colour","editor.tab.disabled":"Disable tab (greyed, not selectable)","editor.tab.card_size":"Card size hint (rows)","editor.tab.hold_action":"Long-press action","editor.tab.badge_action":"Badge tap action","editor.tab.tap_action":"Tap action (replaces opening the tab, e.g. navigate)","editor.tab.enter_action":"Action when this tab is opened","editor.tab.leave_action":"Action when leaving this tab","editor.global.preset":"Style preset","editor.global.position":"Position","editor.global.style":"Style","editor.global.tab_display":"Show on tabs","editor.global.align":"Alignment","editor.global.badge_display":"Badge style","editor.global.hide_inactive_badge":"Hide badges at 0 or off","editor.global.transition":"Transition","editor.global.indicator_size":"Indicator thickness (px)","editor.global.indicator_radius":"Indicator corner radius (px)","editor.global.remember":"Remember the open tab","editor.global.remember_entity":"Remember entity (input_number/input_text)","editor.global.storage_key":"Storage key (browser mode)","editor.global.default_tab":"Default tab","editor.global.scrollable":"Scroll when tabs don't fit","editor.global.lazy":"Build tabs only when opened","editor.global.unmount_hidden":"Remove hidden tabs from the page","editor.global.swipe_wrap":"Wrap around at the ends","editor.global.animated":"Animate the indicator","editor.global.accent_indicator":"Colour indicator by tab accent","editor.global.header":"Title above the content","editor.global.aria_label":"Accessible name for the tab bar","editor.global.sticky":"Stick to the top while scrolling","editor.global.elevation":"Raise bar with shadow","editor.global.scroll_buttons":"Scroll buttons when tabs don't fit","editor.global.overflow_menu":"⋯ menu when tabs don't fit","editor.global.bar_background":"Bar background colour","editor.global.swipe":"Swipe between tabs","editor.global.swipe_mouse":"Drag with the mouse to switch","editor.global.tab_display_narrow":"Show on tabs when narrow","editor.global.narrow_width":"Narrow below (px)","editor.global.split":"Side by side from this width","editor.global.collapsible":"Tap the open tab to fold it","editor.global.start_collapsed":"Start collapsed","editor.global.scroll_spy":"Stack tabs as sections","editor.global.auto_rotate":"Rotate through tabs every","editor.global.idle_return":"Back to the default tab after","editor.global.edit_mode_reveal":"Show hidden tabs in edit mode","editor.cond.visibility.label":"Visibility","editor.cond.visibility.hint":"show the tab only when…","editor.cond.alert.label":"Alert","editor.cond.alert.hint":"pulse the tab when…","editor.cond.default_if.label":"Default when","editor.cond.default_if.hint":"start on this tab when…","editor.tab_n":"Tab {n}","editor.copy_name":"{name} copy","editor.copied":'Copied tab "{name}" — paste it into Import tab.',"editor.clipboard_error":"Couldn't access the clipboard.","editor.import_error":"That doesn't look like a tab (needs a card, cards or tap_action).","editor.imported_one":"Imported 1 tab.","editor.imported_many":"Imported {count} tabs.","editor.import_hint":"Paste a tab (or a list of tabs) copied with Copy tab, or any tab YAML.","editor.add":"Add","editor.cancel":"Cancel","editor.warn_duplicates":'Duplicate tab names ({names}). "Remember: url" and default-tab-by-name may be ambiguous.',"editor.back":"Back","editor.change_type":"Change card type","editor.card_type":"Card type","editor.card_type_hint":"Choose a card type to configure it. Enter a custom type (e.g. custom:my-card) for cards not in the list.","editor.card_json":"Card (JSON)","editor.invalid_json":"Invalid JSON — not saved.","editor.expand_all":"Expand all","editor.collapse_all":"Collapse all","editor.drag":"Drag to reorder","editor.move_up":"Move up","editor.move_down":"Move down","editor.copy_tab":"Copy tab","editor.duplicate_tab":"Duplicate tab","editor.delete_tab":"Delete tab","editor.add_tab":"Add tab","editor.import_tab":"Import tab","editor.edit_card":"Edit card","editor.preview":"Preview","editor.opt.position.top":"Top","editor.opt.position.bottom":"Bottom","editor.opt.position.left":"Left","editor.opt.position.right":"Right","editor.opt.tab_display.both":"Icon and label","editor.opt.tab_display.icon":"Icon only","editor.opt.tab_display.label":"Label only","editor.opt.tab_display.active":"Icons; selected tab expanded","editor.opt.tab_display.":"(same as tab display)","editor.opt.align.start":"Start","editor.opt.align.center":"Centre","editor.opt.align.end":"End","editor.opt.align.justify":"Fill width","editor.opt.badge_display.text":"Text","editor.opt.badge_display.dot":"Dot","editor.opt.transition.none":"None","editor.opt.transition.fade":"Fade","editor.opt.transition.slide":"Slide","editor.opt.remember.none":"Don't remember","editor.opt.remember.browser":"Per browser","editor.opt.remember.url":"In the URL (#tab=)","editor.opt.remember.entity":"In a helper entity (all devices)","editor.opt.scrollable.auto":"Automatic","editor.opt.scrollable.true":"Always","editor.opt.scrollable.false":"Never","check.now_met":"Met right now","check.now_unmet":"Not met right now","check.chip_hidden":"Hidden now","check.chip_alert":"Alerting","check.chip_hidden_title":"This tab's visibility conditions aren't met, so it's hidden on the dashboard.","check.state_is":"{entity} is {values}","check.state_is_not":"{entity} is not {values}","check.or":" or ","check.now":"now: {value}","check.missing":"entity not found","check.numeric":"{entity} {range}","check.above":"above {value}","check.below":"below {value}","check.and":" and ","check.screen":"screen matches {query}","check.time":"time {range}","check.time_after":"after {value}","check.time_before":"before {value}","check.time_days":"on {days}","check.user":"current user is one of {count} selected","check.template":"template renders true","check.template_pending":"template (waiting for Home Assistant)","check.group_and":"all of:","check.group_or":"any of:","check.group_not":"none of:","check.unknown":"unknown condition type","starter.button":"Start from a template","starter.hint":"Build a deck from your own entities. Replace swaps out the current tabs; Add keeps them.","starter.pick":"Template","starter.replace":"Replace tabs","starter.append":"Add tabs","starter.cancel":"Cancel","starter.none":'Nothing to build: no matching entities found for "{name}".',"starter.done":'Added the "{name}" template.',"starter.kind.rooms":"Rooms: a tab per area","starter.kind.lights":"Lights: a tab per area with lights","starter.kind.security":"Security: alarm, cameras, doors & locks","starter.kind.media":"Media: a tab per media player","starter.kind.climate":"Climate: a tab per thermostat","starter.kind.energy":"Energy: the energy dashboard cards","starter.kind.family":"Family: a tab per person, with a map","starter.tab.alarm":"Alarm","starter.tab.cameras":"Cameras","starter.tab.openings":"Doors & windows","starter.tab.locks":"Locks","starter.tab.energy_now":"Now","starter.tab.energy_usage":"Usage","starter.tab.energy_sources":"Sources","starter.tab.energy_devices":"Devices","convert.button":"Convert from another card","convert.hint":"Paste the YAML of a tabbed-card, swipe-card, state-switch, a vertical/horizontal stack or grid, Bubble Card pop-ups (in stacks or on their own), Mushroom chips used as navigation, a conditional card, a sections view or a whole dashboard.","convert.detected":"Detected {source}: {count} tabs.","convert.replace":"Replace tabs","convert.append":"Add tabs","convert.cancel":"Cancel","convert.done":"Converted {count} tabs from {source}.","convert.error.empty":"There's nothing to convert in that list.","convert.error.not_card":"That doesn't look like a card, a list of cards, a view or a dashboard.","convert.error.no_tabs":"Nothing to convert: no cards found.","convert.source.tabdeck":"a Tabdeck card","convert.source.tabbed-card":"tabbed-card","convert.source.swipe-card":"swipe-card","convert.source.state-switch":"state-switch","convert.source.bubble-popups":"Bubble Card pop-ups","convert.source.dashboard":"a dashboard (one tab per view)","convert.source.view":"a view","convert.source.sections":"a sections view (one tab per section)","convert.source.stack":"a stack (one tab per card or heading)","convert.source.cards":"cards","convert.note.styles":"Only --mdc-theme-primary was carried over (as --tabdeck-accent); other tabbed-card styles have no Tabdeck equivalent.","convert.note.tab_styles":"Per-tab styles from tabbed-card were not carried over.","convert.note.autoplay":"Autoplay became auto_rotate (seconds).","convert.note.state_switch_mode":"This state-switch mode (user / media query / template) has no direct equivalent; the states became plain tabs. Add visibility conditions if needed.","convert.note.bubble":"Each pop-up became a tab; the pop-up's own button and styling are not used.","convert.note.dashboard":"Each view became a tab. Large dashboards can make a heavy card; consider lazy: true.","editor.global.dock":"Dock at the bottom of the screen","editor.tab.fab":"Floating action button style","editor.global.content_arrows":"Previous / next arrows over the content","editor.opt.tab_display.dots":"Dots","editor.global.search":"Quick-switch search (🔍 button)","editor.global.hotkeys":"Keyboard shortcuts","editor.global.history":"Back button returns to the previous tab","editor.global.customize":"Let people reorder and hide tabs","editor.global.rail_expand":"Side rail: icons only","editor.tab.background":"Background (colour, gradient or image URL)","editor.opt.transition.scale":"Scale","editor.opt.transition.flip":"Flip","editor.opt.transition.rise":"Rise","editor.global.transition_duration":"Transition duration (ms)","editor.global.transition_easing":"Transition easing","editor.global.content_height":"Content height","editor.global.content_max_height":"Maximum content height (scrolls inside)","editor.global.fullscreen":"Full-screen button","editor.global.swipe_peek":"Swipe peek (content follows the finger)","editor.global.unload_after":"Free unused tabs after","editor.global.transition_narrow":"Transition when narrow","editor.tab.badge_icon":"Badge icon","editor.tab.ring":"Progress ring (entity, template or number)","editor.tab.ring_max":"Ring maximum (default 100)","editor.tab.ring_color":"Ring colour","editor.tab.area":"Area (no card: shows its entities as tiles)","editor.tab.pin":"PIN (a convenience lock, not security)","editor.tab.pin_timeout":"Unlock lasts (minutes, 0 = until reload)","editor.global.alert_first":"Move alerting tabs to the front","editor.global.alert_snooze":"Long-press snoozes an alert for","editor.global.remote_entity":"Switch from a helper entity","editor.global.remote_event":"Switch on tabdeck_select events","editor.global.fire_event":"Fire tabdeck_tab_changed events","editor.global.event_id":"Deck name in events","editor.global.debug":"Debug","editor.tab.picture":"Picture instead of the icon (URL or entity, e.g. person.alex)","editor.tab.icon_animation":"Icon animation","editor.tab.font_size":"Label size (e.g. 16px)","editor.tab.font_weight":"Label weight (e.g. 600)","editor.tab.font_family":"Label font","editor.opt.icon_animation.":"None","editor.opt.icon_animation.spin":"Spin","editor.opt.icon_animation.pulse":"Pulse","editor.opt.icon_animation.bounce":"Bounce","editor.opt.icon_animation.shake":"Shake","editor.opt.icon_animation.beat":"Heartbeat","editor.global.density":"Density","editor.opt.density.default":"Default","editor.opt.density.compact":"Compact","editor.opt.density.comfortable":"Comfortable","editor.global.haptic":"Vibrate on tab change","editor.opt.haptic.":"Off","editor.opt.haptic.selection":"Selection","editor.opt.haptic.light":"Light","editor.opt.haptic.medium":"Medium","editor.opt.haptic.heavy":"Heavy","editor.contrast_low":"{field} has low contrast with this theme's card background ({ratio}:1), so it may be hard to read.","editor.global.bar_autohide":"Hide the pinned bar while scrolling down","editor.tab.separator":"Separator before this tab","editor.opt.separator.":"None","editor.opt.separator.line":"Line","editor.opt.separator.space":"Space (push to the end)","editor.tab.double_tap_action":"Double-tap action","editor.global.hold_peek":"Hold a tab to preview it","editor.global.changed_dot":"Dot on tabs that changed since you last looked","editor.global.sort_by_usage":"Most-used tabs first","editor.global.health_dim":"Fade tabs whose devices are unavailable","editor.tab.pip":"Keep in a floating window after switching away","editor.global.idle_dim":"Screensaver after","editor.global.idle_dim_mode":"When idle, show","editor.opt.idle_dim_mode.dim":"Dimmed dashboard","editor.opt.idle_dim_mode.black":"Black screen","editor.opt.idle_dim_mode.clock":"Clock","editor.global.preload":"Preload tabs while idle","editor.opt.preload.":"Off","editor.opt.preload.idle":"Neighbouring tabs","editor.opt.preload.all":"All tabs, one at a time","export.button":"Export as a dashboard view","export.hint":"A sections view with one section per tab. Copy it, then in a dashboard choose Edit → ⋮ → Raw configuration editor and paste it as a new entry under views:.","export.copy":"Copy YAML","export.copied":"Copied the view's YAML.","export.skipped":"Left out (action tabs with no card): {names}.","export.note.templates":'Tab names that are templates become "Tab 1", "Tab 2"…: section headings can\'t use templates.',"export.note.conditions":"Template and time conditions were kept, but sections only understand state, numeric state, screen and user conditions.","export.note.groups":"Grouped tabs export as a nested Tabdeck card inside their section.","export.note.auto_tabs":"Generated tabs (auto_tabs) aren't included: only the tabs written in the config are.","editor.global.breadcrumbs":"Breadcrumb trail for grouped tabs","editor.global.overview":"Overview button","editor.global.entity_search":"Dashboard search (Ctrl+K)","editor.global.sync_group":"Link decks","editor.global.popup":"Open tabs in a popup from other cards","editor.opt.popup.":"Off","editor.opt.popup.on":"On","editor.opt.popup.hidden":"On, and hide the deck itself","editor.global.wizard":"Wizard","editor.global.last_tab_button":"Back-to-last-tab button","editor.global.wheel_switch":"Mouse wheel over the tab bar changes tab (desktop)","editor.global.swipe_edge":"Only from the screen edges","editor.global.swipe_lock":"Don't switch while dragging sliders","editor.global.drag_reorder":"Drag tabs on the bar to reorder","editor.global.compare":"Compare mode","editor.global.share_button":"Share button","editor.opt.share_button.link":"On","editor.opt.share_button.qr":"On, with a QR code","editor.opt.share_button.":"Off","editor.global.orientation_layout":"Follow the screen orientation","editor.tab.view":"Show a dashboard view (/dashboard/view)","editor.tab.url":"Show a web page (URL)","editor.tab.aspect_ratio":"Web page aspect ratio (e.g. 75% or 16:9)","editor.tab.markdown":"Show text (Markdown, templates allowed)","editor.tab.empty_message":"Message when every card is hidden","editor.global.loading_placeholder":"Grey boxes while a tab's cards load","editor.global.friendly_errors":"Explain broken cards","editor.tab.auto_refresh":"Rebuild the card every (minutes)","editor.tab.zoom":"Zoom (0.8 fits more, 1.2 is bigger)","editor.tab.padding":"Padding around the cards (e.g. 8px)","editor.tab.spacing":"Gap between cards (e.g. 4px)","editor.global.scroll_memory":"Each tab remembers how far down you scrolled","editor.tab.page_background":"Whole page background while open","editor.global.bar_limit":"Most tabs shown in the bar","editor.tab.ring_style":"Show the ring as a bar under the tab","editor.tab.graph":"Mini graph on the tab (entity)","editor.tab.countdown":"Countdown badge (timer)","editor.global.badge_bounce":"Badges bounce when their value changes","editor.tab.tooltip":"Hover summary (templates allowed)","editor.global.hidden_alerts":"⋯ menu counts alerts on tabs that don't fit","editor.global.summary_chip":"Alert count chip at the end of the bar","editor.global.glass":"Frosted glass bar","editor.global.bar_text":"Bar text colour","editor.opt.bar_text.auto":"Automatic (readable)","editor.opt.bar_text.light":"Light text","editor.opt.bar_text.dark":"Dark text","editor.global.liquid_indicator":"Liquid indicator (stretches as it moves)","editor.global.picture_accent":"Accent colour from each tab's picture","editor.global.learned_default":"Learn the usual tab per time of day","editor.global.follow_room":"Follow the room I'm in","editor.tab.keep_awake":"Keep the screen on while this tab is open (https only)","editor.global.click_sound":"Click sound","editor.preview_hint":"click a tab to edit it","editor.undo.undo":"Undo","editor.undo.redo":"Redo","editor.undo.added":'Added tab "{name}"',"editor.undo.removed":'Removed tab "{name}"',"editor.undo.moved":"Reordered tabs","editor.undo.tab":'Changed tab "{name}"',"editor.undo.tabs":"Changed several tabs","editor.undo.options":"Changed deck settings","editor.undo.undone":"Undone: {change}","editor.undo.redone":"Redone: {change}","lint.title":"one:Config check · {n} note|other:Config check · {n} notes","lint.dock_wizard":"dock and wizard clash: the wizard wins, so the bar isn't docked.","lint.dock_hide_bar":"dock does nothing with hide_bar: there's no bar to dock.","lint.remember_entity":"remember: entity needs remember_entity (an input_text or input_number).","lint.default_tab":'default_tab "{value}" doesn\'t match any tab, so the deck opens on the first one.',"lint.needs":"{key} does nothing without {other}.","lint.needs_tab":"{key} does nothing: no tab has {other} conditions.","lint.tab_needs":'Tab "{tab}": {key} does nothing without {other}.',"lint.unknown":"Unknown option {key}: a typo? The visual editor drops it when you save.","lint.unknown_tab":'Tab "{tab}": unknown option {key}: a typo? The visual editor drops it when you save.',"lint.many_tabs":"{count} tabs: turn on lazy so the card loads faster.","lint.preload_all":"preload: all builds all {count} tabs anyway; preload: idle is lighter.","lint.fast_refresh":'Tab "{tab}": auto_refresh under a minute rebuilds its card very often.',"lint.templates":"{count} templates in tab fields: each one is a live subscription to Home Assistant.","editor.bulk.select":"Select tabs","editor.bulk.count":"Selected: {n}","editor.bulk.all":"All","editor.bulk.none":"None","editor.bulk.hint":"Tick tabs in the list, fill in what to change and apply. Empty fields stay as they are.","editor.bulk.apply":"Apply to selected","editor.bulk.done":"Done","editor.bulk.applied":"Updated {count} tabs.","editor.bulk.pick":"Select {name}","editor.icon_suggest":"Suggested icons","editor.icon_use":"Use icon {icon}","rooms.button":"Make tabs from rooms","rooms.hint":"One tab per room (Home Assistant area), listing its entities. Tick the rooms you want; the tabs are added after the current ones.","rooms.entities":"one:{n} entity|other:{n} entities","rooms.has_tab":"has a tab","rooms.create":"one:Create {n} tab|other:Create {n} tabs","rooms.none":"No rooms found. Add areas in Settings → Areas, labels & zones and assign devices to them.","rooms.done":"Added {count} room tabs.","summary.title":"What this card does","summary.tabs":"one:This deck has {n} tab: {names}.|other:This deck has {n} tabs: {names}.","summary.auto_source":"It adds tabs by itself from {source}.","summary.auto_template":"It adds tabs by itself from a template.","summary.opens_on":"It opens on {tab}.","summary.default_if":"one:It opens on {names} instead when its conditions are met.|other:It opens on {names} instead when their conditions are met.","summary.remember_browser":"Each browser comes back to the tab it had open last.","summary.remember_url":"The open tab is kept in the page address, so links and reloads keep it.","summary.remember_entity":"The open tab is stored in {entity}, so every device shows the same one.","summary.visibility":"one:{names} only shows up some of the time.|other:{names} only show up some of the time.","summary.alerts":"one:{names} pulses when it needs attention.|other:{names} pulse when they need attention.","summary.badges":"one:{names} shows a badge.|other:{names} show a badge.","summary.pin":"one:{names} needs a PIN.|other:{names} need a PIN.","summary.actions":"one:{names} runs an action instead of opening.|other:{names} run an action instead of opening.","summary.swipe":"Swipe left or right to move between tabs.","summary.swipe_mouse":"Swipe, or drag with the mouse, to move between tabs.","summary.rotate":"one:It moves to the next tab every {n} second.|other:It moves to the next tab every {n} seconds.","summary.idle_return":"one:After {n} second without a touch it goes back to {tab}.|other:After {n} seconds without a touch it goes back to {tab}.","summary.remote_entity":"{entity} can switch the tab.","summary.remote_event":"Automations can switch the tab with a tabdeck_select event.","summary.follow_room":"It shows the tab for the room {entity} says you're in.","summary.takeover":"one:When {entity} triggers, it shows {tab} for {n} second, then goes back.|other:When {entity} triggers, it shows {tab} for {n} seconds, then goes back.","summary.quiet_time":"Between {from} and {to} it switches nothing by itself.","summary.quiet_entity":"While {entity} is on, it switches nothing by itself.","summary.lazy":"Tabs load the first time they're opened.","convert.source.mushroom-chips":"Mushroom chips","convert.note.chips":"Each chip that opens a view became a tab showing that view (view:); a chip that opens a web address became an action tab. Other chips were left out.","convert.note.bubble_nav":"Names and icons missing on pop-ups were taken from the buttons or chips that open them.","convert.note.bubble_outside":"Cards outside the pop-ups were left out (navigation buttons and chips aren't needed with tabs).","whatsnew.title":"New in Tabdeck {version}","whatsnew.more":"Read more","whatsnew.dismiss":"Dismiss","whatsnew.1_5_0":"Home Assistant's colour names and colour picker, text that stays readable on solid colours, six new presets, and tabs with photos, animated icons and their own font.","whatsnew.1_6_0":"The editor can undo and redo, opens a tab's settings when you click it in the preview, checks your config, explains it in plain words, edits several tabs at once, suggests icons and makes tabs from your rooms.","editor.global.companion":"Companion entity","editor.global.usage_stats":"Usage stats every","editor.opt.debug.":"Off","editor.opt.debug.on":"Panel under the card","editor.opt.debug.speed":"Panel + draw time on each tab","editor.tab.tab_ref":"Shared tab from another dashboard (dashboard/tab)","editor.global.offline_banner":"Warn when the connection to Home Assistant is lost","instant.button":"New dashboard with these rooms","instant.working":"Creating…","instant.title":"Rooms","instant.done":"Created the dashboard “{title}”.","instant.open":"Open it","instant.error.admin":"Only administrators can create dashboards.","instant.error.failed":"Couldn't create the dashboard. Nothing was changed.","style_import.button":"Import a style","style_import.hint":"Paste a style preset (JSON or YAML). Only look options are taken: colours, bar style, shape. Your tabs and other settings stay as they are.","style_import.gallery":"Preset gallery","style_import.apply":"Apply style","style_import.done":"Applied the style “{name}”.","style_import.done_unnamed":"Applied the style.","style_import.error.title":"Nothing was imported:","style_import.error.not_object":"That isn't a style preset. Paste the JSON of a preset file.","style_import.error.unknown":"“{key}” isn't a style option.","style_import.error.bad_value":"“{key}” has a value Tabdeck can't use.","style_import.error.empty":"The preset has no style options.","lint.pin_auto":'Tab "{tab}" has a PIN, so automatic switches ({key}) won\'t open it.',"export.note.pin":"Tabs with a PIN become ordinary sections: a dashboard view can't ask for the code.","editor.section.tabs":"Tabs","editor.section.look":"Look","editor.section.bar":"Tab bar","editor.section.badges":"Badges & alerts","editor.section.move":"Switching tabs","editor.section.start":"Start & memory","editor.section.auto":"Automations","editor.section.kiosk":"Wall tablet","editor.section.perf":"Performance","editor.section.adv":"Advanced","editor.section.defaults":"Defaults","editor.section.changed":"Changed from the default","editor.status.tabs":"one:{n} tab|other:{n} tabs","editor.status.notes":"one:{n} note|other:{n} notes","editor.status.new":"New in {version}","editor.status.show":"Show","editor.search.placeholder":"Search settings, e.g. swipe, badge, PIN","editor.search.clear":"Clear search","editor.search.none":"No setting matches. Try another word, or use the code editor for YAML-only options.","editor.tag.badge":"badge","editor.tag.pin":"PIN","editor.tag.no_icon":"no icon","editor.off":"Off","editor.opt.style.underline":"Underline","editor.opt.style.pill":"Pill","editor.opt.style.segmented":"Segmented","editor.opt.style.boxed":"Boxed","editor.opt.style.text":"Text only","editor.opt.style.rail":"Rail","editor.hint.preset":"Sets a bundle of the options below","editor.hint.unmount_hidden":"Saves memory","editor.hint.split":"px, 0 = off","editor.hint.auto_rotate":"Seconds, 0 = off","editor.hint.idle_return":"Seconds without a touch, 0 = never","editor.hint.idle_dim":"Minutes without a touch, 0 = never","editor.hint.unload_after":"Minutes, 0 = never","editor.hint.alert_snooze":"Minutes, 0 = off","editor.hint.usage_stats":"Minutes, 0 = off","editor.hint.swipe_edge":"How close to the side a swipe starts (px), 0 = anywhere","editor.hint.swipe_lock":"Sliders and maps","editor.hint.bar_limit":"For very big decks, 0 = all","editor.hint.click_sound":"Volume, 0 = off","editor.hint.dock":"Phone-style navigation","editor.hint.hotkeys":"1–9, [ ], /","editor.hint.friendly_errors":"Plain words and a badge on the tab","editor.hint.companion":"Needs the Tabdeck Companion integration","editor.hint.remote_entity":"Its state picks the tab","editor.hint.follow_room":"A room-presence entity picks the tab","editor.hint.remote_event":"Admin users only","editor.hint.fire_event":"Admin users only","editor.hint.sync_group":"Decks with the same group name switch together","editor.hint.wizard":"Back and Next buttons with a progress bar instead of the tab bar","editor.hint.entity_search":"Finds the tab that shows an entity","editor.hint.content_height":"auto, tallest or e.g. 400px","editor.hint.learned_default":"Per browser","editor.hint.customize":"For themselves, per browser","editor.hint.orientation_layout":"Bar at the bottom upright, on the left sideways","editor.hint.rail_expand":"Labels on hover (left/right)","editor.hint.overview":"Every tab as a live thumbnail","editor.hint.compare":"Long-press a tab to show it beside the open one","editor.hint.debug":"Conditions, templates and timings under the card","editor.hint.preload":"Needs Build tabs only when opened","editor.hint.haptic":"Companion app","editor.hint.transition_easing":"CSS, e.g. ease-out","editor.hint.popup":"fire-dom-event","editor.global.bar_fade":"Fade the edges when tabs don't fit","editor.hint.bar_fade":"Shows there are more tabs to scroll to"}}),u={ar:g(()=>_(()=>import("./tabdeck-card-editor.ar-DLlh7qQN.js"),[])),bn:g(()=>_(()=>import("./tabdeck-card-editor.bn-BpBIt1MC.js"),[])),de:g(()=>_(()=>import("./tabdeck-card-editor.de-ChWd8ZjE.js"),[])),es:g(()=>_(()=>import("./tabdeck-card-editor.es-CQDKx0i0.js"),[])),fr:g(()=>_(()=>import("./tabdeck-card-editor.fr-tmhiqzm9.js"),[])),hi:g(()=>_(()=>import("./tabdeck-card-editor.hi-aEUet-10.js"),[])),id:g(()=>_(()=>import("./tabdeck-card-editor.id-_GxXhYVj.js"),[])),it:g(()=>_(()=>import("./tabdeck-card-editor.it-DOKTGMhm.js"),[])),ja:g(()=>_(()=>import("./tabdeck-card-editor.ja-Biyq745O.js"),[])),ko:g(()=>_(()=>import("./tabdeck-card-editor.ko-Uek-gkT0.js"),[])),nl:g(()=>_(()=>import("./tabdeck-card-editor.nl-DCODLq0Z.js"),[])),pl:g(()=>_(()=>import("./tabdeck-card-editor.pl-BBu8uiHk.js"),[])),pt:g(()=>_(()=>import("./tabdeck-card-editor.pt-C3KkHHEM.js"),[])),ru:g(()=>_(()=>import("./tabdeck-card-editor.ru-BqkXTyO-.js"),[])),tr:g(()=>_(()=>import("./tabdeck-card-editor.tr-BNupG_4K.js"),[])),uk:g(()=>_(()=>import("./tabdeck-card-editor.uk-ByQZmqeM.js"),[])),vi:g(()=>_(()=>import("./tabdeck-card-editor.vi-CD4CTEw2.js"),[])),"zh-Hans":g(()=>_(()=>import("./tabdeck-card-editor.zh-Hans-y_Dc3Bzg.js"),[])),"zh-Hant":g(()=>_(()=>import("./tabdeck-card-editor.zh-Hant-CiXXhvWT.js"),[])),"zh-HK":g(()=>_(()=>import("./tabdeck-card-editor.zh-Hant-CiXXhvWT.js"),[]))},Object.assign(o,u),function(){const t=function(){if("undefined"!=typeof document){const t=document.querySelector("home-assistant")?.hass,e=t?.locale?.language??t?.language;if(e)return String(e)}try{const t=JSON.parse(globalThis.localStorage?.getItem("selectedLanguage")??"null");if("string"==typeof t&&t)return t}catch{}}();t&&s(t)}();var f=globalThis,y=f.ShadowRoot&&(void 0===f.ShadyCSS||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,v=Symbol(),w=new WeakMap,k=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==v)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(y&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=w.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&w.set(e,t))}return t}toString(){return this.cssText}},x=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new k(o,t,v)},$=y?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new k("string"==typeof t?t:t+"",void 0,v))(e)})(t):t,{is:A,defineProperty:S,getOwnPropertyDescriptor:C,getOwnPropertyNames:z,getOwnPropertySymbols:E,getPrototypeOf:L}=Object,O=globalThis,T=O.trustedTypes,M=T?T.emptyScript:"",H=O.reactiveElementPolyfillSupport,j=(t,e)=>t,N={toAttribute(t,e){switch(e){case Boolean:t=t?M:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},V=(t,e)=>!A(t,e),B={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),O.litPropertyMetadata??=new WeakMap;var P=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=B){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&S(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:a}=C(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);a?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??B}static _$Ei(){if(this.hasOwnProperty(j("elementProperties")))return;const t=L(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(j("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(j("properties"))){const t=this.properties,e=[...z(t),...E(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const t=this._$Eu(e,o);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift($(t))}else void 0!==t&&e.push($(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(y)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),i=f.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const a=(void 0!==o.converter?.toAttribute?o.converter:N).toAttribute(e,o.type);this._$Em=t,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:N;this._$Em=i;const r=a.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,o,i=!1,a){if(void 0!==t){const r=this.constructor;if(!1===i&&(a=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??V)(a,e)||o.useDefault&&o.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:a},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[j("elementProperties")]=new Map,P[j("finalized")]=new Map,H?.({ReactiveElement:P}),(O.reactiveElementVersions??=[]).push("2.1.2");var R=globalThis,I=t=>t,q=R.trustedTypes,D=q?q.createPolicy("lit-html",{createHTML:t=>t}):void 0,U="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,W="?"+F,K=`<${W}>`,Z=document,J=()=>Z.createComment(""),G=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Y=Array.isArray,X="[ \t\n\f\r]",Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,et=/>/g,ot=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),it=/'/g,at=/"/g,rt=/^(?:script|style|textarea|title)$/i,nt=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),st=nt(1),dt=(nt(2),nt(3),Symbol.for("lit-noChange")),ct=Symbol.for("lit-nothing"),lt=new WeakMap,ht=Z.createTreeWalker(Z,129);function pt(t,e){if(!Y(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==D?D.createHTML(e):e}var ut=(t,e)=>{const o=t.length-1,i=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=Q;for(let s=0;s<o;s++){const e=t[s];let o,d,c=-1,l=0;for(;l<e.length&&(n.lastIndex=l,d=n.exec(e),null!==d);)l=n.lastIndex,n===Q?"!--"===d[1]?n=tt:void 0!==d[1]?n=et:void 0!==d[2]?(rt.test(d[2])&&(a=RegExp("</"+d[2],"g")),n=ot):void 0!==d[3]&&(n=ot):n===ot?">"===d[0]?(n=a??Q,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,o=d[1],n=void 0===d[3]?ot:'"'===d[3]?at:it):n===at||n===it?n=ot:n===tt||n===et?n=Q:(n=ot,a=void 0);const h=n===ot&&t[s+1].startsWith("/>")?" ":"";r+=n===Q?e+K:c>=0?(i.push(o),e.slice(0,c)+U+e.slice(c)+F+h):e+F+(-2===c?s:h)}return[pt(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]},bt=class t{constructor({strings:e,_$litType$:o},i){let a;this.parts=[];let r=0,n=0;const s=e.length-1,d=this.parts,[c,l]=ut(e,o);if(this.el=t.createElement(c,i),ht.currentNode=this.el.content,2===o||3===o){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=ht.nextNode())&&d.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(U)){const e=l[n++],o=a.getAttribute(t).split(F),i=/([.?@])?(.*)/.exec(e);d.push({type:1,index:r,name:i[2],strings:o,ctor:"."===i[1]?yt:"?"===i[1]?vt:"@"===i[1]?wt:ft}),a.removeAttribute(t)}else t.startsWith(F)&&(d.push({type:6,index:r}),a.removeAttribute(t));if(rt.test(a.tagName)){const t=a.textContent.split(F),e=t.length-1;if(e>0){a.textContent=q?q.emptyScript:"";for(let o=0;o<e;o++)a.append(t[o],J()),ht.nextNode(),d.push({type:2,index:++r});a.append(t[e],J())}}}else if(8===a.nodeType)if(a.data===W)d.push({type:2,index:r});else{let t=-1;for(;-1!==(t=a.data.indexOf(F,t+1));)d.push({type:7,index:r}),t+=F.length-1}r++}}static createElement(t,e){const o=Z.createElement("template");return o.innerHTML=t,o}};function mt(t,e,o=t,i){if(e===dt)return e;let a=void 0!==i?o._$Co?.[i]:o._$Cl;const r=G(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=a:o._$Cl=a),void 0!==a&&(e=mt(t,a._$AS(t,e.values),a,i)),e}var _t=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??Z).importNode(e,!0);ht.currentNode=i;let a=ht.nextNode(),r=0,n=0,s=o[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new gt(a,a.nextSibling,this,t):1===s.type?e=new s.ctor(a,s.name,s.strings,this,t):6===s.type&&(e=new kt(a,this,t)),this._$AV.push(e),s=o[++n]}r!==s?.index&&(a=ht.nextNode(),r++)}return ht.currentNode=Z,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},gt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=mt(this,t,e),G(t)?t===ct||null==t||""===t?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==dt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>Y(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&G(this._$AH)?this._$AA.nextSibling.data=t:this.T(Z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=bt.createElement(pt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new _t(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=lt.get(t.strings);return void 0===e&&lt.set(t.strings,e=new bt(t)),e}k(e){Y(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,a=0;for(const r of e)a===o.length?o.push(i=new t(this.O(J()),this.O(J()),this,this.options)):i=o[a],i._$AI(r),a++;a<o.length&&(this._$AR(i&&i._$AB.nextSibling,a),o.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=I(t).nextSibling;I(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},ft=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,a){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=ct}_$AI(t,e=this,o,i){const a=this.strings;let r=!1;if(void 0===a)t=mt(this,t,e,0),r=!G(t)||t!==this._$AH&&t!==dt,r&&(this._$AH=t);else{const i=t;let n,s;for(t=a[0],n=0;n<a.length-1;n++)s=mt(this,i[o+n],e,n),s===dt&&(s=this._$AH[n]),r||=!G(s)||s!==this._$AH[n],s===ct?t=ct:t!==ct&&(t+=(s??"")+a[n+1]),this._$AH[n]=s}r&&!i&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},yt=class extends ft{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},vt=class extends ft{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},wt=class extends ft{constructor(t,e,o,i,a){super(t,e,o,i,a),this.type=5}_$AI(t,e=this){if((t=mt(this,t,e,0)??ct)===dt)return;const o=this._$AH,i=t===ct&&o!==ct||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,a=t!==ct&&(o===ct||i);i&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},kt=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){mt(this,t)}},xt=R.litHtmlPolyfillSupport;xt?.(bt,gt),(R.litHtmlVersions??=[]).push("3.3.3");var $t=globalThis,At=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let a=i._$litPart$;if(void 0===a){const t=o?.renderBefore??null;i._$litPart$=a=new gt(e.insertBefore(J(),t),t,void 0,o??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return dt}};At._$litElement$=!0,At.finalized=!0,$t.litElementHydrateSupport?.({LitElement:At});var St=$t.litElementPolyfillSupport;St?.({LitElement:At}),($t.litElementVersions??=[]).push("4.2.2");var Ct,zt,Et={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:V},Lt=(t=Et,e,o)=>{const{kind:i,metadata:a}=o;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const a=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,a,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const a=this[i];e.call(this,o),this.requestUpdate(i,a,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function Ot(t){return(e,o)=>"object"==typeof o?Lt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function Tt(t){return Ot({...t,state:!0,attribute:!1})}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Ct||(Ct={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(zt||(zt={}));function Mt(t){if(!0===t)return 10;const e=Number(t);return("number"==typeof t||"string"==typeof t&&""!==t.trim())&&Number.isFinite(e)&&e>0?Math.min(60,Math.max(1,Math.round(e))):void 0}function Ht(t){if(!t||"object"!=typeof t)return;const e={},o=Number(t.precision);void 0!==t.precision&&Number.isInteger(o)&&o>=0&&o<=6&&(e.precision=o);const i=Number(t.max);return void 0!==t.max&&Number.isFinite(i)&&(e.max=i),"string"==typeof t.unit&&(e.unit=t.unit),e}var jt=/^[a-z_]+\.[a-z0-9_]+$/;function Nt(t){const e="string"==typeof t?{entity:t}:t,o="string"==typeof e?.entity?e.entity.trim():"";if(!jt.test(o))return;const i=Number(e.hours),a={entity:o,hours:Number.isFinite(i)&&i>0?i:24};return"string"==typeof e.color&&e.color&&(a.color=e.color),a}var Vt=["default","ios","material","glass","minimal","rail","neumorphic","ha-tile","mushroom","bubble","fluent","material-you","material-expressive","liquid-glass","accessible"],Bt={position:"top",style:"underline",align:"start",tab_display:"both",badge_display:"text",indicator_size:3,indicator_radius:void 0,elevation:!1,sticky:!1,bar_background:void 0,glass:void 0,liquid_indicator:!1,styles:{}},Pt={default:{},ios:{style:"segmented",align:"justify",indicator_radius:8,bar_background:"var(--secondary-background-color, #efefef)",styles:{"--tabdeck-tab-height":"36px"}},material:{style:"underline",align:"justify",elevation:!0},glass:{style:"pill",sticky:!0,bar_background:"color-mix(in srgb, var(--card-background-color, #fff) 60%, transparent)",styles:{"--tabdeck-bar-backdrop":"blur(12px)"}},minimal:{style:"text",tab_display:"label",badge_display:"dot"},rail:{position:"left",style:"rail",tab_display:"icon"},neumorphic:{style:"pill",align:"justify",indicator_radius:14,bar_background:"var(--card-background-color, #e0e5ec)",styles:{"--tabdeck-bar-shadow":"inset 3px 3px 7px rgba(0, 0, 0, 0.18), inset -3px -3px 7px rgba(255, 255, 255, 0.06)","--tabdeck-indicator-color":"var(--card-background-color, #e0e5ec)","--tabdeck-selected-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-indicator-shadow":"3px 3px 8px rgba(0, 0, 0, 0.25), -2px -2px 6px rgba(255, 255, 255, 0.06)","--tabdeck-tab-height":"44px"}},"ha-tile":{style:"boxed",indicator_radius:12,styles:{"--tabdeck-tab-height":"52px","--tabdeck-tab-font-weight":"500"}},mushroom:{style:"pill",indicator_radius:12,styles:{"--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"500","--tabdeck-tab-radius":"12px"}},bubble:{style:"pill",indicator_radius:999,bar_background:"var(--secondary-background-color, rgba(127, 127, 127, 0.12))",styles:{"--tabdeck-indicator-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-selected-badge-background":"var(--card-background-color, #fff)","--tabdeck-selected-badge-color":"var(--tabdeck-accent, var(--primary-color))","--tabdeck-tab-height":"46px","--tabdeck-tab-font-weight":"500"}},fluent:{style:"underline",indicator_size:3,indicator_radius:2,styles:{"--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"600"}},"material-you":{style:"pill",align:"justify",indicator_radius:20,styles:{"--tabdeck-indicator-color":"color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 26%, transparent)","--tabdeck-selected-color":"var(--primary-text-color)","--tabdeck-tab-height":"40px","--tabdeck-tab-font-weight":"500"}},"material-expressive":{style:"pill",align:"justify",indicator_radius:999,liquid_indicator:!0,bar_background:"color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 8%, var(--card-background-color, #fff))",styles:{"--tabdeck-bar-radius":"28px","--tabdeck-indicator-color":"color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 30%, transparent)","--tabdeck-selected-color":"var(--primary-text-color)","--tabdeck-tab-height":"56px","--tabdeck-tab-font-weight":"700"}},"liquid-glass":{style:"pill",align:"justify",indicator_radius:999,glass:20,liquid_indicator:!0,styles:{"--tabdeck-bar-radius":"999px","--tabdeck-glass-tint":"color-mix(in srgb, var(--card-background-color, #fff) 40%, transparent)","--tabdeck-indicator-color":"color-mix(in srgb, var(--card-background-color, #fff) 55%, transparent)","--tabdeck-indicator-shadow":"inset 0 1px 1px rgba(255, 255, 255, 0.7), 0 2px 10px rgba(0, 0, 0, 0.14)","--tabdeck-tab-height":"48px","--tabdeck-tab-font-weight":"600"}},accessible:{style:"boxed",align:"justify",tab_display:"both",indicator_radius:10,styles:{"--tabdeck-tab-height":"64px","--tabdeck-tab-padding":"0 14px","--tabdeck-tab-font-size":"16px","--tabdeck-tab-font-weight":"700","--tabdeck-tab-color":"var(--primary-text-color)","--tabdeck-tab-border":"2px solid var(--primary-text-color)","--tabdeck-indicator-color":"#ffd400","--tabdeck-icon-size":"28px","--tabdeck-focus-width":"4px","--tabdeck-focus-color":"var(--primary-text-color)"}}};function Rt(t){return Vt.includes(t)}function It(t){const e=Pt[t];return{...Bt,...e,styles:{...e.styles??{}}}}var qt=new Set(Object.values(Pt).flatMap(t=>Object.keys(t.styles??{})));function Dt(t){if("number"==typeof t)return Number.isFinite(t)&&t>0?`${t}px`:void 0;if("string"!=typeof t)return;const e=t.trim();return""===e||/[;{}"<>]/.test(e)||!/^[\d.]/.test(e)&&!/^(calc|min|max|clamp|var)\(/.test(e)?void 0:e}function Ut(t){if(!0===t)return.5;const e=Number(t);return"number"==typeof t&&Number.isFinite(e)&&e>0&&e<=1?e:void 0}var Ft=["dim","black","clock"];function Wt(t){const e="object"==typeof t&&null!==t?t:{after:t},o=Number(e.after);if(!Number.isFinite(o)||o<=0)return;const i=Number(e.opacity);return{after:Math.max(.5,o),mode:Ft.includes(e.mode)?e.mode:"dim",opacity:Number.isFinite(i)&&i>0&&i<=1?i:.7}}var Kt=/\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}/g,Zt=/^\{\{\s*(item(?:\.[\w$]+)*|index)\s*\}\}$/;function Jt(t,e){if("item"===e)return t;const o=e.split(".");let i=t;for(let a=1;a<o.length;a++)i=null==i?void 0:i[o[a]];return i}function Gt(t,e,o){if("string"==typeof t){const i=t.match(Zt);if(i){const t=i[1];if("index"===t)return o;const a=Jt(e,t);return void 0===a?"":a}return t.replace(Kt,(t,i)=>String("index"===i?o:Jt(e,i)??""))}if(Array.isArray(t))return t.map(t=>Gt(t,e,o));if(t&&"object"==typeof t){const i={};for(const a of Object.keys(t))i[a]=Gt(t[a],e,o);return i}return t}function Yt(t){return"number"==typeof t&&Number.isFinite(t)?String(t):"string"==typeof t&&t.trim()?t.trim():void 0}function Xt(t){return"hidden"===t?"hidden":!0===t||"on"===t||void 0}function Qt(t){if(!0===t)return{};if(!t||"object"!=typeof t||Array.isArray(t))return;const e=t.finish_action;return e&&"object"==typeof e&&e.action&&"none"!==e.action?{finish_action:e}:{}}function te(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ee(t){return!0===t?"link":"qr"===t||t&&"object"==typeof t&&t.qr?"qr":void 0}var oe=["top","bottom","left","right"],ie=(t,e)=>oe.includes(t)?t:e;function ae(t){return!0===t?{portrait:"bottom",landscape:"left"}:t&&"object"==typeof t?{portrait:ie(t.portrait,"bottom"),landscape:ie(t.landscape,"left")}:void 0}function re(t){if(t&&"object"==typeof t){if(function(t){if(t&&"object"==typeof t&&"string"==typeof t.dashboard&&t.dashboard)return{dashboard:t.dashboard,view:void 0===t.view?"":String(t.view)};if("string"!=typeof t)return;const e=t.trim().replace(/^\/+/,"").split("/");return e[0]?{dashboard:e[0],view:e.slice(1).join("/")}:void 0}(t.view))return{type:"custom:tabdeck-view-card",view:t.view};if("string"==typeof t.url&&t.url.trim()){const e="string"==typeof t.aspect_ratio||"number"==typeof t.aspect_ratio?String(t.aspect_ratio).trim():"";return{type:"iframe",url:t.url.trim(),...e?{aspect_ratio:e}:{}}}return"string"==typeof t.markdown&&t.markdown.trim()?{type:"markdown",content:t.markdown}:void 0}}function ne(t){const e=re(t);return!!e&&JSON.stringify(e)===JSON.stringify(t?.card)}var se=t=>"string"==typeof t&&t.trim()?t:void 0;function de(t){if(!0===t)return{};if("string"==typeof t)return t.trim()?{text:t}:void 0;if(!t||"object"!=typeof t)return;const e={};for(const o of["title","text","icon"])se(t[o])&&(e[o]=t[o]);return e}function ce(t){const e=Number(t);if(null!=t&&""!==t&&Number.isFinite(e)&&!(e<=0)&&1!==e)return Math.min(3,Math.max(.25,e))}function le(t){return 0===t||"0"===t?"0px":Dt(t)}function he(t){const e=Math.round(Number(t));return Number.isFinite(e)&&e>0?Math.max(3,e):void 0}var pe={winter:{from:"12-01",to:"01-06",accent:"#ff5d5d",bar_background:"#14361f",bar_text:"light"},autumn:{from:"10-25",to:"10-31",accent:"#ff9a2e",bar_background:"#2b1a0e",bar_text:"light"}};function ue(t){const e=/^(\d{1,2})-(\d{1,2})$/.exec(String(t??"").trim());if(!(!e||+e[1]<1||+e[1]>12||+e[2]<1||+e[2]>31))return`${e[1].padStart(2,"0")}-${e[2].padStart(2,"0")}`}function be(t){if(!Array.isArray(t))return;const e=[];for(const o of t){const t="string"==typeof o?{theme:o}:o;if(!t||"object"!=typeof t)continue;const i="string"==typeof t.theme?pe[t.theme]:void 0;if(void 0!==t.theme&&!i)continue;const a=ue(t.from)??i?.from,r=ue(t.to)??i?.to;if(!a||!r||void 0!==t.from&&!ue(t.from)||void 0!==t.to&&!ue(t.to))continue;const n={...i,from:a,to:r};i&&(n.name=t.theme),"string"==typeof t.name&&(n.name=t.name);for(const e of["accent","bar_background"])"string"==typeof t[e]&&t[e]&&(n[e]=t[e]);["auto","light","dark"].includes(t.bar_text)&&(n.bar_text=t.bar_text),t.styles&&"object"==typeof t.styles&&(n.styles={...i?.styles??{},...t.styles}),e.push(n)}return e.length?e:void 0}function me(t,e=30){const o=Number(t);return Number.isFinite(o)&&o>0?Math.min(3600,Math.max(5,Math.round(o))):e}function _e(t){const e=(Array.isArray(t)?t:t?[t]:[]).filter(t=>t&&"object"==typeof t&&"string"==typeof t.entity&&t.entity&&("string"==typeof t.tab||"number"==typeof t.tab)).map(t=>{const e={entity:t.entity,tab:t.tab,duration:me(t.duration)};return void 0!==t.state&&null!==t.state&&""!==t.state&&(e.state=String(t.state)),"string"==typeof t.message&&t.message&&(e.message=t.message),"string"==typeof t.icon&&t.icon&&(e.icon=t.icon),e});return e.length?e:void 0}var ge=/^([01]?\d|2[0-3]):([0-5]\d)$/;function fe(t){let e,o,i;"string"==typeof t?[e,o]=t.split(/[-–]/).map(t=>t.trim()):t&&"object"==typeof t&&({from:e,to:o,entity:i}=t);const a={};return"string"==typeof e&&"string"==typeof o&&ge.test(e.trim())&&ge.test(o.trim())&&(a.from=e.trim(),a.to=o.trim()),"string"==typeof i&&i.trim()&&(a.entity=i.trim()),a.from||a.entity?a:void 0}function ye(t){if(!0===t)return.3;const e=Number(t);return"number"==typeof t&&Number.isFinite(e)&&e>0?Math.min(1,Math.round(100*e)/100):void 0}var ve=["areas","labels","floors","domains","devices","todo","calendars","cameras","zones","updates","repairs","notifications","taskmate","z2m_tracker"],we={areas:"area",floors:"floor",labels:"label"},ke={name:"{{ item.name }}",icon:"{{ item.icon }}",card:{type:"entities",entities:"{{ item.entities }}"}},xe=new WeakSet([ke]),$e=t=>(xe.add(t),t),Ae={todo:$e({name:"{{ item.name }}",icon:"mdi:clipboard-list-outline",badge:"{{ item.id }}",card:{type:"todo-list",entity:"{{ item.id }}"}}),calendars:$e({name:"{{ item.name }}",icon:"mdi:calendar",card:{type:"calendar",entities:["{{ item.id }}"],initial_view:"listWeek"}}),cameras:$e({name:"{{ item.name }}",icon:"mdi:cctv",card:{type:"picture-entity",entity:"{{ item.id }}",camera_view:"auto",show_state:!1}}),updates:$e({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.version }}",card:{type:"entities",entities:["{{ item.id }}"]}}),repairs:$e({name:"{{ item.name }}",icon:"{{ item.icon }}",card:{type:"vertical-stack",cards:[{type:"markdown",content:"{{ item.description }}"},{type:"entities",entities:[{type:"button",icon:"mdi:tools",name:"{{ item.open }}",action_name:"{{ item.open }}",tap_action:{action:"navigate",navigation_path:"/config/repairs"}}]}]}}),notifications:$e({name:"{{ item.name }}",icon:"mdi:bell-outline",card:{type:"vertical-stack",cards:[{type:"markdown",content:"{{ item.message }}"},{type:"entities",entities:[{type:"button",icon:"mdi:bell-check-outline",name:"{{ item.dismiss }}",action_name:"{{ item.dismiss }}",tap_action:{action:"perform-action",perform_action:"persistent_notification.dismiss",data:{notification_id:"{{ item.id }}"}}}]}]}}),taskmate:$e({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.left }}",card:"{{ item.card }}"}),z2m_tracker:$e({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.count }}",card:{type:"markdown",content:"{{ item.text }}"}}),zones:$e({name:"{{ item.name }}",icon:"{{ item.icon }}",badge:"{{ item.count }}",card:{type:"map",entities:"{{ item.entities }}"}})};function Se(t){const e=we[t.source];return"tiles"===t.content&&e?$e({name:"{{ item.name }}",icon:"{{ item.icon }}",[e]:"{{ item.id }}",...t.domains?.length?{domains:t.domains}:{}}):Ae[t.source]??ke}var Ce={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermostat",cover:"mdi:window-shutter",fan:"mdi:fan",media_player:"mdi:television",lock:"mdi:lock",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-blank-circle-outline",person:"mdi:account",scene:"mdi:palette",script:"mdi:script-text",automation:"mdi:robot"},ze={offline:"mdi:lan-disconnect","low battery":"mdi:battery-alert-variant-outline","weak signal":"mdi:signal-cellular-1","chatty device":"mdi:message-flash-outline","frozen reading":"mdi:snowflake-alert",unidentified:"mdi:help-circle-outline","coordinator backup":"mdi:content-save-alert-outline"},Ee=["light","switch","climate","cover","fan","media_player","lock","camera","vacuum"],Le=/^[a-z0-9_]+$/,Oe=/^[a-z0-9_]+(\.[a-z0-9_]+)?$/;function Te(t){return"["+t.map(t=>`'${t}'`).join(", ")+"]"}function Me(t){return"{"+Object.entries(t).map(([t,e])=>`'${t}': '${e}'`).join(", ")+"}"}var He=["{%- set ns = namespace(out=[]) -%}"],je=["{{ ns.out | tojson }}"];function Ne(t){const e=(t.domains??[]).map(String).filter(t=>Le.test(t)),o=Te((t.exclude??[]).map(String).filter(t=>Oe.test(t))),i=e.length?` | select('match', '^(${e.join("|")})\\\\.')`:"",a=t=>`{%- set ns.out = ns.out + [{${t}}] -%}`,r=t=>["{%- if ents | count > 0 -%}",a(t),"{%- endif -%}"];switch(t.source){case"areas":case"labels":{const e="areas"===t.source,a=e?"mdi:texture-box":"mdi:label-outline";return[...He,`{%- for id in ${e?"areas()":"labels()"} if id not in ${o} -%}`,`{%- set ents = ${e?"area_entities":"label_entities"}(id)${i} | list -%}`,...r(`'id': id, 'name': ${e?"area_name":"label_name"}(id), 'icon': '${a}', 'entities': ents`),"{%- endfor -%}",...je].join("\n")}case"floors":return[...He,`{%- for id in floors() if id not in ${o} -%}`,"{%- set acc = namespace(l=[]) -%}","{%- for a in floor_areas(id) -%}{%- set acc.l = acc.l + (area_entities(a) | list) -%}{%- endfor -%}",`{%- set ents = acc.l${i} | list -%}`,...r("'id': id, 'name': floor_name(id), 'icon': 'mdi:home-floor-1', 'entities': ents"),"{%- endfor -%}",...je].join("\n");case"domains":{const t=e.length?e:Ee;return[...He,`{%- set icons = ${Me(Ce)} -%}`,`{%- for id in ${Te(t)} if id not in ${o} -%}`,"{%- set ents = states[id] | map(attribute='entity_id') | list -%}",...r("'id': id, 'name': id | replace('_', ' ') | capitalize, 'icon': icons.get(id, 'mdi:shape'), 'entities': ents"),"{%- endfor -%}",...je].join("\n")}case"devices":return[...He,"{%- for id in states | map(attribute='entity_id') | map('device_id') | reject('none') | unique | list -%}",`{%- if id not in ${o} -%}`,`{%- set ents = device_entities(id)${i} | list -%}`,...r("'id': id, 'name': device_attr(id, 'name_by_user') or device_attr(id, 'name'), 'icon': 'mdi:devices', 'entities': ents"),"{%- endif -%}","{%- endfor -%}","{{ ns.out | sort(attribute='name') | tojson }}"].join("\n");case"todo":case"calendars":case"cameras":{const e={todo:"todo",calendars:"calendar",cameras:"camera"}[t.source];return[...He,`{%- for s in states.${e} if s.entity_id not in ${o} -%}`,a("'id': s.entity_id, 'name': s.name"),"{%- endfor -%}",...je].join("\n")}case"updates":return[...He,`{%- for s in states.update | selectattr('state', 'eq', 'on') if s.entity_id not in ${o} -%}`,a("'id': s.entity_id, 'name': s.attributes.title or s.name, 'icon': s.attributes.icon or 'mdi:package-up', 'version': s.attributes.latest_version or ''"),"{%- endfor -%}",...je].join("\n");case"repairs":case"notifications":return"";case"taskmate":return["{%- set ns = namespace(out=[], seen=[]) -%}","{%- set ents = expand(integration_entities('taskmate') | select('match', '^sensor\\.') | list) -%}","{%- set overview = ents | selectattr('attributes.children', 'defined') | map(attribute='entity_id') | first | default('') -%}","{%- set watches = ents | selectattr('attributes.left', 'defined') | selectattr('attributes.child_id', 'defined') | list -%}","{%- for s in ents | selectattr('attributes.child_name', 'defined') | selectattr('attributes.total_points_earned', 'defined') -%}","{%- set id = s.attributes.child_id | default('') -%}",`{%- if id and id not in ns.seen and id not in ${o} -%}`,"{%- set ns.seen = ns.seen + [id] -%}","{%- set w = watches | selectattr('attributes.child_id', 'eq', id) | first | default(none) -%}","{%- set avatar = s.attributes.avatar | default('') | string -%}","{%- set card = {'type': 'custom:taskmate-child-card', 'entity': overview, 'child_id': id} if overview else {'type': 'entities', 'entities': [s.entity_id] + ([w.entity_id] if w else [])} -%}",a("'id': id, 'name': s.attributes.child_name, 'icon': avatar if avatar.startswith('mdi:') else 'mdi:account', 'left': (w.attributes.left | string) if w and w.attributes.left else '', 'points': s.state, 'entity': overview, 'card': card"),"{%- endif -%}","{%- endfor -%}","{{ ns.out | sort(attribute='name') | tojson }}"].join("\n");case"z2m_tracker":return["{%- set ns = namespace(out=[], kinds=[]) -%}",`{%- set icons = ${Me(ze)} -%}`,"{%- set src = expand(integration_entities('z2m_tracker') | select('match', '^sensor\\.') | list) | selectattr('attributes.warnings', 'defined') | first | default(none) -%}","{%- set warnings = src.attributes.warnings | list if src else [] -%}","{%- for w in warnings if w.issue is defined -%}","{%- if w.issue not in ns.kinds and (w.issue | lower | replace(' ', '_')) not in "+o+" -%}{%- set ns.kinds = ns.kinds + [w.issue] -%}{%- endif -%}","{%- endfor -%}","{%- for kind in ns.kinds -%}","{%- set rows = warnings | selectattr('issue', 'eq', kind) | list -%}","{%- set t = namespace(text='') -%}","{%- for w in rows -%}{%- set t.text = t.text ~ '- **' ~ w.device ~ '**' ~ ((' · ' ~ w.detail) if w.detail else '') ~ '\\n' -%}{%- endfor -%}",a("'id': kind | lower | replace(' ', '_'), 'name': kind, 'icon': icons.get(kind | lower, 'mdi:alert-circle-outline'), 'count': rows | count | string, 'critical': rows | selectattr('critical') | list | count > 0, 'devices': rows | map(attribute='device') | list, 'text': t.text"),"{%- endfor -%}",...je].join("\n");case"zones":return[...He,`{%- for z in states.zone if z.entity_id not in ${o} -%}`,"{%- set key = 'home' if z.entity_id == 'zone.home' else z.name -%}","{%- set people = states.person | selectattr('state', 'eq', key) | map(attribute='entity_id') | list -%}",a("'id': z.entity_id, 'name': z.name, 'icon': z.attributes.icon or 'mdi:map-marker-radius', 'entities': [z.entity_id] + people, 'count': people | count | string"),"{%- endfor -%}",...je].join("\n")}}var Ve=["selection","light","medium","heavy","success","warning","failure"],Be={style:"text",align:"start",styles:{"--tabdeck-tab-height":"36px","--tabdeck-tab-font-size":"13px"}},Pe=["top","bottom","left","right"],Re=["underline","pill","segmented","boxed","text","rail"],Ie=["none","browser","url","entity"],qe=["both","icon","label","active","dots"],De=["start","center","end","justify"],Ue=["text","dot"],Fe=["none","fade","slide","scale","flip","rise"];function We(t,e,o){return e.includes(t)?t:o}function Ke(t,e,o,i){const a=Number(t);return Number.isFinite(a)?Math.min(o,Math.max(e,a)):i}function Ze(t){if(t)return"string"==typeof t?{entity:t}:"object"==typeof t&&"string"==typeof t.entity?void 0===t.state?{entity:t.entity}:{entity:t.entity,state:String(t.state)}:void 0}function Je(t){return t&&"object"==typeof t&&t.action&&"none"!==t.action?t:void 0}function Ge(t){if(!0===t)return!0;const e=Number(t);return!1!==t&&null!==t&&""!==t&&Number.isFinite(e)&&e>0?Math.min(e,60):void 0}function Ye(t){if(!0===t)return!0;const e="string"==typeof t?{text:t}:t;if(!e||"object"!=typeof e||"string"!=typeof e.text&&void 0!==e.text)return;const o={};return e.text?.trim()&&(o.text=e.text),"string"==typeof e.icon&&e.icon&&(o.icon=e.icon),"string"==typeof e.color&&e.color&&(o.color=e.color),o}function Xe(t){if(!Array.isArray(t))return;const e=t.filter(t=>t&&"object"==typeof t&&(t.badge||t.icon)).map(t=>{const e={};return void 0!==t.badge&&null!==t.badge&&""!==t.badge&&(e.badge="object"==typeof t.badge?t.badge:String(t.badge)),"string"==typeof t.icon&&t.icon&&(e.icon=t.icon),"string"==typeof t.color&&t.color&&(e.color=t.color),e});return e.length?e:void 0}function Qe(t){const e=t?.attributes??{};let o,i=t?.card??{};if(Array.isArray(t?.children)&&t.children.length>0){const e="menu"===t.children_display?"menu":"row",a=t.children_options&&"object"==typeof t.children_options?t.children_options:{};i={type:"custom:tabdeck-card",...Be,...a,hide_bar:"menu"===e,tabs:t.children},o={display:e,items:t.children.map(t=>({name:t?.name??t?.attributes?.label,icon:t?.icon}))}}else if("sections"===t?.layout&&Array.isArray(t?.sections)&&t.sections.length>0){const e=Number(t?.max_columns);i={type:"custom:tabdeck-sections-card",max_columns:Number.isFinite(e)&&e>=1?Math.round(e):4,sections:t.sections}}else if(Array.isArray(t?.cards)&&t.cards.length>0){const e=Number(t?.columns),o=Number(t?.min_column_width);i="masonry"===t?.layout?{type:"custom:tabdeck-masonry-card",...Number.isFinite(o)&&o>0?{min_column_width:o}:{columns:Number.isFinite(e)&&e>=1?Math.round(e):2},cards:t.cards}:Number.isFinite(e)&&e>1?{type:"grid",columns:e,square:!1,cards:t.cards}:{type:"vertical-stack",cards:t.cards}}else t?.card||(i=re(t)??i);return{name:t?.name??e.label??void 0,subtitle:t?.subtitle??void 0,icon:t?.icon??e.icon??void 0,accent:t?.accent??void 0,color:t?.color??void 0,badge:t?.badge??void 0,badge_color:t?.badge_color??void 0,badge_icon:"string"==typeof t?.badge_icon&&t.badge_icon?t.badge_icon:void 0,ring:void 0===t?.ring||null===t.ring||""===t.ring?void 0:String(t.ring),ring_max:Number(t?.ring_max)>0?Number(t.ring_max):void 0,ring_color:"string"==typeof t?.ring_color&&t.ring_color?t.ring_color:void 0,ring_style:"bar"===t?.ring_style?"bar":void 0,graph:Nt(t?.graph)?t.graph:void 0,badges:Xe(t?.badges),tooltip:"string"==typeof t?.tooltip&&t.tooltip.trim()?t.tooltip:void 0,countdown:"string"==typeof t?.countdown&&t.countdown.trim()?t.countdown.trim():void 0,pin:void 0===t?.pin||null===t.pin||""===t.pin?void 0:String(t.pin),pin_timeout:Number(t?.pin_timeout)>0?Number(t.pin_timeout):void 0,area:"string"==typeof t?.area&&t.area?t.area:void 0,floor:"string"==typeof t?.floor&&t.floor?t.floor:void 0,label:"string"==typeof t?.label&&t.label?t.label:void 0,domains:Array.isArray(t?.domains)&&t.domains.length?t.domains.map(String):void 0,badge_format:Ht(t?.badge_format),disabled:!!t?.disabled||void 0,fab:!!t?.fab||void 0,card_size:"number"==typeof t?.card_size?t.card_size:void 0,hold_action:t?.hold_action??void 0,badge_action:t?.badge_action??void 0,double_tap_action:Je(t?.double_tap_action),tap_action:t?.tap_action&&"object"==typeof t.tap_action&&"none"!==t.tap_action.action?t.tap_action:void 0,enter_action:Je(t?.enter_action),leave_action:Je(t?.leave_action),auto_select:Ze(t?.auto_select),default_if:t?.default_if??void 0,visibility:t?.visibility??void 0,alert:Array.isArray(t?.alert)&&t.alert.length>0?t.alert:void 0,background:"string"==typeof t?.background&&t.background.trim()?t.background:void 0,page_background:"string"==typeof t?.page_background&&t.page_background.trim()?t.page_background:void 0,layout:"masonry"===t?.layout&&Array.isArray(t?.cards)&&t.cards.length>0?"masonry":"sections"===t?.layout&&Array.isArray(t?.sections)&&t.sections.length>0&&!o?"sections":void 0,styles:t?.styles&&"object"==typeof t.styles&&!Array.isArray(t.styles)?t.styles:void 0,icon_animation:"string"==typeof t?.icon_animation&&t.icon_animation?t.icon_animation:void 0,picture:"string"==typeof t?.picture&&t.picture.trim()?t.picture.trim():void 0,font_size:Dt(t?.font_size),font_weight:eo(t?.font_weight),font_family:eo(t?.font_family),pip:!!t?.pip||void 0,keep_awake:!!t?.keep_awake||void 0,watch:Array.isArray(t?.watch)?t.watch.map(String):"string"==typeof t?.watch&&t.watch?[t.watch]:void 0,separator:"line"===t?.separator||"space"===t?.separator?t.separator:void 0,tab_ref:"string"==typeof t?.tab_ref&&t.tab_ref.trim()?t.tab_ref.trim():void 0,use:"string"==typeof t?.use&&t.use?t.use:void 0,vars:t?.vars&&"object"==typeof t.vars&&!Array.isArray(t.vars)?t.vars:void 0,view:"string"==typeof t?.view?t.view.trim()||void 0:t?.view&&"object"==typeof t.view?t.view:void 0,url:"string"==typeof t?.url&&t.url.trim()?t.url.trim():void 0,aspect_ratio:("string"==typeof t?.aspect_ratio||"number"==typeof t?.aspect_ratio)&&String(t.aspect_ratio).trim()||void 0,markdown:"string"==typeof t?.markdown&&t.markdown.trim()?t.markdown:void 0,empty_message:de(t?.empty_message)?t.empty_message:void 0,zoom:ce(t?.zoom),padding:le(t?.padding),spacing:le(t?.spacing),auto_refresh:Number(t?.auto_refresh)>0?Math.max(.1,Number(t.auto_refresh)):void 0,group:o,children:o?t.children:void 0,children_display:o?o.display:void 0,children_options:o&&t.children_options&&"object"==typeof t.children_options?t.children_options:void 0,card:i}}function to(t){const e="object"==typeof t&&null!==t?t:{interval:t},o=Number(e.interval);if(Number.isFinite(o)&&!(o<=0))return{interval:Math.max(2,o),resume_after:Ke(e.resume_after,0,86400,60)}}function eo(t){return"number"==typeof t&&Number.isFinite(t)?String(t):"string"==typeof t&&t.trim()&&!/[;{}<>]/.test(t)?t.trim():void 0}function oo(t){return t&&"object"==typeof t&&!Array.isArray(t)&&Object.keys(t).length?t:void 0}function io(t){return Array.isArray(t)&&t.length>0?t:void 0}function ao(t){return"tallest"===t?"tallest":Dt(t)??"auto"}function ro(t){const e="object"==typeof t&&null!==t?t:{min_width:t},o=Number(e.min_width);if(Number.isFinite(o)&&!(o<=0))return{min_width:o,columns:Math.round(Ke(e.columns,2,4,2))}}function no(t,e){const o={...t,...e};return(t.styles||e.styles)&&(o.styles={...t.styles??{},...e.styles??{}}),o}function so(t,e,o){if(!t||"object"!=typeof t)return t;let i=t;const a="string"==typeof t.use?e?.[t.use]:void 0;if(a&&"object"==typeof a&&(i=no(Gt(a,t.vars??{},0),t)),o){const{name:t,card:e,cards:a,...r}=o;i=no(r,i)}return i}function co(t,e={}){t=function(t){if(!t||!Rt(t.preset))return t;const e=It(t.preset),o={...e};for(const[i,a]of Object.entries(t))void 0!==a&&(o[i]=a);return o.styles={...e.styles,...t.styles??{}},o}(t);const o=oo(t?.tab_defaults),i=oo(t?.tab_templates),a=Array.isArray(t?.tabs)?t.tabs:[],r=!1===e.expand?a:a.map(t=>so(t,i,o)),n=function(t){if(t&&"object"==typeof t){if(ve.includes(t.source)){const e=Array.isArray(t.domains)?t.domains.map(String):void 0,o=Array.isArray(t.exclude)?t.exclude.map(String):void 0,i="tiles"===t.content?"tiles":void 0;return{source:t.source,domains:e,exclude:o,content:i,template:Ne({source:t.source,domains:e,exclude:o}),tab_template:t.tab_template&&"object"==typeof t.tab_template?t.tab_template:Se({source:t.source,content:i,domains:e})}}if("string"==typeof t.template&&""!==t.template.trim())return{template:t.template,tab_template:t.tab_template&&"object"==typeof t.tab_template?t.tab_template:void 0}}}(t?.auto_tabs);if(0===r.length&&!n)throw new Error("tabdeck-card: you must define at least one tab (or auto_tabs).");const s=t?.default_tab??t?.options?.defaultTabIndex??0;return{type:t?.type??"custom:tabdeck-card",default_tab:s,position:We(t?.position,Pe,"top"),style:We(t?.style,Re,"underline"),tab_display:We(t?.tab_display,qe,"both"),align:We(t?.align,De,"start"),badge_display:We(t?.badge_display,Ue,"text"),hide_inactive_badge:Boolean(t?.hide_inactive_badge),badge_bounce:Boolean(t?.badge_bounce),badge_format:Ht(t?.badge_format),transition:We(t?.transition,Fe,"none"),indicator_size:Ke(t?.indicator_size,1,16,3),indicator_radius:void 0===t?.indicator_radius?void 0:Ke(t?.indicator_radius,0,999,0),scrollable:void 0===t?.scrollable?"auto":t.scrollable,remember:We(t?.remember,Ie,"none"),remember_entity:t?.remember_entity??void 0,storage_key:t?.storage_key??void 0,lazy:Boolean(t?.lazy),preload:!0===t?.preload||"idle"===t?.preload?"idle":"all"===t?.preload?"all":void 0,unmount_hidden:Boolean(t?.unmount_hidden),swipe_wrap:Boolean(t?.swipe_wrap),swipe_mouse:Boolean(t?.swipe_mouse),wheel_switch:Boolean(t?.wheel_switch),swipe_lock:Boolean(t?.swipe_lock),swipe_edge:!0===t?.swipe_edge?40:"number"==typeof t?.swipe_edge?Ke(t.swipe_edge,8,400,40):void 0,animated:void 0===t?.animated||Boolean(t.animated),liquid_indicator:Boolean(t?.liquid_indicator),accent_indicator:void 0===t?.accent_indicator||Boolean(t.accent_indicator),picture_accent:Boolean(t?.picture_accent),header:Boolean(t?.header),aria_label:t?.aria_label??void 0,sticky:Boolean(t?.sticky),bar_autohide:Boolean(t?.bar_autohide),elevation:Boolean(t?.elevation),scroll_buttons:Boolean(t?.scroll_buttons),bar_fade:!1!==t?.bar_fade,overflow_menu:Boolean(t?.overflow_menu),hidden_alerts:Boolean(t?.hidden_alerts),summary_chip:Ye(t?.summary_chip),bar_background:t?.bar_background??void 0,glass:Ge(t?.glass),seasons:be(t?.seasons),direction:"rtl"===t?.direction||"ltr"===t?.direction?t.direction:void 0,bar_text:!0===t?.bar_text?"auto":["auto","light","dark"].includes(t?.bar_text)?t.bar_text:void 0,swipe:Boolean(t?.swipe),styles:t?.styles??{},tabs:r.map(Qe),auto_tabs:n,auto_rotate:to(t?.auto_rotate),scroll_spy:Boolean(t?.scroll_spy),split:ro(t?.split),tab_display_narrow:qe.includes(t?.tab_display_narrow)?t.tab_display_narrow:void 0,narrow_width:Ke(t?.narrow_width,100,4e3,450),preset:Rt(t?.preset)?t.preset:void 0,collapsible:Boolean(t?.collapsible),start_collapsed:Boolean(t?.collapsible&&t?.start_collapsed),idle_return:Number(t?.idle_return)>0?Math.max(5,Number(t.idle_return)):void 0,idle_dim:Wt(t?.idle_dim),dock:Boolean(t?.dock),content_arrows:Boolean(t?.content_arrows),hide_bar:Boolean(t?.hide_bar),search:Boolean(t?.search),hotkeys:Boolean(t?.hotkeys),history:Boolean(t?.history),customize:Boolean(t?.customize),rail_expand:Boolean(t?.rail_expand),edit_mode_reveal:void 0===t?.edit_mode_reveal||Boolean(t.edit_mode_reveal),transition_duration:Ke(t?.transition_duration,0,2e3,180),transition_narrow:Fe.includes(t?.transition_narrow)?t.transition_narrow:void 0,transition_easing:"string"==typeof t?.transition_easing&&t.transition_easing.trim()&&!/[;{}"<>]/.test(t.transition_easing)?t.transition_easing.trim():"ease",content_height:ao(t?.content_height),content_max_height:Dt(t?.content_max_height),header_cards:io(t?.header_cards),footer_cards:io(t?.footer_cards),fullscreen:Boolean(t?.fullscreen),swipe_peek:Boolean(t?.swipe_peek),hold_peek:Boolean(t?.hold_peek),changed_dot:Boolean(t?.changed_dot),sort_by_usage:Boolean(t?.sort_by_usage),health_dim:Ut(t?.health_dim),alert_first:Boolean(t?.alert_first),alert_snooze:Number(t?.alert_snooze)>0?Number(t.alert_snooze):void 0,default_by_time:oo(t?.default_by_time),default_by_device:oo(t?.default_by_device),learned_default:ho(t?.learned_default),fire_event:Boolean(t?.fire_event),event_id:"string"==typeof t?.event_id&&t.event_id?t.event_id:void 0,remote_entity:"string"==typeof t?.remote_entity&&t.remote_entity?t.remote_entity:void 0,remote_event:Boolean(t?.remote_event),follow_room:lo(t?.follow_room),takeover:_e(t?.takeover),quiet_hours:fe(t?.quiet_hours),tab_defaults:o,tab_templates:i,companion:!0===t?.companion,companion_id:"string"==typeof t?.companion_id&&t.companion_id.trim()?t.companion_id.trim():void 0,usage_stats:Mt(t?.usage_stats),offline_banner:!0===t?.offline_banner||void 0,debug:"speed"===t?.debug?"speed":Boolean(t?.debug),haptic:!0===t?.haptic?"selection":Ve.includes(t?.haptic)?t.haptic:void 0,click_sound:ye(t?.click_sound),breadcrumbs:!0===t?.breadcrumbs?{}:t?.breadcrumbs&&"object"==typeof t.breadcrumbs?{root:"string"==typeof t.breadcrumbs.root&&t.breadcrumbs.root?t.breadcrumbs.root:void 0}:void 0,density:"compact"===t?.density||"comfortable"===t?.density?t.density:"default",unload_after:Number(t?.unload_after)>0?Math.max(1,Number(t.unload_after)):void 0,overview:Boolean(t?.overview),entity_search:Boolean(t?.entity_search),sync_group:Yt(t?.sync_group),popup:Xt(t?.popup),wizard:Qt(t?.wizard),last_tab_button:Boolean(t?.last_tab_button),drag_reorder:Boolean(t?.drag_reorder),compare:Boolean(t?.compare),share_button:ee(t?.share_button),orientation_layout:ae(t?.orientation_layout),loading_placeholder:Boolean(t?.loading_placeholder),friendly_errors:Boolean(t?.friendly_errors),scroll_memory:Boolean(t?.scroll_memory),bar_limit:he(t?.bar_limit)}}function lo(t){const e="string"==typeof t?t:t?.entity;if("string"!=typeof e||!e.trim())return;const o="object"==typeof t?oo(t.map):void 0;return o?{entity:e.trim(),map:o}:{entity:e.trim()}}function ho(t){if(!t)return;const e="object"!=typeof t||Array.isArray(t)?{}:t,o=Number(e.min_uses);return{min_uses:Number.isFinite(o)&&o>=1?Math.min(100,Math.round(o)):3,notice:void 0===e.notice||Boolean(e.notice)}}function po(t){return"string"==typeof t&&(t.includes("{{")||t.includes("{%"))}var uo=class extends EventTarget{constructor(t){super(),this._entries=new Map,this._subscribe=t}track(t){const e=new Set(t.filter(t=>!!t));for(const[o,i]of this._entries)e.has(o)||(i.unsub(),this._entries.delete(o));for(const o of e){if(this._entries.has(o))continue;const t={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(o,t),t.unsub=this._subscribe(o,e=>{t.result=e,t.hasResult=!0,t.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:o}}))},()=>{t.error=!0,t.hasResult=!1,t.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:o}}))})}}result(t){const e=this._entries.get(t);if(e&&!e.error&&e.hasResult)return e.result}boolean(t){const e=this._entries.get(t);return!(!e||e.error||!e.hasResult)&&("boolean"==typeof(o=e.result)?o:"number"==typeof o?0!==o:"string"==typeof o&&["1","true","yes","on","enable"].includes(o.trim().toLowerCase()));var o}destroy(){for(const t of this._entries.values())t.unsub();this._entries.clear()}};function bo(t){const e=t?.entity_id||t?.entity;return Array.isArray(e)?e.filter(t=>"string"==typeof t&&t):"string"==typeof e&&e?[e]:[]}function mo(t,e,o){const i=bo(t);return i.length>0&&i.every(t=>void 0!==e.states[t]&&o(e.states[t].state))}var _o=["sun","mon","tue","wed","thu","fri","sat"];function go(t){const e=/^(\d{1,2}):(\d{2})/.exec(String(t));return e?60*Number(e[1])+Number(e[2]):null}function fo(t){return Array.isArray(t?.conditions)?t.conditions:[]}function yo(t,e,o){switch(t?.condition){case"state":return function(t,e){return mo(t,e,e=>Array.isArray(t.state)?t.state.includes(e):void 0!==t.state?e===t.state:void 0!==t.state_not&&(Array.isArray(t.state_not)?!t.state_not.includes(e):e!==t.state_not))}(t,e);case"numeric_state":return function(t,e){return mo(t,e,e=>{const o=Number(e);return!Number.isNaN(o)&&(void 0===t.above||o>Number(t.above))&&(void 0===t.below||o<Number(t.below))&&(void 0!==t.above||void 0!==t.below)})}(t,e);case"screen":return function(t){return!(!t.media_query||"function"!=typeof matchMedia)&&matchMedia(t.media_query).matches}(t);case"time":return function(t,e=new Date){const o=void 0!==t.after,i=void 0!==t.before,a=Array.isArray(t.weekday)&&t.weekday.length>0;if(!o&&!i&&!a)return!1;const r=60*e.getHours()+e.getMinutes();let n=!0;if(o&&i){const e=go(t.after),o=go(t.before);if(null===e||null===o)return!1;n=e<=o?r>=e&&r<o:r>=e||r<o}else if(o){const e=go(t.after);if(null===e)return!1;n=r>=e}else if(i){const e=go(t.before);if(null===e)return!1;n=r<e}if(n&&a){const o=_o[e.getDay()];n=t.weekday.map(t=>String(t).toLowerCase().slice(0,3)).includes(o)}return n}(t);case"user":return function(t,e){const o=e?.user?.id;return!(!o||!Array.isArray(t.users))&&t.users.includes(o)}(t,e);case"template":return function(t,e){return!(!e||!t.value_template)&&!0===e(t.value_template)}(t,o);case"and":return fo(t).every(t=>yo(t,e,o));case"or":return fo(t).some(t=>yo(t,e,o));case"not":return!fo(t).some(t=>yo(t,e,o));default:return!1}}var vo=t=>Array.isArray(t)?t.map(String):[String(t)];function wo(t,e,o){const i=String(t?.condition??"unknown"),a=yo(t,e,o),r=bo(t)[0],n=r?e.states?.[r]:void 0,s=r?{entity:r,current:n?.state,missing:!n}:{};switch(i){case"state":{const e=void 0===t.state&&void 0!==t.state_not;return{type:i,met:a,...s,negate:e,expected:vo(e?t.state_not:t.state)}}case"numeric_state":return{type:i,met:a,...s,above:void 0===t.above?void 0:Number(t.above),below:void 0===t.below?void 0:Number(t.below)};case"screen":return{type:i,met:a,media_query:t.media_query};case"time":return{type:i,met:a,after:t.after,before:t.before,weekday:Array.isArray(t.weekday)?t.weekday.map(String):void 0};case"user":return{type:i,met:a,count:Array.isArray(t.users)?t.users.length:0};case"template":return{type:i,met:a,pending:!o||void 0===o(t.value_template)};case"and":case"or":case"not":return{type:i,met:a,children:(Array.isArray(t.conditions)?t.conditions:[]).map(t=>wo(t,e,o))};default:return{type:"unknown",met:!1}}}function ko(t,e,o){const i=(Array.isArray(t)?t:[]).map(t=>wo(t,e,o));return{met:i.every(t=>t.met),items:i}}var xo=t=>!!t&&"object"==typeof t&&!Array.isArray(t),$o=(t,e)=>"string"==typeof t?.name&&t.name&&!po(t.name)?t.name:`#${e+1}`,Ao=t=>t.length>6?[...t.slice(0,5),"…"]:t;var So=["1.6.0","1.5.0"],Co="tabdeck-whats-new";function zo(t,e){const o=t.split(/[.-]/).map(t=>parseInt(t,10)||0),i=e.split(/[.-]/).map(t=>parseInt(t,10)||0);for(let a=0;a<Math.max(o.length,i.length);a++){const t=(o[a]??0)-(i[a]??0);if(t)return t<0?-1:1}return 0}var Eo,Lo=new Set(["accent_indicator","alert_first","alert_snooze","align","animated","aria_label","auto_rotate","auto_tabs","badge_bounce","badge_display","badge_format","bar_autohide","bar_background","bar_fade","bar_limit","bar_text","breadcrumbs","changed_dot","click_sound","collapsible","companion","companion_id","compare","content_arrows","content_height","content_max_height","customize","debug","default_by_device","default_by_time","default_tab","density","direction","dock","drag_reorder","edit_mode_reveal","elevation","entity_search","event_id","fire_event","follow_room","footer_cards","friendly_errors","fullscreen","glass","haptic","header","header_cards","health_dim","hidden_alerts","hide_bar","hide_inactive_badge","history","hold_peek","hotkeys","idle_dim","idle_return","indicator_radius","indicator_size","last_tab_button","lazy","learned_default","liquid_indicator","loading_placeholder","narrow_width","offline_banner","options","orientation_layout","overflow_menu","overview","picture_accent","popup","position","preload","preset","quiet_hours","rail_expand","remember","remember_entity","remote_entity","remote_event","scroll_buttons","scroll_memory","scroll_spy","scrollable","search","seasons","share_button","sort_by_usage","split","start_collapsed","sticky","storage_key","style","styles","summary_chip","swipe","swipe_edge","swipe_lock","swipe_mouse","swipe_peek","swipe_wrap","sync_group","tab_defaults","tab_display","tab_display_narrow","tab_templates","tabs","takeover","transition","transition_duration","transition_easing","transition_narrow","type","unload_after","unmount_hidden","usage_stats","wheel_switch","wizard"]),Oo=new Set(["accent","alert","area","aspect_ratio","attributes","auto_refresh","auto_select","background","badge","badge_action","badge_color","badge_format","badge_icon","badges","card","card_size","cards","children","children_display","children_options","color","columns","countdown","default_if","disabled","domains","double_tap_action","empty_message","enter_action","fab","floor","font_family","font_size","font_weight","graph","hold_action","icon","icon_animation","keep_awake","label","layout","leave_action","markdown","max_columns","min_column_width","name","padding","page_background","picture","pin","pin_timeout","pip","ring","ring_color","ring_max","ring_style","sections","separator","spacing","styles","subtitle","tab_ref","tap_action","tooltip","url","use","vars","view","visibility","watch","zoom"]),To=new Set(["type","grid_options","view_layout","layout_options","visibility"]),Mo=t=>!!t&&"object"==typeof t&&!Array.isArray(t),Ho=t=>null!=t&&""!==t&&!1!==t,jo=(t,e)=>"string"==typeof t?.name&&t.name?t.name:`#${e+1}`;function No(t){return"string"==typeof t?t.includes("{{")||t.includes("{%")?1:0:Array.isArray(t)?t.reduce((t,e)=>t+No(e),0):Mo(t)?Object.values(t).reduce((t,e)=>t+No(e),0):0}function Vo(t){if(!Mo(t))return[];const e=Object.fromEntries(Object.entries(t).filter(([t,e])=>"tabs"===t||!((t,e)=>(Eo??=co({tabs:[{name:"a"}]}),JSON.stringify(Eo[t])===JSON.stringify(e)))(t,e))),o=[],i=(t,e,i)=>o.push({level:t,rule:e,vars:i}),a=Array.isArray(e.tabs)?e.tabs.filter(Mo):[],r=function(t){const e=[],o=t=>{for(const i of Array.isArray(t)?t:[])Mo(i)&&(e.push(i),o(i.children))};return o(t),e}(e.tabs),n=Mo(e.tab_defaults)?e.tab_defaults:{},s=(t,e)=>Ho(t[e])||Ho(n[e]);if(e.dock&&e.wizard&&i("warn","dock_wizard"),e.dock&&e.hide_bar&&i("warn","dock_hide_bar"),"entity"!==e.remember||e.remember_entity||i("warn","remember_entity"),Ho(e.default_tab)&&a.length&&!e.auto_tabs){const t=e.default_tab;("number"==typeof t?t>=0&&t<a.length:a.some((e,o)=>e.name===t||String(o)===String(t)))||i("warn","default_tab",{value:String(t)})}const d=t=>s(t,"pin"),c=t=>"number"==typeof t||"string"==typeof t&&/^\d+$/.test(t.trim())&&!a.some(e=>e.name===t)?a[Number(t)]:"string"==typeof t?a.find(e=>e.name===t)??a.find(e=>"string"==typeof e.name&&te(e.name)===te(t)):void 0,l=(t,e)=>{const o=new Set;for(const r of e)r&&!o.has(r)&&d(r)&&(o.add(r),i("warn","pin_auto",{tab:jo(r,a.indexOf(r)),key:t}))};l("takeover",(Array.isArray(e.takeover)?e.takeover:e.takeover?[e.takeover]:[]).map(t=>Mo(t)?c(t.tab):void 0)),Mo(e.follow_room)&&Mo(e.follow_room.map)&&l("follow_room",Object.values(e.follow_room.map).map(c)),Ho(e.remote_entity)&&l("remote_entity",a);const h=e.swipe||e.swipe_mouse;for(const _ of["swipe_lock","swipe_edge"])Ho(e[_])&&!h&&i("info","needs",{key:_,other:"swipe / swipe_mouse"});e.swipe_peek&&!e.swipe&&i("info","needs",{key:"swipe_peek",other:"swipe"}),!e.swipe_wrap||h||e.hotkeys||e.content_arrows||i("info","needs",{key:"swipe_wrap",other:"swipe / hotkeys / content_arrows"}),Ho(e.preload)&&!e.lazy&&i("info","needs",{key:"preload",other:"lazy"}),e.start_collapsed&&!e.collapsible&&i("info","needs",{key:"start_collapsed",other:"collapsible"}),!Ho(e.event_id)||e.fire_event||e.remote_event||i("info","needs",{key:"event_id",other:"fire_event / remote_event"});const p=e.transition&&"none"!==e.transition,u=e.transition_narrow&&"none"!==e.transition_narrow;for(const _ of["transition_duration","transition_easing"])!Ho(e[_])||p||u||i("info","needs",{key:_,other:"transition"});const b=r.some(t=>s(t,"alert"));for(const _ of["alert_first","alert_snooze","hidden_alerts"])Ho(e[_])&&!b&&i("info","needs_tab",{key:_,other:"alert"});r.forEach((t,e)=>{const o=jo(t,e);!Ho(t.badge_color)||s(t,"badge")||s(t,"badge_icon")||i("info","tab_needs",{tab:o,key:"badge_color",other:"badge"});for(const a of["ring_max","ring_color","ring_style"])Ho(t[a])&&!s(t,"ring")&&i("info","tab_needs",{tab:o,key:a,other:"ring"});Ho(t.pin_timeout)&&!s(t,"pin")&&i("info","tab_needs",{tab:o,key:"pin_timeout",other:"pin"})});for(const _ of Object.keys(e))void 0!==e[_]&&(Lo.has(_)||To.has(_)||i("warn","unknown",{key:_}));r.forEach((t,e)=>{for(const o of Object.keys(t))void 0===t[o]||Oo.has(o)||i("warn","unknown_tab",{tab:jo(t,e),key:o})}),r.length>=15&&!e.lazy&&i("perf","many_tabs",{count:r.length}),e.lazy&&"all"===e.preload&&r.length>=15&&i("perf","preload_all",{count:r.length}),r.forEach((t,e)=>{const o=Number(t.auto_refresh);Number.isFinite(o)&&o>0&&o<1&&i("perf","fast_refresh",{tab:jo(t,e)})});const m=r.reduce((t,e)=>{const{card:o,cards:i,children:a,...r}=e;return t+No(r)},0);return m>30&&i("perf","templates",{count:m}),o}var Bo=["rooms","lights","security","media","climate","energy","family"],Po=t=>l("en",t),Ro=(t,e)=>Object.keys(t?.states??{}).filter(t=>t.startsWith(`${e}.`)).sort(),Io=(t,e)=>t?.states?.[e]?.attributes?.friendly_name??e.split(".")[1].replace(/_/g," "),qo=(t,e,o)=>t?.states?.[e]?.attributes?.[o],Do=["door","window","garage_door","opening"];function Uo(t){return Object.keys(t?.areas??{}).length}function Fo(t,e,o=Po){switch(t){case"rooms":return{tabs:[],auto_tabs:{source:"areas"},options:{scrollable:!0,overflow_menu:!0},count:Uo(e)};case"lights":return{tabs:[],auto_tabs:{source:"areas",domains:["light"]},options:{scrollable:!0},count:Ro(e,"light").length};case"security":return function(t,e){const o=Ro(t,"camera"),i=Ro(t,"alarm_control_panel"),a=Ro(t,"lock"),r=Ro(t,"binary_sensor").filter(e=>Do.includes(qo(t,e,"device_class"))),n=[];return i.length&&n.push({name:e("starter.tab.alarm"),icon:"mdi:shield-home",cards:i.map(t=>({type:"alarm-panel",entity:t})),alert:[{condition:"state",entity:i[0],state:"triggered"}]}),o.length&&n.push({name:e("starter.tab.cameras"),icon:"mdi:cctv",columns:o.length>1?2:void 0,cards:o.slice(0,12).map(t=>({type:"picture-entity",entity:t,show_state:!1}))}),r.length&&n.push({name:e("starter.tab.openings"),icon:"mdi:door-open",badge:`{{ ${JSON.stringify(r).replace(/"/g,"'")} | select('is_state', 'on') | list | count }}`,card:{type:"entities",entities:r}}),a.length&&n.push({name:e("starter.tab.locks"),icon:"mdi:lock",cards:a.map(t=>({type:"tile",entity:t}))}),{tabs:n,options:{hide_inactive_badge:!0},count:o.length+i.length+a.length+r.length}}(e,o);case"media":return function(t){const e=Ro(t,"media_player");return{tabs:e.slice(0,12).map(e=>({name:Io(t,e),icon:"tv"===qo(t,e,"device_class")?"mdi:television":"mdi:speaker",subtitle:`{{ states('${e}') }}`,card:{type:"media-control",entity:e}})),options:{tab_display:"active",scrollable:!0},count:e.length}}(e);case"climate":return function(t){const e=Ro(t,"climate");return{tabs:e.slice(0,12).map(e=>({name:Io(t,e),icon:"mdi:thermostat",badge:`{{ state_attr('${e}', 'current_temperature') }}`,badge_format:{precision:1,unit:"°"},card:{type:"thermostat",entity:e}})),count:e.length}}(e);case"energy":return function(t){return{tabs:[{name:t("starter.tab.energy_now"),icon:"mdi:lightning-bolt",card:{type:"energy-distribution",link_dashboard:!0}},{name:t("starter.tab.energy_usage"),icon:"mdi:chart-bar",card:{type:"energy-usage-graph"}},{name:t("starter.tab.energy_sources"),icon:"mdi:table",card:{type:"energy-sources-table"}},{name:t("starter.tab.energy_devices"),icon:"mdi:devices",card:{type:"energy-devices-graph"}}],options:{lazy:!0},count:1}}(o);case"family":return function(t){const e=Ro(t,"person");return{tabs:e.slice(0,12).map(e=>({name:Io(t,e),icon:"mdi:account",subtitle:`{{ states('${e}') | replace('_', ' ') }}`,cards:[{type:"tile",entity:e},{type:"map",entities:[e],hours_to_show:12}]})),count:e.length}}(e)}}var Wo={light:"mdi:lightbulb",thermostat:"mdi:thermostat",humidifier:"mdi:air-humidifier","media-control":"mdi:speaker","weather-forecast":"mdi:weather-partly-cloudy",map:"mdi:map",calendar:"mdi:calendar","todo-list":"mdi:checkbox-marked-outline","shopping-list":"mdi:cart","history-graph":"mdi:chart-line","statistics-graph":"mdi:chart-bar",sensor:"mdi:chart-line",gauge:"mdi:gauge","alarm-panel":"mdi:shield-home","picture-entity":"mdi:cctv","picture-glance":"mdi:image",picture:"mdi:image","picture-elements":"mdi:image",entities:"mdi:format-list-bulleted",glance:"mdi:view-grid",markdown:"mdi:text",iframe:"mdi:web",area:"mdi:texture-box",logbook:"mdi:format-list-text","energy-distribution":"mdi:lightning-bolt"},Ko={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermostat",media_player:"mdi:speaker",camera:"mdi:cctv",person:"mdi:account",lock:"mdi:lock",cover:"mdi:window-shutter",fan:"mdi:fan",vacuum:"mdi:robot-vacuum",sensor:"mdi:eye",weather:"mdi:weather-partly-cloudy"},Zo=t=>!!t&&"object"==typeof t&&!Array.isArray(t),Jo=t=>String(t?.type??"").replace(/^custom:/,"");function Go(t){const e=t.replace(/^custom:/,"").replace(/[-_]/g," ").trim();return e.charAt(0).toUpperCase()+e.slice(1)}function Yo(t,e,o=0){const i=function(t){if("string"==typeof t?.entity)return t.entity;const e=Array.isArray(t?.entities)?t.entities[0]:void 0;return"string"==typeof e?e:Zo(e)&&"string"==typeof e.entity?e.entity:void 0}(t),a=t?.title??t?.name??t?.heading??(i?e?.states?.[i]?.attributes?.friendly_name??Go(i.split(".")[1]??i):void 0)??(t?.type?Go(String(t.type)):`Tab ${o+1}`),r=("string"==typeof t?.icon?t.icon:void 0)??Wo[Jo(t)]??(i?Ko[i.split(".")[0]]:void 0);return{name:String(a),icon:r}}function Xo(t){if(Array.isArray(t)&&0!==t.length)return t.map(t=>{if(!Zo(t)||t.condition)return t;const e={condition:"state",entity:t.entity};return void 0!==t.state&&(e.state=t.state),void 0!==t.state_not&&(e.state_not=t.state_not),e})}function Qo(t,e,o,i){let a=t,r=Xo(t?.visibility);if("conditional"===Jo(t)&&Zo(t.card))a=t.card,r=Xo(t.conditions);else if(r){const{visibility:e,...o}=t;a=o}const n=Yo(a,e,o),s={name:i?.name??n.name,card:a},d=i?.icon??n.icon;return d&&(s.icon=d),r&&(s.visibility=r),s}var ti=t=>"heading"===Jo(t),ei=t=>"bubble-card"===Jo(t)&&"pop-up"===t.card_type;function oi(t,e,o,i,a){if(0===t.length)return;if(1===t.length)return Qo(t[0],e,o,i?{name:i,icon:a}:void 0);const r={name:i??Yo(t[0],e,o).name,cards:t},n=a??Yo(t[0],e,o).icon;return n&&(r.icon=n),r}function ii(t,e){if(!t.some(ti))return t.map((t,o)=>Qo(t,e,o));const o=[];let i,a,r=[];const n=()=>{const t=oi(r,e,o.length,i,a);t&&o.push(t),r=[]};for(const s of t)ti(s)?(n(),i=s.heading??i,a=s.icon):r.push(s);return n(),o}var ai=t=>"string"!=typeof t||!t.trim()||t.includes("{{")||t.includes("[[[")?void 0:t;function ri(t,e){if(Array.isArray(t))t.forEach(t=>ri(t,e));else if(Zo(t)){t.type&&e(t);for(const o of["cards","card","sections","views","chips","chip"])t[o]&&ri(t[o],e)}}var ni=t=>"mushroom-chips-card"===Jo(t),si=t=>"bubble-card"===Jo(t)&&"horizontal-buttons-stack"===t.card_type;function di(t){return"conditional"===t?.type&&Zo(t.chip)?{chip:t.chip,conditions:t.conditions}:{chip:t}}var ci=t=>{const e=t?.tap_action;return"navigate"===e?.action&&"string"==typeof e.navigation_path?e.navigation_path:void 0};function li(t,e){const o="string"==typeof t?.entity?t.entity:void 0;return{name:ai(t?.name)??ai(t?.content)??(o?ai(e?.states?.[o]?.attributes?.friendly_name):void 0),icon:ai(t?.icon)??(o?Ko[o.split(".")[0]]:void 0)}}function hi(t,e){const o=new Map,i=(t,e)=>{if("string"!=typeof t||!t.startsWith("#"))return;const i=o.get(t)??{};o.set(t,{name:i.name??e.name,icon:i.icon??e.icon})};return ri(t,t=>{if(si(t))for(let e=1;e<=50&&(t[`${e}_link`]||t[`${e}_name`]);e++)i(t[`${e}_link`],{name:ai(t[`${e}_name`]),icon:ai(t[`${e}_icon`])});if(ni(t))for(const o of Array.isArray(t.chips)?t.chips:[]){const{chip:t}=di(o);i(ci(t),li(t,e))}}),o}function pi(t,e,o,i,a){const r="string"==typeof t.hash?a.get(t.hash):void 0,n=ai(t.name)??r?.name??("string"==typeof t.hash?Go(t.hash.replace(/^#/,"")):void 0),s=ai(t.icon)??r?.icon,d=oi(e,o,i,n,s)??{name:n,card:{type:"markdown",content:" "}};return s&&(d.icon=s),d}var ui=t=>Array.isArray(t?.cards)&&ei(t.cards[0]);function bi(t,e,o,i=hi(t,e)){if(function(t){return t.some(t=>ui(t)||ei(t))}(t)){const{tabs:o,leftOut:a}=function(t,e,o){const i=[];let a,r=!1,n=[];const s=()=>{a?i.push(pi(a,n,e,i.length,o)):n.some(t=>!ni(t)&&!si(t))&&(r=!0),a=void 0,n=[]};for(const d of t)ui(d)?(s(),i.push(pi(d.cards[0],d.cards.slice(1),e,i.length,o))):ei(d)?(s(),a=d):a?n.push(d):ni(d)||si(d)||(r=!0);return s(),{tabs:i,leftOut:r}}(t,e,i),r=["convert.note.bubble"];return i.size&&r.push("convert.note.bubble_nav"),a&&r.push("convert.note.bubble_outside"),{source:"bubble-popups",tabs:o,options:{},notes:r}}return{source:o,tabs:ii(t,e),options:{},notes:[]}}function mi(t,e){if(Array.isArray(t)){if(0===t.length)throw new Error("convert.error.empty");return t.every(t=>Zo(t)&&(t.card||t.cards)&&!t.type)?{source:"tabdeck",tabs:t,options:{},notes:[]}:bi(t,e,"cards")}if(!Zo(t))throw new Error("convert.error.not_card");if(Array.isArray(t.views))return{source:"dashboard",tabs:t.views.map((t,o)=>{const i=(a=t,Array.isArray(a?.sections)?a.sections.flatMap(t=>Array.isArray(t?.cards)?t.cards:[]):Array.isArray(a?.cards)?a.cards:[]);var a;const r=t.title??t.path??`View ${o+1}`;return oi(i,e,o,String(r),t.icon)??{name:String(r),icon:t.icon,card:{type:"markdown",content:" "}}}),options:{},notes:["convert.note.dashboard"]};if(Array.isArray(t.sections)){const o=t.sections.flatMap(t=>Array.isArray(t?.cards)?t.cards:[]);return o.some(ei)?bi(o,e,"sections",hi(t,e)):{source:"sections",tabs:t.sections.map((t,o)=>function(t,e,o){const i=Array.isArray(t?.cards)?t.cards:[],a=i.find(ti),r=oi(i.filter(t=>t!==a),e,o,a?.heading,a?.icon);return r&&Array.isArray(t.visibility)&&(r.visibility=Xo(t.visibility)),r}(t,e,o)).filter(t=>!!t),options:{},notes:[]}}const o=Jo(t);if("tabdeck-card"===o){const{type:e,tabs:o,...i}=t;return{source:"tabdeck",tabs:Array.isArray(o)?o:[],options:i,notes:[]}}if("tabbed-card"===o)return function(t,e){const o=[],i=(Array.isArray(t.tabs)?t.tabs:[]).map((i,a)=>{const r={...t.attributes??{},...i?.attributes??{}},n=Qo(i?.card??{},e,a);return r.label&&(n.name=String(r.label)),r.icon&&(n.icon=r.icon),Zo(i?.styles)&&Object.keys(i.styles).length&&o.push("convert.note.tab_styles"),n}),a={},r=Number(t.options?.defaultTabIndex);Number.isInteger(r)&&r>=0&&(a.default_tab=r);const n=t.styles?.["--mdc-theme-primary"];return n&&(a.styles={"--tabdeck-accent":n}),Zo(t.styles)&&Object.keys(t.styles).some(t=>"--mdc-theme-primary"!==t)&&o.push("convert.note.styles"),{source:"tabbed-card",tabs:i,options:a,notes:[...new Set(o)]}}(t,e);if("swipe-card"===o)return function(t,e){const o=Array.isArray(t.cards)?t.cards:[],i={swipe:!0,swipe_mouse:!0},a=Number(t.start_card);Number.isInteger(a)&&a>1&&(i.default_tab=a-1),t.parameters?.loop&&(i.swipe_wrap=!0);const r=t.parameters?.autoplay?["convert.note.autoplay"]:[];if(t.parameters?.autoplay){const e=Number(t.parameters.autoplay?.delay);i.auto_rotate=Number.isFinite(e)&&e>0?Math.max(2,Math.round(e/1e3)):5}return{source:"swipe-card",tabs:o.map((t,o)=>Qo(t,e,o)),options:i,notes:r}}(t,e);if("state-switch"===o)return function(t,e){const o=Zo(t.states)?t.states:{},i=String(t.entity??""),a={},r=[],n=i.includes("."),s=Object.entries(o).map(([t,o],a)=>{const r=Qo(o,e,a,{name:t,icon:Yo(o,e,a).icon});return n&&(r.auto_select={entity:i,state:t}),r});if("hash"===i?a.remember="url":n||r.push("convert.note.state_switch_mode"),void 0!==t.default&&void 0!==o[t.default]&&(a.default_tab=String(t.default)),n){const t=e?.states?.[i]?.state;void 0!==t&&void 0!==o[t]&&(a.default_tab=t)}return"slide-left"===t.transition||"slide-right"===t.transition?a.transition="slide":"fade"!==t.transition&&"flip"!==t.transition||(a.transition="fade"),{source:"state-switch",tabs:s,options:a,notes:r}}(t,e);if("mushroom-chips-card"===o){const o=function(t,e){const o=[];for(const i of Array.isArray(t.chips)?t.chips:[]){const{chip:t,conditions:a}=di(i),r=li(t,e),n=ci(t),s=t?.tap_action;let d;if(n&&!n.startsWith("#")){const t=n.replace(/[?#].*$/,"").split("/").filter(Boolean).pop()??n;d={name:r.name??Go(decodeURIComponent(t)),view:n}}else{if("url"!==s?.action||"string"!=typeof s.url_path)continue;d={name:r.name??Go(s.url_path.replace(/^https?:\/\//,"").split(/[/?#]/)[0]),tap_action:s}}r.icon&&(d.icon=r.icon);const c=Xo(a);c&&(d.visibility=c),o.push(d)}return{source:"mushroom-chips",tabs:o,options:{},notes:["convert.note.chips"]}}(t,e);if(o.tabs.length)return o}if(!t.type&&Array.isArray(t.cards)){const o=bi(t.cards,e,"view");return"bubble-popups"===o.source?o:{...o,notes:[]}}if(Array.isArray(t.cards))return bi(t.cards,e,"stack");if(t.type)return{source:"cards",tabs:[Qo(t,e,0)],options:{},notes:[]};throw new Error("convert.error.not_card")}var _i=t=>e=>{customElements.get(t)||customElements.define(t,e)},gi=new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]),fi=new Set(["primary-text","secondary-text","disabled"]),yi=new Set(["red","pink","purple","indigo","blue","cyan","teal","green","lime","yellow","orange","brown","grey","black","white"]);function vi(t){if("string"!=typeof t||""===t.trim())return;const e=t.trim();return gi.has(e)||fi.has(e)?yi.has(e)?`var(--${e}-color, ${e})`:`var(--${e}-color)`:e}function wi(t){const e=/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(t?.trim()??"");return e?[Number(e[1]),Number(e[2]),Number(e[3])]:void 0}function ki([t,e,o]){const i=t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4};return.2126*i(t)+.7152*i(e)+.0722*i(o)}function xi(t,e){const[o,i]=[ki(t),ki(e)].sort((t,e)=>e-t);return(o+.05)/(i+.05)}function $i(t){const e=wi(t);if(e)return xi(e,[0,0,0])>=xi(e,[255,255,255])?"#000":"#fff"}function Ai(){return"function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches}var Si=x`
  @media (prefers-reduced-motion: reduce) {
    :host,
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;function Ci(t,e,o,i){var a,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(r<3?a(n):r>3?a(e,o,n):a(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}var zi=new Set(["","0","off","false","no","none","unavailable","unknown","closed"]);function Ei(t){if(null==t)return!1;const e=String(t).trim().toLowerCase();return(""===e||0!==Number(e))&&!zi.has(e)}var Li=class extends At{constructor(...t){super(...t),this.badgeAction=!1,this.badgeDisplay="text",this.display="both",this.selected=!1,this.disabled=!1,this.alert=!1,this.action=!1,this.ghost=!1,this.stacked=!1,this.fab=!1,this.hasMenu=!1,this.ghostLabel="Hidden: its visibility conditions aren't met (shown while editing)",this.changed=!1,this.changedLabel="Changed since you last looked",this.unhealthy=!1,this.unhealthyLabel="Most of this tab's devices are unavailable",this.bounce=!1,this._bounceFrom=0,this._onKeydown=t=>{!this.action||"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback(),this._bounceFrom=Date.now()+1500,this.setAttribute("role","tab"),this.addEventListener("keydown",this._onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),super.disconnectedCallback()}updated(t){this._applyFont(t),this.bounce&&t.has("badge")&&!t.has("bounce")&&Date.now()>=this._bounceFrom&&this._bounceBadge(),this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected||this.action?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent),this.color?this.style.color=this.color:this.style.removeProperty("color"),this.ghost?this.title=this.ghostLabel:this.removeAttribute("title"),"dots"===this.display&&this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"),this._applyReadableText()}render(){if("dots"===this.display)return st`<span class="dot" part="dot"></span>`;const t="active"===this.display?this.selected?"both":"icon":this.display,e=!!this.icon||!!this.picture,o="icon"!==t||!e;return st`
      <div class="inner">
        ${"label"!==t&&e?this._renderIcon():ct}
        ${o&&this.label?st`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle?st`<span class="subtitle">${this.subtitle}</span>`:ct}
            </span>`:ct}
        ${this.graph?st`<svg class="graph" part="graph" viewBox="0 0 44 12" aria-hidden="true"
              ><polyline points=${this.graph} style=${this.graphColor?`stroke:${this.graphColor}`:""}></polyline
            ></svg>`:ct}
        ${this.extraBadges?.length?st`<span class="badges">${this._renderBadge()}${this.extraBadges.map(t=>this._renderExtra(t))}</span>`:this._renderBadge()}
        ${this.changed&&!this.selected?st`<span class="changed-dot" part="changed-dot" role="img" aria-label=${this.changedLabel} title=${this.changedLabel}></span>`:ct}
        ${this.unhealthy?st`<ha-icon class="health-mark" icon="mdi:alert-circle-outline" role="img" aria-label=${this.unhealthyLabel} title=${this.unhealthyLabel}></ha-icon>`:ct}
        ${this.hasMenu?st`<span class="caret" aria-hidden="true">▾</span>`:ct}
        ${this.ghost?st`<ha-icon class="ghost-mark" icon="mdi:eye-off-outline" aria-hidden="true"></ha-icon>`:ct}
      </div>
      ${this._renderProgress()}
      ${void 0!==this.speed?st`<span class="speed ${i=this.speed,i<100?"ok":i<300?"slow":"bad"}" part="speed">${Math.round(this.speed)} ms</span>`:ct}
    `;var i}_renderIcon(){const t=this.picture?st`<img class="picture icon" src=${this.picture} alt="" loading="lazy" />`:st`<ha-icon class="icon" icon=${this.icon}></ha-icon>`;return"bar"!==this.ringStyle&&this._hasRing()?st`<span class="icon-wrap">
      <svg class="ring" viewBox="0 0 36 36" aria-hidden="true">
        <circle class="ring-track" cx="18" cy="18" r="16" pathLength="100"></circle>
        <circle
          class="ring-value"
          cx="18"
          cy="18"
          r="16"
          pathLength="100"
          stroke-dasharray="${Math.round(this.ring)} 100"
          style=${this.ringColor?`stroke:${this.ringColor}`:""}
        ></circle>
      </svg>
      ${t}
    </span>`:t}_bounceBadge(){const t=this.renderRoot.querySelector(".badges, .badge, .badge-dot");t&&"function"==typeof t.animate&&(Ai()||t.animate([{transform:"scale(1)"},{transform:"scale(1.4)"},{transform:"scale(0.9)"},{transform:"scale(1)"}],{duration:450,easing:"ease-out"}))}_hasRing(){return void 0!==this.ring&&null!==this.ring&&Number.isFinite(this.ring)}_renderProgress(){if("bar"!==this.ringStyle||!this._hasRing())return ct;const t=Math.round(this.ring);return st`<span class="progress" part="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${t}
      ><span class="progress-value" style="width:${t}%${this.ringColor?`;background:${this.ringColor}`:""}"></span
    ></span>`}_applyFont(t){if(t.has("font")){const t=this.font??{};for(const[e,o]of[["size",t.size],["weight",t.weight],["family",t.family]])o?this.style.setProperty(`--tabdeck-tab-font-${e}`,o):this.style.removeProperty(`--tabdeck-tab-font-${e}`)}}_applyReadableText(){for(const t of this.renderRoot.querySelectorAll(".badge:not(.icon-badge)")){const e=t.style.background?$i(getComputedStyle(t).backgroundColor):void 0;t.style.color=e??""}this.fab&&!this.color&&(this.style.color=$i(getComputedStyle(this).backgroundColor)??"")}_renderExtra(t){const e=t.color?`background:${t.color}`:"";return"dot"===this.badgeDisplay?t.icon||Ei(t.text)?st`<span class="badge-dot" part="badge-dot" style=${e}></span>`:ct:st`<span class="badge${t.icon?" icon-badge":""}" part="badge" style=${e} aria-label=${t.label??""}
      >${t.icon?st`<ha-icon icon=${t.icon}></ha-icon>`:t.text}</span
    >`}_onBadgeClick(t){this.badgeAction&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("badge-click",{bubbles:!0,composed:!0})))}_renderBadge(){const t=this.badgeColor?`background:${this.badgeColor}`:"",e=this.badgeAction?" clickable":"";return this.badgeIcon&&(void 0===this.badge||Ei(this.badge))?st`<span
        class="badge icon-badge${e}"
        part="badge"
        style=${t}
        aria-label=${this.badgeLabel??`badge: ${this.badge??""}`}
        @click=${this._onBadgeClick}
        ><ha-icon icon=${this.badgeIcon}></ha-icon
      ></span>`:"dot"===this.badgeDisplay?Ei(this.badge)?st`<span class="badge-dot${e}" part="badge-dot" style=${t} @click=${this._onBadgeClick}></span>`:ct:this.badge?st`<span
          class="badge${e}"
          part="badge"
          style=${t}
          aria-label=${this.badgeLabel??`badge: ${this.badge}`}
          @click=${this._onBadgeClick}
          >${this.badge}</span>`:ct}static{this.styles=x`
    ${Si}
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding: var(--tabdeck-tab-padding, var(--tabdeck-density-padding, 0 16px));
      height: var(--tabdeck-tab-height, var(--tabdeck-density-height, 48px));
      cursor: pointer;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      font-size: var(--tabdeck-tab-font-size, var(--tabdeck-density-font-size, 14px));
      font-weight: var(--tabdeck-tab-font-weight, normal);
      font-family: var(--tabdeck-tab-font-family, var(--paper-font-body1_-_font-family, inherit));
      border-radius: var(--tabdeck-tab-radius, 0);
      user-select: none;
      white-space: nowrap;
      outline: none;
      transition: color 120ms ease;
    }
    :host([selected]) {
      color: var(--tabdeck-selected-color, var(--tabdeck-selected-auto, var(--tabdeck-accent, var(--primary-color))));
    }
    /* icon_animation */
    :host([icon-animation="spin"]) .icon {
      animation: tabdeck-spin 1.6s linear infinite;
    }
    :host([icon-animation="pulse"]) .icon {
      animation: tabdeck-pulse 1.4s ease-in-out infinite;
    }
    :host([icon-animation="bounce"]) .icon {
      animation: tabdeck-bounce 1s ease-in-out infinite;
    }
    :host([icon-animation="shake"]) .icon {
      animation: tabdeck-shake 0.9s ease-in-out infinite;
    }
    :host([icon-animation="beat"]) .icon {
      animation: tabdeck-beat 1.2s ease-in-out infinite;
    }
    @keyframes tabdeck-spin {
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes tabdeck-pulse {
      50% {
        transform: scale(1.18);
        opacity: 0.7;
      }
    }
    @keyframes tabdeck-bounce {
      50% {
        transform: translateY(-3px);
      }
    }
    @keyframes tabdeck-shake {
      20%,
      60% {
        transform: rotate(-12deg);
      }
      40%,
      80% {
        transform: rotate(12deg);
      }
    }
    @keyframes tabdeck-beat {
      15%,
      45% {
        transform: scale(1.2);
      }
      30% {
        transform: scale(1);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host([icon-animation]) .icon {
        animation: none;
      }
    }
    .picture {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }
    .icon-wrap .picture {
      width: 22px;
      height: 22px;
    }
    /* alert: a gentle pulsing tint + alert-coloured label/icon. */
    :host([alert]) {
      color: var(--tabdeck-alert-color, var(--error-color, #db4437));
      border-radius: var(--tabdeck-alert-radius, 8px);
      /* quiet_hours sets none: the label stays red, without the pulse. */
      animation: var(--tabdeck-alert-animation, tabdeck-alert-pulse 1.6s ease-in-out infinite);
    }
    @keyframes tabdeck-alert-pulse {
      0%,
      100% {
        background: transparent;
      }
      50% {
        background: color-mix(
          in srgb,
          var(--tabdeck-alert-color, var(--error-color, #db4437)) 20%,
          transparent
        );
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host([alert]) {
        animation: none;
        background: color-mix(
          in srgb,
          var(--tabdeck-alert-color, var(--error-color, #db4437)) 14%,
          transparent
        );
      }
    }
    /* dots: pagination dots; the selected one stretches into a pill. */
    :host([display="dots"]) {
      padding: 0 4px;
      height: var(--tabdeck-dot-area, 24px);
    }
    .dot {
      display: block;
      width: var(--tabdeck-dot-size, 8px);
      height: var(--tabdeck-dot-size, 8px);
      border-radius: 999px;
      background: var(--secondary-text-color);
      opacity: 0.5;
      transition: width 160ms ease, opacity 160ms ease, background 160ms ease;
    }
    :host([selected]) .dot {
      width: calc(var(--tabdeck-dot-size, 8px) * 2.5);
      opacity: 1;
      background: var(--tabdeck-accent, var(--primary-color));
    }
    :host([alert]) .dot {
      background: var(--tabdeck-alert-color, var(--error-color, #db4437));
      opacity: 1;
    }
    :host([stacked]) {
      flex-direction: column;
      justify-content: center;
      padding: 0 8px;
      height: var(--tabdeck-dock-tab-height, 56px);
      font-size: var(--tabdeck-dock-font-size, 11px);
    }
    :host([stacked]) .inner {
      flex-direction: column;
      gap: 2px;
      position: relative;
    }
    :host([stacked]) .text {
      align-items: center;
    }
    :host([stacked]) .subtitle {
      display: none;
    }
    :host([stacked]) .badge,
    :host([stacked]) .badge-dot,
    :host([stacked]) .badges {
      position: absolute;
      top: -4px;
      inset-inline-start: calc(50% + 6px);
    }
    .badges {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    :host([stacked]) .badges > * {
      position: static;
    }
    :host([fab]) {
      color: var(--text-primary-color, #fff);
      padding: 0;
      align-self: center;
      justify-content: center;
      width: var(--tabdeck-fab-size, 48px);
      height: var(--tabdeck-fab-size, 48px);
      margin: 0 6px;
      border-radius: 50%;
      background: var(--tabdeck-fab-color, var(--tabdeck-accent, var(--primary-color)));
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
      flex: 0 0 auto !important;
    }
    :host([fab][stacked]) {
      margin-top: -18px;
      width: var(--tabdeck-fab-size, 56px);
      height: var(--tabdeck-fab-size, 56px);
    }
    :host([fab]) .text,
    :host([fab]) .badge {
      display: none;
    }
    :host([fab]) ha-icon {
      --mdc-icon-size: 26px;
    }
    :host([ghost]) {
      opacity: 0.55;
      outline: 1px dashed currentColor;
      outline-offset: -6px;
      border-radius: 8px;
    }
    .caret {
      font-size: 11px;
      opacity: 0.7;
      margin-inline-start: -2px;
    }
    .ghost-mark {
      --mdc-icon-size: 14px;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    :host(:focus-visible) {
      box-shadow: inset 0 0 0 var(--tabdeck-focus-width, 2px) var(--tabdeck-focus-color, var(--tabdeck-accent, var(--primary-color)));
      border-radius: 6px;
    }
    .inner {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .text {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.15;
    }
    .subtitle {
      font-size: 11px;
      font-weight: 400;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      opacity: 0.9;
    }
    ha-icon {
      --mdc-icon-size: var(--tabdeck-icon-size, 22px);
    }
    .icon-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }
    .icon-wrap ha-icon {
      --mdc-icon-size: 18px;
    }
    .ring {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .ring circle {
      fill: none;
      stroke-width: 3;
    }
    .ring-track {
      stroke: var(--tabdeck-ring-track, rgba(127, 127, 127, 0.25));
    }
    .ring-value {
      stroke: var(--tabdeck-ring-color, var(--tabdeck-accent, var(--primary-color)));
      stroke-linecap: round;
    }
    .graph {
      width: var(--tabdeck-graph-width, 44px);
      height: var(--tabdeck-graph-height, 12px);
      flex-shrink: 0;
      overflow: visible;
    }
    .graph polyline {
      fill: none;
      stroke: var(--tabdeck-graph-color, currentColor);
      stroke-width: 1.5;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }
    /* ring_style: bar */
    :host([ring-style="bar"]) {
      position: relative;
    }
    .progress {
      position: absolute;
      inset-inline: 12%;
      bottom: var(--tabdeck-progress-offset, 5px);
      height: var(--tabdeck-progress-height, 3px);
      border-radius: 3px;
      overflow: hidden;
      background: var(--tabdeck-ring-track, rgba(127, 127, 127, 0.25));
    }
    .progress-value {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--tabdeck-ring-color, var(--tabdeck-accent, var(--primary-color)));
    }
    .icon-badge {
      padding: 0 3px;
    }
    .icon-badge ha-icon {
      --mdc-icon-size: 13px;
    }
    .badge {
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      background: var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)));
      color: var(--tabdeck-badge-color, var(--text-primary-color, #fff));
      font-size: 11px;
      line-height: 18px;
      text-align: center;
    }
    :host([selected]) .badge {
      background: var(
        --tabdeck-selected-badge-background,
        var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)))
      );
      color: var(--tabdeck-selected-badge-color, var(--tabdeck-badge-color, var(--text-primary-color, #fff)));
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tabdeck-accent, var(--primary-color));
      flex-shrink: 0;
    }
    :host([unhealthy]) .icon,
    :host([unhealthy]) .icon-wrap,
    :host([unhealthy]) .text {
      opacity: var(--tabdeck-unhealthy-opacity, 0.45);
    }
    .health-mark {
      --mdc-icon-size: 16px;
      color: var(--tabdeck-unhealthy-color, var(--warning-color, #ff9800));
      flex-shrink: 0;
    }
    :host([stacked]) .health-mark {
      position: absolute;
      top: 0;
      inset-inline-start: calc(50% + 6px);
    }
    :host([speed]) {
      position: relative;
    }
    .speed {
      position: absolute;
      top: 1px;
      inset-inline-end: 2px;
      padding: 0 4px;
      border-radius: 6px;
      font: 600 9px/14px ui-monospace, monospace;
      color: #fff;
      background: var(--success-color, #43a047);
      pointer-events: none;
    }
    .speed.slow {
      background: var(--warning-color, #ff9800);
    }
    .speed.bad {
      background: var(--error-color, #db4437);
    }
    .changed-dot {
      width: var(--tabdeck-changed-size, 7px);
      height: var(--tabdeck-changed-size, 7px);
      border-radius: 50%;
      background: var(--tabdeck-changed-color, var(--accent-color, #ff9800));
      flex-shrink: 0;
      align-self: flex-start;
      margin-top: 2px;
    }
    :host([stacked]) .changed-dot {
      position: absolute;
      top: 2px;
      inset-inline-end: calc(50% - 18px);
    }
    .badge.clickable,
    .badge-dot.clickable {
      cursor: pointer;
    }
  `}};Ci([Ot()],Li.prototype,"label",void 0),Ci([Ot()],Li.prototype,"subtitle",void 0),Ci([Ot()],Li.prototype,"icon",void 0),Ci([Ot()],Li.prototype,"badge",void 0),Ci([Ot()],Li.prototype,"badgeColor",void 0),Ci([Ot({type:Boolean})],Li.prototype,"badgeAction",void 0),Ci([Ot()],Li.prototype,"badgeDisplay",void 0),Ci([Ot()],Li.prototype,"accent",void 0),Ci([Ot()],Li.prototype,"color",void 0),Ci([Ot({reflect:!0})],Li.prototype,"display",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"selected",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"disabled",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"alert",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"action",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"ghost",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"stacked",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"fab",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"hasMenu",void 0),Ci([Ot()],Li.prototype,"ghostLabel",void 0),Ci([Ot()],Li.prototype,"badgeLabel",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"changed",void 0),Ci([Ot()],Li.prototype,"changedLabel",void 0),Ci([Ot({type:Boolean,reflect:!0})],Li.prototype,"unhealthy",void 0),Ci([Ot()],Li.prototype,"unhealthyLabel",void 0),Ci([Ot({type:Number,reflect:!0})],Li.prototype,"speed",void 0),Ci([Ot({type:Number})],Li.prototype,"ring",void 0),Ci([Ot()],Li.prototype,"ringColor",void 0),Ci([Ot({reflect:!0,attribute:"ring-style"})],Li.prototype,"ringStyle",void 0),Ci([Ot()],Li.prototype,"graph",void 0),Ci([Ot()],Li.prototype,"graphColor",void 0),Ci([Ot()],Li.prototype,"badgeIcon",void 0),Ci([Ot({attribute:!1})],Li.prototype,"extraBadges",void 0),Ci([Ot({type:Boolean})],Li.prototype,"bounce",void 0),Ci([Ot()],Li.prototype,"picture",void 0),Ci([Ot({reflect:!0,attribute:"icon-animation"})],Li.prototype,"iconAnimation",void 0),Ci([Ot({attribute:!1})],Li.prototype,"font",void 0),Li=Ci([_i("tabdeck-tab")],Li);var Oi=t=>t&&!/\{[{%]/.test(t)?t:void 0;function Ti(t,e){const o=t.card;if(!o?.type){const o=function(t,e,o="No entities here.",i=2){if(!t.area&&!t.floor&&!t.label)return;const a=Object.keys(e?.entities??{}).filter(o=>{const i=e.entities[o];if(i.hidden||i.entity_category||!e.states?.[o])return!1;if(t.domains?.length&&!t.domains.includes(o.split(".")[0]))return!1;if(t.label)return Array.isArray(i.labels)&&i.labels.includes(t.label);const a=function(t,e){const o=t?.entities?.[e];if(o)return o.area_id||t?.devices?.[o.device_id]?.area_id||void 0}(e,o);return t.area?a===t.area:!!a&&e.areas?.[a]?.floor_id===t.floor}).sort();return a.length?{type:"grid",columns:i,square:!1,cards:a.map(t=>({type:"tile",entity:t}))}:{type:"markdown",content:o}}(t,e);return o?"grid"===o.type?o.cards:[o]:[]}return"vertical-stack"===o.type||"custom:tabdeck-masonry-card"===o.type?o.cards??[]:[o]}function Mi(t){return(t??[]).some(t=>"template"===t?.condition||"time"===t?.condition||Mi(t?.conditions))}function Hi(t,e,o="Tabdeck"){const i=[],a=[],r=new Set;return t.tabs.forEach((t,o)=>{const n=Oi(t.name)??`Tab ${o+1}`;if(t.tap_action&&!t.card?.type)return void a.push(n);t.name&&!Oi(t.name)&&r.add("export.note.templates"),t.pin&&r.add("export.note.pin");const s={type:"heading",heading:n,heading_style:"title",...Oi(t.icon)?{icon:t.icon}:{}},d=t.visibility?.length?{visibility:t.visibility}:{};Mi(t.visibility)&&r.add("export.note.conditions"),"custom:tabdeck-sections-card"!==t.card?.type?("custom:tabdeck-card"===t.card?.type&&r.add("export.note.groups"),i.push({type:"grid",cards:[s,...Ti(t,e)],...d})):(t.card.sections??[]).forEach((t,e)=>{i.push({type:"grid",...t,cards:0===e?[s,...t.cards??[]]:t.cards??[],...d})})}),t.auto_tabs&&r.add("export.note.auto_tabs"),{view:{title:o,type:"sections",max_columns:4,sections:i},skipped:a,notes:[...r]}}var ji=/^[A-Za-z_/][\w ./()+:-]*$/,Ni=/^(true|false|yes|no|on|off|null|~|y|n)$/i;function Vi(t){if(null==t)return"null";if("number"==typeof t)return Number.isFinite(t)?String(t):"null";if("boolean"==typeof t)return t?"true":"false";const e=String(t);return""===e||!ji.test(e)||Ni.test(e)||/ $/.test(e)||/: |:$| #/.test(e)?JSON.stringify(e):e}function Bi(t){return Array.isArray(t)&&0===t.length||!!t&&"object"==typeof t&&!Array.isArray(t)&&0===Object.keys(t).length}function Pi(t,e){return Array.isArray(t)?t.flatMap(t=>{if(t&&"object"==typeof t&&!Bi(t)){const o=Pi(t,e+"  ");return[`${e}- ${o[0].trimStart()}`,...o.slice(1)]}return[`${e}- ${Bi(t)?Array.isArray(t)?"[]":"{}":Vi(t)}`]}):Object.entries(t).filter(([,t])=>void 0!==t).flatMap(([t,o])=>{const i=Vi(t);return o&&"object"==typeof o&&!Bi(o)?[`${e}${i}:`,...Pi(o,e+"  ")]:[`${e}${i}: ${"string"==typeof o&&o.includes("\n")?"|-\n"+o.split("\n").map(t=>t?e+"  "+t:"").join("\n"):Bi(o)?Array.isArray(o)?"[]":"{}":Vi(o)}`]})}function Ri(t){return null===t||"object"!=typeof t?Vi(t)+"\n":Bi(t)?(Array.isArray(t)?"[]":"{}")+"\n":Pi(t,"").join("\n")+"\n"}var Ii=class{constructor(t=50,e=800){this._limit=t,this._mergeMs=e,this._past=[],this._future=[],this._at=0}get canUndo(){return this._past.length>0}get canRedo(){return this._future.length>0}get size(){return this._past.length}record(t,e=Date.now()){this._future=[],this._past.length&&e-this._at<this._mergeMs?this._at=e:(this._at=e,this._past.push(t),this._past.length>this._limit&&this._past.shift())}undo(t){const e=this._past.pop();if(void 0!==e)return this._future.push(t),this._at=0,e}redo(t){const e=this._future.pop();if(void 0!==e)return this._past.push(t),this._at=0,e}clear(){this._past=[],this._future=[],this._at=0}};function qi(t,e){const o=Array.isArray(t?.tabs)?t.tabs:[],i=Array.isArray(e?.tabs)?e.tabs:[],a=(t,e)=>"string"==typeof t?.name&&t.name?t.name:`#${e+1}`,r=t=>JSON.stringify(t??null),n=o.map(r),s=i.map(r);if(i.length>o.length){const t=s.findIndex((t,e)=>t!==n[e]),e=t<0?i.length-1:t;return{key:"editor.undo.added",vars:{name:a(i[e],e)}}}if(i.length<o.length){const t=n.findIndex((t,e)=>t!==s[e]),e=t<0?o.length-1:t;return{key:"editor.undo.removed",vars:{name:a(o[e],e)}}}const d=s.map((t,e)=>t!==n[e]?e:-1).filter(t=>t>=0);return d.length>1&&d.every(t=>n.includes(s[t]))?{key:"editor.undo.moved"}:1===d.length?{key:"editor.undo.tab",vars:{name:a(i[d[0]],d[0])}}:d.length>1?{key:"editor.undo.tabs"}:{key:"editor.undo.options"}}var Di=[["kitchen kuche cocina cuisine cucina keuken kuchnia cozinha","silverware-fork-knife stove fridge pot-steam coffee"],["living lounge wohnzimmer salon soggiorno woonkamer salotto pokoj_dzienny sala_de_estar","sofa television floor-lamp fireplace"],["bedroom schlafzimmer dormitorio chambre camera_da_letto slaapkamer sypialnia quarto","bed bed-king lamp alarm"],["bath badezimmer bano salle_de_bain bagno badkamer lazienka banheiro toilet wc","shower bathtub toilet water-boiler"],["garage cochera garaz garagem","garage car garage-open"],["garden garten jardin giardino tuin ogrod jardim yard outdoor","flower tree sprout watering-can"],["office buro oficina bureau ufficio kantoor biuro escritorio study arbeit","desk laptop printer briefcase"],["kids kinder children ninos enfants bambini kinderen dzieci criancas nursery","teddy-bear toy-brick human-child"],["baby bebe neonato dziecko","baby-carriage baby-bottle"],["hall flur entrance entrada entree ingresso gang korytarz corredor hallway","door coat-rack shoe-formal"],["laundry waschkuche lavanderia buanderie wasruimte pralnia","washing-machine tumble-dryer hanger"],["dining esszimmer comedor salle_a_manger sala_da_pranzo eetkamer jadalnia sala_de_jantar","silverware table-chair glass-wine"],["basement keller sotano sous-sol cantina kelder piwnica cave","stairs-down home-floor-negative-1"],["attic dachboden atico grenier soffitta zolder strych sotao","home-roof stairs-up"],["guest gast invitado invite ospite gasten gosc hospede","account-plus bed-single"],["pool piscina zwembad basen","pool"],["gym fitness sport palestra silownia academia","dumbbell run"],["light licht luz lumiere luce verlichting swiatlo iluminacao lamp","lightbulb lightbulb-group ceiling-light floor-lamp"],["climate klima clima climat heating heizung calefaccion chauffage riscaldamento verwarming ogrzewanie aquecimento thermostat","thermostat radiator heat-wave snowflake"],["temperature temperatur temperatura temperatuur","thermometer"],["cooling aircon kuhlung refrigeracion klimatyzacja","air-conditioner snowflake"],["camera kamera camara cctv telecamer kamery","cctv camera video"],["security sicherheit seguridad securite sicurezza beveiliging bezpieczenstwo seguranca","shield-home cctv lock alarm-light"],["alarm allarme","alarm-light shield-alert"],["=door tur puerta =porte =porta deur drzwi","door door-open lock"],["lock schloss cerradura serrure serratura slot zamek fechadura","lock lock-open"],["window fenster ventana fenetre finestra raam okno janela","window-closed-variant window-open-variant"],["blind shutter cover rollladen jalousie persiana volet tapparella rolluik roleta estore","window-shutter blinds"],["energy energie energia power strom puissance stroom solar pv","lightning-bolt solar-power flash home-battery"],["water wasser agua eau acqua woda","water water-pump water-boiler"],["weather wetter tiempo meteo weer pogoda =tempo","weather-partly-cloudy weather-sunny umbrella"],["media tv fernseher television televisione telewizor televisao","television speaker remote-tv"],["music musik musica musique muziek muzyka","music speaker spotify"],["vacuum robot staubsauger aspiradora aspirateur aspirapolvere stofzuiger odkurzacz aspirador","robot-vacuum vacuum"],["calendar kalender calendario calendrier agenda kalendarz","calendar calendar-month"],["family familie familia famille famiglia rodzina people personen persone","account-group human-male-female-child"],["plant pflanze planta plante pianta plant roslin","flower-tulip sprout leaf"],["pet haustier mascota animal animale huisdier zwierze dog hund perro chien =cane hond =pies cachorro cat katze gato =chat gatto kat kot","paw dog cat"],["car =auto coche voiture macchina samochod carro","car car-electric ev-station"],["home overview zuhause ubersicht inicio accueil casa thuis overzicht dom przeglad","home home-outline view-dashboard"],["setting einstellung ajustes reglages parametres impostazioni instellingen ustawienia definicoes","cog tune"],["network netzwerk red reseau =rete netwerk siec =rede wifi internet","wifi router-wireless lan"],["battery batterie bateria batteria batterij akumulator","battery battery-charging"],["chore task aufgabe tarea tache compito taak zadanie tarefa =todo","clipboard-check-outline broom format-list-checks"],["shopping einkauf compras courses spesa boodschappen zakupy","cart basket"],["bin trash mull basura poubelle rifiuti afval smieci lixo","trash-can delete-empty recycle"],["fan ventilator ventilador ventilateur ventilatore wentylator","fan"],["air luft =aire =aria lucht powietrze ar","air-filter weather-windy"],["printer drucker impresora imprimante stampante drukarka impressora 3d","printer printer-3d"],["update aktualisierung actualizacion mise_a_jour aggiornamento aktualizacja atualizacao","update package-up"],["notification benachrichtigung notificacion notifica melding powiadomienie notificacao","bell"]].map(([t,e])=>({keys:t.split(" ").map(t=>{const e=t.startsWith("=")||t.length<4;return{k:t.replace(/^=/,"").replace(/_/g," "),exact:e}}),icons:e.split(" ").map(t=>`mdi:${t}`)}));new Set(Di.flatMap(t=>t.icons));function Ui(t){return t.map(t=>({name:t.name,icon:t.icon??"mdi:texture-box",area:t.id,card:{type:"entities",title:t.name,entities:t.entities}}))}var Fi=class extends Error{constructor(t,e){super(e),this.reason=t}};function Wi(t,e="tabdeck-rooms"){const o=new Set(t);if(!o.has(e))return e;for(let i=2;;i++)if(!o.has(`${e}-${i}`))return`${e}-${i}`}function Ki(t,e){return{title:e,views:[{title:e,path:"rooms",type:"panel",cards:[{type:"custom:tabdeck-card",tabs:t}]}]}}var Zi=t=>String(t?.message??t?.code??t??"");var Ji=(...t)=>({enum:t}),Gi={preset:{preset:!0},position:Ji("top","bottom","left","right"),style:Ji("underline","pill","segmented","boxed","text","rail"),tab_display:Ji("both","icon","label","active","dots"),align:Ji("start","center","end","justify"),badge_display:Ji("text","dot"),density:Ji("compact","default","comfortable"),transition:Ji("none","fade","slide","scale","flip","rise"),transition_duration:{num:[0,2e3]},transition_easing:{css:!0},indicator_size:{num:[1,16]},indicator_radius:{num:[0,100]},animated:{bool:!0},liquid_indicator:{bool:!0},accent_indicator:{bool:!0},elevation:{bool:!0},bar_background:{css:!0},glass:{glass:!0},styles:{styles:!0}};function Yi(t){return"number"==typeof t?Number.isFinite(t):"string"==typeof t&&t.length<=300&&!/[;{}<>\\]|url\s*\(|@import|expression\s*\(/i.test(t)}function Xi(t,e){return"enum"in t?t.enum.includes(e):"num"in t?"number"==typeof e&&e>=t.num[0]&&e<=t.num[1]:"bool"in t?"boolean"==typeof e:"css"in t?Yi(e):"glass"in t?"boolean"==typeof e||"number"==typeof e&&e>=1&&e<=60:!("preset"in t)||Rt(e)}var Qi=t=>!!t&&"object"==typeof t&&!Array.isArray(t);var ta=[{id:"look",icon:"mdi:palette-outline",lead:["style","tab_display"],fields:["preset","style","tab_display","density","tab_display_narrow","narrow_width","accent_indicator","animated","liquid_indicator","indicator_size","indicator_radius","picture_accent","glass","elevation","bar_background","bar_text","header","content_height","content_max_height","split","scroll_spy"]},{id:"bar",icon:"mdi:dock-top",lead:["position","align"],fields:["position","orientation_layout","align","scrollable","bar_fade","scroll_buttons","overflow_menu","bar_limit","sticky","bar_autohide","dock","rail_expand","collapsible","start_collapsed","wizard","breadcrumbs","customize","drag_reorder","sort_by_usage"]},{id:"badges",icon:"mdi:numeric-3-circle-outline",fields:["badge_display","hide_inactive_badge","badge_bounce","summary_chip","hidden_alerts","alert_first","alert_snooze","changed_dot","health_dim"]},{id:"move",icon:"mdi:gesture-swipe",fields:["swipe","swipe_mouse","swipe_wrap","swipe_edge","swipe_lock","swipe_peek","wheel_switch","transition","transition_narrow","transition_duration","transition_easing","hotkeys","content_arrows","history","search","entity_search","overview","last_tab_button","hold_peek","compare","haptic"]},{id:"start",icon:"mdi:home-import-outline",lead:["default_tab","remember"],fields:["default_tab","remember","remember_entity","storage_key","learned_default","idle_return","scroll_memory"]},{id:"auto",icon:"mdi:robot-outline",fields:["remote_entity","follow_room","remote_event","fire_event","event_id","sync_group","popup","companion","usage_stats"]},{id:"kiosk",icon:"mdi:tablet",fields:["idle_dim","idle_dim_mode","auto_rotate","click_sound","fullscreen","offline_banner"]},{id:"perf",icon:"mdi:speedometer",fields:["lazy","preload","unmount_hidden","unload_after","loading_placeholder","friendly_errors"]},{id:"adv",icon:"mdi:cog-outline",fields:["debug","edit_mode_reveal","share_button","aria_label"]}],ea="tabs";function oa(t){return ta.find(e=>e.fields.includes(t))}function ia(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}function aa(t,e){if(!e.length)return!0;const o=ia(t);return e.every(t=>o.includes(t))}function ra(t,e,o){return o.filter(o=>!((t,e)=>JSON.stringify(t??null)===JSON.stringify(e??null))(t[o],e[o]))}var na="tabdeck-editor-sections";function sa(t){try{localStorage.setItem(na,JSON.stringify(t))}catch{}}var da={dock_wizard:"dock",dock_hide_bar:"dock",remember_entity:"remember_entity",default_tab:"default_tab",many_tabs:"lazy",preload_all:"preload"};function ca(t){const e=t.vars??{};if("string"==typeof e.tab)return{tab:e.tab};const o=da[t.rule]??("string"==typeof e.key?e.key:void 0);return o&&oa(o)?{field:o}:void 0}function la(t){let e=0,o=0,i=0,a=0;for(let r=0;r<t.length;r+=4){const n=t[r+3]/255;n<.1||(e+=t[r]*n,o+=t[r+1]*n,i+=t[r+2]*n,a+=n)}return a?[Math.round(e/a),Math.round(o/a),Math.round(i/a)]:void 0}var ha=new Map;function pa(t,e="average"){const o=`${e} ${t}`;let i=ha.get(o);return i||(i=function(t){return"undefined"==typeof OffscreenCanvas||"undefined"==typeof Image?Promise.resolve(void 0):new Promise(e=>{const o=new Image;let i;const a=t=>{clearTimeout(i),o.onload=o.onerror=null,e(t)};try{new URL(t,location.href).origin!==location.origin&&(o.crossOrigin="anonymous")}catch{return a()}o.onload=()=>{try{const t=new OffscreenCanvas(24,24).getContext("2d");t.drawImage(o,0,0,24,24),a(t.getImageData(0,0,24,24).data)}catch{a()}},o.onerror=()=>a(),i=setTimeout(()=>a(),1e4),o.src=t})}(t).then(t=>t?"dominant"===e?function(t){const e=Array.from({length:12},()=>({w:0,r:0,g:0,b:0}));for(let i=0;i<t.length;i+=4){if(t[i+3]<128)continue;const[o,a,r]=[t[i],t[i+1],t[i+2]],n=Math.max(o,a,r),s=Math.min(o,a,r),d=n?(n-s)/n:0;if(d<.25||n<40||s>235)continue;const c=n-s;let l=n===o?(a-r)/c%6:n===a?(r-o)/c+2:(o-a)/c+4;l<0&&(l+=6);const h=e[Math.floor(2*l)%12];h.w+=d,h.r+=o*d,h.g+=a*d,h.b+=r*d}const o=e.reduce((t,e)=>e.w>t.w?e:t);return 0===o.w?la(t):[Math.round(o.r/o.w),Math.round(o.g/o.w),Math.round(o.b/o.w)]}(t):la(t):void 0),ha.set(o,i)),i}var ua=class extends At{constructor(...t){super(...t),this._language=new b(this),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.display="both",this.align="start",this.badgeDisplay="text",this.scrollable="auto",this.animated=!0,this.accentIndicator=!0,this.indicatorSize=3,this.sticky=!1,this.elevation=!1,this.scrollButtons=!1,this.overflowMenu=!1,this.fade=!1,this.limit=0,this._menuOpen=!1,this.hiddenAlerts=!1,this._hiddenCount=0,this._groupOpen=-1,this._groupLeft=0,this.collapsed=!1,this.language="en",this.rtl=!1,this.liquid=!1,this._lastSel=-1,this.density="default",this.railExpand=!1,this._railOpen=!1,this.customizable=!1,this.customItems=[],this._customOpen=!1,this.searchable=!1,this.expandable=!1,this.overviewable=!1,this.entitySearchable=!1,this.shareable=!1,this.reorderable=!1,this._searchOpen=!1,this._query="",this._active=0,this.dock=!1,this.autohide=!1,this.autohidden=!1,this._ready=!1,this._overflow=!1,this._resizeRaf=0,this._tipEnd=()=>{clearTimeout(this._tipTimer),this._tip&&(this._tip=void 0,window.removeEventListener("keydown",this._tipKey),window.removeEventListener("scroll",this._tipEnd,{capture:!0}))},this._tipKey=t=>{"Escape"===t.key&&this._tipEnd()},this._railEnter=()=>{this._railActive&&(this._railOpen=!0)},this._railLeave=()=>{this._railActive&&!this.matches(":focus-within")&&(this._railOpen=!1)},this._railFocusOut=t=>{if(!this._railActive)return;const e=t.relatedTarget;e&&this.contains(e)||this.matches(":hover")||(this._railOpen=!1)},this._suppressClick=!1,this._dragTouchMove=t=>{this._drag?.held&&t.cancelable&&t.preventDefault()},this._dragMove=t=>{const e=this._drag;if(!e)return;const o=t.clientX-e.x,i=t.clientY-e.y;if(!e.active){if(Math.hypot(o,i)<8)return;if(!e.held)return this._dragEnd();e.active=!0,this._cancelHold(),e.el.classList.add("dragging")}t.preventDefault();const a=this._horizontal,r=a&&this.rtl?-1:1;e.el.style.transform=(a?`translateX(${o}px)`:`translateY(${i}px)`)+" rotate(-2deg)";const n=[...this.renderRoot.querySelectorAll("tabdeck-tab")].map(t=>{const n=t.getBoundingClientRect(),s=t===e.el?a?o:i:0;return a?r<0?{start:-(n.right-s),end:-(n.left-s)}:{start:n.left-s,end:n.right-s}:{start:n.top-s,end:n.bottom-s}}),s=function(t,e){if(!t.length)return;if(e<t[0].start)return{index:0,after:!1};for(let i=0;i<t.length;i++){const o=t[i];if(e>=o.start&&e<o.end)return{index:i,after:e>=(o.start+o.end)/2}}let o=t.length-1;for(;o>0&&t[o].start>e;)o--;return{index:o,after:!0}}(n,a?t.clientX*r:t.clientY);this._dropAt=s&&{...s,index:s.index+this._window[0]}},this._dragUp=()=>{const t=this._drag,e=this._dropAt;t?.active&&(this._suppressClick=!0,e&&e.index!==t.index&&this.dispatchEvent(new CustomEvent("tabdeck-reorder",{detail:{from:t.index,to:e.index,after:e.after},bubbles:!0,composed:!0}))),this._dragEnd()},this._dragCancel=()=>this._dragEnd(),this._dragKey=t=>{"Escape"===t.key&&this._drag?.active&&(t.preventDefault(),t.stopPropagation(),this._suppressClick=!0,this._dragEnd())},this._tapIndex=-1,this._onCustomOutside=t=>{const e=this.renderRoot.querySelector(".custom-panel"),o=this.renderRoot.querySelector(".custom-btn"),i=t.composedPath();e&&i.includes(e)||o&&i.includes(o)||this._closeCustom()},this._onShareOutside=t=>{const e=this.renderRoot,o=t.composedPath(),i=e.querySelector(".share-panel"),a=e.querySelector(".share-btn");i&&o.includes(i)||a&&o.includes(a)||this.dispatchEvent(new CustomEvent("tabdeck-share-close",{bubbles:!0,composed:!0}))},this._onSearchOutside=t=>{const e=this.renderRoot.querySelector(".search-panel"),o=this.renderRoot.querySelector(".search-btn"),i=t.composedPath();e&&i.includes(e)||o&&i.includes(o)||this._closeSearch()},this._onOutside=t=>{const e=this.renderRoot.querySelector(".group-menu");if(e&&t.composedPath().includes(e))return;const o=this._tabEl(this._groupOpen);o&&t.composedPath().includes(o)||this._closeGroup()},this._onKeydown=t=>{const e="left"===this.position||"right"===this.position,o=e?"ArrowDown":this.rtl?"ArrowLeft":"ArrowRight",i=e?"ArrowUp":this.rtl?"ArrowRight":"ArrowLeft";let a=null;if(t.key===o?a=this._step(this.selected,1):t.key===i?a=this._step(this.selected,-1):"Home"===t.key?a=this._firstEnabled():"End"===t.key&&(a=this._firstEnabled(!0)),null!==a){t.preventDefault(),this._select(a);const e=a;this.limit>0&&setTimeout(()=>this._tabEl(e)?.focus(),0)}},this._fadeMask="",this._onBarScroll=()=>{this.hiddenAlerts&&this._countHidden(),this._updateFade()},this._countHidden=()=>{let t=0;if(this.hiddenAlerts){const[e,o]=this._window,i=this.renderRoot.querySelector(".bar")?.getBoundingClientRect();this.items.forEach((a,r)=>{if(!this._needsAttention(a))return;if(r<e||r>=o)return void t++;const n=this._tabEl(r)?.getBoundingClientRect();i&&n&&n.width&&(n.left<i.left-1||n.right>i.right+1)&&t++})}t!==this._hiddenCount&&(this._hiddenCount=t)}}get _window(){return function(t,e,o){if(!(o>0)||t<=o)return[0,t];const i=Math.min(Math.max(0,e),t-1),a=Math.min(Math.floor(i/o)*o,t-o);return[a,a+o]}(this.items.length,this.selected,this.limit)}_tabEl(t){const[e,o]=this._window;if(!(t<e||t>=o))return this.renderRoot.querySelectorAll("tabdeck-tab")[t-e]}_tipStart(t,e,o=500){this._tipEnd();const i=this.items[t]?.tooltip;if(!i||"touch"===e.pointerType)return;const a=e.currentTarget;this._tipTimer=setTimeout(()=>{const t=a.getBoundingClientRect(),e="left"===this.position||"right"===this.position?"left"===this.position!==this.rtl?"right":"left":void 0,o=this.dock||"bottom"===this.position?"above":e??"below";this._tip={text:i,place:o,x:"right"===o?t.right+6:"left"===o?t.left-6:t.left+t.width/2,y:"below"===o?t.bottom+6:"above"===o?t.top-6:t.top+t.height/2},window.addEventListener("keydown",this._tipKey),window.addEventListener("scroll",this._tipEnd,{capture:!0,once:!0})},o)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.setAttribute("aria-label",this.barLabel||l(this.language,"card.tabs")),"auto"===this.barText&&requestAnimationFrame(()=>this._applyBarText()),this.addEventListener("keydown",this._onKeydown),this.addEventListener("mouseenter",this._railEnter),this.addEventListener("mouseleave",this._railLeave),this.addEventListener("focusin",this._railEnter),this.addEventListener("focusout",this._railFocusOut),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>{this._resizeRaf||(this._resizeRaf=requestAnimationFrame(()=>{this._resizeRaf=0,this._position()}))}))}disconnectedCallback(){this._dragEnd(),this._tipEnd(),window.removeEventListener("pointerdown",this._onShareOutside,!0),this.removeEventListener("keydown",this._onKeydown),window.removeEventListener("pointerdown",this._onOutside,!0),window.removeEventListener("pointerdown",this._onSearchOutside,!0),window.removeEventListener("pointerdown",this._onCustomOutside,!0),this._resizeObserver?.disconnect(),super.disconnectedCallback()}get _railActive(){return this.railExpand&&!this._horizontal}_select(t){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t},bubbles:!0,composed:!0}))}_emitAction(t,e){this.dispatchEvent(new CustomEvent("tabdeck-action",{detail:{index:t,kind:e},bubbles:!0,composed:!0}))}_onPointerDown(t,e){this._suppressClick=!1,this.reorderable&&e&&this._dragStart(t,e),this.items[t]?.holdAction&&(this._holdTimer=setTimeout(()=>{this._drag&&!this._drag.active&&this._dragEnd(),this._suppressClick=!0,this._emitAction(t,"hold")},500))}_dragStart(t,e){if(e.button>0)return;const o="touch"===e.pointerType||"pen"===e.pointerType,i=e.currentTarget;this._dragEnd();const a={index:t,x:e.clientX,y:e.clientY,touch:o,held:!o,active:!1,el:i};o&&(a.timer=setTimeout(()=>a.held=!0,300)),this._drag=a,window.addEventListener("pointermove",this._dragMove,!0),window.addEventListener("pointerup",this._dragUp,!0),window.addEventListener("pointercancel",this._dragCancel,!0),window.addEventListener("keydown",this._dragKey,!0),window.addEventListener("touchmove",this._dragTouchMove,{passive:!1,capture:!0})}_dragEnd(){const t=this._drag;this._drag=void 0,this._dropAt=void 0,window.removeEventListener("pointermove",this._dragMove,!0),window.removeEventListener("pointerup",this._dragUp,!0),window.removeEventListener("pointercancel",this._dragCancel,!0),window.removeEventListener("keydown",this._dragKey,!0),window.removeEventListener("touchmove",this._dragTouchMove,!0),t&&(t.timer&&clearTimeout(t.timer),t.el.classList.remove("dragging"),t.el.style.transform="")}_cancelHold(){this._holdTimer&&clearTimeout(this._holdTimer),this._holdTimer=void 0}_onTabClick(t,e){if(this._cancelHold(),this._suppressClick)this._suppressClick=!1;else{if(this.items[t]?.doubleTap){if(this._tapTimer&&this._tapIndex===t)return clearTimeout(this._tapTimer),this._tapTimer=void 0,void this._emitAction(t,"double_tap");this._tapTimer&&clearTimeout(this._tapTimer),this._tapIndex=t;const o=e?.currentTarget;return void(this._tapTimer=setTimeout(()=>{this._tapTimer=void 0,this._activate(t,o)},250))}this._activate(t,e?.currentTarget)}}_activate(t,e){this.items[t]?.menu?.length?this._toggleGroup(t,e):this._select(t)}_emitCustomize(t){this.dispatchEvent(new CustomEvent("tabdeck-customize",{detail:t,bubbles:!0,composed:!0}))}_customLayout(t=this.customItems){return{order:t.map(t=>t.key).filter(t=>void 0!==t),hidden:t.filter(t=>t.hidden&&void 0!==t.key).map(t=>t.key)}}_moveCustom(t,e){const o=this.customItems.slice(),i=t+e;i<0||i>=o.length||([o[t],o[i]]=[o[i],o[t]],this._emitCustomize(this._customLayout(o)))}_toggleCustomHidden(t){const e=this.customItems.map((e,o)=>o===t?{...e,hidden:!e.hidden}:e);e.every(t=>t.hidden)||this._emitCustomize(this._customLayout(e))}_openCustom(){this._customOpen=!0,window.addEventListener("pointerdown",this._onCustomOutside,!0)}_closeCustom(){this._customOpen=!1,window.removeEventListener("pointerdown",this._onCustomOutside,!0)}_renderCustom(){const t=this.language,e=(e,o)=>l(t,e,o),o=this.customItems.length;return st`<div
      class="custom-panel"
      role="dialog"
      aria-label=${e("card.customize")}
      @keydown=${t=>{t.stopPropagation(),"Escape"===t.key&&this._closeCustom()}}
    >
      <div class="custom-title">${e("card.customize")}</div>
      ${this.customItems.map((t,i)=>st`<div class="custom-row ${t.hidden?"is-hidden":""}">
          ${t.icon?st`<ha-icon .icon=${t.icon}></ha-icon>`:st`<span class="custom-noicon"></span>`}
          <span class="custom-name">${t.name??""}</span>
          <button class="custom-up" ?disabled=${0===i} aria-label=${e("card.move_up",{name:t.name??""})} @click=${()=>this._moveCustom(i,-1)}>↑</button>
          <button class="custom-down" ?disabled=${i===o-1} aria-label=${e("card.move_down",{name:t.name??""})} @click=${()=>this._moveCustom(i,1)}>↓</button>
          <button
            class="custom-eye"
            aria-pressed=${t.hidden?"false":"true"}
            aria-label=${e(t.hidden?"card.show_tab":"card.hide_tab",{name:t.name??""})}
            @click=${()=>this._toggleCustomHidden(i)}
          >
            <ha-icon .icon=${t.hidden?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
          </button>
        </div>`)}
      <div class="custom-actions">
        <button class="custom-reset" @click=${()=>this._emitCustomize({reset:!0})}>${e("card.reset")}</button>
        <button class="custom-done" @click=${()=>this._closeCustom()}>${e("card.done")}</button>
      </div>
    </div>`}_matches(t){const e=t=>(t??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),o=e(t).trim();return this.items.map((t,e)=>({index:e,item:t})).filter(({item:t})=>!t.disabled).filter(({item:t})=>!o||e(t.name).includes(o)||e(t.subtitle).includes(o))}openSearch(){this._query="",this._active=0,this._searchOpen=!0,window.addEventListener("pointerdown",this._onSearchOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeSearch(){this._searchOpen=!1,window.removeEventListener("pointerdown",this._onSearchOutside,!0)}_renderShare(t){const e=t=>l(this.language,t);return st`<div class="share-panel" role="dialog" aria-label=${e("card.share")}>
      <div class="share-status ${t.copied?"ok":""}">
        ${t.copied?st`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>`:""}
        ${e(t.copied?"card.link_copied":"card.copy_link")}
      </div>
      <input class="share-url" readonly .value=${t.url} @focus=${t=>t.target.select()} />
      ${t.qrPath?st`<svg class="share-qr" viewBox="0 0 ${t.qrSize} ${t.qrSize}" role="img" aria-label=${e("card.scan_qr")} shape-rendering="crispEdges">
              <rect width="100%" height="100%" fill="#fff"></rect>
              <path d=${t.qrPath} fill="#000"></path>
            </svg>
            <div class="share-caption">${e("card.scan_qr")}</div>`:""}
    </div>`}willUpdate(t){super.willUpdate(t),t.has("shareInfo")&&(window.removeEventListener("pointerdown",this._onShareOutside,!0),this.shareInfo&&window.addEventListener("pointerdown",this._onShareOutside,!0))}_pickSearch(t){this._closeSearch(),this._select(t)}_onSearchKeydown(t){t.stopPropagation();const e=this._matches(this._query);if("Escape"===t.key)this._closeSearch();else if("Enter"===t.key){t.preventDefault();const o=e[this._active]??e[0];o&&this._pickSearch(o.index)}else if("ArrowDown"===t.key||"ArrowUp"===t.key){t.preventDefault();const o=e.length||1;this._active=(this._active+("ArrowDown"===t.key?1:-1)+o)%o}}_renderSearch(){const t=this._matches(this._query),e=this.language;return st`<div class="search-panel" role="dialog" aria-label=${l(e,"card.search")}>
      <input
        class="search-input"
        type="search"
        placeholder=${l(e,"card.search_placeholder")}
        aria-label=${l(e,"card.search")}
        .value=${this._query}
        @input=${t=>{this._query=t.target.value,this._active=0}}
        @keydown=${t=>this._onSearchKeydown(t)}
      />
      <div class="search-results" role="listbox">
        ${t.length?t.map((t,e)=>st`<button
                class="group-item ${e===this._active?"active":""}"
                role="option"
                aria-selected=${e===this._active?"true":"false"}
                @click=${()=>this._pickSearch(t.index)}
              >
                ${t.item.icon?st`<ha-icon .icon=${t.item.icon}></ha-icon>`:""}<span>${t.item.name??""}</span>
              </button>`):st`<div class="search-empty">${l(e,"card.search_none")}</div>`}
      </div>
    </div>`}_toggleGroup(t,e){if(this._groupOpen===t)return void this._closeGroup();const o=this.renderRoot.querySelector(".bar");this._groupLeft=e?e.offsetLeft-(o?.scrollLeft??0):0,this._groupOpen=t,window.addEventListener("pointerdown",this._onOutside,!0),this.updateComplete.then(()=>this.renderRoot.querySelector(".group-item")?.focus())}_closeGroup(){this._groupOpen=-1,window.removeEventListener("pointerdown",this._onOutside,!0)}_pickChild(t,e){this._closeGroup(),this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t,child:e},bubbles:!0,composed:!0}))}_onGroupKeydown(t){const e=[...this.renderRoot.querySelectorAll(".group-item")],o=e.indexOf(t.composedPath()[0]);if("Escape"===t.key){t.stopPropagation();const e=this._tabEl(this._groupOpen);this._closeGroup(),e?.focus()}else if("ArrowDown"===t.key||"ArrowUp"===t.key){t.preventDefault(),t.stopPropagation();const i=e.length;e[(o+("ArrowDown"===t.key?1:-1)+i)%i]?.focus()}}_renderGroupMenu(){const t=this.items[this._groupOpen];if(!t?.menu)return"";const e=this._groupOpen;return st`<div
      class="group-menu"
      role="menu"
      style="left:${this._groupLeft}px"
      @keydown=${t=>this._onGroupKeydown(t)}
    >
      ${t.menu.map(t=>st`<button class="group-item" role="menuitem" @click=${()=>this._pickChild(e,t.name)}>
          ${t.icon?st`<ha-icon .icon=${t.icon}></ha-icon>`:""}<span>${t.name??""}</span>
        </button>`)}
    </div>`}_selectable(t){const e=this.items[t];return!!e&&!e.disabled&&!e.action}_step(t,e){const o=this.items.length;for(let i=1;i<=o;i++){const a=(t+e*i+o*i)%o;if(this._selectable(a))return a}return t}_firstEnabled(t=!1){const e=this.items.length;for(let o=0;o<e;o++){const i=t?e-1-o:o;if(this._selectable(i))return i}return 0}_updateFade(){const t=this.renderRoot?.querySelector(".bar");if(!t)return;const e=this.fade&&this._horizontal&&!this.dock?function(t,e,o){if(o-e<=1)return{start:!1,end:!1};const i=Math.abs(t);return{start:i>1,end:i+e<o-1}}(t.scrollLeft,t.clientWidth,t.scrollWidth):{start:!1,end:!1},o=function(t,e){return t.start||t.end?`linear-gradient(to ${e?"left":"right"}, ${t.start?"transparent, #000 32px":"#000"}, ${t.end?"#000 calc(100% - 32px), transparent":"#000"})`:""}(e,this.rtl),i=[e.start&&"start",e.end&&"end"].filter(Boolean).join(" ");o===this._fadeMask&&(t.dataset.fade??"")===i&&t.style.cssText.includes("mask-image")===!!o||(this._fadeMask=o,i?t.dataset.fade=i:delete t.dataset.fade,o?(t.style.setProperty("mask-image",o),t.style.setProperty("-webkit-mask-image",o)):(t.style.removeProperty("mask-image"),t.style.removeProperty("-webkit-mask-image")))}_position(){this._updateFade();const t=this.renderRoot?.querySelector(".indicator");if(!t)return;const e=this._tabEl(this.selected),o=e?function(t,e,o,i=3,a=!1){if(!t||t.offsetWidth<=0)return null;const r=i>0?i:3;if("text"===o)return null;if("pill"===o||"segmented"===o||"boxed"===o||"rail"===o)return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight};switch(!a||"left"!==e&&"right"!==e||(e="left"===e?"right":"left"),e){case"top":return{left:t.offsetLeft,top:t.offsetTop+t.offsetHeight-r,width:t.offsetWidth,height:r};case"bottom":return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:r};case"left":return{left:t.offsetLeft+t.offsetWidth-r,top:t.offsetTop,width:r,height:t.offsetHeight};case"right":return{left:t.offsetLeft,top:t.offsetTop,width:r,height:t.offsetHeight}}}({offsetLeft:e.offsetLeft,offsetTop:e.offsetTop,offsetWidth:e.offsetWidth,offsetHeight:e.offsetHeight},this.position,this.tabStyle,this.indicatorSize,this.rtl):null;o?(this._liquidMove(t,o),t.style.left=`${o.left}px`,t.style.top=`${o.top}px`,t.style.width=`${o.width}px`,t.style.height=`${o.height}px`,t.style.opacity="1"):t.style.opacity="0"}_liquidMove(t,e){const o=this._lastRect,i=this._lastSel>=0&&this._lastSel!==this.selected;if(this._lastRect=e,this._lastSel=this.selected,!(this.liquid&&i&&o&&this.animated&&this._ready&&"function"==typeof t.animate))return;if(Ai())return;const a="underline"===this.tabStyle?.6:.85;t.animate(function(t,e,o,i=.6){const a=t=>({left:`${t.left}px`,top:`${t.top}px`,width:`${t.width}px`,height:`${t.height}px`}),r=Math.min(o?t.top:t.left,o?e.top:e.left),n=Math.max(o?t.top+t.height:t.left+t.width,o?e.top+e.height:e.left+e.width),s=o?{...a(e),left:`${e.left}px`,top:`${r}px`,height:n-r+"px"}:{...a(e),top:`${e.top}px`,left:`${r}px`,width:n-r+"px"},d=o?`scaleX(${i})`:`scaleY(${i})`;return[{...a(t),transform:"none",offset:0},{...s,transform:d,offset:.45},{...a(e),transform:"none",offset:1}]}(o,e,!this._horizontal,a),{duration:420,easing:"cubic-bezier(0.3, 0.7, 0.2, 1)"})}_applyReadableSelected(){const t=this.renderRoot?.querySelector?.(".indicator"),e=t&&["pill","boxed"].includes(this.tabStyle)?getComputedStyle(t).backgroundColor:"",o=/^rgb\(/.test(e)||/^rgba\(.*,\s*1\)$/.test(e)?$i(e):void 0;o?this.style.setProperty("--tabdeck-selected-auto",o):this.style.removeProperty("--tabdeck-selected-auto")}_applyAccent(){const t=this.accentIndicator?this.items[this.selected]?.accent:void 0;t?this.style.setProperty("--tabdeck-accent",t):this.style.removeProperty("--tabdeck-accent"),null!=this.indicatorRadius?this.style.setProperty("--tabdeck-indicator-radius",`${this.indicatorRadius}px`):this.style.removeProperty("--tabdeck-indicator-radius")}_barRgb(){if("light"===this.barText)return[24,24,24];if("dark"===this.barText)return[240,240,240];if("auto"!==this.barText)return;const t=function(t){if("string"!=typeof t)return;const e=/url\(\s*(['"]?)(.*?)\1\s*\)/.exec(t);if(e)return e[2]||void 0;const o=t.trim();return/^(\/|https?:\/\/)\S/.test(o)&&!/\s/.test(o)?o:void 0}(this.barBackground);if(t)return t!==this._picUrl&&(this._picUrl=t,this._picRgb=void 0,pa(t).then(e=>{this._picUrl===t&&(this._picRgb=e)})),this._picRgb;this._picUrl=void 0;const e=this.renderRoot?.querySelector?.(".bar");if(!e||!this.barBackground)return;const o=getComputedStyle(e),i=((o.backgroundImage||"").match(/rgba?\([^)]*\)/g)??[]).map(t=>wi(t)).filter(Boolean);if(i.length)return[0,1,2].map(t=>i.reduce((e,o)=>e+o[t],0)/i.length);const a=o.backgroundColor||"";return/,\s*0(\.0+)?\)$/.test(a)?void 0:wi(a)}_applyBarText(){if(!this.isConnected)return;const t=this._barRgb(),e=t?$i(`rgb(${t.join(",")})`):void 0;if(!e)return void this.style.removeProperty("--tabdeck-tab-color");if(this.style.setProperty("--tabdeck-tab-color","#fff"===e?"rgba(255, 255, 255, 0.88)":"rgba(0, 0, 0, 0.72)"),this.style.getPropertyValue("--tabdeck-selected-auto"))return;const o=this._tabEl(this.selected),i=o&&!o.style.color?wi(getComputedStyle(o).color):void 0;i&&xi(i,t)<3&&this.style.setProperty("--tabdeck-selected-auto",e)}_applyGlass(){this.toggleAttribute("glass",!!this.glass),this.glass?this.style.setProperty("--tabdeck-glass-blur",`${this.glass}px`):this.style.removeProperty("--tabdeck-glass-blur")}_applySticky(){if(this.sticky)this.style.position="sticky",this.style.zIndex="2",this.style.background=this.barBackground||this.glass?"transparent":"var(--card-background-color, var(--ha-card-background, inherit))","bottom"===this.position?(this.style.bottom="0",this.style.top=""):(this.style.setProperty("top","var(--tabdeck-sticky-top, var(--header-height, 0px))"),this.style.bottom="");else for(const t of["position","zIndex","background","top","bottom"])this.style.removeProperty(t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()))}firstUpdated(){const t=this.renderRoot.querySelector(".bar");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(t){this.setAttribute("aria-label",this.barLabel||l(this.language,"card.tabs")),this.toggleAttribute("rail-expand",this._railActive),this.toggleAttribute("expanded",this._railActive&&this._railOpen),this.toggleAttribute("rtl",this.rtl),this._applyAccent(),this._applyGlass(),this._applyReadableSelected(),this._applyBarText(),this._applySticky();const e=this._searchOpen||this._customOpen||this._menuOpen||this._groupOpen>=0;this.toggleAttribute("autohidden",this.autohide&&this.autohidden&&!e),this.toggleAttribute("autohide-down",this.dock||"bottom"===this.position),this._position();const o=[...this.renderRoot.querySelectorAll("tabdeck-tab")];if(this.fade&&this._horizontal)for(const i of o)this._resizeObserver?.observe(i);Promise.all(o.map(t=>t.updateComplete)).then(()=>{this._position(),this.limit>0&&this._revealLimited(t)}),this._updateOverflow(),this._countHidden(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}_revealLimited(t){const e=this.renderRoot;if(t.has("selected")||t.has("items")){const t=e.querySelector(".bar"),o=this._tabEl(this.selected);if(t&&o&&this._horizontal){const e=t.getBoundingClientRect(),i=o.getBoundingClientRect();i.left<e.left?t.scrollLeft-=e.left-i.left:i.right>e.right&&(t.scrollLeft+=i.right-e.right)}}if(t.has("_menuOpen")&&this._menuOpen){const t=e.querySelector(".overflow-item.current"),o=e.querySelector(".overflow-menu");t&&o&&(o.scrollTop=t.offsetTop-o.clientHeight/2+t.offsetHeight/2)}}get _horizontal(){return"top"===this.position||"bottom"===this.position}_needsAttention(t){return!!t.alert||Ei(t.badge)}_updateOverflow(){if(!this.scrollButtons&&!this.overflowMenu||!this._horizontal)return void(this._overflow&&(this._overflow=!1));const t=this.renderRoot.querySelector(".bar"),e=!!t&&t.scrollWidth-t.clientWidth>1;e!==this._overflow&&(this._overflow=e)}_scrollBy(t){const e=this.renderRoot.querySelector(".bar");e&&e.scrollBy({left:t*(this.rtl?-1:1)*e.clientWidth*.8,behavior:Ai()?"auto":"smooth"})}_pickFromMenu(t){this._menuOpen=!1,this.items[t]?.disabled||this._select(t)}render(){const t=this._ready&&this.animated&&!this.liquid?" animate":"",e=this.scrollButtons&&this._horizontal&&this._overflow,[o,i]=this._window,a=i-o<this.items.length,r=this.overflowMenu&&this._horizontal&&this._overflow||a;return st`
      <div class="bar-wrap ${e||r||this.searchable||this.customizable||this.expandable||this.overviewable||this.entitySearchable||this.lastTab||this.shareable||void 0!==this.summary?"has-arrows":""}">
      ${e?st`<button class="scroll-btn left" aria-label=${l(this.language,this.rtl?"card.scroll_right":"card.scroll_left")} @click=${()=>this._scrollBy(-1)}>${this.rtl?"›":"‹"}</button>`:""}
      <div
        @scroll=${this.hiddenAlerts||this.fade?this._onBarScroll:ct}
        class="bar ${this.position} style-${this.tabStyle} align-${this.align} ${this.elevation?"elevated":""} ${"dots"===this.display?"dots":""}"
        part="bar"
        style=${this.barBackground?`background:${this.barBackground}`:""}
      >
        <div class="indicator${t}" part="indicator"></div>
        ${this.items.slice(o,i).map((t,e,i,a=o+e)=>st`
            ${t.separator&&"dots"!==this.display?st`<span class="sep sep-${t.separator}" aria-hidden="true"></span>`:""}
            <tabdeck-tab
              .label=${t.name}
              .subtitle=${t.subtitle}
              .icon=${t.icon}
              .badge=${t.badge}
              .badgeColor=${t.badgeColor}
              .badgeAction=${!!t.badgeAction}
              .changed=${!!t.changed}
              .changedLabel=${l(this.language,"card.changed")}
              .unhealthy=${!!t.unhealthy}
              .speed=${t.speed}
              .unhealthyLabel=${l(this.language,"card.unhealthy")}
              .badgeDisplay=${this.badgeDisplay}
              @badge-click=${()=>this._emitAction(a,"badge")}
              .accent=${t.accent}
              .color=${t.color}
              .disabled=${!!t.disabled}
              .alert=${!!t.alert}
              .action=${!!t.action}
              .ghost=${!!t.ghost}
              .fab=${!!t.fab}
              .ring=${t.ring}
              .ringColor=${t.ringColor}
              .ringStyle=${t.ringStyle}
              .graph=${t.graph}
              .graphColor=${t.graphColor}
              .badgeIcon=${t.badgeIcon}
              .bounce=${!!t.bounce}
              .extraBadges=${t.badges?.map(t=>({...t,label:l(this.language,"card.badge",{value:t.text??t.icon??""})}))}
              .picture=${t.picture}
              .iconAnimation=${t.iconAnimation}
              .font=${t.font}
              .hasMenu=${!!t.menu?.length}
              aria-haspopup=${t.menu?.length?"menu":"false"}
              aria-expanded=${t.menu?.length?String(this._groupOpen===a):"false"}
              .stacked=${this.dock}
              .ghostLabel=${l(this.language,"card.ghost")}
              .badgeLabel=${l(this.language,"card.badge",{value:t.badge??""})}
              .display=${this._railActive?this._railOpen?"both":"icon":this.display}
              .selected=${a===this.selected}
              aria-controls="tabdeck-panel"
              @click=${t=>this._onTabClick(a,t)}
              data-drop=${this._dropAt?.index===a?this._dropAt.after?"after":"before":""}
              @pointerdown=${t=>{this._tipEnd(),this._onPointerDown(a,t)}}
              @pointerup=${()=>this._cancelHold()}
              aria-description=${t.tooltip||ct}
              @pointerenter=${t.tooltip?t=>this._tipStart(a,t):ct}
              @focusin=${t.tooltip?t=>t.currentTarget.matches?.(":focus-visible")&&this._tipStart(a,t,0):ct}
              @focusout=${t.tooltip?this._tipEnd:ct}
              @pointerleave=${()=>{this._tipEnd(),this._cancelHold()}}
              @pointercancel=${()=>this._cancelHold()}
            ></tabdeck-tab>
          `)}
      </div>
      ${this._tip?st`<div class="tip tip-${this._tip.place}" role="tooltip" style="left:${this._tip.x}px;top:${this._tip.y}px">${this._tip.text}</div>`:""}
      ${this.summary?st`<button
            class="summary-chip"
            part="summary-chip"
            style=${this.summary.color?`background:${this.summary.color}`:""}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-summary",{bubbles:!0,composed:!0}))}
          >
            ${this.summary.icon?st`<ha-icon icon=${this.summary.icon}></ha-icon>`:""}<span>${this.summary.text}</span>
          </button>`:""}
      ${this._groupOpen>=0?this._renderGroupMenu():""}
      ${this.searchable?st`<button
            class="search-btn"
            aria-label=${l(this.language,"card.search")}
            aria-expanded=${this._searchOpen?"true":"false"}
            @click=${()=>this._searchOpen?this._closeSearch():this.openSearch()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg>
          </button>`:""}
      ${this._searchOpen?this._renderSearch():""}
      ${this.customizable?st`<button
            class="custom-btn search-btn"
            aria-label=${l(this.language,"card.customize")}
            aria-expanded=${this._customOpen?"true":"false"}
            @click=${()=>this._customOpen?this._closeCustom():this._openCustom()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"></path></svg>
          </button>`:""}
      ${this._customOpen?this._renderCustom():""}
      ${this.lastTab?st`<button
            class="last-btn search-btn"
            aria-label=${l(this.language,"card.last_tab",{name:this.lastTab.name??""})}
            title=${l(this.language,"card.last_tab",{name:this.lastTab.name??""})}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-last",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z"></path></svg>
            ${"icon"!==this.display&&"dots"!==this.display&&this.lastTab.name?st`<span class="last-name">${this.lastTab.name}</span>`:""}
          </button>`:""}
      ${this.shareable?st`<button
            class="share-btn search-btn"
            aria-label=${l(this.language,"card.share")}
            title=${l(this.language,"card.share")}
            aria-expanded=${this.shareInfo?"true":"false"}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-share",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"></path></svg>
          </button>`:""}
      ${this.shareable&&this.shareInfo?this._renderShare(this.shareInfo):""}
      ${this.entitySearchable?st`<button
            class="es-btn search-btn"
            aria-label=${l(this.language,"card.entity_search")}
            title=${l(this.language,"card.entity_search")+" (Ctrl K)"}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-entity-search",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,4H21V6H3V4M3,9H11V11H3V9M3,14H9V16H3V14M15.5,10A4.5,4.5 0 0,1 20,14.5C20,15.38 19.75,16.21 19.31,16.9L22.39,20L21,21.39L17.88,18.32C17.19,18.75 16.37,19 15.5,19A4.5,4.5 0 0,1 11,14.5A4.5,4.5 0 0,1 15.5,10M15.5,12A2.5,2.5 0 0,0 13,14.5A2.5,2.5 0 0,0 15.5,17A2.5,2.5 0 0,0 18,14.5A2.5,2.5 0 0,0 15.5,12Z"></path></svg>
          </button>`:""}
      ${this.overviewable?st`<button
            class="ov-btn search-btn"
            aria-label=${l(this.language,"card.overview")}
            title=${l(this.language,"card.overview")}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-overview",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3"></path></svg>
          </button>`:""}
      ${this.expandable?st`<button
            class="fs-btn search-btn"
            aria-label=${l(this.language,"card.fullscreen")}
            @click=${()=>this.dispatchEvent(new CustomEvent("tabdeck-fullscreen",{bubbles:!0,composed:!0}))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"></path></svg>
          </button>`:""}
      ${e?st`<button class="scroll-btn right" aria-label=${l(this.language,this.rtl?"card.scroll_left":"card.scroll_right")} @click=${()=>this._scrollBy(1)}>${this.rtl?"‹":"›"}</button>`:""}
      ${r?st`<button
              class="overflow-btn"
              aria-label=${l(this.language,"card.all_tabs")+(this._hiddenCount?` (${l(this.language,"card.badge",{value:this._hiddenCount})})`:"")}
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              @click=${()=>this._menuOpen=!this._menuOpen}
            >
              ⋯${this._hiddenCount?st`<span class="ov-count">${this._hiddenCount}</span>`:""}
            </button>
            ${this._menuOpen?st`<div class="overflow-menu" role="menu">
                  ${this.items.map((t,e)=>st`<button
                      class="overflow-item ${e===this.selected?"current":""}"
                      role="menuitem"
                      ?disabled=${t.disabled}
                      @click=${()=>this._pickFromMenu(e)}
                    >
                      ${t.name??l(this.language,"card.tab_n",{n:e+1})}
                      ${this.hiddenAlerts&&this._needsAttention(t)?st`<span class="ov-badge ${Ei(t.badge)?"":"alert"}">${Ei(t.badge)?t.badge:"!"}</span>`:""}
                    </button>`)}
                </div>`:""}`:""}
      </div>
    `}static{this.styles=x`
    ${Si}
    :host {
      display: block;
    }
    .tip {
      position: fixed;
      z-index: 9;
      max-width: 240px;
      padding: 6px 9px;
      border-radius: 6px;
      background: var(--tabdeck-tooltip-background, rgba(40, 44, 52, 0.95));
      color: var(--tabdeck-tooltip-color, #fff);
      font-size: 12px;
      line-height: 1.35;
      white-space: pre-line;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      transform: translateX(-50%);
    }
    .tip-above {
      transform: translate(-50%, -100%);
    }
    .tip-right {
      transform: translateY(-50%);
    }
    .tip-left {
      transform: translate(-100%, -50%);
    }
    /* bar_autohide: slide out past the pinned edge (HA's header for a top bar). */
    :host([autohide]) {
      transition: transform 200ms ease;
    }
    :host([autohidden]) {
      transform: translateY(calc(-100% - var(--tabdeck-sticky-top, var(--header-height, 0px))));
      pointer-events: none;
    }
    :host([autohidden][autohide-down]) {
      transform: translateY(calc(100% + 8px));
    }
    @media (prefers-reduced-motion: reduce) {
      :host([autohide]) {
        transition: none;
      }
    }
    /* rail_expand: an icon rail that widens over the content on hover. */
    :host([rail-expand]) {
      position: relative;
      z-index: 3;
      flex: none;
      width: var(--tabdeck-rail-width, 64px);
    }
    :host([rail-expand]) .bar-wrap {
      position: absolute;
      top: 0;
      bottom: 0;
      inset-inline-start: 0;
      min-width: 100%;
      background: var(--card-background-color, var(--ha-card-background, #fff));
      transition: box-shadow 150ms ease;
    }
    :host([rail-expand]) .bar {
      height: 100%;
      box-sizing: border-box;
    }
    :host([rail-expand][expanded]) .bar-wrap {
      box-shadow: 4px 0 14px rgba(0, 0, 0, 0.25);
      border-start-end-radius: 12px;
      border-end-end-radius: 12px;
    }
    :host([rail-expand][expanded][rtl]) .bar-wrap {
      box-shadow: -4px 0 14px rgba(0, 0, 0, 0.25);
    }
    :host([rail-expand][expanded]) .bar {
      align-items: stretch;
    }
    :host([rail-expand][expanded]) tabdeck-tab {
      justify-content: flex-start;
      padding-inline-end: 20px;
    }
    /* A right-hand rail grows leftwards. */
    :host([rail-expand]) .bar-wrap:has(.bar.right) {
      inset-inline-start: auto;
      inset-inline-end: 0;
    }
    :host([rail-expand][expanded]) .bar-wrap:has(.bar.right) {
      box-shadow: -4px 0 14px rgba(0, 0, 0, 0.25);
      border-radius: 0;
      border-start-start-radius: 12px;
      border-end-start-radius: 12px;
    }
    :host([rail-expand][expanded][rtl]) .bar-wrap:has(.bar.right) {
      box-shadow: 4px 0 14px rgba(0, 0, 0, 0.25);
    }
    /* separator: a thin line, or a space that pushes later tabs to the end. */
    .sep {
      flex: none;
      align-self: center;
    }
    .sep-line {
      width: 1px;
      height: 60%;
      min-height: 16px;
      margin: 0 4px;
      background: var(--tabdeck-separator-color, var(--divider-color, rgba(127, 127, 127, 0.4)));
    }
    .bar.left .sep-line,
    .bar.right .sep-line {
      width: 60%;
      height: 1px;
      min-height: 0;
      margin: 4px auto;
    }
    .sep-space {
      flex: 1 1 0;
      min-width: 12px;
      min-height: 12px;
      align-self: stretch;
    }
    /* dots: a centred, borderless row of pagination dots, no indicator. */
    .bar.dots {
      justify-content: center;
      border: none;
      padding: 4px 0;
      gap: 0;
    }
    .bar.dots .indicator {
      display: none;
    }
    /* dock: a phone-style navigation bar fixed to the bottom of the screen. */
    :host([dock]) {
      position: fixed;
      left: var(--tabdeck-dock-left, 0);
      right: var(--tabdeck-dock-right, 0);
      bottom: 0;
      z-index: 5;
      padding-bottom: env(safe-area-inset-bottom, 0px);
      background: var(--tabdeck-dock-background, var(--card-background-color, var(--ha-card-background, #fff)));
      box-shadow: var(--tabdeck-dock-shadow, 0 -2px 10px rgba(0, 0, 0, 0.18));
    }
    :host([dock]) .bar {
      border-top: none;
      overflow: visible;
    }
    :host([dock]) .bar tabdeck-tab:not([fab]) {
      flex: 1 1 0;
      justify-content: center;
    }
    .bar-wrap {
      position: relative;
    }
    .group-menu {
      position: absolute;
      top: 100%;
      z-index: 4;
      min-width: 180px;
      max-height: 320px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 4px;
      display: flex;
      flex-direction: column;
    }
    :host([dock]) .group-menu,
    .bar.bottom ~ .group-menu {
      top: auto;
      bottom: 100%;
    }
    .group-item {
      display: flex;
      align-items: center;
      gap: 10px;
      text-align: start;
      border: none;
      background: none;
      cursor: pointer;
      padding: 9px 12px;
      border-radius: 6px;
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .group-item:hover,
    .group-item:focus-visible {
      background: var(--secondary-background-color, #f5f5f5);
      outline: none;
    }
    .search-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0 8px;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      display: inline-flex;
      align-items: center;
    }
    .search-btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
    .last-btn {
      flex-direction: column;
      justify-content: center;
      gap: 1px;
      max-width: 88px;
      color: var(--tabdeck-accent, var(--primary-color));
    }
    .last-name {
      font-size: 11px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .search-panel {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 4;
      width: min(320px, 100%);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 6px;
      box-sizing: border-box;
    }
    .share-panel {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 4;
      width: min(260px, 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 10px;
      box-sizing: border-box;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      color: var(--primary-text-color);
    }
    :host([dock]) .share-panel {
      top: auto;
      bottom: 100%;
    }
    .share-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .share-status.ok {
      color: var(--success-color, #2e7d32);
      background: color-mix(in srgb, var(--success-color, #2e7d32) 14%, transparent);
    }
    .share-status svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
    .share-url {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 8px;
      font: inherit;
      font-size: 12px;
      color: var(--secondary-text-color);
      background: var(--secondary-background-color, transparent);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
    }
    .share-qr {
      width: 168px;
      height: 168px;
      border-radius: 6px;
    }
    .share-caption {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    :host([dock]) .search-panel {
      top: auto;
      bottom: 100%;
    }
    .search-input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      font: inherit;
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      outline: none;
    }
    .search-input:focus {
      border-color: var(--tabdeck-accent, var(--primary-color));
    }
    .search-results {
      display: flex;
      flex-direction: column;
      max-height: 280px;
      overflow: auto;
      margin-top: 4px;
    }
    .search-results .group-item.active {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .custom-panel {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 4;
      width: min(320px, 100%);
      max-height: 420px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 8px;
      box-sizing: border-box;
      color: var(--primary-text-color);
    }
    :host([dock]) .custom-panel {
      top: auto;
      bottom: 100%;
    }
    .custom-title {
      font-weight: 500;
      font-size: 14px;
      padding: 4px 6px 8px;
    }
    .custom-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 4px;
      border-radius: 6px;
    }
    .custom-row.is-hidden .custom-name,
    .custom-row.is-hidden > ha-icon {
      opacity: 0.45;
    }
    .custom-row ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .custom-noicon {
      width: 20px;
    }
    .custom-name {
      flex: 1;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .custom-row button {
      border: none;
      background: none;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: var(--secondary-text-color);
      font-size: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .custom-row button:hover:not([disabled]) {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .custom-row button[disabled] {
      opacity: 0.3;
      cursor: default;
    }
    .custom-actions {
      display: flex;
      justify-content: space-between;
      padding: 8px 4px 2px;
    }
    .custom-actions button {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--tabdeck-accent, var(--primary-color));
      font-size: 14px;
      padding: 6px 8px;
      border-radius: 6px;
    }
    .search-empty {
      padding: 10px 12px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .group-item ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .bar-wrap.has-arrows {
      display: flex;
      align-items: center;
      position: relative;
    }
    .overflow-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
      padding: 0 8px;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
    }
    .overflow-menu {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 3;
      min-width: 160px;
      max-height: 320px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 4px;
      display: flex;
      flex-direction: column;
    }
    .overflow-item {
      text-align: start;
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 6px;
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .summary-chip {
      flex-shrink: 0;
      align-self: center;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin: 0 6px;
      padding: 3px 10px 3px 8px;
      border: none;
      border-radius: 999px;
      background: var(--tabdeck-summary-background, var(--tabdeck-alert-color, var(--error-color, #db4437)));
      color: var(--tabdeck-summary-color, #fff);
      font: inherit;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
    }
    .summary-chip ha-icon {
      --mdc-icon-size: 16px;
    }
    .ov-count,
    .ov-badge {
      display: inline-block;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      box-sizing: border-box;
      border-radius: 8px;
      background: var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)));
      color: var(--tabdeck-badge-color, var(--text-primary-color, #fff));
      font-size: 10px;
      line-height: 16px;
      text-align: center;
      vertical-align: top;
    }
    .ov-count,
    .ov-badge.alert {
      background: var(--tabdeck-alert-color, var(--error-color, #db4437));
      color: #fff;
    }
    .ov-count {
      margin-inline-start: 2px;
    }
    .ov-badge {
      float: inline-end;
      margin-inline-start: 12px;
    }
    .overflow-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .overflow-item.current {
      color: var(--tabdeck-accent, var(--primary-color));
      font-weight: 600;
    }
    .overflow-item[disabled] {
      opacity: 0.5;
      cursor: default;
    }
    .bar-wrap.has-arrows .bar {
      flex: 1;
      min-width: 0;
    }
    .scroll-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
      padding: 0 6px;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
    }
    .bar {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color);
      border-radius: var(--tabdeck-bar-radius, 0);
      position: relative;
      /* e.g. blur(12px) for a frosted-glass bar (the glass preset). */
      backdrop-filter: var(--tabdeck-bar-backdrop, none);
      -webkit-backdrop-filter: var(--tabdeck-bar-backdrop, none);
    }
    .bar.top,
    .bar.bottom {
      flex-direction: row;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .bar::-webkit-scrollbar {
      display: none;
    }
    .bar.bottom {
      border-bottom: none;
      border-top: 1px solid var(--divider-color);
    }
    .bar.left,
    .bar.right {
      flex-direction: column;
      border-bottom: none;
    }
    .bar.left {
      border-inline-end: 1px solid var(--divider-color);
    }
    .bar.right {
      border-inline-start: 1px solid var(--divider-color);
    }
    .bar.style-pill {
      gap: 6px;
      border: none;
      padding: 6px;
    }
    .bar.style-pill tabdeck-tab {
      border-radius: 999px;
    }
    .bar.style-segmented {
      gap: 0;
      border: 1px solid var(--divider-color);
      border-radius: var(--tabdeck-bar-radius, 10px);
      padding: 4px;
    }
    /* boxed: each tab is its own bordered chip; selected gets a tinted fill. */
    .bar.style-boxed {
      gap: 8px;
      border: none;
      padding: 4px 0;
    }
    .bar.style-boxed tabdeck-tab {
      border: var(--tabdeck-tab-border, 1px solid var(--divider-color));
      border-radius: 10px;
    }
    /* text: no indicator, no borders — just colour the selected label. */
    .bar.style-text {
      gap: 4px;
      border: none;
    }
    /* rail: compact icon rail — centered tabs, rounded selected highlight.
       Designed to pair with position:left/right + tab_display:icon. */
    .bar.style-rail {
      gap: 4px;
      border: none;
      padding: 4px;
      justify-content: center;
    }
    .bar.style-rail tabdeck-tab {
      justify-content: center;
      border-radius: 12px;
    }
    .bar.style-rail.left,
    .bar.style-rail.right {
      align-items: center;
    }
    .bar.style-rail .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
      border-radius: var(--tabdeck-indicator-radius, 12px);
    }
    /* glass: a frosted, translucent bar (and its menus) over whatever is
       behind the card. A bar_background becomes the tint. */
    :host([glass]) .bar {
      background: var(--tabdeck-glass-tint, color-mix(in srgb, var(--card-background-color, #fff) 55%, transparent));
      backdrop-filter: var(--tabdeck-bar-backdrop, blur(var(--tabdeck-glass-blur, 14px)) saturate(160%));
      -webkit-backdrop-filter: var(--tabdeck-bar-backdrop, blur(var(--tabdeck-glass-blur, 14px)) saturate(160%));
      border: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
      border-radius: var(--tabdeck-bar-radius, var(--tabdeck-glass-radius, 16px));
      box-shadow: var(--tabdeck-glass-shadow, 0 4px 18px rgba(0, 0, 0, 0.12));
    }
    :host([glass]) .overflow-menu,
    :host([glass]) .group-menu,
    :host([glass]) .search-panel,
    :host([glass]) .custom-panel,
    :host([glass]) .share-panel,
    :host([glass]) .tip {
      background: var(--tabdeck-glass-tint, color-mix(in srgb, var(--card-background-color, #fff) 70%, transparent));
      backdrop-filter: blur(var(--tabdeck-glass-blur, 14px)) saturate(160%);
      -webkit-backdrop-filter: blur(var(--tabdeck-glass-blur, 14px)) saturate(160%);
      border: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
      color: var(--primary-text-color);
    }
    /* A glass dock floats above the page instead of a solid strip. */
    :host([glass][dock]) {
      background: transparent;
      box-shadow: none;
      padding: 0 8px calc(8px + env(safe-area-inset-bottom, 0px));
    }
    :host([glass][dock]) .bar {
      border-top: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
    }
    :host([glass][rail-expand]) .bar-wrap {
      background: transparent;
    }
    .bar.elevated {
      box-shadow: var(--tabdeck-bar-shadow, 0 2px 6px rgba(0, 0, 0, 0.18));
      z-index: 1;
    }
    /* Alignment of the tabs within the bar. */
    .bar.align-center {
      justify-content: center;
    }
    .bar.align-end {
      justify-content: flex-end;
    }
    .bar.align-justify tabdeck-tab {
      flex: 1 1 0;
      justify-content: center;
    }
    .bar.align-justify {
      justify-content: stretch;
    }

    /* The single moving indicator. Sits behind tab content. */
    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
      z-index: 0;
      box-shadow: var(--tabdeck-indicator-shadow, none);
    }
    :host([density="compact"]) {
      --tabdeck-density-height: 36px;
      --tabdeck-density-padding: 0 10px;
      --tabdeck-density-font-size: 13px;
    }
    :host([density="comfortable"]) {
      --tabdeck-density-height: 56px;
      --tabdeck-density-padding: 0 20px;
      --tabdeck-density-font-size: 15px;
    }
    .indicator.animate {
      transition: left 200ms ease, top 200ms ease, width 200ms ease,
        height 200ms ease;
    }
    /* collapsible: while folded, the selection is only hinted. */
    :host([collapsed]) .indicator {
      opacity: 0.35 !important;
    }
    @media (prefers-reduced-motion: reduce) {
      .indicator.animate {
        transition: none;
      }
    }
    tabdeck-tab {
      position: relative;
      z-index: 1;
    }
    /* drag_reorder: the lifted tab follows the pointer; a line marks the drop. */
    tabdeck-tab.dragging {
      z-index: 3;
      cursor: grabbing;
      background: var(--card-background-color, #fff);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
    }
    tabdeck-tab[data-drop="before"] {
      box-shadow: inset 3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    tabdeck-tab[data-drop="after"] {
      box-shadow: inset -3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    :host([rtl]) tabdeck-tab[data-drop="before"] {
      box-shadow: inset -3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    :host([rtl]) tabdeck-tab[data-drop="after"] {
      box-shadow: inset 3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.left tabdeck-tab[data-drop="before"],
    .bar.right tabdeck-tab[data-drop="before"] {
      box-shadow: inset 0 3px 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.left tabdeck-tab[data-drop="after"],
    .bar.right tabdeck-tab[data-drop="after"] {
      box-shadow: inset 0 -3px 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-underline .indicator {
      background: var(--tabdeck-indicator-color, var(--tabdeck-accent, var(--primary-color)));
    }
    .bar.style-pill .indicator {
      background: var(
        --tabdeck-indicator-color,
        color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 18%, transparent)
      );
      border-radius: var(--tabdeck-indicator-radius, 999px);
    }
    .bar.style-segmented .indicator {
      background: var(--tabdeck-indicator-color, var(--card-background-color));
      border-radius: var(--tabdeck-indicator-radius, 7px);
    }
    .bar.style-boxed .indicator {
      background: var(
        --tabdeck-indicator-color,
        color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 20%, transparent)
      );
      border-radius: var(--tabdeck-indicator-radius, 10px);
    }
  `}};Ci([Ot({attribute:!1})],ua.prototype,"items",void 0),Ci([Ot({type:Number})],ua.prototype,"selected",void 0),Ci([Ot()],ua.prototype,"position",void 0),Ci([Ot()],ua.prototype,"tabStyle",void 0),Ci([Ot()],ua.prototype,"display",void 0),Ci([Ot()],ua.prototype,"align",void 0),Ci([Ot()],ua.prototype,"badgeDisplay",void 0),Ci([Ot()],ua.prototype,"scrollable",void 0),Ci([Ot({type:Boolean})],ua.prototype,"animated",void 0),Ci([Ot({type:Boolean})],ua.prototype,"accentIndicator",void 0),Ci([Ot({type:Number})],ua.prototype,"indicatorSize",void 0),Ci([Ot({type:Number})],ua.prototype,"indicatorRadius",void 0),Ci([Ot({type:Boolean})],ua.prototype,"sticky",void 0),Ci([Ot({type:Boolean})],ua.prototype,"elevation",void 0),Ci([Ot({type:Boolean})],ua.prototype,"scrollButtons",void 0),Ci([Ot({type:Boolean})],ua.prototype,"overflowMenu",void 0),Ci([Ot({type:Boolean})],ua.prototype,"fade",void 0),Ci([Ot({type:Number})],ua.prototype,"limit",void 0),Ci([Tt()],ua.prototype,"_menuOpen",void 0),Ci([Ot({type:Boolean})],ua.prototype,"hiddenAlerts",void 0),Ci([Tt()],ua.prototype,"_hiddenCount",void 0),Ci([Ot({attribute:!1})],ua.prototype,"summary",void 0),Ci([Tt()],ua.prototype,"_groupOpen",void 0),Ci([Ot({type:Boolean,reflect:!0})],ua.prototype,"collapsed",void 0),Ci([Ot()],ua.prototype,"barLabel",void 0),Ci([Ot()],ua.prototype,"language",void 0),Ci([Ot()],ua.prototype,"barBackground",void 0),Ci([Ot({attribute:!1})],ua.prototype,"rtl",void 0),Ci([Ot({type:Boolean})],ua.prototype,"liquid",void 0),Ci([Ot()],ua.prototype,"barText",void 0),Ci([Tt()],ua.prototype,"_picRgb",void 0),Ci([Ot({attribute:!1})],ua.prototype,"glass",void 0),Ci([Ot({reflect:!0})],ua.prototype,"density",void 0),Ci([Ot({type:Boolean})],ua.prototype,"railExpand",void 0),Ci([Tt()],ua.prototype,"_railOpen",void 0),Ci([Ot({type:Boolean})],ua.prototype,"customizable",void 0),Ci([Ot({attribute:!1})],ua.prototype,"customItems",void 0),Ci([Tt()],ua.prototype,"_customOpen",void 0),Ci([Ot({type:Boolean})],ua.prototype,"searchable",void 0),Ci([Ot({type:Boolean})],ua.prototype,"expandable",void 0),Ci([Ot({type:Boolean})],ua.prototype,"overviewable",void 0),Ci([Ot({type:Boolean})],ua.prototype,"entitySearchable",void 0),Ci([Ot({attribute:!1})],ua.prototype,"lastTab",void 0),Ci([Ot({type:Boolean})],ua.prototype,"shareable",void 0),Ci([Ot({attribute:!1})],ua.prototype,"shareInfo",void 0),Ci([Ot({type:Boolean})],ua.prototype,"reorderable",void 0),Ci([Tt()],ua.prototype,"_dropAt",void 0),Ci([Tt()],ua.prototype,"_searchOpen",void 0),Ci([Tt()],ua.prototype,"_query",void 0),Ci([Tt()],ua.prototype,"_active",void 0),Ci([Ot({type:Boolean,reflect:!0})],ua.prototype,"dock",void 0),Ci([Ot({type:Boolean,reflect:!0})],ua.prototype,"autohide",void 0),Ci([Ot({type:Boolean})],ua.prototype,"autohidden",void 0),Ci([Tt()],ua.prototype,"_ready",void 0),Ci([Tt()],ua.prototype,"_overflow",void 0),Ci([Tt()],ua.prototype,"_tip",void 0),ua=Ci([_i("tabdeck-tabbar")],ua);var ba={warn:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",info:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",perf:"M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z"},ma="M9.06,1.93C7.17,1.92 5.33,3.74 6.17,6H3A2,2 0 0,0 1,8V10A1,1 0 0,0 2,11H11V8H13V11H22A1,1 0 0,0 23,10V8A2,2 0 0,0 21,6H17.83C19,2.73 14.6,0.42 12.57,3.24L12,4L11.43,3.22C10.8,2.33 9.93,1.94 9.06,1.93M9,4C9.89,4 10.34,5.08 9.71,5.71C9.08,6.34 8,5.89 8,5A1,1 0 0,1 9,4M15,4C15.89,4 16.34,5.08 15.71,5.71C15.08,6.34 14,5.89 14,5A1,1 0 0,1 15,4M2,12V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V12H13V20H11V12H2Z",_a="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",ga="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",fa=new Set(["accent","color","badge_color","ring_color"]);function ya(t,e){return wa.map(o=>{return!fa.has(o.name)||t[o.name]&&("string"!=typeof(i=t[o.name])||!gi.has(i))?"separator"===o.name?{name:o.name,selector:{select:{mode:"dropdown",options:e(["","line","space"],"separator")}}}:"icon_animation"===o.name?{name:o.name,selector:{select:{mode:"dropdown",options:e(["","spin","pulse","bounce","shake","beat"],"icon_animation")}}}:o:{name:o.name,selector:{ui_color:{}}};var i})}var va=["view","url","aspect_ratio","markdown"],wa=[{name:"name",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"tooltip",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"accent",selector:{text:{}}},{name:"color",selector:{text:{}}},{name:"badge",selector:{text:{}}},{name:"badge_color",selector:{text:{}}},{name:"countdown",selector:{entity:{filter:[{domain:"timer"},{domain:"sensor",device_class:"timestamp"}]}}},{name:"background",selector:{text:{}}},{name:"page_background",selector:{text:{}}},{name:"badge_icon",selector:{icon:{}}},{name:"picture",selector:{text:{}}},{name:"icon_animation",selector:{text:{}}},{name:"font_size",selector:{text:{}}},{name:"font_weight",selector:{text:{}}},{name:"font_family",selector:{text:{}}},{name:"ring",selector:{text:{}}},{name:"ring_max",selector:{number:{min:1,step:1,mode:"box"}}},{name:"ring_color",selector:{text:{}}},{name:"ring_style",selector:{boolean:{}}},{name:"graph",selector:{entity:{}}},{name:"area",selector:{area:{}}},{name:"view",selector:{text:{}}},{name:"tab_ref",selector:{text:{}}},{name:"url",selector:{text:{}}},{name:"aspect_ratio",selector:{text:{}}},{name:"markdown",selector:{text:{multiline:!0}}},{name:"empty_message",selector:{text:{}}},{name:"zoom",selector:{number:{min:.25,max:3,step:.05,mode:"box"}}},{name:"padding",selector:{text:{}}},{name:"spacing",selector:{text:{}}},{name:"auto_refresh",selector:{number:{min:0,max:1440,step:.5,mode:"box",unit_of_measurement:"min"}}},{name:"pin",selector:{text:{}}},{name:"pin_timeout",selector:{number:{min:0,max:1440,step:1,mode:"box"}}},{name:"separator",selector:{text:{}}},{name:"disabled",selector:{boolean:{}}},{name:"fab",selector:{boolean:{}}},{name:"pip",selector:{boolean:{}}},{name:"keep_awake",selector:{boolean:{}}},{name:"card_size",selector:{number:{min:1,max:20,step:1,mode:"box"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}},{name:"badge_action",selector:{ui_action:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"enter_action",selector:{ui_action:{}}},{name:"leave_action",selector:{ui_action:{}}}],ka=[{name:"type",selector:{select:{mode:"dropdown",custom_value:!0,options:["entities","tile","button","light","thermostat","humidifier","weather-forecast","markdown","picture","picture-entity","picture-glance","glance","gauge","sensor","history-graph","statistics-graph","media-control","map","area","alarm-panel","calendar","todo-list","iframe","entity","conditional","vertical-stack","horizontal-stack","grid","custom:mushroom-template-card","custom:mushroom-entity-card","custom:button-card","custom:mini-graph-card","custom:apexcharts-card","custom:auto-entities","custom:bubble-card","custom:layout-card"].map(t=>({value:t,label:t}))}}}],xa=[{key:"visibility"},{key:"alert"},{key:"default_if"}];function $a(t){return t("hui-card-element-editor")?"hui-card-element-editor":t("ha-yaml-editor")?"ha-yaml-editor":"textarea-json"}var Aa=class extends At{constructor(...t){super(...t),this._language=new b(this),this._editingTab=null,this._cardError=null,this._expanded=new Set,this._importOpen=!1,this._styleOpen=!1,this._styleErrors=[],this._importError="",this._starterOpen=!1,this._starterKind="rooms",this._convertOpen=!1,this._exportOpen=!1,this._convertError="",this._note=function(t,e,o=So){return o.filter(o=>zo(o,t)<=0&&(!e||zo(o,e)>0)).sort((t,e)=>zo(e,t))[0]}("1.6.0",function(){try{return localStorage.getItem(Co)}catch{return null}}()),this._roomsOpen=!1,this._roomPick=new Set,this._instantBusy=!1,this._instantError="",this._selecting=!1,this._picked=new Set,this._bulk={},this._flashTab=-1,this._previewSelected=0,this._open=function(){try{const t=JSON.parse(localStorage.getItem(na)??"null");if(t&&"object"==typeof t&&!Array.isArray(t)){const e={};for(const[o,i]of Object.entries(t))"boolean"==typeof i&&(e[o]=i);return{[ea]:!0,...e}}}catch{}return{[ea]:!0}}(),this._query="",this._searchClosed=new Set,this._statusOpen=!1,this._haPreview=!1,this._flashField="",this._status="",this._checkSig="",this._resolver=t=>void 0===this._templates?.result(t)?void 0:this._templates.boolean(t),this._history=new Ii,this._lastOut="",this._onKeydown=t=>{if(!t.ctrlKey&&!t.metaKey||t.altKey)return;const e=t.key.toLowerCase(),o="y"===e||"z"===e&&t.shiftKey;if("z"!==e&&"y"!==e)return;const i=t.composedPath()[0];i&&("input"===i.localName||"textarea"===i.localName||i.isContentEditable||i.closest?.(".cm-editor, ha-code-editor"))||(o?this._history.canRedo:this._history.canUndo)&&(t.preventDefault(),t.stopPropagation(),o?this.redo():this.undo())},this._onEditTab=t=>{const e=t.detail,o=this._config?.tabs;if(!(o&&e&&Number.isInteger(e.index)&&Array.isArray(e.names)))return;if(e.names.length!==o.length||e.index<0||e.index>=o.length)return;if(o.some((t,o)=>"string"==typeof t.name&&!po(t.name)&&t.name!==e.names[o]))return;const i=this._dialog();i&&!t.composedPath().includes(i)||this._focusTab(e.index)},this._opts=(t,e)=>t.map(t=>{const o=`editor.opt.${e}.${t}`;return{value:t,label:e&&h(o)?this._t(o):t}}),this._computeGlobalLabel=t=>this._t(`editor.global.${t.name}`),this._computeTabLabel=t=>this._t(`editor.tab.${t.name}`),this._computeGlobalHelper=t=>this._hint(t.name)||void 0,this._checkHaPreview=()=>{let t=null;for(let o=this.getRootNode();o&&!t&&(t=o.querySelector?.(".element-preview")??null,o.host);o=o.host?.getRootNode?.());let e=!1;if(t){const o=t.getBoundingClientRect(),i=this.getBoundingClientRect();e=o.width>0&&i.width>0&&(o.left>=i.right-2||o.right<=i.left+2)&&o.top<i.bottom}e!==this._haPreview&&(this._haPreview=e)}}set hass(t){const e=!this._hass;this._hass=t,this._syncTemplates();const o=this._checkSignature();(e||o!==this._checkSig)&&(this._checkSig=o,this.requestUpdate())}get hass(){return this._hass}_t(t,e){return l(d(this._hass),t,e)}_conditionTemplates(){const t=[],e=o=>{for(const i of Array.isArray(o)?o:[])"template"===i?.condition&&i.value_template&&t.push(i.value_template),Array.isArray(i?.conditions)&&e(i.conditions)};for(const o of this._config?.tabs??[])e(o.visibility),e(o.alert),e(o.default_if);return t}_syncTemplates(){const t=this._conditionTemplates();var e;0!==t.length&&this._hass?.connection?.subscribeMessage?(this._templates||(this._templates=new uo((e=()=>this._hass,(t,o,i)=>{const a=e()?.connection;if(!a?.subscribeMessage)return i(),()=>{};let r,n=!1;return Promise.resolve(a.subscribeMessage(t=>{t&&void 0!==t.error?i():o(t?.result)},{type:"render_template",template:t,report_errors:!0})).then(t=>{r=t,n&&t?.()}).catch(()=>i()),()=>{n=!0,r?.()}})),this._templates.addEventListener("change",()=>this.requestUpdate())),this._templates.track(t)):0===t.length&&(this._templates?.destroy(),this._templates=void 0)}_explain(t){return ko(t,this._hass??{states:{}},this._resolver)}_checkSignature(){return this._hass?d(this._hass)+"#"+(this._config?.tabs??[]).map(t=>xa.map(e=>function(t){const e=t=>`${t.met?1:0}${t.current??""}${t.pending?"p":""}(${(t.children??[]).map(e).join(",")})`;return t.items.map(e).join("|")}(this._explain(t[e.key]))).join("/")).join(";"):""}connectedCallback(){super.connectedCallback(),window.addEventListener("tabdeck-edit-tab",this._onEditTab),this.addEventListener("keydown",this._onKeydown),window.addEventListener("resize",this._checkHaPreview),"undefined"!=typeof ResizeObserver&&(this._resize=new ResizeObserver(()=>this._checkHaPreview()),this._resize.observe(this))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("tabdeck-edit-tab",this._onEditTab),this.removeEventListener("keydown",this._onKeydown),window.removeEventListener("resize",this._checkHaPreview),this._resize?.disconnect(),this._resize=void 0,this._templates?.destroy(),this._templates=void 0}setConfig(t){let e="";try{e=JSON.stringify(t)}catch{}const o=this._config;this._raw=t,this._config=co(t,{expand:!1}),o&&e!==this._lastOut&&(this._history.record(o),this._undoNote=qi(o,this._config)),this._lastOut=e,this._syncTemplates()}undo(){this._step(this._history.undo(this._config),!0)}redo(){this._step(this._history.redo(this._config),!1)}_step(t,e){if(!t||!this._config)return;const o=e?qi(t,this._config):qi(this._config,t),i=e?"editor.undo.undone":"editor.undo.redone";this._emit(t,!1),null===this._editingTab||t.tabs[this._editingTab]||(this._editingTab=null),this._expanded=new Set([...this._expanded].filter(e=>e<t.tabs.length)),this._picked=new Set([...this._picked].filter(e=>e<t.tabs.length)),this._undoNote=void 0,this._flash(this._t(i,{change:this._t(o.key,o.vars)}))}_renderWhatsNew(){const t=this._note;return t?st`<div class="whats-new" role="status">
      <ha-svg-icon class="whats-new-icon" .path=${ma}></ha-svg-icon>
      <div class="whats-new-text">
        <b>${this._t("whatsnew.title",{version:t})}</b>
        <span>${this._t((t=>`whatsnew.${t.replace(/\./g,"_")}`)(t))}</span>
        <a href="https://github.com/tempus2016/tabdeck-card/releases/tag/v${t}" target="_blank" rel="noopener noreferrer"
          >${this._t("whatsnew.more")}</a
        >
      </div>
      <ha-icon-button
        class="whats-new-close"
        .label=${this._t("whatsnew.dismiss")}
        .path=${_a}
        @click=${()=>{!function(t){try{localStorage.setItem(Co,t)}catch{}}(t),this._note=void 0}}
      ></ha-icon-button>
    </div>`:ct}_summaryText(t){const e=c(d(this._hass)),o={...t.vars??{}};if(t.names)try{o.names=new Intl.ListFormat(e,{type:"conjunction"}).format(t.names)}catch{o.names=t.names.join(", ")}void 0!==t.n&&(o.n=t.n);const i="string"==typeof o.entity?this._hass?.states?.[o.entity]:void 0;i?.attributes?.friendly_name&&(o.entity=i.attributes.friendly_name);const a=l(e,t.key,o);if(!a.includes("|"))return a;const r=Object.fromEntries(a.split("|").map(t=>[t.slice(0,t.indexOf(":")),t.slice(t.indexOf(":")+1)]));let n="other";try{n=new Intl.PluralRules(e).select(t.n??0)}catch{}return r[n]??r.other??a}_renderSummary(){const t=function(t){if(!xo(t))return[];const e=Array.isArray(t.tabs)?t.tabs.filter(xo):[],o=[],i=xo(t.tab_defaults)?t.tab_defaults:{},a=(t,e)=>{const o=t[e]??i[e];return Array.isArray(o)?o.length>0:null!=o&&""!==o&&!1!==o},r=t=>e.map((e,o)=>t(e)?$o(e,o):"").filter(Boolean),n=(t,e)=>o.push({key:t,names:Ao(e),n:e.length});if(o.push({key:"summary.tabs",n:e.length,names:Ao(e.map($o))}),t.auto_tabs){const e=t.auto_tabs.source;o.push(e?{key:"summary.auto_source",vars:{source:String(e)}}:{key:"summary.auto_template"})}const s=t.default_tab,d="number"==typeof s?e[s]:e.find((t,e)=>t.name===s||String(e)===String(s));d&&e.indexOf(d)>0&&o.push({key:"summary.opens_on",vars:{tab:$o(d,e.indexOf(d))}});const c=r(t=>a(t,"default_if"));c.length&&n("summary.default_if",c),"browser"===t.remember?o.push({key:"summary.remember_browser"}):"url"===t.remember?o.push({key:"summary.remember_url"}):"entity"===t.remember&&t.remember_entity&&o.push({key:"summary.remember_entity",vars:{entity:t.remember_entity}});const l=r(t=>a(t,"visibility"));l.length&&n("summary.visibility",l);const h=r(t=>a(t,"alert"));h.length&&n("summary.alerts",h);const p=r(t=>a(t,"badge")||a(t,"badge_icon")||a(t,"ring"));p.length&&n("summary.badges",p);const u=r(t=>a(t,"pin"));u.length&&n("summary.pin",u);const b=r(t=>{return e=t,!!e?.tap_action;var e});if(b.length&&n("summary.actions",b),t.swipe&&t.swipe_mouse?o.push({key:"summary.swipe_mouse"}):t.swipe&&o.push({key:"summary.swipe"}),t.auto_rotate?.interval&&o.push({key:"summary.rotate",n:t.auto_rotate.interval}),t.idle_return){const i=d??e[0];o.push({key:"summary.idle_return",n:t.idle_return,vars:{tab:i?$o(i,e.indexOf(i)):"#1"}})}t.remote_entity&&o.push({key:"summary.remote_entity",vars:{entity:t.remote_entity}}),t.remote_event&&o.push({key:"summary.remote_event"}),t.follow_room?.entity&&o.push({key:"summary.follow_room",vars:{entity:t.follow_room.entity}});for(const m of Array.isArray(t.takeover)?t.takeover:[])m?.entity&&m?.tab&&o.push({key:"summary.takeover",vars:{tab:String(m.tab),entity:m.entity},n:m.duration??30});if(t.quiet_hours){const e=t.quiet_hours;e.from&&e.to?o.push({key:"summary.quiet_time",vars:{from:e.from,to:e.to}}):e.entity&&o.push({key:"summary.quiet_entity",vars:{entity:e.entity}})}return t.lazy&&o.push({key:"summary.lazy"}),o}(this._config);return t.length?st`<div class="summary-box">
      <div class="status-head"><ha-svg-icon .path=${"M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z"}></ha-svg-icon> ${this._t("summary.title")}</div>
      <p>${t.map(t=>this._summaryText(t)).join(" ")}</p>
    </div>`:ct}_renderLint(t){return t.length?st`<div class="lint">
      <div class="status-head">
        <ha-svg-icon .path=${"M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"}></ha-svg-icon>
        ${p(d(this._hass),"lint.title",t.length)}
      </div>
      <ul>
        ${t.map(t=>st`<li class="lint-note ${t.level}">
            <ha-svg-icon .path=${ba[t.level]}></ha-svg-icon>
            <span>${this._t(`lint.${t.rule}`,t.vars)}</span>
            ${ca(t)?st`<button class="lint-go" @click=${()=>this._goToLint(t)}>${this._t("editor.status.show")}</button>`:ct}
          </li>`)}
      </ul>
    </div>`:ct}_renderHistory(){if(!this._history.canUndo&&!this._history.canRedo)return ct;const t=this._undoNote;return st`<div class="history">
      ${t&&this._history.canUndo?st`<span class="history-note">${this._t(t.key,t.vars)}</span>`:ct}
      <ha-icon-button
        class="undo"
        .label=${this._t("editor.undo.undo")}
        title=${this._t("editor.undo.undo")+" (Ctrl+Z)"}
        .path=${"M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"}
        .disabled=${!this._history.canUndo}
        @click=${()=>this.undo()}
      ></ha-icon-button>
      <ha-icon-button
        class="redo"
        .label=${this._t("editor.undo.redo")}
        title=${this._t("editor.undo.redo")+" (Ctrl+Shift+Z)"}
        .path=${"M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z"}
        .disabled=${!this._history.canRedo}
        @click=${()=>this.redo()}
      ></ha-icon-button>
    </div>`}_emit(t,e=!0){e&&this._config&&t!==this._config&&(this._history.record(this._config),this._undoNote=qi(this._config,t)),this._config=t,this._syncTemplates();const o=this._forOutput(t);this._raw=o;try{this._lastOut=JSON.stringify(o)}catch{this._lastOut=""}((t,e,o,i)=>{i=i||{},o=null==o?{}:o;const a=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});a.detail=o,t.dispatchEvent(a)})(this,"config-changed",{config:o}),this.requestUpdate()}_forOutput(t){t.tabs.some(t=>t.group||ne(t))&&(t={...t,tabs:t.tabs.map(t=>{if(ne(t)){const{card:e,...o}=t;return o}if(!t.group)return t;const{group:e,card:o,...i}=t;return i})});const e=t.auto_tabs;if(!e?.source)return t;const{template:o,...i}=e,a={...i};(function(t){return!!t&&"object"==typeof t&&xe.has(t)})(a.tab_template)&&delete a.tab_template;for(const r of["domains","exclude","content"])void 0===a[r]&&delete a[r];return{...t,auto_tabs:a}}_patch(t){this._config&&this._emit({...this._config,...t})}_patchTab(t,e){if(!this._config)return;const o=this._config.tabs.map((o,i)=>i===t?{...o,...e}:o);this._emit({...this._config,tabs:o})}_addTab(){if(!this._config)return;const t=[...this._config.tabs,{name:this._t("editor.tab_n",{n:this._config.tabs.length+1}),card:{}}],e=this._config.tabs.length;this._expanded=new Set(this._expanded).add(e),this._emit({...this._config,tabs:t})}_expandAll(){this._config&&(this._expanded=new Set(this._config.tabs.map((t,e)=>e)))}_collapseAll(){this._expanded=new Set}_deleteTab(t){if(!this._config)return;const e=this._config.tabs.filter((e,o)=>o!==t);this._expanded=new Set,this._picked=new Set,this._emit({...this._config,tabs:e})}_duplicateTab(t){if(!this._config)return;const e=this._config.tabs[t];if(!e)return;const o=JSON.parse(JSON.stringify(e));o.name=this._t("editor.copy_name",{name:e.name??this._t("editor.tab_n",{n:t+1})});const i=this._config.tabs.slice();i.splice(t+1,0,o),this._expanded=new Set,this._picked=new Set,this._emit({...this._config,tabs:i})}async _toggleRooms(){if(this._roomsOpen=!this._roomsOpen,this._rooms=void 0,this._instantDone=void 0,this._instantError="",!this._roomsOpen)return;let t=[];try{t=function(t,e={}){const o=new Map;for(const a of t.devices)a?.id&&a.area_id&&o.set(a.id,a.area_id);const i=new Map;for(const a of t.entities){if(!a?.entity_id||a.hidden||a.hidden_by||a.disabled_by||a.entity_category)continue;if(!(a.entity_id in e))continue;const t=a.area_id??(a.device_id?o.get(a.device_id):void 0);if(!t)continue;const r=i.get(t)??[];r.push(a.entity_id),i.set(t,r)}return t.areas.filter(t=>t?.area_id).map(t=>({id:String(t.area_id),name:String(t.name??t.area_id),icon:t.icon||void 0,entities:(i.get(t.area_id)??[]).sort()})).sort((t,e)=>t.name.localeCompare(e.name))}(await async function(t){if(t?.areas&&t?.entities)return{areas:Object.values(t.areas),devices:Object.values(t.devices??{}),entities:Object.values(t.entities)};const e=e=>t.callWS({type:e}).catch(()=>[]),[o,i,a]=await Promise.all([e("config/area_registry/list"),e("config/device_registry/list"),e("config/entity_registry/list")]);return{areas:o??[],devices:i??[],entities:a??[]}}(this._hass),this._hass?.states??{})}catch{t=[]}const e=new Set((this._config?.tabs??[]).map(t=>t.area).filter(Boolean));this._roomPick=new Set(t.filter(t=>t.entities.length&&!e.has(t.id)).map(t=>t.id)),this._rooms=t}_toggleRoom(t){const e=new Set(this._roomPick);e.has(t)?e.delete(t):e.add(t),this._roomPick=e}_createRooms(){if(!this._config||!this._rooms)return;const t=Ui(this._rooms.filter(t=>this._roomPick.has(t.id))).map(Qe);t.length&&(this._roomsOpen=!1,this._flash(this._t("rooms.done",{count:t.length})),this._emit({...this._config,tabs:[...this._config.tabs,...t]}))}async _createDashboard(){if(!this._rooms||this._instantBusy||!this._hass?.callWS)return;const t=Ui(this._rooms.filter(t=>this._roomPick.has(t.id))).map(Qe);if(t.length){this._instantBusy=!0,this._instantDone=void 0,this._instantError="";try{this._instantDone=await async function(t,e,o){let i;try{i=await t({type:"lovelace/dashboards/create",url_path:Wi((await t({type:"lovelace/dashboards/list"})??[]).map(t=>t?.url_path).filter(Boolean)),title:o,icon:"mdi:tab",mode:"storage",show_in_sidebar:!0,require_admin:!1})}catch(Ji){throw new Fi("unauthorized"===Ji?.code?"admin":"failed",Zi(Ji))}const a=i?.url_path;if(!a)throw new Fi("failed","no url_path");let r;try{r=await t({type:"lovelace/config",url_path:a,force:!0})}catch(Ji){if("config_not_found"!==Ji?.code)throw new Fi("failed",Zi(Ji))}if(r)throw new Fi("failed",`${a} already has a config`);try{await t({type:"lovelace/config/save",url_path:a,config:Ki(e,o)})}catch(Ji){throw i?.id&&await t({type:"lovelace/dashboards/delete",dashboard_id:i.id}).catch(()=>{}),new Fi("failed",Zi(Ji))}return{url_path:a,title:o}}(t=>this._hass.callWS(t),t,this._t("instant.title"))}catch(Ji){this._instantError="admin"===Ji?.reason?"instant.error.admin":"instant.error.failed"}finally{this._instantBusy=!1}}}_renderRooms(){const t=this._rooms,e=new Set((this._config?.tabs??[]).map(t=>t.area).filter(Boolean)),o=d(this._hass),i=this._roomPick.size;return st`<div class="import-panel rooms-panel">
      <div class="import-hint">${this._t("rooms.hint")}</div>
      ${t?0===t.length?st`<div class="import-error" role="alert">${this._t("rooms.none")}</div>`:st`<ul class="room-list">
              ${t.map(t=>st`<li>
                  <label class="room ${this._roomPick.has(t.id)?"on":""}">
                    <input
                      type="checkbox"
                      class="room-pick"
                      .checked=${this._roomPick.has(t.id)}
                      @change=${()=>this._toggleRoom(t.id)}
                    />
                    <ha-icon .icon=${t.icon??"mdi:texture-box"}></ha-icon>
                    <span class="room-name">${t.name}</span>
                    <span class="room-count">
                      ${p(o,"rooms.entities",t.entities.length)}${e.has(t.id)?` · ${this._t("rooms.has_tab")}`:""}
                    </span>
                  </label>
                </li>`)}
            </ul>`:st`<div class="import-hint">…</div>`}
      <div class="import-actions">
        <ha-button class="rooms-create" .disabled=${0===i} @click=${this._createRooms}
          >${p(o,"rooms.create",i)}</ha-button
        >
        <ha-button
          class="rooms-dashboard"
          .disabled=${0===i||this._instantBusy||!this._hass?.callWS}
          @click=${this._createDashboard}
          >${this._t(this._instantBusy?"instant.working":"instant.button")}</ha-button
        >
        <ha-button class="rooms-cancel" @click=${this._toggleRooms}>${this._t("editor.cancel")}</ha-button>
      </div>
      ${this._instantDone?st`<div class="import-hint instant-done" role="status">
            ${this._t("instant.done",{title:this._instantDone.title})}
            <a href="/${this._instantDone.url_path}/rooms" target="_blank" rel="noopener">${this._t("instant.open")}</a>
          </div>`:ct}
      ${this._instantError?st`<div class="import-error" role="alert">${this._t(this._instantError)}</div>`:ct}
    </div>`}_toggleSelecting(){this._selecting=!this._selecting,this._picked=new Set,this._bulk={}}_togglePicked(t){const e=new Set(this._picked);e.has(t)?e.delete(t):e.add(t),this._picked=e}_pickAll(t){this._picked=t?new Set(this._config?.tabs.map((t,e)=>e)):new Set}_applyBulk(){if(!this._config||0===this._picked.size)return;const t=Object.fromEntries(Object.entries(this._bulk).filter(([t,e])=>["icon","accent","color"].includes(t)&&"string"==typeof e&&e));if(0===Object.keys(t).length)return;const e=this._picked.size,o=this._config.tabs.map((e,o)=>this._picked.has(o)?{...e,...t}:e);this._flash(this._t("editor.bulk.applied",{count:e})),this._emit({...this._config,tabs:o})}_renderBulk(){const t=this._picked.size;return st`<div class="import-panel bulk-panel">
      <div class="bulk-head">
        <span class="bulk-count">${this._t("editor.bulk.count",{n:t})}</span>
        <button class="bulk-all" @click=${()=>this._pickAll(!0)}>${this._t("editor.bulk.all")}</button>
        <button class="bulk-none" @click=${()=>this._pickAll(!1)}>${this._t("editor.bulk.none")}</button>
      </div>
      <div class="import-hint">${this._t("editor.bulk.hint")}</div>
      <ha-form
        class="bulk-form"
        .hass=${this.hass}
        .data=${this._bulk}
        .schema=${[{name:"icon",selector:{icon:{}}},{name:"accent",selector:{ui_color:{}}},{name:"color",selector:{ui_color:{}}}]}
        .computeLabel=${this._computeTabLabel}
        @value-changed=${t=>{t.stopPropagation(),this._bulk={...t.detail?.value??{}},this.requestUpdate()}}
      ></ha-form>
      <div class="import-actions">
        <ha-button class="bulk-apply" .disabled=${0===t||!Object.values(this._bulk).some(t=>t)} @click=${this._applyBulk}
          >${this._t("editor.bulk.apply")}</ha-button
        >
        <ha-button class="bulk-done" @click=${this._toggleSelecting}>${this._t("editor.bulk.done")}</ha-button>
      </div>
    </div>`}_dialog(){let t=this.parentNode??this.host;for(;t;){if(t instanceof Element&&t.localName.includes("dialog"))return t;t=t.parentNode??t.host}}async _focusTab(t){this._config?.tabs[t]&&(this._editingTab=null,this._query="",this._searchClosed=new Set,this._open.tabs||(this._open={...this._open,[ea]:!0},sa(this._open)),this._expanded=new Set([t]),this._flashTab=t,this._previewSelected=t,await this.updateComplete,await new Promise(t=>requestAnimationFrame(()=>t(null))),this.renderRoot.querySelectorAll(".tabs > .tab")[t]?.scrollIntoView?.({block:"start",behavior:Ai()?"auto":"smooth"}),this._flashTimer&&clearTimeout(this._flashTimer),this._flashTimer=setTimeout(()=>this._flashTab=-1,1600))}_flash(t){this._status=t,this._statusTimer&&clearTimeout(this._statusTimer),this._statusTimer=setTimeout(()=>this._status="",2500)}async _copyTab(t){const e=this._config?.tabs[t];if(!e)return;const o=await this._copyText(JSON.stringify(e,null,2)),i=e.name||this._t("editor.tab_n",{n:t+1});this._flash(o?this._t("editor.copied",{name:i}):this._t("editor.clipboard_error"))}async _copyText(t){let e=!1;try{navigator.clipboard?.writeText&&(await navigator.clipboard.writeText(t),e=!0)}catch{e=!1}if(!e){const o=document.createElement("textarea");o.value=t,o.style.cssText="position:fixed;opacity:0",this.renderRoot.appendChild(o),o.select();try{e=document.execCommand("copy")}catch{e=!1}o.remove()}return e}_toggleExport(){this._exportOpen=!this._exportOpen}_exportResult(){return Hi(co(this._config),this._hass,this._config?.aria_label||"Tabdeck")}async _copyExport(){const t=await this._copyText(Ri(this._exportResult().view));this._flash(t?this._t("export.copied"):this._t("editor.clipboard_error"))}_renderExport(){const t=this._exportResult();return st`
      <div class="import-panel export-panel">
        <div class="import-hint">${this._t("export.hint")}</div>
        <textarea class="import-json export-yaml" rows="12" readonly .value=${Ri(t.view)}></textarea>
        ${t.skipped.length?st`<div class="convert-note">ℹ️ ${this._t("export.skipped",{names:t.skipped.join(", ")})}</div>`:ct}
        ${t.notes.map(t=>st`<div class="convert-note">ℹ️ ${this._t(t)}</div>`)}
        <div class="import-actions">
          <ha-button class="export-copy" @click=${this._copyExport}>${this._t("export.copy")}</ha-button>
          <ha-button class="export-close" @click=${this._toggleExport}>${this._t("convert.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleConvert(){this._convertOpen=!this._convertOpen,this._convertResult=void 0,this._convertError=""}_onConvertInput(t){if(this._convertResult=void 0,this._convertError="",null!=t&&""!==t)try{const e=mi(t,this._hass);0===e.tabs.length?this._convertError="convert.error.no_tabs":this._convertResult=e}catch(e){const t=String(e?.message??"");this._convertError=t.startsWith("convert.")?t:"convert.error.not_card"}}_applyConvert(t){const e=this._convertResult;if(!this._config||!e)return;const o=co(function(t,e,o){if("append"===o)return{...t,tabs:[...t.tabs??[],...e.tabs]};const i={...t,...e.options,tabs:e.tabs};return e.options.auto_tabs||delete i.auto_tabs,i}(this._config,e,t),{expand:!1});this._expanded=new Set,this._picked=new Set,this._convertOpen=!1,this._convertResult=void 0,this._flash(this._t("convert.done",{count:e.tabs.length,source:this._t(`convert.source.${e.source}`)})),this._emit(o)}_renderConvert(){const t=this._convertResult;return st`
      <div class="import-panel convert-panel">
        <div class="import-hint">${this._t("convert.hint")}</div>
        ${customElements.get("ha-yaml-editor")?st`<ha-yaml-editor class="convert-yaml" @value-changed=${t=>{t.stopPropagation();const e=t.detail;!1!==e?.isValid&&this._onConvertInput(e?.value)}}></ha-yaml-editor>`:st`<textarea
              class="import-json convert-json"
              rows="8"
              @input=${t=>{try{this._onConvertInput(JSON.parse(t.target.value))}catch{this._convertResult=void 0}}}
            ></textarea>`}
        ${this._convertError?st`<div class="import-error" role="alert">${this._t(this._convertError)}</div>`:ct}
        ${t?st`<div class="convert-summary" role="status">
              ${this._t("convert.detected",{source:this._t(`convert.source.${t.source}`),count:t.tabs.length})}
              <ul class="convert-tabs">
                ${t.tabs.map(t=>st`<li>${t.icon?st`<ha-icon .icon=${t.icon}></ha-icon>`:ct}${t.name}</li>`)}
              </ul>
              ${t.notes.map(t=>st`<div class="convert-note">ℹ️ ${this._t(t)}</div>`)}
            </div>`:ct}
        <div class="import-actions">
          <ha-button class="convert-replace" .disabled=${!t} @click=${()=>this._applyConvert("replace")}
            >${this._t("convert.replace")}</ha-button
          >
          <ha-button class="convert-append" .disabled=${!t} @click=${()=>this._applyConvert("append")}
            >${this._t("convert.append")}</ha-button
          >
          <ha-button class="convert-cancel" @click=${this._toggleConvert}>${this._t("convert.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleStarter(){this._starterOpen=!this._starterOpen}_applyStarter(t){if(!this._config)return;const e=this._starterKind,o=this._t(`starter.kind.${e}`),i=Fo(e,this._hass,t=>this._t(t));if(0===i.count)return void this._flash(this._t("starter.none",{name:o}));const a=co(function(t,e,o){const i="replace"===o?e.tabs:[...t.tabs??[],...e.tabs],a={...t,...e.options??{},tabs:i};return e.auto_tabs?a.auto_tabs=e.auto_tabs:"replace"===o&&delete a.auto_tabs,a}(this._config,i,t),{expand:!1});this._expanded=new Set,this._picked=new Set,this._starterOpen=!1,this._flash(this._t("starter.done",{name:o})),this._emit(a)}_renderStarter(){const t=[{name:"kind",selector:{select:{mode:"dropdown",options:Bo.map(t=>({value:t,label:this._t(`starter.kind.${t}`)}))}}}];return st`
      <div class="import-panel starter-panel">
        <div class="import-hint">${this._t("starter.hint")}</div>
        <ha-form
          class="starter-form"
          .hass=${this.hass}
          .data=${{kind:this._starterKind}}
          .schema=${t}
          .computeLabel=${()=>this._t("starter.pick")}
          @value-changed=${t=>{t.stopPropagation();const e=t.detail?.value?.kind;Bo.includes(e)&&(this._starterKind=e)}}
        ></ha-form>
        <div class="import-actions">
          <ha-button class="starter-replace" @click=${()=>this._applyStarter("replace")}
            >${this._t("starter.replace")}</ha-button
          >
          <ha-button class="starter-append" @click=${()=>this._applyStarter("append")}
            >${this._t("starter.append")}</ha-button
          >
          <ha-button class="starter-cancel" @click=${this._toggleStarter}>${this._t("starter.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleStyleImport(){this._styleOpen=!this._styleOpen,this._styleErrors=[],this._styleValue=void 0}_applyStyleImport(){if(!this._config)return;const t=function(t){if(!Qi(t))return{config:{},errors:[{key:"style_import.error.not_object"}]};const e="string"==typeof t.name?t.name:void 0,o=Qi(t.config)?t.config:t,i={},a=[],r=t=>a.push({key:"style_import.error.bad_value",vars:{key:t}});for(const[n,s]of Object.entries(o)){if(o===t&&["name","author","description","$schema"].includes(n))continue;const e=Gi[n];if(e)if("styles"in e){if(!Qi(s)){r(n);continue}const t={};for(const[e,o]of Object.entries(s))/^--tabdeck-[a-z0-9-]+$/.test(e)&&Yi(o)?t[e]=o:r(`styles.${e}`);i.styles=t}else Xi(e,s)?i[n]=s:r(n);else a.push({key:"style_import.error.unknown",vars:{key:n}})}return a.length||Object.keys(i).length||a.push({key:"style_import.error.empty"}),{name:e,config:i,errors:a}}(this._styleValue);t.errors.length?this._styleErrors=t.errors:(this._styleOpen=!1,this._styleErrors=[],this._flash(t.name?this._t("style_import.done",{name:t.name}):this._t("style_import.done_unnamed")),this._emit(function(t,e){const o={...t,...e};return e.styles&&(o.styles={...t.styles??{},...e.styles}),o}(this._config,t.config)))}_renderStyleImport(){return st`
      <div class="import-panel style-import-panel">
        <div class="import-hint">
          ${this._t("style_import.hint")}
          <a href="https://tempus2016.github.io/tabdeck-card/demo/presets.html" target="_blank" rel="noopener"
            >${this._t("style_import.gallery")}</a
          >
        </div>
        ${customElements.get("ha-yaml-editor")?st`<ha-yaml-editor @value-changed=${t=>{t.stopPropagation();const e=t.detail;this._styleValue=!1===e?.isValid?void 0:e?.value,this._styleErrors=[]}}></ha-yaml-editor>`:st`<textarea
              class="import-json"
              rows="8"
              placeholder='{"config": {"style": "pill", "styles": {"--tabdeck-accent": "teal"}}}'
              @input=${t=>{try{this._styleValue=JSON.parse(t.target.value)}catch{this._styleValue=void 0}this._styleErrors=[]}}
            ></textarea>`}
        ${this._styleErrors.length?st`<div class="import-error" role="alert">
              ${this._t("style_import.error.title")}
              <ul>
                ${this._styleErrors.map(t=>st`<li>${this._t(t.key,t.vars)}</li>`)}
              </ul>
            </div>`:ct}
        <div class="import-actions">
          <ha-button class="style-import-apply" @click=${this._applyStyleImport}>${this._t("style_import.apply")}</ha-button>
          <ha-button class="style-import-cancel" @click=${this._toggleStyleImport}>${this._t("editor.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleImport(){this._importOpen=!this._importOpen,this._importError="",this._importValue=void 0}_applyImport(){if(!this._config)return;const t=this._importValue,e=Array.isArray(t)?t:[t];if(0===e.length||!e.every(t=>t&&"object"==typeof t&&!Array.isArray(t)&&(t.card||t.cards||t.tap_action)))return void(this._importError=this._t("editor.import_error"));const o=this._config.tabs.length,i=[...this._config.tabs,...e.map(Qe)],a=new Set(this._expanded);for(let r=o;r<i.length;r++)a.add(r);this._expanded=a,this._importOpen=!1,this._importValue=void 0,this._flash(this._t(e.length>1?"editor.imported_many":"editor.imported_one",{count:e.length})),this._emit({...this._config,tabs:i})}_renderImport(){return st`
      <div class="import-panel">
        <div class="import-hint">${this._t("editor.import_hint")}</div>
        ${customElements.get("ha-yaml-editor")?st`<ha-yaml-editor @value-changed=${t=>{t.stopPropagation();const e=t.detail;this._importValue=!1===e?.isValid?void 0:e?.value,this._importError=""}}></ha-yaml-editor>`:st`<textarea
              class="import-json"
              rows="8"
              placeholder='{"name": "Lights", "card": {"type": "light", "entity": "light.kitchen"}}'
              @input=${t=>{try{this._importValue=JSON.parse(t.target.value),this._importError=""}catch{this._importValue=void 0}}}
            ></textarea>`}
        ${this._importError?st`<div class="import-error" role="alert">${this._importError}</div>`:ct}
        <div class="import-actions">
          <ha-button class="import-apply" @click=${this._applyImport}>${this._t("editor.add")}</ha-button>
          <ha-button class="import-cancel" @click=${this._toggleImport}>${this._t("editor.cancel")}</ha-button>
        </div>
      </div>
    `}_toggleExpanded(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_onHeaderKeydown(t,e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleExpanded(t))}_editCardJson(t,e){let o;try{o=JSON.parse(e)}catch{return void(this._cardError=t)}this._cardError=null,this._patchTab(t,{card:o})}_onItemMoved(t){if(!this._config)return;const{oldIndex:e,newIndex:o}=t.detail??{};if(null==e||null==o||e===o||e<0||o<0||e>=this._config.tabs.length||o>=this._config.tabs.length)return;const i=this._config.tabs.slice(),[a]=i.splice(e,1);i.splice(o,0,a),this._expanded=new Set,this._picked=new Set,this._emit({...this._config,tabs:i})}_warnings(){const t=this._config;if(!t)return[];const e=[],o=t.tabs.map(t=>t.name??"").filter(t=>t),i=o.filter((t,e)=>o.indexOf(t)!==e);return i.length>0&&e.push(this._t("editor.warn_duplicates",{names:[...new Set(i)].join(", ")})),e}_move(t,e){if(!this._config)return;const o=t+e;if(o<0||o>=this._config.tabs.length)return;const i=this._config.tabs.slice();[i[t],i[o]]=[i[o],i[t]],this._expanded=new Set,this._picked=new Set,this._emit({...this._config,tabs:i})}_openCard(t){this._cardError=null,this._editingTab=t}_closeCard(){this._editingTab=null}get _lovelace(){return this.lovelace??{config:{views:[]},editMode:!0}}_onNativeCardChanged(t,e){e.stopPropagation();const o=e.detail?.config;o&&(this._config?.tabs[t]?.children&&Array.isArray(o.tabs)?this._patchTab(t,Qe({...this._config.tabs[t],children:o.tabs})):this._patchTab(t,{card:o}))}_onTypeChosen(t,e){e.stopPropagation();const o=e.detail?.value?.type;o&&this._patchTab(t,{card:{type:o}})}_changeCardType(t){this._patchTab(t,{card:{}})}_onYamlCardChanged(t,e){e.stopPropagation();const o=e.detail;!1!==o?.isValid&&void 0!==o?.value&&this._patchTab(t,{card:o.value})}_defaultTabValue(t){for(let e=0;e<t.tabs.length;e++){const o=t.tabs[e].name??String(e);if(String(t.default_tab)===o||t.default_tab===e)return o}}_resolveColor(t){const e=document.createElement("span");if(e.style.color=t,!e.style.color)return;this.renderRoot.appendChild(e);const o=wi(getComputedStyle(e).color);return e.remove(),o}_contrastWarnings(t){const e=this._resolveColor("var(--card-background-color, var(--ha-card-background, #fff))");if(!e)return[];const o=[];for(const i of["accent","color"]){const a=t[i];if("string"!=typeof a||!a||a.includes("{"))continue;const r=this._resolveColor(vi(a));if(!r)continue;const n=xi(r,e);n<3&&o.push(this._t("editor.contrast_low",{field:this._t(`editor.tab.${i}`),ratio:n.toFixed(1)}))}return o}_globalSchema(){const t=(t,e)=>t.map(t=>{const o=`editor.opt.${e}.${t}`;return{value:t,label:e&&h(o)?this._t(o):t}}),e=this._config.tabs.map((t,e)=>({value:t.name??String(e),label:t.name||this._t("editor.tab_n",{n:e+1})}));return[{name:"preset",selector:{select:{mode:"dropdown",options:t(["",...Vt])}}},{name:"position",selector:{select:{mode:"dropdown",options:t(["top","bottom","left","right"],"position")}}},{name:"orientation_layout",selector:{boolean:{}}},{name:"style",selector:{select:{mode:"dropdown",options:t(["underline","pill","segmented","boxed","text","rail"],"style")}}},{name:"tab_display",selector:{select:{mode:"dropdown",options:t(["both","icon","label","active","dots"],"tab_display")}}},{name:"align",selector:{select:{mode:"dropdown",options:t(["start","center","end","justify"],"align")}}},{name:"badge_display",selector:{select:{mode:"dropdown",options:t(["text","dot"],"badge_display")}}},{name:"hide_inactive_badge",selector:{boolean:{}}},{name:"badge_bounce",selector:{boolean:{}}},{name:"transition",selector:{select:{mode:"dropdown",options:t(["none","fade","slide","scale","flip","rise"],"transition")}}},{name:"transition_narrow",selector:{select:{mode:"dropdown",options:t(["","none","fade","slide","scale","flip","rise"],"transition")}}},{name:"transition_duration",selector:{number:{min:0,max:2e3,step:10,mode:"box"}}},{name:"transition_easing",selector:{text:{}}},{name:"indicator_size",selector:{number:{min:1,max:16,step:1,mode:"slider"}}},{name:"indicator_radius",selector:{number:{min:0,max:30,step:1,mode:"slider"}}},{name:"remember",selector:{select:{mode:"dropdown",options:t(["none","browser","url","entity"],"remember")}}},{name:"remember_entity",selector:{text:{}}},{name:"storage_key",selector:{text:{}}},{name:"default_tab",selector:{select:{mode:"dropdown",options:e}}},{name:"scrollable",selector:{select:{mode:"dropdown",options:t(["auto","true","false"],"scrollable")}}},{name:"lazy",selector:{boolean:{}}},{name:"preload",selector:{select:{mode:"dropdown",options:t(["","idle","all"],"preload")}}},{name:"unmount_hidden",selector:{boolean:{}}},{name:"loading_placeholder",selector:{boolean:{}}},{name:"friendly_errors",selector:{boolean:{}}},{name:"swipe_wrap",selector:{boolean:{}}},{name:"animated",selector:{boolean:{}}},{name:"liquid_indicator",selector:{boolean:{}}},{name:"accent_indicator",selector:{boolean:{}}},{name:"picture_accent",selector:{boolean:{}}},{name:"header",selector:{boolean:{}}},{name:"aria_label",selector:{text:{}}},{name:"sticky",selector:{boolean:{}}},{name:"bar_autohide",selector:{boolean:{}}},{name:"elevation",selector:{boolean:{}}},{name:"glass",selector:{boolean:{}}},{name:"scroll_buttons",selector:{boolean:{}}},{name:"bar_fade",selector:{boolean:{}}},{name:"overflow_menu",selector:{boolean:{}}},{name:"hidden_alerts",selector:{boolean:{}}},{name:"summary_chip",selector:{boolean:{}}},{name:"bar_limit",selector:{number:{min:0,max:100,step:1,mode:"box"}}},{name:"bar_background",selector:{text:{}}},{name:"bar_text",selector:{select:{mode:"dropdown",options:t(["","auto","light","dark"],"bar_text")}}},{name:"swipe",selector:{boolean:{}}},{name:"swipe_mouse",selector:{boolean:{}}},{name:"wheel_switch",selector:{boolean:{}}},{name:"swipe_lock",selector:{boolean:{}}},{name:"swipe_edge",selector:{number:{min:0,max:400,step:4,mode:"box",unit_of_measurement:"px"}}},{name:"tab_display_narrow",selector:{select:{mode:"dropdown",options:t(["","both","icon","label","active","dots"],"tab_display")}}},{name:"narrow_width",selector:{number:{min:100,max:4e3,step:10,mode:"box"}}},{name:"split",selector:{number:{min:0,max:4e3,step:10,mode:"box"}}},{name:"collapsible",selector:{boolean:{}}},{name:"start_collapsed",selector:{boolean:{}}},{name:"scroll_spy",selector:{boolean:{}}},{name:"auto_rotate",selector:{number:{min:0,max:3600,step:1,mode:"box"}}},{name:"idle_return",selector:{number:{min:0,max:86400,step:1,mode:"box"}}},{name:"idle_dim",selector:{number:{min:0,max:1440,step:1,mode:"box"}}},{name:"idle_dim_mode",selector:{select:{mode:"dropdown",options:t(["dim","black","clock"],"idle_dim_mode")}}},{name:"dock",selector:{boolean:{}}},{name:"content_arrows",selector:{boolean:{}}},{name:"wizard",selector:{boolean:{}}},{name:"breadcrumbs",selector:{boolean:{}}},{name:"search",selector:{boolean:{}}},{name:"entity_search",selector:{boolean:{}}},{name:"hotkeys",selector:{boolean:{}}},{name:"history",selector:{boolean:{}}},{name:"scroll_memory",selector:{boolean:{}}},{name:"customize",selector:{boolean:{}}},{name:"drag_reorder",selector:{boolean:{}}},{name:"rail_expand",selector:{boolean:{}}},{name:"content_height",selector:{text:{}}},{name:"content_max_height",selector:{text:{}}},{name:"fullscreen",selector:{boolean:{}}},{name:"overview",selector:{boolean:{}}},{name:"last_tab_button",selector:{boolean:{}}},{name:"swipe_peek",selector:{boolean:{}}},{name:"hold_peek",selector:{boolean:{}}},{name:"compare",selector:{boolean:{}}},{name:"changed_dot",selector:{boolean:{}}},{name:"sort_by_usage",selector:{boolean:{}}},{name:"learned_default",selector:{boolean:{}}},{name:"health_dim",selector:{boolean:{}}},{name:"alert_first",selector:{boolean:{}}},{name:"alert_snooze",selector:{number:{min:0,max:1440,step:1,mode:"box"}}},{name:"remote_entity",selector:{entity:{domain:["input_text","input_select","select","sensor"]}}},{name:"follow_room",selector:{entity:{domain:["sensor","input_select","select","input_text","device_tracker"]}}},{name:"remote_event",selector:{boolean:{}}},{name:"fire_event",selector:{boolean:{}}},{name:"companion",selector:{boolean:{}}},{name:"offline_banner",selector:{boolean:{}}},{name:"usage_stats",selector:{number:{min:0,max:60,step:1,mode:"box",unit_of_measurement:"min"}}},{name:"event_id",selector:{text:{}}},{name:"sync_group",selector:{text:{}}},{name:"popup",selector:{select:{mode:"dropdown",options:t(["","on","hidden"],"popup")}}},{name:"share_button",selector:{select:{mode:"dropdown",options:t(["","link","qr"],"share_button")}}},{name:"unload_after",selector:{number:{min:0,max:1440,step:1,mode:"box"}}},{name:"edit_mode_reveal",selector:{boolean:{}}},{name:"density",selector:{select:{mode:"dropdown",options:t(["default","compact","comfortable"],"density")}}},{name:"haptic",selector:{select:{mode:"dropdown",options:t(["","selection","light","medium","heavy"],"haptic")}}},{name:"click_sound",selector:{number:{min:0,max:1,step:.05,mode:"slider"}}},{name:"debug",selector:{select:{mode:"dropdown",options:t(["","on","speed"],"debug")}}}]}_dataFor(t){return{preset:t.preset??"",position:t.position,orientation_layout:!!t.orientation_layout,style:t.style,tab_display:t.tab_display,align:t.align,badge_display:t.badge_display,hide_inactive_badge:t.hide_inactive_badge,badge_bounce:t.badge_bounce,transition:t.transition,indicator_size:t.indicator_size,indicator_radius:t.indicator_radius,remember:t.remember,remember_entity:t.remember_entity??"",storage_key:t.storage_key??"",default_tab:this._defaultTabValue(t),scrollable:String(t.scrollable),lazy:t.lazy,preload:t.preload??"",unmount_hidden:t.unmount_hidden,loading_placeholder:t.loading_placeholder,friendly_errors:t.friendly_errors,swipe_wrap:t.swipe_wrap,animated:t.animated,liquid_indicator:t.liquid_indicator,accent_indicator:t.accent_indicator,picture_accent:t.picture_accent,header:t.header,aria_label:t.aria_label??"",sticky:t.sticky,bar_autohide:t.bar_autohide,elevation:t.elevation,glass:!!t.glass,scroll_buttons:t.scroll_buttons,bar_fade:t.bar_fade,overflow_menu:t.overflow_menu,hidden_alerts:t.hidden_alerts,summary_chip:!!t.summary_chip,bar_limit:t.bar_limit??0,bar_background:t.bar_background??"",bar_text:t.bar_text??"",swipe:t.swipe,swipe_mouse:t.swipe_mouse,wheel_switch:t.wheel_switch,swipe_lock:t.swipe_lock,swipe_edge:t.swipe_edge??0,tab_display_narrow:t.tab_display_narrow??"",narrow_width:t.narrow_width,split:t.split?.min_width??0,collapsible:t.collapsible,start_collapsed:t.start_collapsed,scroll_spy:t.scroll_spy,auto_rotate:t.auto_rotate?.interval??0,idle_return:t.idle_return??0,idle_dim:t.idle_dim?.after??0,idle_dim_mode:t.idle_dim?.mode??"dim",dock:t.dock,content_arrows:t.content_arrows,wizard:!!t.wizard,breadcrumbs:!!t.breadcrumbs,search:t.search,entity_search:t.entity_search,hotkeys:t.hotkeys,history:t.history,scroll_memory:t.scroll_memory,customize:t.customize,drag_reorder:t.drag_reorder,rail_expand:t.rail_expand,edit_mode_reveal:t.edit_mode_reveal,transition_narrow:t.transition_narrow??"",transition_duration:t.transition_duration,transition_easing:t.transition_easing,content_height:t.content_height,content_max_height:t.content_max_height??"",fullscreen:t.fullscreen,overview:t.overview,last_tab_button:t.last_tab_button,swipe_peek:t.swipe_peek,hold_peek:t.hold_peek,compare:t.compare,changed_dot:t.changed_dot,sort_by_usage:t.sort_by_usage,learned_default:!!t.learned_default,health_dim:void 0!==t.health_dim,unload_after:t.unload_after??0,alert_first:t.alert_first,alert_snooze:t.alert_snooze??0,remote_entity:t.remote_entity??"",follow_room:t.follow_room?.entity??"",remote_event:t.remote_event,fire_event:t.fire_event,companion:t.companion,offline_banner:t.offline_banner,usage_stats:t.usage_stats??0,event_id:t.event_id??"",sync_group:t.sync_group??"",popup:!0===t.popup?"on":t.popup??"",share_button:t.share_button??"",debug:"speed"===t.debug?"speed":t.debug?"on":"",density:t.density,haptic:t.haptic??"",click_sound:t.click_sound??0}}_onGlobalChanged(t){t.stopPropagation();const e=t.detail.value??{};if(this._config&&Rt(e.preset)&&e.preset!==this._config.preset)return void this._emit(function(t,e){const o=It(e),i=Object.fromEntries(Object.entries(t.styles??{}).filter(([t])=>!qt.has(t)));return{...t,...o,styles:{...i,...o.styles},preset:e}}(this._config,e.preset));const o="auto"===e.scrollable?"auto":"true"===e.scrollable||!0===e.scrollable;this._patch({position:e.position,orientation_layout:e.orientation_layout?!this._config?.orientation_layout||"bottom"===this._config.orientation_layout.portrait&&"left"===this._config.orientation_layout.landscape||this._config.orientation_layout:void 0,style:e.style,tab_display:e.tab_display,align:e.align,badge_display:e.badge_display,hide_inactive_badge:!!e.hide_inactive_badge,badge_bounce:!!e.badge_bounce,transition:e.transition,indicator_size:e.indicator_size,indicator_radius:e.indicator_radius,remember:e.remember,remember_entity:e.remember_entity||void 0,storage_key:e.storage_key||void 0,default_tab:e.default_tab,scrollable:o,lazy:!!e.lazy,preload:"idle"===e.preload||"all"===e.preload?e.preload:void 0,unmount_hidden:!!e.unmount_hidden,loading_placeholder:!!e.loading_placeholder,friendly_errors:!!e.friendly_errors,swipe_wrap:!!e.swipe_wrap,animated:!!e.animated,liquid_indicator:!!e.liquid_indicator,accent_indicator:!!e.accent_indicator,picture_accent:!!e.picture_accent,header:!!e.header,aria_label:e.aria_label||void 0,sticky:!!e.sticky,bar_autohide:!!e.bar_autohide,elevation:!!e.elevation,glass:e.glass?this._config?.glass||!0:void 0,scroll_buttons:!!e.scroll_buttons,bar_fade:!1!==e.bar_fade,overflow_menu:!!e.overflow_menu,hidden_alerts:!!e.hidden_alerts,summary_chip:e.summary_chip?this._config?.summary_chip||!0:void 0,bar_limit:he(e.bar_limit),bar_background:e.bar_background||void 0,bar_text:e.bar_text||void 0,swipe:!!e.swipe,swipe_mouse:!!e.swipe_mouse,wheel_switch:!!e.wheel_switch,swipe_lock:!!e.swipe_lock,swipe_edge:Number(e.swipe_edge)>0?Math.max(8,Number(e.swipe_edge)):void 0,tab_display_narrow:e.tab_display_narrow||void 0,narrow_width:Number(e.narrow_width)||450,split:Number(e.split)>0?{min_width:Number(e.split),columns:this._config?.split?.columns??2}:void 0,collapsible:!!e.collapsible,start_collapsed:!!e.collapsible&&!!e.start_collapsed,scroll_spy:!!e.scroll_spy,auto_rotate:Number(e.auto_rotate)>0?{interval:Math.max(2,Number(e.auto_rotate)),resume_after:this._config?.auto_rotate?.resume_after??60}:void 0,idle_return:Number(e.idle_return)>0?Math.max(5,Number(e.idle_return)):void 0,idle_dim:Number(e.idle_dim)>0?{after:Number(e.idle_dim),mode:"black"===e.idle_dim_mode||"clock"===e.idle_dim_mode?e.idle_dim_mode:"dim",opacity:this._config?.idle_dim?.opacity??.7}:void 0,dock:!!e.dock,content_arrows:!!e.content_arrows,wizard:e.wizard?this._config?.wizard??{}:void 0,breadcrumbs:e.breadcrumbs?this._config?.breadcrumbs??{}:void 0,search:!!e.search,entity_search:!!e.entity_search,hotkeys:!!e.hotkeys,history:!!e.history,scroll_memory:!!e.scroll_memory,customize:!!e.customize,drag_reorder:!!e.drag_reorder,rail_expand:!!e.rail_expand,edit_mode_reveal:!1!==e.edit_mode_reveal,transition_duration:Number.isFinite(Number(e.transition_duration))?Math.min(2e3,Math.max(0,Number(e.transition_duration))):180,transition_easing:e.transition_easing||"ease",transition_narrow:e.transition_narrow||void 0,content_height:"tallest"===e.content_height?"tallest":Dt(e.content_height)??"auto",content_max_height:Dt(e.content_max_height),fullscreen:!!e.fullscreen,overview:!!e.overview,last_tab_button:!!e.last_tab_button,swipe_peek:!!e.swipe_peek,hold_peek:!!e.hold_peek,compare:!!e.compare,changed_dot:!!e.changed_dot,sort_by_usage:!!e.sort_by_usage,learned_default:e.learned_default?this._config?.learned_default||!0:void 0,health_dim:e.health_dim?this._config?.health_dim??.5:void 0,unload_after:Number(e.unload_after)>0?Math.max(1,Number(e.unload_after)):void 0,alert_first:!!e.alert_first,alert_snooze:Number(e.alert_snooze)>0?Number(e.alert_snooze):void 0,remote_entity:e.remote_entity||void 0,follow_room:e.follow_room?{...this._config?.follow_room,entity:e.follow_room}:void 0,remote_event:!!e.remote_event,fire_event:!!e.fire_event,companion:!!e.companion,offline_banner:!!e.offline_banner,usage_stats:Number(e.usage_stats)>0?Math.min(60,Math.round(Number(e.usage_stats))):void 0,event_id:e.event_id||void 0,popup:"on"===e.popup||("hidden"===e.popup?"hidden":void 0),share_button:"link"===e.share_button||("qr"===e.share_button?"qr":void 0),sync_group:"string"==typeof e.sync_group&&e.sync_group.trim()?e.sync_group.trim():void 0,debug:"speed"===e.debug?"speed":"on"===e.debug||!0===e.debug,density:"compact"===e.density||"comfortable"===e.density?e.density:"default",haptic:e.haptic||void 0,click_sound:Number(e.click_sound)>0?Math.min(1,Number(e.click_sound)):void 0})}_onTabFieldsChanged(t,e){e.stopPropagation();const o=e.detail.value??{};this._patchTab(t,{name:o.name??"",subtitle:o.subtitle||void 0,tooltip:o.tooltip||void 0,icon:o.icon||void 0,accent:o.accent||void 0,color:o.color||void 0,badge:o.badge||("object"==typeof this._config?.tabs[t]?.badge?this._config.tabs[t].badge:void 0),badge_color:o.badge_color||void 0,countdown:o.countdown||void 0,background:o.background||void 0,page_background:o.page_background||void 0,badge_icon:o.badge_icon||void 0,picture:o.picture||void 0,icon_animation:o.icon_animation||void 0,separator:"line"===o.separator||"space"===o.separator?o.separator:void 0,tab_ref:"string"==typeof o.tab_ref&&o.tab_ref.trim()?o.tab_ref.trim():void 0,font_size:Dt("string"==typeof o.font_size&&/^\d+(\.\d+)?$/.test(o.font_size)?Number(o.font_size):o.font_size),font_weight:o.font_weight?String(o.font_weight):void 0,font_family:o.font_family||void 0,ring:void 0===o.ring||null===o.ring||""===o.ring?void 0:String(o.ring),ring_max:Number(o.ring_max)>0?Number(o.ring_max):void 0,ring_color:o.ring_color||void 0,ring_style:o.ring_style?"bar":void 0,graph:o.graph?"object"==typeof this._config?.tabs[t]?.graph&&this._config.tabs[t].graph.entity===o.graph?this._config.tabs[t].graph:o.graph:void 0,area:o.area||void 0,...this._shortcutFields(t,o),auto_refresh:Number(o.auto_refresh)>0?Number(o.auto_refresh):void 0,zoom:ce(o.zoom),padding:le("string"==typeof o.padding&&/^\d+(\.\d+)?$/.test(o.padding.trim())?Number(o.padding):o.padding),spacing:le("string"==typeof o.spacing&&/^\d+(\.\d+)?$/.test(o.spacing.trim())?Number(o.spacing):o.spacing),empty_message:o.empty_message||("object"==typeof this._config?.tabs[t]?.empty_message||!0===this._config?.tabs[t]?.empty_message?this._config.tabs[t].empty_message:void 0),pin:o.pin?String(o.pin):void 0,pin_timeout:Number(o.pin_timeout)>0?Number(o.pin_timeout):void 0,disabled:!!o.disabled||void 0,fab:!!o.fab||void 0,pip:!!o.pip||void 0,keep_awake:!!o.keep_awake||void 0,card_size:"number"==typeof o.card_size?o.card_size:void 0,hold_action:o.hold_action??void 0,double_tap_action:o.double_tap_action??void 0,badge_action:o.badge_action??void 0,tap_action:o.tap_action&&"none"!==o.tap_action.action?o.tap_action:void 0,enter_action:o.enter_action&&"none"!==o.enter_action.action?o.enter_action:void 0,leave_action:o.leave_action&&"none"!==o.leave_action.action?o.leave_action:void 0})}_shortcutFields(t,e){const o=this._config?.tabs[t]??{},i={};for(const n of va){const t=e[n],a="string"==typeof t?"markdown"===n?t.trim()?t:"":t.trim():"number"==typeof t?String(t):"";!a&&o[n]&&"object"==typeof o[n]||(i[n]=a||void 0)}const a={...o,...i};if(!va.some(t=>a[t]!==o[t]))return i;const r=re(a);return r?i.card=r:ne(o)&&(i.card={}),i}_renderConditions(t,e,o){const i=Array.isArray(e[o.key])?e[o.key]:[],a=e=>{e.stopPropagation();const i=e.detail?.value;!1!==e.detail?.isValid&&Array.isArray(i)&&this._patchTab(t,{[o.key]:i.length?i:void 0})};let r;r=customElements.get("ha-card-conditions-editor")?st`<ha-card-conditions-editor
        .hass=${this.hass}
        .conditions=${i}
        @value-changed=${a}
      ></ha-card-conditions-editor>`:customElements.get("ha-yaml-editor")?st`<ha-yaml-editor
        .defaultValue=${i}
        @value-changed=${a}
      ></ha-yaml-editor>`:st`<textarea
        class="conditions-json"
        rows="6"
        .value=${JSON.stringify(i,null,2)}
        @change=${e=>{try{const i=JSON.parse(e.target.value||"[]");Array.isArray(i)&&this._patchTab(t,{[o.key]:i.length?i:void 0})}catch{}}}
      ></textarea>`;const n=i.length&&this._hass?this._explain(i):void 0;return st`
      <details class="conditions-section" data-key=${o.key}>
        <summary>
          ${this._t(`editor.cond.${o.key}.label`)}${i.length?` (${i.length})`:""}
          ${n?st`<span class="check-dot ${n.met?"met":"unmet"}" aria-hidden="true"></span>`:ct}
          <span class="conditions-hint">${this._t(`editor.cond.${o.key}.hint`)}</span>
        </summary>
        ${n?this._renderCheck(n):ct}
        ${r}
      </details>
    `}_renderCheck(t){return st`
      <div class="check ${t.met?"met":"unmet"}" role="status">
        <div class="check-head">
          ${t.met?"✅":"❌"} ${this._t(t.met?"check.now_met":"check.now_unmet")}
        </div>
        <ul class="check-list">
          ${t.items.map(t=>this._renderCheckItem(t))}
        </ul>
      </div>
    `}_renderCheckItem(t){const e=t.met?"✅":"❌";return st`<li class="check-item ${t.met?"met":"unmet"}">
      <span class="check-mark">${e}</span>
      <span class="check-text">${this._describe(t)}</span>
      ${t.children?st`<ul class="check-list">${t.children.map(t=>this._renderCheckItem(t))}</ul>`:ct}
    </li>`}_describe(t){const e=(t,e)=>this._t(t,e),o=()=>t.missing?` (${e("check.missing")})`:void 0!==t.current?` (${e("check.now",{value:t.current})})`:"";switch(t.type){case"state":return e(t.negate?"check.state_is_not":"check.state_is",{entity:t.entity??"?",values:(t.expected??[]).join(e("check.or"))})+o();case"numeric_state":{const i=[];return void 0!==t.above&&i.push(e("check.above",{value:t.above})),void 0!==t.below&&i.push(e("check.below",{value:t.below})),e("check.numeric",{entity:t.entity??"?",range:i.join(e("check.and"))})+o()}case"screen":return e("check.screen",{query:t.media_query??""});case"time":{const o=[];return t.after&&o.push(e("check.time_after",{value:t.after})),t.before&&o.push(e("check.time_before",{value:t.before})),t.weekday?.length&&o.push(e("check.time_days",{days:t.weekday.join(", ")})),e("check.time",{range:o.join(" ")})}case"user":return e("check.user",{count:t.count??0});case"template":return e(t.pending?"check.template_pending":"check.template");case"and":case"or":case"not":return e(`check.group_${t.type}`);default:return e("check.unknown")}}async _ensureConditionsEditor(){if(!customElements.get("ha-card-conditions-editor"))try{(await(window.loadCardHelpers?.()))?.createCardElement?.({type:"conditional",conditions:[],card:{type:"markdown"}}),await(customElements.get("hui-conditional-card")?.getConfigElement?.()),customElements.get("ha-card-conditions-editor")&&this.requestUpdate()}catch{}}firstUpdated(){this._ensureConditionsEditor(),setTimeout(this._checkHaPreview,300)}render(){return this._config?st`${this._renderHistory()}${null!==this._editingTab?this._renderCardView(this._editingTab):this._renderListView()}`:st``}_renderCardView(t){const e=this._config.tabs[t];if(!e)return this._editingTab=null,this._renderListView();const o=!!e.card?.type;return st`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}><span class="flip">←</span> ${this._t("editor.back")}</button>
          <span class="card-editor-title">${e.name||this._t("editor.tab_n",{n:t+1})}</span>
          ${o?st`<button class="change-card-type" @click=${()=>this._changeCardType(t)}>
                ${this._t("editor.change_type")}
              </button>`:ct}
        </div>
        ${o?this._renderCardEditor(t,e):this._renderCardTypeChooser(t)}
      </div>
    `}_renderCardTypeChooser(t){return st`
      <div class="card-type-chooser">
        <ha-form
          class="card-type-form"
          .hass=${this.hass}
          .data=${{}}
          .schema=${ka}
          .computeLabel=${()=>this._t("editor.card_type")}
          @value-changed=${e=>this._onTypeChosen(t,e)}
        ></ha-form>
        <p class="card-type-hint">${this._t("editor.card_type_hint")}</p>
      </div>
    `}_renderCardEditor(t,e){const o=$a(t=>!!customElements.get(t));return"hui-card-element-editor"===o?st`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this._lovelace}
          .value=${e.card??{}}
          @config-changed=${e=>this._onNativeCardChanged(t,e)}
        ></hui-card-element-editor>
      `:"ha-yaml-editor"===o?st`
        <ha-yaml-editor
          .defaultValue=${e.card??{}}
          @value-changed=${e=>this._onYamlCardChanged(t,e)}
        ></ha-yaml-editor>
      `:st`
      <label class="card-label"
        >${this._t("editor.card_json")}
        <textarea
          class="tab-card-json"
          rows="10"
          .value=${JSON.stringify(e.card??{},null,2)}
          @change=${e=>this._editCardJson(t,e.target.value)}
        ></textarea>
      </label>
      ${this._cardError===t?st`<div class="tab-card-error">${this._t("editor.invalid_json")}</div>`:ct}
    `}_renderIconSuggestions(t,e){const o=function(t,e=6){if("string"!=typeof t||!t.trim()||t.includes("{"))return[];const o=` ${(t=>t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\u0142/g,"l"))(t).split(/[^a-z0-9]+/).filter(Boolean).join(" ")} `,i=[],a=Di.map(t=>{let e=1/0;for(const{k:i,exact:a}of t.keys){const t=a?o.indexOf(` ${i} `):o.indexOf(i);t>=0&&t<e&&(e=t)}return{e:t,at:e}}).filter(t=>t.at!==1/0).sort((t,e)=>t.at-e.at);for(const{e:r}of a)for(const t of r.icons)i.includes(t)||i.push(t);return i.slice(0,e)}(e.name);return!o.length||po(e.icon)?ct:st`<div class="icon-suggest">
      <span class="icon-suggest-label">${this._t("editor.icon_suggest")}</span>
      ${o.map(o=>st`<button
          class="icon-choice ${e.icon===o?"on":""}"
          title=${o}
          aria-label=${this._t("editor.icon_use",{icon:o})}
          aria-pressed=${e.icon===o?"true":"false"}
          @click=${()=>this._patchTab(t,{icon:o})}
        >
          <ha-icon .icon=${o}></ha-icon>
        </button>`)}
    </div>`}_renderStatusChips(t){if(!this._hass)return ct;const e=Array.isArray(t.visibility)&&t.visibility.length>0&&!this._explain(t.visibility).met,o=Array.isArray(t.alert)&&t.alert.length>0&&this._explain(t.alert).met;return e||o?st`<span class="tab-status">
      ${e?st`<span class="chip chip-hidden" title=${this._t("check.chip_hidden_title")}
            >${this._t("check.chip_hidden")}</span>`:ct}
      ${o?st`<span class="chip chip-alert">${this._t("check.chip_alert")}</span>`:ct}
    </span>`:ct}_hint(t){const e=`editor.hint.${t}`;return h(e)?this._t(e):""}_fieldText(t){const e=t.selector?.select?.options??[];return[this._t(`editor.global.${t.name}`),this._hint(t.name),t.name,t.name.replace(/_/g," "),...e.map(t=>t.label)].join(" ")}_tabTags(t){const e=[];return t.badge&&e.push(this._t("editor.tag.badge")),t.pin&&e.push(this._t("editor.tag.pin")),t.icon||e.push(this._t("editor.tag.no_icon")),e}_tabMatches(t,e,o){return aa([t.name||this._t("editor.tab_n",{n:e+1}),...this._tabTags(t)].join(" "),o)}_isOpen(t,e){return e?!this._searchClosed.has(t):!!this._open[t]}_onSectionToggle(t,e){if(e.target!==e.currentTarget)return;const o=!!e.detail?.expanded;if(this._query.trim()){const e=new Set(this._searchClosed);return o?e.delete(t):e.add(t),void(this._searchClosed=e)}this._open={...this._open,[t]:o},sa(this._open)}_onSearch(t){this._query=t,this._searchClosed=new Set}_sectionSummary(t,e,o,i){const a=[...t.lead??[],...i.filter(e=>!t.lead?.includes(e))].map(t=>{const i=e.get(t),a=o[t],r=i?.selector?.select?.options?.find(t=>t.value===a);if(r)return r.label;const n=this._t(`editor.global.${t}`);return i?.selector?.boolean?a?n:`${n}: ${this._t("editor.off")}`:`${n}: ${a}`});return a.length?a.join(" · "):this._t("editor.section.defaults")}_renderSection(t,e,o,i,a,r,n){return customElements.get("ha-expansion-panel")?st`<ha-expansion-panel
        outlined
        class="section"
        data-section=${t}
        .expanded=${r}
        .header=${o}
        .secondary=${i}
        @expanded-will-change=${e=>this._onSectionToggle(t,e)}
      >
        <ha-icon slot="leading-icon" .icon=${e}></ha-icon>
        ${a?st`<span slot="icons" class="dot" title=${this._t("editor.section.changed")}></span>`:ct}
        ${r?n():ct}
      </ha-expansion-panel>`:st`<div class="section" data-section=${t}>
      <div class="section-head">
        <ha-icon .icon=${e}></ha-icon>
        <span class="section-title">${o}</span>
        <span class="section-summary">${i}</span>
        ${a?st`<span class="dot" title=${this._t("editor.section.changed")}></span>`:ct}
      </div>
      ${n()}
    </div>`}_renderStatusLine(t){const e=d(this._hass),o=this._config.tabs.length,i=t.some(t=>"warn"===t.level);return st`<button
      class="status-line ${this._statusOpen?"open":""}"
      aria-expanded=${this._statusOpen?"true":"false"}
      @click=${()=>this._statusOpen=!this._statusOpen}
    >
      <span class="schip">${p(e,"editor.status.tabs",o)}</span>
      ${t.length?st`<span class="schip notes ${i?"warn":""}"
            ><ha-svg-icon .path=${ba[i?"warn":"info"]}></ha-svg-icon>${p(e,"editor.status.notes",t.length)}</span
          >`:ct}
      ${this._note?st`<span class="schip new"
            ><ha-svg-icon .path=${ma}></ha-svg-icon>${this._t("editor.status.new",{version:this._note})}</span
          >`:ct}
      <ha-svg-icon class="status-chevron" .path=${ga}></ha-svg-icon>
    </button>`}async _goToField(t){const e=oa(t);e&&(this._query="",this._searchClosed=new Set,this._open={...this._open,[e.id]:!0},sa(this._open),this._flashField=t,await this.updateComplete,await new Promise(t=>requestAnimationFrame(()=>t(null))),this.renderRoot.querySelector(`.row[data-field="${t}"]`)?.scrollIntoView?.({block:"center",behavior:Ai()?"auto":"smooth"}),setTimeout(()=>this._flashField="",1600))}_goToLint(t){const e=ca(t);if(e?.field)this._goToField(e.field);else if(e?.tab){const t=this._config.tabs.findIndex((t,o)=>(t.name||this._t("editor.tab_n",{n:o+1}))===e.tab);t>=0&&this._focusTab(t)}}_renderPreviewStrip(){const t=this._config;return st`<div class="preview">
      <span class="preview-label">${this._t("editor.preview")} · ${this._t("editor.preview_hint")}</span>
      <tabdeck-tabbar
        class="preview-bar"
        @tabdeck-select=${t=>{t.stopPropagation(),this._focusTab(t.detail?.index)}}
        .items=${t.tabs.map((t,e)=>({name:!po(t.name)&&t.name||this._t("editor.tab_n",{n:e+1}),icon:po(t.icon)?void 0:t.icon,accent:po(t.accent)?void 0:t.accent,color:po(t.color)?void 0:t.color,disabled:t.disabled}))}
        .selected=${this._previewSelected<t.tabs.length?this._previewSelected:0}
        .position=${"top"}
        .tabStyle=${t.style}
        .display=${t.tab_display}
        .align=${t.align}
        .indicatorSize=${t.indicator_size}
        .indicatorRadius=${t.indicator_radius}
        .accentIndicator=${t.accent_indicator}
      ></tabdeck-tabbar>
    </div>`}_renderTabRow(t,e){const o=this._config,i=this._expanded.has(e),a=t.name||this._t("editor.tab_n",{n:e+1});return st`
      <div class="tab ${i?"expanded":"collapsed"} ${this._flashTab===e?"flash":""} ${this._picked.has(e)?"picked":""}">
        <div
          class="tab-header"
          role="button"
          tabindex="0"
          aria-expanded=${i?"true":"false"}
          @click=${()=>this._toggleExpanded(e)}
          @keydown=${t=>this._onHeaderKeydown(e,t)}
        >
          ${this._selecting?st`<input
                type="checkbox"
                class="pick"
                aria-label=${this._t("editor.bulk.pick",{name:a})}
                .checked=${this._picked.has(e)}
                @click=${t=>{t.stopPropagation(),this._togglePicked(e)}}
                @keydown=${t=>t.stopPropagation()}
              />`:ct}
          <ha-svg-icon
            class="drag-handle"
            .path=${"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"}
            title=${this._t("editor.drag")}
            @click=${t=>t.stopPropagation()}
          ></ha-svg-icon>
          <ha-icon class="tab-icon" .icon=${!po(t.icon)&&t.icon||"mdi:tab"}></ha-icon>
          <span class="tab-title">${a}</span>
          ${this._tabTags(t).map(t=>st`<span class="tag">${t}</span>`)}
          ${this._renderStatusChips(t)}
          <span class="tab-controls">
            <ha-icon-button
              class="duplicate-tab"
              .label=${this._t("editor.duplicate_tab")}
              .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
              @click=${t=>{t.stopPropagation(),this._duplicateTab(e)}}
            ></ha-icon-button>
            <ha-icon-button
              class="delete-tab"
              .label=${this._t("editor.delete_tab")}
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              @click=${t=>{t.stopPropagation(),this._deleteTab(e)}}
            ></ha-icon-button>
            <ha-svg-icon class="expand-chevron" .path=${ga}></ha-svg-icon>
          </span>
        </div>
        ${i?st`<div class="tab-body">
              <div class="tab-actions">
                <span class="tab-type">${t.card?.type??"—"}</span>
                <ha-icon-button
                  class="move-up"
                  .label=${this._t("editor.move_up")}
                  .path=${"M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"}
                  .disabled=${0===e}
                  @click=${()=>this._move(e,-1)}
                ></ha-icon-button>
                <ha-icon-button
                  class="move-down"
                  .label=${this._t("editor.move_down")}
                  .path=${"M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"}
                  .disabled=${e===o.tabs.length-1}
                  @click=${()=>this._move(e,1)}
                ></ha-icon-button>
                <ha-icon-button
                  class="copy-tab"
                  .label=${this._t("editor.copy_tab")}
                  .path=${"M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z"}
                  @click=${()=>{this._copyTab(e)}}
                ></ha-icon-button>
              </div>
              ${this._renderIconSuggestions(e,t)}
              <ha-form
                class="tab-form"
                .hass=${this.hass}
                .data=${this._tabData(t)}
                .schema=${ya(t,this._opts)}
                .computeLabel=${this._computeTabLabel}
                @value-changed=${t=>this._onTabFieldsChanged(e,t)}
              ></ha-form>
              ${this._contrastWarnings(t).map(t=>st`<div class="editor-warning contrast-warning" role="alert">⚠️ ${t}</div>`)}
              ${xa.map(o=>this._renderConditions(e,t,o))}
              <button class="edit-card" @click=${()=>this._openCard(e)}>
                <span class="edit-card-label">${this._t("editor.edit_card")}</span>
                <span class="edit-card-type">${t.card?.type??"—"}</span>
                <span class="edit-card-arrow flip">→</span>
              </button>
            </div>`:ct}
      </div>
    `}_tabData(t){return{name:t.name??"",subtitle:t.subtitle??"",tooltip:t.tooltip??"",icon:t.icon??"",accent:t.accent??"",color:t.color??"",badge:"string"==typeof t.badge?t.badge:"",badge_color:t.badge_color??"",countdown:t.countdown??"",background:t.background??"",page_background:t.page_background??"",badge_icon:t.badge_icon??"",picture:t.picture??"",icon_animation:t.icon_animation??"",separator:t.separator??"",font_size:t.font_size??"",font_weight:t.font_weight??"",font_family:t.font_family??"",ring:t.ring??"",ring_max:t.ring_max,ring_color:t.ring_color??"",ring_style:"bar"===t.ring_style,graph:"object"==typeof t.graph?t.graph?.entity??"":t.graph??"",area:t.area??"",view:"string"==typeof t.view?t.view:"",tab_ref:t.tab_ref??"",url:t.url??"",aspect_ratio:t.aspect_ratio??"",markdown:t.markdown??"",empty_message:"string"==typeof t.empty_message?t.empty_message:"",auto_refresh:t.auto_refresh,zoom:t.zoom,padding:t.padding??"",spacing:t.spacing??"",pin:t.pin??"",pin_timeout:t.pin_timeout,disabled:!!t.disabled,fab:!!t.fab,pip:!!t.pip,keep_awake:!!t.keep_awake,card_size:t.card_size,hold_action:t.hold_action,double_tap_action:t.double_tap_action,badge_action:t.badge_action,tap_action:t.tap_action,enter_action:t.enter_action,leave_action:t.leave_action}}_toolButton(t,e,o,i){return st`<ha-button class=${t} @click=${i}>
      <ha-svg-icon slot="start" .path=${e}></ha-svg-icon>
      <ha-svg-icon slot="icon" .path=${e}></ha-svg-icon>
      ${o}
    </ha-button>`}_renderTabsBody(t){const e=this._config,o=t.length>0;return st`
      ${this._haPreview?ct:this._renderPreviewStrip()}
      ${this._warnings().map(t=>st`<div class="editor-warning" role="alert">⚠️ ${t}</div>`)}
      ${this._selecting?this._renderBulk():ct}
      <ha-sortable handle-selector=".drag-handle" .disabled=${o} @item-moved=${this._onItemMoved}>
        <div class="tabs">
          ${e.tabs.map((e,i)=>o&&!this._tabMatches(e,i,t)?st`<div class="tab filtered" hidden></div>`:this._renderTabRow(e,i))}
        </div>
      </ha-sortable>
      <div class="add-row">
        ${this._toolButton("add-tab","M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",this._t("editor.add_tab"),()=>this._addTab())}
        ${this._toolButton("rooms-tab","M7.5,5.6L5,7L6.4,4.5L5,2L7.5,3.4L10,2L8.6,4.5L10,7L7.5,5.6M19.5,15.4L22,14L20.6,16.5L22,19L19.5,17.6L17,19L18.4,16.5L17,14L19.5,15.4M22,2L20.6,4.5L22,7L19.5,5.6L17,7L18.4,4.5L17,2L19.5,3.4L22,2M13.34,12.78L15.78,10.34L13.66,8.22L11.22,10.66L13.34,12.78M14.37,7.29L16.71,9.63C17.1,10 17.1,10.65 16.71,11.04L5.04,22.71C4.65,23.1 4,23.1 3.63,22.71L1.29,20.37C0.9,20 0.9,19.35 1.29,18.96L12.96,7.29C13.35,6.9 14,6.9 14.37,7.29Z",this._t("rooms.button"),()=>{this._toggleRooms()})}
        ${e.tabs.length>1?st`${this._toolButton("select-tabs","M20,16V4H8V16H20M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z",this._t("editor.bulk.select"),()=>this._toggleSelecting())}
              <span class="bulk-controls">
                <button class="expand-all" @click=${this._expandAll}>${this._t("editor.expand_all")}</button>
                <button class="collapse-all" @click=${this._collapseAll}>${this._t("editor.collapse_all")}</button>
              </span>`:ct}
      </div>
      ${this._roomsOpen?this._renderRooms():ct}
    `}_renderFieldRows(t,e,o,i){return st`${i.map(t=>st`<div class="row ${this._flashField===t?"flash":""}" data-field=${t}>
        <ha-form
          class="globals-form"
          .hass=${this.hass}
          .data=${o}
          .schema=${[e.get(t)]}
          .computeLabel=${this._computeGlobalLabel}
          .computeHelper=${this._computeGlobalHelper}
          @value-changed=${this._onGlobalChanged}
        ></ha-form>
      </div>`)}${"adv"===t.id?this._renderTools():ct}`}_renderTools(){return st`<div class="add-row tools">
        ${this._toolButton("import-tab","M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z",this._t("editor.import_tab"),()=>this._toggleImport())}
        ${this._toolButton("starter-tab","M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74",this._t("starter.button"),()=>this._toggleStarter())}
        ${this._toolButton("convert-tab","M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z",this._t("convert.button"),()=>this._toggleConvert())}
        ${this._toolButton("style-import-tab","M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z",this._t("style_import.button"),()=>this._toggleStyleImport())}
        ${this._toolButton("export-view","M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z",this._t("export.button"),()=>this._toggleExport())}
      </div>
      ${this._convertOpen?this._renderConvert():ct}
      ${this._exportOpen?this._renderExport():ct}
      ${this._starterOpen?this._renderStarter():ct}
      ${this._importOpen?this._renderImport():ct}
      ${this._styleOpen?this._renderStyleImport():ct}`}_renderListView(){const t=this._config,e=Vo(this._raw??this._forOutput(t)),o=ia(this._query).split(/\s+/).filter(Boolean);const i=o.length>0,a=new Map(this._globalSchema().map(t=>[t.name,t])),r=this._dataFor(t),n=this._dataFor(co({type:t.type,tabs:t.tabs},{expand:!1}));let s=0;const c=this._t("editor.section.tabs"),l=!i||aa(c,o)||t.tabs.some((t,e)=>this._tabMatches(t,e,o)),h=ta.map(t=>{const e=this._t(`editor.section.${t.id}`),d=i&&!aa(e,o)?t.fields.filter(t=>aa(this._fieldText(a.get(t)),o)):t.fields;if(!d.length)return ct;s++;const c=ra(r,n,t.fields);return this._renderSection(t.id,t.icon,e,this._sectionSummary(t,a,r,c),c.length>0,this._isOpen(t.id,i),()=>this._renderFieldRows(t,a,r,d))});return l&&s++,st`
      <div class="editor">
        ${this._renderStatusLine(e)}
        ${this._statusOpen?st`<div class="status-body">${this._renderSummary()}${this._renderLint(e)}${this._renderWhatsNew()}</div>`:ct}
        <label class="search">
          <ha-svg-icon .path=${"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"}></ha-svg-icon>
          <input
            class="search-input"
            type="search"
            .value=${this._query}
            placeholder=${this._t("editor.search.placeholder")}
            aria-label=${this._t("editor.search.placeholder")}
            @input=${t=>this._onSearch(t.target.value)}
          />
          ${this._query?st`<ha-icon-button class="search-clear" .label=${this._t("editor.search.clear")} .path=${_a} @click=${()=>this._onSearch("")}></ha-icon-button>`:ct}
        </label>
        ${l?this._renderSection(ea,"mdi:tab",c,p(d(this._hass),"editor.status.tabs",t.tabs.length),!1,this._isOpen(ea,i),()=>this._renderTabsBody(i&&!aa(c,o)?o:[])):ct}
        ${h}
        ${0===s?st`<div class="search-none" role="status">${this._t("editor.search.none")}</div>`:ct}
        ${this._status?st`<div class="editor-status" role="status">${this._status}</div>`:ct}
      </div>
    `}static{this.styles=x`
    ${Si}
    /* Arrows point the reading way in right-to-left languages. */
    :host(:dir(rtl)) .flip {
      display: inline-block;
      transform: scaleX(-1);
    }
    .whats-new {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 4px 10px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      font-size: 13px;
      --mdc-icon-button-size: 32px;
    }
    .whats-new-icon {
      flex-shrink: 0;
      color: var(--primary-color);
      margin-top: 2px;
    }
    .whats-new-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .whats-new-text a {
      color: var(--primary-color);
      align-self: flex-start;
    }
    .whats-new-close {
      flex-shrink: 0;
      margin-top: -6px;
    }
    .summary-box,
    .lint {
      font-size: 13px;
    }
    .status-head {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .summary-box p {
      margin: 6px 0 2px;
      line-height: 1.45;
    }
    .lint ul {
      list-style: none;
      margin: 6px 0 2px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .lint-note {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 8px;
      --mdc-icon-size: 18px;
    }
    .lint-note span {
      flex: 1;
    }
    .lint-go {
      flex-shrink: 0;
      background: none;
      border: none;
      padding: 0 4px;
      color: var(--primary-color);
      font: inherit;
      font-weight: 500;
    }
    .lint-note ha-svg-icon {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
    }
    .lint-note.warn {
      background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent);
    }
    .lint-note.info {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .lint-note.perf {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    }
    .history {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 2px;
      margin-bottom: 4px;
      background: var(--ha-dialog-surface-background, var(--mdc-theme-surface, var(--card-background-color, #fff)));
      --mdc-icon-button-size: 36px;
    }
    .history-note {
      margin-inline-end: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-status {
      display: contents;
    }
    .chip {
      flex-shrink: 0;
      font-size: 11px;
      line-height: 18px;
      padding: 0 8px;
      border-radius: 9px;
      white-space: nowrap;
    }
    .chip-hidden {
      background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent);
      color: var(--secondary-text-color);
    }
    .chip-alert {
      background: color-mix(in srgb, var(--error-color, #db4437) 18%, transparent);
      color: var(--error-color, #db4437);
    }
    .check-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-inline-start: 6px;
      vertical-align: middle;
    }
    .check-dot.met {
      background: var(--success-color, #43a047);
    }
    .check-dot.unmet {
      background: var(--secondary-text-color);
    }
    .check {
      font-size: 13px;
      padding: 8px 10px;
      margin-bottom: 8px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .check-head {
      font-weight: 500;
      margin-bottom: 4px;
    }
    .check-list {
      list-style: none;
      margin: 0;
      padding-inline-start: 4px;
    }
    .check-list .check-list {
      padding-inline-start: 18px;
    }
    .check-item {
      padding: 2px 0;
    }
    .check-mark {
      font-size: 11px;
      margin-inline-end: 4px;
    }
    .check-text {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .add-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding-top: 8px;
    }
    .editor-status {
      position: sticky;
      bottom: 0;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
      box-shadow: 0 -1px 0 var(--divider-color, #e0e0e0);
    }
    .import-panel {
      margin-top: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 10px;
    }
    .import-hint {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    textarea.import-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
    }
    .import-error {
      color: var(--error-color, #db4437);
      font-size: 13px;
      margin-top: 6px;
    }
    .import-actions {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }
    .convert-summary {
      margin-top: 8px;
      font-size: 13px;
    }
    .convert-tabs {
      margin: 6px 0;
      padding-inline-start: 18px;
    }
    .convert-tabs ha-icon {
      --mdc-icon-size: 16px;
      margin-inline-end: 6px;
      color: var(--secondary-text-color);
    }
    .convert-note {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
    .editor-status {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .conditions-section {
      margin: 8px 0;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 6px 10px;
    }
    .conditions-section summary {
      cursor: pointer;
      font-weight: 500;
      padding: 4px 0;
    }
    .conditions-hint {
      font-weight: 400;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-inline-start: 6px;
    }
    .conditions-section[open] summary {
      margin-bottom: 8px;
    }
    textarea.conditions-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .status-line {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      width: 100%;
      padding: 6px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      text-align: start;
      --mdc-icon-size: 16px;
    }
    .schip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px;
      border-radius: 99px;
      background: var(--secondary-background-color, #f5f5f5);
      font-size: 12px;
    }
    .schip ha-svg-icon {
      width: 16px;
      height: 16px;
    }
    .schip.warn {
      background: color-mix(in srgb, var(--warning-color, #ffa600) 20%, transparent);
    }
    .schip.new {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      color: var(--primary-color);
    }
    .status-chevron {
      margin-inline-start: auto;
      color: var(--secondary-text-color);
      transition: transform 0.2s;
    }
    .status-line.open .status-chevron {
      transform: rotate(180deg);
    }
    .status-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
    }
    .search {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 4px 0 12px;
      min-height: 40px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--secondary-text-color);
      --mdc-icon-button-size: 32px;
    }
    .search-input {
      flex: 1;
      min-width: 0;
      border: 0;
      outline: none;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
    }
    .search-input::-webkit-search-cancel-button {
      display: none;
    }
    .search-none {
      padding: 8px 2px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    ha-expansion-panel.section {
      --expansion-panel-summary-padding: 0 12px;
      --expansion-panel-content-padding: 0 12px 8px;
      border-radius: 12px;
    }
    .section ha-icon[slot="leading-icon"] {
      margin-inline-end: 12px;
      color: var(--secondary-text-color);
    }
    .section-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      font-weight: 500;
    }
    .section-summary {
      font-weight: 400;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .dot {
      flex-shrink: 0;
      width: 8px;
      height: 8px;
      margin: 0 8px;
      border-radius: 50%;
      background: var(--primary-color);
    }
    .row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 44px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      scroll-margin: 48px;
    }
    .row:first-child {
      border-top: 0;
    }
    .row > ha-form {
      display: block;
    }
    .row.flash,
    .tab.flash {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 4px;
      transition: outline-color 0.3s;
    }
    .preview {
      border: 1px dashed var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 8px;
      margin-bottom: 8px;
    }
    .preview-label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
    }
    .tabs {
      display: flex;
      flex-direction: column;
    }
    .tab {
      /* Clear of the pinned undo bar when scrolled to. */
      scroll-margin-top: 48px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .tab:first-child {
      border-top: 0;
    }
    .tab-header {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 46px;
      cursor: pointer;
      border-radius: 8px;
      user-select: none;
    }
    .tab-header:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .tab-header:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 0;
    }
    .drag-handle {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      cursor: grab;
    }
    .drag-handle:active {
      cursor: grabbing;
    }
    .editor-warning {
      padding: 8px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .expand-chevron {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      transition: transform 0.2s ease;
      padding: 0 4px;
    }
    .tab.expanded .expand-chevron {
      transform: rotate(180deg);
    }
    .tab-icon {
      flex-shrink: 0;
      color: var(--secondary-text-color);
    }
    .tab-title {
      min-width: 3em;
      flex: 0 1 auto;
      font-size: 15px;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tag {
      flex-shrink: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .tab-type {
      margin-inline-end: auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-controls {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-inline-start: auto;
      --mdc-icon-button-size: 36px;
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .tab-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 4px 4px 16px;
    }
    .tab-actions {
      display: flex;
      align-items: center;
      margin: -4px 0 -12px;
      --mdc-icon-button-size: 36px;
    }
    .delete-tab {
      color: var(--error-color, #db4437);
    }
    .edit-card {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      font-size: 14px;
      text-align: start;
    }
    .edit-card:hover {
      background: var(--divider-color, #e0e0e0);
    }
    .edit-card-type {
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .edit-card-arrow {
      margin-inline-start: auto;
      color: var(--secondary-text-color);
    }
    .room-list {
      list-style: none;
      margin: 0 0 4px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .room {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 8px;
      cursor: pointer;
      --mdc-icon-size: 20px;
    }
    .room.on {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .room input {
      width: 18px;
      height: 18px;
      margin: 0;
      accent-color: var(--primary-color);
    }
    .room ha-icon {
      color: var(--secondary-text-color);
    }
    .room-count {
      margin-inline-start: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .icon-suggest {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
      margin: -8px 0;
    }
    .icon-suggest-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-inline-end: 4px;
    }
    .icon-choice {
      display: inline-flex;
      padding: 6px;
      border: none;
      border-radius: 8px;
      background: none;
      color: var(--primary-text-color);
      --mdc-icon-size: 22px;
    }
    .icon-choice:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .icon-choice.on {
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      color: var(--primary-color);
    }
    .tab.picked {
      background: color-mix(in srgb, var(--primary-color) 10%, var(--card-background-color, #fff));
    }
    input.pick {
      width: 18px;
      height: 18px;
      margin: 0;
      flex-shrink: 0;
      accent-color: var(--primary-color);
      cursor: pointer;
    }
    .bulk-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .bulk-count {
      font-weight: 500;
      margin-inline-end: auto;
    }
    .bulk-head button,
    .select-tabs[aria-pressed="true"] {
      font-weight: 500;
    }
    .bulk-head button {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 13px;
    }
    .bulk-controls {
      display: flex;
      gap: 4px;
      margin-inline-start: auto;
    }
    .bulk-controls button {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 13px;
      padding: 4px 6px;
    }
    .card-editor-view {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .card-editor-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .card-editor-title {
      font-weight: 500;
    }
    .back-to-list,
    .change-card-type {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      color: var(--primary-text-color);
      background: none;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      font-size: 14px;
    }
    .change-card-type {
      margin-inline-start: auto;
      color: var(--primary-color);
    }
    .card-type-chooser {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .card-type-hint {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .card-type-hint code {
      font-family: var(--code-font-family, monospace);
    }
    .card-label {
      font-size: 12px;
      gap: 4px;
    }
    .tab-card-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-card-error {
      color: var(--error-color, #b00020);
      font-size: 12px;
    }
    button {
      cursor: pointer;
    }
  `}};Ci([Tt()],Aa.prototype,"_config",void 0),Ci([Tt()],Aa.prototype,"_editingTab",void 0),Ci([Tt()],Aa.prototype,"_cardError",void 0),Ci([Tt()],Aa.prototype,"_expanded",void 0),Ci([Tt()],Aa.prototype,"_importOpen",void 0),Ci([Tt()],Aa.prototype,"_styleOpen",void 0),Ci([Tt()],Aa.prototype,"_styleErrors",void 0),Ci([Tt()],Aa.prototype,"_importError",void 0),Ci([Tt()],Aa.prototype,"_starterOpen",void 0),Ci([Tt()],Aa.prototype,"_starterKind",void 0),Ci([Tt()],Aa.prototype,"_convertOpen",void 0),Ci([Tt()],Aa.prototype,"_exportOpen",void 0),Ci([Tt()],Aa.prototype,"_convertResult",void 0),Ci([Tt()],Aa.prototype,"_convertError",void 0),Ci([Tt()],Aa.prototype,"_note",void 0),Ci([Tt()],Aa.prototype,"_roomsOpen",void 0),Ci([Tt()],Aa.prototype,"_rooms",void 0),Ci([Tt()],Aa.prototype,"_roomPick",void 0),Ci([Tt()],Aa.prototype,"_instantBusy",void 0),Ci([Tt()],Aa.prototype,"_instantDone",void 0),Ci([Tt()],Aa.prototype,"_instantError",void 0),Ci([Tt()],Aa.prototype,"_selecting",void 0),Ci([Tt()],Aa.prototype,"_picked",void 0),Ci([Tt()],Aa.prototype,"_flashTab",void 0),Ci([Tt()],Aa.prototype,"_previewSelected",void 0),Ci([Tt()],Aa.prototype,"_open",void 0),Ci([Tt()],Aa.prototype,"_query",void 0),Ci([Tt()],Aa.prototype,"_searchClosed",void 0),Ci([Tt()],Aa.prototype,"_statusOpen",void 0),Ci([Tt()],Aa.prototype,"_haPreview",void 0),Ci([Tt()],Aa.prototype,"_flashField",void 0),Ci([Tt()],Aa.prototype,"_status",void 0),Ci([Tt()],Aa.prototype,"_undoNote",void 0),Aa=Ci([(t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("tabdeck-card-editor")],Aa);export{Aa as TabdeckCardEditor,$a as pickCardEditorTag};