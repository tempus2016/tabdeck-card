/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$3 = globalThis, e$2 = t$3.ShadowRoot && (void 0 === t$3.ShadyCSS || t$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$5 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$3 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$3.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$5(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$4, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$1(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$4(t3), ...o$3(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, h2) {
    var _a2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i2 ?? (i2 = r2.getPropertyOptions(t2)), !((i2.hasChanged ?? f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null ? void 0 : p$1({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = globalThis, i$1 = (t2) => t2, s$1 = t$2.trustedTypes, e = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$2, r$3 = `<${n$1}>`, l = document, c = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i2) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e ? e.createHTML(i2) : i2;
}
const N = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = v;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$3 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$2 + x2) : s3 + o$2 + (-2 === d2 ? i3 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i2);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i3 = v2[a2++], s2 = r2.getAttribute(t3).split(o$2), e3 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$2) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$2), i3 = t3.length - 1;
          if (i3 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++) r2.append(t3[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i3], c());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$1) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$2, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$2.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === E) return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = a(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = M(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class R {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? l).importNode(i2, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new Z(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class k {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = M(this, t2, i2), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = C.get(t2.strings);
    return void 0 === i2 && C.set(t2.strings, i2 = new S(t2)), i2;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$1(t2).nextSibling;
      i$1(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i2, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i2, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = M(this, t2, i2, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const B = t$2.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), (t$2.litHtmlVersions ?? (t$2.litHtmlVersions = [])).push("3.3.3");
const D = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new k(i2.insertBefore(c(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
}
i._$litElement$ = true, i["finalized"] = true, (_a = s.litElementHydrateSupport) == null ? void 0 : _a.call(s, { LitElement: i });
const o$1 = s.litElementPolyfillSupport;
o$1 == null ? void 0 : o$1({ LitElement: i });
(s.litElementVersions ?? (s.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$2 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$2(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r$1(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
const POSITIONS = ["top", "bottom", "left", "right"];
const STYLES = ["underline", "pill", "segmented"];
const REMEMBER = ["none", "browser", "url"];
function pick(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}
function normalizeTab(raw) {
  const attrs = (raw == null ? void 0 : raw.attributes) ?? {};
  return {
    name: (raw == null ? void 0 : raw.name) ?? attrs.label ?? void 0,
    icon: (raw == null ? void 0 : raw.icon) ?? attrs.icon ?? void 0,
    accent: (raw == null ? void 0 : raw.accent) ?? void 0,
    badge: (raw == null ? void 0 : raw.badge) ?? void 0,
    visibility: (raw == null ? void 0 : raw.visibility) ?? void 0,
    card: (raw == null ? void 0 : raw.card) ?? {}
  };
}
function normalizeConfig(raw) {
  var _a2;
  const tabs = Array.isArray(raw == null ? void 0 : raw.tabs) ? raw.tabs : [];
  if (tabs.length === 0) {
    throw new Error("tabdeck-card: you must define at least one tab.");
  }
  const defaultTab = (raw == null ? void 0 : raw.default_tab) ?? ((_a2 = raw == null ? void 0 : raw.options) == null ? void 0 : _a2.defaultTabIndex) ?? 0;
  return {
    type: (raw == null ? void 0 : raw.type) ?? "custom:tabdeck-card",
    default_tab: defaultTab,
    position: pick(raw == null ? void 0 : raw.position, POSITIONS, "top"),
    style: pick(raw == null ? void 0 : raw.style, STYLES, "underline"),
    scrollable: (raw == null ? void 0 : raw.scrollable) === void 0 ? "auto" : raw.scrollable,
    remember: pick(raw == null ? void 0 : raw.remember, REMEMBER, "none"),
    lazy: Boolean(raw == null ? void 0 : raw.lazy),
    swipe: Boolean(raw == null ? void 0 : raw.swipe),
    styles: (raw == null ? void 0 : raw.styles) ?? {},
    tabs: tabs.map(normalizeTab)
  };
}
function resolveDefaultIndex(cfg) {
  const dt = cfg.default_tab;
  if (typeof dt === "string") {
    const i2 = cfg.tabs.findIndex((t2) => t2.name === dt);
    return i2 >= 0 ? i2 : 0;
  }
  if (typeof dt === "number" && dt >= 0 && dt < cfg.tabs.length) return dt;
  return 0;
}
function checkState(c2, hass) {
  const stateObj = hass.states[c2.entity];
  if (!stateObj) return false;
  const current = stateObj.state;
  if (Array.isArray(c2.state)) return c2.state.includes(current);
  if (c2.state !== void 0) return current === c2.state;
  if (c2.state_not !== void 0) {
    return Array.isArray(c2.state_not) ? !c2.state_not.includes(current) : current !== c2.state_not;
  }
  return false;
}
function checkNumeric(c2, hass) {
  const stateObj = hass.states[c2.entity];
  if (!stateObj) return false;
  const value = Number(stateObj.state);
  if (Number.isNaN(value)) return false;
  if (c2.above !== void 0 && !(value > Number(c2.above))) return false;
  if (c2.below !== void 0 && !(value < Number(c2.below))) return false;
  return c2.above !== void 0 || c2.below !== void 0;
}
function checkScreen(c2) {
  if (!c2.media_query || typeof matchMedia !== "function") return false;
  return matchMedia(c2.media_query).matches;
}
function checkTemplate(c2, resolver) {
  if (!resolver || !c2.value_template) return false;
  return resolver(c2.value_template) === true;
}
function checkOne(c2, hass, resolver) {
  switch (c2 == null ? void 0 : c2.condition) {
    case "state":
      return checkState(c2, hass);
    case "numeric_state":
      return checkNumeric(c2, hass);
    case "screen":
      return checkScreen(c2);
    case "template":
      return checkTemplate(c2, resolver);
    default:
      return false;
  }
}
function isTabVisible(visibility, hass, templateResolver) {
  if (!visibility || visibility.length === 0) return true;
  if (!hass) return true;
  return visibility.every((c2) => checkOne(c2, hass, templateResolver));
}
function storageKey(cardKey) {
  return "tabdeck-card:" + cardKey;
}
function clamp(i2, count, fallback) {
  return i2 >= 0 && i2 < count ? i2 : fallback;
}
function parseHashIndex(hash, tabNames) {
  const m2 = /(?:^|[#&])tab=([^&]+)/.exec(hash || "");
  if (!m2) return null;
  const value = decodeURIComponent(m2[1]);
  const byName = tabNames.indexOf(value);
  if (byName >= 0) return byName;
  const n3 = Number(value);
  if (Number.isInteger(n3) && n3 >= 0) return n3;
  return null;
}
function loadInitialIndex(opts) {
  const { mode, cardKey, defaultIndex, tabCount } = opts;
  if (mode === "url") {
    const idx = parseHashIndex(opts.hash ?? "", opts.tabNames ?? []);
    if (idx !== null) return clamp(idx, tabCount, defaultIndex);
  }
  if (mode === "browser") {
    const store = opts.storage ?? globalThis.localStorage;
    const raw = store == null ? void 0 : store.getItem(storageKey(cardKey));
    if (raw !== null && raw !== void 0) {
      return clamp(Number(raw), tabCount, defaultIndex);
    }
  }
  return clamp(defaultIndex, tabCount, 0);
}
function persistIndex(opts) {
  if (opts.mode === "browser") {
    const store = opts.storage ?? globalThis.localStorage;
    store == null ? void 0 : store.setItem(storageKey(opts.cardKey), String(opts.index));
    return {};
  }
  if (opts.mode === "url") {
    const value = opts.tabName ? opts.tabName : String(opts.index);
    return { hash: "#tab=" + value };
  }
  return {};
}
async function getCreateCardElement() {
  const helpers = await window.loadCardHelpers();
  return (config) => helpers.createCardElement(config);
}
class CardManager extends EventTarget {
  constructor(create) {
    super();
    this._configs = [];
    this._elements = [];
    this._create = create;
  }
  async build(configs) {
    this._configs = configs.slice();
    this._elements = configs.map((cfg, index) => this._make(cfg, index));
  }
  _make(config, index) {
    const el = this._create(config);
    if (this._hass) el.hass = this._hass;
    el.addEventListener("ll-rebuild", (e2) => {
      e2.stopPropagation();
      void this._rebuild(index);
    });
    return el;
  }
  get(index) {
    return this._elements[index];
  }
  all() {
    return this._elements;
  }
  setHass(hass) {
    this._hass = hass;
    for (const el of this._elements) if (el) el.hass = hass;
  }
  notifyVisible(index) {
    const el = this._elements[index];
    if (el) el.dispatchEvent(new Event("resize"));
  }
  async _rebuild(index) {
    const fresh = this._make(this._configs[index], index);
    if (this._hass) fresh.hass = this._hass;
    this._elements[index] = fresh;
    this.dispatchEvent(new CustomEvent("ll-rebuild-done", { detail: { index } }));
  }
}
function isTemplate(s2) {
  return !!s2 && (s2.includes("{{") || s2.includes("{%"));
}
function asBool(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    return ["1", "true", "yes", "on", "enable"].includes(value.trim().toLowerCase());
  }
  return false;
}
class TemplateRenderer extends EventTarget {
  constructor(subscribe) {
    super();
    this._entries = /* @__PURE__ */ new Map();
    this._subscribe = subscribe;
  }
  // Reconcile live subscriptions with the desired set of template strings.
  track(templates) {
    const desired = new Set(templates.filter((t2) => !!t2));
    for (const [tpl, entry] of this._entries) {
      if (!desired.has(tpl)) {
        entry.unsub();
        this._entries.delete(tpl);
      }
    }
    for (const tpl of desired) {
      if (this._entries.has(tpl)) continue;
      const entry = { unsub: () => {
      }, hasResult: false, error: false };
      this._entries.set(tpl, entry);
      entry.unsub = this._subscribe(
        tpl,
        (result) => {
          entry.result = result;
          entry.hasResult = true;
          entry.error = false;
          this.dispatchEvent(new CustomEvent("change", { detail: { template: tpl } }));
        },
        () => {
          entry.error = true;
          entry.hasResult = false;
          entry.result = void 0;
          this.dispatchEvent(new CustomEvent("change", { detail: { template: tpl } }));
        }
      );
    }
  }
  // Latest rendered value, or undefined while pending or errored.
  result(tpl) {
    const e2 = this._entries.get(tpl);
    if (!e2 || e2.error || !e2.hasResult) return void 0;
    return e2.result;
  }
  // Fail-closed boolean: false until a truthy value has rendered.
  boolean(tpl) {
    const e2 = this._entries.get(tpl);
    if (!e2 || e2.error || !e2.hasResult) return false;
    return asBool(e2.result);
  }
  destroy() {
    for (const e2 of this._entries.values()) e2.unsub();
    this._entries.clear();
  }
}
function detectSwipe(start, end, opts = {}) {
  const minDistance = opts.minDistance ?? 50;
  const maxDuration = opts.maxDuration ?? 800;
  const ratio = opts.ratio ?? 1.5;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dt = end.t - start.t;
  if (dt > maxDuration) return null;
  if (Math.abs(dx) < minDistance) return null;
  if (Math.abs(dx) < Math.abs(dy) * ratio) return null;
  return dx < 0 ? "next" : "prev";
}
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let TabdeckTab = class extends i {
  constructor() {
    super(...arguments);
    this.selected = false;
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
  }
  updated() {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
    this.tabIndex = this.selected ? 0 : -1;
    if (this.accent) this.style.setProperty("--tabdeck-accent", this.accent);
  }
  render() {
    return b`
      <div class="inner">
        ${this.icon ? b`<ha-icon icon=${this.icon}></ha-icon>` : A}
        ${this.label ? b`<span class="label">${this.label}</span>` : A}
        ${this.badge ? b`<span class="badge">${this.badge}</span>` : A}
      </div>
    `;
  }
};
TabdeckTab.styles = i$3`
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 16px;
      height: var(--tabdeck-tab-height, 48px);
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: var(--tabdeck-tab-font-size, 14px);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      user-select: none;
      white-space: nowrap;
      outline: none;
      transition: color 120ms ease;
    }
    :host([selected]) {
      color: var(--tabdeck-accent, var(--primary-color));
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    :host(:focus-visible) {
      box-shadow: inset 0 0 0 2px var(--tabdeck-accent, var(--primary-color));
      border-radius: 6px;
    }
    .inner {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    .badge {
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      background: var(--tabdeck-accent, var(--primary-color));
      color: var(--text-primary-color, #fff);
      font-size: 11px;
      line-height: 18px;
      text-align: center;
    }
  `;
__decorateClass$3([
  n2()
], TabdeckTab.prototype, "label", 2);
__decorateClass$3([
  n2()
], TabdeckTab.prototype, "icon", 2);
__decorateClass$3([
  n2()
], TabdeckTab.prototype, "badge", 2);
__decorateClass$3([
  n2()
], TabdeckTab.prototype, "accent", 2);
__decorateClass$3([
  n2({ type: Boolean, reflect: true })
], TabdeckTab.prototype, "selected", 2);
__decorateClass$3([
  n2({ type: Boolean, reflect: true })
], TabdeckTab.prototype, "disabled", 2);
TabdeckTab = __decorateClass$3([
  t$1("tabdeck-tab")
], TabdeckTab);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let TabdeckTabbar = class extends i {
  constructor() {
    super(...arguments);
    this.items = [];
    this.selected = 0;
    this.position = "top";
    this.tabStyle = "underline";
    this.scrollable = "auto";
    this._onKeydown = (e2) => {
      const last = this.items.length - 1;
      const vertical = this.position === "left" || this.position === "right";
      const next = vertical ? "ArrowDown" : "ArrowRight";
      const prev = vertical ? "ArrowUp" : "ArrowLeft";
      let target = null;
      if (e2.key === next) target = this.selected >= last ? 0 : this.selected + 1;
      else if (e2.key === prev) target = this.selected <= 0 ? last : this.selected - 1;
      else if (e2.key === "Home") target = 0;
      else if (e2.key === "End") target = last;
      if (target !== null) {
        e2.preventDefault();
        this._select(target);
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.addEventListener("keydown", this._onKeydown);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeydown);
    super.disconnectedCallback();
  }
  _select(index) {
    this.dispatchEvent(
      new CustomEvent("tabdeck-select", {
        detail: { index },
        bubbles: true,
        composed: true
      })
    );
  }
  render() {
    return b`
      <div class="bar ${this.position} style-${this.tabStyle}" part="bar">
        ${this.items.map(
      (item, index) => b`
            <tabdeck-tab
              .label=${item.name}
              .icon=${item.icon}
              .badge=${item.badge}
              .accent=${item.accent}
              .selected=${index === this.selected}
              aria-controls="tabdeck-panel"
              @click=${() => this._select(index)}
            ></tabdeck-tab>
          `
    )}
      </div>
    `;
  }
};
TabdeckTabbar.styles = i$3`
    :host {
      display: block;
    }
    .bar {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color);
      position: relative;
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
      border-right: 1px solid var(--divider-color);
    }
    .bar.right {
      border-left: 1px solid var(--divider-color);
    }
    .bar.style-underline tabdeck-tab[selected] {
      box-shadow: inset 0 -3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-pill {
      gap: 6px;
      border: none;
      padding: 6px;
    }
    .bar.style-pill tabdeck-tab {
      border-radius: 999px;
    }
    .bar.style-pill tabdeck-tab[selected] {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
    }
    .bar.style-segmented {
      gap: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 4px;
    }
    .bar.style-segmented tabdeck-tab[selected] {
      background: var(--card-background-color);
      border-radius: 7px;
    }
    @media (prefers-reduced-motion: no-preference) {
      tabdeck-tab {
        transition: background 150ms ease, box-shadow 150ms ease;
      }
    }
  `;
__decorateClass$2([
  n2({ attribute: false })
], TabdeckTabbar.prototype, "items", 2);
__decorateClass$2([
  n2({ type: Number })
], TabdeckTabbar.prototype, "selected", 2);
__decorateClass$2([
  n2()
], TabdeckTabbar.prototype, "position", 2);
__decorateClass$2([
  n2()
], TabdeckTabbar.prototype, "tabStyle", 2);
__decorateClass$2([
  n2()
], TabdeckTabbar.prototype, "scrollable", 2);
TabdeckTabbar = __decorateClass$2([
  t$1("tabdeck-tabbar")
], TabdeckTabbar);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let TabdeckCard = class extends i {
  constructor() {
    super(...arguments);
    this._selected = 0;
    this._built = false;
    this._cardKey = "";
    this._templateResolver = (tpl) => {
      var _a2;
      return (_a2 = this._templates) == null ? void 0 : _a2.boolean(tpl);
    };
    this._onTouchStart = (e2) => {
      var _a2;
      if (!((_a2 = this._config) == null ? void 0 : _a2.swipe) || e2.touches.length !== 1) {
        this._touchStart = void 0;
        return;
      }
      const t2 = e2.touches[0];
      this._touchStart = { x: t2.clientX, y: t2.clientY, t: e2.timeStamp };
    };
    this._onTouchEnd = (e2) => {
      var _a2;
      const start = this._touchStart;
      this._touchStart = void 0;
      if (!start || !((_a2 = this._config) == null ? void 0 : _a2.swipe)) return;
      const t2 = e2.changedTouches[0];
      if (!t2) return;
      const dir = detectSwipe(start, { x: t2.clientX, y: t2.clientY, t: e2.timeStamp });
      if (!dir) return;
      const last = this._visibleTabs().length - 1;
      const target = dir === "next" ? this._selected + 1 : this._selected - 1;
      const clamped = Math.max(0, Math.min(last, target));
      if (clamped !== this._selected) this._selectIndex(clamped);
    };
  }
  static getStubConfig() {
    return {
      tabs: [
        { name: "Tab 1", icon: "mdi:numeric-1-box", card: { type: "markdown", content: "Tab 1" } },
        { name: "Tab 2", icon: "mdi:numeric-2-box", card: { type: "markdown", content: "Tab 2" } }
      ]
    };
  }
  static async getConfigElement() {
    await Promise.resolve().then(() => tabdeckCardEditor);
    return document.createElement("tabdeck-card-editor");
  }
  setConfig(raw) {
    var _a2;
    this._config = normalizeConfig(raw);
    this._cardKey = this._computeCardKey(this._config);
    this._built = false;
    this._selected = resolveDefaultIndex(this._config);
    (_a2 = this._templates) == null ? void 0 : _a2.destroy();
    this._templates = void 0;
    void this._build();
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this._templates) == null ? void 0 : _a2.destroy();
    this._templates = void 0;
  }
  _computeCardKey(cfg) {
    const path = typeof location !== "undefined" ? location.pathname : "";
    const names = cfg.tabs.map((t2) => t2.name ?? "").join("|");
    return `${path}#${names}`;
  }
  async _build() {
    if (!this._config) return;
    const create = await getCreateCardElement();
    this._manager = new CardManager(create);
    this._manager.addEventListener("ll-rebuild-done", () => this.requestUpdate());
    await this._manager.build(this._config.tabs.map((t2) => t2.card));
    if (this._hass) this._manager.setHass(this._hass);
    this._syncTemplates();
    this._selected = loadInitialIndex({
      mode: this._config.remember,
      cardKey: this._cardKey,
      defaultIndex: resolveDefaultIndex(this._config),
      tabCount: this._visibleTabs().length,
      hash: typeof location !== "undefined" ? location.hash : "",
      tabNames: this._visibleTabs().map((t2) => t2.name ?? "")
    });
    this._built = true;
    this.requestUpdate();
  }
  set hass(hass) {
    var _a2;
    this._hass = hass;
    (_a2 = this._manager) == null ? void 0 : _a2.setHass(hass);
    this._syncTemplates();
    this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  _visibleTabs() {
    if (!this._config) return [];
    return this._config.tabs.filter(
      (t2) => isTabVisible(t2.visibility, this._hass, this._templateResolver)
    );
  }
  _collectTemplates() {
    if (!this._config) return [];
    const out = [];
    for (const t2 of this._config.tabs) {
      if (isTemplate(t2.badge)) out.push(t2.badge);
      for (const c2 of t2.visibility ?? []) {
        if ((c2 == null ? void 0 : c2.condition) === "template" && c2.value_template) out.push(c2.value_template);
      }
    }
    return out;
  }
  _makeSubscribe() {
    var _a2, _b;
    if (!((_b = (_a2 = this._hass) == null ? void 0 : _a2.connection) == null ? void 0 : _b.subscribeMessage)) return void 0;
    return (template, onResult, onError) => {
      var _a3;
      const conn = (_a3 = this._hass) == null ? void 0 : _a3.connection;
      if (!(conn == null ? void 0 : conn.subscribeMessage)) {
        onError();
        return () => {
        };
      }
      let unsubbed = false;
      let realUnsub;
      Promise.resolve(
        conn.subscribeMessage(
          (msg) => {
            if (msg && msg.error !== void 0) onError();
            else onResult(msg == null ? void 0 : msg.result);
          },
          { type: "render_template", template, report_errors: true }
        )
      ).then((u2) => {
        realUnsub = u2;
        if (unsubbed) u2 == null ? void 0 : u2();
      }).catch(() => onError());
      return () => {
        unsubbed = true;
        realUnsub == null ? void 0 : realUnsub();
      };
    };
  }
  _syncTemplates() {
    var _a2;
    const templates = this._collectTemplates();
    if (templates.length === 0) {
      (_a2 = this._templates) == null ? void 0 : _a2.destroy();
      this._templates = void 0;
      return;
    }
    if (!this._templates) {
      const subscribe = this._makeSubscribe();
      if (!subscribe) return;
      this._templates = new TemplateRenderer(subscribe);
      this._templates.addEventListener("change", () => this.requestUpdate());
    }
    this._templates.track(templates);
  }
  getCardSize() {
    var _a2;
    const card = (_a2 = this._manager) == null ? void 0 : _a2.get(this._activeOriginalIndex());
    if (card && typeof card.getCardSize === "function") return card.getCardSize();
    return 1;
  }
  getGridOptions() {
    return { columns: "full", rows: "auto" };
  }
  _activeOriginalIndex() {
    const visible = this._visibleTabs();
    const target = visible[this._selected];
    return this._config ? this._config.tabs.indexOf(target) : 0;
  }
  _onSelect(e2) {
    this._selectIndex(e2.detail.index);
  }
  _selectIndex(index) {
    this._selected = index;
    const visible = this._visibleTabs();
    const tab = visible[this._selected];
    if (this._config) {
      const r2 = persistIndex({
        mode: this._config.remember,
        cardKey: this._cardKey,
        index: this._selected,
        tabName: tab == null ? void 0 : tab.name
      });
      if (r2.hash && typeof location !== "undefined") {
        history.replaceState(null, "", r2.hash);
      }
    }
    this.updateComplete.then(
      () => {
        var _a2;
        return (_a2 = this._manager) == null ? void 0 : _a2.notifyVisible(this._activeOriginalIndex());
      }
    );
  }
  updated(changed) {
    super.updated(changed);
    const visible = this._visibleTabs();
    if (this._selected > visible.length - 1) this._selected = 0;
  }
  render() {
    if (!this._config || !this._built) return A;
    const visible = this._visibleTabs();
    const cfg = this._config;
    const bar = b`
      <tabdeck-tabbar
        .items=${visible.map((t2) => ({
      name: t2.name,
      icon: t2.icon,
      accent: t2.accent,
      badge: this._resolveBadge(t2.badge)
    }))}
        .selected=${this._selected}
        .position=${cfg.position}
        .tabStyle=${cfg.style}
        .scrollable=${cfg.scrollable}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `;
    const panels = b`
      <div
        class="content"
        id="tabdeck-panel"
        role="tabpanel"
        @touchstart=${this._onTouchStart}
        @touchend=${this._onTouchEnd}
      >
        ${visible.map((tab, i2) => {
      var _a2;
      const original = cfg.tabs.indexOf(tab);
      return b`
            <div class="panel" ?hidden=${i2 !== this._selected}>
              ${(_a2 = this._manager) == null ? void 0 : _a2.get(original)}
            </div>
          `;
    })}
      </div>
    `;
    return b`
      <div class="root pos-${cfg.position}">
        ${cfg.position === "bottom" ? b`${panels}${bar}` : b`${bar}${panels}`}
      </div>
    `;
  }
  _resolveBadge(badge) {
    var _a2;
    if (!badge) return void 0;
    if (isTemplate(badge)) {
      const r2 = (_a2 = this._templates) == null ? void 0 : _a2.result(badge);
      return r2 === void 0 || r2 === null ? void 0 : String(r2);
    }
    if (!this._hass) return void 0;
    const stateObj = this._hass.states[badge];
    if (stateObj) return stateObj.state;
    return badge;
  }
};
TabdeckCard.styles = i$3`
    :host {
      display: block;
    }
    .root.pos-left,
    .root.pos-right {
      display: flex;
    }
    .root.pos-right {
      flex-direction: row-reverse;
    }
    .content {
      padding-top: 8px;
    }
    .panel[hidden] {
      display: none;
    }
  `;
__decorateClass$1([
  r$1()
], TabdeckCard.prototype, "_config", 2);
__decorateClass$1([
  r$1()
], TabdeckCard.prototype, "_selected", 2);
__decorateClass$1([
  r$1()
], TabdeckCard.prototype, "_built", 2);
TabdeckCard = __decorateClass$1([
  t$1("tabdeck-card")
], TabdeckCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabdeck-card",
  name: "Tabdeck Card",
  description: "Organize multiple cards into a modern tabbed interface.",
  preview: true,
  documentationURL: "https://github.com/tempus2016/tabdeck-card"
});
var t, r;
!function(e2) {
  e2.language = "language", e2.system = "system", e2.comma_decimal = "comma_decimal", e2.decimal_comma = "decimal_comma", e2.space_comma = "space_comma", e2.none = "none";
}(t || (t = {})), function(e2) {
  e2.language = "language", e2.system = "system", e2.am_pm = "12", e2.twenty_four = "24";
}(r || (r = {}));
var ne = function(e2, t2, r2, n3) {
  n3 = n3 || {}, r2 = null == r2 ? {} : r2;
  var i2 = new Event(t2, { bubbles: void 0 === n3.bubbles || n3.bubbles, cancelable: Boolean(n3.cancelable), composed: void 0 === n3.composed || n3.composed });
  return i2.detail = r2, e2.dispatchEvent(i2), i2;
};
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
function pickCardEditorTag(has) {
  if (has("hui-card-element-editor")) return "hui-card-element-editor";
  if (has("ha-yaml-editor")) return "ha-yaml-editor";
  return "textarea-json";
}
let TabdeckCardEditor = class extends i {
  constructor() {
    super(...arguments);
    this._editingTab = null;
    this._cardError = null;
  }
  setConfig(config) {
    this._config = normalizeConfig(config);
  }
  _emit(next) {
    this._config = next;
    ne(this, "config-changed", { config: next });
    this.requestUpdate();
  }
  _patch(partial) {
    if (!this._config) return;
    this._emit({ ...this._config, ...partial });
  }
  _patchTab(index, partial) {
    if (!this._config) return;
    const tabs = this._config.tabs.map(
      (t2, i2) => i2 === index ? { ...t2, ...partial } : t2
    );
    this._emit({ ...this._config, tabs });
  }
  _addTab() {
    if (!this._config) return;
    const tabs = [
      ...this._config.tabs,
      { name: `Tab ${this._config.tabs.length + 1}`, card: { type: "markdown", content: "" } }
    ];
    this._emit({ ...this._config, tabs });
  }
  _deleteTab(index) {
    if (!this._config) return;
    const tabs = this._config.tabs.filter((_2, i2) => i2 !== index);
    this._emit({ ...this._config, tabs });
  }
  _editCardJson(index, raw) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      this._cardError = index;
      return;
    }
    this._cardError = null;
    this._patchTab(index, { card: parsed });
  }
  _move(index, delta) {
    if (!this._config) return;
    const target = index + delta;
    if (target < 0 || target >= this._config.tabs.length) return;
    const tabs = this._config.tabs.slice();
    [tabs[index], tabs[target]] = [tabs[target], tabs[index]];
    this._emit({ ...this._config, tabs });
  }
  _openCard(index) {
    this._cardError = null;
    this._editingTab = index;
  }
  _closeCard() {
    this._editingTab = null;
  }
  get _lovelace() {
    return this.lovelace ?? { config: { views: [] }, editMode: true };
  }
  _onNativeCardChanged(index, e2) {
    var _a2;
    e2.stopPropagation();
    const config = (_a2 = e2.detail) == null ? void 0 : _a2.config;
    if (!config) return;
    this._patchTab(index, { card: config });
  }
  _onYamlCardChanged(index, e2) {
    e2.stopPropagation();
    const detail = e2.detail;
    if ((detail == null ? void 0 : detail.isValid) === false) return;
    if ((detail == null ? void 0 : detail.value) === void 0) return;
    this._patchTab(index, { card: detail.value });
  }
  render() {
    if (!this._config) return b``;
    if (this._editingTab !== null) return this._renderCardView(this._editingTab);
    return this._renderListView();
  }
  _renderCardView(index) {
    const tab = this._config.tabs[index];
    if (!tab) {
      this._editingTab = null;
      return this._renderListView();
    }
    const tag = pickCardEditorTag((t2) => !!customElements.get(t2));
    return b`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}>← Back</button>
          <span class="card-editor-title">${tab.name || `Tab ${index + 1}`}</span>
        </div>
        ${this._renderCardEditor(index, tab, tag)}
      </div>
    `;
  }
  _renderCardEditor(index, tab, tag) {
    if (tag === "hui-card-element-editor") {
      return b`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this._lovelace}
          .value=${tab.card ?? {}}
          @config-changed=${(e2) => this._onNativeCardChanged(index, e2)}
        ></hui-card-element-editor>
      `;
    }
    if (tag === "ha-yaml-editor") {
      return b`
        <ha-yaml-editor
          .defaultValue=${tab.card ?? {}}
          @value-changed=${(e2) => this._onYamlCardChanged(index, e2)}
        ></ha-yaml-editor>
      `;
    }
    return b`
      <label class="card-label"
        >Card (JSON)
        <textarea
          class="tab-card-json"
          rows="10"
          .value=${JSON.stringify(tab.card ?? {}, null, 2)}
          @change=${(e2) => this._editCardJson(index, e2.target.value)}
        ></textarea>
      </label>
      ${this._cardError === index ? b`<div class="tab-card-error">Invalid JSON — not saved.</div>` : A}
    `;
  }
  _renderListView() {
    const cfg = this._config;
    return b`
      <div class="editor">
        <div class="globals">
          <label
            >Position
            <select
              .value=${cfg.position}
              @change=${(e2) => this._patch({ position: e2.target.value })}
            >
              ${["top", "bottom", "left", "right"].map(
      (p2) => b`<option value=${p2} ?selected=${p2 === cfg.position}>${p2}</option>`
    )}
            </select>
          </label>
          <label
            >Style
            <select
              .value=${cfg.style}
              @change=${(e2) => this._patch({ style: e2.target.value })}
            >
              ${["underline", "pill", "segmented"].map(
      (s2) => b`<option value=${s2} ?selected=${s2 === cfg.style}>${s2}</option>`
    )}
            </select>
          </label>
          <label
            >Remember
            <select
              .value=${cfg.remember}
              @change=${(e2) => this._patch({ remember: e2.target.value })}
            >
              ${["none", "browser", "url"].map(
      (r2) => b`<option value=${r2} ?selected=${r2 === cfg.remember}>${r2}</option>`
    )}
            </select>
          </label>
          <label
            >Default tab
            <select
              class="global-default-tab"
              @change=${(e2) => this._patch({ default_tab: e2.target.value })}
            >
              ${cfg.tabs.map((t2, i2) => {
      const value = t2.name ?? String(i2);
      return b`<option
                  value=${value}
                  ?selected=${String(cfg.default_tab) === value || cfg.default_tab === i2}
                >
                  ${t2.name || `Tab ${i2 + 1}`}
                </option>`;
    })}
            </select>
          </label>
          <label
            >Scrollable
            <select
              @change=${(e2) => this._patch({
      scrollable: e2.target.value === "auto" ? "auto" : e2.target.value === "true"
    })}
            >
              ${["auto", "true", "false"].map(
      (s2) => b`<option value=${s2} ?selected=${String(cfg.scrollable) === s2}>${s2}</option>`
    )}
            </select>
          </label>
          <label class="checkbox"
            ><input
              class="global-lazy"
              type="checkbox"
              .checked=${cfg.lazy}
              @change=${(e2) => this._patch({ lazy: e2.target.checked })}
            />
            Lazy-mount inactive tabs
          </label>
          <label class="checkbox"
            ><input
              class="global-swipe"
              type="checkbox"
              .checked=${cfg.swipe}
              @change=${(e2) => this._patch({ swipe: e2.target.checked })}
            />
            Swipe to change tabs (mobile)
          </label>
        </div>

        <div class="tabs">
          ${cfg.tabs.map(
      (tab, index) => {
        var _a2;
        return b`
              <div class="tab">
                <div class="tab-row">
                  <input
                    class="tab-name"
                    type="text"
                    .value=${tab.name ?? ""}
                    placeholder="Tab name"
                    @input=${(e2) => this._patchTab(index, { name: e2.target.value })}
                  />
                  <input
                    class="tab-icon"
                    type="text"
                    .value=${tab.icon ?? ""}
                    placeholder="mdi:icon"
                    @input=${(e2) => this._patchTab(index, { icon: e2.target.value })}
                  />
                  <button class="move-up" @click=${() => this._move(index, -1)}>↑</button>
                  <button class="move-down" @click=${() => this._move(index, 1)}>↓</button>
                  <button class="delete-tab" @click=${() => this._deleteTab(index)}>✕</button>
                </div>
                <div class="tab-row">
                  <input
                    class="tab-accent"
                    type="text"
                    .value=${tab.accent ?? ""}
                    placeholder="Accent colour (e.g. #ff9800)"
                    @input=${(e2) => this._patchTab(index, { accent: e2.target.value || void 0 })}
                  />
                  <input
                    class="tab-badge"
                    type="text"
                    .value=${tab.badge ?? ""}
                    placeholder="Badge: sensor.unread or {{ template }}"
                    @input=${(e2) => this._patchTab(index, { badge: e2.target.value || void 0 })}
                  />
                </div>
                <button class="edit-card" @click=${() => this._openCard(index)}>
                  <span class="edit-card-label">Edit card</span>
                  <span class="edit-card-type">${((_a2 = tab.card) == null ? void 0 : _a2.type) ?? "—"}</span>
                  <span class="edit-card-arrow">→</span>
                </button>
              </div>
            `;
      }
    )}
          <button class="add-tab" @click=${this._addTab}>+ Add tab</button>
        </div>
      </div>
    `;
  }
};
TabdeckCardEditor.styles = i$3`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .globals {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    label {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      gap: 4px;
    }
    label.checkbox {
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }
    .tab {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      margin-bottom: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
    }
    .tab-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tab-name,
    .tab-accent,
    .tab-badge {
      flex: 1;
    }
    .edit-card {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      box-sizing: border-box;
      padding: 8px 12px;
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      font-size: 13px;
      text-align: left;
    }
    .edit-card-type {
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .edit-card-arrow {
      margin-left: auto;
      color: var(--secondary-text-color);
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
    .back-to-list {
      cursor: pointer;
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
  `;
__decorateClass([
  r$1()
], TabdeckCardEditor.prototype, "_config", 2);
__decorateClass([
  r$1()
], TabdeckCardEditor.prototype, "_editingTab", 2);
__decorateClass([
  r$1()
], TabdeckCardEditor.prototype, "_cardError", 2);
TabdeckCardEditor = __decorateClass([
  t$1("tabdeck-card-editor")
], TabdeckCardEditor);
const tabdeckCardEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get TabdeckCardEditor() {
    return TabdeckCardEditor;
  },
  pickCardEditorTag
}, Symbol.toStringTag, { value: "Module" }));
export {
  TabdeckCard
};
