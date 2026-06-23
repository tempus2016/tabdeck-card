var t,e,s,i,r,o,a,n,c,l,d,h,p,u,b,f,_,m,g,v,y,$,x,w,A,E,S,k,C,T,P,O,U,N,M,R,z,H,L,I,j,B,D,q,V,K,W,J,Y,F,X,Z,G,Q,tt,et,st,it,rt,ot,at,nt,ct=Object.defineProperty,lt=(t,e,s)=>()=>{if(s)throw s[0];try{return t&&(e=t(t=0)),e}catch(k){throw s=[k],k}},dt=(t,e)=>{let s={};for(var i in t)ct(s,i,{get:t[i],enumerable:!0});return e||ct(s,Symbol.toStringTag,{value:"Module"}),s},ht=lt(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=/* @__PURE__ */new WeakMap,r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}},o=t=>new r("string"==typeof t?t:t+"",void 0,s),a=(t,...e)=>new r(1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]),t,s),n=(s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return o(e)})(t):t}),pt=lt(()=>{ht(),({is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:b}=Object),f=globalThis,_=f.trustedTypes,m=_?_.emptyScript:"",g=f.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$},Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=/* @__PURE__ */new WeakMap,w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=b(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=/* @__PURE__ */new Map;for(const[e,s]of this.elementProperties){const t=this._$Eu(e,s);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return n(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??$)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=/* @__PURE__ */new Map,w[v("finalized")]=/* @__PURE__ */new Map,g?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2")});function ut(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}function bt(t,e,s=t,i){if(e===J)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=M(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=bt(t,r._$AS(t,e.values),r,i)),e}var ft,_t,mt,gt,vt,yt,$t=lt(()=>{A=globalThis,E=t=>t,S=A.trustedTypes,k=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,O=`<${P="?"+T}>`,U=document,N=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,z=t=>R(t)||"function"==typeof t?.[Symbol.iterator],H="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,j=/>/g,B=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,q=/"/g,V=/^(?:script|style|textarea|title)$/i,K=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),W=K(1),K(2),K(3),J=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),F=/* @__PURE__ */new WeakMap,X=U.createTreeWalker(U,129),Z=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=L;for(let n=0;n<s;n++){const e=t[n];let s,c,l=-1,d=0;for(;d<e.length&&(a.lastIndex=d,c=a.exec(e),null!==c);)d=a.lastIndex,a===L?"!--"===c[1]?a=I:void 0!==c[1]?a=j:void 0!==c[2]?(V.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=B):void 0!==c[3]&&(a=B):a===B?">"===c[0]?(a=r??L,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,s=c[1],a=void 0===c[3]?B:'"'===c[3]?q:D):a===q||a===D?a=B:a===I||a===j?a=L:(a=B,r=void 0);const h=a===B&&t[n+1].startsWith("/>")?" ":"";o+=a===L?e+O:l>=0?(i.push(s),e.slice(0,l)+C+e.slice(l)+T+h):e+T+(-2===l?n:h)}return[ut(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]},G=class t{constructor({strings:e,_$litType$:s},i){let r;this.parts=[];let o=0,a=0;const n=e.length-1,c=this.parts,[l,d]=Z(e,s);if(this.el=t.createElement(l,i),X.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=X.nextNode())&&c.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=d[a++],s=r.getAttribute(t).split(T),i=/([.?@])?(.*)/.exec(e);c.push({type:1,index:o,name:i[2],strings:s,ctor:"."===i[1]?st:"?"===i[1]?it:"@"===i[1]?rt:et}),r.removeAttribute(t)}else t.startsWith(T)&&(c.push({type:6,index:o}),r.removeAttribute(t));if(V.test(r.tagName)){const t=r.textContent.split(T),e=t.length-1;if(e>0){r.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)r.append(t[s],N()),X.nextNode(),c.push({type:2,index:++o});r.append(t[e],N())}}}else if(8===r.nodeType)if(r.data===P)c.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(T,t+1));)c.push({type:7,index:o}),t+=T.length-1}o++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}},Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);X.currentNode=i;let r=X.nextNode(),o=0,a=0,n=s[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new tt(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new ot(r,this,t)),this._$AV.push(e),n=s[++a]}o!==n?.index&&(r=X.nextNode(),o++)}return X.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},tt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=bt(this,t,e),M(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):z(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(ut(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new G(t)),e}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,r=0;for(const o of e)r===s.length?s.push(i=new t(this.O(N()),this.O(N()),this,this.options)):i=s[r],i._$AI(o),r++;r<s.length&&(this._$AR(i&&i._$AB.nextSibling,r),s.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(/* @__PURE__ */new String),this.strings=s):this._$AH=Y}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=bt(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==J,o&&(this._$AH=t);else{const i=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=bt(this,i[s+a],e,a),n===J&&(n=this._$AH[a]),o||=!M(n)||n!==this._$AH[a],n===Y?t=Y:t!==Y&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!i&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}},it=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}},rt=class extends et{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=bt(this,t,e,0)??Y)===J)return;const s=this._$AH,i=t===Y&&s!==Y||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==Y&&(s===Y||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ot=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){bt(this,t)}},at=A.litHtmlPolyfillSupport,at?.(G,tt),(A.litHtmlVersions??=[]).push("3.3.3"),nt=(t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new tt(e.insertBefore(N(),t),t,void 0,s??{})}return r._$AI(t),r}}),xt=lt(()=>{pt(),pt(),$t(),$t(),ft=globalThis,_t=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}},_t._$litElement$=!0,_t.finalized=!0,ft.litElementHydrateSupport?.({LitElement:_t}),mt=ft.litElementPolyfillSupport,mt?.({LitElement:_t}),(ft.litElementVersions??=[]).push("4.2.2")}),wt=lt(()=>{}),At=lt(()=>{pt(),$t(),xt(),wt()}),Et=lt(()=>{gt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function St(t){return(e,s)=>"object"==typeof s?yt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}var kt=lt(()=>{pt(),vt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},yt=(t=vt,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=/* @__PURE__ */new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)}});function Ct(t){return St({...t,state:!0,attribute:!1})}var Tt,Pt,Ot,Ut=lt(()=>{kt()}),Nt=lt(()=>{}),Mt=lt(()=>{}),Rt=lt(()=>{}),zt=lt(()=>{}),Ht=lt(()=>{}),Lt=lt(()=>{}),It=lt(()=>{Et(),kt(),Ut(),Nt(),Mt(),Rt(),zt(),Ht(),Lt()});function jt(t,e,s){return e.includes(t)?t:s}function Bt(t){const e=t?.attributes??{};return{name:t?.name??e.label??void 0,icon:t?.icon??e.icon??void 0,accent:t?.accent??void 0,badge:t?.badge??void 0,visibility:t?.visibility??void 0,card:t?.card??{}}}function Dt(t){const e=Array.isArray(t?.tabs)?t.tabs:[];if(0===e.length)throw new Error("tabdeck-card: you must define at least one tab.");const s=t?.default_tab??t?.options?.defaultTabIndex??0;return{type:t?.type??"custom:tabdeck-card",default_tab:s,position:jt(t?.position,Tt,"top"),style:jt(t?.style,Pt,"underline"),scrollable:void 0===t?.scrollable?"auto":t.scrollable,remember:jt(t?.remember,Ot,"none"),lazy:Boolean(t?.lazy),animated:void 0===t?.animated||Boolean(t.animated),swipe:Boolean(t?.swipe),styles:t?.styles??{},tabs:e.map(Bt)}}function qt(t){const e=t.default_tab;if("string"==typeof e){const s=t.tabs.findIndex(t=>t.name===e);return s>=0?s:0}return"number"==typeof e&&e>=0&&e<t.tabs.length?e:0}var Vt=lt(()=>{Tt=["top","bottom","left","right"],Pt=["underline","pill","segmented"],Ot=["none","browser","url"]});function Kt(t,e,s){switch(t?.condition){case"state":return function(t,e){const s=e.states[t.entity];if(!s)return!1;const i=s.state;return Array.isArray(t.state)?t.state.includes(i):void 0!==t.state?i===t.state:void 0!==t.state_not&&(Array.isArray(t.state_not)?!t.state_not.includes(i):i!==t.state_not)}(t,e);case"numeric_state":return function(t,e){const s=e.states[t.entity];if(!s)return!1;const i=Number(s.state);return!Number.isNaN(i)&&(void 0===t.above||i>Number(t.above))&&(void 0===t.below||i<Number(t.below))&&(void 0!==t.above||void 0!==t.below)}(t,e);case"screen":return function(t){return!(!t.media_query||"function"!=typeof matchMedia)&&matchMedia(t.media_query).matches}(t);case"template":return function(t,e){return!(!e||!t.value_template)&&!0===e(t.value_template)}(t,s);default:return!1}}function Wt(t){return"tabdeck-card:"+t}function Jt(t,e,s){return t>=0&&t<e?t:s}function Yt(t){const{mode:e,cardKey:s,defaultIndex:i,tabCount:r}=t;if("url"===e){const e=function(t,e){const s=/(?:^|[#&])tab=([^&]+)/.exec(t||"");if(!s)return null;const i=decodeURIComponent(s[1]),r=e.indexOf(i);if(r>=0)return r;const o=Number(i);return Number.isInteger(o)&&o>=0?o:null}(t.hash??"",t.tabNames??[]);if(null!==e)return Jt(e,r,i)}if("browser"===e){const e=(t.storage??globalThis.localStorage)?.getItem(Wt(s));if(null!=e)return Jt(Number(e),r,i)}return Jt(i,r,0)}At(),It(),Vt();var Ft=class extends EventTarget{constructor(t){super(),this._configs=[],this._elements=[],this._create=t}async build(t){this._configs=t.slice(),this._elements=t.map((t,e)=>this._make(t,e))}_make(t,e){const s=this._create(t);return this._hass&&(s.hass=this._hass),s.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._rebuild(e)}),s}get(t){return this._elements[t]}all(){return this._elements}setHass(t){this._hass=t;for(const e of this._elements)e&&(e.hass=t)}notifyVisible(t){const e=this._elements[t];e&&e.dispatchEvent(new Event("resize"))}async _rebuild(t){const e=this._make(this._configs[t],t);this._hass&&(e.hass=this._hass),this._elements[t]=e,this.dispatchEvent(new CustomEvent("ll-rebuild-done",{detail:{index:t}}))}};function Xt(t){return!!t&&(t.includes("{{")||t.includes("{%"))}var Zt=class extends EventTarget{constructor(t){super(),this._entries=/* @__PURE__ */new Map,this._subscribe=t}track(t){const e=new Set(t.filter(t=>!!t));for(const[s,i]of this._entries)e.has(s)||(i.unsub(),this._entries.delete(s));for(const s of e){if(this._entries.has(s))continue;const t={unsub:()=>{},hasResult:!1,error:!1};this._entries.set(s,t),t.unsub=this._subscribe(s,e=>{t.result=e,t.hasResult=!0,t.error=!1,this.dispatchEvent(new CustomEvent("change",{detail:{template:s}}))},()=>{t.error=!0,t.hasResult=!1,t.result=void 0,this.dispatchEvent(new CustomEvent("change",{detail:{template:s}}))})}}result(t){const e=this._entries.get(t);if(e&&!e.error&&e.hasResult)return e.result}boolean(t){const e=this._entries.get(t);return!(!e||e.error||!e.hasResult)&&("boolean"==typeof(s=e.result)?s:"number"==typeof s?0!==s:"string"==typeof s&&["1","true","yes","on","enable"].includes(s.trim().toLowerCase()));var s}destroy(){for(const t of this._entries.values())t.unsub();this._entries.clear()}};function Gt(t,e,s,i){var r,o=arguments.length,a=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(o<3?r(a):o>3?r(e,s,a):r(e,s))||a);return o>3&&a&&Object.defineProperty(e,s,a),a}var Qt=lt(()=>{});Qt();var te=class extends _t{constructor(...t){super(...t),this.selected=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}updated(){this.setAttribute("aria-selected",this.selected?"true":"false"),this.tabIndex=this.selected?0:-1,this.accent&&this.style.setProperty("--tabdeck-accent",this.accent)}render(){return W`
      <div class="inner">
        ${this.icon?W`<ha-icon icon=${this.icon}></ha-icon>`:Y}
        ${this.label?W`<span class="label">${this.label}</span>`:Y}
        ${this.badge?W`<span class="badge">${this.badge}</span>`:Y}
      </div>
    `}static{this.styles=a`
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
  `}};Gt([St()],te.prototype,"label",void 0),Gt([St()],te.prototype,"icon",void 0),Gt([St()],te.prototype,"badge",void 0),Gt([St()],te.prototype,"accent",void 0),Gt([St({type:Boolean,reflect:!0})],te.prototype,"selected",void 0),Gt([St({type:Boolean,reflect:!0})],te.prototype,"disabled",void 0),te=Gt([gt("tabdeck-tab")],te),At(),It(),Qt();var ee,se,ie,re=class extends _t{constructor(...t){super(...t),this.items=[],this.selected=0,this.position="top",this.tabStyle="underline",this.scrollable="auto",this.animated=!0,this._ready=!1,this._onKeydown=t=>{const e=this.items.length-1,s="left"===this.position||"right"===this.position,i=s?"ArrowDown":"ArrowRight",r=s?"ArrowUp":"ArrowLeft";let o=null;t.key===i?o=this.selected>=e?0:this.selected+1:t.key===r?o=this.selected<=0?e:this.selected-1:"Home"===t.key?o=0:"End"===t.key&&(o=e),null!==o&&(t.preventDefault(),this._select(o))}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tablist"),this.addEventListener("keydown",this._onKeydown),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>this._position()))}disconnectedCallback(){this.removeEventListener("keydown",this._onKeydown),this._resizeObserver?.disconnect(),super.disconnectedCallback()}_select(t){this.dispatchEvent(new CustomEvent("tabdeck-select",{detail:{index:t},bubbles:!0,composed:!0}))}_position(){const t=this.renderRoot,e=t?.querySelector(".indicator");if(!e)return;const s=t?.querySelector("tabdeck-tab[selected]"),i=s?function(t,e,s){if(!t||t.offsetWidth<=0)return null;if("pill"===s||"segmented"===s)return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight};switch(e){case"top":return{left:t.offsetLeft,top:t.offsetTop+t.offsetHeight-3,width:t.offsetWidth,height:3};case"bottom":return{left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:3};case"left":return{left:t.offsetLeft+t.offsetWidth-3,top:t.offsetTop,width:3,height:t.offsetHeight};case"right":return{left:t.offsetLeft,top:t.offsetTop,width:3,height:t.offsetHeight}}}({offsetLeft:s.offsetLeft,offsetTop:s.offsetTop,offsetWidth:s.offsetWidth,offsetHeight:s.offsetHeight},this.position,this.tabStyle):null;i?(e.style.left=`${i.left}px`,e.style.top=`${i.top}px`,e.style.width=`${i.width}px`,e.style.height=`${i.height}px`,e.style.opacity="1"):e.style.opacity="0"}firstUpdated(){const t=this.renderRoot.querySelector(".bar");t&&this._resizeObserver&&this._resizeObserver.observe(t)}updated(){this._position(),this._ready||requestAnimationFrame(()=>{this._ready=!0})}render(){const t=this._ready&&this.animated?" animate":"";return W`
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
    `}static{this.styles=a`
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
  `}};Gt([St({attribute:!1})],re.prototype,"items",void 0),Gt([St({type:Number})],re.prototype,"selected",void 0),Gt([St()],re.prototype,"position",void 0),Gt([St()],re.prototype,"tabStyle",void 0),Gt([St()],re.prototype,"scrollable",void 0),Gt([St({type:Boolean})],re.prototype,"animated",void 0),Gt([Ct()],re.prototype,"_ready",void 0),re=Gt([gt("tabdeck-tabbar")],re);var oe,ae=lt(()=>{!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ee||(ee={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(se||(se={})),ie=(t,e,s,i)=>{i=i||{},s=null==s?{}:s;const r=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=s,t.dispatchEvent(r),r}}),ne=/* @__PURE__ */dt({TabdeckCardEditor:()=>oe,pickCardEditorTag:()=>ce});function ce(t){return t("hui-card-element-editor")?"hui-card-element-editor":t("ha-yaml-editor")?"ha-yaml-editor":"textarea-json"}var le=lt(()=>{At(),It(),ae(),Qt(),oe=class extends _t{constructor(...t){super(...t),this._editingTab=null,this._cardError=null}setConfig(t){this._config=Dt(t)}_emit(t){this._config=t,ie(this,"config-changed",{config:t}),this.requestUpdate()}_patch(t){this._config&&this._emit({...this._config,...t})}_patchTab(t,e){if(!this._config)return;const s=this._config.tabs.map((s,i)=>i===t?{...s,...e}:s);this._emit({...this._config,tabs:s})}_addTab(){if(!this._config)return;const t=[...this._config.tabs,{name:`Tab ${this._config.tabs.length+1}`,card:{type:"markdown",content:""}}];this._emit({...this._config,tabs:t})}_deleteTab(t){if(!this._config)return;const e=this._config.tabs.filter((e,s)=>s!==t);this._emit({...this._config,tabs:e})}_editCardJson(t,e){let s;try{s=JSON.parse(e)}catch{return void(this._cardError=t)}this._cardError=null,this._patchTab(t,{card:s})}_move(t,e){if(!this._config)return;const s=t+e;if(s<0||s>=this._config.tabs.length)return;const i=this._config.tabs.slice();[i[t],i[s]]=[i[s],i[t]],this._emit({...this._config,tabs:i})}_openCard(t){this._cardError=null,this._editingTab=t}_closeCard(){this._editingTab=null}get _lovelace(){return this.lovelace??{config:{views:[]},editMode:!0}}_onNativeCardChanged(t,e){e.stopPropagation();const s=e.detail?.config;s&&this._patchTab(t,{card:s})}_onYamlCardChanged(t,e){e.stopPropagation();const s=e.detail;!1!==s?.isValid&&void 0!==s?.value&&this._patchTab(t,{card:s.value})}render(){return this._config?null!==this._editingTab?this._renderCardView(this._editingTab):this._renderListView():W``}_renderCardView(t){const e=this._config.tabs[t];if(!e)return this._editingTab=null,this._renderListView();const s=ce(t=>!!customElements.get(t));return W`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}>← Back</button>
          <span class="card-editor-title">${e.name||`Tab ${t+1}`}</span>
        </div>
        ${this._renderCardEditor(t,e,s)}
      </div>
    `}_renderCardEditor(t,e,s){return"hui-card-element-editor"===s?W`
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
      ${this._cardError===t?W`<div class="tab-card-error">Invalid JSON — not saved.</div>`:Y}
    `}_renderListView(){const t=this._config;return W`
      <div class="editor">
        <div class="globals">
          <label
            >Position
            <select
              .value=${t.position}
              @change=${t=>this._patch({position:t.target.value})}
            >
              ${["top","bottom","left","right"].map(e=>W`<option value=${e} ?selected=${e===t.position}>${e}</option>`)}
            </select>
          </label>
          <label
            >Style
            <select
              .value=${t.style}
              @change=${t=>this._patch({style:t.target.value})}
            >
              ${["underline","pill","segmented"].map(e=>W`<option value=${e} ?selected=${e===t.style}>${e}</option>`)}
            </select>
          </label>
          <label
            >Remember
            <select
              .value=${t.remember}
              @change=${t=>this._patch({remember:t.target.value})}
            >
              ${["none","browser","url"].map(e=>W`<option value=${e} ?selected=${e===t.remember}>${e}</option>`)}
            </select>
          </label>
          <label
            >Default tab
            <select
              class="global-default-tab"
              @change=${t=>this._patch({default_tab:t.target.value})}
            >
              ${t.tabs.map((e,s)=>{const i=e.name??String(s);return W`<option
                  value=${i}
                  ?selected=${String(t.default_tab)===i||t.default_tab===s}
                >
                  ${e.name||`Tab ${s+1}`}
                </option>`})}
            </select>
          </label>
          <label
            >Scrollable
            <select
              @change=${t=>this._patch({scrollable:"auto"===t.target.value?"auto":"true"===t.target.value})}
            >
              ${["auto","true","false"].map(e=>W`<option value=${e} ?selected=${String(t.scrollable)===e}>${e}</option>`)}
            </select>
          </label>
          <label class="checkbox"
            ><input
              class="global-lazy"
              type="checkbox"
              .checked=${t.lazy}
              @change=${t=>this._patch({lazy:t.target.checked})}
            />
            Lazy-mount inactive tabs
          </label>
          <label class="checkbox"
            ><input
              class="global-animated"
              type="checkbox"
              .checked=${t.animated}
              @change=${t=>this._patch({animated:t.target.checked})}
            />
            Animate indicator
          </label>
          <label class="checkbox"
            ><input
              class="global-swipe"
              type="checkbox"
              .checked=${t.swipe}
              @change=${t=>this._patch({swipe:t.target.checked})}
            />
            Swipe to change tabs (mobile)
          </label>
        </div>

        <div class="tabs">
          ${t.tabs.map((t,e)=>W`
              <div class="tab">
                <div class="tab-row">
                  <input
                    class="tab-name"
                    type="text"
                    .value=${t.name??""}
                    placeholder="Tab name"
                    @input=${t=>this._patchTab(e,{name:t.target.value})}
                  />
                  <input
                    class="tab-icon"
                    type="text"
                    .value=${t.icon??""}
                    placeholder="mdi:icon"
                    @input=${t=>this._patchTab(e,{icon:t.target.value})}
                  />
                  <button class="move-up" @click=${()=>this._move(e,-1)}>↑</button>
                  <button class="move-down" @click=${()=>this._move(e,1)}>↓</button>
                  <button class="delete-tab" @click=${()=>this._deleteTab(e)}>✕</button>
                </div>
                <div class="tab-row">
                  <input
                    class="tab-accent"
                    type="text"
                    .value=${t.accent??""}
                    placeholder="Accent colour (e.g. #ff9800)"
                    @input=${t=>this._patchTab(e,{accent:t.target.value||void 0})}
                  />
                  <input
                    class="tab-badge"
                    type="text"
                    .value=${t.badge??""}
                    placeholder="Badge: sensor.unread or {{ template }}"
                    @input=${t=>this._patchTab(e,{badge:t.target.value||void 0})}
                  />
                </div>
                <button class="edit-card" @click=${()=>this._openCard(e)}>
                  <span class="edit-card-label">Edit card</span>
                  <span class="edit-card-type">${t.card?.type??"—"}</span>
                  <span class="edit-card-arrow">→</span>
                </button>
              </div>
            `)}
          <button class="add-tab" @click=${this._addTab}>+ Add tab</button>
        </div>
      </div>
    `}static{this.styles=a`
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
  `}},Gt([Ct()],oe.prototype,"_config",void 0),Gt([Ct()],oe.prototype,"_editingTab",void 0),Gt([Ct()],oe.prototype,"_cardError",void 0),oe=Gt([gt("tabdeck-card-editor")],oe)});At(),It(),Vt(),Qt();var de=class extends _t{constructor(...t){super(...t),this._selected=0,this._built=!1,this._cardKey="",this._templateResolver=t=>this._templates?.boolean(t),this._onTouchStart=t=>{if(!this._config?.swipe||1!==t.touches.length)return void(this._touchStart=void 0);const e=t.touches[0];this._touchStart={x:e.clientX,y:e.clientY,t:t.timeStamp}},this._onTouchEnd=t=>{const e=this._touchStart;if(this._touchStart=void 0,!e||!this._config?.swipe)return;const s=t.changedTouches[0];if(!s)return;const i=function(t,e,s={}){const i=s.minDistance??50,r=s.maxDuration??800,o=s.ratio??1.5,a=e.x-t.x,n=e.y-t.y;return e.t-t.t>r||Math.abs(a)<i||Math.abs(a)<Math.abs(n)*o?null:a<0?"next":"prev"}(e,{x:s.clientX,y:s.clientY,t:t.timeStamp});if(!i)return;const r=this._visibleTabs().length-1,o="next"===i?this._selected+1:this._selected-1,a=Math.max(0,Math.min(r,o));a!==this._selected&&this._selectIndex(a)}}static getStubConfig(){return{tabs:[{name:"Tab 1",icon:"mdi:numeric-1-box",card:{type:"markdown",content:"Tab 1"}},{name:"Tab 2",icon:"mdi:numeric-2-box",card:{type:"markdown",content:"Tab 2"}}]}}static async getConfigElement(){return await Promise.resolve().then(()=>(le(),ne)),document.createElement("tabdeck-card-editor")}setConfig(t){this._config=Dt(t),this._cardKey=this._computeCardKey(this._config),this._built=!1,this._selected=qt(this._config),this._templates?.destroy(),this._templates=void 0,this._build()}disconnectedCallback(){super.disconnectedCallback(),this._templates?.destroy(),this._templates=void 0}_computeCardKey(t){return`${"undefined"!=typeof location?location.pathname:""}#${t.tabs.map(t=>t.name??"").join("|")}`}async _build(){if(!this._config)return;const t=await async function(){const t=await window.loadCardHelpers();return e=>t.createCardElement(e)}();this._manager=new Ft(t),this._manager.addEventListener("ll-rebuild-done",()=>this.requestUpdate()),await this._manager.build(this._config.tabs.map(t=>t.card)),this._hass&&this._manager.setHass(this._hass),this._syncTemplates(),this._selected=Yt({mode:this._config.remember,cardKey:this._cardKey,defaultIndex:qt(this._config),tabCount:this._visibleTabs().length,hash:"undefined"!=typeof location?location.hash:"",tabNames:this._visibleTabs().map(t=>t.name??"")}),this._built=!0,this.requestUpdate()}set hass(t){this._hass=t,this._manager?.setHass(t),this._syncTemplates(),this.requestUpdate()}get hass(){return this._hass}_visibleTabs(){return this._config?this._config.tabs.filter(t=>{return e=t.visibility,s=this._hass,i=this._templateResolver,!e||0===e.length||!s||e.every(t=>Kt(t,s,i));var e,s,i}):[]}_collectTemplates(){if(!this._config)return[];const t=[];for(const e of this._config.tabs){Xt(e.badge)&&t.push(e.badge);for(const s of e.visibility??[])"template"===s?.condition&&s.value_template&&t.push(s.value_template)}return t}_makeSubscribe(){if(this._hass?.connection?.subscribeMessage)return(t,e,s)=>{const i=this._hass?.connection;if(!i?.subscribeMessage)return s(),()=>{};let r,o=!1;return Promise.resolve(i.subscribeMessage(t=>{t&&void 0!==t.error?s():e(t?.result)},{type:"render_template",template:t,report_errors:!0})).then(t=>{r=t,o&&t?.()}).catch(()=>s()),()=>{o=!0,r?.()}}}_syncTemplates(){const t=this._collectTemplates();if(0===t.length)return this._templates?.destroy(),void(this._templates=void 0);if(!this._templates){const t=this._makeSubscribe();if(!t)return;this._templates=new Zt(t),this._templates.addEventListener("change",()=>this.requestUpdate())}this._templates.track(t)}getCardSize(){const t=this._manager?.get(this._activeOriginalIndex());return t&&"function"==typeof t.getCardSize?t.getCardSize():1}getGridOptions(){return{columns:"full",rows:"auto"}}_activeOriginalIndex(){const t=this._visibleTabs()[this._selected];return this._config?this._config.tabs.indexOf(t):0}_onSelect(t){this._selectIndex(t.detail.index)}_selectIndex(t){this._selected=t;const e=this._visibleTabs()[this._selected];if(this._config){const t="browser"===(s={mode:this._config.remember,cardKey:this._cardKey,index:this._selected,tabName:e?.name}).mode?((s.storage??globalThis.localStorage)?.setItem(Wt(s.cardKey),String(s.index)),{}):"url"===s.mode?{hash:"#tab="+(s.tabName?s.tabName:String(s.index))}:{};t.hash&&"undefined"!=typeof location&&history.replaceState(null,"",t.hash)}var s;this.updateComplete.then(()=>this._manager?.notifyVisible(this._activeOriginalIndex()))}updated(t){super.updated(t);const e=this._visibleTabs();this._selected>e.length-1&&(this._selected=0)}render(){if(!this._config||!this._built)return Y;const t=this._visibleTabs(),e=this._config,s=W`
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
    `}_resolveBadge(t){if(!t)return;if(Xt(t)){const e=this._templates?.result(t);return null==e?void 0:String(e)}if(!this._hass)return;const e=this._hass.states[t];return e?e.state:t}static{this.styles=a`
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
  `}};Gt([Ct()],de.prototype,"_config",void 0),Gt([Ct()],de.prototype,"_selected",void 0),Gt([Ct()],de.prototype,"_built",void 0),de=Gt([gt("tabdeck-card")],de),window.customCards=window.customCards||[],window.customCards.push({type:"tabdeck-card",name:"Tabdeck Card",description:"Organize multiple cards into a modern tabbed interface.",preview:!0,documentationURL:"https://github.com/tempus2016/tabdeck-card"});export{de as TabdeckCard};