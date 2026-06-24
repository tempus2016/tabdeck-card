var t,e,s,i,o,a,r,n,c,l,d,h,p,u,b,f,m,_,g,y,v,$,x,w,A,E,S,C,k,T,P,O,H,L,M,z,U,N,R,I,D,V,j,B,q,K,W,J,Z,G,F,Y,X,Q,tt,et,st,it,ot,at,rt,nt,ct=Object.defineProperty,lt=(t,e,s)=>()=>{if(s)throw s[0];try{return t&&(e=t(t=0)),e}catch(C){throw s=[C],C}},dt=(t,e)=>{let s={};for(var i in t)ct(s,i,{get:t[i],enumerable:!0});return e||ct(s,Symbol.toStringTag,{value:"Module"}),s},ht=lt(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=/* @__PURE__ */new WeakMap,o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}},a=t=>new o("string"==typeof t?t:t+"",void 0,s),r=(t,...e)=>new o(1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]),t,s),n=(s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return a(e)})(t):t}),pt=lt(()=>{ht(),({is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:b}=Object),f=globalThis,m=f.trustedTypes,_=m?m.emptyScript:"",g=f.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$},Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=/* @__PURE__ */new WeakMap,w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const a=i?.call(this);o?.call(this,e),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=b(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=/* @__PURE__ */new Map;for(const[e,s]of this.elementProperties){const t=this._$Eu(e,s);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return n(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const a=o.fromAttribute(e,t.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const a=this.constructor;if(!1===i&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??$)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=/* @__PURE__ */new Map,w[y("finalized")]=/* @__PURE__ */new Map,g?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2")});function ut(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}function bt(t,e,s=t,i){if(e===J)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const a=M(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=bt(t,o._$AS(t,e.values),o,i)),e}var ft,mt,_t,gt,yt,vt,$t=lt(()=>{A=globalThis,E=t=>t,S=A.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,O=`<${P="?"+T}>`,H=document,L=()=>H.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,U=t=>z(t)||"function"==typeof t?.[Symbol.iterator],N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,D=/>/g,V=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,q=/^(?:script|style|textarea|title)$/i,K=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),W=K(1),K(2),K(3),J=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),G=/* @__PURE__ */new WeakMap,F=H.createTreeWalker(H,129),Y=(t,e)=>{const s=t.length-1,i=[];let o,a=2===e?"<svg>":3===e?"<math>":"",r=R;for(let n=0;n<s;n++){const e=t[n];let s,c,l=-1,d=0;for(;d<e.length&&(r.lastIndex=d,c=r.exec(e),null!==c);)d=r.lastIndex,r===R?"!--"===c[1]?r=I:void 0!==c[1]?r=D:void 0!==c[2]?(q.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=V):void 0!==c[3]&&(r=V):r===V?">"===c[0]?(r=o??R,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,s=c[1],r=void 0===c[3]?V:'"'===c[3]?B:j):r===B||r===j?r=V:r===I||r===D?r=R:(r=V,o=void 0);const h=r===V&&t[n+1].startsWith("/>")?" ":"";a+=r===R?e+O:l>=0?(i.push(s),e.slice(0,l)+k+e.slice(l)+T+h):e+T+(-2===l?n:h)}return[ut(t,a+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]},X=class t{constructor({strings:e,_$litType$:s},i){let o;this.parts=[];let a=0,r=0;const n=e.length-1,c=this.parts,[l,d]=Y(e,s);if(this.el=t.createElement(l,i),F.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=F.nextNode())&&c.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(k)){const e=d[r++],s=o.getAttribute(t).split(T),i=/([.?@])?(.*)/.exec(e);c.push({type:1,index:a,name:i[2],strings:s,ctor:"."===i[1]?st:"?"===i[1]?it:"@"===i[1]?ot:et}),o.removeAttribute(t)}else t.startsWith(T)&&(c.push({type:6,index:a}),o.removeAttribute(t));if(q.test(o.tagName)){const t=o.textContent.split(T),e=t.length-1;if(e>0){o.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)o.append(t[s],L()),F.nextNode(),c.push({type:2,index:++a});o.append(t[e],L())}}}else if(8===o.nodeType)if(o.data===P)c.push({type:2,index:a});else{let t=-1;for(;-1!==(t=o.data.indexOf(T,t+1));)c.push({type:7,index:a}),t+=T.length-1}a++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}},Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??H).importNode(e,!0);F.currentNode=i;let o=F.nextNode(),a=0,r=0,n=s[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new tt(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new at(o,this,t)),this._$AV.push(e),n=s[++r]}a!==n?.index&&(o=F.nextNode(),a++)}return F.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},tt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=bt(this,t,e),M(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):U(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(ut(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new X(t)),e}k(e){z(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,o=0;for(const a of e)o===s.length?s.push(i=new t(this.O(L()),this.O(L()),this,this.options)):i=s[o],i._$AI(a),o++;o<s.length&&(this._$AR(i&&i._$AB.nextSibling,o),s.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(/* @__PURE__ */new String),this.strings=s):this._$AH=Z}_$AI(t,e=this,s,i){const o=this.strings;let a=!1;if(void 0===o)t=bt(this,t,e,0),a=!M(t)||t!==this._$AH&&t!==J,a&&(this._$AH=t);else{const i=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=bt(this,i[s+r],e,r),n===J&&(n=this._$AH[r]),a||=!M(n)||n!==this._$AH[r],n===Z?t=Z:t!==Z&&(t+=(n??"")+o[r+1]),this._$AH[r]=n}a&&!i&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}},it=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}},ot=class extends et{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=bt(this,t,e,0)??Z)===J)return;const s=this._$AH,i=t===Z&&s!==Z||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==Z&&(s===Z||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},at=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){bt(this,t)}},rt=A.litHtmlPolyfillSupport,rt?.(X,tt),(A.litHtmlVersions??=[]).push("3.3.3"),nt=(t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new tt(e.insertBefore(L(),t),t,void 0,s??{})}return o._$AI(t),o}}),xt=lt(()=>{pt(),pt(),$t(),$t(),ft=globalThis,mt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}},mt._$litElement$=!0,mt.finalized=!0,ft.litElementHydrateSupport?.({LitElement:mt}),_t=ft.litElementPolyfillSupport,_t?.({LitElement:mt}),(ft.litElementVersions??=[]).push("4.2.2")}),wt=lt(()=>{}),At=lt(()=>{pt(),$t(),xt(),wt()}),Et=lt(()=>{gt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function St(t){return(e,s)=>"object"==typeof s?vt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}var Ct=lt(()=>{pt(),yt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},vt=(t=yt,e,s)=>{const{kind:i,metadata:o}=s;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=/* @__PURE__ */new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),a.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)}});function kt(t){return St({...t,state:!0,attribute:!1})}var Tt,Pt,Ot,Ht=lt(()=>{Ct()}),Lt=lt(()=>{}),Mt=lt(()=>{}),zt=lt(()=>{}),Ut=lt(()=>{}),Nt=lt(()=>{}),Rt=lt(()=>{}),It=lt(()=>{Et(),Ct(),Ht(),Lt(),Mt(),zt(),Ut(),Nt(),Rt()});function Dt(t,e,s){return e.includes(t)?t:s}function Vt(t){const e=t?.attributes??{};return{name:t?.name??e.label??void 0,icon:t?.icon??e.icon??void 0,accent:t?.accent??void 0,badge:t?.badge??void 0,visibility:t?.visibility??void 0,card:t?.card??{}}}function jt(t){const e=Array.isArray(t?.tabs)?t.tabs:[];if(0===e.length)throw new Error("tabdeck-card: you must define at least one tab.");const s=t?.default_tab??t?.options?.defaultTabIndex??0;return{type:t?.type??"custom:tabdeck-card",default_tab:s,position:Dt(t?.position,Tt,"top"),style:Dt(t?.style,Pt,"underline"),scrollable:void 0===t?.scrollable?"auto":t.scrollable,remember:Dt(t?.remember,Ot,"none"),lazy:Boolean(t?.lazy),animated:void 0===t?.animated||Boolean(t.animated),swipe:Boolean(t?.swipe),styles:t?.styles??{},tabs:e.map(Vt)}}function Bt(t){const e=t.default_tab;if("string"==typeof e){const s=t.tabs.findIndex(t=>t.name===e);return s>=0?s:0}return"number"==typeof e&&e>=0&&e<t.tabs.length?e:0}var qt=lt(()=>{Tt=["top","bottom","left","right"],Pt=["underline","pill","segmented"],Ot=["none","browser","url"]});function Kt(t,e,s){switch(t?.condition){case"state":return function(t,e){const s=e.states[t.entity];if(!s)return!1;const i=s.state;return Array.isArray(t.state)?t.state.includes(i):void 0!==t.state?i===t.state:void 0!==t.state_not&&(Array.isArray(t.state_not)?!t.state_not.includes(i):i!==t.state_not)}(t,e);case"numeric_state":return function(t,e){const s=e.states[t.entity];if(!s)return!1;const i=Number(s.state);return!Number.isNaN(i)&&(void 0===t.above||i>Number(t.above))&&(void 0===t.below||i<Number(t.below))&&(void 0!==t.above||void 0!==t.below)}(t,e);case"screen":return function(t){return!(!t.media_query||"function"!=typeof matchMedia)&&matchMedia(t.media_query).matches}(t);case"template":return function(t,e){return!(!e||!t.value_template)&&!0===e(t.value_template)}(t,s);default:return!1}}function Wt(t){return"tabdeck-card:"+t}function Jt(t,e,s){return t>=0&&t<e?t:s}function Zt(t){const{mode:e,cardKey:s,defaultIndex:i,tabCount:o}=t;if("url"===e){const e=function(t,e){const s=/(?:^|[#&])tab=([^&]+)/.exec(t||"");if(!s)return null;const i=decodeURIComponent(s[1]),o=e.indexOf(i);if(o>=0)return o;const a=Number(i);return Number.isInteger(a)&&a>=0?a:null}(t.hash??"",t.tabNames??[]);if(null!==e)return Jt(e,o,i)}if("browser"===e){const e=(t.storage??globalThis.localStorage)?.getItem(Wt(s));if(null!=e)return Jt(Number(e),o,i)}return Jt(i,o,0)}At(),It(),qt();var Gt=class extends EventTarget{constructor(t){super(),this._configs=[],this._elements=[],this._create=t}async build(t){this._configs=t.slice(),this._elements=t.map((t,e)=>this._make(t,e))}_make(t,e){const s=this._create(t);return this._hass&&(s.hass=this._hass),s.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._rebuild(e)}),s}get(t){return this._elements[t]}all(){return this._elements}setHass(t){this._hass=t;for(const e of this._elements)e&&(e.hass=t)}notifyVisible(t){const e=this._elements[t];e&&e.dispatchEvent(new Event("resize"))}async _rebuild(t){const e=this._make(this._configs[t],t);this._hass&&(e.hass=this._hass),this._elements[t]=e,this.dispatchEvent(new CustomEvent("ll-rebuild-done",{detail:{index:t}}))}};function Ft(t){return!!t&&(t.includes("{{")||t.includes("{%"))}var Yt=class extends EventTarget{constructor(t){super(),this._entries=/* @__PURE__ */new Map,this._subscribe=t}track(t){const e=new Set(t.filter(t=>!!t));for(const[s,i]of this._entries)e.has(s)||(i.unsub(),this._entries.delete(s));for(const s of e){if(this._entries.has(s))continue;const t={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(s,t),t.unsub=this._subscribe(s,e=>{t.result=e,t.hasResult=!0,t.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:s}}))},()=>{t.error=!0,t.hasResult=!1,t.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:s}}))})}}result(t){const e=this._entries.get(t);if(e&&!e.error&&e.hasResult)return e.result}boolean(t){const e=this._entries.get(t);return!(!e||e.error||!e.hasResult)&&("boolean"==typeof(s=e.result)?s:"number"==typeof s?0!==s:"string"==typeof s&&["1","true","yes","on","enable"].includes(s.trim().toLowerCase()));var s}destroy(){for(const t of this._entries.values())t.unsub();this._entries.clear()}};function Xt(t,e,s,i){var o,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(a<3?o(r):a>3?o(e,s,r):o(e,s))||r);return a>3&&r&&Object.defineProperty(e,s,r),r}var Qt=lt(()=>{});Qt();var te=class extends mt{constructor(...t){super(...t),this.selected=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}updated(){this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent)}render(){return W`
      <div class="inner">
        ${this.icon?W`<ha-icon icon=${this.icon}></ha-icon>`:Z}
        ${this.label?W`<span class="label">${this.label}</span>`:Z}
        ${this.badge?W`<span class="badge">${this.badge}</span>`:Z}
      </div>
    `}static{this.styles=r`
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
  `}};Xt([St()],te.prototype,"label",void 0),Xt([St()],te.prototype,"icon",void 0),Xt([St()],te.prototype,"badge",void 0),Xt([St()],te.prototype,"accent",void 0),Xt([St({type:Boolean,reflect:!0})],te.prototype,"selected",void 0),Xt([St({type:Boolean,reflect:!0})],te.prototype,"disabled",void 0),te=Xt([gt("tabdeck-tab")],te),At(),It(),Qt();var ee,se,ie,oe=class extends mt{constructor(...t){super(...t),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.scrollable="auto",this.animated=!0,this._ready=!1,this._onKeydown=t=>{const e=this.items.length-1,s="left"===this.position||"right"===this.position,i=s?"ArrowDown":"ArrowRight",o=s?"ArrowUp":"ArrowLeft";let a=null;t.key===i?a=this.selected>=e?0:this.selected+1:t.key===o?a=this.selected<=0?e:this.selected-1:"Home"===t.key?a=0:"End"===t.key&&(a=e),null!==a&&(t.preventDefault(),this._select(a))}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.addEventListener("keydown",this._onKeydown),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>this._position()))}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),this._resizeObserver?.disconnect(),super.disconnectedCallback()}_select(t){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t},bubbles:!0,composed:!0}))}_position(){const t=this.renderRoot,e=t?.querySelector(".indicator");if(!e)return;const s=(t?.querySelectorAll("tabdeck-tab"))?.[this.selected],i=s?function(t,e,s){if(!t||t.offsetWidth<=0)return null;if("pill"===s||"segmented"===s)return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight};switch(e){case"top":return{left:t.offsetLeft,top:t.offsetTop+t.offsetHeight-3,width:t.offsetWidth,height:3};case"bottom":return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:3};case"left":return{left:t.offsetLeft+t.offsetWidth-3,top:t.offsetTop,width:3,height:t.offsetHeight};case"right":return{left:t.offsetLeft,top:t.offsetTop,width:3,height:t.offsetHeight}}}({offsetLeft:s.offsetLeft,offsetTop:s.offsetTop,offsetWidth:s.offsetWidth,offsetHeight:s.offsetHeight},this.position,this.tabStyle):null;i?(e.style.left=`${i.left}px`,e.style.top=`${i.top}px`,e.style.width=`${i.width}px`,e.style.height=`${i.height}px`,e.style.opacity="1"):e.style.opacity="0"}firstUpdated(){const t=this.renderRoot.querySelector(".bar");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(){this._position(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}render(){const t=this._ready&&this.animated?" animate":"";return W`
      <div class="bar ${this.position} style-${this.tabStyle}" part="bar">
        <div class="indicator${t}" part="indicator"></div>
        ${this.items.map((t,e)=>W`
            <tabdeck-tab
              .label=${t.name}
              .icon=${t.icon}
              .badge=${t.badge}
              .accent=${t.accent}
              .selected=${e===this.selected}
              aria-controls="tabdeck-panel"
              @click=${()=>this._select(e)}
            ></tabdeck-tab>
          `)}
      </div>
    `}static{this.styles=r`
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
      border-radius: 10px;
      padding: 4px;
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
    }
    .indicator.animate {
      transition: left 200ms ease, top 200ms ease, width 200ms ease,
        height 200ms ease;
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
    .bar.style-underline .indicator {
      background: var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-pill .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
      border-radius: 999px;
    }
    .bar.style-segmented .indicator {
      background: var(--card-background-color);
      border-radius: 7px;
    }
  `}};Xt([St({attribute:!1})],oe.prototype,"items",void 0),Xt([St({type:Number})],oe.prototype,"selected",void 0),Xt([St()],oe.prototype,"position",void 0),Xt([St()],oe.prototype,"tabStyle",void 0),Xt([St()],oe.prototype,"scrollable",void 0),Xt([St({type:Boolean})],oe.prototype,"animated",void 0),Xt([kt()],oe.prototype,"_ready",void 0),oe=Xt([gt("tabdeck-tabbar")],oe);var ae,re,ne,ce,le,de=lt(()=>{!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ee||(ee={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(se||(se={})),ie=(t,e,s,i)=>{i=i||{},s=null==s?{}:s;const o=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=s,t.dispatchEvent(o),o}}),he=/* @__PURE__ */dt({TabdeckCardEditor:()=>le,pickCardEditorTag:()=>pe});function pe(t){return t("hui-card-element-editor")?"hui-card-element-editor":t("ha-yaml-editor")?"ha-yaml-editor":"textarea-json"}var ue=lt(()=>{At(),It(),de(),Qt(),ae=[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"accent",selector:{text:{}}},{name:"badge",selector:{text:{}}}],re=[{name:"type",selector:{select:{mode:"dropdown",custom_value:!0,options:["entities","tile","button","light","thermostat","humidifier","weather-forecast","markdown","picture","picture-entity","picture-glance","glance","gauge","sensor","history-graph","statistics-graph","media-control","map","area","alarm-panel","calendar","todo-list","iframe","entity","conditional","vertical-stack","horizontal-stack","grid"].map(t=>({value:t,label:t}))}}}],ne={name:"Tab name",icon:"Icon",accent:"Accent colour",badge:"Badge (entity id or template)"},ce={position:"Position",style:"Style",remember:"Remember selected tab",default_tab:"Default tab",scrollable:"Scrollable",lazy:"Lazy-mount inactive tabs",animated:"Animate indicator",swipe:"Swipe to change tabs (mobile)"},le=class extends mt{constructor(...t){super(...t),this._editingTab=null,this._cardError=null,this._expanded=/* @__PURE__ */new Set,this._computeGlobalLabel=t=>ce[t.name]??t.name,this._computeTabLabel=t=>ne[t.name]??t.name}setConfig(t){this._config=jt(t)}_emit(t){this._config=t,ie(this,"config-changed",{config:t}),this.requestUpdate()}_patch(t){this._config&&this._emit({...this._config,...t})}_patchTab(t,e){if(!this._config)return;const s=this._config.tabs.map((s,i)=>i===t?{...s,...e}:s);this._emit({...this._config,tabs:s})}_addTab(){if(!this._config)return;const t=[...this._config.tabs,{name:`Tab ${this._config.tabs.length+1}`,card:{}}];this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:t})}_deleteTab(t){if(!this._config)return;const e=this._config.tabs.filter((e,s)=>s!==t);this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:e})}_toggleExpanded(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_onHeaderKeydown(t,e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleExpanded(t))}_editCardJson(t,e){let s;try{s=JSON.parse(e)}catch{return void(this._cardError=t)}this._cardError=null,this._patchTab(t,{card:s})}_move(t,e){if(!this._config)return;const s=t+e;if(s<0||s>=this._config.tabs.length)return;const i=this._config.tabs.slice();[i[t],i[s]]=[i[s],i[t]],this._expanded=/* @__PURE__ */new Set,this._emit({...this._config,tabs:i})}_openCard(t){this._cardError=null,this._editingTab=t}_closeCard(){this._editingTab=null}get _lovelace(){return this.lovelace??{config:{views:[]},editMode:!0}}_onNativeCardChanged(t,e){e.stopPropagation();const s=e.detail?.config;s&&this._patchTab(t,{card:s})}_onTypeChosen(t,e){e.stopPropagation();const s=e.detail?.value?.type;s&&this._patchTab(t,{card:{type:s}})}_changeCardType(t){this._patchTab(t,{card:{}})}_onYamlCardChanged(t,e){e.stopPropagation();const s=e.detail;!1!==s?.isValid&&void 0!==s?.value&&this._patchTab(t,{card:s.value})}get _currentDefaultTab(){const t=this._config;for(let e=0;e<t.tabs.length;e++){const s=t.tabs[e].name??String(e);if(String(t.default_tab)===s||t.default_tab===e)return s}}_globalSchema(){const t=t=>t.map(t=>({value:t,label:t})),e=this._config.tabs.map((t,e)=>({value:t.name??String(e),label:t.name||`Tab ${e+1}`}));return[{name:"position",selector:{select:{mode:"dropdown",options:t(["top","bottom","left","right"])}}},{name:"style",selector:{select:{mode:"dropdown",options:t(["underline","pill","segmented"])}}},{name:"remember",selector:{select:{mode:"dropdown",options:t(["none","browser","url"])}}},{name:"default_tab",selector:{select:{mode:"dropdown",options:e}}},{name:"scrollable",selector:{select:{mode:"dropdown",options:t(["auto","true","false"])}}},{name:"lazy",selector:{boolean:{}}},{name:"animated",selector:{boolean:{}}},{name:"swipe",selector:{boolean:{}}}]}get _globalData(){const t=this._config;return{position:t.position,style:t.style,remember:t.remember,default_tab:this._currentDefaultTab,scrollable:String(t.scrollable),lazy:t.lazy,animated:t.animated,swipe:t.swipe}}_onGlobalChanged(t){t.stopPropagation();const e=t.detail.value??{},s="auto"===e.scrollable?"auto":"true"===e.scrollable||!0===e.scrollable;this._patch({position:e.position,style:e.style,remember:e.remember,default_tab:e.default_tab,scrollable:s,lazy:!!e.lazy,animated:!!e.animated,swipe:!!e.swipe})}_onTabFieldsChanged(t,e){e.stopPropagation();const s=e.detail.value??{};this._patchTab(t,{name:s.name??"",icon:s.icon||void 0,accent:s.accent||void 0,badge:s.badge||void 0})}render(){return this._config?null!==this._editingTab?this._renderCardView(this._editingTab):this._renderListView():W``}_renderCardView(t){const e=this._config.tabs[t];if(!e)return this._editingTab=null,this._renderListView();const s=!!e.card?.type;return W`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}>← Back</button>
          <span class="card-editor-title">${e.name||`Tab ${t+1}`}</span>
          ${s?W`<button class="change-card-type" @click=${()=>this._changeCardType(t)}>
                Change card type
              </button>`:Z}
        </div>
        ${s?this._renderCardEditor(t,e):this._renderCardTypeChooser(t)}
      </div>
    `}_renderCardTypeChooser(t){return W`
      <div class="card-type-chooser">
        <ha-form
          class="card-type-form"
          .hass=${this.hass}
          .data=${{}}
          .schema=${re}
          .computeLabel=${()=>"Card type"}
          @value-changed=${e=>this._onTypeChosen(t,e)}
        ></ha-form>
        <p class="card-type-hint">
          Choose a card type to configure it. Enter a custom type (e.g.
          <code>custom:my-card</code>) for cards not in the list.
        </p>
      </div>
    `}_renderCardEditor(t,e){const s=pe(t=>!!customElements.get(t));return"hui-card-element-editor"===s?W`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this._lovelace}
          .value=${e.card??{}}
          @config-changed=${e=>this._onNativeCardChanged(t,e)}
        ></hui-card-element-editor>
      `:"ha-yaml-editor"===s?W`
        <ha-yaml-editor
          .defaultValue=${e.card??{}}
          @value-changed=${e=>this._onYamlCardChanged(t,e)}
        ></ha-yaml-editor>
      `:W`
      <label class="card-label"
        >Card (JSON)
        <textarea
          class="tab-card-json"
          rows="10"
          .value=${JSON.stringify(e.card??{},null,2)}
          @change=${e=>this._editCardJson(t,e.target.value)}
        ></textarea>
      </label>
      ${this._cardError===t?W`<div class="tab-card-error">Invalid JSON — not saved.</div>`:Z}
    `}_renderListView(){const t=this._config;return W`
      <div class="editor">
        <ha-form
          class="globals-form"
          .hass=${this.hass}
          .data=${this._globalData}
          .schema=${this._globalSchema()}
          .computeLabel=${this._computeGlobalLabel}
          @value-changed=${this._onGlobalChanged}
        ></ha-form>

        <div class="tabs">
          ${t.tabs.map((e,s)=>{const i=this._expanded.has(s);return W`
              <div class="tab ${i?"expanded":"collapsed"}">
                <div
                  class="tab-header"
                  role="button"
                  tabindex="0"
                  aria-expanded=${i?"true":"false"}
                  @click=${()=>this._toggleExpanded(s)}
                  @keydown=${t=>this._onHeaderKeydown(s,t)}
                >
                  <div class="tab-summary">
                    <ha-svg-icon
                      class="expand-chevron"
                      .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}
                    ></ha-svg-icon>
                    <ha-icon
                      class="tab-icon"
                      .icon=${e.icon||"mdi:tab"}
                    ></ha-icon>
                    <span class="tab-title">${e.name||`Tab ${s+1}`}</span>
                    <span class="tab-type">${e.card?.type??"—"}</span>
                  </div>
                  <div class="tab-controls">
                    <ha-icon-button
                      class="move-up"
                      label="Move up"
                      .path=${"M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"}
                      .disabled=${0===s}
                      @click=${t=>{t.stopPropagation(),this._move(s,-1)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="move-down"
                      label="Move down"
                      .path=${"M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"}
                      .disabled=${s===t.tabs.length-1}
                      @click=${t=>{t.stopPropagation(),this._move(s,1)}}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="delete-tab"
                      label="Delete tab"
                      .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                      @click=${t=>{t.stopPropagation(),this._deleteTab(s)}}
                    ></ha-icon-button>
                  </div>
                </div>
                ${i?W`
                      <ha-form
                        class="tab-form"
                        .hass=${this.hass}
                        .data=${{name:e.name??"",icon:e.icon??"",accent:e.accent??"",badge:e.badge??""}}
                        .schema=${ae}
                        .computeLabel=${this._computeTabLabel}
                        @value-changed=${t=>this._onTabFieldsChanged(s,t)}
                      ></ha-form>
                      <button class="edit-card" @click=${()=>this._openCard(s)}>
                        <span class="edit-card-label">Edit card</span>
                        <span class="edit-card-type">${e.card?.type??"—"}</span>
                        <span class="edit-card-arrow">→</span>
                      </button>
                    `:Z}
              </div>
            `})}
          <ha-button class="add-tab" @click=${this._addTab}>
            <ha-svg-icon slot="icon" .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}></ha-svg-icon>
            Add tab
          </ha-button>
        </div>
      </div>
    `}static{this.styles=r`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .globals-form {
      display: block;
    }
    .tabs {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tab {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, var(--ha-card-background));
    }
    .tab-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: pointer;
      padding: 4px;
      margin: -4px;
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
    .tab-summary {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;
    }
    .expand-chevron {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      transition: transform 0.2s ease;
    }
    .tab.expanded .expand-chevron {
      transform: rotate(180deg);
    }
    .tab-icon {
      flex-shrink: 0;
      color: var(--secondary-text-color);
    }
    .tab-title {
      font-weight: 500;
      font-size: 15px;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-type {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-controls {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      --mdc-icon-button-size: 40px;
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
      text-align: left;
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
      margin-left: auto;
      color: var(--secondary-text-color);
    }
    .add-tab {
      align-self: flex-start;
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
      margin-left: auto;
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
  `}},Xt([kt()],le.prototype,"_config",void 0),Xt([kt()],le.prototype,"_editingTab",void 0),Xt([kt()],le.prototype,"_cardError",void 0),Xt([kt()],le.prototype,"_expanded",void 0),le=Xt([gt("tabdeck-card-editor")],le)});At(),It(),qt(),Qt();var be=class extends mt{constructor(...t){super(...t),this._selected=0,this._built=!1,this._cardKey="",this._templateResolver=t=>this._templates?.boolean(t),this._onTouchStart=t=>{if(!this._config?.swipe||1!==t.touches.length)return void(this._touchStart=void 0);const e=t.touches[0];this._touchStart={x:e.clientX,y:e.clientY,t:t.timeStamp}},this._onTouchEnd=t=>{const e=this._touchStart;if(this._touchStart=void 0,!e||!this._config?.swipe)return;const s=t.changedTouches[0];if(!s)return;const i=function(t,e,s={}){const i=s.minDistance??50,o=s.maxDuration??800,a=s.ratio??1.5,r=e.x-t.x,n=e.y-t.y;return e.t-t.t>o||Math.abs(r)<i||Math.abs(r)<Math.abs(n)*a?null:r<0?"next":"prev"}(e,{x:s.clientX,y:s.clientY,t:t.timeStamp});if(!i)return;const o=this._visibleTabs().length-1,a="next"===i?this._selected+1:this._selected-1,r=Math.max(0,Math.min(o,a));r!==this._selected&&this._selectIndex(r)}}static getStubConfig(){return{tabs:[{name:"Tab 1",icon:"mdi:numeric-1-box",card:{type:"markdown",content:"Tab 1"}},{name:"Tab 2",icon:"mdi:numeric-2-box",card:{type:"markdown",content:"Tab 2"}}]}}static async getConfigElement(){return await Promise.resolve().then(()=>(ue(),he)),document.createElement("tabdeck-card-editor")}setConfig(t){this._config=jt(t),this._cardKey=this._computeCardKey(this._config),this._built=!1,this._selected=Bt(this._config),this._templates?.destroy(),this._templates=void 0,this._build()}disconnectedCallback(){super.disconnectedCallback(),this._templates?.destroy(),this._templates=void 0}_computeCardKey(t){return`${"undefined"!=typeof location?location.pathname:""}#${t.tabs.map(t=>t.name??"").join("|")}`}async _build(){if(!this._config)return;const t=await async function(){const t=await window.loadCardHelpers();return e=>t.createCardElement(e)}();this._manager=new Gt(t),this._manager.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._manager.build(this._config.tabs.map(t=>t.card)),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this._selected=Zt({mode:this._config.remember,cardKey:this._cardKey,defaultIndex:Bt(this._config),tabCount:this._visibleTabs().length,hash:"undefined"!=typeof location?location.hash:"",tabNames:this._visibleTabs().map(t=>t.name??"")}),this._built=!0,this.requestUpdate()}set hass(t){this._hass=t,this._manager?.setHass(t),this._syncTemplates(),this.requestUpdate()}get hass(){return this._hass}_visibleTabs(){return this._config?this._config.tabs.filter(t=>{return e=t.visibility,s=this._hass,i=this._templateResolver,!e||0===e.length||!s||e.every(t=>Kt(t,s,i));var e,s,i}):[]}_collectTemplates(){if(!this._config)return[];const t=[];for(const e of this._config.tabs){Ft(e.badge)&&t.push(e.badge);for(const s of e.visibility??[])"template"===s?.condition&&s.value_template&&t.push(s.value_template)}return t}_makeSubscribe(){if(this._hass?.connection?.subscribeMessage)return(t,e,s)=>{const i=this._hass?.connection;if(!i?.subscribeMessage)return s(),()=>{};let o,a=!1;return Promise.resolve(i.subscribeMessage(t=>{t&&void 0!==t.error?s():e(t?.result)},{type:"render_template",template:t,report_errors:!0})).then(t=>{o=t,a&&t?.()}).catch(()=>s()),()=>{a=!0,o?.()}}}_syncTemplates(){const t=this._collectTemplates();if(0===t.length)return this._templates?.destroy(),void(this._templates=void 0);if(!this._templates){const t=this._makeSubscribe();if(!t)return;this._templates=new Yt(t),this._templates.addEventListener("change",()=>this.requestUpdate())}this._templates.track(t)}getCardSize(){const t=this._manager?.get(this._activeOriginalIndex());return t&&"function"==typeof t.getCardSize?t.getCardSize():1}getGridOptions(){return{columns:"full",rows:"auto"}}_activeOriginalIndex(){const t=this._visibleTabs()[this._selected];return this._config?this._config.tabs.indexOf(t):0}_onSelect(t){this._selectIndex(t.detail.index)}_selectIndex(t){this._selected=t;const e=this._visibleTabs()[this._selected];if(this._config){const t="browser"===(s={mode:this._config.remember,cardKey:this._cardKey,index:this._selected,tabName:e?.name}).mode?((s.storage??globalThis.localStorage)?.setItem(Wt(s.cardKey),String(s.index)),{}):"url"===s.mode?{hash:"#tab="+(s.tabName?s.tabName:String(s.index))}:{};t.hash&&"undefined"!=typeof location&&history.replaceState(null,"",t.hash)}var s;this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}updated(t){super.updated(t);const e=this._visibleTabs();this._selected>e.length-1&&(this._selected=0)}render(){if(!this._config||!this._built)return Z;const t=this._visibleTabs(),e=this._config,s=W`
      <tabdeck-tabbar
        .items=${t.map(t=>({name:t.name,icon:t.icon,accent:t.accent,badge:this._resolveBadge(t.badge)}))}
        .selected=${this._selected}
        .position=${e.position}
        .tabStyle=${e.style}
        .scrollable=${e.scrollable}
        .animated=${e.animated}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `,i=W`
      <div
        class="content"
        id="tabdeck-panel"
        role="tabpanel"
        @touchstart=${this._onTouchStart}
        @touchend=${this._onTouchEnd}
      >
        ${t.map((t,s)=>{const i=e.tabs.indexOf(t);return W`
            <div class="panel" ?hidden=${s!==this._selected}>
              ${this._manager?.get(i)}
            </div>
          `})}
      </div>
    `;return W`
      <div class="root pos-${e.position}">
        ${"bottom"===e.position?W`${i}${s}`:W`${s}${i}`}
      </div>
    `}_resolveBadge(t){if(!t)return;if(Ft(t)){const e=this._templates?.result(t);return null==e?void 0:String(e)}if(!this._hass)return;const e=this._hass.states[t];return e?e.state:t}static{this.styles=r`
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
  `}};Xt([kt()],be.prototype,"_config",void 0),Xt([kt()],be.prototype,"_selected",void 0),Xt([kt()],be.prototype,"_built",void 0),be=Xt([gt("tabdeck-card")],be),window.customCards=window.customCards||[],window.customCards.push({type:"tabdeck-card",name:"Tabdeck Card",description:"Organize multiple cards into a modern tabbed interface.",preview:!0,documentationURL:"https://github.com/tempus2016/tabdeck-card"});export{be as TabdeckCard};